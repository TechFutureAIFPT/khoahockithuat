import { GoogleGenerativeAI } from "@google/generative-ai";
import { db, auth } from "../../config/firebase";
import { collection, getDocs, limit, query } from "firebase/firestore";

export interface HealthReport {
  timestamp: string;
  gemini: {
    status: "ok" | "error";
    keys: { index: number; status: string; error?: string }[];
  };
  firebase: {
    auth: "ok" | "error";
    firestore: "ok" | "error";
    error?: string;
  };
  rapidApi: {
    status: "ok" | "error" | "skipped";
    error?: string;
  };
}

export class HealthService {
  private static getGeminiKeys(): string[] {
    return [
      (import.meta as any).env?.VITE_GEMINI_API_KEY_1,
      (import.meta as any).env?.VITE_GEMINI_API_KEY_2,
      (import.meta as any).env?.VITE_GEMINI_API_KEY_3,
      (import.meta as any).env?.VITE_GEMINI_API_KEY_4,
    ].filter(Boolean);
  }

  static async checkGemini(): Promise<HealthReport["gemini"]> {
    const keys = this.getGeminiKeys();
    const results: HealthReport["gemini"]["keys"] = [];
    let overallOk = true;

    if (keys.length === 0) {
      return { status: "error", keys: [{ index: 0, status: "No keys found" }] };
    }

    for (let i = 0; i < keys.length; i++) {
      try {
        const genAI = new GoogleGenerativeAI(keys[i]);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        // Simple connectivity test
        await model.generateContent("Hi");
        results.push({ index: i + 1, status: "ok" });
      } catch (error: any) {
        overallOk = false;
        results.push({ 
          index: i + 1, 
          status: "error", 
          error: error?.message || "Unknown error" 
        });
      }
    }

    return {
      status: overallOk ? "ok" : "error",
      keys: results,
    };
  }

  static async checkFirebase(): Promise<HealthReport["firebase"]> {
    const report: HealthReport["firebase"] = { auth: "ok", firestore: "ok" };
    
    try {
      // Auth check
      if (!auth) report.auth = "error";
      
      // Firestore check - try to query a common collection
      const q = query(collection(db, "cvHistory"), limit(1));
      await getDocs(q);
    } catch (error: any) {
      report.firestore = "error";
      report.error = error?.message || "Unknown Firebase error";
    }

    return report;
  }

  static async checkRapidApi(): Promise<HealthReport["rapidApi"]> {
    const apiKey = (import.meta as any).env?.VITE_RAPIDAPI_KEY;
    if (!apiKey) return { status: "skipped", error: "VITE_RAPIDAPI_KEY not set" };

    try {
      const response = await fetch("https://job-salary-data.p.rapidapi.com/job-salary?job_title=Developer&location=Vietnam", {
        method: "GET",
        headers: {
          "x-rapidapi-key": apiKey,
          "x-rapidapi-host": "job-salary-data.p.rapidapi.com",
        },
      });

      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return { status: "ok" };
    } catch (error: any) {
      return { status: "error", error: error?.message || "Unknown RapidAPI error" };
    }
  }

  static async checkAll(): Promise<HealthReport> {
    console.log("Starting full API health check...");
    
    const [gemini, firebase, rapidApi] = await Promise.all([
      this.checkGemini(),
      this.checkFirebase(),
      this.checkRapidApi(),
    ]);

    const report: HealthReport = {
      timestamp: new Date().toISOString(),
      gemini,
      firebase,
      rapidApi,
    };

    console.table({
      Gemini: report.gemini.status,
      Firebase_Auth: report.firebase.auth,
      Firebase_Firestore: report.firebase.firestore,
      RapidAPI: report.rapidApi.status,
    });

    if (report.gemini.status !== "ok") {
      console.warn("Gemini Keys Status:", report.gemini.keys);
    }

    return report;
  }
}

// Attach to window for easy debugging in console
if (typeof window !== "undefined") {
  (window as any).HealthService = HealthService;
}

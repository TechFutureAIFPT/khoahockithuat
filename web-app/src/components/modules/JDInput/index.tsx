import React, { useState, useRef, useCallback } from "react";
import { extractTextFromJdFile } from "../../../services/data/ocrService";
import {
  extractJobPositionFromJD,
  filterAndStructureJD,
  extractHardFiltersFromJD,
  extractJDMetadata,
} from "../../../services/ai/geminiService";
import { googleDriveService } from "../../../services/storage/googleDriveService";
import type { HardFilters, WeightCriteria, JDTemplate } from "../../../types";
import TemplateSelector from "../../ui/TemplateSelector";
import HistorySelector from "../../ui/HistorySelector";
import { JDTemplateService } from "../../../services/storage/jdTemplateService";
import { JDHistoryService } from "../../../services/storage/jdHistoryService";
import AppLayout from "../../layout/AppLayout";

interface JDInputProps {
  jdText: string;
  setJdText: React.Dispatch<React.SetStateAction<string>>;
  jobPosition: string;
  setJobPosition: React.Dispatch<React.SetStateAction<string>>;
  hardFilters: HardFilters;
  setHardFilters: React.Dispatch<React.SetStateAction<HardFilters>>;
  onComplete: () => void;
  sidebarCollapsed?: boolean;
  requirementsSummary: string;
  setRequirementsSummary: React.Dispatch<React.SetStateAction<string>>;
  uid: string;
  setWeights: React.Dispatch<React.SetStateAction<WeightCriteria>>;
  companyName: string;
  setCompanyName: React.Dispatch<React.SetStateAction<string>>;
  salary: string;
  setSalary: React.Dispatch<React.SetStateAction<string>>;
}

const JDInput: React.FC<JDInputProps> = ({
  jdText, setJdText, jobPosition, setJobPosition, hardFilters, setHardFilters,
  onComplete, sidebarCollapsed = false, companyName, setCompanyName, salary,
  setSalary, requirementsSummary, setRequirementsSummary, uid, setWeights,
}) => {
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");
  const [isOcrLoading, setIsOcrLoading] = useState(false);
  const [ocrMessage, setOcrMessage] = useState("");
  const [ocrError, setOcrError] = useState("");
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [summarizeError, setSummarizeError] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [showEditor, setShowEditor] = useState(false);
  const [isRequirementsModalOpen, setIsRequirementsModalOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isEditorStage = showEditor || jdText.length > 0;
  const isCompleteEnabled = jdText.trim().length > 50 && jobPosition.trim().length > 3;
  const inputCls = "w-full h-10 bg-slate-900 border border-slate-800 rounded-lg px-3 text-[13px] text-slate-300 placeholder-slate-600 outline-none focus:border-violet-500/40 transition-all";

  const getFriendlyError = (error: unknown, ctx: "ocr" | "summarize") => {
    if (error instanceof Error) {
      const m = error.message.toLowerCase();
      if (m.includes("khong the trich xuat du noi dung")) return error.message;
      if (m.includes("network") || m.includes("failed to fetch")) return "Loi ket noi mang. Vui long thu lai.";
      if (m.includes("gemini") || m.includes("api")) return "Dich vu AI gap su co. Vui long thu lai sau.";
    }
    return `Loi khi ${ctx === "ocr" ? "quet file" : "toi uu JD"}. Vui long thu lai.`;
  };

  const handleGoogleDriveSelect = async () => {
    try {
      const token = await googleDriveService.authenticate();
      const driveFiles = await googleDriveService.openPicker({
        mimeTypes: "application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,image/png,image/jpeg",
        multiSelect: false,
      });
      if (driveFiles.length > 0) {
        const dFile = driveFiles[0];
        setIsOcrLoading(true); setOcrError(""); setSummarizeError("");
        setJdText(""); setJobPosition("");
        setOcrMessage(`Đang tải ${dFile.name} từ Drive...`);
        try {
          const blob = await googleDriveService.downloadFile(dFile.id, token);
          await processFile(new File([blob], dFile.name, { type: dFile.mimeType }));
        } catch { setOcrError("Không thể tải file từ Google Drive."); setIsOcrLoading(false); }
      }
    } catch (err: any) {
      setOcrError(err.message?.includes("Client ID") || err.message?.includes("API Key")
        ? "Chưa cấu hình Google Drive API." : "Lỗi khi kết nối Google Drive.");
    }
  };

  const processFile = async (file: File) => {
    try {
      const rawText = await extractTextFromJdFile(file, (msg) => setOcrMessage(msg));
      if (!rawText || rawText.trim().length < 50)
        throw new Error("Không thể trích xuất đủ nội dung từ file. Vui lòng thử file khác.");
      setOcrMessage("Đang cấu trúc JD...");
      const structuredJd = await filterAndStructureJD(rawText);
      setJdText(structuredJd);
      setShowEditor(true); // Switch to editor stage immediately
      
      const pos = await extractJobPositionFromJD(structuredJd);
      let msg = "";
      if (pos) { setJobPosition(pos); msg = `✔ Chức danh: ${pos}`; }
      const meta = await extractJDMetadata(structuredJd);
      if (meta.companyName) setCompanyName(meta.companyName);
      if (meta.salary) setSalary(meta.salary);
      if (meta.requirementsSummary) setRequirementsSummary(meta.requirementsSummary);
      const filters = await extractHardFiltersFromJD(structuredJd);
      if (filters && Object.keys(filters).length > 0) {
        const mandatory: any = {};
        if (filters.location) mandatory.locationMandatory = true;
        if (filters.minExp) mandatory.minExpMandatory = true;
        if (filters.seniority) mandatory.seniorityMandatory = true;
        if (filters.education) mandatory.educationMandatory = true;
        if (filters.language) mandatory.languageMandatory = true;
        if (filters.certificates) mandatory.certificatesMandatory = true;
        if (filters.workFormat) mandatory.workFormatMandatory = true;
        if (filters.contractType) mandatory.contractTypeMandatory = true;
        setHardFilters((prev) => ({ ...prev, ...filters, ...mandatory }));
        const labelMap: any = { location: "Địa điểm", minExp: "K.nghiệm", seniority: "Cấp bậc", education: "Học vấn", language: "Ngôn ngữ", certificates: "Chứng chỉ", workFormat: "Hình thức", contractType: "Hợp đồng" };
        const info = Object.entries(filters).filter(([, v]) => v && v !== "").map(([k, v]) => labelMap[k] ? `${labelMap[k]}: ${v}` : `${k}: ${v}`).join(" · ");
        if (info) msg += ` | 🎯 ${Object.keys(mandatory).length} tiêu chí: ${info}`;
      }
      if (msg) { setOcrMessage(msg); setTimeout(() => setOcrMessage(""), 7000); }
      else { setTimeout(() => setOcrMessage(""), 1000); }
    } catch (error) { setOcrError(getFriendlyError(error, "ocr")); setJdText(""); }
    finally { setIsOcrLoading(false); }
  };

  const handleOcrFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsOcrLoading(true); setOcrError(""); setSummarizeError("");
    setJdText(""); setJobPosition("");
    setOcrMessage("Bắt đầu xử lý...");
    await processFile(file);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSummarize = async () => {
    if (jdText.trim().length < 200) { setSummarizeError("JD quá ngắn để tóm tắt."); return; }
    setIsSummarizing(true); setSummarizeError(""); setOcrError("");
    try {
      const structured = await filterAndStructureJD(jdText);
      setJdText(structured);
      const pos = await extractJobPositionFromJD(structured);
      if (pos) setJobPosition(pos);
      const meta = await extractJDMetadata(structured);
      if (meta.companyName) setCompanyName(meta.companyName);
      if (meta.salary) setSalary(meta.salary);
      if (meta.requirementsSummary) setRequirementsSummary(meta.requirementsSummary);
      const filters = await extractHardFiltersFromJD(structured);
      if (filters && Object.keys(filters).length > 0) {
        const mandatory: any = {};
        if (filters.location) mandatory.locationMandatory = true;
        if (filters.minExp) mandatory.minExpMandatory = true;
        if (filters.seniority) mandatory.seniorityMandatory = true;
        if (filters.education) mandatory.educationMandatory = true;
        if (filters.language) mandatory.languageMandatory = true;
        if (filters.certificates) mandatory.certificatesMandatory = true;
        if (filters.workFormat) mandatory.workFormatMandatory = true;
        if (filters.contractType) mandatory.contractTypeMandatory = true;
        setHardFilters((prev) => ({ ...prev, ...filters, ...mandatory }));
      }
    } catch (error) { setSummarizeError(getFriendlyError(error, "summarize")); }
    finally { setIsSummarizing(false); }
  };

  const handleSelectTemplate = (template: JDTemplate) => {
    setJdText(template.jdText); setJobPosition(template.jobPosition);
    if (template.hardFilters) setHardFilters(template.hardFilters);
    if (template.weights) setWeights(template.weights);
    setOcrMessage(`✔ Đã tải mẫu: ${template.name}`);
    setTimeout(() => setOcrMessage(""), 3000);
  };

  const handleSaveTemplate = async () => {
    if (!uid) { setOcrError("Bạn cần đăng nhập để lưu mẫu."); return; }
    if (jdText.length < 50 || jobPosition.length < 3) { setOcrError("Nhập đầy đủ JD và chức danh trước khi lưu."); return; }
    const name = prompt("Tên mẫu:", `Mẫu ${jobPosition}`);
    if (!name) return;
    setIsSaving(true); setSaveMessage("Đang lưu...");
    try {
      await JDTemplateService.saveTemplate({ uid, name, jdText, jobPosition, hardFilters });
      setSaveMessage("✔ Đã lưu!"); setTimeout(() => setSaveMessage(""), 3000);
    } catch { setOcrError("Lỗi khi lưu mẫu."); }
    finally { setIsSaving(false); }
  };

  const handleComplete = async () => {
    if (uid && jdText.length >= 50 && jobPosition.length >= 3) {
      try { await JDHistoryService.saveHistory({ uid, jobPosition, jdText, hardFilters }); } catch { }
    }
    onComplete();
  };

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => { e.preventDefault(); e.stopPropagation(); setIsDragging(true); }, []);
  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => { e.preventDefault(); e.stopPropagation(); setIsDragging(false); }, []);
  const handleDrop = useCallback(async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault(); e.stopPropagation(); setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      setIsOcrLoading(true); setOcrError(""); setSummarizeError("");
      setJdText(""); setJobPosition(""); setOcrMessage("Bắt đầu xử lý...");
      await processFile(files[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const animations = `
    @keyframes jd-progress { 0%{width:5%} 40%{width:55%} 70%{width:75%} 90%{width:88%} 100%{width:92%} }
    .jd-progress-bar { animation: jd-progress 12s ease-out forwards; }
    @keyframes jd-pulse-dot { 0%,100%{opacity:1} 50%{opacity:0.3} }
    .jd-pulse-dot   { animation: jd-pulse-dot 1.2s ease-in-out 0s   infinite; }
    .jd-pulse-dot-2 { animation: jd-pulse-dot 1.2s ease-in-out 0.4s infinite; }
    .jd-pulse-dot-3 { animation: jd-pulse-dot 1.2s ease-in-out 0.8s infinite; }
    @keyframes fade-in { from{opacity:0;transform:translateY(-10px)} to{opacity:1;transform:translateY(0)} }
    .animate-scale-in { animation: scale-in 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
    @keyframes scale-in { from{opacity:0;transform:scale(0.95)} to{opacity:1;transform:scale(1)} }
  `;

  const AnalyzingBanner = (
    <div className="rounded-2xl border border-violet-500/20 bg-slate-900/80 backdrop-blur-sm overflow-hidden">
      <div className="px-4 py-3 flex items-center gap-3">
        <div className="flex items-center gap-1">
          <span className="jd-pulse-dot   w-2 h-2 rounded-full bg-violet-400 inline-block" />
          <span className="jd-pulse-dot-2 w-2 h-2 rounded-full bg-violet-400 inline-block" />
          <span className="jd-pulse-dot-3 w-2 h-2 rounded-full bg-violet-400 inline-block" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[12px] font-semibold text-violet-300 truncate">Analyzing job description...</p>
          <p className="text-[10px] text-slate-500 mt-0.5 truncate">{ocrMessage || "AI is extracting skills and requirements"}</p>
        </div>
        <i className="fa-solid fa-wand-magic-sparkles text-violet-500/60 text-sm flex-shrink-0" />
      </div>
      <div className="h-0.5 bg-slate-800">
        <div className="jd-progress-bar h-full bg-gradient-to-r from-violet-600 via-purple-500 to-violet-400 rounded-full" />
      </div>
    </div>
  );

  return (
    <AppLayout
      mainNoScroll
      sidebarCollapsed={sidebarCollapsed}
      headerIcon={<i className="fa-solid fa-wand-magic-sparkles text-violet-400 text-lg" />}
      headerTitle="Screener"
      headerSubtitle="Job Description Analytics"
      headerRight={isEditorStage ? (
        <div className="flex flex-col md:flex-row items-end md:items-center gap-2 flex-1 min-w-0 w-full md:w-auto">
          {/* ── Unified Toolbar ── */}
          <div className="flex items-center bg-slate-950/60 backdrop-blur-md border border-white/10 rounded-xl px-1 md:px-1.5 h-[38px] md:h-[42px] gap-0 shadow-lg shadow-black/40 ring-1 ring-white/5 w-full md:w-auto overflow-x-auto custom-scrollbar no-scrollbar">

            {/* Chức danh */}
            <div className="flex items-center px-2 md:px-3 border-r border-white/5 h-full min-w-[140px] md:min-w-[180px] max-w-[240px]">
              <i className="fa-solid fa-briefcase text-slate-500 text-[10px] mr-2 md:mr-2.5" />
              <input
                type="text" value={jobPosition} onChange={(e) => setJobPosition(e.target.value)}
                className="bg-transparent text-[11px] md:text-[13px] font-bold text-white placeholder-slate-600 outline-none w-full"
                placeholder="Job Position..." maxLength={100}
              />
            </div>

            {/* Công ty */}
            <div className="flex items-center px-2 md:px-3 border-r border-white/5 h-full min-w-[100px] md:min-w-[120px] max-w-[160px]">
              <i className="fa-solid fa-building text-slate-600 text-[10px] mr-2 md:mr-2.5" />
              <input
                type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)}
                className="bg-transparent text-[11px] md:text-[12px] font-semibold text-slate-400 placeholder-slate-700 outline-none w-full"
                placeholder="Company..."
              />
            </div>

            {/* Lương */}
            <div className="flex items-center px-2 md:px-3 border-r border-white/5 h-full min-w-[80px] md:min-w-[90px] max-w-[120px]">
              <i className="fa-solid fa-money-bill-wave text-slate-600 text-[10px] mr-2 md:mr-2.5" />
              <input
                type="text" value={salary} onChange={(e) => setSalary(e.target.value)}
                className="bg-transparent text-[11px] md:text-[12px] font-semibold text-slate-400 placeholder-slate-700 outline-none w-full"
                placeholder="Salary..."
              />
            </div>

            {/* Yêu cầu */}
            <div
              className="flex items-center px-3 md:px-4 h-full min-w-[150px] md:min-w-[200px] flex-1 cursor-pointer hover:bg-white/5 transition-colors group/req"
              onClick={() => setIsRequirementsModalOpen(true)}
              title="Click to see full requirements"
            >
              <i className="fa-solid fa-fire text-orange-500/60 text-[10px] mr-2 md:mr-2.5" />
              <div className="flex-1 overflow-hidden">
                <p className={`text-[11px] md:text-[12px] font-medium text-slate-500 truncate italic ${!requirementsSummary ? 'text-slate-700' : ''}`}>
                  {requirementsSummary || "Key requirements..."}
                </p>
              </div>
              <i className="fa-solid fa-expand text-[9px] text-slate-700 group-hover/req:text-slate-500 ml-2 opacity-0 group-hover/req:opacity-100 transition-all hidden md:block" />
            </div>
          </div>

          {/* ── Actions Group ── */}
          <div className="flex items-center gap-1.5 ml-auto md:ml-0">
            <button
              onClick={handleSummarize}
              disabled={isOcrLoading || isSummarizing || jdText.trim().length < 200}
              title="Optimize JD"
              className={`h-[38px] md:h-10 px-3 md:px-6 flex items-center justify-center gap-2.5 rounded-xl text-[13px] font-black transition-all border ${jdText.trim().length >= 200 && !isSummarizing && !isOcrLoading
                ? "bg-violet-600/10 border-violet-500/30 text-violet-300 hover:bg-violet-600/20 hover:border-violet-500/50 shadow-lg shadow-violet-900/10"
                : "bg-slate-900/40 border-slate-800/60 text-slate-600 opacity-40 cursor-not-allowed"
                }`}
            >
              <i className={`fa-solid ${isSummarizing ? "fa-spinner fa-spin" : "fa-wand-magic-sparkles"}`} />
              <span className="uppercase tracking-wide hidden md:inline">{isSummarizing ? "Xử lý..." : "Optimize"}</span>
            </button>

            <button
              onClick={handleComplete}
              disabled={!isCompleteEnabled}
              title={isCompleteEnabled ? "Hoàn tất" : "Kế tiếp"}
              className="h-[38px] md:h-10 px-4 md:px-8 flex items-center justify-center gap-2 text-[13px] font-black text-white bg-blue-600 rounded-xl shadow-lg shadow-blue-600/20 hover:bg-blue-500 transition-all disabled:grayscale disabled:opacity-30 group"
            >
              <span className="uppercase tracking-widest hidden md:inline">{isCompleteEnabled ? "Hoàn tất" : "Kế tiếp"}</span>
              <i className="fa-solid fa-chevron-right text-[11px] md:group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {saveMessage && (
            <div className="fixed top-24 md:top-20 right-4 md:right-8 bg-slate-900/90 backdrop-blur-xl border border-emerald-500/30 text-emerald-400 text-[11px] md:text-[12px] font-bold px-4 md:px-5 py-2 md:py-2.5 rounded-xl shadow-2xl animate-fade-in z-[100] flex items-center gap-3">
              <i className="fa-solid fa-circle-check" />
              {saveMessage}
            </div>
          )}
        </div>
      ) : undefined}
    >
      <style>{animations}</style>

      {/* STAGE 1: Upload only */}
      {!isEditorStage && (
        <div className="flex-1 flex flex-col items-center justify-start px-6 pt-4 md:pt-10 pb-8">
          {isOcrLoading && <div className="w-full max-w-xl mb-6">{AnalyzingBanner}</div>}
          {(ocrError || summarizeError) && !isOcrLoading && (
            <div className="w-full max-w-xl mb-4 flex items-start gap-2 px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-xl">
              <i className="fa-solid fa-triangle-exclamation text-red-400 text-xs mt-0.5 flex-shrink-0" />
              <p className="text-red-300 text-[12px] leading-relaxed">{ocrError || summarizeError}</p>
            </div>
          )}
          <div
            onDrop={handleDrop} onDragOver={handleDragOver} onDragLeave={handleDragLeave}
            className={`relative w-full max-w-xl rounded-2xl border-2 border-dashed transition-all duration-200 overflow-hidden ${isDragging ? "border-violet-400 bg-violet-500/8 scale-[1.01]" : "border-slate-700/70 bg-slate-900/40 hover:border-violet-500/50 hover:bg-violet-500/5"}`}
          >
            <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: "linear-gradient(rgba(139,92,246,1) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,1) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
            <div className="relative flex flex-col items-center justify-center gap-5 py-14 px-8 text-center">
              <div className={`w-20 h-20 rounded-2xl flex items-center justify-center transition-all duration-200 ${isDragging ? "bg-violet-500/20 border border-violet-500/40 scale-110" : "bg-slate-800/80 border border-slate-700/60"}`}>
                <i className={`fa-solid ${isDragging ? "fa-cloud-arrow-up text-violet-400" : "fa-file-arrow-up text-slate-400"} text-3xl transition-all duration-200`} />
              </div>
              <div>
                <p className={`text-[18px] font-bold transition-colors ${isDragging ? "text-violet-300" : "text-slate-200"}`}>
                  {isDragging ? "Drop your file here" : "Drag & Drop Job Description here"}
                </p>
                <p className="text-[13px] text-slate-500 mt-1.5">or choose an option below</p>
              </div>
              <div className="flex items-center gap-2 flex-wrap justify-center">
                {["PDF", "DOCX", "PNG", "JPG"].map(fmt => (
                  <span key={fmt} className="px-3 py-1 rounded-full text-[10px] font-bold bg-slate-800 border border-slate-700/60 text-slate-400 uppercase tracking-wider">{fmt}</span>
                ))}
              </div>
              <div className="flex items-center gap-3 mt-1 flex-wrap justify-center">
                <label className="cursor-pointer h-10 px-5 flex items-center gap-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-[13px] font-bold transition-all duration-150 shadow-lg shadow-violet-600/30 hover:shadow-violet-500/40 hover:scale-[1.02]">
                  <i className="fa-solid fa-cloud-arrow-up" />Upload File
                  <input ref={fileInputRef} type="file" className="hidden" accept=".pdf,.docx,.png,.jpg,.jpeg" onChange={handleOcrFileChange} />
                </label>
                <span className="text-slate-600 text-[12px]">or</span>
                <button onClick={() => setShowEditor(true)} className="h-10 px-5 flex items-center gap-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-600/60 hover:border-violet-500/40 text-slate-300 hover:text-white text-[13px] font-semibold transition-all duration-150 hover:scale-[1.02]">
                  <i className="fa-solid fa-pen-to-square text-violet-400" />Paste Job Description
                </button>
                <button onClick={handleGoogleDriveSelect} title="Import from Google Drive" className="h-10 w-10 flex items-center justify-center rounded-xl bg-slate-800 hover:bg-emerald-500/10 border border-slate-600/60 hover:border-emerald-500/30 text-slate-400 hover:text-emerald-400 transition-all duration-150">
                  <i className="fa-brands fa-google-drive" />
                </button>
              </div>
            </div>
          </div>
          <p className="mt-5 text-[11px] text-slate-600 flex items-center gap-1.5">
            <i className="fa-solid fa-circle-info" />AI sẽ tự động trích xuất thông tin từ JD khi bạn tải lên
          </p>
        </div>
      )}

      {/* STAGE 2: Title bar + editor */}
      {isEditorStage && (
        <>
          {isOcrLoading && <div className="flex-shrink-0 mx-4 mt-3">{AnalyzingBanner}</div>}

          {/* Editor — fills all remaining height */}
          <div className="flex-1 min-h-0 flex flex-col px-4 pt-3 pb-4 gap-2">

            {/* Error / success toasts */}
            {(ocrError || summarizeError) && (
              <div className="flex-shrink-0 flex items-start gap-2 px-3 py-2 bg-red-500/10 border border-red-500/20 rounded-lg">
                <i className="fa-solid fa-triangle-exclamation text-red-400 text-xs mt-0.5 flex-shrink-0" />
                <p className="text-red-300 text-[11px] leading-relaxed">{ocrError || summarizeError}</p>
              </div>
            )}
            {ocrMessage && !isOcrLoading && (
              <div className="flex-shrink-0 flex items-center gap-2 px-3 py-2 bg-emerald-500/8 border border-emerald-500/15 rounded-lg">
                <i className="fa-solid fa-circle-check text-emerald-400 text-xs flex-shrink-0" />
                <p className="text-emerald-300 text-[11px] truncate">{ocrMessage}</p>
              </div>
            )}

            {/* Textarea — flexes to fill remaining height */}
            <textarea
              id="job-description"
              className="flex-1 w-full px-5 py-4 rounded-xl bg-slate-950/80 border border-slate-800 focus:border-violet-500/40 text-[14px] text-slate-300 placeholder-slate-600/70 outline-none resize-none leading-relaxed overflow-y-auto custom-scrollbar font-mono transition-all"
              placeholder={"Paste the Job Description here...\n\nInclude role title, responsibilities, required skills, experience level, and any other relevant details."}
              value={jdText} onChange={(e) => setJdText(e.target.value)}
            />
          </div>

          {/* Key Requirements Modal */}
          {isRequirementsModalOpen && (
            <div
              className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
              onClick={() => setIsRequirementsModalOpen(false)}
            >
              <div
                className="w-full max-w-xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden animate-scale-in"
                onClick={e => e.stopPropagation()}
              >
                <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/50">
                  <div className="flex items-center gap-2">
                    <i className="fa-solid fa-fire text-orange-400 text-sm" />
                    <h3 className="text-white font-bold text-[15px]">Key Requirements</h3>
                  </div>
                  <button
                    onClick={() => setIsRequirementsModalOpen(false)}
                    className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-all"
                  >
                    <i className="fa-solid fa-xmark" />
                  </button>
                </div>
                <div className="p-6">
                  <div className="p-4 bg-slate-950/50 border border-slate-800 rounded-xl">
                    <p className="text-slate-300 text-[13px] leading-relaxed whitespace-pre-wrap italic">
                      {requirementsSummary || "No requirements extracted yet. Click Optimize to analyze the JD."}
                    </p>
                  </div>

                  {requirementsSummary && (
                    <div className="mt-4 flex items-center gap-2 px-3 py-2 bg-blue-500/5 border border-blue-500/10 rounded-lg">
                      <i className="fa-solid fa-circle-info text-blue-400 text-[10px]" />
                      <p className="text-blue-300/70 text-[11px]">These requirements will be used by AI to prioritize candidate matching.</p>
                    </div>
                  )}
                </div>
                <div className="px-6 py-4 bg-slate-900/50 border-t border-slate-800 flex justify-end">
                  <button
                    onClick={() => setIsRequirementsModalOpen(false)}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-[12px] font-bold rounded-lg transition-all"
                  >
                    Đóng
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </AppLayout>
  );
};

export default JDInput;
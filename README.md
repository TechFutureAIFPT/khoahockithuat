#  Support HR - AI Powered CV Screening System

<div align="center">

[![React](https://img.shields.io/badge/React-19.1.1-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.2-blue.svg)](https://www.typescriptlang.org/)
[![Firebase](https://img.shields.io/badge/Firebase-12.3.0-orange.svg)](https://firebase.google.com/)
[![Vite](https://img.shields.io/badge/Vite-6.2.0-646CFF.svg)](https://vitejs.dev/)
[![Gemini AI](https://img.shields.io/badge/Gemini-1.5%20Flash-FF6F00.svg)](https://ai.google.dev/)
[![License](https://img.shields.io/badge/License-Private-red.svg)](LICENSE)

**H? th?ng AI h? tr? HR s�ng l?c CV th�ng minh v?i kh? nang ph�n t�ch da d?nh d?ng, t? d?ng tr�ch xu?t ti�u ch�, v� g?i � c�u h?i ph?ng v?n**

[ Features](#-t�nh-nang-n?i-b?t)  [ Installation](#-c�i-d?t)  [ Deploy](#-deployment)  [ Docs](#-t�i-li?u)  [ SEO](#-seo-optimization)

</div>

---

##  T�i li?u chi ti?t

D? �n du?c chia th�nh 3 ph?n t�i li?u ch�nh d? d? d�ng theo d�i:

1.  **[README.md](./README.md)** (Trang n�y): T?ng quan v? d? �n, t�nh nang, c�i d?t v� tri?n khai.
2.  **[ARCHITECTURE.md](./docs/ARCHITECTURE.md)**: Chi ti?t v? c?u tr�c file, so d? h? th?ng v� lu?ng d? li?u.
3.  **[ALGORITHMS.md](./docs/ALGORITHMS.md)**: Chi ti?t v? c�c thu?t to�n AI, c�ng th?c ch?m di?m v� k? thu?t x? l� d? li?u.

---

##  T�nh nang n?i b?t

###  **AI-Powered CV Analysis**
-   **Ph�n t�ch th�ng minh**: S? d?ng Google Gemini AI d? d�nh gi� CV theo 8+ ti�u ch�
-   **�a d?nh d?ng**: H? tr? PDF, Word, Excel v� h�nh ?nh (OCR)
-   **Ch?m di?m deterministic**: K?t qu? nh?t qu�n 100% v?i c�ng input
-   **Tr?ng s? t�y ch?nh**: �i?u ch?nh ti�u ch� d�nh gi� theo t?ng v? tr�

###  **Advanced Comparison Tools**
-   **Side-by-side Compare**: So s�nh chi ti?t gi?a ?ng vi�n
-   **Strengths Analysis**: Ph�n t�ch di?m m?nh/y?u c?a t?ng ?ng vi�n
-   **Ranking Dashboard**: B?ng x?p h?ng tr?c quan v?i filters
-   **Export Comparison**: Xu?t b�o c�o so s�nh d?ng Excel/PDF

###  **Cross-Device Data Sync**
-   **Firebase Integration**: �?ng b? d? li?u qua Gmail account
-   **Multi-device Access**: Truy c?p m?i l�c, m?i noi
-   **Auto-sync**: T? d?ng d?ng b? khi c� d? li?u m?i
-   **Local + Cloud Caching**: Hi?u su?t t?i uu

###  **Salary Analysis & Market Comparison**
-   **Real-time Market Data**: So s�nh luong v?i th? tru?ng Vi?t Nam
-   **RapidAPI Integration**: D? li?u t? job-salary-data API
-   **Smart Extraction**: T? d?ng tr�ch xu?t th�ng tin luong t? CV/JD
-   **Negotiation Tips**: G?i � thuong lu?ng d?a tr�n v? th?
-   **Fallback Estimation**: U?c t�nh th�ng minh khi API kh�ng kh? d?ng

###  **Advanced Analytics**
-   **Dashboard tr?c quan**: Th?ng k� chi ti?t v?i bi?u d?
-   **L?ch s? d?y d?**: Theo d�i t?t c? l?n ph�n t�ch
-   **Export d? li?u**: Xu?t k?t qu? d?ng Excel/PDF
-   **Performance Metrics**: Cache hit rate, sync status

###  **Smart Auto-Fill & Auto-Tick** (NEW!)
-   ** T? �?ng Tr�ch Xu?t Ti�u Ch� t? JD**:
    -   AI t? d?ng d?c Job Description v� di?n s?n c�c Hard Filters
    -   **Smart Language Conversion**: T? d?ng chuy?n d?i IELTS/TOEIC  CEFR
    -   **Vietnamese Recognition**: Hi?u ti?ng Vi?t (VD: "T?t nghi?p �?i h?c"  Bachelor)
    -   **Location Normalization**: HN/HCM/SG  H� N?i/Th�nh ph? H? Ch� Minh
    -   **Education Mapping**: K? su/Cao d?ng/Th?c si  Bachelor/Associate/Master
-   ** Auto-Tick Mandatory Checkboxes**:
    -   T? d?ng t�ch "B?t bu?c" khi ph�t hi?n ti�u ch� trong JD
    -   �p d?ng cho: �?a di?m, Ng�n ng?, H?c v?n, Seniority, Ch?ng ch?, �?nh d?ng l�m vi?c, Lo?i h?p d?ng, Ng�nh ngh?

###  **SEO Optimization** (NEW!)
-   **Comprehensive Meta Tags**: Title, description, keywords t?i uu cho "support hr"
-   **Open Graph & Twitter Cards**: Share preview v?i branding d?y d?
-   **Search Engine Ready**: robots.txt, sitemap.xml, canonical URLs
-   **Vietnamese Keywords**: "tuy?n d?ng AI", "s�ng l?c cv", "ph�n t�ch cv t? d?ng"
-   **Real-time Performance**: Web Vitals monitoring v?i Vercel Speed Insights
-   **Structured Data**: JSON-LD cho Organization v� SoftwareApplication

###  **PWA Support** (NEW!)
-   **Installable**: C�i d?t nhu ?ng d?ng native tr�n mobile/desktop
-   **Offline Mode**: Ho?t d?ng khi m?t m?ng v?i trang offline t�y ch?nh
-   **Caching Strategy**: Cache-first cho assets, Stale-while-revalidate cho n?i dung
-   **App-like Experience**: Standalone mode, splash screen, icons d?y d?
-   **Performance**: Service Worker cache gi�p t?i trang c?c nhanh

---

##  C�ng ngh? s? d?ng

### **Frontend**
-   **React 19.1.1** - UI Framework hi?n d?i
-   **TypeScript 5.8.2** - Type safety v� developer experience
-   **Tailwind CSS 4.0** - Utility-first CSS framework
-   **Vite 6.2.0** - Lightning fast build tool

### **Backend & AI**
-   **Google Gemini AI 1.5 Flash** - Ph�n t�ch CV v� t?o c�u h?i (4 API keys for load balancing)
-   **Firebase 12.3.0** - Authentication (Gmail) & Firestore database
-   **Tesseract.js 5.1.1** - OCR cho h�nh ?nh
-   **PDF.js** - X? l� file PDF
-   **Mammoth.js** - Word document parsing

### **Additional Services**
-   **React Router 7.1.1** - Navigation
-   **Recharts 2.15.0** - Data visualization
-   **Vercel Analytics** - Performance monitoring
-   **Vercel Speed Insights** - Real-time speed tracking
-   **Web Vitals** - Core Web Vitals tracking
-   **RapidAPI job-salary-data** - Salary market data integration
-   **Wikipedia API** - Knowledge enrichment
-   **Google Cloud Vision API** - Advanced OCR (Optional)

---

##  C�i d?t

### **Y�u c?u h? th?ng**
-   **Node.js**: >= 20.x < 21.x
-   **npm**: >= 10.9.0
-   **Modern Browser**: Chrome, Firefox, Safari, Edge

### **Clone & Setup**
`ash
# Clone repository
git clone https://github.com/your-username/hr-support-system.git
cd hr-support-system

# C�i d?t dependencies
npm install

# T?o file environment
cp .env.example .env.local
`

### **Environment Configuration**
T?o file .env.local v?i c�c bi?n m�i tru?ng:

`env
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abcdef

# Google Gemini AI (Multi-key support for load balancing)
# System s? d?ng 4 keys v� t? d?ng rotate d? tr�nh rate limit
VITE_GEMINI_API_KEY_1=your_gemini_key_1
VITE_GEMINI_API_KEY_2=your_gemini_key_2
VITE_GEMINI_API_KEY_3=your_gemini_key_3
VITE_GEMINI_API_KEY_4=your_gemini_key_4
# (Optional) CLI embedding scripts uu ti�n bi?n n�y n?u du?c set
GEMINI_API_KEY=your_backend_gemini_key

# RapidAPI (Salary Analysis - Optional)
VITE_RAPIDAPI_KEY=your_rapidapi_key

# App Configuration
VITE_APP_NAME="Support HR"
VITE_APP_VERSION="1.0.0"
`

### **Kh?i ch?y**
`ash
# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
`

?ng d?ng s? ch?y t?i: http://localhost:3000

### **Tang cu?ng d? li?u AI (Data Embedding)**
C�ng c? CLI scripts/embedData.ts gi�p t?o vector embedding cho to�n b? thu m?c data/ d? ph?c v? c�c t�c v? truy v?n ng? nghia ho?c hu?n luy?n n?i b?.

`ash
# T?o embedding cho to�n b? data (y�u c?u GEMINI_API_KEY ho?c VITE_GEMINI_API_KEY_x)
npm run embed:data

# Ch?y theo subset (v� d? ch? l?y 10 file d?u ti�n ho?c l?c theo t�n thu m?c)
npm run embed:data -- --limit 10 --filter marketing

# Dry-run/simulation (kh�ng g?i API, h?u �ch khi test CI)
npx tsx scripts/embedData.ts --simulate --limit 2
`

---

##  Deployment

### **Vercel Deployment (Recommended)**

1.  **Push to GitHub:**
    `ash
    git init
    git add .
    git commit -m "Initial commit"
    git remote add origin https://github.com/your-username/hr-support-system.git
    git push -u origin main
    `

2.  **Deploy to Vercel:**
    -   Truy c?p [vercel.com](https://vercel.com/)
    -   Import GitHub repository
    -   Vercel t? d?ng detect Vite project

3.  **Set Environment Variables:**
    `
    Settings  Environment Variables  Add:

    VITE_FIREBASE_API_KEY=...
    VITE_FIREBASE_AUTH_DOMAIN=...
    VITE_FIREBASE_PROJECT_ID=...
    VITE_FIREBASE_STORAGE_BUCKET=...
    VITE_FIREBASE_MESSAGING_SENDER_ID=...
    VITE_FIREBASE_APP_ID=...

    VITE_GEMINI_API_KEY_1=...
    VITE_GEMINI_API_KEY_2=...
    VITE_GEMINI_API_KEY_3=...
    VITE_GEMINI_API_KEY_4=...

    VITE_RAPIDAPI_KEY=...  (optional)
    `

---

##  Contributing

Ch�ng t�i hoan ngh�nh m?i d�ng g�p!

1.  Fork repository
2.  Create feature branch: git checkout -b feature/amazing-feature
3.  Commit changes: git commit -m 'Add amazing feature'
4.  Push to branch: git push origin feature/amazing-feature
5.  Open Pull Request

---

##  License

**Private License** - Ph?n m?m d?c quy?n

 2025 HR Support System. All rights reserved.

---

<div align="center">

** N?u project h?u �ch, d?ng qu�n star repo nh�!**

Made with  by [TechFuture-Supporhr]

</div>

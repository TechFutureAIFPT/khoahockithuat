import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="mt-auto bg-gradient-to-b from-slate-950 via-slate-900 to-slate-900 border-t border-slate-800/80">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Left column */}
          <div className="space-y-5">
            <div className="flex items-center gap-4">
              <div className="relative">
                <img
                  src="/images/logos/logo.jpg"
                  alt="SupportHR Logo"
                  className="w-14 h-14 rounded-2xl object-cover border border-slate-700/80 shadow-lg shadow-cyan-500/10"
                  onError={(event) => {
                    const target = event.target as HTMLImageElement;
                    target.style.display = 'none';
                    const fallbackIcon = target.nextElementSibling;
                    if (fallbackIcon) {
                      (fallbackIcon as HTMLElement).classList.remove('hidden');
                    }
                  }}
                />
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500 to-emerald-400 flex items-center justify-center text-white text-lg shadow-lg shadow-cyan-400/40 hidden">
                  <i className="fa-solid fa-circle-nodes"></i>
                </div>
              </div>
              <div>
                <p className="text-lg font-semibold text-white tracking-tight">SupportHR</p>
                <p className="text-sm text-slate-400">Nền tảng AI hỗ trợ tuyển dụng</p>
              </div>
            </div>
            <p className="text-base text-slate-300 leading-relaxed max-w-xl">
              Nền tảng AI hỗ trợ tuyển dụng thông minh, tối ưu sàng lọc CV.
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-950/70 border border-emerald-400/60 text-emerald-200 text-xs font-medium shadow-lg shadow-emerald-500/20">
              <i className="fa-solid fa-sparkles text-[13px] text-cyan-200"></i>
              <span>Giải pháp AI tuyển dụng cho doanh nghiệp</span>
            </div>
          </div>

          {/* Right column */}
          <div className="rounded-2xl bg-slate-900/70 border border-slate-800/70 p-6 shadow-xl shadow-slate-100/5 space-y-4">
            <h4 className="text-base font-semibold text-white tracking-wide uppercase">Thông tin liên hệ</h4>
            <div className="space-y-4 text-sm text-slate-300">
              <div className="flex items-center gap-3">
                <span className="w-9 h-9 rounded-full bg-cyan-500/10 border border-cyan-500/40 text-cyan-300 flex items-center justify-center">
                  <i className="fa-solid fa-phone"></i>
                </span>
                <a href="tel:0899280108" className="font-medium text-white hover:text-cyan-300 transition-colors">
                  0899 280 108
                </a>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-9 h-9 rounded-full bg-emerald-500/10 border border-emerald-500/40 text-emerald-300 flex items-center justify-center">
                  <i className="fa-solid fa-envelope"></i>
                </span>
                <a href="mailto:support@supporthr.vn" className="font-medium text-white hover:text-emerald-300 transition-colors">
                  support@supporthr.vn
                </a>
              </div>
              <p className="pl-12 text-[13px] text-slate-400">
                Liên hệ để nhận hỗ trợ hoặc trải nghiệm demo.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-slate-800/70 text-center text-sm text-slate-400">
          © 2025 SupportHR. Tất cả quyền được bảo lưu.
        </div>
      </div>
    </footer>
  );
};

export default Footer;

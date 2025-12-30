import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const TermsPage: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState('acceptance');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const sections = [
    { id: 'acceptance', title: 'Chấp nhận điều khoản' },
    { id: 'description', title: 'Mô tả dịch vụ' },
    { id: 'accounts', title: 'Tài khoản người dùng' },
    { id: 'usage', title: 'Quy định sử dụng' },
    { id: 'prohibited', title: 'Hành vi bị cấm' },
    { id: 'intellectual', title: 'Quyền sở hữu trí tuệ' },
    { id: 'ai-disclaimer', title: 'Tuyên bố về AI' },
    { id: 'limitation', title: 'Giới hạn trách nhiệm' },
    { id: 'termination', title: 'Chấm dứt' },
    { id: 'contact', title: 'Liên hệ' }
  ];

  useEffect(() => {
    setIsVisible(true);
    
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSectionChange = (sectionId: string) => {
    setActiveSection(sectionId);
    setSidebarOpen(false);
  };

  const renderSectionContent = () => {
    switch(activeSection) {
      case 'acceptance':
        return (
          <section className="group hover:bg-slate-800/20 rounded-2xl p-6 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/5 border border-transparent hover:border-slate-700/30">
            <h2 className="text-2xl font-bold text-white mb-6">
              <span className="bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">Chấp nhận điều khoản</span>
            </h2>
            <div className="bg-gradient-to-r from-slate-800/30 to-slate-700/20 rounded-xl p-6 border border-slate-700/30">
              <p className="leading-relaxed text-slate-200 text-lg">
                Bằng việc truy cập và sử dụng nền tảng SupportHR ("Dịch vụ"), bạn đồng ý tuân thủ 
                và bị ràng buộc bởi các điều khoản và điều kiện sau đây. Nếu bạn không đồng ý với 
                bất kỳ phần nào của các điều khoản này, vui lòng không sử dụng Dịch vụ của chúng tôi.
              </p>
            </div>
          </section>
        );
      case 'description':
        return (
          <section className="group hover:bg-slate-800/20 rounded-2xl p-6 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/5 border border-transparent hover:border-slate-700/30">
            <h2 className="text-2xl font-bold text-white mb-6">
              <span className="bg-gradient-to-r from-white to-emerald-200 bg-clip-text text-transparent">Mô tả dịch vụ</span>
            </h2>
            <p className="leading-relaxed mb-6 text-slate-200">
              SupportHR là nền tảng AI hỗ trợ tuyển dụng, cung cấp các tính năng:
            </p>
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="group bg-gradient-to-br from-slate-800/60 to-slate-700/30 rounded-2xl p-6 border border-slate-700/50 hover:border-cyan-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10 hover:-translate-y-1">
                <h3 className="font-semibold text-white mb-3 text-lg">📄 Phân tích CV</h3>
                <p className="text-slate-400 leading-relaxed">Sử dụng AI để phân tích và đánh giá hồ sơ ứng viên</p>
              </div>
              <div className="group bg-gradient-to-br from-slate-800/60 to-slate-700/30 rounded-2xl p-6 border border-slate-700/50 hover:border-purple-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10 hover:-translate-y-1">
                <h3 className="font-semibold text-white mb-3 text-lg">🔍 Sàng lọc thông minh</h3>
                <p className="text-slate-400 leading-relaxed">Tự động so khớp CV với yêu cầu công việc</p>
              </div>
              <div className="group bg-gradient-to-br from-slate-800/60 to-slate-700/30 rounded-2xl p-6 border border-slate-700/50 hover:border-green-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/10 hover:-translate-y-1">
                <h3 className="font-semibold text-white mb-3 text-lg">📊 Báo cáo chi tiết</h3>
                <p className="text-slate-400 leading-relaxed">Cung cấp phân tích và điểm số cho từng ứng viên</p>
              </div>
              <div className="group bg-gradient-to-br from-slate-800/60 to-slate-700/30 rounded-2xl p-6 border border-slate-700/50 hover:border-orange-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/10 hover:-translate-y-1">
                <h3 className="font-semibold text-white mb-3 text-lg">💬 Gợi ý phỏng vấn</h3>
                <p className="text-slate-400 leading-relaxed">Tạo câu hỏi phỏng vấn phù hợp cho từng ứng viên</p>
              </div>
            </div>
          </section>
        );
      // Thêm các case khác...
      case 'accounts':
        return (
          <section className="group hover:bg-slate-800/20 rounded-2xl p-6 transition-all duration-300 hover:shadow-lg hover:shadow-pink-500/5 border border-transparent hover:border-slate-700/30">
            <h2 className="text-2xl font-bold text-white mb-6">
              <span className="bg-gradient-to-r from-white to-pink-200 bg-clip-text text-transparent">Tài khoản người dùng</span>
            </h2>
            <div className="bg-gradient-to-r from-slate-800/30 to-slate-700/20 rounded-xl p-6 border border-slate-700/30 space-y-4">
              <div className="bg-slate-800/30 rounded-lg p-4">
                <h3 className="font-medium text-white mb-2">Đăng ký tài khoản</h3>
                <ul className="list-disc list-inside space-y-1 text-slate-400">
                  <li>Bạn phải cung cấp thông tin chính xác khi đăng ký</li>
                  <li>Bạn có thể đăng ký bằng email hoặc tài khoản Google</li>
                  <li>Mỗi người chỉ được sở hữu một tài khoản</li>
                </ul>
              </div>
              <div className="bg-slate-800/30 rounded-lg p-4">
                <h3 className="font-medium text-white mb-2">Bảo mật tài khoản</h3>
                <ul className="list-disc list-inside space-y-1 text-slate-400">
                  <li>Bạn chịu trách nhiệm bảo mật thông tin đăng nhập</li>
                  <li>Thông báo ngay cho chúng tôi nếu phát hiện truy cập trái phép</li>
                  <li>Không chia sẻ tài khoản với người khác</li>
                </ul>
              </div>
            </div>
          </section>
        );
      case 'usage':
        return (
          <section className="group hover:bg-slate-800/20 rounded-2xl p-6 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/5 border border-transparent hover:border-slate-700/30">
            <h2 className="text-2xl font-bold text-white mb-6">
              <span className="bg-gradient-to-r from-white to-green-200 bg-clip-text text-transparent">Quy định sử dụng</span>
            </h2>
            <div className="bg-gradient-to-r from-slate-800/30 to-slate-700/20 rounded-xl p-6 border border-slate-700/30">
              <p className="leading-relaxed mb-4 text-slate-200">Khi sử dụng Dịch vụ, bạn đồng ý:</p>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center flex-shrink-0 mt-0.5">✓</span>
                  <span>Sử dụng Dịch vụ cho mục đích hợp pháp và tuân thủ pháp luật Việt Nam</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center flex-shrink-0 mt-0.5">✓</span>
                  <span>Chỉ tải lên CV và dữ liệu mà bạn có quyền sử dụng</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center flex-shrink-0 mt-0.5">✓</span>
                  <span>Tôn trọng quyền riêng tư của ứng viên trong quá trình tuyển dụng</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center flex-shrink-0 mt-0.5">✓</span>
                  <span>Không cố gắng phá vỡ hoặc can thiệp vào hệ thống</span>
                </div>
              </div>
            </div>
          </section>
        );
      case 'prohibited':
        return (
          <section className="group hover:bg-slate-800/20 rounded-2xl p-6 transition-all duration-300 hover:shadow-lg hover:shadow-red-500/5 border border-transparent hover:border-slate-700/30">
            <h2 className="text-2xl font-bold text-white mb-6">
              <span className="bg-gradient-to-r from-white to-red-200 bg-clip-text text-transparent">Hành vi bị cấm</span>
            </h2>
            <div className="bg-gradient-to-r from-slate-800/30 to-slate-700/20 rounded-xl p-6 border border-slate-700/30">
              <p className="leading-relaxed mb-4 text-slate-200">Bạn không được phép:</p>
              <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-4">
                <ul className="space-y-2">
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center flex-shrink-0 mt-0.5">✗</span>
                    <span>Sử dụng Dịch vụ để phân biệt đối xử dựa trên giới tính, tuổi tác, dân tộc, tôn giáo</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center flex-shrink-0 mt-0.5">✗</span>
                    <span>Tải lên nội dung vi phạm pháp luật, độc hại hoặc xâm phạm quyền của người khác</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center flex-shrink-0 mt-0.5">✗</span>
                    <span>Cố gắng truy cập trái phép vào hệ thống hoặc dữ liệu của người dùng khác</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>
        );
      case 'intellectual':
        return (
          <section className="group hover:bg-slate-800/20 rounded-2xl p-6 transition-all duration-300 hover:shadow-lg hover:shadow-yellow-500/5 border border-transparent hover:border-slate-700/30">
            <h2 className="text-2xl font-bold text-white mb-6">
              <span className="bg-gradient-to-r from-white to-yellow-200 bg-clip-text text-transparent">Quyền sở hữu trí tuệ</span>
            </h2>
            <div className="bg-gradient-to-r from-slate-800/30 to-slate-700/20 rounded-xl p-6 border border-slate-700/30 space-y-4">
              <p className="leading-relaxed text-slate-200">
                Tất cả nội dung, thiết kế, logo, và công nghệ của SupportHR thuộc quyền sở hữu của chúng tôi và được bảo vệ bởi luật sở hữu trí tuệ.
              </p>
              <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
                <h3 className="font-medium text-white mb-2">Nội dung của bạn</h3>
                <p className="text-slate-400">
                  Bạn giữ quyền sở hữu đối với CV và dữ liệu bạn tải lên. Bằng việc sử dụng Dịch vụ, bạn cấp cho chúng tôi quyền xử lý dữ liệu này để cung cấp Dịch vụ.
                </p>
              </div>
            </div>
          </section>
        );
      case 'ai-disclaimer':
        return (
          <section className="group hover:bg-slate-800/20 rounded-2xl p-6 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/5 border border-transparent hover:border-slate-700/30">
            <h2 className="text-2xl font-bold text-white mb-6">
              <span className="bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">Tuyên bố về AI</span>
            </h2>
            <div className="bg-gradient-to-r from-slate-800/30 to-slate-700/20 rounded-xl p-6 border border-slate-700/30">
              <div className="bg-cyan-500/5 border border-cyan-500/20 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <span className="text-cyan-400 mt-1">ℹ</span>
                  <div className="space-y-2 text-sm">
                    <p><strong className="text-white">Công cụ hỗ trợ:</strong> SupportHR sử dụng AI để hỗ trợ quy trình tuyển dụng, không thay thế quyết định của con người.</p>
                    <p><strong className="text-white">Độ chính xác:</strong> Kết quả phân tích AI mang tính tham khảo. Chúng tôi khuyến khích xem xét thêm trước khi đưa ra quyết định cuối cùng.</p>
                    <p><strong className="text-white">Cải tiến liên tục:</strong> Chúng tôi không ngừng cải thiện thuật toán để tăng độ chính xác và công bằng.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
      case 'limitation':
        return (
          <section className="group hover:bg-slate-800/20 rounded-2xl p-6 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/5 border border-transparent hover:border-slate-700/30">
            <h2 className="text-2xl font-bold text-white mb-6">
              <span className="bg-gradient-to-r from-white to-orange-200 bg-clip-text text-transparent">Giới hạn trách nhiệm</span>
            </h2>
            <div className="bg-gradient-to-r from-slate-800/30 to-slate-700/20 rounded-xl p-6 border border-slate-700/30">
              <p className="leading-relaxed text-slate-200 mb-4">Trong phạm vi pháp luật cho phép, SupportHR không chịu trách nhiệm về:</p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2"><span className="text-orange-400 mt-1">▶</span><span>Thiệt hại gián tiếp, ngẫu nhiên hoặc hậu quả từ việc sử dụng Dịch vụ</span></li>
                <li className="flex items-start gap-2"><span className="text-orange-400 mt-1">▶</span><span>Mất mát dữ liệu do lỗi kỹ thuật hoặc sự cố ngoài tầm kiểm soát</span></li>
                <li className="flex items-start gap-2"><span className="text-orange-400 mt-1">▶</span><span>Quyết định tuyển dụng dựa trên kết quả phân tích của AI</span></li>
                <li className="flex items-start gap-2"><span className="text-orange-400 mt-1">▶</span><span>Gián đoạn dịch vụ do bảo trì hoặc nâng cấp hệ thống</span></li>
              </ul>
            </div>
          </section>
        );
      case 'termination':
        return (
          <section className="group hover:bg-slate-800/20 rounded-2xl p-6 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/5 border border-transparent hover:border-slate-700/30">
            <h2 className="text-2xl font-bold text-white mb-6">
              <span className="bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">Chấm dứt</span>
            </h2>
            <div className="bg-gradient-to-r from-slate-800/30 to-slate-700/20 rounded-xl p-6 border border-slate-700/30 space-y-4">
              <div className="bg-slate-800/30 rounded-lg p-4">
                <h3 className="font-medium text-white mb-2">Bởi bạn</h3>
                <p className="text-slate-400">Bạn có thể ngừng sử dụng Dịch vụ bất cứ lúc nào. Để xóa tài khoản và dữ liệu, vui lòng liên hệ với chúng tôi.</p>
              </div>
              <div className="bg-slate-800/30 rounded-lg p-4">
                <h3 className="font-medium text-white mb-2">Bởi chúng tôi</h3>
                <p className="text-slate-400">Chúng tôi có quyền đình chỉ hoặc chấm dứt tài khoản nếu phát hiện vi phạm điều khoản sử dụng, mà không cần thông báo trước.</p>
              </div>
            </div>
          </section>
        );
      case 'contact':
        return (
          <section className="group hover:bg-slate-800/20 rounded-2xl p-6 transition-all duration-300 hover:shadow-lg hover:shadow-pink-500/5 border border-transparent hover:border-slate-700/30">
            <h2 className="text-2xl font-bold text-white mb-6">
              <span className="bg-gradient-to-r from-white to-pink-200 bg-clip-text text-transparent">Liên hệ</span>
            </h2>
            <div className="bg-gradient-to-r from-slate-800/30 to-slate-700/20 rounded-xl p-6 border border-slate-700/30">
              <p className="leading-relaxed mb-4 text-slate-200">Nếu bạn có câu hỏi về các điều khoản này, vui lòng liên hệ:</p>
              <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
                <div className="space-y-2">
                  <p className="flex items-center gap-2">
                    <span className="text-pink-400">✉</span>
                    <a href="mailto:support@supporthr.vn" className="text-cyan-400 hover:text-cyan-300 transition-colors">support@supporthr.vn</a>
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="text-pink-400">📞</span>
                    <a href="tel:0899280108" className="text-cyan-400 hover:text-cyan-300 transition-colors">0899 280 108</a>
                  </p>
                </div>
              </div>
            </div>
          </section>
        );
      default:
        return (
          <section className="group hover:bg-slate-800/20 rounded-2xl p-6 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/5 border border-transparent hover:border-slate-700/30">
            <h2 className="text-2xl font-bold text-white mb-6">
              <span className="bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">Chấp nhận điều khoản</span>
            </h2>
            <div className="bg-gradient-to-r from-slate-800/30 to-slate-700/20 rounded-xl p-6 border border-slate-700/30">
              <p className="leading-relaxed text-slate-200 text-lg">
                Bằng việc truy cập và sử dụng nền tảng SupportHR ("Dịch vụ"), bạn đồng ý tuân thủ 
                và bị ràng buộc bởi các điều khoản và điều kiện sau đây. Nếu bạn không đồng ý với 
                bất kỳ phần nào của các điều khoản này, vui lòng không sử dụng Dịch vụ của chúng tôi.
              </p>
            </div>
          </section>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-gradient-to-tr from-emerald-500/20 to-teal-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div 
          className="absolute top-1/3 left-1/4 w-60 h-60 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-2xl"
          style={{ transform: `translateY(${scrollY * 0.15}px)` }}
        ></div>
      </div>
      
      {/* Header */}
      <div className="bg-slate-900/90 border-b border-slate-800/60 sticky top-0 z-10 backdrop-blur-md shadow-xl">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4">
          <Link 
            to="/" 
            className="group inline-flex items-center gap-3 text-slate-400 hover:text-purple-400 transition-all duration-300 hover:gap-4"
          >
            <div className="w-8 h-8 rounded-full bg-slate-800/50 group-hover:bg-purple-500/20 flex items-center justify-center transition-all duration-300 group-hover:scale-110">
              <span className="text-sm">←</span>
            </div>
            <span className="font-medium">Quay lại trang chủ</span>
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 relative z-10">
        <div className="flex gap-8">
          {/* Sidebar */}
          <div className="hidden lg:block w-80 flex-shrink-0">
            <div className="sticky top-24">
              <div className={`bg-slate-900/60 backdrop-blur-sm border border-slate-800/60 rounded-2xl p-6 shadow-xl transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
                <h3 className="text-lg font-bold text-white mb-6">
                  Mục lục
                </h3>
                <nav className="space-y-2">
                  {sections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => handleSectionChange(section.id)}
                      className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-300 flex items-center gap-3 ${
                        activeSection === section.id
                          ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 text-white shadow-lg'
                          : 'text-slate-400 hover:text-white hover:bg-slate-800/50 border border-transparent'
                      }`}
                    >
                      <span className="font-medium text-sm">{section.title}</span>
                      {activeSection === section.id && (
                        <div className="ml-auto w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                      )}
                    </button>
                  ))}
                </nav>
              </div>
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden fixed top-20 left-4 z-50 w-12 h-12 bg-slate-900/90 backdrop-blur-sm border border-slate-800/60 rounded-xl flex items-center justify-center text-slate-400 hover:text-white transition-colors"
          >
            <span>{sidebarOpen ? '✕' : '☰'}</span>
          </button>

          {/* Mobile sidebar */}
          {sidebarOpen && (
            <div className="lg:hidden fixed inset-0 z-40">
              <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setSidebarOpen(false)}></div>
              <div className="absolute top-0 left-0 h-full w-80 bg-slate-900/95 backdrop-blur-sm border-r border-slate-800/60 p-6">
                <h3 className="text-lg font-bold text-white mb-6 mt-16">
                  Mục lục
                </h3>
                <nav className="space-y-2">
                  {sections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => handleSectionChange(section.id)}
                      className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-300 flex items-center gap-3 ${
                        activeSection === section.id
                          ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 text-white shadow-lg'
                          : 'text-slate-400 hover:text-white hover:bg-slate-800/50 border border-transparent'
                      }`}
                    >
                      <span className="font-medium text-sm">{section.title}</span>
                      {activeSection === section.id && (
                        <div className="ml-auto w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                      )}
                    </button>
                  ))}
                </nav>
              </div>
            </div>
          )}

          {/* Main content */}
          <div className="flex-1 min-w-0">
            <div className={`bg-slate-900/60 backdrop-blur-sm border border-slate-800/60 rounded-3xl p-8 sm:p-12 shadow-2xl shadow-slate-950/50 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              {/* Title */}
              <div className="text-center mb-12">
                <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent mb-4 tracking-tight">
                  Điều khoản sử dụng
                </h1>
              </div>

          {/* Content sections */}
          <div className="space-y-10 text-slate-300">
            {renderSectionContent()}
          </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-slate-800/60 backdrop-blur-sm relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 text-center">
          <Link 
            to="/privacy-policy" 
            className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500/10 to-emerald-500/10 border border-cyan-500/20 text-slate-300 hover:text-white transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20 hover:-translate-y-1"
          >
            <span className="text-cyan-400">🛡</span>
            <span>Xem Chính sách bảo mật</span>
            <span className="text-xs opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const PrivacyPolicyPage: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState('intro');

  const sections = [
    { id: 'intro', title: 'Giới thiệu', number: 1 },
    { id: 'collection', title: 'Thu thập dữ liệu', number: 2 },
    { id: 'usage', title: 'Sử dụng thông tin', number: 3 },
    { id: 'protection', title: 'Bảo vệ dữ liệu', number: 4 },
    { id: 'thirdparty', title: 'Chia sẻ bên thứ ba', number: 5 },
    { id: 'rights', title: 'Quyền của bạn', number: 6 },
    { id: 'contact', title: 'Liên hệ', number: 7 },
    { id: 'updates', title: 'Cập nhật', number: 8 }
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
  };

  const renderSectionContent = () => {
    switch(activeSection) {
      case 'intro':
        return (
          <section className="group hover:bg-slate-800/20 rounded-2xl p-6 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/5 border border-transparent hover:border-slate-700/30">
            <h2 className="text-2xl font-bold text-white mb-6">
              <span className="bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">Giới thiệu về SupportHR</span>
            </h2>
            <div className="bg-gradient-to-r from-slate-800/30 to-slate-700/20 rounded-xl p-6 border border-slate-700/30">
              <p className="leading-relaxed text-slate-200 text-lg mb-4">
                <strong className="text-cyan-400">SupportHR</strong> ("chúng tôi", "của chúng tôi") cam kết bảo vệ quyền riêng tư của bạn. 
                Chính sách bảo mật này giải thích cách chúng tôi thu thập, sử dụng, tiết lộ và 
                bảo vệ thông tin của bạn khi bạn sử dụng nền tảng AI hỗ trợ tuyển dụng của chúng tôi.
              </p>
              <p className="leading-relaxed text-slate-200 text-lg">
                Chúng tôi hiểu rằng thông tin cá nhân và dữ liệu tuyển dụng là những tài sản quý giá 
                cần được bảo vệ một cách tối đa và sử dụng một cách thông minh.
              </p>
            </div>
          </section>
        );
      case 'collection':
        return (
          <section className="group hover:bg-slate-800/20 rounded-2xl p-6 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/5 border border-transparent hover:border-slate-700/30">
            <h2 className="text-2xl font-bold text-white mb-6">
              <span className="bg-gradient-to-r from-white to-emerald-200 bg-clip-text text-transparent">Thu thập dữ liệu</span>
            </h2>
            <div className="space-y-4">
              <div className="group bg-gradient-to-br from-slate-800/60 to-slate-700/30 rounded-2xl p-6 border border-slate-700/50 hover:border-cyan-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10 hover:-translate-y-1">
                <div className="flex items-center gap-3 mb-4">

                  <h3 className="font-semibold text-white text-lg">Thông tin cá nhân</h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3"><span className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></span><span>Địa chỉ email khi đăng ký tài khoản</span></li>
                  <li className="flex items-start gap-3"><span className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></span><span>Tên hiển thị (nếu bạn cung cấp)</span></li>
                  <li className="flex items-start gap-3"><span className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></span><span>Thông tin đăng nhập qua Google</span></li>
                </ul>
              </div>
              <div className="group bg-gradient-to-br from-slate-800/60 to-slate-700/30 rounded-2xl p-6 border border-slate-700/50 hover:border-emerald-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/10 hover:-translate-y-1">
                <div className="flex items-center gap-3 mb-4">

                  <h3 className="font-semibold text-white text-lg">Dữ liệu sử dụng</h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3"><span className="w-2 h-2 bg-emerald-400 rounded-full mt-2 flex-shrink-0"></span><span>Mô tả công việc (JD) bạn nhập vào hệ thống</span></li>
                  <li className="flex items-start gap-3"><span className="w-2 h-2 bg-emerald-400 rounded-full mt-2 flex-shrink-0"></span><span>CV ứng viên bạn tải lên để phân tích</span></li>
                  <li className="flex items-start gap-3"><span className="w-2 h-2 bg-emerald-400 rounded-full mt-2 flex-shrink-0"></span><span>Lịch sử phân tích và kết quả sàng lọc</span></li>
                  <li className="flex items-start gap-3"><span className="w-2 h-2 bg-emerald-400 rounded-full mt-2 flex-shrink-0"></span><span>Cấu hình tiêu chí đánh giá của bạn</span></li>
                </ul>
              </div>
              <div className="group bg-gradient-to-br from-slate-800/60 to-slate-700/30 rounded-2xl p-6 border border-slate-700/50 hover:border-purple-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10 hover:-translate-y-1">
                <div className="flex items-center gap-3 mb-4">

                  <h3 className="font-semibold text-white text-lg">Dữ liệu kỹ thuật</h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3"><span className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></span><span>Địa chỉ IP và thông tin trình duyệt</span></li>
                  <li className="flex items-start gap-3"><span className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></span><span>Loại thiết bị và hệ điều hành</span></li>
                  <li className="flex items-start gap-3"><span className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></span><span>Thời gian truy cập và tương tác với nền tảng</span></li>
                </ul>
              </div>
            </div>
          </section>
        );
      case 'usage':
        return (
          <section className="group hover:bg-slate-800/20 rounded-2xl p-6 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/5 border border-transparent hover:border-slate-700/30">
            <h2 className="text-2xl font-bold text-white mb-6">
              <span className="bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">Sử dụng thông tin</span>
            </h2>
            <div className="bg-gradient-to-r from-slate-800/30 to-slate-700/20 rounded-xl p-6 border border-slate-700/30">
              <p className="leading-relaxed mb-4 text-slate-200">Chúng tôi sử dụng thông tin của bạn để:</p>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></span>
                  <span>Cung cấp và vận hành các dịch vụ phân tích CV và tuyển dụng</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></span>
                  <span>Cải thiện thuật toán và độ chính xác của phân tích</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></span>
                  <span>Gửi thông báo và cập nhật về dịch vụ</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></span>
                  <span>Hỗ trợ khách hàng và giải quyết vấn đề kỹ thuật</span>
                </div>
              </div>
            </div>
          </section>
        );
      case 'protection':
        return (
          <section className="group hover:bg-slate-800/20 rounded-2xl p-6 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/5 border border-transparent hover:border-slate-700/30">
            <h2 className="text-2xl font-bold text-white mb-6">
              <span className="bg-gradient-to-r from-white to-green-200 bg-clip-text text-transparent">Bảo vệ dữ liệu</span>
            </h2>
            <div className="bg-gradient-to-r from-slate-800/30 to-slate-700/20 rounded-xl p-6 border border-slate-700/30">
              <p className="leading-relaxed mb-4 text-slate-200">Chúng tôi áp dụng các biện pháp bảo mật tiên tiến:</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-slate-800/30 rounded-lg p-4">
                  <h3 className="font-medium text-white mb-2">Mã hóa dữ liệu</h3>
                  <p className="text-slate-400 text-sm">Tất cả dữ liệu được mã hóa trong quá trình truyền tải và lưu trữ</p>
                </div>
                <div className="bg-slate-800/30 rounded-lg p-4">
                  <h3 className="font-medium text-white mb-2">Kiểm soát truy cập</h3>
                  <p className="text-slate-400 text-sm">Chỉ nhân viên được ủy quyền mới có thể truy cập dữ liệu cần thiết</p>
                </div>
                <div className="bg-slate-800/30 rounded-lg p-4">
                  <h3 className="font-medium text-white mb-2">Sao lưu định kỳ</h3>
                  <p className="text-slate-400 text-sm">Dữ liệu được sao lưu thường xuyên để đảm bảo tính khả dụng</p>
                </div>
                <div className="bg-slate-800/30 rounded-lg p-4">
                  <h3 className="font-medium text-white mb-2">Giám sát bảo mật</h3>
                  <p className="text-slate-400 text-sm">Hệ thống giám sát 24/7 để phát hiện và ngăn chặn truy cập trái phép</p>
                </div>
              </div>
            </div>
          </section>
        );
      case 'thirdparty':
        return (
          <section className="group hover:bg-slate-800/20 rounded-2xl p-6 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/5 border border-transparent hover:border-slate-700/30">
            <h2 className="text-2xl font-bold text-white mb-6">
              <span className="bg-gradient-to-r from-white to-orange-200 bg-clip-text text-transparent">Chia sẻ bên thứ ba</span>
            </h2>
            <div className="bg-gradient-to-r from-slate-800/30 to-slate-700/20 rounded-xl p-6 border border-slate-700/30">
              <p className="leading-relaxed mb-4 text-slate-200">Chúng tôi không bán, cho thuê hoặc chia sẻ thông tin cá nhân với bên thứ ba, ngoại trừ:</p>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></span>
                  <span>Khi có yêu cầu từ cơ quan pháp luật có thẩm quyền</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></span>
                  <span>Với các nhà cung cấp dịch vụ kỹ thuật (hosting, email) dưới hợp đồng bảo mật</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></span>
                  <span>Khi có sự đồng ý rõ ràng từ phía bạn</span>
                </div>
              </div>
            </div>
          </section>
        );
      case 'rights':
        return (
          <section className="group hover:bg-slate-800/20 rounded-2xl p-6 transition-all duration-300 hover:shadow-lg hover:shadow-pink-500/5 border border-transparent hover:border-slate-700/30">
            <h2 className="text-2xl font-bold text-white mb-6">
              <span className="bg-gradient-to-r from-white to-pink-200 bg-clip-text text-transparent">Quyền của bạn</span>
            </h2>
            <div className="bg-gradient-to-r from-slate-800/30 to-slate-700/20 rounded-xl p-6 border border-slate-700/30">
              <p className="leading-relaxed mb-4 text-slate-200">Bạn có các quyền sau đối với dữ liệu cá nhân của mình:</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-slate-800/30 rounded-lg p-4">
                  <h3 className="font-medium text-white mb-2">Quyền truy cập</h3>
                  <p className="text-slate-400 text-sm">Yêu cầu xem thông tin cá nhân được lưu trữ</p>
                </div>
                <div className="bg-slate-800/30 rounded-lg p-4">
                  <h3 className="font-medium text-white mb-2">Quyền chỉnh sửa</h3>
                  <p className="text-slate-400 text-sm">Cập nhật hoặc sửa đổi thông tin không chính xác</p>
                </div>
                <div className="bg-slate-800/30 rounded-lg p-4">
                  <h3 className="font-medium text-white mb-2">Quyền xóa</h3>
                  <p className="text-slate-400 text-sm">Yêu cầu xóa toàn bộ dữ liệu cá nhân</p>
                </div>
                <div className="bg-slate-800/30 rounded-lg p-4">
                  <h3 className="font-medium text-white mb-2">Quyền rút lại đồng ý</h3>
                  <p className="text-slate-400 text-sm">Hủy đồng ý xử lý dữ liệu bất kỳ lúc nào</p>
                </div>
              </div>
            </div>
          </section>
        );
      case 'contact':
        return (
          <section className="group hover:bg-slate-800/20 rounded-2xl p-6 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/5 border border-transparent hover:border-slate-700/30">
            <h2 className="text-2xl font-bold text-white mb-6">
              <span className="bg-gradient-to-r from-white to-indigo-200 bg-clip-text text-transparent">Thông tin liên hệ</span>
            </h2>
            <div className="bg-gradient-to-r from-slate-800/30 to-slate-700/20 rounded-xl p-6 border border-slate-700/30">
              <p className="leading-relaxed mb-6 text-slate-200">
                Nếu bạn có câu hỏi về chính sách bảo mật này hoặc muốn thực hiện các quyền của mình, 
                vui lòng liên hệ với chúng tôi:
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-slate-800/30 rounded-lg">
                  <div>
                    <p className="font-medium text-white">Email</p>
                    <p className="text-slate-400">privacy@supporthr.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-slate-800/30 rounded-lg">
                  <div>
                    <p className="font-medium text-white">Hỗ trợ khách hàng</p>
                    <p className="text-slate-400">support@supporthr.com</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
      case 'updates':
        return (
          <section className="group hover:bg-slate-800/20 rounded-2xl p-6 transition-all duration-300 hover:shadow-lg hover:shadow-yellow-500/5 border border-transparent hover:border-slate-700/30">
            <h2 className="text-2xl font-bold text-white mb-6">
              <span className="bg-gradient-to-r from-white to-yellow-200 bg-clip-text text-transparent">Cập nhật chính sách</span>
            </h2>
            <div className="bg-gradient-to-r from-slate-800/30 to-slate-700/20 rounded-xl p-6 border border-slate-700/30">
              <p className="leading-relaxed mb-4 text-slate-200">
                Chúng tôi có thể cập nhật chính sách bảo mật này theo thời gian để phản ánh 
                các thay đổi trong dịch vụ hoặc yêu cầu pháp lý.
              </p>
              <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
                <div>
                  <h4 className="font-semibold text-yellow-200 mb-2">Thông báo thay đổi</h4>
                  <p className="text-yellow-100 text-sm">
                    Khi có thay đổi quan trọng, chúng tôi sẽ thông báo qua email và 
                    hiển thị thông báo trên nền tảng. Việc tiếp tục sử dụng dịch vụ 
                    sau khi có thay đổi có nghĩa là bạn chấp nhận chính sách mới.
                  </p>
                </div>
              </div>
            </div>
          </section>
        );
      default:
        return (
          <section className="group hover:bg-slate-800/20 rounded-2xl p-6 transition-all duration-300">
            <p className="text-slate-400">Nội dung sẽ được cập nhật...</p>
          </section>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-gradient-to-br from-emerald-500/20 to-teal-500/20 blur-3xl animate-pulse delay-1000"></div>
        <div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-gradient-to-br from-purple-500/10 to-pink-500/10 blur-3xl animate-pulse delay-500"
          style={{ transform: `translateY(${scrollY * 0.1}px)` }}
        ></div>
      </div>
      
      {/* Header */}
      <div className="bg-slate-900/90 border-b border-slate-800/60 sticky top-0 z-10 backdrop-blur-md shadow-xl">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4">
          <Link 
            to="/" 
            className="group inline-flex items-center gap-3 text-slate-400 hover:text-cyan-400 transition-all duration-300 hover:gap-4"
          >
            <span className="text-2xl">←</span>
            <span className="font-medium">Quay lại trang chủ</span>
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 relative z-10">
        {/* Main content container */}
        <div className={`bg-slate-900/60 backdrop-blur-sm border border-slate-800/60 rounded-3xl p-6 sm:p-8 lg:p-12 shadow-2xl shadow-slate-950/50 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Title */}
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-white via-cyan-200 to-emerald-200 bg-clip-text text-transparent mb-4 tracking-tight">
              Chính sách bảo mật
            </h1>
            <p className="text-slate-400 text-sm">
              (Privacy Policy)
            </p>
          </div>

          {/* Horizontal Navigation Stepper */}
          <div className="mb-10">
            {/* Desktop Navigation */}
            <div className="hidden lg:block">
              <div className="relative">
                {/* Progress Line */}
                <div className="absolute top-6 left-0 right-0 h-0.5 bg-slate-700/50">
                  <div 
                    className="h-full bg-gradient-to-r from-cyan-500 to-emerald-500 transition-all duration-500"
                    style={{ 
                      width: `${((sections.findIndex(s => s.id === activeSection) + 1) / sections.length) * 100}%` 
                    }}
                  ></div>
                </div>
                
                {/* Steps */}
                <div className="relative flex items-center justify-between">
                  {sections.map((section, index) => {
                    const isActive = section.id === activeSection;
                    const isPassed = sections.findIndex(s => s.id === activeSection) >= index;
                    
                    return (
                      <div key={section.id} className="flex-1 flex flex-col items-center">
                        <button
                          onClick={() => handleSectionChange(section.id)}
                          className="group flex flex-col items-center gap-2 transition-all duration-300"
                        >
                          {/* Circle */}
                          <div className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                            isActive 
                              ? 'bg-gradient-to-br from-cyan-500 to-emerald-500 text-white shadow-lg shadow-cyan-500/50 scale-110' 
                              : isPassed
                                ? 'bg-gradient-to-br from-cyan-500/30 to-emerald-500/30 text-cyan-300 border-2 border-cyan-400/50'
                                : 'bg-slate-800/80 text-slate-500 border-2 border-slate-700/50 group-hover:border-slate-600 group-hover:bg-slate-700/80'
                          }`}>
                            {section.number}
                          </div>
                          
                          {/* Label */}
                          <span className={`text-xs sm:text-sm text-center max-w-[100px] transition-all duration-300 ${
                            isActive 
                              ? 'text-white font-semibold' 
                              : isPassed 
                                ? 'text-slate-300'
                                : 'text-slate-500 group-hover:text-slate-400'
                          }`}>
                            {section.title}
                          </span>
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Tablet Navigation - Scrollable */}
            <div className="hidden md:block lg:hidden">
              <div className="flex items-center gap-3 overflow-x-auto pb-4 px-2 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-800/50">
                {sections.map((section) => {
                  const isActive = section.id === activeSection;
                  
                  return (
                    <button
                      key={section.id}
                      onClick={() => handleSectionChange(section.id)}
                      className={`flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all duration-300 ${
                        isActive 
                          ? 'bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 border-2 border-cyan-500/50 shadow-lg shadow-cyan-500/20' 
                          : 'bg-slate-800/50 border-2 border-slate-700/50'
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                        isActive 
                          ? 'bg-gradient-to-br from-cyan-500 to-emerald-500 text-white' 
                          : 'bg-slate-700 text-slate-400'
                      }`}>
                        {section.number}
                      </div>
                      <span className={`text-sm font-medium whitespace-nowrap ${
                        isActive ? 'text-white' : 'text-slate-400'
                      }`}>
                        {section.title}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Mobile Navigation - Compact Scrollable */}
            <div className="md:hidden">
              <div className="flex items-center gap-2 overflow-x-auto pb-4 px-2 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-800/50">
                {sections.map((section) => {
                  const isActive = section.id === activeSection;
                  
                  return (
                    <button
                      key={section.id}
                      onClick={() => handleSectionChange(section.id)}
                      className={`flex-shrink-0 flex items-center gap-2 px-3 py-2 rounded-xl transition-all duration-300 ${
                        isActive 
                          ? 'bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 border-2 border-cyan-500/50 shadow-lg shadow-cyan-500/20' 
                          : 'bg-slate-800/50 border-2 border-slate-700/50'
                      }`}
                    >
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs ${
                        isActive 
                          ? 'bg-gradient-to-br from-cyan-500 to-emerald-500 text-white' 
                          : 'bg-slate-700 text-slate-400'
                      }`}>
                        {section.number}
                      </div>
                      <span className={`text-xs font-medium whitespace-nowrap ${
                        isActive ? 'text-white' : 'text-slate-400'
                      }`}>
                        {section.title}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Dynamic Content */}
          <div className="text-slate-300">
            {renderSectionContent()}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-slate-800/60 backdrop-blur-sm relative z-10 mt-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 text-center">
          <Link 
            to="/terms" 
            className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 text-slate-300 hover:text-white transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 hover:-translate-y-1"
          >
            📄
            <span>Xem Điều khoản sử dụng</span>
            <span className="text-xs opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;

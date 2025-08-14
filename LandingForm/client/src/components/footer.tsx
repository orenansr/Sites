export default function Footer() {
  const socialLinks = [
    { icon: "fab fa-twitter", href: "#", testId: "social-twitter" },
    { icon: "fab fa-linkedin", href: "#", testId: "social-linkedin" },
    { icon: "fab fa-instagram", href: "#", testId: "social-instagram" }
  ];

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center">
              <i className="fas fa-bolt text-white text-sm"></i>
            </div>
            <span className="text-xl font-bold" data-testid="footer-brand">ConnectPro</span>
          </div>
          
          <div className="flex space-x-6">
            {socialLinks.map((link, index) => (
              <a 
                key={index}
                href={link.href} 
                className="text-gray-400 hover:text-white transition-colors"
                data-testid={link.testId}
              >
                <i className={link.icon}></i>
              </a>
            ))}
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p data-testid="footer-copyright">&copy; 2024 ConnectPro. Todos os direitos reservados.</p>
            <a 
              href="/admin" 
              className="text-gray-500 hover:text-gray-300 text-sm transition-colors mt-2 sm:mt-0"
              data-testid="footer-admin-link"
            >
              Ver contatos recebidos
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

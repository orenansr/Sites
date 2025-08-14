import { useEffect, useState } from "react";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/95 backdrop-blur-md border-b border-gray-200" : "bg-white/80 backdrop-blur-md border-b border-gray-200"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center">
              <i className="fas fa-bolt text-white text-sm"></i>
            </div>
            <span className="text-xl font-bold text-gray-900">ConnectPro</span>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection("inicio")}
              className="text-gray-600 hover:text-blue-600 font-medium transition-colors"
              data-testid="nav-inicio"
            >
              Início
            </button>
            <button 
              onClick={() => scrollToSection("sobre")}
              className="text-gray-600 hover:text-blue-600 font-medium transition-colors"
              data-testid="nav-sobre"
            >
              Sobre
            </button>
            <button 
              onClick={() => scrollToSection("contato")}
              className="text-gray-600 hover:text-blue-600 font-medium transition-colors"
              data-testid="nav-contato"
            >
              Contato
            </button>
          </nav>
          <button className="md:hidden p-2 rounded-md text-gray-600 hover:text-blue-600 hover:bg-gray-100 transition-colors">
            <i className="fas fa-bars"></i>
          </button>
        </div>
      </div>
    </header>
  );
}

export default function HeroSection() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section 
      id="inicio" 
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-gray-900/[0.04] bg-[size:20px_20px]"></div>
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-bounce-gentle"></div>
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-bounce-gentle animation-delay-2s"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center animate-fade-in-up">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Conecte-se com o{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Futuro
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Transforme suas ideias em realidade. Entre em contato conosco e descubra como podemos ajudar a impulsionar seu negócio para o próximo nível.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button 
              onClick={() => scrollToSection("contato")}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center space-x-2 group"
              data-testid="button-comecar"
            >
              <span>Começar Agora</span>
              <i className="fas fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
            </button>
            <button 
              onClick={() => scrollToSection("sobre")}
              className="border border-gray-300 hover:border-blue-600 text-gray-700 hover:text-blue-600 font-semibold px-8 py-4 rounded-xl transition-all duration-300 hover:bg-blue-50"
              data-testid="button-saiba-mais"
            >
              Saiba Mais
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce-gentle">
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}

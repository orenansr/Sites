export default function FeaturesSection() {
  const features = [
    {
      icon: "fas fa-rocket",
      title: "Inovação Constante",
      description: "Utilizamos as tecnologias mais avançadas para criar soluções que realmente fazem a diferença no seu negócio.",
      bgColor: "bg-blue-100",
      hoverColor: "group-hover:bg-blue-500",
      iconColor: "text-blue-500",
      hoverIconColor: "group-hover:text-white",
      delay: "0.1s"
    },
    {
      icon: "fas fa-users",
      title: "Suporte Especializado",
      description: "Nossa equipe está sempre pronta para ajudar, oferecendo suporte personalizado e eficiente.",
      bgColor: "bg-green-100",
      hoverColor: "group-hover:bg-green-500",
      iconColor: "text-green-500",
      hoverIconColor: "group-hover:text-white",
      delay: "0.2s"
    },
    {
      icon: "fas fa-chart-line",
      title: "Resultados Garantidos",
      description: "Focamos em entregar resultados mensuráveis que impactem positivamente seus objetivos de negócio.",
      bgColor: "bg-purple-100",
      hoverColor: "group-hover:bg-purple-500",
      iconColor: "text-purple-500",
      hoverIconColor: "group-hover:text-white",
      delay: "0.3s"
    }
  ];

  return (
    <section id="sobre" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Por que nos escolher?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Oferecemos soluções inovadoras e personalizadas para atender às suas necessidades específicas.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group bg-gray-50 hover:bg-white p-8 rounded-2xl transition-all duration-300 hover:shadow-xl border border-transparent hover:border-blue-100 animate-fade-in-up"
              style={{ animationDelay: feature.delay }}
              data-testid={`feature-card-${index}`}
            >
              <div className={`w-12 h-12 ${feature.bgColor} ${feature.hoverColor} rounded-xl flex items-center justify-center mb-6 transition-all duration-300`}>
                <i className={`${feature.icon} ${feature.iconColor} ${feature.hoverIconColor} transition-colors`}></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4" data-testid={`feature-title-${index}`}>
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed" data-testid={`feature-description-${index}`}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

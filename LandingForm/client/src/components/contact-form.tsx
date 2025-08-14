import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { insertContactSchema } from "@shared/schema";
import type { InsertContact } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ContactForm() {
  const [showSuccess, setShowSuccess] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<InsertContact>({
    resolver: zodResolver(insertContactSchema),
    defaultValues: {
      nome: "",
      email: "",
      telefone: "",
    },
  });

  const contactMutation = useMutation({
    mutationFn: async (data: InsertContact) => {
      const response = await apiRequest("POST", "/api/contacts", data);
      return response.json();
    },
    onSuccess: () => {
      setShowSuccess(true);
      form.reset();
      toast({
        title: "Mensagem enviada com sucesso!",
        description: "Entraremos em contato em breve.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/contacts"] });
      
      // Hide success message after 5 seconds
      setTimeout(() => {
        setShowSuccess(false);
      }, 5000);
    },
    onError: (error: any) => {
      toast({
        title: "Erro ao enviar mensagem",
        description: error.message || "Tente novamente em alguns instantes.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertContact) => {
    contactMutation.mutate(data);
  };

  // Format phone number as user types
  const formatPhoneNumber = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    
    if (numbers.length >= 11) {
      return numbers.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    } else if (numbers.length >= 10) {
      return numbers.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    } else if (numbers.length >= 6) {
      return numbers.replace(/(\d{2})(\d{4})/, '($1) $2');
    } else if (numbers.length >= 2) {
      return numbers.replace(/(\d{2})/, '($1) ');
    }
    
    return numbers;
  };

  const contactInfo = [
    {
      icon: "fas fa-envelope",
      title: "Email",
      info: "contato@connectpro.com",
      bgColor: "bg-blue-100",
      iconColor: "text-blue-600",
      delay: "0.4s"
    },
    {
      icon: "fas fa-phone",
      title: "Telefone",
      info: "(11) 9999-9999",
      bgColor: "bg-green-100",
      iconColor: "text-green-600",
      delay: "0.5s"
    },
    {
      icon: "fas fa-map-marker-alt",
      title: "Localização",
      info: "São Paulo, SP",
      bgColor: "bg-purple-100",
      iconColor: "text-purple-600",
      delay: "0.6s"
    }
  ];

  return (
    <section id="contato" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-40 h-40 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70"></div>
        <div className="absolute bottom-20 left-20 w-40 h-40 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-70"></div>
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-fade-in-up">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Vamos Conversar?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Preencha o formulário abaixo e nossa equipe entrará em contato em até 24 horas.
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 animate-fade-in-up animation-delay-200ms">
          {showSuccess ? (
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-green-800 text-center" data-testid="success-message">
              <i className="fas fa-check-circle text-green-500 mr-2"></i>
              <span className="font-medium">Mensagem enviada com sucesso!</span>
              <p className="text-sm mt-1 text-green-600">Entraremos em contato em breve.</p>
            </div>
          ) : (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" data-testid="contact-form">
                <FormField
                  control={form.control}
                  name="nome"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="block text-sm font-semibold text-gray-700">
                        Nome Completo *
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <i className="fas fa-user text-gray-400"></i>
                          </div>
                          <Input
                            {...field}
                            placeholder="Digite seu nome completo"
                            className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-900 placeholder-gray-500 hover:border-gray-300"
                            data-testid="input-nome"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="block text-sm font-semibold text-gray-700">
                        Email *
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <i className="fas fa-envelope text-gray-400"></i>
                          </div>
                          <Input
                            {...field}
                            type="email"
                            placeholder="seu.email@exemplo.com"
                            className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-900 placeholder-gray-500 hover:border-gray-300"
                            data-testid="input-email"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="telefone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="block text-sm font-semibold text-gray-700">
                        Telefone *
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <i className="fas fa-phone text-gray-400"></i>
                          </div>
                          <Input
                            {...field}
                            type="tel"
                            placeholder="(11) 99999-9999"
                            className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-900 placeholder-gray-500 hover:border-gray-300"
                            onChange={(e) => {
                              const formatted = formatPhoneNumber(e.target.value);
                              field.onChange(formatted);
                            }}
                            data-testid="input-telefone"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  disabled={contactMutation.isPending}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg flex items-center justify-center space-x-2 group disabled:opacity-50 disabled:cursor-not-allowed"
                  data-testid="button-submit"
                >
                  {contactMutation.isPending ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Enviando...</span>
                    </>
                  ) : (
                    <>
                      <span>Enviar Mensagem</span>
                      <i className="fas fa-paper-plane group-hover:translate-x-1 transition-transform"></i>
                    </>
                  )}
                </Button>
              </form>
            </Form>
          )}
        </div>

        {/* Contact Info */}
        <div className="mt-12 grid md:grid-cols-3 gap-6 text-center">
          {contactInfo.map((info, index) => (
            <div 
              key={index}
              className="flex flex-col items-center animate-fade-in-up"
              style={{ animationDelay: info.delay }}
              data-testid={`contact-info-${index}`}
            >
              <div className={`w-12 h-12 ${info.bgColor} rounded-xl flex items-center justify-center mb-4`}>
                <i className={`${info.icon} ${info.iconColor}`}></i>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2" data-testid={`contact-title-${index}`}>
                {info.title}
              </h3>
              <p className="text-gray-600" data-testid={`contact-info-text-${index}`}>
                {info.info}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

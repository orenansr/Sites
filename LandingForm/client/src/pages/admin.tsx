import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Contact } from "@shared/schema";

export default function Admin() {
  const { data: response, isLoading, error } = useQuery<{ success: boolean; contacts: Contact[] }>({
    queryKey: ["/api/contacts"],
    queryFn: async () => {
      const res = await fetch("/api/contacts");
      if (!res.ok) throw new Error("Failed to fetch contacts");
      return res.json();
    },
  });

  const contacts = response?.contacts || [];

  const formatDate = (date: string | Date) => {
    return new Date(date).toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit", 
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center py-12">
            <div className="text-red-600 mb-4">
              <i className="fas fa-exclamation-triangle text-4xl"></i>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Erro ao carregar contatos</h2>
            <p className="text-gray-600">Tente recarregar a página</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900" data-testid="admin-title">
                Contatos Recebidos
              </h1>
              <p className="text-gray-600 mt-1" data-testid="admin-description">
                Visualize todos os contatos enviados através do formulário
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="secondary" data-testid="contact-count">
                {contacts.length} contatos
              </Badge>
              <a 
                href="/"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
                data-testid="link-home"
              >
                <i className="fas fa-home"></i>
                <span>Voltar ao Site</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {contacts.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <i className="fas fa-inbox text-6xl"></i>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2" data-testid="empty-state-title">
              Nenhum contato ainda
            </h3>
            <p className="text-gray-600" data-testid="empty-state-description">
              Os contatos enviados através do formulário aparecerão aqui
            </p>
          </div>
        ) : (
          <div className="grid gap-6">
            {contacts.map((contact, index) => (
              <Card key={contact.id} className="hover:shadow-lg transition-shadow" data-testid={`contact-card-${index}`}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg" data-testid={`contact-name-${index}`}>
                      {contact.nome}
                    </CardTitle>
                    <Badge variant="outline" data-testid={`contact-date-${index}`}>
                      {formatDate(contact.createdAt)}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                        <i className="fas fa-envelope text-blue-600 text-sm"></i>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Email</p>
                        <p className="font-medium" data-testid={`contact-email-${index}`}>
                          {contact.email}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                        <i className="fas fa-phone text-green-600 text-sm"></i>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Telefone</p>
                        <p className="font-medium" data-testid={`contact-phone-${index}`}>
                          {contact.telefone}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
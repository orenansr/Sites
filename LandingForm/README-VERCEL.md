# Como Fazer Deploy no Vercel

Este guia explica como publicar seu site ConnectPro no Vercel.

## Opção 1: Deploy Direto (Recomendado)

### Passo 1: Preparar o Repositório
1. Crie uma conta no [GitHub](https://github.com) se não tiver
2. Crie um novo repositório público
3. Faça upload de todos os arquivos do projeto para o repositório

### Passo 2: Conectar ao Vercel
1. Vá para [vercel.com](https://vercel.com)
2. Faça login com sua conta GitHub
3. Clique em "New Project"
4. Selecione seu repositório
5. Configure as seguintes opções:
   - **Framework Preset**: Other
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist/client`
   - **Install Command**: `npm install`

### Passo 3: Variáveis de Ambiente (Opcional)
Se você quiser usar banco de dados no futuro:
- Na dashboard do Vercel, vá em Settings > Environment Variables
- Adicione `DATABASE_URL` se necessário

## Opção 2: Deploy Manual

### Preparação dos Arquivos
1. Execute o script de build:
   ```bash
   chmod +x build.sh
   ./build.sh
   ```

2. Faça upload da pasta `vercel-build` para um repositório GitHub

3. Siga os passos da Opção 1

## Como Funciona

### Frontend
- O site fica hospedado como uma Single Page Application (SPA)
- Todas as páginas (principal e admin) funcionam normalmente
- Responsive design funciona em todos os dispositivos

### Backend/API
- As rotas `/api/*` são processadas por serverless functions
- Os dados ficam em memória durante a sessão
- Para persistência permanente, você pode configurar um banco de dados

### Limitações
- **Dados temporários**: Como está usando memória, os contatos são perdidos quando a function "hiberna"
- **Soluções**:
  - Para testes: Perfeito como está
  - Para produção: Adicionar banco de dados (Neon, PlanetScale, etc.)

## Estrutura Final no Vercel

```
seu-site.vercel.app/          → Página principal
seu-site.vercel.app/admin     → Página administrativa
seu-site.vercel.app/api/contacts → API dos contatos
```

## Banco de Dados (Opcional)

Para persistência permanente dos dados:

1. **Neon Database** (Recomendado - Grátis)
   - Crie conta em [neon.tech](https://neon.tech)
   - Crie um banco PostgreSQL
   - Adicione a URL no Vercel como `DATABASE_URL`

2. **Configuração**
   - O projeto já está preparado para PostgreSQL
   - Só precisa descomentar as linhas do banco em `storage.ts`

## Testes Finais

Após o deploy:
1. ✅ Teste o formulário de contato
2. ✅ Verifique a página `/admin`
3. ✅ Teste em dispositivos móveis
4. ✅ Confirme que os contatos aparecem na admin

## Suporte

Se tiver problemas:
- Verifique os logs no dashboard do Vercel
- Certifique-se que todas as dependências estão no `package.json`
- Confirme que o build passa localmente primeiro
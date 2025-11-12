# Arquitetura do Sistema de Geração de Capas por IA

## Visão Geral

Este documento descreve a arquitetura e design do serviço de geração de capas por IA para o portal Worcure.

## Stack Tecnológica

- **Runtime**: Node.js 18+
- **Linguagem**: TypeScript 5.3+
- **Framework Web**: Express.js 4.18
- **Validação**: Joi 17.11
- **IA**: OpenAI API (DALL-E 3)
- **Linting**: ESLint + Prettier

## Estrutura do Projeto

```
worcure-members/
├── src/
│   ├── config/           # Configurações e variáveis de ambiente
│   │   └── index.ts      # Carregamento e validação de config
│   ├── middleware/       # Middlewares Express
│   │   └── errorHandler.ts  # Tratamento global de erros
│   ├── routes/           # Definição de rotas da API
│   │   └── covers.routes.ts # Rotas de geração de capas
│   ├── services/         # Lógica de negócio
│   │   └── coverGeneration.service.ts  # Serviço de geração
│   ├── types/            # Tipos e interfaces TypeScript
│   │   └── cover.types.ts   # Tipos para geração de capas
│   ├── utils/            # Utilitários
│   │   └── validation.ts    # Schemas de validação Joi
│   └── index.ts          # Ponto de entrada da aplicação
├── .env.example          # Exemplo de variáveis de ambiente
├── .eslintrc.json        # Configuração do ESLint
├── .gitignore            # Arquivos ignorados pelo Git
├── .prettierrc.json      # Configuração do Prettier
├── tsconfig.json         # Configuração do TypeScript
├── package.json          # Dependências e scripts
├── README.md             # Documentação principal
├── EXAMPLES.md           # Exemplos de uso
├── DEPLOYMENT.md         # Guia de deployment
└── ARCHITECTURE.md       # Este arquivo

```

## Fluxo de Requisição

```
Cliente
  ↓
[POST /api/covers/generate]
  ↓
Express Middleware (parse JSON)
  ↓
Route Handler (covers.routes.ts)
  ↓
Validation (Joi schema)
  ↓
Cover Generation Service
  ↓
OpenAI API (DALL-E 3)
  ↓
Retry Logic (até 3 tentativas)
  ↓
Response to Client
```

## Componentes Principais

### 1. Configuration (config/index.ts)

Responsável por:
- Carregar variáveis de ambiente com dotenv
- Validar configurações obrigatórias
- Exportar configurações tipadas

```typescript
{
  port: number,
  nodeEnv: string,
  openai: {
    apiKey: string,
    model: string,
    defaultSize: string,
    maxAttempts: number
  }
}
```

### 2. Routes (routes/covers.routes.ts)

Define endpoints da API:
- `POST /generate` - Gera uma capa
- `GET /health` - Health check

### 3. Service (services/coverGeneration.service.ts)

Lógica principal:
- Interface com a OpenAI API
- Retry logic com exponential backoff
- Validação de prompts
- Enriquecimento de prompts

### 4. Validation (utils/validation.ts)

Schemas Joi para validação:
- Prompt: 3-1000 caracteres
- Size: 1024x1024, 1024x1792, 1792x1024
- Style: vivid, natural
- Quality: standard, hd

### 5. Error Handling (middleware/errorHandler.ts)

Middleware de erro que trata:
- Erros de validação (400)
- Erros da OpenAI (502)
- Erros de configuração (500)
- Endpoints não encontrados (404)

## Padrões de Design

### 1. Separation of Concerns
- Rotas separadas da lógica de negócio
- Serviços isolados para cada responsabilidade
- Configuração centralizada

### 2. Error Handling
- Middleware centralizado de erro
- Códigos HTTP apropriados
- Mensagens de erro informativas mas seguras

### 3. Type Safety
- TypeScript strict mode
- Interfaces para todos os contratos
- Validação em runtime com Joi

### 4. Retry Pattern
- Tentativas múltiplas automáticas
- Exponential backoff
- Configurável via environment

### 5. Configuration Management
- Variáveis de ambiente
- Validação na inicialização
- Valores padrão sensatos

## Segurança

### Implementadas
✅ Validação de entrada rigorosa
✅ Variáveis de ambiente para secrets
✅ Error handling que não expõe detalhes internos
✅ TypeScript para type safety
✅ Sem vulnerabilidades conhecidas (verificado)

### Recomendadas para Produção
- Rate limiting (express-rate-limit)
- CORS configurado apropriadamente
- Autenticação/Autorização (API keys)
- HTTPS obrigatório
- Logs estruturados
- Monitoramento de erros

## Performance

### Otimizações Atuais
- Retry logic inteligente
- Prompts otimizados automaticamente
- Código compilado (TypeScript → JavaScript)

### Possíveis Melhorias
- Cache de respostas comuns
- Fila para requisições (Bull + Redis)
- Clustering com PM2
- CDN para imagens geradas
- Compressão de respostas

## Escalabilidade

### Horizontal
- Stateless (pode rodar múltiplas instâncias)
- Pode usar load balancer
- Compatível com containers (Docker)

### Vertical
- Node.js single-threaded por padrão
- Use PM2 cluster mode para múltiplos cores
- Ajuste limites de memória conforme necessário

## Monitoramento

### Health Check
```
GET /api/covers/health
```
Retorna status do serviço e timestamp

### Logs
- Console logs para desenvolvimento
- Pode integrar Winston/Pino para produção
- Logs estruturados em JSON recomendado

### Métricas Importantes
- Taxa de sucesso de geração
- Tempo médio de resposta
- Taxa de erros por tipo
- Uso de API da OpenAI (custos)

## Custos

### Por Requisição
- DALL-E 3 Standard: ~$0.040
- DALL-E 3 HD: ~$0.080

### Considerações
- Implementar rate limiting
- Considerar cache para prompts similares
- Monitorar uso para prever custos
- Alertas para uso anormal

## Testes

### Implementados
- Build verification (TypeScript)
- Linting (ESLint)
- Manual testing de endpoints

### Recomendados
- Unit tests (Jest)
- Integration tests
- E2E tests
- Load tests (k6, Artillery)

## Deployment

### Suportado
- Node.js tradicional
- PM2
- Docker/Docker Compose
- Cloud platforms (Heroku, AWS, etc)
- Vercel/Railway/Render

Veja DEPLOYMENT.md para detalhes.

## Extensões Futuras

### Possíveis Features
1. **Múltiplos provedores de IA**
   - Stability AI
   - Midjourney API
   - DALL-E 2 como fallback

2. **Templates predefinidos**
   - Templates por categoria
   - Estilos salvos
   - Variações de uma mesma capa

3. **Processamento pós-geração**
   - Redimensionamento automático
   - Aplicação de filtros
   - Adição de texto/logo

4. **Gerenciamento de capas**
   - Histórico de gerações
   - Favoritos
   - Compartilhamento

5. **Analytics**
   - Prompts mais usados
   - Estilos mais populares
   - Tempo médio de geração

## Dependências Principais

```json
{
  "openai": "^4.20.0",      // API da OpenAI
  "express": "^4.18.2",     // Framework web
  "dotenv": "^16.3.1",      // Variáveis de ambiente
  "joi": "^17.11.0",        // Validação de schemas
  "typescript": "^5.3.2"    // TypeScript
}
```

## Comandos Úteis

```bash
# Desenvolvimento
npm run dev              # Inicia com hot-reload

# Produção
npm run build           # Compila TypeScript
npm start               # Inicia servidor

# Qualidade
npm run lint            # Executa ESLint
npm run format          # Formata com Prettier
```

## Contato e Suporte

Para questões técnicas ou contribuições, consulte:
- README.md - Documentação geral
- EXAMPLES.md - Exemplos práticos
- DEPLOYMENT.md - Guia de deploy

## Changelog

### v1.0.0 (2025-11-12)
- ✨ Implementação inicial
- ✨ Integração com OpenAI DALL-E 3
- ✨ API RESTful completa
- ✨ Documentação em português
- ✨ Validação e error handling
- ✨ Retry logic
- ✅ Testes de segurança passando

---

**Desenvolvido para o portal Worcure** 🚀

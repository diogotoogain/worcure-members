# Worcure Members - AI Cover Generation Service

Sistema de geração de capas utilizando inteligência artificial para o portal Worcure.

## 🎨 Funcionalidades

- Geração automática de capas usando OpenAI DALL-E 3
- API RESTful para integração fácil
- Validação de requisições
- Retry automático em caso de falhas
- Suporte para múltiplos tamanhos e estilos de imagem
- Configuração via variáveis de ambiente

## 🚀 Início Rápido

### Pré-requisitos

- Node.js 18+ 
- npm ou yarn
- Chave de API da OpenAI

### Instalação

1. Clone o repositório:
```bash
git clone https://github.com/diogotoogain/worcure-members.git
cd worcure-members
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env
```

Edite o arquivo `.env` e adicione sua chave de API da OpenAI:
```env
OPENAI_API_KEY=sk-your-api-key-here
PORT=3000
NODE_ENV=development
```

4. Execute o servidor:

**Modo desenvolvimento:**
```bash
npm run dev
```

**Modo produção:**
```bash
npm run build
npm start
```

## 📡 API Endpoints

### 1. Gerar Capa

**Endpoint:** `POST /api/covers/generate`

**Request Body:**
```json
{
  "prompt": "Uma capa moderna para um livro sobre tecnologia",
  "size": "1024x1024",
  "style": "vivid",
  "quality": "standard"
}
```

**Parâmetros:**

- `prompt` (obrigatório): Descrição da capa desejada (3-1000 caracteres)
- `size` (opcional): Tamanho da imagem 
  - `1024x1024` (padrão - quadrado)
  - `1024x1792` (vertical)
  - `1792x1024` (horizontal)
- `style` (opcional): Estilo da imagem
  - `vivid` (padrão - mais vibrante e dramático)
  - `natural` (mais natural e realista)
- `quality` (opcional): Qualidade da imagem
  - `standard` (padrão)
  - `hd` (alta definição)

**Response Success (200):**
```json
{
  "success": true,
  "data": {
    "url": "https://oaidalleapiprodscus.blob.core.windows.net/...",
    "revisedPrompt": "A modern book cover design for technology...",
    "generatedAt": "2025-11-12T07:00:00.000Z"
  }
}
```

**Response Error (400/500/502):**
```json
{
  "error": {
    "message": "Validation error: Prompt is required",
    "code": 400,
    "details": "..."
  }
}
```

### 2. Health Check

**Endpoint:** `GET /api/covers/health`

**Response:**
```json
{
  "success": true,
  "message": "Cover generation service is healthy",
  "timestamp": "2025-11-12T07:00:00.000Z"
}
```

### 3. Info

**Endpoint:** `GET /`

**Response:**
```json
{
  "message": "Worcure Members - AI Cover Generation Service",
  "version": "1.0.0",
  "endpoints": {
    "generateCover": "POST /api/covers/generate",
    "health": "GET /api/covers/health"
  }
}
```

## 🔧 Configuração

### Variáveis de Ambiente

| Variável | Descrição | Padrão |
|----------|-----------|--------|
| `OPENAI_API_KEY` | Chave de API da OpenAI | *obrigatório* |
| `PORT` | Porta do servidor | `3000` |
| `NODE_ENV` | Ambiente de execução | `development` |
| `DEFAULT_IMAGE_SIZE` | Tamanho padrão das imagens | `1024x1024` |
| `DEFAULT_MODEL` | Modelo de IA a usar | `dall-e-3` |
| `MAX_GENERATION_ATTEMPTS` | Tentativas máximas de geração | `3` |

## 🛠️ Scripts Disponíveis

- `npm run build` - Compila o TypeScript para JavaScript
- `npm start` - Inicia o servidor em produção
- `npm run dev` - Inicia o servidor em modo desenvolvimento com hot-reload
- `npm run lint` - Executa o linter
- `npm run format` - Formata o código com Prettier

## 📁 Estrutura do Projeto

```
worcure-members/
├── src/
│   ├── config/           # Configurações da aplicação
│   ├── middleware/       # Middlewares Express
│   ├── routes/           # Rotas da API
│   ├── services/         # Serviços de negócio
│   ├── types/            # Tipos TypeScript
│   ├── utils/            # Utilitários
│   └── index.ts          # Ponto de entrada
├── .env.example          # Exemplo de variáveis de ambiente
├── .eslintrc.json        # Configuração do ESLint
├── .gitignore            # Arquivos ignorados pelo Git
├── .prettierrc.json      # Configuração do Prettier
├── package.json          # Dependências e scripts
├── tsconfig.json         # Configuração do TypeScript
└── README.md             # Este arquivo
```

## 🔐 Segurança

- Nunca commite o arquivo `.env` com chaves reais
- Use variáveis de ambiente para dados sensíveis
- Limite o tamanho dos prompts para evitar abuso
- Implemente rate limiting em produção
- Use HTTPS em produção

## 🐛 Troubleshooting

### Erro: "OPENAI_API_KEY is required"
- Verifique se a variável `OPENAI_API_KEY` está definida no arquivo `.env`
- Certifique-se de que o arquivo `.env` está na raiz do projeto

### Erro: "Failed to generate cover after 3 attempts"
- Verifique sua conexão com a internet
- Confirme que sua chave de API da OpenAI é válida e tem créditos
- Verifique se o prompt não viola as políticas de conteúdo da OpenAI

### Porta já em uso
- Altere a variável `PORT` no arquivo `.env` para uma porta diferente

## 📝 Exemplos de Uso

### cURL

```bash
curl -X POST http://localhost:3000/api/covers/generate \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "Uma capa elegante para um livro de ficção científica sobre viagem no tempo",
    "size": "1024x1792",
    "style": "vivid",
    "quality": "hd"
  }'
```

### JavaScript/Fetch

```javascript
const response = await fetch('http://localhost:3000/api/covers/generate', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    prompt: 'Uma capa moderna para um livro sobre inteligência artificial',
    size: '1024x1024',
    style: 'vivid',
  }),
});

const data = await response.json();
console.log(data.data.url); // URL da imagem gerada
```

### Python

```python
import requests

response = requests.post(
    'http://localhost:3000/api/covers/generate',
    json={
        'prompt': 'Uma capa artística para um romance histórico',
        'size': '1024x1792',
        'style': 'natural'
    }
)

result = response.json()
print(result['data']['url'])  # URL da imagem gerada
```

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests.

## 📄 Licença

Este projeto está licenciado sob a Licença MIT.

## 🔗 Links Úteis

- [Documentação da OpenAI DALL-E](https://platform.openai.com/docs/guides/images)
- [Express.js](https://expressjs.com/)
- [TypeScript](https://www.typescriptlang.org/)

---

Desenvolvido para o portal Worcure 🚀

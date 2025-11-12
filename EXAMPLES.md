# Exemplos de Uso - Geração de Capas por IA

Este documento fornece exemplos práticos de como usar o serviço de geração de capas.

## Configuração Inicial

1. Instale as dependências:
```bash
npm install
```

2. Configure as variáveis de ambiente:
```bash
cp .env.example .env
# Edite o .env e adicione sua chave da OpenAI
```

3. Inicie o servidor:
```bash
npm run dev  # modo desenvolvimento
# ou
npm run build && npm start  # modo produção
```

## Exemplos de Requisições

### 1. Capa Básica

```bash
curl -X POST http://localhost:3000/api/covers/generate \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "Uma capa moderna para um livro sobre inteligência artificial"
  }'
```

Resposta:
```json
{
  "success": true,
  "data": {
    "url": "https://oaidalleapiprodscus.blob.core.windows.net/...",
    "revisedPrompt": "A modern book cover design for...",
    "generatedAt": "2025-11-12T07:00:00.000Z"
  }
}
```

### 2. Capa Vertical (para livros)

```bash
curl -X POST http://localhost:3000/api/covers/generate \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "Capa elegante para romance histórico ambientado no Brasil colonial",
    "size": "1024x1792",
    "style": "natural",
    "quality": "hd"
  }'
```

### 3. Capa Horizontal (para apresentações)

```bash
curl -X POST http://localhost:3000/api/covers/generate \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "Capa vibrante para apresentação corporativa sobre inovação",
    "size": "1792x1024",
    "style": "vivid"
  }'
```

### 4. Usando JavaScript/TypeScript

```typescript
async function generateCover(prompt: string) {
  const response = await fetch('http://localhost:3000/api/covers/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      prompt,
      size: '1024x1024',
      style: 'vivid',
      quality: 'standard',
    }),
  });

  const data = await response.json();
  
  if (data.success) {
    console.log('Capa gerada:', data.data.url);
    return data.data.url;
  } else {
    console.error('Erro:', data.error.message);
    throw new Error(data.error.message);
  }
}

// Uso
generateCover('Uma capa minimalista para livro de poesia')
  .then(url => console.log('URL da imagem:', url))
  .catch(err => console.error('Falha:', err));
```

### 5. Usando Python

```python
import requests

def generate_cover(prompt, size='1024x1024', style='vivid'):
    url = 'http://localhost:3000/api/covers/generate'
    payload = {
        'prompt': prompt,
        'size': size,
        'style': style
    }
    
    response = requests.post(url, json=payload)
    data = response.json()
    
    if data.get('success'):
        print(f"Capa gerada: {data['data']['url']}")
        return data['data']['url']
    else:
        print(f"Erro: {data['error']['message']}")
        raise Exception(data['error']['message'])

# Uso
image_url = generate_cover(
    'Uma capa artística para livro de contos fantásticos',
    size='1024x1792',
    style='natural'
)
```

## Dicas para Melhores Resultados

### Prompts Efetivos

✅ **Bom**: "Capa moderna para livro de ficção científica, com nave espacial futurista, cores azuis e roxas, estilo cyberpunk"

❌ **Ruim**: "faz uma capa legal"

### Detalhes Importantes

1. **Seja específico**: Descreva cores, estilo, elementos visuais
2. **Mencione o contexto**: Tipo de publicação (livro, revista, apresentação)
3. **Defina o mood**: Profissional, artístico, minimalista, vibrante
4. **Inclua elementos**: Objetos, cenários, conceitos visuais

### Exemplos de Prompts por Categoria

#### Ficção Científica
```
"Capa épica de ficção científica com cidade futurista, naves espaciais, 
céu estrelado, cores neon azul e rosa, estilo cyberpunk moderno"
```

#### Romance
```
"Capa romântica e elegante com silhuetas ao pôr do sol, cores pastel 
rosa e dourado, estilo aquarela delicado"
```

#### Negócios
```
"Capa profissional para livro de negócios, design minimalista, 
gráficos abstratos, cores azul marinho e dourado, estilo corporativo moderno"
```

#### Infantil
```
"Capa colorida e alegre para livro infantil, personagens animais fofos, 
floresta mágica, arco-íris, estilo ilustração vibrante"
```

## Tratamento de Erros

### Erro de Validação (400)
```json
{
  "error": {
    "message": "Validation error: Prompt is required",
    "code": 400
  }
}
```

### Erro de Servidor (500)
```json
{
  "error": {
    "message": "Failed to generate cover after 3 attempts",
    "code": 500
  }
}
```

### Exemplo de Tratamento

```typescript
try {
  const result = await generateCover('Meu prompt');
  console.log('Sucesso:', result);
} catch (error) {
  if (error.response?.status === 400) {
    console.error('Erro de validação:', error.response.data.error.message);
  } else if (error.response?.status === 500) {
    console.error('Erro no servidor:', error.response.data.error.message);
  } else {
    console.error('Erro desconhecido:', error.message);
  }
}
```

## Health Check

Verifique se o serviço está funcionando:

```bash
curl http://localhost:3000/api/covers/health
```

Resposta esperada:
```json
{
  "success": true,
  "message": "Cover generation service is healthy",
  "timestamp": "2025-11-12T07:00:00.000Z"
}
```

## Integração com Frontend

### React Example

```tsx
import { useState } from 'react';

function CoverGenerator() {
  const [prompt, setPrompt] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const generateCover = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3000/api/covers/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, style: 'vivid' }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        setImageUrl(data.data.url);
      } else {
        alert('Erro: ' + data.error.message);
      }
    } catch (error) {
      alert('Erro ao gerar capa');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Descreva sua capa..."
      />
      <button onClick={generateCover} disabled={loading}>
        {loading ? 'Gerando...' : 'Gerar Capa'}
      </button>
      {imageUrl && <img src={imageUrl} alt="Capa gerada" />}
    </div>
  );
}
```

## Limites e Considerações

- **Tempo de resposta**: 10-30 segundos por imagem
- **Tamanho do prompt**: 3-1000 caracteres
- **Tentativas**: Até 3 tentativas automáticas em caso de falha
- **Custos**: Cada geração consome créditos da OpenAI
- **Rate limiting**: Considere implementar em produção

## Suporte

Para problemas ou dúvidas, consulte o README.md principal ou abra uma issue no repositório.

# Guia de Início Rápido - Portal Worcure Members

## 🚀 Como Começar

### 1. Instalação

```bash
# Clone o repositório
git clone https://github.com/diogotoogain/worcure-members.git
cd worcure-members

# Instale as dependências
npm install
```

### 2. Configuração (Opcional)

Para usar a geração de capas com IA real:

1. Crie um arquivo `.env` na raiz do projeto:
   ```bash
   cp .env.example .env
   ```

2. Obtenha uma chave da API OpenAI:
   - Acesse: https://platform.openai.com/api-keys
   - Crie uma conta ou faça login
   - Gere uma nova chave de API

3. Adicione a chave no arquivo `.env`:
   ```
   OPENAI_API_KEY=sk-sua-chave-aqui
   ```

> **Nota**: Se você não configurar a chave da API, o sistema funcionará normalmente usando imagens placeholder.

### 3. Executar o Projeto

#### Modo Desenvolvimento
```bash
npm run dev
```
Acesse: http://localhost:3000

#### Modo Produção
```bash
npm run build
npm start
```

## 📖 Como Usar

### Gerar uma Capa

1. **Digite o Nome do Membro**
   - Insira o nome da pessoa para quem a capa será criada

2. **Escolha um Estilo**
   - **Profissional**: Design corporativo e limpo
   - **Criativo**: Arte vibrante e única
   - **Minimalista**: Simples e geométrico
   - **Moderno**: Gradientes e contemporâneo
   - **Elegante**: Sofisticado e refinado

3. **Clique em "Gerar Capa"**
   - Aguarde alguns segundos (quando usar IA real)
   - A capa será exibida automaticamente

4. **Faça o Download**
   - Clique no botão "Download" para salvar a capa
   - Ou clique em "Gerar Outra" para criar uma nova versão

## 🛠️ Tecnologias Utilizadas

- **Next.js 14**: Framework React para produção
- **TypeScript**: Tipagem estática para JavaScript
- **Tailwind CSS**: Estilização utilitária
- **OpenAI DALL-E 3**: Geração de imagens com IA
- **React**: Biblioteca para interfaces de usuário

## 🌐 Deploy

### Vercel (Recomendado)

1. Faça push do código para o GitHub
2. Acesse [vercel.com](https://vercel.com)
3. Conecte seu repositório
4. Configure a variável de ambiente `OPENAI_API_KEY` (opcional)
5. Deploy automático!

### Outras Plataformas

O projeto pode ser hospedado em qualquer plataforma que suporte Next.js:
- Netlify
- Railway
- AWS
- Google Cloud
- Azure

## 💡 Dicas

- As capas geradas têm proporção 16:9 (1792x1024)
- Você pode regenerar quantas vezes quiser
- Cada estilo produz resultados diferentes
- O sistema funciona sem API key usando placeholders

## ❓ Problemas Comuns

### Erro ao gerar capa
- Verifique sua conexão com a internet
- Confirme que a chave da API está correta
- O sistema usará placeholder em caso de erro

### Build falha
- Execute `npm install` novamente
- Limpe o cache: `rm -rf .next node_modules`
- Reinstale: `npm install`

## 📞 Suporte

Para problemas ou sugestões:
- Abra uma [issue no GitHub](https://github.com/diogotoogain/worcure-members/issues)
- Entre em contato com o desenvolvedor

---

**Desenvolvido com ❤️ por [diogotoogain](https://github.com/diogotoogain)**

# Worcure Members - Portal com Capas Geradas por IA

Portal de membros com funcionalidade de geração de capas personalizadas usando Inteligência Artificial.

## 🚀 Funcionalidades

- ✨ Geração de capas personalizadas usando IA (DALL-E 3)
- 🎨 Múltiplos estilos de design disponíveis
- 💾 Download de capas geradas
- 🌐 Interface moderna e responsiva
- ⚡ Construído com Next.js 14 e TypeScript

## 🛠️ Tecnologias

- **Framework**: Next.js 14 (App Router)
- **Linguagem**: TypeScript
- **Estilização**: Tailwind CSS
- **IA**: OpenAI DALL-E 3
- **Deploy**: Vercel (recomendado)

## 📋 Pré-requisitos

- Node.js 18+ 
- NPM ou Yarn
- Chave de API da OpenAI (opcional - funciona com placeholders se não configurada)

## 🔧 Instalação

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

4. Edite o arquivo `.env` e adicione sua chave da OpenAI:
```
OPENAI_API_KEY=sk-your-key-here
```

Para obter uma chave da API OpenAI:
- Acesse https://platform.openai.com/api-keys
- Crie uma conta ou faça login
- Gere uma nova chave de API
- Copie e cole no arquivo `.env`

## 🚀 Uso

### Desenvolvimento

Execute o servidor de desenvolvimento:

```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no navegador.

### Produção

Build para produção:

```bash
npm run build
npm start
```

## 🎨 Estilos de Capa Disponíveis

O portal oferece diferentes estilos de capas:

- **Profissional**: Design corporativo com linhas limpas
- **Criativo**: Arte vibrante e composição única
- **Minimalista**: Formas geométricas simples
- **Moderno**: Gradientes e elementos contemporâneos
- **Elegante**: Estética sofisticada e refinada

## 📝 Como Usar

1. Acesse o portal
2. Digite o nome do membro
3. Selecione o estilo desejado da capa
4. Clique em "Gerar Capa"
5. Aguarde a geração (pode levar alguns segundos)
6. Faça o download ou gere uma nova capa

## 🔒 Segurança

- Nunca commite o arquivo `.env` com suas chaves de API
- Use variáveis de ambiente para chaves sensíveis
- A chave da OpenAI deve ser mantida em segredo

## 📦 Deploy

### Vercel (Recomendado)

1. Faça push do código para o GitHub
2. Conecte seu repositório no [Vercel](https://vercel.com)
3. Configure a variável de ambiente `OPENAI_API_KEY`
4. Deploy automático!

### Outros Providers

Configure a variável de ambiente `OPENAI_API_KEY` no seu provider de escolha.

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para:

1. Fazer um Fork do projeto
2. Criar uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abrir um Pull Request

## 📄 Licença

Este projeto é open source e está disponível sob a licença MIT.

## 👨‍💻 Autor

Desenvolvido por [diogotoogain](https://github.com/diogotoogain)

## 🐛 Problemas Conhecidos

- Se a chave da OpenAI não estiver configurada, o sistema usa imagens placeholder
- O limite de requisições depende do seu plano da OpenAI

## 📞 Suporte

Se encontrar problemas ou tiver sugestões, abra uma issue no GitHub.

---

Feito com ❤️ usando Next.js e IA

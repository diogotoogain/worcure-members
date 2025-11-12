# Guia de Deploy - Geração de Capas por IA

Este guia descreve como fazer o deploy do serviço de geração de capas por IA.

## Opções de Deploy

### 1. Deploy Local (Desenvolvimento)

```bash
# Clone o repositório
git clone https://github.com/diogotoogain/worcure-members.git
cd worcure-members

# Instale as dependências
npm install

# Configure o ambiente
cp .env.example .env
# Edite .env e adicione sua OPENAI_API_KEY

# Execute em modo desenvolvimento
npm run dev
```

### 2. Deploy com Node.js (Produção)

```bash
# Build do projeto
npm run build

# Configure variáveis de ambiente
export OPENAI_API_KEY="sua-chave-aqui"
export NODE_ENV="production"
export PORT="3000"

# Inicie o servidor
npm start
```

### 3. Deploy com PM2

PM2 é um gerenciador de processos para Node.js ideal para produção.

```bash
# Instale o PM2 globalmente
npm install -g pm2

# Build do projeto
npm run build

# Inicie com PM2
pm2 start dist/index.js --name worcure-covers

# Configure para iniciar no boot
pm2 startup
pm2 save

# Comandos úteis
pm2 status          # Ver status
pm2 logs            # Ver logs
pm2 restart all     # Reiniciar
pm2 stop all        # Parar
```

### 4. Deploy com Docker

Crie um `Dockerfile`:

```dockerfile
FROM node:18-alpine

WORKDIR /app

# Copie arquivos de dependências
COPY package*.json ./

# Instale dependências
RUN npm ci --only=production

# Copie o código
COPY . .

# Build do TypeScript
RUN npm run build

# Exponha a porta
EXPOSE 3000

# Comando de inicialização
CMD ["npm", "start"]
```

Crie um `docker-compose.yml`:

```yaml
version: '3.8'

services:
  worcure-covers:
    build: .
    ports:
      - "3000:3000"
    environment:
      - OPENAI_API_KEY=${OPENAI_API_KEY}
      - NODE_ENV=production
      - PORT=3000
    restart: unless-stopped
```

Execute:

```bash
# Build e inicie
docker-compose up -d

# Ver logs
docker-compose logs -f

# Parar
docker-compose down
```

### 5. Deploy na Nuvem

#### Heroku

```bash
# Instale o Heroku CLI
# Login
heroku login

# Crie o app
heroku create worcure-covers

# Configure variáveis de ambiente
heroku config:set OPENAI_API_KEY=sua-chave-aqui

# Crie um Procfile
echo "web: npm start" > Procfile

# Deploy
git push heroku main
```

#### AWS EC2

```bash
# Conecte ao servidor EC2
ssh -i sua-chave.pem ubuntu@seu-ip

# Instale Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Clone e configure o projeto
git clone https://github.com/diogotoogain/worcure-members.git
cd worcure-members
npm install
npm run build

# Configure variáveis de ambiente
export OPENAI_API_KEY="sua-chave-aqui"

# Use PM2 para gerenciar o processo
npm install -g pm2
pm2 start dist/index.js --name worcure-covers
pm2 startup
pm2 save
```

#### Vercel / Railway / Render

Estas plataformas oferecem deploy automático via Git:

1. Conecte seu repositório GitHub
2. Configure as variáveis de ambiente (OPENAI_API_KEY)
3. A plataforma fará o build e deploy automaticamente

**Configurações necessárias:**
- Build Command: `npm run build`
- Start Command: `npm start`
- Node Version: 18+

### 6. Deploy com Nginx (Reverse Proxy)

Configure o Nginx como reverse proxy:

```nginx
server {
    listen 80;
    server_name seu-dominio.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

## Configuração de Produção

### Variáveis de Ambiente Obrigatórias

```env
OPENAI_API_KEY=sk-...          # Chave da OpenAI (OBRIGATÓRIO)
NODE_ENV=production             # Ambiente de produção
PORT=3000                       # Porta do servidor
```

### Variáveis Opcionais

```env
DEFAULT_IMAGE_SIZE=1024x1024    # Tamanho padrão das imagens
DEFAULT_MODEL=dall-e-3          # Modelo de IA
MAX_GENERATION_ATTEMPTS=3       # Tentativas máximas
```

## Segurança

### 1. Use HTTPS

Configure SSL/TLS para criptografar as comunicações:

```bash
# Com Certbot (Let's Encrypt)
sudo apt-get install certbot python3-certbot-nginx
sudo certbot --nginx -d seu-dominio.com
```

### 2. Rate Limiting

Implemente rate limiting para evitar abuso:

```bash
npm install express-rate-limit
```

Adicione ao código:

```typescript
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100 // limite de 100 requisições
});

app.use('/api/', limiter);
```

### 3. CORS

Configure CORS apropriadamente:

```bash
npm install cors
```

```typescript
import cors from 'cors';

app.use(cors({
  origin: 'https://seu-frontend.com',
  methods: ['GET', 'POST'],
  credentials: true
}));
```

### 4. Autenticação

Adicione autenticação para proteger a API:

```typescript
// Middleware de autenticação simples
app.use('/api/covers/generate', (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  if (apiKey !== process.env.API_KEY) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
});
```

## Monitoramento

### Logs

Use Winston ou Pino para logs estruturados:

```bash
npm install winston
```

### Health Checks

Configure health checks para monitoramento:

```bash
# Adicione ao cron
*/5 * * * * curl http://localhost:3000/api/covers/health
```

### Métricas

Use ferramentas como:
- **Prometheus + Grafana**: Métricas e dashboards
- **DataDog**: Monitoramento completo
- **New Relic**: APM e performance

## Backup

### Logs
```bash
# Rotação de logs com logrotate
sudo nano /etc/logrotate.d/worcure-covers
```

### Configuração
```bash
# Backup das configurações
cp .env .env.backup
```

## Troubleshooting

### Servidor não inicia
```bash
# Verifique os logs
pm2 logs worcure-covers
# ou
docker-compose logs -f
```

### Erro de memória
```bash
# Aumente o limite de memória do Node.js
node --max-old-space-size=4096 dist/index.js
```

### Porta em uso
```bash
# Encontre o processo usando a porta
lsof -i :3000
# Mate o processo
kill -9 <PID>
```

## Performance

### Otimizações

1. **Use clustering** para múltiplos cores:
```bash
npm install pm2
pm2 start dist/index.js -i max
```

2. **Configure cache** para respostas frequentes

3. **Use CDN** para servir as imagens geradas

4. **Implemente fila** para requisições pesadas:
```bash
npm install bull redis
```

## Custos

### OpenAI DALL-E 3 Pricing (referência)

- **Standard quality**: ~$0.040 por imagem
- **HD quality**: ~$0.080 por imagem

**Estimativa mensal** (1000 imagens standard):
- ~$40/mês apenas em custos de API

Considere:
- Custo de hospedagem (servidor, domínio)
- Custo de monitoramento
- Custo de backups e CDN

## Checklist de Deploy

- [ ] Build do projeto (`npm run build`)
- [ ] Variáveis de ambiente configuradas
- [ ] HTTPS configurado
- [ ] Rate limiting implementado
- [ ] CORS configurado
- [ ] Autenticação (se necessário)
- [ ] Logs configurados
- [ ] Health checks ativos
- [ ] Monitoramento configurado
- [ ] Backup configurado
- [ ] Documentação atualizada

## Suporte

Para problemas específicos de deploy:
1. Verifique os logs do servidor
2. Confirme as variáveis de ambiente
3. Teste a conexão com a API da OpenAI
4. Consulte a documentação da plataforma de hospedagem

---

**Nota**: Lembre-se de nunca expor suas chaves de API no código ou em repositórios públicos. Use sempre variáveis de ambiente e serviços de gerenciamento de segredos.

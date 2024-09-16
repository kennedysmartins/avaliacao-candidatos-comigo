# Dockerfile para o Backend
FROM node:20

# Cria e define o diretório de trabalho
WORKDIR /app

# Copia os arquivos de pacotes e instala as dependências
COPY package*.json ./
RUN npm install

# Copia o restante dos arquivos, incluindo o diretório prisma
COPY . .

RUN npx prisma generate
# Compila o código TypeScript (se aplicável)
RUN npm run build

# Define o comando para iniciar a aplicação
CMD ["npm", "run", "start"]

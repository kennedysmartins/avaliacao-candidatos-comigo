# Dockerfile para o Frontend
FROM node:20

# Cria e define o diretório de trabalho
WORKDIR /app

# Copia os arquivos de pacotes e instala as dependências
COPY package*.json ./
RUN npm install

# Copia o restante dos arquivos
COPY . .

# Compila a aplicação Next.js
RUN npm run build

# Define o comando para iniciar a aplicação
CMD ["npm", "run", "start"]

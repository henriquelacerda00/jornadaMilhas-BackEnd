# Etapa 1: build da aplicação
FROM node:20 AS builder

WORKDIR /app

# Copia todos os arquivos do projeto (incluindo db)
COPY . .

# Instala dependências e compila o NestJS
RUN npm install
RUN npm run build

# Etapa 2: imagem final
FROM node:20

WORKDIR /app

# Copia o build e arquivos necessários
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/public ./public

# Copia a pasta db com o banco sqlite
COPY --from=builder /app/db ./db

# Instala apenas dependências de produção
RUN npm install --omit=dev

# Porta usada no main.ts
EXPOSE 8080

# Comando para iniciar a aplicação
CMD ["node", "dist/main"]

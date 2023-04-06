FROM node:16-alpine

# Define variáveis de ambiente para a conexão com o banco de dados
ENV JWT_SECRET=secreto
ENV DB_DATABASE=fullstackaffiliate
ENV DB_HOST=localhost
ENV DB_PORT=3306
ENV DB_USERNAME=root
ENV DB_PASSWORD=root
ENV PORT=5000

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5000

CMD ["npm", "run", "start:prod"]

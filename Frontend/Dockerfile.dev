FROM node:20-alpine

WORKDIR /app

COPY vite.config.ts ./
COPY package.json package-lock.json* ./
RUN npm install

EXPOSE 3000

CMD ["npm", "run", "dev"]

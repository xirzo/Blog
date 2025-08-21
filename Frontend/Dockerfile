FROM node:20-alpine AS build
WORKDIR /app
COPY . .

ENV VITE_BACKEND_URL=https://api.xirzo.ru
ENV VITE_LOGO_TEXT="Xirzo Blog"

RUN npm install
RUN npm run build

FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

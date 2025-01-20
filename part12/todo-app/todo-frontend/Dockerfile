# El primer FROM ahora es una etapa llamada build-stage
FROM node:20 AS node
USER node

WORKDIR /usr/src/app

FROM node AS test
COPY . .
RUN npm ci --include=dev
RUN npm test

FROM node AS build-stage

# Hay que indicar las variables de ENV antes del build
ENV VITE_BACKEND_URL=http://localhost:8080/api 

COPY --from=test /usr/src/app .

RUN npm run build


# Esta es una nueva etapa, todo lo anterior a esta linea ha desaparecido, excepto por los archivos que queremos COPIAR
FROM nginx:1.25-alpine

# COPIA el directorio dist de build-stage a /usr/share/nginx/html
# El destino fue encontrado en la pagina de Docker hub
COPY --from=build-stage /usr/src/app/dist /usr/share/nginx/html
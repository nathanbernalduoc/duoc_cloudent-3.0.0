# NOTA: El último contenedor que es manipulado es el que queda activo. los
# otros son finalizados.

# CONTENEDOR #1
# Inicia contenedor con node 20.14
# Imagen se le asigna un ALIAS "build"
FROM node:23.1 AS build

# Se establece directorio de trbaajo
WORKDIR /app

# Se copia el archivo package (.json y -block.json) en el contenedor
COPY package*.json ./

# Instala dependencias del proyecto (genera carpeta node_modules)
RUN npm install

# Copia todo el contenido del proyecto y lo deja en la carpeta actual
# Donde actualmente está la imagen
COPY . .

RUN ls /app

# Constriye la aplicación Angular
# Para productivo (carpeta "dist")
RUN npm run build --prod

# CONTENEDOR #2
# Inicia contenedor con nginx
FROM nginx:stable-alpine

# Copia contenido desde el contenedor #1 (alias build) a
# la carpeta /app/dist del contenedor #2
# En este caso "web-json" es el nombre del proyecto
COPY --from=build /app/dist/cloudent-2.0.0/browser /usr/share/nginx/html

# Abrir puedto 80
EXPOSE 80

# Comandos para ejecutar servidor
CMD ["nginx", "-g", "daemon off;"]

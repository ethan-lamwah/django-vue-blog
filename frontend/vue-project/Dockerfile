FROM node:lts-alpine as build-stage
ENV NODE_ENV=production
RUN npm install -g http-server
WORKDIR /app
COPY package*.json ./
# RUN npm install --production --silent && mv node_modules ../
RUN npm install --production --silent
COPY . .
RUN npm run build

FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
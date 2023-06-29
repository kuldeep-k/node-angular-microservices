FROM node:18-alpine as builder

RUN mkdir /project

WORKDIR /project

RUN npm install -g @angular/cli@16

COPY package.json package-lock.json ./

RUN npm i

COPY . .

RUN npm run build --configuration=compose

FROM nginx:latest

COPY --from=builder /project/dist/frontend/ /usr/share/nginx/html/
# COPY --from=builder /project/default.conf /etc/nginx/conf.d/ 

EXPOSE 80 

CMD ["nginx", "-g", "daemon off;"]
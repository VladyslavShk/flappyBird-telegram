# Stage: static web app
FROM nginx:stable-alpine

WORKDIR /usr/share/nginx/html

COPY ./apps/web /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

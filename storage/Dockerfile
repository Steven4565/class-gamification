FROM nginx

RUN rm /etc/nginx/conf.d/default.conf

COPY ./nginx.conf /etc/nginx/conf.d/

RUN mkdir -p /var/lib/app

RUN chmod 755 /var/lib/app

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]	
FROM node:latest
RUN apt-get update -y
RUN mkdir testdb
WORKDIR ~/testdb
COPY ./ ./
RUN npm install --production --silent
ENV DB_URL="http://129.241.234.14:2389"
ENV SOCKET_URL="http://192.241.234.14:8080"
EXPOSE 2389 
ENTRYPOINT ["node"]
CMD ["build/server.js"]

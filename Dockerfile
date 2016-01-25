FROM node

RUN mkdir /socketserver
WORKDIR /socketserver
RUN apt-get update && \
  rm -rf /var/lib/apt/lists/*
RUN npm install --production --silent
ENV SOCKET_URL="http://192.241.234.14:8080"
ENV DB_URL="http://129.241.234.14:2389"
EXPOSE 8080
ENTRYPOINT ["node"]
CMD ["build/index.js"]

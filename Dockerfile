FROM node
RUN mkdir /code
WORKDIR /code
COPY . /code
RUN apt-get update && \
  rm -rf /var/lib/apt/lists/*
RUN npm install --production
ENV SOCKET_URL="http://192.241.234.14:8080"
ENV DB_URL="http://192.241.234.14:2391"
EXPOSE 8080
ENTRYPOINT ["node"]
CMD ["build/index.js"]

FROM node
RUN mkdir /code
WORKDIR /code
RUN npm install
RUN apt-get update
EXPOSE 8080
CMD /bin/sh
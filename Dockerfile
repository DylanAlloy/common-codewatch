FROM node:14-alpine3.14
WORKDIR ./
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install
COPY . .
RUN apk --no-cache add ca-certificates git
RUN apk add curl
COPY trivy_bin/trivy /usr/local/bin/trivy
COPY trivy_bin/contrib/*.tpl contrib/
ENV DOCKER_VERSION=18.09.4
RUN curl -sfL -o docker.tgz "https://download.docker.com/linux/static/stable/x86_64/docker-${DOCKER_VERSION}.tgz" && \
  tar -xzf docker.tgz docker/docker --strip=1 --directory /usr/local/bin && \
  rm docker.tgz
RUN trivy i httpd
CMD ["node", "server.js"]
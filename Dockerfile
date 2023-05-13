FROM ghcr.io/puppeteer/puppeteer:19.8.2 AS build

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable

# RUN apt-get update && apt-get install curl gnupg -y \
#     && curl --location --silent https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
#     && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
#     && apt-get update \
#     && apt-get install google-chrome-stable -y --no-install-recommends \
#     && rm -rf /var/lib/apt/lists/*

# RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package.json .

RUN npm install

COPY . .

RUN ./node_modules/typescript/bin/tsc -p ./tsconfig.json

# Clean up node_modules to not include dev dependencies.
# RUN rm -rf ./node_modules
# RUN JOBS=MAX npm i --production

# RUN tsc

FROM node:14-slim

WORKDIR /usr/src/app

COPY package.json .
RUN npm install

COPY --from=build /usr/src/app/dist dist
COPY package.json package.json

EXPOSE 3000
CMD ["node", "./dist/app.js"]
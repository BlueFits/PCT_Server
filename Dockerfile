###################################
# First Stage: Compile TypeScript #
###################################

FROM node:slim AS build

WORKDIR /usr/src/app

COPY package.json .

RUN npm install

COPY . .

# Bundle typescript here
RUN ./node_modules/typescript/bin/tsc -p ./tsconfig.json

# Clean up node_modules to not include dev dependencies.
RUN rm -rf ./node_modules
RUN JOBS=MAX npm i --production

##################################
# Second Stage: Prepare Dist App #
##################################

FROM node:slim

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true

# Install Google Chrome Stable and fonts
# Note: this installs the necessary libs to make the browser work with Puppeteer.
RUN apt-get update && apt-get install gnupg wget -y && \
    wget --quiet --output-document=- https://dl-ssl.google.com/linux/linux_signing_key.pub | gpg --dearmor > /etc/apt/trusted.gpg.d/google-archive.gpg && \
    sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' && \
    apt-get update && \
    apt-get install google-chrome-stable -y --no-install-recommends && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /usr/src/app

COPY package.json .

RUN npm install

# This will copy all files in our root to the working directory in the container
COPY --from=build /usr/src/app/dist dist
COPY package.json package.json

# Start script to run the server
EXPOSE 3000
CMD ["node", "./dist/app.js"]
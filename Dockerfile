# build environment
FROM node:13.13.0-slim as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./
COPY package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build


# production
FROM node:13.13.0-slim
RUN npm install -g serve
COPY --from=build /app/build app
CMD serve -p $PORT -s app

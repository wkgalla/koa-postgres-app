FROM node:carbon

RUN mkdir -p /app

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install

COPY . /app

EXPOSE 4000

CMD ["npm", "run", "watch"]
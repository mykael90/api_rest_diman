FROM node:14.17.1
ENV NODE_ENV=production
WORKDIR /restApi
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install
COPY . .
CMD npm start
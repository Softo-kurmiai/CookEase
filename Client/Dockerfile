FROM node:21-alpine
WORKDIR /app
COPY CookEase.Client/package.json .
COPY CookEase.Client/.env .
RUN npm install
COPY CookEase.Client/. .
EXPOSE 80
CMD [ "npm", "run", "dev" ]
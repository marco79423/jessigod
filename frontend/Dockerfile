FROM node:18-alpine

WORKDIR /app
COPY frontend/package.json ./package.json
COPY frontend/package-lock.json ./package-lock.json
RUN yarn

COPY frontend .

RUN npm run build
CMD ["npm", "run", "start"]
EXPOSE 3000

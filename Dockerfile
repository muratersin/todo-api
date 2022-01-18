
FROM node:16

# Create app directory
WORKDIR /usr/src/app

COPY package* ./
COPY tsconfig.json ./
COPY src ./

RUN npm i -g typescript
RUN npm install
RUN npm run build

ENV PORT=3000
ENV NODE_ENV=production
ENV JWT_SECRET=your_jwr_secret
ENV PG_URI=your_postgre_db_uri

COPY . .

EXPOSE 3000

CMD ["node", "build/index.js"]


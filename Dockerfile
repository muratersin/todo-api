
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
ENV JWT_SECRET=5JUd7UaWy2sPryXj9bs7AzqgyY7XEkmfv8cVdzCAQB6ruM9JbQ
ENV PG_URI=postgres://gihgiwowvkfqck:1c78178220832880eb169f491aeb1d73e2944bd2a55ab5446c359973daab3fd7@ec2-52-208-145-55.eu-west-1.compute.amazonaws.com:5432/dadaie28hljpmb

COPY . .

EXPOSE 3000

CMD ["node", "build/index.js"]


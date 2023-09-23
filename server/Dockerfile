FROM node:16.16.0-alpine

WORKDIR /app

COPY ./package.json ./

RUN npm i

# Install bash to use 'wait-for-it'
RUN apk update && apk add bash && apk add --no-cache coreutils

COPY . .

COPY wait-for-it.sh wait-for-it.sh 

RUN chmod +x wait-for-it.sh

CMD ["npm", "run", "start"]
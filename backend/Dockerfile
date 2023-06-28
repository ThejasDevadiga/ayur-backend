FROM node:lts-alpine
ENV PORT  5000 
# MONGO_URI = mongodb+srv://Ayurvasemr:AyurvasEmr2024@ayurvas.2c74wvz.mongodb.net/?retryWrites=true&w=majority
ENV MONGO_URI  mongodb://127.0.0.1:27017/ayurvas
ENV NODE_ENV  development
ENV JWT_SECRET  thejas1234
ENV API_USERNAME   apiUserName
ENV API_USERPASS   apiUserPass
ENV HOST  https://ayur.vercel.app/
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --production --silent && mv node_modules ../
COPY . .
EXPOSE 5000
RUN chown -R node /usr/src/app
USER node
CMD ["npm", "start"]

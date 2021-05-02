FROM node:14-stretch
ENV APP_PATH=/usr/src/app PORT=5000 NPM_CONFIG_LOGLEVEL=warn
WORKDIR $APP_PATH
COPY . $APP_PATH
RUN apt-get update
RUN npm install
RUN npm set progress=false && npm install forever -g && npm i sequelize-cli@6.2.0 -g && npm install eslint --g && npm cache verify
RUN bash -c "chmod +x ./docker/run.sh"
EXPOSE 80 5000
CMD ["./docker/run.sh"]

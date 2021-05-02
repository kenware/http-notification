#!/bin/bash
if [[ $ENV == 'local' ]]
then
    #statements
    sequelize db:migrate
    npm run start-dev

else
   #run production docker
    sequelize db:migrate
    npm run start
fi

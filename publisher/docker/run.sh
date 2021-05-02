#!/bin/bash
if [[ $ENV == 'local' ]]
then
    #statements
    npm run start-dev

else
   #run production docker
    npm run start
fi

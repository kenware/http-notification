#!/bin/bash
sequelize db:create
sequelize db:migrate
npm run run:test
sequelize db:drop

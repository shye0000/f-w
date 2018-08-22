#!/bin/bash

cd /app

ssh-keyscan "gitlab.wcentric.com" >> /root/.ssh/known_hosts
if [ ! -z  $GITLAB_IP ]
then
    echo "$GITLAB_IP gitlab.wcentric.com" >> /etc/hosts
fi
npm install

if [ $ENV = "dev" ]
then
    top
else
    npm run build-$ENV
    npm run start
fi

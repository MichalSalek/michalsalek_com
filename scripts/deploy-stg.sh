#! /usr/bin/bash

yarn build
git add out
git commit -m "Deploy"
git push origin main

# Server side
ssh pistachio@s26.mydevil.net  << EOF
pwd
cd ./repositories/
pwd
bash ./deploy-stg-michalsalek_pl_2023.sh
echo 'End of deploy script, exiting from ssh.'
exit
EOF

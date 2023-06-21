#! /usr/bin/bash

yarn build
git add out
git commit -m "Deploy"
git push origin main

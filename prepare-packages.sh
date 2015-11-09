#!/bin/bash

TARGET_PATHS=("." "./angular-spa-ui")

for ((i = 0; i < ${#TARGET_PATHS[*]}; i++));
do
  CURRENT_PATH=${TARGET_PATHS[$i]}
  echo "### => Opening $CURRENT_PATH folder and trying to build package.json"

  cd $CURRENT_PATH
  npm install
done
#!/bin/bash

CURRENT_DIR=$(dirname $(readlink -e $0))
TARGET_PATHS=(
  "."
  "./angular-spa-ui"
)

for ((i = 0; i < ${#TARGET_PATHS[*]}; i++));
do
  CURRENT_SCRIPT_PATH=${TARGET_PATHS[$i]}
  echo "### => Opening $CURRENT_SCRIPT_PATH folder and trying to build package.json"

  cd $CURRENT_DIR
  cd $CURRENT_SCRIPT_PATH
  npm install
done

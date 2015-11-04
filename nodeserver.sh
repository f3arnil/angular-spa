#!/bin/bash
ENV_DEV="Development"
ENV_PROD="Production"

env_prompt="Select running configuration: "
options=($ENV_DEV $ENV_PROD)

PS3="$env_prompt"

select opt in "${options[@]}" "Захватить мир"; do
  case "$REPLY" in
    1)  echo "Starting $ENV_DEV configuration";
        NODE_ENV=$ENV_DEV node app.js;;
    2)  echo "Starting $ENV_PROD configuration";
        NODE_ENV=$ENV_PROD node app.js;;

    $(( ${#options[@]}+1 )) ) echo "Goodbye!"; break;;
    *) echo "Invalid option. Try another one.";continue;;

    esac
done

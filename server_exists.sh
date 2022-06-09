#!/bin/sh

if [ -f "./dist/apps/server/main.js" ]; then
  echo true;
else
  echo false;
fi

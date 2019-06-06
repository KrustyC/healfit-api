#!/bin/sh

DATE=`date +%Y%m%d%H%M%S`
PATH="./src/migrations/versions/$DATE.ts"

touch $PATH
TPL="
export default function Version$DATE() { \n
  return { \n
    execute: async () => { \n
      // migration \n
      return true \n
    } \n
  } \n
}
"

echo $TPL > $PATH
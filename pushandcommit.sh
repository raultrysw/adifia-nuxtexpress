#!/bin/zsh
 
COMMIT=$(cat commit-message)
PUSH=$(cat .pushlock)
 
if [ "$COMMIT" != "" ];
then
    echo "Haciendo commit"
 
    git add --all
    git commit -am "$COMMIT"
 
    echo '' > commit-message
 
    if [ -e .pushlock ]
    then
        echo "Haciendo push"
        git push -u origin master
    fi
fi
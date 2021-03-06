#!/bin/bash
set -e
if [ "$TRAVIS_PULL_REQUEST" == "false" ] && [ "$TRAVIS_BRANCH" == "master" ]; then
 echo -e "Publishing gh-pages...\n"

 mkdir -p $HOME/gh-ready
 cp -R lib index.html $HOME/gh-ready

 cd $HOME
 git config --global user.email "travis@travis-ci.org"
 git config --global user.name "travis-ci"
 git clone --quiet --branch=gh-pages https://${GH_KEY}@github.com/laat/sg-example gh-pages > /dev/null

 cd gh-pages
 git rm -rf $HOME/gh-pages/*
 cp -Rf $HOME/gh-ready/* .
 git add -f .
 git commit -m "Latest javadoc on successful travis build $TRAVIS_BUILD_NUMBER auto-pushed to gh-pages"
 git push -fq origin gh-pages > /dev/null

 echo -e "Published gh-pages.\n"
fi

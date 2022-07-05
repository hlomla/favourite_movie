#!/usr/bin/env sh
rm -rf dist/
# abort on errors
set -e

# build
npm run build

# navigate into the build output directory
cd dist

# if you are deploying to a custom domain
# echo 'www.example.com' > CNAME

git init
git checkout -b main
git add -A
git commit -m 'can display movies'

# Add your GitHub repo details here
git push -f https://github.com/hlomla/favourite_movie.git main:gh-pages


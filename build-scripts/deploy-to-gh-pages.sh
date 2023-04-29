# This script comes from the following article
# https://cli.vuejs.org/guide/deployment.html

# abort on errors
set -e

# build
npm run build

# navigate into the build output directory
cd ../dist

# if you are deploying to a custom domain
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploying'

# if you are deploying to https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git main

# if you are deploying to https://<USERNAME>.github.io/<REPO>
# git push -f git@github.com:<USERNAME>/<REPO>.git main:gh-pages
git push -f git@github.com:loelindstrom/camera.git master:gh-pages

cd -
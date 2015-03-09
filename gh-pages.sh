rm -rf pages
npm run page
( cd pages

git init
git add .
git commit -m "auto commit with gh-pages.sh"
git push --force --quiet git@github.com:suisho/react-auto-kana master:gh-pages> /dev/null 2>&1
)
rm -rf pages
npm run page-compile
npm run page-build
(
cd pages
cp ../circle.yml ./circle.yml
git init
git add .
git commit -m "auto commit with gh-pages.sh"
git push --force --quiet git@github.com:suisho/react-auto-kana master:gh-pages> /dev/null 2>&1
)
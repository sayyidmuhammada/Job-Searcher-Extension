# checking all scripts warning & errors
echo "🛠 checking all scripts warning & errors inside frontend folder"
cd packages/jse-frontend
yarn run lint
echo "Done!"
echo "🛠 checking all scripts warning & errors inside backend folder & trying to fix the errors or the warning is there is"
cd packages/jse-frontend
yarn run lint
yarn run lintFix
echo "Done!"
echo "All packages has been checked execpt jse-jobs-scraper package"
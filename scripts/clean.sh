# clean uncessary files
echo "⚠ Warning: this scripts will delete all the node_modules folder!"
echo "Cleaning the root folder"
rm -rf pgdata yarn.lock node_modules
echo "Root folder has been cleaned 🧼 now!"
echo "Cleaning frontend"
cd packages/jse-frontend
rm -rf yarn.lock package-lock.json node_modules dist
echo "Frontend has been cleaned 🧼 now!"
echo "Cleaning the backend"
cd ..
cd jse-backend
rm -rf yarn.lock package-lock.json node_modules build
echo "Done!"
echo "All packages execpt jse-jobs-scraper has been cleaned 🧼!"
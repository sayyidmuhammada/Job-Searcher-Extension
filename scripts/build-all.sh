# setup all packages execpt jse-jobs-scraper package for production mode without docker
echo "Going to frontend folder..."
cd packages/jse-frontend
echo "Installing dependencies..."
yarn install
echo "Building the frontend..."
yarn build
echo "Setup the backend"
cd ..
cd jse-backend
echo "Installing dependencies..."
yarn install
echo "Building the backend..."
yarn build
echo "Done!"
echo "All packages execpt jse-jobs-scraper has been setup for production mode!"
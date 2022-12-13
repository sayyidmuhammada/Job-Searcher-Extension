# setup all packages execpt jse-jobs-scraper package for development mode
installation_type="" # docker || not_using_docker

echo -e "👉 ${RED}Please enter how you want to setup JSE\n"
echo -e "${RED}1) Use Docker to Setup (default)\n"
echo -e "${RED}2) Not using Docker\n"
read -p "⚙️  Enter your preference (1/2):" choice_setup

while [[ $choice_setup != "1"   &&  $choice_setup != "2" && $choice_setup != "" ]]
do
    echo -e "\n❌ ${CYAN}Please enter either 1 or 2"
    read -p "⚙️  Enter your preference (1/2):  " choice_setup
done

if [[ $choice_setup == "1" || $choice_setup == "" ]];then
    installation_type='docker'
    echo -e "\n✅ ${CYAN}You have chosen: Docker 🐟\n"
else
    setup_type='not_using_docker'
    echo -e "\n✅ ${CYAN} You have chosen: not using docker\n"
fi

if [[ $installation_type = "docker" ]]; then 
  echo "Setuping the application using Docker!!"
  yarn run setup-docker
else 
  echo "Setuping the application!"
  echo "Going to frontend folder..."
  cd packages/jse-frontend
  echo "Installing dependencies..."
  yarn install
  echo "Setup the backend"
  cd ..
  cd jse-backend
  echo "Installing dependencies..."
  yarn install
  echo "Done!"
  cd ..
  cd ..
  echo "🎉 All packages execpt jse-jobs-scraper has been setup for development mode!"
  echo "You can run the backend by going to packages/jse-backend and type yarn run dev also same as the frotend(packages/jse-frontend)"
fi

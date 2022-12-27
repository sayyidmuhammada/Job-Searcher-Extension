# setup all packages execpt jse-jobs-scraper package for development mode
installation_type="docker" # default use docker || not_using_docker
os=""
package_manager=""

check_os() {
  if [[ $OSTYPE == darwin* ]]; then
    os="macos"
    echo "OS DETECTED: $os"
    return
  fi
  if [[ $OSTYPE == msys* ]]; then
    os="windows"
    echo "OS DETECTED: $os"
    return
  fi
  case "$os_name" in
  Ubuntu*)
    os="ubuntu"
    echo "OS DETECTED: $os"
    ;;
  Amazon\ Linux*)
    os="amazon linux"
    echo "OS DETECTED: $os"
    ;;
  Debian*)
    os="debian"
    echo "OS DETECTED: $os"
    ;;
  Linux\ Mint*)
    os="linux mint"
    echo "OS DETECTED: $os"
    ;;
  Red\ Hat*)
    os="red hat"
    echo "OS DETECTED: $os"
    ;;
  CentOS*)
    os="centos"
    echo "OS DETECTED: $os"
    ;;
  SLES*)
    os="sles"
    echo "OS DETECTED: $os"
    ;;
  openSUSE*)
    os="opensuse"
    echo "OS DETECTED: $os"
    ;;
  Arch\ Linux*)
    os="arch"
    echo "OS DETECTED: $os"
    ;;
  *)
    os="Not Found"
    echo "Cannot found your os type please go to our slack community for this issue"
    ;;
  esac
}

check_os

if [[ $os == 'windows' ]]; then
  npm install -g yarn
else
  sudo npm install -g yarn
fi

echo -e "👉 ${RED}Please enter how you want to setup JSE\n"
echo -e "${RED}1) Use Docker to Setup (default)\n"
echo -e "${RED}2) Not using Docker\n"
read -p "⚙️  Enter your preference (1/2):" choice_setup

while [[ $choice_setup != "1" && $choice_setup != "2" && $choice_setup != "" ]]; do
  echo -e "\n❌ ${CYAN}Please enter either 1 or 2"
  read -p "⚙️  Enter your preference (1/2):  " choice_setup
done

if [[ $choice_setup == "1" || $choice_setup == "" ]]; then
  installation_type='docker'
  echo -e "\n✅ ${CYAN}You have chosen: Docker 🐟\n"
else
  setup_type='not_using_docker'
  echo -e "\n✅ ${CYAN} You have chosen: not using docker\n"
fi

install_docker() {
  if [[ $os == "macos" ]]; then
    curl -sL https://github.com/docker/machine/releases/download/v0.16.2/docker-machine-$(uname -s)-$(uname -m) >/usr/local/bin/docker-machine
    chmod +x /usr/local/bin/docker-machine
    echo "You have successfully install on your machine"
    echo "Please run Docker on your machine"
  elif [[ $os == "windows" ]]; then
    echo "************* YOU DON'T HAVE DOCKER YET *************"
    echo "PLEASE GO TO HERE: https://docs.docker.com/desktop/install/windows-install/ 
          TO INSTALL DOCKER ON YOUR MACHINE"
  elif [[ $os == "ubuntu" ]]; then
    sudo apt-get update
    sudo apt-get install \
      ca-certificates \
      curl \
      gnupg \
      lsb-release
    sudo mkdir -p /etc/apt/keyrings
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
    sudo systemctl enable --now docker
    echo "You have successfully install & Running Docker on your machine"
    echo \
      "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
    $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list >/dev/null
    sudo chmod a+r /etc/apt/keyrings/docker.gpg
    sudo apt-get update
    sudo apt-get install docker-ce docker-ce-cli containerd.io docker-compose-plugin
    sudo systemctl enable --now docker
    echo "You have successfully install & Running Docker on your machine"
  elif [[ $os == "amazon linux" ]]; then
    sudo amazon-linux-extras install docker
    sudo service docker start
    sudo usermod -a -G docker ec2-user
    sudo chkconfig docker on
    sudo yum install -y git
    sudo reboot
    sudo curl -L https://github.com/docker/compose/releases/download/1.22.0/docker-compose-$(uname -s)-$(uname -m) -o /usr/local/bin/docker-compose
    sudo chmod +x /usr/local/bin/docker-compose
    echo "You have successfully install & Running Docker on your machine"
  elif [[ $os == "debian" ]]; then
    sudo apt-get update
    sudo apt-get install \
      ca-certificates \
      curl \
      gnupg \
      lsb-release
    sudo mkdir -p /etc/apt/keyrings
    curl -fsSL https://download.docker.com/linux/debian/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
    echo \
      "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/debian \
    $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list >/dev/null
    sudo chmod a+r /etc/apt/keyrings/docker.gpg
    sudo apt-get update
    sudo apt-get install docker-ce docker-ce-cli containerd.io docker-compose-plugin
    sudo systemctl enable --now docker
    echo "You have successfully install & Running Docker on your machine"
  elif [[ $os == "linux mint" ]]; then
    sudo apt-get update
    sudo apt-get install \
      apt-transport-https \
      ca-certificates \
      curl \
      gnupg \
      lsb-release
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
    sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(
      . /etc/os-release
      echo "$UBUNTU_CODENAME"
    ) stable"
    sudo apt-get update
    sudo apt-get install docker-ce docker-ce-cli containerd.io
    sudo usermod -aG docker $USER
    sudo systemctl enable --now docker
    echo "You have successfully install & Running Docker on your machine"
  elif [[ $os == "red hat" ]]; then
    sudo yum install -y yum-utils
    sudo yum-config-manager \
      --add-repo \
      https://download.docker.com/linux/rhel/docker-ce.repo
    sudo yum install docker-ce docker-ce-cli containerd.io docker-compose-plugin
    sudo systemctl enable --now docker
    sudo systemctl start docker
    echo "You have successfully install & Running Docker on your machine"
  elif [[ $os == "centos" ]]; then
    sudo yum install -y yum-utils
    sudo yum-config-manager \
      --add-repo \
      https://download.docker.com/linux/centos/docker-ce.repo
    sudo yum install docker-ce docker-ce-cli containerd.io docker-compose-plugin
    sudo systemctl enable --now docker
    sudo systemctl start docker
    echo "You have successfully install & Running Docker on your machine"
  elif [[ $os == "sles" ]]; then
    sudo zypper addrepo https://download.docker.com/linux/sles/docker-ce.repo
    sudo zypper install docker-ce docker-ce-cli containerd.io docker-compose-plugin
    sudo systemctl enable --now docker
    sudo systemctl start docker
    echo "You have successfully install & Running Docker on your machine"
  elif [[ $os == "opensuse" ]]; then
    sudo zypper refresh
    sudo zypper update -y
    sudo reboot
    sudo zypper install -y docker
    sudo systemctl start docker
    sudo systemctl enable --now docker
    echo "You have successfully install & Running Docker on your machine"
  elif [[ $os == "arch" ]]; then
    sudo pacman -Syu
    sudo pacman -S docker
    sudo systemctl enable docker.service
    sudo systemctl start docker.service
    echo "You have successfully install & Running Docker on your machine"
  else
    echo "Sorry Cannot install docker in your Machine, please go to our slack community"
  fi
}

setup_app() {
  echo "************ PLEASE MAKE SURE YOUR DOCKER IS RUNNING! ************"
  echo "Setuping the application using Docker!!"
  if [[ $os == "windows" ]]; then
    yarn run setup:docker
  else
    sudo yarn run setup:docker
  fi
  echo "✅ Done!"
  echo "The frontend running on http://localhost:3000"
}

if [[ $installation_type == "docker" ]]; then
  if [[ $os == "Not Found" ]]; then
    :
  fi
  # Check if the user has installed docker
  if [[ -x "$(command -v docker)" ]]; then
    setup_app
  else
    echo "Installing docker 🐟 on your machine..."
    install_docker
    setup_app
  fi
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

# BombNRun
BombNRun javascript game

# How to install dev environment
```bash
#!/bin/bash
git clone git@github.com:Keriz/BombNRun.git

cd BombNRun

mkdir build
cd build
git init
git remote add prod nodejs@uui.fr:bombnrun.git

cd ..
npm install

echo -e "\e[32m=============================="
echo -e "\e[33mEnvironnement de dev setup !"
echo -e "\e[33mVous pouvez maintenant faire \e[0m\e[44mgulp dev\e[0m"
echo -e "\e[33m(Si non-installé: \e[0m\e[44mnpm i -g gulp\e[0m\e[33m)"
echo -e "\e[32m=============================="
```

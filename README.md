#### Installation Instructions

``` sh
sudo raspi-config
sudo apt-get update
sudo apt-get dist-upgrade
# dependancy on libpcap for reading packets
$ sudo apt-get install libpcap-dev
sudo wget http://node-arm.herokuapp.com/node_latest_armhf.deb 
sudo dpkg -i node_latest_armhf.deb
sudo apt-get install npm
sudo reboot
git clone https://github.com/scott-vs/sfdc-litter-check.git
cd sfdc-litter-check/
# set up sfdc-config.json with username and password
npm install

```


There is a dependency on libpcap being installed on your Raspberry Pi.
``` sh
# dependancy on libpcap for reading packets
$ sudo apt-get install libpcap-dev
```
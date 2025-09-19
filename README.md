# setup
new terminal
cd chaotic-twister
npm start

run ct_gameplay in arduino, check port

in /ct-server
open ws-server.js
change the serial port

new terminal
cd ct-server
node ws-server.js

run esp_controller in arduino, on the controllers
make sure secrets.h wifi is correct
make sure to set the correct player number

set the player IPs in ws-server.js
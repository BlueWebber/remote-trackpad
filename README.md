# Remote trackpad
Simple app that uses express JS and allows you to turn any mobile device with local internet access to a trackpad for your computer.
The way it works is that the target PC will host a webpage locally, which when visited by the mobile device will establish a websocket connection to transfer touch data, the PC recieves that data and interprets it to mouse movement/clicks.
## How to use
Clone the repo, open it, then run `node ./index.js`, and visit the given URL on the device you want to use as a trackpad.

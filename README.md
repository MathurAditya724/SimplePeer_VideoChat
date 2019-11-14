# Simple Peer Video Chat
This project is a simple implementation of how video chatting works with the help of *simple-peer*, a simple package which provides WebRTC video, voice, and data channels. Here we are using **simple-peer**, for connection id's of clients and establishing connectivity and **socket.io** to send those ids to the server from where it can connect different user and broadcast data between users. It uses **express**, for creating the server and handling the request. Also, I have used **watchify** to create the client-side code. You can check out the application [here](https://videochat-webrtc.glitch.me), it is hosted on [Glitch](https://glitch.com/).

## Getting Started
### Prerequisites
You need to have *node.js* and *npm* to run the application on your system.
### Installing
To run the application locally first, install the dependency.
```
npm install
```
and then run the program by
```
npm start
```
If you are running locally then the default port will be 3000, else if you are hosting on a server, the process on which the application is running will assign it a port.

Open two different tabs with the same URL and agree to give access to webcam and mics (Here is a problem, which is discussed under the heading *User Media Security*). It will take some time to connect, have patience. And within seconds, both your window streams will be connected. Do remember, if you are running locally the audio of the stream could be frustrating, you can either reduce the sound of your speakers or mute it. It is because both your speaker and mics are situated close to each other, due to which an echo is produced.

If you added some changes in the *main.js* file in the *public* folder, you need to watchify the code first to see those changes in the browser. Just run this command,
```
npm run watch
```

## User Media Security
If you try to access it on different PC (other than the PC you are running on) or a mobile, the application will not work properly. It will give you an error regarding user media property, It is occurring because your project which is running on *localhost:3000* is an *HTTP* protocol. To access the user camera and mic which is obtained through getUserMeida function from navigator element in javascript, it will only work when your project is running on an *HTTPS* protocol.

To solve this you could use a self-signed https certificate, which could work with *express* but there is a catch, first of all, if you try to connect to it, your browser will give a security error. Also in some cases, the browser will not support the certificate and the application will stop working.

The solution to this problem is to deploy it on a server. Now, there are multiple ways you can deploy or host it on a server, I chose [Glitch](https://glitch.com/) for my project because it is simple and very easy to setup. Just create an account and move all your files in their project file. Open their terminal and start writing the installation commands and run them. That's it, you can get your link to your project from the above menu in the editor and share it with friends.

## Build With
- [simple-peer](https://www.npmjs.com/package/simple-peer) - Simple WebRTC video/voice and data channels
- [socket.io](https://socket.io/) - real-time, bidirectional and event-based communication
- [express](https://www.npmjs.com/package/express) - web framework for node
- [watchify](https://www.npmjs.com/package/watchify) - watch mode for browserify builds

## Authors
**Aditya Mathur**, you can find me on [Twitter](https://twitter.com/mathuraditya7) or [LinkedIn](https://www.linkedin.com/in/aditya-mathur-7240/)

## License
This project is licensed under the MIT License

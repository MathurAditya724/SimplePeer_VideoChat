// Simple peer is build over WebRTC
const Peer = require('simple-peer');
// Use for socket connection
const socket = io();

const video = document.querySelector('video');
var client = {};

// Get stream from the client
navigator.mediaDevices.getUserMedia({ video: true, audio: false })
    .then(stream => {
        // Sending the request to the server
        socket.emit('NewClient');
        // Stream of the client itself
        video.srcObject = stream;
        video.play();

        function constructor(type) {
            // Initalizing the Peer
            var peer = new Peer({
                // Checking if the client is initiator or not
                initiator: (type == 'init') ? true : false,
                stream: stream,
                trickle: false
            })
            // If we get the stream
            peer.on('stream', (stream) => {
                // Create the video element for the stream
                var video = document.createElement('video');
                video.id = 'peerVideo';
                // Setting the stream
                video.srcObject = stream;
                video.class = 'embed-responsive-item';
                document.querySelector('#peerDiv').appendChild(video);
                video.play();
            })
            // If connection closes
            peer.on('close', () => {
                // Removing the video element
                document.getElementById('peerVideo').remove();
                // Cleaning up
                peer.destroy();
            })
            // Finally returning the Peer
            return peer
        }

        // If user is init
        function initPeer() {
            // Do we get a response
            client.gotRespond = false;
            // Getting the init peer
            var peer = constructor('init');
            // Peer signal
            // Send a request for connection
            peer.on('signal', (data) => {
                if (!client.gotRespond) {
                    socket.emit('Request', data);
                }
            })
            client.peer = peer;
        }

        // If user is not init
        function nonInitPeer(request) {
            // Getting the normal peer
            var peer = constructor('notInit');
            // Peer signal
            // Responding for connection request
            peer.on('signal', (data) => {
                socket.emit('Respond', data);
            })
            // Peer Signal to connect
            peer.signal(request);
            client.peer = peer;
        }

        // When got the respond
        function signalRespond(respond) {
            client.gotRespond = true;
            var peer = client.peer;
            // Peer Signal to connect
            peer.signal(respond);
        }

        // If more than 2 client's access the page
        socket.on('sessionActive', () => {
            document.write('Session Active. Please come back later.');
        })

        // Responds from the server
        socket.on('ServerRequest', nonInitPeer);
        socket.on('ServerRespond', signalRespond);
        socket.on('initiatorClient', initPeer);

    })
    // Something went wrong
    .catch(err => document.write(err));
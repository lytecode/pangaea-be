const express = require('express');
const redis = require('redis');

const subscriber = redis.createClient();

const app = express();



app.get('/test1', (req, res) => {

    subscriber.on("message", (channel, message) => {

        console.log("Received data :", message);
    })

    subscriber.subscribe("notify-user");

    res.send("Subscriber One");
})

app.get('/test2', (req, res) => {
    subscriber.on("message", (channel, message) => {

        console.log("Received data :", message);
    })

    subscriber.subscribe("order-available");

    res.send("Subscriber two");
})

app.listen(9000, () => {
    console.log("server is listening to port 9000");
})
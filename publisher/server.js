const express = require('express');
const redis = require('redis');

const publisher = redis.createClient();

app.get('/', (req, res) => {
    const user = {
        id: '12345',
        name: 'Testkit'
    }
})
const express = require('express');
const redis = require('redis');
const Joi = require('joi')

const app = express();
const publisher = redis.createClient();

const PORT = 8000;
app.use(express.json())

const schema = Joi.object({
    topic: Joi.string()
        .min(3)
        .max(30)
        .required(),

    data: Joi.object({
        msg: Joi.string().min(3).required()
    })
})

app.post('/publish/:topic', (req, res) => {
    const { topic } = req.params;
    const { body } = req;

    const { error } = schema.validate({ topic, data: body });
    if (error) {
        return res.status(400).json({ msg: error.details[0].message })
    }

    publisher.publish(topic, JSON.stringify(body));
    res.status(201).json({ msg: `Message publised to '${topic}' topic` })
})

// Catch all non existent routes
app.use((req, res) => {
    res.status(404).json({ msg: 'Not found' });
});

app.listen(PORT, () => console.log(`server publisher started on port ${PORT}`))
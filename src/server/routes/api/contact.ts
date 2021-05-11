import * as express from 'express';
import db from '../../db';
import config from '../../config';
const formData = require('form-data');
const Mailgun = require('mailgun.js');

let router = express.Router()

const mailgun = new Mailgun(formData);
const mg = mailgun.client({ username: 'api', key: config.mailgun.apiKey })
router.post('/', async (req, res) => {
    const newEmail = req.body;
    console.log(newEmail)
    try {
        const result = await mg.messages.create(config.mailgun.domain, {
            to: config.mailgun.toEmail,
            subject: newEmail.subject,
            text: newEmail.content,
            from: newEmail.email
        });
        console.log(result)
        res.json(result)
    } catch (error) {
        res.status(500).json({ message: 'my code sucks'})
    }
})

export default router;
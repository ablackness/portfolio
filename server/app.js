require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(express.static('public'));

app.set('views', './views');

app.set('view engine', 'ejs');

app.get('/', (req,res) => {
    const data = {
        person: {
            firstName: 'Alex',
            lastName: 'Black'
        }
    }
      res.render('index', data);
})

app.post('/thanks', (req, res) => {
    const obj = {contact : req.body};
    console.log(req.body);
    const msg = {
        to: 'alexblack426@gmail.com',
        from: obj.contact.email,
        subject: obj.contact.subject,
        text: obj.contact.message,
        html: '<div>Name: ' + obj.contact.name + '</div>'
            + '<div>Email: ' + obj.contact.email + '</div>'
            + '<div>Info: ' + obj.contact.message + '</div>',
      };
    sgMail.send(msg);
    res.render('thanks', {contact: req.body});
})

module.exports = app;
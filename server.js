const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;

var app = express(); //express
hbs.registerPartials(__dirname +'/views/partials');
app.set('view engine', 'hbs'); //handlebars support

app.use((req, res, next) => {  //express middleware
    var now = new Date().toString();
    var log = `${now}: ${req.method} : ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to append to file server.log');
        }
    });
    next();
});

app.use((req, res, next) => {
    res.render('maintanance.hbs');
});

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home page',
        message: 'Welcome to node-web-server'
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About page',
    });
});

app.get('/bad', (req, res) => {
    res.send({
        erroeMessage: 'Unable to handle request'
    });
});

app.listen(port, () => {
    console.log('Server is up and running on port: ', port);
});
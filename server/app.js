const path = require('path');
const express = require('express');
const db = require('./db');
const axios = require('axios');
const cheerio = require("cheerio");

const { User, Link } = db.models;

const { createQueue } = require('./funcs.js');


const app = express();

module.exports = app;

app.use(require('body-parser').json());


app.use('/dist', express.static(path.join(__dirname, '../dist')));

const index = path.join(__dirname, '../index.html');

const fetchData = async (url) => {
  const result = await axios.get(url);
  return cheerio.load(result.data);
};

app.get('/', (req, res)=> res.sendFile(index));

app.get('/links', async (req, res, next)=> {

  var oneUrl = '/wiki/History';

  var startUrl = 'https://en.wikipedia.org' + oneUrl;

  // grab the html for the start page
  var $ = await fetchData(startUrl);

  // create array of all the paragraphs on the page
  var paragraphs = $('p', '.mw-parser-output');

  // use the paragraphs array to find the links and add them to the queue
  var queue = createQueue(paragraphs, startUrl);

  var temp;

  for(var i = 0; i < queue.length; i++) {

    temp = {
      title: queue[i][0],
      href: queue[i][1],
      parent: queue[i][2]
    }

    Link.create(temp);
  }

  res.send('done');

});









app.get('/api/users', (req, res, next)=> {
  User.findAll()
    .then( users => res.send(users))
    .catch(next);
});

app.post('/api/users', (req, res, next)=> {
  User.create(req.body)
    .then( user => res.status(201).send(user))
    .catch(next);
});

app.post('/api/users/reset', (req, res, next)=> {
  db.syncAndSeed()
    .then(()=> res.sendStatus(204))
    .catch(next);
});

app.put('/api/users/:id', (req, res, next)=> {
  User.findById(req.params.id)
    .then( user => user.update(req.body))
    .then( user => res.send(user))
    .catch(next);
});

app.delete('/api/users/:id', (req, res, next)=> {
  User.findById(req.params.id)
    .then( user => user.destroy())
    .then( () => res.sendStatus(204))
    .catch(next);
});

app.use((err, req, res, next)=> {
  console.log(err);
  res.status(500).send({ error: err.message });
});

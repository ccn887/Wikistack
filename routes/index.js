const express = require('express');
const app = express();
const bodyparser = require('body-parser')

const userrouter = require('./user.js')
const wikirouter = require('./wiki.js')
const router = express.Router();

module.exports = router
router.use('/wiki', wikirouter)
// router.use('/user', userrouter)

// router.get('/', function(req, res, next) {
//   res.send('got to GET /wiki/');
//   res.redirect('/')
// });
// router.get('/add', function(req, res) {
//   res.render('addpage');
// })

// router.post('/', function(req, res, next) {
//   res.send('got to POST /wiki/');
// });

// router.get('/add', function(req, res, next) {
//   res.send('got to GET /wiki/add');
// });

// app.get('/', function(req, res){
//   res.render('index');
// } )

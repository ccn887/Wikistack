const express = require('express');
const app = express();
const bodyparser = require('body-parser')

const userrouter = require('./user.js')
const wikirouter = require('./wiki.js')
const router = express.Router();

module.exports = function(){
router.use('/wiki', wikirouter)

router.get('/', function(req, res, next) {
  res.send('got to GET /wiki/');
});

router.post('/', function(req, res, next) {
  res.send('got to POST /wiki/');
});

router.get('/add', function(req, res, next) {
  res.send('got to GET /wiki/add');
});
return router;
}
// app.get('/', function(req, res){
//   res.render('index');
// } )

const express = require('express');
const app = express();
const bodyparser = require('body-parser')

const userrouter = require('./user.js')
const routers = require('./index.js')
const router = express.Router();
const volleyball = require('volleyball')
const models = require('../models');
var Page = models.Page;
var User = models.User;
router.use(volleyball)
router.use(bodyparser.urlencoded({extended: false}))
router.use(bodyparser.json())
module.exports = router
// router.use('/', routers)
// router.use('/user', userrouter)

router.get('/', function(req, res, next) {
  res.send('got to GET /wiki/');
});
router.get('/', function(req, res, next) {
  res.redirect('/')
});
router.get('/add', function(req, res) {
  res.render('addpage');
})

router.get('/:urlTitle', function (req, res, next) {
  Page.findOne({
    where: {
      urlTitle: req.params.urlTitle
    }
  })
  .then(function(foundPage){
    console.log('we found', foundPage)
    res.json(foundPage);
  })
  .catch(next);

});

router.post('/', function(req, res, next) {
  console.log('req.body', req.body)
  console.log('title', req.body.title)
   Page.create({
    title: req.body.title,
    content: req.body.contenttext
  })
  .then((value) => {res.redirect(value.route)})
  // res.send('got to POST /wiki/');
});

// router.post('/', function(req, res, next) {
//   console.log('req.body', req.body)
//   res.send('got to POST /wiki/');
// });



// var Page = models.Page;
// var User = models.User;

// router.post('/', function(req, res, next) {
//   console.log('title', req.body.title)
//   var page = Page.build({
//     title: req.body.title,
//     content: req.body.contenttext
//   });


  // STUDENT ASSIGNMENT:
  // make sure we only redirect *after* our save is complete!
  // note: `.save` returns a promise or it can take a callback.
//   page.save();
//   res.redirect('/');
//   // -> after save -> res.redirect('/');
// });

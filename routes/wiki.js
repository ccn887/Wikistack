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
    Page.findAll()
    .then(function(foundPages){
      // console.log('foundPages: ', Object.keys(foundPages))
      var pageArr = Object.keys(foundPages)
      console.log('PageArr: ', pageArr)
      console.log('foundpages: ', foundPages)
      res.render('index', {pages: foundPages});
      //res.render('wikipage', {foundPage: page}
    })
    .catch(next);

  });

// router.get('/', function(req, res, next) {
//   res.redirect('/')
// });
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
    res.render('wikipage', {newPage: foundPage} );
    //res.render('wikipage', {foundPage: page}
  })
  .catch(next);

});

router.post('/', function(req, res, next) {
User.findOrCreate({
  where: {
    name: req.body.authorname,
    email: req.body.authoremail
  }
})
.then(function (values) {

  var user = values[0];
  console.log('user: ',user)


  var newPage = Page.build({
    title: req.body.title,
    content: req.body.contenttext
  });
  return newPage.save().then(function (newPage) {
    return newPage.setAuthor(user);
  });

})
.then(function (newPage) {
  res.redirect(newPage.route);
})
.catch(next);
});

// router.post('/', function(req, res, next) {
//   // console.log('req.body', req.body)
//   // console.log('title', req.body.title)
//   var newUser = User.create({
//     name: req.body.authorname,
//     email: req.body.authoremail
//   }).then(function(value){
//     console.log('the value')
//     return value
//   })
//    var newPage = Page.create({
//     title: req.body.title,
//     content: req.body.contenttext,
//     authorId: newUser.id
//   })
//   .then((value) => {res.redirect(value.route)})


  // res.send('got to POST /wiki/');
// });s

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

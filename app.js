
//left off before checking test GETS in "Routes for a New Page" section
const express = require('express');
const app = express();
const bodyparser = require('body-parser')
const volleyball = require('volleyball')
const nunjucks = require('nunjucks')
const PORT = 3000
const models = require('./models/index');
const routes = require('./routes/index')


app.use(volleyball)
app.use(bodyparser.urlencoded({extended: false}))
app.use(bodyparser.json())
app.use(express.static('public'))
app.use('/', routes)

app.set('view engine', 'html')
app.engine('html', nunjucks.render)
nunjucks.configure('views', {noCache: true})

models.db.sync({})
.then(function () {
    // make sure to replace the name below with your express app
    app.listen(3001, function () {
        console.log('Server is listening on port 3001!');
    });
})
.catch(console.error);


//to force a sync after making changes

//to turn off logging var db = new Sequelize('postgres://localhost:5432/wikistack', {
  //   logging: false
  // });

app.listen(PORT, ()=> {
  console.log('listening on port 3000')
});


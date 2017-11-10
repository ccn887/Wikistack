const express = require('express');
const app = express();
const bodyparser = require('body-parser')

const userrouter = require('./user.js')
const routers = require('./index.js')
const router = express.Router();

module.exports = function(){
router.use('/index', routers)
return router;
}

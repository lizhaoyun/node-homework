var express = require('express');
var fs = require('fs');
var path = require("path");
var router = express.Router();

let filepath = path.join(__dirname,'data.json');
let filecontent = fs.readFileSync(filepath);
let jsonobj = JSON.parse(filecontent);
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login',function(req,res,next){
  res.render('login');
})

router.get('/list',function(req,res,next){
  let {chapterList} = jsonobj;
  res.render('list',{chapterList:chapterList});
})

router.post('/check',function(req,res,next){
  let username = req.body.username;
  let pwd = req.body.pwd;
  
  let {users} = jsonobj;
  console.log(users);
  console.log(users[0].username);
  console.log(users[0].password);
  for(var i=0;i<users.length;i++){
    if(users[i].username === username && users[i].password === pwd){
      res.end("success");
    }
  }
  res.end('failed');
  
})

module.exports = router;

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var db = mongoose.connect("mongodb://127.0.0.1:27017/news", { useUnifiedTopology: true,useNewUrlParser: true });

var News = require('./model/news');

//Allow all requests from all domains & localhost
app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "POST, GET");
  next();
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));



app.post('/news',function(request,response){
    var news = new News();
    news.title = request.body.title;
    news.link = request.body.link;
    news.save(function(err,saveNews){
        if(err){
            response.status(500).send({error:"Could not saved news"});
        }
        else{
            response.send(saveNews);
        }
    });
});


app.get('/news',function(request,response){
   News.find({},function(err,news){
       if(err){
             response.status(500).send({error:"Could not return news"});
       }
       else
           response.send(news);
   });
});



app.listen(3004, function(){
    console.log("app running on port 3004");
});
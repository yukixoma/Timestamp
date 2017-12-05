// Initialize
var express     = require("express");
var bodyParser  = require("body-parser");
var cors        = require("cors");
var path        = require("path");

// Create app, setting up cors, bodyParser...
var app = module.exports = express();
app.use(bodyParser.json());
app.use(cors());


//GET call to return JSON
app.get("/",function(req,res,next){
    console.log("homepage working");
    res.sendFile(path.join(__dirname,"index.html"));
})

app.get('/:timeString',function(req,res,next){
    console.log("URL Working");
    var timeString = req.params.timeString;
//default format date
    var date       = new Date (timeString); 
    var month      = parseInt(date.getMonth()) + 1;   
    var natural    = date.getDate() + " " + month + " " + date.getFullYear();
    var unix       = Math.round(+date/1000);         
// if input is unixdate format    
    if (isNaN(date.getDate())) {
        var unixDate   = new Date (+timeString*1000)
        month          = parseInt(unixDate.getMonth()) + 1; 
        natural        = unixDate.getDate() + " " + month + " " + unixDate.getFullYear();
        unix           = +timeString;
    }
//response result
    res.json({"unix": unix, "natural": natural});
    
})




app.listen(process.env.PORT || 3000,function(){
    console.log("Working");
});
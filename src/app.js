const express = require('express');
const weatherinfo = require('./utils/weatherinfo');
const path = require('path');
const hbs = require('hbs');

const app = new express();

var pubfolder = path.join(__dirname, "../public");
var viewfolder = path.join(__dirname, "../templates/views");
var partialfolder = path.join(__dirname, "../templates/partials");
// app.use(express.static(partialfolder));

app.set('view engine','hbs');
app.set('views', viewfolder);
hbs.registerPartials(partialfolder);

app.use(express.static(pubfolder));

app.get("",(req, res) => {
      
    res.render('index',{
            title: 'Weather',
            name: 'Jean Peng',
    })
})

app.get("/about",(req, res) => {

    res.render('about',{
        title: 'About',
    })
})

app.get("/weather",(req, res) => {
    
    let cityname = req.query.city;

    weatherinfo(cityname,(error, info)=>{
        console.log("---- server weather info ------",info);

        if (error){
            console.log("server app error :", error);
            return res.send({error: error});
        }
       
        res.send({
            city: info.city,
            country: info.country,
            tempreture: info.tempreture,
            time: info.observation_time
    })
 })

})

app.get("*",(req, res) => {

    res.render('404')
})



app.listen(3000, ()=>{
    console.log("-------------server is up on port 3000!------------------")
})


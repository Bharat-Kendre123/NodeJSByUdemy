const path = require('path');
const express = require('express');
const hbs = require('hbs');
const chalk = require('chalk');
const geocodes = require('./utils/geocodes');
const forcast = require('./utils/forecast');


const app = express();

const htmlPath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");


app.set('views', viewPath);
app.set('view engine', 'hbs');
hbs.registerPartials(partialsPath);
app.use(express.static(htmlPath));


app.get('', (req, res)=>{
    res.render('index',{
        title : 'Weather Home Page',
        name : 'Bharat Kendre'
    });
});


app.get('/about', (req, res)=>{
    res.render('about',{
        title : 'About Me',
        name : 'Bharat Kendre'
    });
});



app.get('/help', (req, res)=>{
    res.render('help',{
        title : 'Help for You',
        name : 'Bharat Kendre'
    });
});



app.get('/weather', (req, res) => {

    const address = req.query.address;

    if(!address){

        res.send({
            error : 'Address is mandatory'
        });

        return;
    }


    geocodes(address, (error, {latitude, longitude, location} = {}) =>{
        if(error){  

            res.send({
                error
            });
        }else{
    
            forcast(latitude, longitude, (error, forcast) =>{
    
                if(error){
    
                    res.send({
                        error
                    });
                 
                }else{
                    res.send({
                        forcast,
                        location,
                        address
                    });
                }
            })
        }
     
    });

});




app.get('/help/*', (req, res)=>{

    res.render('errorView',{
        title : '404',
        name : 'Bharat Kendre', 
        errorMesssage : "Help article not found"
    });
});

app.get('*', (req, res) => {

   res.render('errorView', {
       title : "404",
       name : 'Bharat Kendre', 
       errorMesssage : "Page not found"
});
});

app.listen(3000, () => console.log('Server is running'));


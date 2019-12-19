//loading modules 
const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const weather = require('./utils/weather');


const app = express();
const port = process.env.PORT || 3000
// define paths for express config 
const publicPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//set up view engin and view location 
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//set up static directory to serve 
app.use(express.static(publicPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'weather ',
        createdByName: 'mustafaallam'
    });
});




app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            status: 'failed',
            error: 'address is required'
        });
    }
    geocode.geocode(req.query.address, (error, {lat,lon,location}={}) => {
        if (error) {
            return res.send({
                status: 'failed',
                error: error
            });
        }
        weather.getWeather(lat, lon,(error,weatherResponse)=>{
            if(error){
                 return res.send({
                     status: 'failed',
                     error: error
                 });
            }
            return res.send({
                'weather_data': weatherResponse,
                location
            })
        });
    });


    // res.render('index', {
    //     title: 'weather',
    //     createdByName: 'mustafaallam'
    // });
});



app.get('/help', (req, res) => {

    res.render('help', {
        title: 'help page',
        createdByName: 'mustafaallam'
    });

});

app.get('/help/*', (req, res) => {

    res.render('404', {
        errorMessage: 'help page not found',
        title: 'header',
        createdByName: 'mustafaallam'

    });

});



app.get('/about', (req, res) => {

    res.render('about', {
        title: 'about page',
        createdByName: 'mustafaallam'
    });
});

app.get('*', (req, res) => {

    res.render('404', {
        errorMessage: 'page not found',
        title: 'header',
        createdByName: 'mustafaallam'
    });
});
// app.get('/weather', (req, res) => {

//     res.send({
//         name : 'mustafa',
//         age : 20
//     });

// });




app.listen(port, () => {
    console.log('server is running on port'+port);
});
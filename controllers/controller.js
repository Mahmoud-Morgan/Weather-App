const dotenv = require('dotenv').config();
const axios =require("axios")
const API_KEY = process.env.API_KEY

exports.renderHomePage = (req, res) => {
    res.render("index")
}

exports.getWeather = (req, res) => {
    const city= req.body.city
    if(!city){
        return    res.render("index",{
            error : "Please enter the City name to get temp "
        })
    }else{
        const url =`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`; 
    
     axios.get(url).then((response)=>{
            const {temp:temperature} = response.data.main
            const { name: location } = response.data
            res.render("index",{
                weather : `temperature in ${location} is ${temperature}°C`
            })
       })
    
        .catch((erro)=>{
            return    res.render("index",{
                error : "City not found,please check City name start with Cap letter "
            })
        })
    }
    
}

exports.renderAboutPage = (req, res) => {
res.render("about")
}
const mongoose=require("mongoose")
const validator=require("validator")

var movieSchema=new mongoose.Schema({
    movieId:{type:"number",required:true},
    movieName:{type:"string",required:true},
    movieText:{type:"string"}


})

let movieModel=mongoose.model("movie",movieSchema)
module.exports={mongoose,movieModel}
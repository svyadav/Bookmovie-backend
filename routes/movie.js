var express = require("express");
const { mongo } = require("mongoose");
var router = express.Router();
const { mongodb, dbUrl, dbName, MongoClient } = require("../dbConfig");
const {mongoose,movieModel} =require('../schemas/movieSchema')
const {roleAdmin} = require("../auth");
mongoose.connect(dbUrl);





router.get('/',async(req,res)=>{
  try{
    const movie = await movieModel.find();
      res.send({
        statusCode: 200,
        data: movie
      })

  }
  catch(error){
    console.log(error);
    res.send({
      statusCode: 400,
      message: "Internal server error",
    });

  }

})

router.get('/:id',async(req,res)=>{
  try{
    const movie = await movieModel.findOne({_id:mongodb.ObjectId(req.params.id)});
    if(movie){
      res.send({
        statusCode: 200,
        data: movie
      })

    }
    else{
      res.send({
        statusCode: 400,
        message:"Movie does not exist"
      })

    }
     

  }
  catch(error){
    console.log(error);
    res.send({
      statusCode: 400,
      message: "Internal server error",
    });

  }

})

router.post("/create-movie",roleAdmin, async (req, res) => {
  
  try {
    
    const movie = await movieModel
      .findOne({ movieId: req.body.movieId });
    if (movie) {
      res.send({
        statusCode: 400,
        message: "Movie already created",
      });
    } else {
      let newMovie = await movieModel.create({
        movieId: req.body.movieId,
        movieName: req.body.movieName,
        movieText: req.body.movieText
    
      });
      res.send({
        statusCode: 200,
        message: "Movie created successfully",
      });
    }
  } catch (error) {
    console.log(error);
    res.send({
      statusCode: 400,
      message: "Internal server error",
    });
  }
});

router.delete("/delete-movie/:id",roleAdmin, async (req, res) => {

  try {
   
    let movie = await movieModel
      .findOne({ _id: mongodb.ObjectId(req.params.id) });
    if (movie) {
      let deleteMovie = await movieModel.deleteOne({ _id: mongodb.ObjectId(req.params.id) });
      res.send({
        statusCode: 200,
        message: "Movie deleted successfully",
      });
    } else {
      res.send({
        statusCode: 400,
        message: "Movie does not exist",
      });
    }
  } catch (error) {
    console.log(error);
    res.send({
      statusCode: 400,
      message: "Internal server error",
    });
  }
});

router.put("/edit-movie/:id",roleAdmin,async (req, res) => {

  try {
 
    let movie = await movieModel
      .findOne({ _id: mongodb.ObjectId(req.params.id) });
    if (movie) {
      let updatedMovie = await movieModel.updateOne(
        { _id: mongodb.ObjectId(req.params.id) },
        {
          $set: {
           
            movieName: req.body.movieName,
          },
        }
      );

      res.send({
        statusCode: 200,
        message: "Movie updated successfully",
      });
    } else {
      res.send({
        statusCode: 400,
        message: "Movie does not exist",
      });
    }
  } catch (error) {
    console.log(error);
    res.send({
      statusCode: 400,
      message: "Internal server error",
    });
  }
});

module.exports = router;
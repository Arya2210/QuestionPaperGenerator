const mongoose = require("mongoose") 
const url = "mongodb://127.0.0.1:27017/QuestionPaper"

exports.dbconnect = ()=>{
    mongoose.connect( url ,{
        useNewUrlParser : true,
        useUnifiedTopology: true ,
    })
    .then( ()=>{
        console.log("Db conected succesfully") 
    }).catch( (err)=>{
       console.log("Not Connected") ;
       process.exit(1) ;
    }
    )
}


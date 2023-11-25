const mongoose = require("mongoose") 
const url = "mongodb+srv://arya22rajput:svmNx5ZL7zQj1plh@cluster0.htlhllh.mongodb.net/QuestionPaper"

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


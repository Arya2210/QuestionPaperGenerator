const express = require("express");
const  {createQuestion, getQuestionPaper } = require("./controller/QuestionPaper");
const { dbconnect } = require("./database");
const Port = 4000 ;

const app = express() ;
app.use(express.json()) ;

dbconnect()

app.get("/", (req, res) => {
    res.send("Welcome to the Question Paper Generator!");
  });
app.post("/createQuestion",createQuestion )
app.get("/getQuestionPaper", getQuestionPaper) 




app.listen(Port , ()=>{
    console.log("server runing at" , Port) ;
})

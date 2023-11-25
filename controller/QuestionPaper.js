const Question = require("../model/schema")

exports.createQuestion = async (req, res) => {
    try {

        const {question ,subject , difficulty , marks} = req.body ;

        if(!question || !subject || !difficulty || !marks){
            res.status(500).send('input all req field');
            return  
        }
        

        await Question.create({
                             question : question ,
                             subject:subject,
                             difficulty:difficulty,
                             marks:marks ,
        })


      
    return res.status(201).json({
      success : true ,
      message:"question crested",
      });
    } catch (error) {
      console.error('Error adding question:', error);
        res.status(500).send('Internal Server Error');
        return 
    }
  }

  exports.getQuestionPaper = async(req ,res)=>{
    try{
      
      const {totalMarks , easy ,medium ,hard} = req.body

      if(!totalMarks || !easy || !medium || !hard){
        return res.status(500).send("all field are required")
      }
// assuming easy question are of 5 marks , medium are of 10 and hard are of 15

      let easyCount = ((easy/totalMarks)*100)/5 ;
      let mediumCount = ((medium/totalMarks)*100)/10 ;
      let hardCount = ((hard/totalMarks)*100)/15 ;

      let easyQuestion = await Question.aggregate([
        {$match:{difficulty : "easy"}},
        {$sample:{size:easyCount}}
      ])
      if(!easyQuestion){
        return res.status(500).send("unable to fetch easy questions")

      }
      let mediumQuestion = await Question.aggregate([
        { $match: { difficulty: "medium" } },
        { $sample: { size: mediumCount } }
      ]);
      if(!mediumQuestion){
        return res.status(500).send("unable to fetch medium questions")

      }
      let hardQuestion = await Question.aggregate([
        {$match:{difficulty:"hard"}},
        {$sample:{size:hardCount}}
      ])
      if(!hardQuestion){
        return res.status(500).send("unable to fetch hard questions")

      }

      let QuestionPaper = [...easyQuestion, ...mediumQuestion, ...hardQuestion];

      if(!QuestionPaper){
        return res.status(500).send("unable to concat questions paper")

      }
     console.log(QuestionPaper)
      return res.status(200).json({
        message:"Questionpaer is prepared" ,
        data : QuestionPaper ,
      })

    }catch(err){
      return res.status(400).send(err.message) ;
    }

  }
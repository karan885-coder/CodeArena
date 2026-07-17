const {getLanguageById,submitBatch,submitToken} = require("../utils/problemUtility");
const Problem = require("../models/problem");
const User = require("../models/user");
const Submission = require("../models/submission");
const SolutionVideo=require("../models/solutionVideo");

const createProblem = async (req,res)=>{

     const {title,description,difficulty,tags,
        visibleTestCases,hiddenTestCases,startCode,
        referenceSolution, problemCreator
    } = req.body;
    
    try{
   
       
      for(const {language,completeCode} of referenceSolution){
         
        //format of judge0 and in one day maxsubm is 50
        // source_code:
        // language_id:
        // stdin: 
        // expectedOutput:

        const languageId = getLanguageById(language);
           // I am creating Batch submission
        const submissions = visibleTestCases.map((testcase)=>({
            source_code:completeCode,
            language_id: languageId,
            stdin: testcase.input,
            expected_output: testcase.output
        }));
          
        
        const submitResult = await submitBatch(submissions);//arr of tokens

        const resultToken = submitResult.map((value)=> value.token);

        //resultToken= ["db54881d-bcf5-4c7b-a2e3-d33fe7e25de7","ecc52a9b-ea80-4a00-ad50-4ab6cc3bb2a1","1b35ec3b-5776-48ef-b646-d5522bdeb2cc"]
        const testResult = await submitToken(resultToken);
        //console.log(testresult);

       for(const test of testResult){
        if(test.status_id!=3){
         return res.status(400).send("Error Occured");
        }
       }


      }
      // We can store it in our DB when for all languages our sol with i/n o/p is correct  thats why outer side of for loop
      //as for loop check codefor each lang(c++,java,js)

    const userProblem =  await Problem.create({
        ...req.body,
        problemCreator: req.result._id
      });

      res.status(201).send("Problem Saved Successfully");
      
    }
    catch(err){
        res.status(400).send("Error: "+err);
    }
}

const deleteProblem=async(req,res)=>{
  const {id}=req.params;

    try {
      if(!id){
        return res.status(400).send("Missing Id Field");//must write return taaki aage na chle 
      }
     
      const deletedProblem=await Problem.findByIdAndDelete(id);//if ye id hi nhi hai db mai then it give null/undefined
      if(!deletedProblem){
        return res.status(404).send("Problem is Missing");
      }

      res.status(200).send("Successfully deleted");
      
    } catch (error) {
      res.status(404).send("Error "+error);
      
    }


}

const getProblemById=async(req,res)=>{
  const {id}=req.params;

    try {
      if(!id){
        return res.status(400).send("Missing Id Field");
      }
      //we won't be showing all info inclluding hidden test case and ref sol as we will be charging for it only show some selected fields in free
      // const getProblem=await Problem.findById(id);

    const getProblem = await Problem.findById(id).select('_id title description difficulty tags visibleTestCases startCode referenceSolution ');

    if(!getProblem){
        return res.status(404).send("Problem is Missing");
    }

    //vedio fetching
    const videos=await SolutionVideo.findOne({problemId:id});
    if(videos){

       const responseData={//why as getProblem is document of mongdb and we cant insert forcefully fieds like secureUrl,duartion and all, if it is js object then we can do it
         ...getProblem.toObject(),
        secureUrl: videos.secureUrl,
        thumbnailUrl: videos.thumbnailUrl,
        duration: videos.duration
       }  

        return res.status(200).send(responseData );
        
    }

      res.status(200).send(getProblem);
      
    } catch (error) {
      res.status(404).send("Error "+error);
      
    }


}

const getAllProblem=async(req,res)=>{
  
    try {
      
      const getProblem=await Problem.find({}).select('_id title difficulty tags');//return an arr
      
      if(getProblem.length==0){
        return res.status(404).send("Problem is Missing");
      }

      res.status(200).send(getProblem);
      
    } catch (error) {
      res.status(404).send("Error "+error);
      
    }


}

const solvedAllProblembyUser =  async(req,res)=>{
   
    try{
      
      //we want those solved problem as well with their proper schema and we won't be making all those call for each rather we use populate
      const userId = req.result._id;

      // const user =  await User.findById(userId).populate("problemSolved");//"problemSolved" jisko refer kar rha uski info laao
      // res.status(200).send(user);
      //we want some selected fileds 
       const user =  await User.findById(userId).populate({
        path:"problemSolved",
        select:"_id title difficulty tags"
      });
      
      
      res.status(200).send(user.problemSolved);

    }
    catch(err){
      res.status(500).send("Server Error");
    }
}

const submittedProblem = async(req,res)=>{

  try{
     
    const userId = req.result._id;
    const problemId = req.params.pid;

  const ans = await Submission.find({userId,problemId});
  
  if(ans.length==0)
    res.status(200).send("No Submission is persent");
  else//added else 
  res.status(200).send(ans);

  }
  catch(err){
     res.status(500).send("Internal Server Error");
  }
}



module.exports={createProblem,deleteProblem,getProblemById,getAllProblem,solvedAllProblembyUser,submittedProblem};

// const submissions = [
//     {
//       "language_id": 46,
//       "source_code": "echo hello from Bash",
//       stdin:23,
//       expected_output:43,
//     },
//     {
//       "language_id": 123456789,
//       "source_code": "print(\"hello from Python\")"
//     },
//     {
//       "language_id": 72,
//       "source_code": ""
//     }
//   ]

//when we console.log(testResult)
//     language_id: 54,
//     stdin: '2 3',
//     expected_output: '5',
//     stdout: '5',
//     status_id: 3,
//     created_at: '2025-05-12T16:47:37.239Z',
//     finished_at: '2025-05-12T16:47:37.695Z',
//     time: '0.002',
//     memory: 904,
//     stderr: null,
//     token: '611405fa-4f31-44a6-99c8-6f407bc14e73', and many more 


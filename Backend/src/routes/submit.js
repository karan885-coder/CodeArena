
const express = require('express');
const submitRouter = express.Router();
const userMiddleware = require("../middleware/userMiddleware");
const {submitCode,runCode} = require("../controllers/userSubmission");

submitRouter.post("/submit/:id", userMiddleware, submitCode);//id is problem  id
submitRouter.post("/run/:id", userMiddleware, runCode);

module.exports=submitRouter;
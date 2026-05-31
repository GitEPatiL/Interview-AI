const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware")
const interviewController = require("../controllers/interview.controller")
const upload = require("../middlewares/file.middleware")

const interviewRouter = express.Router();

/**
 * @route POST /api/inetrview
 * @description  generate new interview report on the basis self description resume pdf and job description
 * @acccess private
 */


interviewRouter.post("/",authMiddleware.authUser,upload.single("resume"),interviewController.generateInterViewReportController)


/**
 * @route  GET /api/interview/report/:interviewId
 * @description get interview report by interviewId
 * @access private
 */

interviewRouter.get("/report/:interviewId",authMiddleware.authUser,interviewController.getInterviewReportByIdController)



/**
 * @route GET /api/interview/
 * @description get all interview reports of logged in user.
 * @access private
 */

interviewRouter.get("/",authMiddleware.authUser,interviewController.getAllInterviewReportController)


module.exports = interviewRouter;
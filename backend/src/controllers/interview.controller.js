const { PDFParse } = require("pdf-parse");
const generateInterviewReport = require("../services/ai.service")
const interviewReportModel = require("../modals/interviewReport.modal")

/**
 * @description Controller to generate interview report based on user self description ,resume and job descrition
 */

async function generateInterViewReportController(req,res){
    if(!req.file){
        return res.status(400).json({ message: "Resume PDF is required" });
    }

    const parser = new PDFParse({ data: req.file.buffer });
    const parsedPdf = await parser.getText();
    const resumeContent = parsedPdf.text;   // .text is the plain string — getText() returns { pages, text, total }

    const {selfDescription, jobDescription} = req.body;

    if(!selfDescription || !jobDescription){
        return res.status(400).json({ message: "selfDescription and jobDescription are required" });
    }

    const interviewReportByAi = await generateInterviewReport({
        resume: resumeContent,
        selfDescription,
        jobDescription
    })

    const interviewReport = await interviewReportModel.create({
        user: req.user.id,
        resume: resumeContent,
        selfDescription,
        jobDescription,
        ...interviewReportByAi
    })

    res.status(201).json({
        message:"Interview Report generated successfully",
        interviewReport
    })
}


/**
 * @description Controller to get interview report by interviewId.
 */

async function getInterviewReportByIdController(req,res){
    const {interviewId} = req.params;
    const interviewReport = await interviewReportModel.findOne({_id:interviewId,user:req.user.id})

    if(!interviewReport){
        return res.status(404).json({
            message:"Interview report not found"
        })
    }

    res.status(200).json({
        message:"Interview report fetched successfully.",
        interviewReport
    })
}


/**
 * @description Conttroller to get all interview report to logged in user
 */
async function getAllInterviewReportController(req,res){
    const interviewReport = await interviewReportModel.find({user:req.user.id}).sort({createdAt:-1}).select("-resume -selfDescription -jobDescription -__v -technicalQuestions -behaviroalQuestions -skillGaps -preparationPlan");

    res.status(200).json({
        message:"Interview reports fetched successfully",
        interviewReport
    })
}

module.exports={generateInterViewReportController,getInterviewReportByIdController,getAllInterviewReportController}
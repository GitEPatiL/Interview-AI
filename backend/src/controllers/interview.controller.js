const { PDFParse } = require("pdf-parse");
const generateInterviewReport = require("../services/ai.service")
const interviewReportModel = require("../modals/interviewReport.modal")

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

module.exports={generateInterViewReportController}
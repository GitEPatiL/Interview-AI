const { GoogleGenAI } = require("@google/genai");
const { z } = require("zod");

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GEMINI_API_KEY
});

// ─── Zod Schema (used for VALIDATION after AI responds) ───────────────────────
const interviewReportSchema = z.object({
    matchScore: z.number().describe("A score between 0 to 100 indicating how well the candidate's profile matches the job description"),

    technicalQuestions: z.array(z.object({
        question:  z.string().describe("The technical question can be asked in the interview"),
        intention: z.string().describe("The intention of interviewer behind asking the question"),
        answer:    z.string().describe("How to answer this question, what points to cover, what approach to take, etc")
    })).describe("Technical questions that can be asked in the interview along with their intention and how to answer them"),

    behavioralQuestions: z.array(z.object({
        question:  z.string().describe("The behavioral question can be asked in the interview"),
        intention: z.string().describe("The intention of interviewer behind asking the question"),
        answer:    z.string().describe("How to answer this question, what points to cover, what approach to take, etc")
    })).describe("Behavioral questions that can be asked in the interview along with their intention and how to answer them"),

    skillGaps: z.array(z.object({
        skill:    z.string().describe("The skill which the candidate is lacking"),
        severity: z.enum(["low", "medium", "high"]).describe("The severity of the skill gap")
    })).describe("List of skill gaps in the candidate's profile along with their severity"),

    preparationPlan: z.array(z.object({
        day:   z.number().describe("The day number in the preparation plan, starting from 1"),
        focus: z.string().describe("The main focus of this day in the preparation plan, e.g. data structures, system design, mock interviews"),
        tasks: z.array(z.string()).describe("List of tasks to be done on this day to follow the preparation plan, e.g. read a specific book")
    })).describe("A day wise preparation plan for the candidate to follow")
});

// ─── Prompt Template ──────────────────────────────────────────────────────────
function buildPrompt(resume, selfDescription, jobDescription) {
    return `
You are an expert technical interviewer and career coach.

Analyze the candidate's profile against the job description and generate a structured interview report.

--- CANDIDATE RESUME ---
${resume}

--- CANDIDATE SELF DESCRIPTION ---
${selfDescription}

--- JOB DESCRIPTION ---
${jobDescription}

--- INSTRUCTIONS ---
Return ONLY a valid JSON object with NO extra text, NO markdown, NO code blocks.
The JSON must follow this exact structure:

{
  "matchScore": <number 0-100, how well the candidate fits the job>,

  "technicalQuestions": [
    {
      "question":  "<technical question the interviewer might ask>",
      "intention": "<why the interviewer is asking this question>",
      "answer":    "<how the candidate should answer, key points to cover>"
    }
  ],

  "behavioralQuestions": [
    {
      "question":  "<behavioral / situational question>",
      "intention": "<why the interviewer is asking this question>",
      "answer":    "<how the candidate should answer using STAR method or key points>"
    }
  ],

  "skillGaps": [
    {
      "skill":    "<skill the candidate is missing or weak in>",
      "severity": "<low | medium | high>"
    }
  ],

  "preparationPlan": [
    {
      "day":   <day number starting from 1>,
      "focus": "<main topic to study that day>",
      "tasks": ["<specific task 1>", "<specific task 2>"]
    }
  ]
}

Rules:
- Generate at least 5 technical questions and 3 behavioral questions
- Identify at least 3 skill gaps based on the job description vs resume
- Create a 7-day preparation plan
- severity must be exactly one of: "low", "medium", "high"
- matchScore must be a number between 0 and 100
`;
}

// ─── Main Service Function ────────────────────────────────────────────────────
async function generateInterviewReport({ resume, selfDescription, jobDescription }) {

    const prompt = buildPrompt(resume, selfDescription, jobDescription);

    try {
        // STEP 1 — Call Gemini with responseMimeType only (no responseSchema)
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                 // tells Gemini to return JSON
            }
        });

        // STEP 2 — Parse the raw JSON string from AI
        const rawOutput = JSON.parse(response.text);

        // STEP 3 — Validate with Zod (safety net against malformed AI output)
        const report = interviewReportSchema.parse(rawOutput);

        // console.log(report)
        return report;

    } catch (err) {
        // Zod validation error — AI returned wrong shape
        if (err instanceof z.ZodError) {
            console.error("❌ Zod validation failed — AI response did not match schema:");
            console.error(err.errors);
            throw new Error("AI returned an invalid response structure.");
        }

        // Any other error (network, API key, quota etc.)
        console.error("❌ Error generating interview report:", err.message);
        throw err;
    }
}

module.exports = generateInterviewReport;
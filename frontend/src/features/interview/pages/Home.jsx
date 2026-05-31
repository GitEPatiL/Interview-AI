import React, { useState } from "react";
import { useInterview } from "../hooks/useInterview";
import {
  Row,
  Col,
  Typography,
  Button,
  Upload,
  Divider,
  Space,
  Tag,
} from "antd";
import {
  FileTextOutlined,
  UploadOutlined,
  UserOutlined,
  ThunderboltOutlined,
  RobotOutlined,
  InboxOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router";

const { Title, Text, Paragraph } = Typography;
const { Dragger } = Upload;

const Home = () => {
  const { loading, report, generateReport } = useInterview();
  const [jobDescription, setJobDescription] = useState("");
  const [selfDescription, setSelfDescription] = useState("");
  const [resumeFile, setResumeFile] = useState(null);

  const navigate = useNavigate();

  const handleGenerateReport = async () => {
    const data = await generateReport({
      jobDescription,
      selfDescription,
      resumeFile,
    });

    if (data?._id) {
      navigate(`/interview/${data._id}`);
    }
  };

  return (
    <main className="min-h-screen w-full bg-[#FFF9D2] relative overflow-x-hidden flex justify-center items-start pt-16 pb-20 px-6 font-sans text-gray-900">
      
      {/* Background blobs */}
      <div 
        className="absolute rounded-full blur-[100px] pointer-events-none z-0" 
        style={{ width: 600, height: 600, top: -160, left: -160, background: 'radial-gradient(circle, rgba(255, 235, 204, 0.8) 0%, transparent 70%)' }} 
      />
      <div 
        className="absolute rounded-full blur-[100px] pointer-events-none z-0" 
        style={{ width: 500, height: 500, bottom: -100, right: -100, background: 'radial-gradient(circle, rgba(140, 192, 235, 0.5) 0%, transparent 70%)' }} 
      />
      <div 
        className="absolute inset-0 pointer-events-none z-0" 
        style={{ 
          backgroundImage: 'linear-gradient(rgba(0,0,0,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.015) 1px, transparent 1px)', 
          backgroundSize: '48px 48px', 
          maskImage: 'radial-gradient(ellipse 90% 90% at 50% 50%, black 20%, transparent 100%)' 
        }} 
      />

      <div className="relative z-10 w-full max-w-[1200px] mx-auto flex flex-col gap-12">
        {/* ── Hero Header ── */}
        <div className="flex flex-col items-center text-center gap-4 max-w-[800px] mx-auto">
          <div className="flex items-center gap-2 px-3 py-1 bg-white/50 border border-black/10 rounded-full text-sm font-semibold text-gray-700 shadow-sm backdrop-blur-sm">
            <RobotOutlined className="text-[#8CC0EB]" />
            AI-Powered · Gemini 2.5 Flash
          </div>

          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-gray-900">
            Ace Every Interview
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#8CC0EB] to-blue-500">
              with AI Precision
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-600 max-w-2xl leading-relaxed mt-2">
            Upload your resume, paste the job description, and let our AI
            generate a personalized interview report — tailored questions,
            skill gaps, and a full prep plan in seconds.
          </p>
        </div>

        <div className="h-px w-full bg-gradient-to-r from-transparent via-black/10 to-transparent my-4" />

        {/* ── Main Form ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* ── Left: Job Description ── */}
          <div className="bg-[#FFEBCC] rounded-3xl p-6 shadow-sm border border-black/5 flex flex-col gap-4 h-full">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-white shadow-sm flex items-center justify-center text-[#8CC0EB] text-xl">
                <FileTextOutlined />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 m-0">Job Description</h3>
                <p className="text-sm text-gray-500 m-0">Paste the full JD for best results</p>
              </div>
            </div>

            <div className="flex-1 relative">
              <textarea
                onChange={(e) => setJobDescription(e.target.value)}
                className="w-full h-[400px] lg:h-[calc(100%-24px)] bg-white border-none rounded-2xl p-5 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-[#8CC0EB]/30 shadow-inner resize-none text-base leading-relaxed"
                id="jobDescription"
                name="jobDescription"
                placeholder="Paste the complete job description here — responsibilities, requirements, tech stack, company overview..."
              />
            </div>
          </div>

          {/* ── Right: Upload + Self Desc + Button ── */}
          <div className="flex flex-col gap-6 h-full">
            {/* Resume Upload */}
            <div className="bg-[#FFEBCC] rounded-3xl p-6 shadow-sm border border-black/5 flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-white shadow-sm flex items-center justify-center text-[#8CC0EB] text-xl">
                  <UploadOutlined />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 m-0">Resume</h3>
                  <p className="text-sm text-gray-500 m-0">PDF format only</p>
                </div>
              </div>

              <div className="bg-white rounded-2xl border-2 border-dashed border-gray-300 hover:border-[#8CC0EB] hover:bg-blue-50/50 transition-colors">
                <Dragger
                  name="resume"
                  accept=".pdf"
                  multiple={false}
                  beforeUpload={(file) => { setResumeFile(file); return false; }}
                  showUploadList={false}
                  className="bg-transparent border-none p-8"
                >
                  <div className="flex flex-col items-center justify-center gap-2 text-center">
                    <InboxOutlined className="text-4xl text-[#8CC0EB] mb-2" />
                    <p className="font-semibold text-gray-700 m-0 text-lg">
                      {resumeFile ? resumeFile.name : "Drag & drop your resume"}
                    </p>
                    <p className="text-sm text-gray-500 m-0">
                      or click to browse · PDF only
                    </p>
                  </div>
                </Dragger>
              </div>
            </div>

            {/* Self Description */}
            <div className="bg-[#FFEBCC] rounded-3xl p-6 shadow-sm border border-black/5 flex flex-col gap-4 flex-1">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-white shadow-sm flex items-center justify-center text-[#8CC0EB] text-xl">
                  <UserOutlined />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 m-0">Self Description</h3>
                  <p className="text-sm text-gray-500 m-0">Tell the AI who you are</p>
                </div>
              </div>

              <div className="flex-1">
                <textarea
                  onChange={(e) => setSelfDescription(e.target.value)}
                  className="w-full h-full min-h-[120px] bg-white border-none rounded-2xl p-5 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-[#8CC0EB]/30 shadow-inner resize-none text-base leading-relaxed"
                  id="selfDescription"
                  name="selfDescription"
                  placeholder="Briefly describe your background, experience, key skills, what you're looking for, and your strengths..."
                />
              </div>
            </div>

            {/* Generate CTA */}
            <div className="flex flex-col gap-3 mt-auto">
              <button
                onClick={handleGenerateReport}
                disabled={loading}
                className="w-full bg-[#8CC0EB] hover:bg-[#BFDDF0] text-gray-900 font-bold py-4 px-8 rounded-2xl shadow-md flex items-center justify-center gap-2 text-lg transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  "Generating Report..."
                ) : (
                  <>
                    <ThunderboltOutlined /> Generate Interview Report
                  </>
                )}
              </button>
              <p className="text-center text-xs text-gray-500 m-0 font-medium tracking-wide">
                Powered by Google Gemini · Results in ~15 seconds
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;

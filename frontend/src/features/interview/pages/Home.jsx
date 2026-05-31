import React, { useState } from "react";
import { useInterview } from "../hooks/useInterview";
import { Upload } from "antd";
import {
  FileTextOutlined,
  UploadOutlined,
  UserOutlined,
  ThunderboltOutlined,
  RobotOutlined,
  InboxOutlined,
  StarOutlined,
  ArrowRightOutlined
} from "@ant-design/icons";
import { useNavigate } from "react-router";

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
    <main className="min-h-screen w-full bg-[#FFF9D2] relative overflow-x-hidden flex flex-col items-center pt-32 pb-24 px-4 sm:px-6 font-sans">
      
      {/* Premium Background Effects */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute w-[800px] h-[800px] bg-gradient-to-br from-[#FFEBCC] to-transparent rounded-full blur-[120px] -top-40 -left-40 opacity-70"></div>
        <div className="absolute w-[600px] h-[600px] bg-gradient-to-tl from-[#BFDDF0] to-transparent rounded-full blur-[100px] bottom-0 right-0 opacity-60"></div>
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(rgba(0,0,0,0.03) 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col items-center">
        
        {/* Hero Section */}
        <div className="text-center max-w-3xl mb-16 flex flex-col items-center animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/60 backdrop-blur-md border border-white/80 shadow-sm rounded-full text-sm font-bold text-gray-700 mb-8 transition-transform hover:scale-105 cursor-default">
            <StarOutlined className="text-[#8CC0EB]" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#8CC0EB] to-blue-500">Gemini 2.5 Flash Powered</span>
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-gray-900 tracking-tight leading-[1.1] mb-6">
            Land the job with <br />
            <span className="relative inline-block">
              <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900">AI Precision</span>
              <div className="absolute bottom-2 left-0 w-full h-4 bg-[#FFEBCC] -z-10 transform -skew-x-12"></div>
            </span>
          </h1>

          <p className="text-xl text-gray-600 font-medium leading-relaxed max-w-2xl">
            Upload your resume and the job description. Our AI will instantly generate a personalized interview report with tailored questions and a focused preparation plan.
          </p>
        </div>

        {/* Central Interface Hub */}
        <div className="w-full bg-white/40 backdrop-blur-2xl rounded-[2.5rem] p-2 sm:p-4 shadow-2xl shadow-[#8CC0EB]/10 border border-white/60 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-white/40 to-white/10 rounded-[2.5rem] pointer-events-none"></div>
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-4">
            
            {/* Left Col: Job Description */}
            <div className="col-span-1 lg:col-span-7 bg-white rounded-[2rem] p-6 sm:p-8 shadow-sm border border-gray-100 flex flex-col gap-6 transition-all duration-300 hover:shadow-md hover:border-[#8CC0EB]/30">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#FFEBCC]/50 flex items-center justify-center text-[#d99f4c] text-xl">
                  <FileTextOutlined />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 m-0">Job Description</h3>
                  <p className="text-sm font-medium text-gray-500 m-0">Paste the complete requirements</p>
                </div>
              </div>
              
              <div className="flex-1 relative group">
                <textarea
                  onChange={(e) => setJobDescription(e.target.value)}
                  className="w-full h-[350px] lg:h-[450px] bg-gray-50/50 border-2 border-gray-100 rounded-2xl p-6 text-gray-800 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-[#8CC0EB] focus:ring-4 focus:ring-[#8CC0EB]/10 resize-none transition-all duration-300 text-lg leading-relaxed shadow-inner"
                  id="jobDescription"
                  placeholder="Paste the full job description here. Include responsibilities, tech stack, and nice-to-haves..."
                />
              </div>
            </div>

            {/* Right Col: Resume & Self Desc & CTA */}
            <div className="col-span-1 lg:col-span-5 flex flex-col gap-4">
              
              {/* Resume Upload */}
              <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-gray-100 flex flex-col gap-4 transition-all duration-300 hover:shadow-md hover:border-[#8CC0EB]/30">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#BFDDF0]/50 flex items-center justify-center text-[#5a9ac9] text-xl">
                    <UploadOutlined />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 m-0">Resume</h3>
                    <p className="text-sm font-medium text-gray-500 m-0">PDF format only</p>
                  </div>
                </div>

                <div className="bg-gray-50/50 rounded-2xl border-2 border-dashed border-gray-200 hover:border-[#8CC0EB] hover:bg-[#8CC0EB]/5 transition-all duration-300 group">
                  <Dragger
                    name="resume"
                    accept=".pdf"
                    multiple={false}
                    beforeUpload={(file) => { setResumeFile(file); return false; }}
                    showUploadList={false}
                    className="bg-transparent border-none p-6"
                  >
                    <div className="flex flex-col items-center justify-center gap-3 text-center">
                      <div className="w-14 h-14 rounded-full bg-white shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <InboxOutlined className="text-2xl text-[#8CC0EB]" />
                      </div>
                      <div>
                        <p className="font-bold text-gray-700 m-0 text-base">
                          {resumeFile ? resumeFile.name : "Click or drag file"}
                        </p>
                        <p className="text-xs font-medium text-gray-400 mt-1">Maximum size: 5MB</p>
                      </div>
                    </div>
                  </Dragger>
                </div>
              </div>

              {/* Self Description */}
              <div className="flex-1 bg-white rounded-[2rem] p-6 shadow-sm border border-gray-100 flex flex-col gap-4 transition-all duration-300 hover:shadow-md hover:border-[#8CC0EB]/30">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#8CC0EB]/20 flex items-center justify-center text-[#4b89bd] text-xl">
                    <UserOutlined />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 m-0">About You</h3>
                    <p className="text-sm font-medium text-gray-500 m-0">Brief context for the AI</p>
                  </div>
                </div>

                <textarea
                  onChange={(e) => setSelfDescription(e.target.value)}
                  className="flex-1 min-h-[120px] w-full bg-gray-50/50 border-2 border-gray-100 rounded-2xl p-5 text-gray-800 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-[#8CC0EB] focus:ring-4 focus:ring-[#8CC0EB]/10 resize-none transition-all duration-300 text-base shadow-inner"
                  id="selfDescription"
                  placeholder="E.g., I'm a Senior Frontend Engineer looking to transition into a Full-Stack role..."
                />
              </div>

            </div>
            
          </div>
          
          {/* Bottom CTA Bar */}
          <div className="mt-4 bg-gray-900 rounded-[2rem] p-6 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 translate-x-[-150%] animate-[shimmer_3s_infinite]"></div>
            
            <div className="flex items-center gap-4 z-10 text-center sm:text-left">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white text-xl">
                <RobotOutlined />
              </div>
              <div>
                <p className="text-white font-bold text-lg m-0">Ready to prepare?</p>
                <p className="text-gray-400 text-sm font-medium m-0">Generation takes ~15 seconds</p>
              </div>
            </div>

            <button
              onClick={handleGenerateReport}
              disabled={loading}
              className="z-10 w-full sm:w-auto bg-gradient-to-r from-[#8CC0EB] to-[#BFDDF0] hover:from-[#7bb0db] hover:to-[#aecde0] text-gray-900 font-black py-4 px-10 rounded-2xl shadow-[0_0_20px_rgba(140,192,235,0.4)] flex items-center justify-center gap-3 text-lg transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed group"
            >
              {loading ? (
                <>Generating... <span className="animate-spin text-xl">↻</span></>
              ) : (
                <>Generate Report <ArrowRightOutlined className="transition-transform group-hover:translate-x-2" /></>
              )}
            </button>
          </div>

        </div>
      </div>
    </main>
  );
};

export default Home;

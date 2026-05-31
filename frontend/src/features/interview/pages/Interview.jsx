import React, { useState, useEffect } from "react";
import { Progress, Spin, Tooltip, notification } from "antd";
import { useParams, Link } from "react-router";
import {
  CodeOutlined,
  UserOutlined,
  CalendarOutlined,
  BulbOutlined,
  CheckOutlined,
  LoadingOutlined,
  FileSearchOutlined,
  HomeOutlined,
  DownloadOutlined,
  AlertFilled,
  TrophyFilled,
  RightOutlined
} from "@ant-design/icons";
import { useInterview } from "../hooks/useInterview";
import { exportReportToPDF } from "../utils/pdfGenerator";

const getScoreColor = (s) => s >= 80 ? "#4ade80" : s >= 60 ? "#facc15" : "#f87171";
const getScoreLabel = (s) => s >= 80 ? "Strong Match" : s >= 60 ? "Good Match" : "Needs Work";

const severityConfig = {
  high:   { label: "High",   color: "text-red-600", bg: "bg-red-50", border: "border-red-200", dot: "bg-red-500" },
  medium: { label: "Medium", color: "text-yellow-600", bg: "bg-yellow-50",  border: "border-yellow-200", dot: "bg-yellow-500"  },
  low:    { label: "Low",    color: "text-green-600", bg: "bg-green-50",  border: "border-green-200", dot: "bg-green-500"  },
};

const NAV_ITEMS = [
  { id: "technical",  icon: <CodeOutlined />,    label: "Technical",  color: "blue"   },
  { id: "behavioral", icon: <UserOutlined />,     label: "Behavioral", color: "purple" },
  { id: "plan",       icon: <CalendarOutlined />, label: "Prep Plan",     color: "green"  },
];

const Interview = () => {
  const { interviewId } = useParams();
  const { loading, report, getReportById } = useInterview();
  const [activeSection, setActiveSection] = useState("technical");
  const [downloading, setDownloading] = useState(false);
  const [expandedQs, setExpandedQs] = useState({});

  const toggleQ = (idx) => setExpandedQs(prev => ({...prev, [idx]: !prev[idx]}));

  const handleDownloadPDF = async () => {
    if (!report) return;
    setDownloading(true);
    try {
      await exportReportToPDF(report);
      notification.success({ message: "PDF Generated Successfully", placement: "bottomRight" });
    } catch (error) {
      notification.error({ message: "Failed to generate PDF", placement: "bottomRight" });
    } finally {
      setDownloading(false);
    }
  };

  useEffect(() => {
    if (interviewId) {
      getReportById(interviewId);
    }
  }, [interviewId]);

  const scoreColor = report ? getScoreColor(report.matchScore) : "#8CC0EB";
  const scoreLabel = report ? getScoreLabel(report.matchScore) : "";

  return (
    <div className="w-full h-screen flex bg-[#FFF9D2] font-sans text-gray-900 overflow-hidden relative">
      
      {/* Background Ambience */}
      <div className="absolute w-[800px] h-[800px] bg-gradient-to-br from-[#FFEBCC] to-transparent rounded-full blur-[120px] -top-60 -left-60 opacity-60 pointer-events-none"></div>
      <div className="absolute w-[600px] h-[600px] bg-gradient-to-tl from-[#BFDDF0] to-transparent rounded-full blur-[100px] bottom-[-200px] right-[-100px] opacity-50 pointer-events-none"></div>
      
      {/* LEFT SLEEK SIDEBAR */}
      <aside className="relative z-20 w-20 flex-shrink-0 bg-white/70 backdrop-blur-xl border-r border-white shadow-lg flex flex-col items-center py-6 gap-8">
        <Link to="/" className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#8CC0EB] to-[#BFDDF0] text-gray-900 flex items-center justify-center text-xl shadow-md transition-transform hover:scale-110">
          <HomeOutlined />
        </Link>
        
        <div className="w-8 h-px bg-gray-200"></div>

        <nav className="flex flex-col gap-4 w-full px-3">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <Tooltip title={item.label} placement="right" key={item.id}>
                <button
                  onClick={() => setActiveSection(item.id)}
                  className={`relative w-full aspect-square rounded-2xl flex items-center justify-center text-2xl transition-all duration-300 ${
                    isActive 
                      ? "bg-gray-900 text-white shadow-lg scale-110" 
                      : "bg-white text-gray-500 hover:bg-gray-50 hover:text-gray-900 border border-gray-100"
                  }`}
                >
                  {item.icon}
                  {isActive && <div className="absolute -right-1 top-1/2 -translate-y-1/2 w-1.5 h-6 bg-[#8CC0EB] rounded-l-full"></div>}
                </button>
              </Tooltip>
            );
          })}
        </nav>

        <div className="mt-auto w-full px-3">
           <Tooltip title="Download PDF" placement="right">
            <button
              onClick={handleDownloadPDF}
              disabled={!report || downloading}
              className="w-full aspect-square rounded-2xl bg-white border border-gray-200 text-gray-600 flex items-center justify-center text-xl hover:text-[#8CC0EB] hover:border-[#8CC0EB] transition-all disabled:opacity-50 shadow-sm"
            >
              {downloading ? <LoadingOutlined spin /> : <DownloadOutlined />}
            </button>
          </Tooltip>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 relative z-10 flex flex-col h-full overflow-hidden">
        
        {/* Top Header */}
        <header className="flex-shrink-0 flex items-center justify-between px-8 py-6 bg-transparent border-b border-gray-200/50">
          <div className="flex-1">
            <h1 className="text-2xl font-black text-gray-900 tracking-tight truncate max-w-2xl">
              {report?.title ?? "Interview Dashboard"}
            </h1>
            <p className="text-sm font-medium text-gray-500 flex items-center gap-2 mt-1">
               Generated by AI <span className="w-1 h-1 rounded-full bg-gray-300"></span> Confidentially yours
            </p>
          </div>

          {/* Centered Rectangle Score Card (Only shown if report exists) */}
          {report && (
            <div className="flex-1 flex justify-center">
              <div className="bg-white/80 backdrop-blur-md rounded-2xl p-4 px-6 shadow-sm border border-gray-100 flex flex-col min-w-[300px] hover:shadow-md transition-shadow">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center"><TrophyFilled className="mr-1"/> Match Score</span>
                  <span className="font-bold text-sm px-3 py-1 rounded-full" style={{ color: scoreColor, backgroundColor: `${scoreColor}15` }}>
                    {scoreLabel}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <Progress 
                      percent={report.matchScore} 
                      strokeColor={scoreColor} 
                      trailColor="#f3f4f6" 
                      showInfo={false}
                      strokeWidth={10}
                    />
                  </div>
                  <span className="text-3xl font-black tracking-tighter" style={{ color: scoreColor }}>
                    {report.matchScore}%
                  </span>
                </div>
              </div>
            </div>
          )}

          <div className="flex-1"></div> {/* Spacer for flex balance */}
        </header>

        {loading ? (
          <div className="flex-1 flex flex-col items-center justify-center">
            <Spin indicator={<LoadingOutlined style={{ fontSize: 60, color: "#8CC0EB" }} spin />} />
            <p className="mt-6 text-gray-600 font-bold text-xl animate-pulse">Analyzing profile...</p>
          </div>
        ) : !report ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center px-6">
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-sm mb-6">
              <FileSearchOutlined className="text-5xl text-gray-300" />
            </div>
            <h2 className="text-3xl font-black text-gray-800">No Report Found</h2>
            <p className="text-gray-500 mt-2 font-medium">This report may have been deleted or the link is invalid.</p>
            <Link to="/" className="mt-6 px-6 py-3 bg-gray-900 text-white rounded-full font-bold">Go to Dashboard</Link>
          </div>
        ) : (
          <div className="flex-1 flex flex-col lg:flex-row overflow-hidden px-8 pb-8 gap-6">
            
            {/* Center Dynamic Panel */}
            <div className="flex-1 bg-white/60 backdrop-blur-xl rounded-[2rem] shadow-xl border border-white flex flex-col overflow-hidden relative">
              <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white/80 to-transparent pointer-events-none z-10"></div>
              
              <div className="flex-1 overflow-y-auto p-8 pt-10 relative z-0 hide-scrollbar">
                
                {activeSection === "technical" && (
                  <div className="max-w-4xl mx-auto animate-fade-in-up">
                    <div className="flex items-center gap-4 mb-8">
                      <div className="w-14 h-14 rounded-2xl bg-blue-100/50 text-blue-600 flex items-center justify-center text-2xl shadow-inner border border-blue-200/50"><CodeOutlined /></div>
                      <div>
                        <h2 className="text-3xl font-black text-gray-900 m-0">Technical Deep Dive</h2>
                        <p className="text-gray-500 font-medium m-0">{report.technicalQuestions?.length} core domain questions</p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-4">
                      {report.technicalQuestions?.map((q, i) => (
                        <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden transition-all hover:shadow-md">
                          <button onClick={() => toggleQ(`tech-${i}`)} className="w-full flex items-center gap-4 p-5 text-left bg-transparent">
                            <span className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-50 text-blue-600 font-bold flex items-center justify-center text-sm border border-blue-100">Q{i+1}</span>
                            <span className="flex-1 font-bold text-gray-800 text-lg leading-snug">{q.question}</span>
                            <div className={`w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 transition-transform duration-300 ${expandedQs[`tech-${i}`] ? "rotate-90 bg-gray-100" : ""}`}>
                              <RightOutlined />
                            </div>
                          </button>
                          
                          <div className={`transition-all duration-300 ease-in-out ${expandedQs[`tech-${i}`] ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"} overflow-hidden`}>
                            <div className="p-5 pt-0 border-t border-gray-50 flex flex-col gap-4">
                              <div className="bg-orange-50/50 rounded-xl p-4 border border-orange-100/50">
                                <p className="font-bold text-orange-800 mb-2 flex items-center gap-2"><BulbOutlined className="text-orange-500"/> Interviewer Intent</p>
                                <p className="text-orange-900/80 m-0 leading-relaxed font-medium">{q.intention}</p>
                              </div>
                              <div className="bg-green-50/50 rounded-xl p-4 border border-green-100/50">
                                <p className="font-bold text-green-800 mb-2 flex items-center gap-2"><CheckOutlined className="text-green-500"/> Ideal Response Strategy</p>
                                <p className="text-green-900/80 m-0 leading-relaxed font-medium">{q.answer}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeSection === "behavioral" && (
                   <div className="max-w-4xl mx-auto animate-fade-in-up">
                    <div className="flex items-center gap-4 mb-8">
                      <div className="w-14 h-14 rounded-2xl bg-purple-100/50 text-purple-600 flex items-center justify-center text-2xl shadow-inner border border-purple-200/50"><UserOutlined /></div>
                      <div>
                        <h2 className="text-3xl font-black text-gray-900 m-0">Behavioral Assessment</h2>
                        <p className="text-gray-500 font-medium m-0">{report.behavioralQuestions?.length} situational scenarios</p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-4">
                      {report.behavioralQuestions?.map((q, i) => (
                        <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden transition-all hover:shadow-md">
                          <button onClick={() => toggleQ(`beh-${i}`)} className="w-full flex items-center gap-4 p-5 text-left bg-transparent">
                            <span className="flex-shrink-0 w-10 h-10 rounded-full bg-purple-50 text-purple-600 font-bold flex items-center justify-center text-sm border border-purple-100">Q{i+1}</span>
                            <span className="flex-1 font-bold text-gray-800 text-lg leading-snug">{q.question}</span>
                            <div className={`w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 transition-transform duration-300 ${expandedQs[`beh-${i}`] ? "rotate-90 bg-gray-100" : ""}`}>
                              <RightOutlined />
                            </div>
                          </button>
                          
                          <div className={`transition-all duration-300 ease-in-out ${expandedQs[`beh-${i}`] ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"} overflow-hidden`}>
                            <div className="p-5 pt-0 border-t border-gray-50 flex flex-col gap-4">
                              <div className="bg-orange-50/50 rounded-xl p-4 border border-orange-100/50">
                                <p className="font-bold text-orange-800 mb-2 flex items-center gap-2"><BulbOutlined className="text-orange-500"/> Interviewer Intent</p>
                                <p className="text-orange-900/80 m-0 leading-relaxed font-medium">{q.intention}</p>
                              </div>
                              <div className="bg-green-50/50 rounded-xl p-4 border border-green-100/50">
                                <p className="font-bold text-green-800 mb-2 flex items-center gap-2"><CheckOutlined className="text-green-500"/> Ideal Response Strategy</p>
                                <p className="text-green-900/80 m-0 leading-relaxed font-medium">{q.answer}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeSection === "plan" && (
                  <div className="max-w-4xl mx-auto animate-fade-in-up">
                    <div className="flex items-center gap-4 mb-8">
                      <div className="w-14 h-14 rounded-2xl bg-green-100/50 text-green-600 flex items-center justify-center text-2xl shadow-inner border border-green-200/50"><CalendarOutlined /></div>
                      <div>
                        <h2 className="text-3xl font-black text-gray-900 m-0">Action Plan</h2>
                        <p className="text-gray-500 font-medium m-0">{report.preparationPlan?.length}-day roadmap to success</p>
                      </div>
                    </div>
                    
                    <div className="relative pl-8 border-l-2 border-gray-200 ml-4 flex flex-col gap-10 py-4">
                      {report.preparationPlan?.map((day, i) => (
                        <div key={i} className="relative">
                          <div className="absolute -left-[58px] top-4 w-12 h-12 rounded-full bg-white border-[3px] border-green-400 shadow-sm flex items-center justify-center z-10">
                            <span className="text-green-600 font-black text-lg">{day.day}</span>
                          </div>
                          
                          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 transition-all hover:shadow-md ml-4">
                            <h4 className="text-xl font-bold text-gray-900 mb-4">{day.focus}</h4>
                            <ul className="flex flex-col gap-3 m-0 p-0">
                              {day.tasks?.map((t, j) => (
                                <li key={j} className="flex items-start gap-3">
                                  <div className="mt-1.5 w-2 h-2 rounded-full bg-green-400 shrink-0"></div>
                                  <span className="text-gray-700 font-medium leading-relaxed">{t}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
              </div>
            </div>

            {/* Right Side Stats Panel */}
            <aside className="w-[320px] flex-shrink-0 flex flex-col gap-6 overflow-y-auto hide-scrollbar">
              
              {/* Score Card has been moved to the Top Header */}

              {/* Gaps Card */}
              <div className="bg-white/60 backdrop-blur-xl rounded-[2rem] p-6 shadow-xl border border-white flex-1">
                <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-6 flex items-center"><AlertFilled className="mr-2"/> Skill Gaps Identified</p>
                
                <div className="flex flex-col gap-3">
                  {report.skillGaps?.length === 0 ? (
                    <div className="text-center py-6">
                      <span className="text-4xl text-gray-300 block mb-2">🎉</span>
                      <p className="text-gray-500 font-bold">No major gaps found!</p>
                    </div>
                  ) : (
                    report.skillGaps?.map((gap, i) => {
                      const cfg = severityConfig[gap.severity] ?? severityConfig.low;
                      return (
                        <div key={i} className={`rounded-xl p-4 border ${cfg.border} bg-white shadow-sm relative overflow-hidden`}>
                          <div className={`absolute left-0 top-0 bottom-0 w-1 ${cfg.dot}`}></div>
                          <div className="flex items-center justify-between mb-1 pl-2">
                            <span className={`text-[10px] font-black uppercase tracking-wider ${cfg.color}`}>{cfg.label} Priority</span>
                          </div>
                          <p className="font-bold text-gray-800 text-sm m-0 pl-2">{gap.skill}</p>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>

            </aside>
            
          </div>
        )}
      </main>

    </div>
  );
};

export default Interview;

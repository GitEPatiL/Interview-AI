import React, { useState, useEffect } from "react";
import { Typography, Tag, Collapse, Progress, Spin, Button } from "antd";
import { useParams, Link } from "react-router";
import {
  CodeOutlined,
  UserOutlined,
  AlertOutlined,
  CalendarOutlined,
  BulbOutlined,
  BookOutlined,
  RightOutlined,
  CheckOutlined,
  RobotOutlined,
  LoadingOutlined,
  FileSearchOutlined,
  HomeOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import { useInterview } from "../hooks/useInterview";
import { exportReportToPDF } from "../utils/pdfGenerator";

const { Text, Paragraph } = Typography;

const getScoreColor = (s) => s >= 80 ? "#4ade80" : s >= 60 ? "#facc15" : "#f87171";
const getScoreLabel = (s) => s >= 80 ? "Strong Match" : s >= 60 ? "Good Match" : "Needs Work";

const severityConfig = {
  high:   { label: "High",   color: "#f87171", bg: "bg-red-50", border: "border-red-200" },
  medium: { label: "Medium", color: "#facc15", bg: "bg-yellow-50",  border: "border-yellow-200"  },
  low:    { label: "Low",    color: "#4ade80", bg: "bg-green-50",  border: "border-green-200"  },
};

const NAV_ITEMS = [
  { id: "technical",  icon: <CodeOutlined />,    label: "Technical Questions",  colorClass: "text-blue-500 bg-blue-50"   },
  { id: "behavioral", icon: <UserOutlined />,     label: "Behavioral Questions", colorClass: "text-purple-500 bg-purple-50" },
  { id: "plan",       icon: <CalendarOutlined />, label: "Preparation Plan",     colorClass: "text-green-500 bg-green-50"  },
];

const buildCollapseItems = (questions = []) =>
  questions.map((q, i) => ({
    key: String(i),
    label: (
      <div className="flex items-start gap-4">
        <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-50 text-blue-600 font-bold flex items-center justify-center text-sm shadow-sm border border-blue-100">Q{i + 1}</span>
        <span className="text-gray-800 font-semibold text-base mt-1">{q.question}</span>
      </div>
    ),
    children: (
      <div className="flex flex-col gap-4 pl-12 pr-4 pb-2">
        <div className="bg-[#FFF9D2]/50 border border-yellow-200 rounded-xl p-4">
          <p className="font-bold text-gray-800 mb-2 flex items-center gap-2"><BulbOutlined className="text-yellow-600"/> Interviewer's Intention</p>
          <Paragraph className="text-gray-700 m-0">{q.intention}</Paragraph>
        </div>
        <div className="bg-green-50/50 border border-green-200 rounded-xl p-4">
          <p className="font-bold text-gray-800 mb-2 flex items-center gap-2"><CheckOutlined className="text-green-600"/> How to Answer</p>
          <Paragraph className="text-gray-700 m-0">{q.answer}</Paragraph>
        </div>
      </div>
    ),
  }));

const Interview = () => {
  const { interviewId } = useParams();
  const { loading, report, getReportById } = useInterview();
  const [activeSection, setActiveSection] = useState("technical");
  const [downloading, setDownloading] = useState(false);

  const handleDownloadPDF = async () => {
    if (!report) return;
    setDownloading(true);
    try {
      await exportReportToPDF(report);
    } catch (error) {
      console.error("PDF generation failed:", error);
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

  const navItemsWithCount = [
    { ...NAV_ITEMS[0], count: report?.technicalQuestions?.length ?? "-" },
    { ...NAV_ITEMS[1], count: report?.behavioralQuestions?.length ?? "-" },
    { ...NAV_ITEMS[2], count: report ? `${report.preparationPlan?.length ?? 0} days` : "-" },
  ];

  return (
    <div className="w-full h-[calc(100vh-65px)] flex flex-col bg-[#FFF9D2] font-sans text-gray-900 overflow-hidden relative">
      
      {/* Background blobs */}
      <div className="absolute w-[500px] h-[500px] -top-[150px] -left-[150px] bg-[radial-gradient(circle,rgba(255,235,204,0.6)_0%,transparent_70%)] rounded-full blur-[90px] pointer-events-none z-0" />
      <div className="absolute w-[400px] h-[400px] -bottom-[100px] -right-[100px] bg-[radial-gradient(circle,rgba(140,192,235,0.4)_0%,transparent_70%)] rounded-full blur-[90px] pointer-events-none z-0" />

      {/* Local Topbar (Below global Navbar) */}
      <header className="relative z-10 h-16 min-h-[64px] flex items-center justify-between px-6 border-b border-black/10 bg-[#FFEBCC]/80 backdrop-blur-md shrink-0">
        <div className="flex items-center gap-3">
          <Link to="/" className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-gray-600 hover:text-[#8CC0EB] hover:bg-blue-50 transition-colors shadow-sm border border-black/5">
            <HomeOutlined />
          </Link>
          <RobotOutlined className="text-[#8CC0EB] text-xl" />
          <span className="font-bold text-gray-800 text-lg truncate max-w-md">{report?.title ?? "Interview Report"}</span>
        </div>
        <div className="flex items-center gap-4">
          {report && (
            <Button
              type="primary"
              icon={downloading ? <LoadingOutlined spin /> : <DownloadOutlined />}
              onClick={handleDownloadPDF}
              loading={downloading}
              className="bg-[#8CC0EB] hover:bg-[#BFDDF0] text-gray-900 border-none font-semibold shadow-sm"
            >
              Download PDF
            </Button>
          )}
          <Tag className="hidden sm:flex border border-[#8CC0EB]/30 bg-[#8CC0EB]/10 text-gray-700 rounded-full px-3 py-1">AI Generated</Tag>
        </div>
      </header>

      {/* 3-column body */}
      <div className="flex-1 flex overflow-hidden relative z-10">
        
        {/* LEFT: Navigation */}
        <aside className="w-72 shrink-0 bg-[#FFEBCC]/50 border-r border-black/10 flex flex-col pt-6 pb-4 px-4 overflow-y-auto">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4 px-2">Sections</p>
          <nav className="flex flex-col gap-2">
            {navItemsWithCount.map((item) => (
              <button
                key={item.id}
                className={`w-full flex items-center text-left p-3 rounded-xl transition-all border ${activeSection === item.id ? "bg-white border-black/10 shadow-sm" : "border-transparent hover:bg-white/50"}`}
                onClick={() => setActiveSection(item.id)}
              >
                <span className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center text-lg mr-3 ${item.colorClass}`}>{item.icon}</span>
                <span className="flex-1 overflow-hidden">
                  <span className="block font-semibold text-gray-800 truncate">{item.label}</span>
                  <span className="block text-xs text-gray-500">{item.count}</span>
                </span>
                <RightOutlined className={`text-xs transition-transform ${activeSection === item.id ? "text-gray-800 translate-x-1" : "text-gray-300"}`} />
              </button>
            ))}
          </nav>
        </aside>

        {/* MIDDLE: Content */}
        <section className="flex-1 overflow-y-auto bg-white/40 p-8">
          
          {loading && (
            <div className="flex flex-col items-center justify-center h-full pt-20">
              <Spin indicator={<LoadingOutlined style={{ fontSize: 48, color: "#8CC0EB" }} spin />} />
              <p className="mt-4 text-gray-500 font-medium text-lg animate-pulse">Fetching your report...</p>
            </div>
          )}

          {!loading && !report && (
            <div className="flex flex-col items-center justify-center h-full pt-20 text-center">
              <FileSearchOutlined className="text-6xl text-gray-300 mb-4" />
              <h2 className="text-2xl font-bold text-gray-700">No Report Found</h2>
              <p className="text-gray-500 mt-2">This report may have been deleted or the link is invalid.</p>
            </div>
          )}

          {!loading && report && activeSection === "technical" && (
            <div className="max-w-4xl mx-auto pb-20">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-500 flex items-center justify-center text-3xl shadow-sm border border-blue-100"><CodeOutlined /></div>
                <div>
                  <h2 className="text-2xl font-black text-gray-900 m-0">Technical Questions</h2>
                  <p className="text-gray-500 m-0">{report.technicalQuestions?.length} questions likely to be asked in your interview</p>
                </div>
              </div>
              <Collapse
                items={buildCollapseItems(report.technicalQuestions)}
                expandIcon={({ isActive }) => <RightOutlined className={`text-blue-500 transition-transform ${isActive ? "rotate-90" : ""}`} />}
                ghost
                className="bg-white rounded-2xl p-4 shadow-sm border border-black/5"
              />
            </div>
          )}

          {!loading && report && activeSection === "behavioral" && (
            <div className="max-w-4xl mx-auto pb-20">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 rounded-2xl bg-purple-50 text-purple-500 flex items-center justify-center text-3xl shadow-sm border border-purple-100"><UserOutlined /></div>
                <div>
                  <h2 className="text-2xl font-black text-gray-900 m-0">Behavioral Questions</h2>
                  <p className="text-gray-500 m-0">{report.behavioralQuestions?.length} situational questions to prepare for</p>
                </div>
              </div>
              <Collapse
                items={buildCollapseItems(report.behavioralQuestions)}
                expandIcon={({ isActive }) => <RightOutlined className={`text-purple-500 transition-transform ${isActive ? "rotate-90" : ""}`} />}
                ghost
                className="bg-white rounded-2xl p-4 shadow-sm border border-black/5"
              />
            </div>
          )}

          {!loading && report && activeSection === "plan" && (
            <div className="max-w-4xl mx-auto pb-20">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 rounded-2xl bg-green-50 text-green-500 flex items-center justify-center text-3xl shadow-sm border border-green-100"><CalendarOutlined /></div>
                <div>
                  <h2 className="text-2xl font-black text-gray-900 m-0">{report.preparationPlan?.length}-Day Preparation Plan</h2>
                  <p className="text-gray-500 m-0">A focused daily roadmap to ace your interview</p>
                </div>
              </div>
              <div className="flex flex-col gap-6">
                {report.preparationPlan?.map((day, i) => (
                  <div key={day._id ?? i} className="flex gap-6 relative">
                    <div className="flex flex-col items-center">
                      <div className="w-14 h-14 rounded-full bg-white border-2 border-green-200 shadow-sm flex flex-col items-center justify-center z-10">
                        <span className="text-[10px] font-bold text-gray-400 uppercase leading-none">Day</span>
                        <span className="text-xl font-black text-green-600 leading-none">{day.day}</span>
                      </div>
                      {i < report.preparationPlan.length - 1 && <div className="w-0.5 bg-green-100 flex-1 my-2" />}
                    </div>
                    <div className="flex-1 bg-white rounded-2xl p-6 shadow-sm border border-black/5 mb-6">
                      <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2"><BookOutlined className="text-green-500" /> {day.focus}</h4>
                      <ul className="flex flex-col gap-3 m-0 p-0 list-none">
                        {day.tasks?.map((t, j) => (
                          <li key={j} className="flex items-start gap-3 text-gray-700">
                            <span className="w-2 h-2 rounded-full bg-green-400 mt-2 shrink-0" />
                            <span className="leading-relaxed">{t}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </section>

        {/* RIGHT: Score + Skill Gaps */}
        <aside className="w-80 shrink-0 bg-[#FFEBCC]/50 border-l border-black/10 flex flex-col p-6 overflow-y-auto gap-6">
          
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-black/5 flex flex-col items-center">
            <p className="w-full text-sm font-bold text-gray-600 uppercase tracking-wider mb-6 flex items-center gap-2"><AlertOutlined /> Match Score</p>
            {loading ? (
              <div className="w-32 h-32 rounded-full bg-gray-100 animate-pulse" />
            ) : report ? (
              <div className="flex flex-col items-center relative">
                <Progress
                  type="circle"
                  percent={report.matchScore}
                  size={140}
                  strokeColor={scoreColor}
                  trailColor="#f3f4f6"
                  strokeWidth={8}
                  format={(pct) => (
                    <div className="flex flex-col items-center justify-center leading-none">
                      <span className="text-4xl font-black" style={{ color: scoreColor }}>{pct}</span>
                      <span className="text-sm font-bold text-gray-400 mt-1">/100</span>
                    </div>
                  )}
                />
                <Tag className="mt-4 rounded-full px-4 py-1 text-sm font-bold border" style={{ color: scoreColor, borderColor: scoreColor, background: `${scoreColor}15` }}>
                  {scoreLabel}
                </Tag>
              </div>
            ) : (
              <div className="w-32 h-32 rounded-full bg-gray-100 animate-pulse" />
            )}
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-black/5">
            <p className="w-full text-sm font-bold text-gray-600 uppercase tracking-wider mb-4 flex items-center gap-2"><AlertOutlined /> Skill Gaps</p>
            {loading ? (
              <div className="flex flex-col gap-3">
                <div className="h-16 w-full bg-gray-100 rounded-xl animate-pulse" />
                <div className="h-16 w-full bg-gray-100 rounded-xl animate-pulse" />
                <div className="h-16 w-full bg-gray-100 rounded-xl animate-pulse" />
              </div>
            ) : report ? (
              <div className="flex flex-col gap-3">
                {report.skillGaps?.map((gap, i) => {
                  const cfg = severityConfig[gap.severity] ?? severityConfig.low;
                  return (
                    <div key={i} className={`rounded-xl p-3 border ${cfg.border} ${cfg.bg}`}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full" style={{ background: cfg.color }} />
                          <span className="text-xs font-bold uppercase tracking-wider" style={{ color: cfg.color }}>{cfg.label} Priority</span>
                        </span>
                      </div>
                      <p className="font-semibold text-gray-800 m-0">{gap.skill}</p>
                    </div>
                  );
                })}
              </div>
            ) : null}
          </div>

        </aside>
      </div>
    </div>
  );
};

export default Interview;

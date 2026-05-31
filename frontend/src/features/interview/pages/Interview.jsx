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
import "../style/interview.scss";

const { Text, Paragraph } = Typography;

// ── Helpers ───────────────────────────────────────────────────────────────────
const getScoreColor = (s) => s >= 80 ? "#4ade80" : s >= 60 ? "#facc15" : "#f87171";
const getScoreLabel = (s) => s >= 80 ? "Strong Match" : s >= 60 ? "Good Match" : "Needs Work";

const severityConfig = {
  high:   { label: "High",   color: "#f87171", bg: "rgba(248,113,113,0.10)", border: "rgba(248,113,113,0.28)" },
  medium: { label: "Medium", color: "#facc15", bg: "rgba(250,204,21,0.08)",  border: "rgba(250,204,21,0.24)"  },
  low:    { label: "Low",    color: "#4ade80", bg: "rgba(74,222,128,0.08)",  border: "rgba(74,222,128,0.24)"  },
};

const NAV_ITEMS = [
  { id: "technical",  icon: <CodeOutlined />,    label: "Technical Questions",  color: "blue"   },
  { id: "behavioral", icon: <UserOutlined />,     label: "Behavioral Questions", color: "purple" },
  { id: "plan",       icon: <CalendarOutlined />, label: "Preparation Plan",     color: "green"  },
];

// ── Q Collapse items ──────────────────────────────────────────────────────────
const buildCollapseItems = (questions = []) =>
  questions.map((q, i) => ({
    key: String(i),
    label: (
      <div className="q-label">
        <span className="q-label__idx">Q{i + 1}</span>
        <span className="q-label__text">{q.question}</span>
      </div>
    ),
    children: (
      <div className="q-body">
        <div className="q-block q-block--intention">
          <p className="q-block__title"><BulbOutlined /> Interviewer's Intention</p>
          <Paragraph className="q-block__text">{q.intention}</Paragraph>
        </div>
        <div className="q-block q-block--answer">
          <p className="q-block__title"><CheckOutlined /> How to Answer</p>
          <Paragraph className="q-block__text">{q.answer}</Paragraph>
        </div>
      </div>
    ),
  }));

// ── Main Component ────────────────────────────────────────────────────────────
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

  const scoreColor = report ? getScoreColor(report.matchScore) : "#a78bfa";
  const scoreLabel = report ? getScoreLabel(report.matchScore) : "";

  const navItemsWithCount = [
    { ...NAV_ITEMS[0], count: report?.technicalQuestions?.length ?? "-" },
    { ...NAV_ITEMS[1], count: report?.behavioralQuestions?.length ?? "-" },
    { ...NAV_ITEMS[2], count: report ? `${report.preparationPlan?.length ?? 0} days` : "-" },
  ];

  return (
    <div className="ir">
      {/* Blobs */}
      <div className="ir__blob ir__blob--1" />
      <div className="ir__blob ir__blob--2" />
      <div className="ir__grid" />

      {/* ── Top bar ── */}
      <header className="ir__topbar">
        <div className="ir__topbar-brand">
          <Link to="/" className="ir__topbar-back" title="Back to Home">
            <HomeOutlined />
          </Link>
          <RobotOutlined className="ir__topbar-icon" />
          <span className="ir__topbar-title">{report?.title ?? "Interview Report"}</span>
        </div>
        <div className="ir__topbar-actions">
          {report && (
            <Button
              type="primary"
              icon={downloading ? <LoadingOutlined spin /> : <DownloadOutlined />}
              onClick={handleDownloadPDF}
              loading={downloading}
              className="ir__download-btn"
            >
              Download PDF
            </Button>
          )}
          <Tag className="ir__topbar-badge">AI Generated · Gemini 2.5 Flash</Tag>
        </div>
      </header>

      {/* ── 3-column body ── */}
      <div className="ir__body">

        {/* ── LEFT: Navigation ── */}
        <aside className="ir__left">
          <p className="ir__left-label">Sections</p>
          <nav className="ir__nav">
            {navItemsWithCount.map((item) => (
              <button
                key={item.id}
                className={`ir__nav-item ir__nav-item--${item.color} ${activeSection === item.id ? "ir__nav-item--active" : ""}`}
                onClick={() => setActiveSection(item.id)}
              >
                <span className={`ir__nav-icon ir__nav-icon--${item.color}`}>{item.icon}</span>
                <span className="ir__nav-content">
                  <span className="ir__nav-name">{item.label}</span>
                  <span className="ir__nav-count">{item.count}</span>
                </span>
                <RightOutlined className="ir__nav-arrow" />
              </button>
            ))}
          </nav>
        </aside>

        {/* ── MIDDLE: Content ── */}
        <section className="ir__middle">

          {/* Loading state */}
          {loading && (
            <div className="ir__loading">
              <Spin indicator={<LoadingOutlined style={{ fontSize: 36, color: "#a78bfa" }} spin />} />
              <Text className="ir__loading-text">Fetching your report...</Text>
            </div>
          )}

          {/* Empty state */}
          {!loading && !report && (
            <div className="ir__empty">
              <FileSearchOutlined className="ir__empty-icon" />
              <Text className="ir__empty-title">No Report Found</Text>
              <Text className="ir__empty-sub">This report may have been deleted or the link is invalid.</Text>
            </div>
          )}

          {/* Technical Questions */}
          {!loading && report && activeSection === "technical" && (
            <div className="ir__content" key="technical">
              <div className="ir__content-header">
                <div className="ir__content-icon ir__content-icon--blue"><CodeOutlined /></div>
                <div>
                  <p className="ir__content-title">Technical Questions</p>
                  <p className="ir__content-sub">{report.technicalQuestions?.length} questions likely to be asked in your interview</p>
                </div>
              </div>
              <Collapse
                items={buildCollapseItems(report.technicalQuestions)}
                className="ir__collapse"
                expandIcon={({ isActive }) => (
                  <RightOutlined style={{ transition: "transform 0.2s", transform: isActive ? "rotate(90deg)" : "rotate(0deg)", color: "#a78bfa", fontSize: 11 }} />
                )}
                ghost
              />
            </div>
          )}

          {/* Behavioral Questions */}
          {!loading && report && activeSection === "behavioral" && (
            <div className="ir__content" key="behavioral">
              <div className="ir__content-header">
                <div className="ir__content-icon ir__content-icon--purple"><UserOutlined /></div>
                <div>
                  <p className="ir__content-title">Behavioral Questions</p>
                  <p className="ir__content-sub">{report.behavioralQuestions?.length} situational questions to prepare for</p>
                </div>
              </div>
              <Collapse
                items={buildCollapseItems(report.behavioralQuestions)}
                className="ir__collapse"
                expandIcon={({ isActive }) => (
                  <RightOutlined style={{ transition: "transform 0.2s", transform: isActive ? "rotate(90deg)" : "rotate(0deg)", color: "#a78bfa", fontSize: 11 }} />
                )}
                ghost
              />
            </div>
          )}

          {/* Preparation Plan */}
          {!loading && report && activeSection === "plan" && (
            <div className="ir__content" key="plan">
              <div className="ir__content-header">
                <div className="ir__content-icon ir__content-icon--green"><CalendarOutlined /></div>
                <div>
                  <p className="ir__content-title">{report.preparationPlan?.length}-Day Preparation Plan</p>
                  <p className="ir__content-sub">A focused daily roadmap to ace your interview</p>
                </div>
              </div>
              <div className="ir__plan">
                {report.preparationPlan?.map((day, i) => (
                  <div key={day._id ?? i} className="ir__day">
                    <div className="ir__day-left">
                      <div className="ir__day-badge">
                        <span className="ir__day-badge-label">Day</span>
                        <span className="ir__day-badge-num">{day.day}</span>
                      </div>
                      {i < report.preparationPlan.length - 1 && <div className="ir__day-line" />}
                    </div>
                    <div className="ir__day-content">
                      <p className="ir__day-focus"><BookOutlined /> {day.focus}</p>
                      <ul className="ir__day-tasks">
                        {day.tasks?.map((t, j) => (
                          <li key={j} className="ir__day-task">
                            <span className="ir__day-task-dot" />
                            <span className="ir__day-task-text">{t}</span>
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

        {/* ── RIGHT: Score + Skill Gaps ── */}
        <aside className="ir__right">

          {/* Score */}
          <div className="ir__card">
            <p className="ir__card-label"><AlertOutlined /> Match Score</p>
            {loading ? (
              <div className="ir__card-skeleton" />
            ) : report ? (
              <div className="ir__score">
                <Progress
                  type="circle"
                  percent={report.matchScore}
                  size={130}
                  strokeColor={scoreColor}
                  trailColor="rgba(255,255,255,0.06)"
                  strokeWidth={9}
                  format={(pct) => (
                    <div className="ir__score-inner">
                      <span className="ir__score-num" style={{ color: scoreColor }}>{pct}</span>
                      <span className="ir__score-denom">/100</span>
                    </div>
                  )}
                />
                <Tag className="ir__score-tag" style={{ color: scoreColor, borderColor: scoreColor, background: `${scoreColor}18` }}>
                  {scoreLabel}
                </Tag>
              </div>
            ) : (
              <div className="ir__card-skeleton" />
            )}
          </div>

          {/* Skill Gaps */}
          <div className="ir__card">
            <p className="ir__card-label"><AlertOutlined /> Skill Gaps</p>
            {loading ? (
              <>
                <div className="ir__card-skeleton ir__card-skeleton--sm" />
                <div className="ir__card-skeleton ir__card-skeleton--sm" />
                <div className="ir__card-skeleton ir__card-skeleton--sm" />
              </>
            ) : report ? (
              <div className="ir__gaps">
                {report.skillGaps?.map((gap, i) => {
                  const cfg = severityConfig[gap.severity] ?? severityConfig.low;
                  return (
                    <div key={i} className="ir__gap" style={{ borderColor: cfg.border, background: cfg.bg }}>
                      <div className="ir__gap-top">
                        <span className="ir__gap-dot" style={{ background: cfg.color }} />
                        <Tag className="ir__gap-severity" style={{ color: cfg.color, borderColor: cfg.border, background: `${cfg.color}18` }}>
                          {cfg.label}
                        </Tag>
                      </div>
                      <p className="ir__gap-name">{gap.skill}</p>
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

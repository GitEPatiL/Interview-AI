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
import "../style/home.scss";
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
    <main className="home">
      {/* Background blobs */}
      <div className="bg-blob bg-blob--1" />
      <div className="bg-blob bg-blob--2" />
      <div className="bg-blob bg-blob--3" />
      <div className="bg-grid" />

      <div className="home__container">
        {/* ── Hero Header ── */}
        <div className="home__hero">
          <Space direction="vertical" align="center" size={16}>
            <Tag className="ai-badge" icon={<RobotOutlined />}>
              AI-Powered · Gemini 2.5 Flash
            </Tag>

            <Title level={1} className="hero__title">
              Ace Every Interview
              <br />
              <span className="hero__title--gradient">with AI Precision</span>
            </Title>

            <Paragraph className="hero__subtitle">
              Upload your resume, paste the job description, and let our AI
              generate a personalized interview report — tailored questions,
              skill gaps, and a full prep plan in seconds.
            </Paragraph>
          </Space>
        </div>

        <Divider className="hero__divider" />

        {/* ── Main Form ── */}
        <Row gutter={[32, 32]} className="home__form-row" align="stretch">
          {/* ── Left: Job Description ── */}
          <Col xs={24} lg={12}>
            <div className="glass-card glass-card--tall">
              <div className="section-header">
                <div className="section-icon">
                  <FileTextOutlined />
                </div>
                <div>
                  <Text className="section-label">Job Description</Text>
                  <Text className="section-hint">
                    Paste the full JD for best results
                  </Text>
                </div>
              </div>

              <div className="textarea-wrapper">
                <textarea
                  onChange={(e) => setJobDescription(e.target.value)}
                  className="premium-textarea"
                  id="jobDescription"
                  name="jobDescription"
                  placeholder="Paste the complete job description here — responsibilities, requirements, tech stack, company overview..."
                />
              </div>

              <div className="char-count">
                <Text className="char-count__text">0 characters</Text>
              </div>
            </div>
          </Col>

          {/* ── Right: Upload + Self Desc + Button ── */}
          <Col xs={24} lg={12}>
            <Space direction="vertical" size={24} className="right-column">
              {/* Resume Upload */}
              <div className="glass-card">
                <div className="section-header">
                  <div className="section-icon">
                    <UploadOutlined />
                  </div>
                  <div>
                    <Text className="section-label">Resume</Text>
                    <Text className="section-hint">PDF format only</Text>
                  </div>
                </div>

                <Dragger
                  name="resume"
                  accept=".pdf"
                  multiple={false}
                  beforeUpload={(file) => { setResumeFile(file); return false; }}
                  showUploadList={false}
                  className="premium-dragger"
                >
                  <div className="dragger__idle">
                    <InboxOutlined className="dragger__idle-icon" />
                    <Text className="dragger__idle-text">
                      Drag & drop your resume
                    </Text>
                    <Text className="dragger__idle-hint">
                      or click to browse · PDF only
                    </Text>
                  </div>
                </Dragger>
              </div>

              {/* Self Description */}
              <div className="glass-card">
                <div className="section-header">
                  <div className="section-icon">
                    <UserOutlined />
                  </div>
                  <div>
                    <Text className="section-label">Self Description</Text>
                    <Text className="section-hint">
                      Tell the AI who you are
                    </Text>
                  </div>
                </div>

                <div className="textarea-wrapper">
                  <textarea
                    onChange={(e) => setSelfDescription(e.target.value)}
                    className="premium-textarea premium-textarea--short"
                    id="selfDescription"
                    name="selfDescription"
                    placeholder="Briefly describe your background, experience, key skills, what you're looking for, and your strengths..."
                  />
                </div>
              </div>

              {/* Generate CTA */}
              <Button
                onClick={handleGenerateReport}
                loading={loading}
                className="cta-button"
                size="large"
                block
                icon={<ThunderboltOutlined />}
              >
                {loading ? "Generating Report..." : "Generate Interview Report"}
              </Button>

              <Text className="cta-disclaimer">
                Powered by Google Gemini · Results in ~15 seconds
              </Text>
            </Space>
          </Col>
        </Row>
      </div>
    </main>
  );
};

export default Home;

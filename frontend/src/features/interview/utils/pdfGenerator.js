import html2pdf from "html2pdf.js";

/**
 * Generates and downloads a beautiful light-themed PDF report of the entire interview preparation data.
 * Constructs an off-screen HTML element containing all data sections (Technical Q&A, Behavioral Q&A,
 * Preparation Roadmap, Match Score, and Skill Gaps) so the entire dossier is exported regardless
 * of which tab is currently active on screen.
 * 
 * @param {Object} report The interview report data object
 * @returns {Promise} Resolves when the PDF generation and download starts
 */
export const exportReportToPDF = (report) => {
  if (!report) return Promise.reject("No report data available");



  // Priority severity styles for skill gaps
  const severityColors = {
    high: { label: "High Priority", color: "#ef4444", bg: "#fef2f2", border: "#fca5a5" },
    medium: { label: "Medium Priority", color: "#f59e0b", bg: "#fffbeb", border: "#fcd34d" },
    low: { label: "Low Priority", color: "#10b981", bg: "#ecfdf5", border: "#6ee7b7" }
  };

  // Modern print-ready styles to inject with strong overrides
  const styles = `
    <style>
      .pdf-report {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif !important;
        padding: 30px !important;
        background: #ffffff !important;
        color: #1f2937 !important;
        line-height: 1.5 !important;
      }
      .pdf-header {
        border-bottom: 2px solid #7c3aed !important;
        padding-bottom: 16px !important;
        margin-bottom: 24px !important;
      }
      .pdf-header-title {
        font-size: 24px !important;
        font-weight: 800 !important;
        color: #111827 !important;
        margin: 0 0 6px 0 !important;
        letter-spacing: -0.02em !important;
      }
      .pdf-header-sub {
        font-size: 12px !important;
        color: #6b7280 !important;
        margin: 0 !important;
        font-weight: 500 !important;
      }
      .pdf-meta-section {
        margin-bottom: 24px !important;
        border: 1px solid #e5e7eb !important;
        border-radius: 10px !important;
        padding: 16px !important;
        background: #f9fafb !important;
        page-break-inside: avoid !important;
      }
      .pdf-meta-title {
        font-size: 10px !important;
        font-weight: 700 !important;
        text-transform: uppercase !important;
        letter-spacing: 0.08em !important;
        color: #6b7280 !important;
        margin: 0 0 10px 0 !important;
      }
      .pdf-meta-grid {
        display: grid !important;
        grid-template-columns: 1fr 1fr !important;
        gap: 16px !important;
      }
      .pdf-meta-block {
        font-size: 11px !important;
        color: #4b5563 !important;
      }
      .pdf-meta-label {
        font-weight: 700 !important;
        color: #111827 !important;
        margin-bottom: 4px !important;
        font-size: 11.5px !important;
      }
      .pdf-meta-value {
        white-space: pre-line !important;
        line-height: 1.5 !important;
        color: #4b5563 !important;
      }
      .pdf-overview {
        display: grid !important;
        grid-template-columns: 1fr 1.5fr !important;
        gap: 20px !important;
        margin-bottom: 24px !important;
        page-break-inside: avoid !important;
      }
      .pdf-card {
        border: 1px solid #e5e7eb !important;
        border-radius: 10px !important;
        padding: 16px !important;
        background: #f9fafb !important;
      }
      .pdf-card-title {
        font-size: 10px !important;
        font-weight: 700 !important;
        text-transform: uppercase !important;
        letter-spacing: 0.08em !important;
        color: #6b7280 !important;
        margin: 0 0 12px 0 !important;
      }
      .pdf-score-container {
        display: flex !important;
        flex-direction: column !important;
        align-items: center !important;
        justify-content: center !important;
      }
      .pdf-score-circle {
        width: 100px !important;
        height: 100px !important;
        border-radius: 50% !important;
        border: 6px solid #7c3aed !important;
        display: flex !important;
        flex-direction: column !important;
        align-items: center !important;
        justify-content: center !important;
        margin-bottom: 10px !important;
        background: #ffffff !important;
      }
      .pdf-score-val {
        font-size: 28px !important;
        font-weight: 800 !important;
        color: #7c3aed !important;
        line-height: 1 !important;
      }
      .pdf-score-total {
        font-size: 10px !important;
        color: #9ca3af !important;
      }
      .pdf-score-tag {
        font-size: 10px !important;
        font-weight: 700 !important;
        text-transform: uppercase !important;
        color: #7c3aed !important;
        background: rgba(124, 58, 237, 0.08) !important;
        border: 1px solid rgba(124, 58, 237, 0.18) !important;
        padding: 2px 10px !important;
        border-radius: 99px !important;
      }
      .pdf-gaps {
        display: flex !important;
        flex-direction: column !important;
        gap: 6px !important;
      }
      .pdf-gap-item {
        display: flex !important;
        justify-content: space-between !important;
        align-items: center !important;
        padding: 8px 10px !important;
        border-radius: 6px !important;
        border: 1px solid #e5e7eb !important;
        background: #ffffff !important;
      }
      .pdf-gap-name {
        font-size: 12px !important;
        font-weight: 600 !important;
        color: #374151 !important;
      }
      .pdf-gap-badge {
        font-size: 9px !important;
        font-weight: 700 !important;
        padding: 1px 6px !important;
        border-radius: 99px !important;
        border-width: 1px !important;
        border-style: solid !important;
      }
      .pdf-section {
        margin-bottom: 30px !important;
        page-break-before: always !important;
      }
      .pdf-section-title {
        font-size: 16px !important;
        font-weight: 700 !important;
        color: #111827 !important;
        border-bottom: 1px solid #e5e7eb !important;
        padding-bottom: 6px !important;
        margin-bottom: 16px !important;
      }
      .pdf-q-list {
        display: flex !important;
        flex-direction: column !important;
        gap: 12px !important;
      }
      .pdf-q-item {
        border: 1px solid #e5e7eb !important;
        border-radius: 8px !important;
        padding: 14px !important;
        background: #ffffff !important;
        page-break-inside: avoid !important;
      }
      .pdf-q-header {
        font-size: 13px !important;
        font-weight: 700 !important;
        color: #111827 !important;
        margin: 0 0 10px 0 !important;
        display: flex !important;
        gap: 6px !important;
      }
      .pdf-q-num {
        color: #7c3aed !important;
      }
      .pdf-q-block {
        padding: 10px 12px !important;
        border-radius: 6px !important;
        margin-bottom: 6px !important;
        font-size: 12px !important;
      }
      .pdf-q-block:last-child {
        margin-bottom: 0 !important;
      }
      .pdf-q-block--intention {
        background: #fffbeb !important;
        border: 1px solid #fef3c7 !important;
      }
      .pdf-q-block--answer {
        background: #f0fdf4 !important;
        border: 1px solid #dcfce7 !important;
      }
      .pdf-q-label {
        font-size: 8.5px !important;
        font-weight: 700 !important;
        text-transform: uppercase !important;
        letter-spacing: 0.05em !important;
        color: #b45309 !important;
        margin: 0 0 3px 0 !important;
      }
      .pdf-q-block--answer .pdf-q-label {
        color: #047857 !important;
      }
      .pdf-q-text {
        margin: 0 !important;
        color: #4b5563 !important;
      }
      .pdf-plan {
        display: flex !important;
        flex-direction: column !important;
        gap: 12px !important;
      }
      .pdf-plan-day {
        display: flex !important;
        gap: 12px !important;
        page-break-inside: avoid !important;
        border-bottom: 1px dashed #e5e7eb !important;
        padding-bottom: 12px !important;
      }
      .pdf-plan-day:last-child {
        border-bottom: none !important;
        padding-bottom: 0 !important;
      }
      .pdf-plan-left {
        display: flex !important;
        flex-direction: column !important;
        align-items: center !important;
      }
      .pdf-plan-badge {
        width: 38px !important;
        height: 38px !important;
        border-radius: 6px !important;
        background: #f5f3ff !important;
        border: 1px solid #ddd6fe !important;
        display: flex !important;
        flex-direction: column !important;
        align-items: center !important;
        justify-content: center !important;
        gap: 1px !important;
      }
      .pdf-plan-day-label {
        font-size: 7px !important;
        font-weight: 700 !important;
        text-transform: uppercase !important;
        color: #7c3aed !important;
        opacity: 0.8 !important;
      }
      .pdf-plan-day-num {
        font-size: 14px !important;
        font-weight: 800 !important;
        color: #7c3aed !important;
        line-height: 1 !important;
      }
      .pdf-plan-content {
        flex: 1 !important;
        padding-top: 1px !important;
      }
      .pdf-plan-focus {
        font-size: 13px !important;
        font-weight: 700 !important;
        color: #111827 !important;
        margin: 0 0 4px 0 !important;
      }
      .pdf-plan-tasks {
        margin: 0 !important;
        padding-left: 16px !important;
        font-size: 12px !important;
        color: #4b5563 !important;
      }
      .pdf-plan-tasks li {
        margin-bottom: 3px !important;
      }
    </style>
  `;

  // Extract variables
  const matchScore = report.matchScore ?? 0;
  const scoreTagLabel = matchScore >= 80 ? "Strong Match" : matchScore >= 60 ? "Good Match" : "Needs Work";
  const reportTitle = report.title ?? "Interview Preparation Report";

  // Safely format input details (Job description and self description)
  const truncateText = (text, maxLength = 350) => {
    if (!text) return "Not provided";
    const trimmed = text.trim();
    if (trimmed.length <= maxLength) return trimmed;
    return trimmed.substring(0, maxLength) + "... [truncated]";
  };

  const jobDescText = truncateText(report.jobDescription, 450);
  const selfDescText = truncateText(report.selfDescription, 450);

  // Build Skill Gaps HTML
  let skillGapsHTML = "";
  if (report.skillGaps && report.skillGaps.length > 0) {
    skillGapsHTML = report.skillGaps.map(gap => {
      const severity = gap.severity ? gap.severity.toLowerCase() : "low";
      const config = severityColors[severity] ?? severityColors.low;
      return `
        <div class="pdf-gap-item">
          <span class="pdf-gap-name">${gap.skill}</span>
          <span class="pdf-gap-badge" style="color: ${config.color} !important; background: ${config.bg} !important; border: 1px solid ${config.border} !important;">${config.label}</span>
        </div>
      `;
    }).join("");
  } else {
    skillGapsHTML = `<p style="font-size: 12px !important; color: #6b7280 !important; margin: 0 !important;">No significant skill gaps identified.</p>`;
  }

  // Build Technical Questions HTML
  let technicalQuestionsHTML = "";
  if (report.technicalQuestions && report.technicalQuestions.length > 0) {
    technicalQuestionsHTML = report.technicalQuestions.map((q, i) => `
      <div class="pdf-q-item">
        <h4 class="pdf-q-header">
          <span class="pdf-q-num">Q${i + 1}.</span>
          <span>${q.question}</span>
        </h4>
        <div class="pdf-q-block pdf-q-block--intention">
          <h5 class="pdf-q-label">Interviewer Intention</h5>
          <p class="pdf-q-text">${q.intention}</p>
        </div>
        <div class="pdf-q-block pdf-q-block--answer">
          <h5 class="pdf-q-label">Recommended Response</h5>
          <p class="pdf-q-text">${q.answer}</p>
        </div>
      </div>
    `).join("");
  } else {
    technicalQuestionsHTML = `<p style="font-size: 12px !important; color: #6b7280 !important; margin: 0 !important;">No technical questions found.</p>`;
  }

  // Build Behavioral Questions HTML
  let behavioralQuestionsHTML = "";
  if (report.behavioralQuestions && report.behavioralQuestions.length > 0) {
    behavioralQuestionsHTML = report.behavioralQuestions.map((q, i) => `
      <div class="pdf-q-item">
        <h4 class="pdf-q-header">
          <span class="pdf-q-num">Q${i + 1}.</span>
          <span>${q.question}</span>
        </h4>
        <div class="pdf-q-block pdf-q-block--intention">
          <h5 class="pdf-q-label">Interviewer Intention</h5>
          <p class="pdf-q-text">${q.intention}</p>
        </div>
        <div class="pdf-q-block pdf-q-block--answer">
          <h5 class="pdf-q-label">Recommended Response</h5>
          <p class="pdf-q-text">${q.answer}</p>
        </div>
      </div>
    `).join("");
  } else {
    behavioralQuestionsHTML = `<p style="font-size: 12px !important; color: #6b7280 !important; margin: 0 !important;">No behavioral questions found.</p>`;
  }

  // Build Prep Plan HTML
  let prepPlanHTML = "";
  if (report.preparationPlan && report.preparationPlan.length > 0) {
    prepPlanHTML = report.preparationPlan.map(day => `
      <div class="pdf-plan-day">
        <div class="pdf-plan-left">
          <div class="pdf-plan-badge">
            <span class="pdf-plan-day-label">Day</span>
            <span class="pdf-plan-day-num">${day.day}</span>
          </div>
        </div>
        <div class="pdf-plan-content">
          <h4 class="pdf-plan-focus">${day.focus}</h4>
          <ul class="pdf-plan-tasks">
            ${(day.tasks ?? []).map(task => `<li>${task}</li>`).join("")}
          </ul>
        </div>
      </div>
    `).join("");
  } else {
    prepPlanHTML = `<p style="font-size: 12px !important; color: #6b7280 !important; margin: 0 !important;">No preparation roadmap found.</p>`;
  }

  // Inject report structure into target container
  const htmlContent = `
    ${styles}
    <div class="pdf-report" style="width: 750px; background: #ffffff; color: #1f2937;">
      <!-- Document Header -->
      <header class="pdf-header">
        <h1 class="pdf-header-title">${reportTitle}</h1>
        <p class="pdf-header-sub">AI-Generated Assessment Report • Powered by Google Gemini</p>
      </header>

      <!-- Source Context Summary Card -->
      <section class="pdf-meta-section">
        <h3 class="pdf-meta-title">Assessment Context</h3>
        <div class="pdf-meta-grid">
          <div class="pdf-meta-block">
            <div class="pdf-meta-label">Job Description / Requirements</div>
            <div class="pdf-meta-value">${jobDescText}</div>
          </div>
          <div class="pdf-meta-block">
            <div class="pdf-meta-label">Candidate Self Description</div>
            <div class="pdf-meta-value">${selfDescText}</div>
          </div>
        </div>
      </section>

      <!-- Overview Grid -->
      <section class="pdf-overview">
        <!-- Score Card -->
        <div class="pdf-card pdf-score-container">
          <h3 class="pdf-card-title">Match Score</h3>
          <div class="pdf-score-circle">
            <span class="pdf-score-val">${matchScore}</span>
            <span class="pdf-score-total">/100</span>
          </div>
          <span class="pdf-score-tag">${scoreTagLabel}</span>
        </div>

        <!-- Skill Gaps Card -->
        <div class="pdf-card">
          <h3 class="pdf-card-title">Identified Skill Gaps</h3>
          <div class="pdf-gaps">
            ${skillGapsHTML}
          </div>
        </div>
      </section>

      <!-- Technical Questions Section -->
      <section class="pdf-section">
        <h2 class="pdf-section-title">Technical Interview Questions</h2>
        <div class="pdf-q-list">
          ${technicalQuestionsHTML}
        </div>
      </section>

      <!-- Behavioral Questions Section -->
      <section class="pdf-section">
        <h2 class="pdf-section-title">Behavioral Interview Questions</h2>
        <div class="pdf-q-list">
          ${behavioralQuestionsHTML}
        </div>
      </section>

      <!-- Prep Plan Roadmap Section -->
      <section class="pdf-section">
        <h2 class="pdf-section-title">Step-by-Step Preparation Roadmap</h2>
        <div class="pdf-plan">
          ${prepPlanHTML}
        </div>
      </section>
    </div>
  `;

  // Configure A4 settings
  const sanitizedTitle = reportTitle.toLowerCase().replace(/[^a-z0-9]+/g, "_").slice(0, 40);
  const options = {
    margin: [15, 15, 15, 15], // [top, left, bottom, right] in mm
    filename: `interview_prep_${sanitizedTitle}.pdf`,
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { 
      scale: 2, 
      useCORS: true,
      logging: false,
      letterRendering: true,
      windowWidth: 750
    },
    jsPDF: { 
      unit: "mm", 
      format: "a4", 
      orientation: "portrait" 
    },
    pagebreak: { 
      mode: ["css", "legacy"] 
    }
  };

  // Run html2pdf using HTML string directly
  return html2pdf().set(options).from(htmlContent).save();
};

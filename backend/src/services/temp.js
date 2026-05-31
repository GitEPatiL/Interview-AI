
const resume = `
Pratik Patil
Pune, Maharashtra, India
pratikpatil@example.com | +91 98765 43210
GitHub: github.com/GitEPatiL | Portfolio: pratikpatil.dev

EDUCATION
---------
Bachelor of Engineering – Computer Engineering
Pune Institute of Computer Technology, Savitribai Phule Pune University
CGPA: 8.4 | Graduated: 2025

EXPERIENCE
----------
Full Stack Developer Intern — TechNova Solutions Pvt. Ltd. (Remote, Pune)
January 2025 – April 2025 (4 months)
- Built RESTful APIs using Node.js and Express for a multi-tenant SaaS dashboard
- Developed reusable React components using hooks and Context API
- Integrated JWT-based authentication with token blacklist pattern for secure logout
- Wrote MongoDB aggregation pipelines to generate role-based analytics reports
- Reduced average API response time by 35% through query optimisation and indexing

PROJECTS
--------
1. Interview Master (MERN Stack)
   - AI-powered mock interview platform with protected routes, JWT cookie auth, and structured AI feedback
   - Tech: React 19, Vite, Node.js, Express 5, MongoDB, Mongoose, JWT, SCSS
   - GitHub: github.com/GitEPatiL/Interview-Master

2. ChatterBox (Real-time Chat App)
   - Real-time group chat with typing indicators, read receipts, and online presence
   - Tech: React, Socket.io, Node.js, Express, Redis, MongoDB
   - Sub-100ms message delivery using Socket.io rooms and Redis TTL-based presence system

3. DevBlog CMS (Content Management System)
   - Markdown-based blogging platform with role-based access (Admin / Author / Reader)
   - Tech: Next.js 14, PostgreSQL, Prisma, NextAuth, TailwindCSS
   - Server-side rendering for SEO; rich text editor with Cloudinary image uploads

SKILLS
------
Languages     : JavaScript (ES2024), TypeScript (basics), HTML5, CSS3, SQL
Frontend      : React, Next.js, Vite, React Router, Redux Toolkit, SCSS/Sass
Backend       : Node.js, Express.js, REST APIs, Socket.io
Databases     : MongoDB, Mongoose, PostgreSQL, Prisma, Redis
DevOps/Tools  : Git, GitHub Actions, Docker (basics), Vercel, Render, Postman

CERTIFICATIONS
--------------
- MongoDB Node.js Developer Path — MongoDB University (2024)
- JavaScript Algorithms and Data Structures — freeCodeCamp (2023)
`;

const selfDescription = `
I am Pratik Patil, a final-year Computer Engineering graduate from PICT Pune with a CGPA of 8.4.
I have hands-on experience building full-stack web applications using the MERN stack.

During my internship at TechNova Solutions, I worked on a production-grade multi-tenant SaaS dashboard
where I independently owned the backend API development and contributed to the React frontend.
I improved API performance by 35% through MongoDB indexing and query optimisation, which taught me
the importance of writing efficient, scalable code and not just code that works.

I enjoy building projects that solve real problems — Interview Master started because I struggled
to find a personalised, AI-driven mock interview tool, so I decided to build one myself. That project
taught me a lot about authentication security (JWT blacklisting, httpOnly cookies), React state
management with Context API, and clean feature-based project architecture.

I am a self-driven learner who picks up new technologies quickly. I am currently exploring AI/LLM
integration using the Gemini API and learning TypeScript more deeply. I am looking for a junior
Full Stack Developer role where I can contribute meaningfully from day one while continuing to grow
under experienced engineers.

Outside of coding, I enjoy competitive programming on LeetCode (100+ problems solved) and writing
technical notes that help me retain what I learn.
`;

const jobDescription = `
Position     : Junior Full Stack Developer (MERN)
Company      : PixelForge Technologies Pvt. Ltd.
Location     : Pune, Maharashtra (Hybrid — 3 days onsite)
Experience   : 0-2 years
CTC          : 5-8 LPA

About the Company:
PixelForge Technologies is a fast-growing product startup building a B2B SaaS platform for
HR teams to automate employee onboarding, performance reviews, and learning management.
We serve 200+ companies across India and are expanding to SEA markets.

Role Overview:
We are looking for a passionate and self-motivated Junior Full Stack Developer to join our
core product team. You will work closely with senior engineers to build new features,
fix bugs, and improve the performance and reliability of our platform.

Responsibilities:
- Develop and maintain RESTful APIs using Node.js and Express
- Build responsive and accessible UI components in React
- Write MongoDB queries and design Mongoose schemas for new features
- Collaborate with the design team to implement pixel-perfect UIs from Figma designs
- Participate in code reviews and maintain code quality standards
- Write unit and integration tests for your code (Jest / React Testing Library)
- Debug production issues and contribute to incident post-mortems
- Work in 2-week agile sprints with daily standups

Required Skills:
- Strong fundamentals in JavaScript (ES6+)
- Hands-on experience with React (hooks, Context API or Redux)
- Backend development with Node.js and Express.js
- Database design and querying with MongoDB / Mongoose
- Understanding of REST API design principles
- Experience with Git and GitHub workflows (PRs, code reviews)
- Basic understanding of authentication (JWT, sessions, OAuth)

Good to Have:
- TypeScript experience
- Knowledge of Redis for caching or session management
- Familiarity with Docker or any CI/CD pipeline
- Experience with Socket.io or real-time features
- Exposure to Next.js or SSR frameworks
`;



module.exports = {resume,selfDescription,jobDescription}

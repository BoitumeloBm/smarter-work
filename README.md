# 🤖 AI Workplace Productivity Assistant

Build a fully functional, modern web application called **'AI Workplace Productivity Assistant'** – a single integrated platform that helps professionals 
automate workplace tasks using AI. This is **ONE integrated project** containing multiple features within a single dashboard, not separate projects.

---

## ✨ Features

The application includes the following **3 features**, all accessible from a sidebar navigation:

---

### FEATURE 1: SMART EMAIL GENERATOR ✉️

- Users can describe what the email should be about using a text input field
- A dropdown selector for tone: **Formal, Friendly, Persuasive**
- A **'Generate Email'** button that produces a professional email
- The generated email must be **editable inline** (click to edit)
- A **'Copy to Clipboard'** button
- A **'Regenerate'** button for new versions
- Placeholder example text in the input: *"Request a project update from a client"*

---

### FEATURE 2: MEETING NOTES SUMMARIZER 📝

- A large text area where users paste meeting notes or transcripts (minimum 6 rows)
- A **'Summarize'** button
- Structured output displayed in clear sections:
  - **Summary:** 3-4 sentence paragraph
  - **Action Items:** Bulleted list
  - **Decisions Made:** Bulleted list
  - **Deadlines:** Bulleted list with dates
- All output text must be **editable inline** (click to edit)
- A **'Copy All'** button
- A **'Regenerate'** button
- Placeholder example text in the text area: *"Team discussed Q4 marketing strategy. John presented the budget. We decided to launch in October.
- Sarah needs to finalize the design by Friday."*

---

### FEATURE 3: AI TASK PLANNER 📋

- A text input where users describe their tasks or goals
- A dropdown selector for schedule type: **Daily or Weekly**
- A **'Generate Schedule'** button
- Structured output displayed in clear sections:
  - **Prioritized Task List:** Tasks color-coded by priority (High 🔴, Medium 🟡, Low 🟢)
  - **Suggested Schedule:** Time-blocked for Daily, or day-by-day breakdown for Weekly
- All output text must be **editable inline** (click to edit)
- A **'Regenerate'** button
- A **'Download as PDF'** button
- Placeholder example text: *"Finish project report, prepare presentation, respond to client emails, schedule team meeting"*

---

## 🎨 Design Requirements

### Layout
- Sidebar navigation on the left side (fixed position, 240px width on desktop)
- Content area on the right with proper padding
- Dashboard landing page with feature cards and welcome section

### Navigation
- Sidebar items: **Dashboard, Smart Email Generator, Meeting Summarizer, AI Task Planner**
- Active page highlighted in the sidebar
- On mobile: Sidebar collapses to a hamburger menu overlay

### Responsive Design
- Fully responsive – works on desktop, tablet, and mobile
- **Desktop:** Full sidebar visible, content beside it
- **Tablet:** Sidebar collapsed with icons only, content fills the rest
- **Mobile:** Hamburger menu, full-width content, stacked cards

---

## 🖌️ UI Specifications

### Style
- Modern, clean, professional SaaS-style design (similar to Notion, Linear, or Asana)
- Card-based layout for each feature
- Smooth transitions and hover effects on interactive elements
- Loading spinners or shimmer effects while AI generates responses
- All AI-generated outputs must be **editable inline** (click to edit)

### Color Palette

| Color | Hex Code | Usage |
|-------|----------|-------|
| Navy Blue | `#1E3A5F` | Primary brand color |
| Bright Blue | `#2563EB` | Buttons and interactive elements |
| Sky Blue | `#0EA5E9` | Accent highlights |
| Light Gray | `#F8FAFC` | Background |
| White | `#FFFFFF` | Cards and containers |
| Dark Slate | `#1E293B` | Primary text |
| Slate Gray | `#64748B` | Muted text |

### Buttons
- Rounded corners (8px), padding: 10px 24px
- Primary button color: `#2563EB` with hover effect
- Secondary button style for actions like Copy, Regenerate

### Input Fields
- Rounded borders, light gray border (`#E2E8F0`)
- Focus state with blue outline (`#2563EB`)
- Clear labels and placeholder text

### Typography
- Clean sans-serif font (Inter or system fonts)
- Clear hierarchy with proper headings and subheadings

### Spacing
- Generous padding (24-32px) between sections
- Consistent spacing throughout the application

---

## ⚠️ Responsible AI Disclaimer

A visible disclaimer at the bottom of every feature page:

> *"⚠️ AI-generated content may contain errors. Please verify important information before use."*

---

## 🛠️ Tools Used

| Tool | Purpose |
|------|---------|
| **Lovable AI** | AI-assisted application development and deployment |
| **GitHub** | Version control and code hosting |
| **ChatGPT** | AI response generation and prompt engineering |
| **HTML/CSS/JavaScript** | Frontend development |
| **Responsive Design** | Mobile, tablet, and desktop compatibility |

---

## 🌐 Live Demo

| Link | URL |
|------|-----|
| **Live Application** | [https://smarter-work.lovable.app/task-planner](https://smarter-work.lovable.app/task-planner) |
| **GitHub Repository** | [https://github.com/BoitumeloBm/smarter-work](https://github.com/BoitumeloBm/smarter-work) |
| **Presentation** | [https://github.com/BoitumeloBm/smarter-work](https://github.com/BoitumeloBm/smarter-work)

## 🚀 Getting Started

### To Run the App
1. Open the live link above
2. Use the sidebar to navigate
3. Choose a feature
4. Enter your input
5. Click **Generate / Summarize / Plan**
6. Edit or copy the output as needed

### To Run Locally (Optional)
```bash
git clone https://github.com/yourusername/AI-Productivity-Assistant.git
cd AI-Productivity-Assistant
npm install
npm start

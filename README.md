# AI Workplace Companion

Build a fully functional, modern web application called 'AI Workplace Productivity Assistant' – a single integrated platform that helps professionals automate workplace tasks using AI. This is ONE integrated project containing multiple features within a single dashboard, not separate projects.

The application must include the following 3 features, all accessible from a sidebar navigation:

FEATURE 1: SMART EMAIL GENERATOR

- Users can describe what the email should be about using a text input field

- A dropdown selector for tone: Formal, Friendly, Persuasive

- A 'Generate Email' button that produces a professional email

- The generated email must be editable inline (click to edit)

- A 'Copy to Clipboard' button

- A 'Regenerate' button for new versions

- Placeholder example text in the input: "Request a project update from a client"

FEATURE 2: MEETING NOTES SUMMARIZER

- A large text area where users paste meeting notes or transcripts (minimum 6 rows)

- A 'Summarize' button

- Structured output displayed in clear sections:

  - Summary: 3-4 sentence paragraph

  - Action Items: Bulleted list

  - Decisions Made: Bulleted list

  - Deadlines: Bulleted list with dates

- All output text must be editable inline (click to edit)

- A 'Copy All' button

- A 'Regenerate' button

- Placeholder example text in the text area: "Team discussed Q4 marketing strategy. John presented the budget. We decided to launch in October. Sarah needs to finalize the design by Friday. Action items: John to update budget, Sarah to finalize design, Mike to prepare social media plan."

FEATURE 3: AI TASK PLANNER

- A text input where users describe their tasks or goals

- A dropdown selector for schedule type: Daily or Weekly

- A 'Generate Schedule' button

- Structured output displayed in clear sections:

  - Prioritized Task List: Tasks color-coded by priority (High 🔴, Medium 🟡, Low 🟢)

  - Suggested Schedule: Time-blocked for Daily, or day-by-day breakdown for Weekly

- All output text must be editable inline (click to edit)

- A 'Regenerate' button

- A 'Download as PDF' button

- Placeholder example text: "Finish project report, prepare presentation, respond to client emails, schedule team meeting"

The application must meet the following design requirements:

LAYOUT:

- Sidebar navigation on the left side (fixed position, 240px width on desktop)

- Content area on the right with proper padding

- Dashboard landing page with feature cards and welcome section

NAVIGATION:

- Sidebar items: Dashboard, Smart Email Generator, Meeting Summarizer, AI Task Planner

- Active page highlighted in the sidebar

- On mobile: Sidebar collapses to a hamburger menu overlay

RESPONSIVE DESIGN:

- Fully responsive – works seamlessly on desktop, tablet, and mobile

- Desktop: Full sidebar visible, content beside it

- Tablet: Sidebar collapsed with icons only, content fills the rest

- Mobile: Hamburger menu, full-width content, stacked cards

USER INTERFACE (UI):

- Modern, clean, professional SaaS-style design (similar to Notion, Linear, or Asana)

- Card-based layout for each feature

- Smooth transitions and hover effects on interactive elements

- Loading spinners or shimmer effects while AI generates responses

- All AI-generated outputs must be editable inline (users can click and edit text directly)

COLOR PALETTE:

- Primary: #1E3A5F (Navy Blue)

- Secondary: #2563EB (Bright Blue)

- Accent: #0EA5E9 (Sky Blue)

- Background: #F8FAFC (Light Gray)

- Cards: #FFFFFF (White) with subtle shadows

- Text: #1E293B (Dark Slate)

- Muted Text: #64748B (Slate Gray)

TYPOGRAPHY:

- Clean sans-serif font (Inter or system fonts)

- Clear hierarchy with proper headings and subheadings

BUTTONS:

- Rounded corners (8px), padding: 10px 24px

- Primary button color: #2563EB with hover effect

- Secondary button style for actions like Copy, Regenerate

INPUT FIELDS:

- Rounded borders, light gray border (#E2E8F0)

- Focus state with blue outline (#2563EB)

- Clear labels and placeholder text

SPACING:

- Generous padding (24-32px) between sections

- Consistent spacing throughout the application

RESPONSIBLE AI DISCLAIMER:

- A visible disclaimer at the bottom of every feature page: "⚠️ AI-generated content may contain errors. Please verify important information before use."

Start by building the main layout and sidebar first, then add the Dashboard page, then build each feature page one by one (Email Generator, Meeting Summarizer, Task Planner). Ensure all features are functional, fully responsive, and match the design specifications above.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://smarter-work.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/c0bf18f5-42ee-468b-af61-6f1c711f09e9).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

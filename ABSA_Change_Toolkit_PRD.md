# PRD: ABSA Workday Adoption — Change Engagement Toolkit
**Version:** 1.0  
**Status:** Ready for Development  
**Prepared for:** Claude Code  
**Context:** ABSA Bank — Workday + AI Assistant Adoption Program  

---

## 1. Executive Summary

### What We Are Building

A **web-based, interactive Change Engagement Toolkit** that operationalises a structured change management methodology for the ABSA Workday adoption program. The toolkit replaces static PowerPoint decks with a living, shareable, role-based digital tool that change leads, HR business partners, project managers, and executive sponsors can access and use collaboratively across the 40,000-employee rollout.

### Why This Exists

Change management programs at scale fail not because the methodology is wrong but because the tools are inaccessible. PowerPoints sit on SharePoint. Checklists live in email. Stakeholder maps are owned by one person. Progress is invisible.

This toolkit makes the entire change engagement model **navigable, executable, and measurable** — accessible from any browser, shareable via link, and designed to guide practitioners through each phase of the program without requiring change management expertise.

### Core Design Principle

> **"A guide that does the thinking with you, not for you."**  
> Every section prompts, scaffolds, and tracks — it never just presents.

---

## 2. Problem Statement

### Current State Pain Points

1. **Static methodology** — The Change Engagement Model exists as a 30+ slide PowerPoint. It cannot be acted upon, only referenced.
2. **No progress tracking** — There is no way to know which teams have completed which activities, or which phase of the program is on track vs. at risk.
3. **Not role-differentiated** — The same deck is shown to the CHRO, a change lead in retail banking, and a frontline HR BP. None of them see what is relevant to their role.
4. **No collaboration layer** — Stakeholder maps, readiness assessments, and communication plans are built in individual Excel/PPT files with no central visibility.
5. **Not mobile or link-shareable** — Cannot be pushed to someone via Teams chat and immediately usable.

### Target Users

| User Type | Primary Need | Frequency of Use |
|---|---|---|
| **Change Lead / Program Manager** | Navigate phases, track workstream completion, manage stakeholder plans | Daily |
| **HR Business Partner** | Access tools for their business unit, complete readiness assessments | Weekly |
| **Executive Sponsor / CHRO** | See program health dashboard, approve key milestones | Monthly |
| **Champion Network Member** | Access comms templates, log feedback, understand their role | Weekly |
| **Project Manager** | Export status reports, view timeline against activities | Weekly |

---

## 3. Product Overview

### Application Type
Single-page web application (React). No login required in MVP — access via link. Sessions persist via localStorage. Designed to run in a browser on desktop and mobile.

### High-Level Structure

The toolkit is organised around the **8-phase Change Engagement Wheel** sourced from the uploaded Change Engagement Model:

```
Phase 1 → Vision & Benefit Case
Phase 2 → Stakeholder Planning
Phase 3 → Change Load
Phase 4 → Blueprint & Business Impact
Phase 5 → Mobilise Organisation
Phase 6 → UAT & Training Support
Phase 7 → Go-Live & Hyper Care
Phase 8 → Handover & Tracking
```

Each phase contains:
- An **Introduction** (brief, objectives, tips & tricks, stakeholders to engage)
- **Interactive Steps** with guided worksheets
- **Checklists** with RAG (Red/Amber/Green) status
- **Downloadable / copyable templates**
- **A completion gate** before the next phase unlocks

### Navigation Model

```
Dashboard (Program Health View)
└── Phase Navigator (the Change Wheel, interactive)
    └── Phase Detail Page
        ├── Introduction Tab
        ├── Steps & Tools Tab
        └── Checklist Tab
```

---

## 4. Detailed Feature Specifications

---

### 4.1 Dashboard — Program Health View

**Purpose:** Give any user an instant read on where the program is across all 8 phases and all active sprints.

**Components:**

**Sprint Selector**  
A top-level toggle allowing the user to switch between:
- Phase 0 — Diagnostic
- Sprint 1 — Strategy & Pilot
- Sprint 2 — Wave 1 Rollout
- Sprint 3 — Full Rollout

**Program Health Scorecard**  
A horizontal row of 8 phase tiles, each showing:
- Phase name and number
- RAG status (Red / Amber / Green), derived from checklist completion
- Completion percentage (e.g. "6/9 checklist items complete")
- Owner name (editable text field)
- Days since last update

**Activity Feed**  
A right-panel feed showing the last 10 actions taken across all phases (e.g. "Stakeholder Map updated — Phase 2 — 2 hours ago"). Read-only in MVP.

**Key Milestone Flags**  
A timeline strip showing:
- Current sprint day (e.g. "Day 34 of 90")
- Next milestone (e.g. "Pilot Launch — Day 60")
- Overdue items flagged in red

**Quick Actions Bar**  
Buttons for:
- "Continue where I left off" → takes user to the lowest-completion phase
- "Export status report" → generates a markdown/text summary of all RAG statuses
- "View program timeline" → scrolls to or opens a Gantt-style view

---

### 4.2 Change Wheel Navigator

**Purpose:** The primary navigation element. A visual, interactive representation of the 8-phase change cycle.

**Design Spec:**
- Rendered as an octagonal wheel (SVG or CSS-based), with each segment representing one phase
- Each segment is colour-coded by RAG status
- Clicking a segment navigates to that phase's detail page
- The current sprint's active phases are visually highlighted; future phases are dimmed but accessible (not locked in MVP)
- Hovering a segment shows a tooltip: phase name, RAG status, completion %, owner

**Accessibility:**  
The wheel must also have a linear list view (toggle button) for users on mobile or who prefer a list. Both views navigate to the same phase detail.

---

### 4.3 Phase Detail Pages

Each of the 8 phases has its own detail page with three tabs:

---

#### Tab 1: Introduction

**Sections (all collapsible):**

1. **Brief** — 2–4 sentence summary of what this phase is about and why it matters. Pre-populated from the Change Engagement Model content. Editable by the Change Lead.

2. **Objectives** — A bulleted list of what must be achieved by the end of this phase. Pre-populated. Read-only in MVP.

3. **Tips & Tricks** — Practitioner guidance from the methodology. Pre-populated. Formatted as a card list with a lightbulb icon.

4. **Stakeholders to Engage** — A pre-populated list of stakeholder types (e.g. CHRO, HR BPs, Transformation Office) with their role in this phase. Each has a status chip (Engaged / Not Yet Engaged) that the Change Lead can toggle.

5. **Phase Checklist Preview** — A collapsed preview of the checklist for this phase, showing overall completion %. Clicking expands to the Checklist tab.

---

#### Tab 2: Steps & Tools

**Purpose:** Walk the practitioner through the numbered activities for this phase, with embedded worksheets and templates.

**Design pattern per step:**

Each step is a collapsible card with:
- **Step number and title** (e.g. "Step 1 — Build Vision for Change")
- **Brief description** (1–2 sentences)
- **Instructions** — numbered sub-steps, pre-populated from methodology
- **Embedded worksheet** (where applicable — see below)
- **Template section** — copyable text blocks or downloadable file references
- **Status selector** — Not Started / In Progress / Complete (updates checklist)
- **Notes field** — free text, persists in localStorage

**Embedded Worksheets by Phase:**

The following phases have interactive worksheet components. These are the highest-value interactive elements:

---

**Phase 2 — Stakeholder Planner (Step 2.1)**

A mini-application within the step:

*Stakeholder Repository Table*
- Columns: Name/Group | Classification | Region | # of People | Influence (1–5 slider) | Reaction to Change (−2 to +2 slider) | Current State | Desired State | Owner | Status (RAG chip)
- Add/remove rows
- Inline editing for all fields
- Rows sortable by Influence score

*Stakeholder Map (Visual)*
- A 2x2 quadrant chart, axes: Influence (Y) vs. Reaction to Change (X)
- Stakeholders from the repository auto-plotted as labelled dots
- Quadrant labels: "Manage Closely" (high influence, negative) / "Involve Extensively" (high influence, positive) / "Keep Satisfied" (low influence, negative) / "Monitor" (low influence, positive)
- Dots are colour-coded by RAG status
- Hovering a dot shows the stakeholder card
- Chart is exportable as PNG

*Engagement & Communication Plan Table (Step 2.3)*
- Columns: # | Title | Purpose | Timing | Target Group | Key Message | Channel | Owner | Status
- Pre-populated with one example row
- Add/remove rows, inline editing
- Channel options (dropdown): Email | Teams Message | Town Hall | Workshop | One-to-One | Intranet Post | Video | Briefing Pack
- Export as CSV

---

**Phase 4 — Business Impact Matrix (Step 4.2)**

*Impact Matrix Table*
- Columns: Business Unit | Change Type (Process / Organisation / IT / Culture / Customer) | Impact Description | Scale (Low/Medium/High) | Timing | Owner | RAG
- Pre-populated with ABSA-specific change types (Workday, AI Assistant, Platform Consolidation)
- Rows filterable by Change Type and Business Unit
- Summary row auto-calculates overall impact level

---

**Phase 5 — Go-Live Readiness Assessment (Step 5.1)**

A RAG checklist structured around three readiness domains:

*Business Operational Readiness:*
- [ ] Roles & responsibilities defined and communicated
- [ ] Process changes documented and signed off
- [ ] Business Impact Overview validated with BU leads
- [ ] Benefit owners confirmed

*Employee Readiness:*
- [ ] Training completed for target cohort (% field)
- [ ] Champion network activated
- [ ] Communication plan executed for this wave
- [ ] Feedback channels established

*Technology Readiness:*
- [ ] Workday access confirmed for cohort
- [ ] AI assistant quality gate passed
- [ ] Platform coexistence policy communicated
- [ ] Helpdesk briefed on Workday + AI queries

Each item has: checkbox | RAG chip | Gap Closing Initiative text field | Owner field | Due date

Auto-calculates overall readiness score (% green) and surfacing a Go/No-Go recommendation.

---

**Phase 5 — Business Readiness Pulse (Step 5.2)**

A lightweight survey builder:
- 5 pre-populated readiness questions (from methodology)
- User can add up to 5 custom questions
- Each question is Likert scale (1–5)
- "Copy survey link" button (copies a pre-filled URL for sharing — simulated in MVP)
- Results input section: manual entry of aggregated scores
- Visualisation: horizontal bar chart showing score per question vs. target threshold

---

**Phase 2 & 3 — Comms Template Library**

A searchable library of communication templates, pre-populated with ABSA-specific content:

| Template | For | Format |
|---|---|---|
| AI Assistant Launch Email | All employees | Email |
| Manager Briefing Pack | Line managers | Briefing doc |
| Town Hall Talking Points | CHRO / HR leads | Speaker notes |
| Champion Welcome Message | Champion network | Email |
| "Meet Your HR Assistant" Campaign Copy | All employees | Teams / intranet |
| FAQ Document — Workday + AI | All employees | FAQ format |
| Resistance Handling Guide | Change leads | Internal guide |
| Phase Completion Sign-off Note | Sponsors | Email |

Each template is:
- Displayed in a card with title, audience tag, and format badge
- Clicking "Use Template" opens a modal with the full template text
- Text is pre-populated with ABSA-specific placeholders (e.g. `[EMPLOYEE_NAME]`, `[LAUNCH_DATE]`, `[BU_NAME]`)
- "Copy to clipboard" button

---

#### Tab 3: Checklist

**Purpose:** A completion checklist for the phase. Drives the RAG status shown on the dashboard.

**Design:**
- Each checklist item is a row with: checkbox | item text | owner field | due date | notes icon
- Status auto-derives: 0–49% = Red, 50–79% = Amber, 80–100% = Green
- Completion ring shows % at the top of the tab
- "Sign off this phase" button — triggers a confirmation modal. Logs the sign-off with date/time. Marks phase as complete on dashboard.
- Export checklist as PDF (formatted summary)

**Pre-populated Checklists per Phase:**

*Phase 1 — Vision & Benefit Case*
- [ ] Vision for change clearly articulates strategic context and high-level benefits
- [ ] Business case approved by senior management
- [ ] High-level benefits reflected through operational metrics
- [ ] Future benefit owners identified and engaged
- [ ] Benefit tracking owner appointed
- [ ] Benefit tracking initiated with defined modus operandi
- [ ] Vision for Change shared with HR to manage potential org redesign

*Phase 2 — Stakeholder Planning*
- [ ] Stakeholder Repository populated and owners assigned
- [ ] Change Strategy created including first draft of Business Impact
- [ ] Change Strategy signed off with senior stakeholders
- [ ] Engagement & Communication Plan developed
- [ ] Most relevant channels identified for each comms item
- [ ] Operating model defined for continuous document updates
- [ ] Activities aligned with overall program engagements

*Phase 3 — Change Load*
- [ ] Transformation Office liaised with for latest tool and process
- [ ] All planned activities included in change load overview
- [ ] Business has signed off resource support for planned activities
- [ ] Clarifying requests from transformation partners actioned
- [ ] Business Reference Group (BRG) assembled

*Phase 4 — Blueprint & Business Impact*
- [ ] Vision for Change detailed and updated
- [ ] Vision for Change signed off with relevant stakeholders
- [ ] Business Impact Matrix established and detailed
- [ ] Business Impact Matrix signed off with receiving business
- [ ] All operational benefit metrics defined with business owners
- [ ] Business owners engaged and benefits anchored
- [ ] Engagement & Communication Plan updated
- [ ] Business Impact Overview shared with HR for potential org redesign

*Phase 5 — Mobilise Organisation*
- [ ] Gaps defined in Go Live Readiness Assessment
- [ ] Business readiness measures defined, collected, and visualised
- [ ] Gap closing initiatives and mitigating actions signed off with stakeholders
- [ ] Timing of gap closure aligned with Go Live date
- [ ] Project Plan and Communication Plan updated

*Phase 6 — UAT & Training Support*
- [ ] UAT plan defined and resources nominated
- [ ] Training needs assessment completed
- [ ] Training materials developed (Workday + AI assistant)
- [ ] Training delivery completed for this wave cohort
- [ ] Training completion rate tracked and reported
- [ ] Customer engagement pilot groups (if applicable) conducted

*Phase 7 — Go-Live & Hyper Care*
- [ ] Go Live readiness assessment completed — overall status Green
- [ ] Go/No-Go decision made and documented
- [ ] Go-Live engagements executed (launch comms, town halls, etc.)
- [ ] Hyper Care support model activated (helpdesk, champions on standby)
- [ ] Issue log established and monitored
- [ ] Adoption metrics baseline captured at go-live

*Phase 8 — Handover & Tracking*
- [ ] Benefit tracking initiated per the tracking model
- [ ] Benefit ownership formally transferred to business owners
- [ ] Adoption dashboard handed over to ABSA internal team
- [ ] Handover documentation complete
- [ ] Customer satisfaction assessment conducted
- [ ] Program close-out report prepared

---

### 4.4 Adoption Metrics Tracker

**Purpose:** A live adoption dashboard tracking Workday + AI assistant uptake across the rollout waves.

**Location:** Accessible from Dashboard via "Adoption Metrics" tab or button.

**Metrics displayed:**

*Wave Progress Panel*
- Employees reached this sprint (number + % of total)
- Employees trained (number + % of wave)
- Employees using Workday (Logins in last 30 days — manual input in MVP)
- AI assistant queries submitted (manual input in MVP)
- HR service desk tickets (should decrease — trend indicator)

*Per-Business-Unit Table*
- Columns: BU Name | Wave | Employees | Trained % | Active on Workday % | AI Tool Usage % | RAG
- Manually editable
- Sortable columns

*Trend Charts (Recharts)*
- Line chart: Workday active users over time (weeks)
- Bar chart: Training completion by BU
- Gauge / donut: Overall program adoption vs. target

*Target Thresholds*
- User-configurable target lines per metric (e.g. "Target: 70% of employees active on Workday by Day 60")

---

### 4.5 Champion Network Directory

**Purpose:** A simple registry of change champions across the organisation.

**Fields per champion:**
- Name
- Business Unit
- Location
- Employee Level (Manager / Individual Contributor)
- Cohort / Wave assigned to
- Contact (email)
- Status (Active / Inactive / Pending)
- Last activity date (manual)
- Notes

**Features:**
- Add/remove champions
- Filter by BU, wave, status
- Export as CSV
- "Copy email list" for bulk comms to champions

**Target ratio indicator:** Shows current ratio of champions to employees (target: 1 per 100). Flags in amber if below 1:150, red if below 1:200.

---

### 4.6 Program Settings & Configuration

**Purpose:** Allow the Change Lead to configure the toolkit for ABSA's specific program.

**Settings:**

*Program Config*
- Program name (default: "ABSA Workday Adoption Program")
- CHRO / Executive Sponsor name
- Program start date
- Sprint dates (start/end for each of 3 sprints)
- Total employee population (default: 40,000)

*Phase Owners*
- Assign a named owner to each of the 8 phases
- Owner name shown on dashboard and all phase pages

*Notification Preferences*
- Toggle: Show overdue alerts on dashboard (default: on)
- Toggle: Show days-since-update badges (default: on)

*Data*
- Export all data as JSON (for backup)
- Import JSON (to restore)
- Reset all progress (confirmation required)

---

## 5. Technical Specifications

### Stack

| Layer | Technology | Rationale |
|---|---|---|
| Framework | React 18 (functional components + hooks) | Claude Code native, component reuse |
| Styling | Tailwind CSS | Rapid, consistent styling |
| Charts | Recharts | Lightweight, React-native charting |
| Icons | Lucide React | Clean icon set, React-native |
| State Management | React Context + useReducer | No backend needed in MVP; full state tree |
| Persistence | localStorage | Zero infrastructure. Works offline. Shareable via export/import |
| Export (CSV/JSON) | Native browser APIs | No dependencies |
| Routing | React Router v6 | Phase detail pages need URLs |
| Build | Vite | Fast dev server, simple config |

### File Structure

```
src/
├── main.jsx
├── App.jsx
├── context/
│   └── ToolkitContext.jsx       # Global state: phases, checklists, stakeholders, metrics
├── data/
│   ├── phases.js                # Pre-populated phase content (briefs, objectives, tips, checklists)
│   ├── templates.js             # Comms template library content
│   └── defaults.js              # Default program config, ABSA-specific defaults
├── components/
│   ├── layout/
│   │   ├── Sidebar.jsx
│   │   ├── TopBar.jsx
│   │   └── MobileNav.jsx
│   ├── dashboard/
│   │   ├── Dashboard.jsx
│   │   ├── PhaseHealthCard.jsx
│   │   ├── ProgramStats.jsx
│   │   ├── ActivityFeed.jsx
│   │   └── MilestoneStrip.jsx
│   ├── wheel/
│   │   ├── ChangeWheel.jsx      # SVG octagonal wheel
│   │   └── PhaseList.jsx        # Linear list fallback
│   ├── phase/
│   │   ├── PhaseDetail.jsx      # Phase wrapper with tabs
│   │   ├── IntroTab.jsx
│   │   ├── StepsTab.jsx
│   │   ├── ChecklistTab.jsx
│   │   └── StepCard.jsx         # Collapsible step component
│   ├── worksheets/
│   │   ├── StakeholderPlanner.jsx
│   │   ├── StakeholderMap.jsx
│   │   ├── CommsPlan.jsx
│   │   ├── BusinessImpactMatrix.jsx
│   │   ├── ReadinessAssessment.jsx
│   │   └── ReadinessPulse.jsx
│   ├── metrics/
│   │   ├── AdoptionDashboard.jsx
│   │   ├── WaveProgress.jsx
│   │   ├── BUTable.jsx
│   │   └── TrendCharts.jsx
│   ├── champions/
│   │   └── ChampionDirectory.jsx
│   ├── templates/
│   │   ├── TemplateLibrary.jsx
│   │   └── TemplateModal.jsx
│   └── shared/
│       ├── RAGBadge.jsx         # Red/Amber/Green status chip
│       ├── ProgressRing.jsx     # Circular % indicator
│       ├── CollapsibleCard.jsx
│       ├── ExportButton.jsx
│       └── ConfirmModal.jsx
├── hooks/
│   ├── usePhase.js              # Phase state helpers
│   ├── useChecklist.js          # Checklist completion logic
│   └── useExport.js             # CSV/JSON export logic
└── utils/
    ├── ragCalculator.js         # Derives RAG from completion %
    ├── dateHelpers.js
    └── storageHelpers.js        # localStorage read/write wrappers
```

### Data Model (localStorage keys)

```javascript
// Program configuration
toolkit_config: {
  programName: string,
  sponsor: string,
  startDate: ISO8601,
  sprints: [{ id, name, start, end }],
  totalEmployees: number,
  phaseOwners: { [phaseId]: string }
}

// Phase progress
toolkit_phases: {
  [phaseId]: {
    status: 'not_started' | 'in_progress' | 'complete',
    signedOffAt: ISO8601 | null,
    signedOffBy: string | null
  }
}

// Checklists
toolkit_checklists: {
  [phaseId]: {
    [itemId]: {
      complete: boolean,
      owner: string,
      dueDate: ISO8601 | null,
      notes: string
    }
  }
}

// Step notes and statuses
toolkit_steps: {
  [phaseId]: {
    [stepId]: {
      status: 'not_started' | 'in_progress' | 'complete',
      notes: string
    }
  }
}

// Stakeholder repository
toolkit_stakeholders: [
  {
    id: uuid,
    name: string,
    classification: string,
    region: string,
    headcount: number,
    influence: 1-5,
    reactionCurrent: -2 to 2,
    reactionDesired: -2 to 2,
    rag: 'red' | 'amber' | 'green',
    owner: string,
    mindset: 'resistant' | 'neutral' | 'supportive' | 'committed',
    notes: string
  }
]

// Comms plan items
toolkit_comms_plan: [
  {
    id: uuid,
    title: string,
    purpose: string,
    timing: string,
    targetGroup: string,
    message: string,
    channel: string,
    owner: string,
    status: 'planned' | 'in_progress' | 'sent'
  }
]

// Business impact matrix rows
toolkit_impact_matrix: [
  {
    id: uuid,
    businessUnit: string,
    changeType: 'process' | 'organisation' | 'it' | 'culture' | 'customer',
    description: string,
    scale: 'low' | 'medium' | 'high',
    timing: string,
    owner: string,
    rag: 'red' | 'amber' | 'green'
  }
]

// Adoption metrics
toolkit_adoption: {
  waves: [
    {
      id: uuid,
      name: string,
      sprint: number,
      businessUnit: string,
      employees: number,
      trained: number,
      activeWorkday: number,
      aiQueries: number,
      tickets: number,
      rag: 'red' | 'amber' | 'green'
    }
  ],
  weeklyData: [
    { week: number, activeUsers: number, trainedTotal: number }
  ],
  targets: {
    activeWorkdayPct: number,
    trainingPct: number
  }
}

// Champion directory
toolkit_champions: [
  {
    id: uuid,
    name: string,
    businessUnit: string,
    location: string,
    level: 'manager' | 'individual_contributor',
    wave: number,
    email: string,
    status: 'active' | 'inactive' | 'pending',
    lastActivity: ISO8601 | null,
    notes: string
  }
]
```

---

## 6. UX & Design Requirements

### Visual Design

- **Colour palette:** ABSA Red (`#CC0000`) primary, Deep Navy (`#1A1A2E`) secondary, White background for content areas, off-white (`#F8F9FA`) for cards
- **Typography:** System fonts (Inter or system-ui). Large headings for phase names. Dense but readable body text.
- **RAG colours:** Red `#DC2626`, Amber `#D97706`, Green `#16A34A`
- **Phase colour system:** Each of the 8 phases has a distinct accent colour (used for the wheel segments, step headers, and tab accents)

### Responsive Design

- **Desktop first** — primary use case is a change lead on a laptop
- **Tablet compatible** — stakeholder map and comms plan tables must work on iPad
- **Mobile accessible** — dashboard and checklists must be readable and usable on mobile (linear layout, no tables that require horizontal scroll)

### Interaction Patterns

- **Auto-save:** All changes to checklists, notes, and worksheets save to localStorage on every change (debounced 500ms)
- **Unsaved state indicator:** Show a subtle "Saved" confirmation for 2 seconds after save
- **Empty states:** Every table and list shows a meaningful empty state with a CTA (e.g. "No stakeholders added yet — add your first stakeholder")
- **Tooltips:** Methodology terms (e.g. "BRG", "RAG", "Change Load") have a tooltip with a plain-English definition on hover
- **Progress persistence:** Reopening the app returns to the same page the user was last on

### Accessibility

- All interactive elements have focus states
- RAG badges must include text labels, not colour alone
- Tables include proper `<thead>` and ARIA labels
- Keyboard navigable throughout

---

## 7. Pre-populated ABSA-Specific Content

The following content should be pre-loaded into the application's `data/` files, customised for ABSA's Workday adoption context:

### Phase Briefs (ABSA-contextualised)

Each phase brief references Workday, the AI assistant, ABSA's three-platform landscape (Workday / People Portal / My Gateway), and the 40,000-employee rollout. Generic Maersk Line or shipping references from the source model must be replaced.

### Default Stakeholder Groups (pre-populated in Stakeholder Repository)

| Name/Group | Classification | Influence | Notes |
|---|---|---|---|
| CHRO | Executive Sponsor | 5 | Must be visibly committed for program to succeed |
| ABSA HR Leadership Team | Senior Stakeholder | 5 | Key decision-makers on platform policy |
| HR Business Partners | Key Influencer | 4 | Critical adoption lever — must be trained first |
| Line Managers (all BUs) | Change Target | 4 | Single biggest lever for team adoption |
| Workday System Owner | Technical Stakeholder | 3 | Controls configuration, change requests |
| AI Tool Vendor/Team | Technical Stakeholder | 3 | Quality gate dependency |
| People Portal Team (ServiceNow) | Internal Stakeholder | 3 | Platform coexistence requires coordination |
| My Gateway Team | Internal Stakeholder | 3 | Platform coexistence requires coordination |
| IT Helpdesk | Enabling Stakeholder | 2 | Must be briefed before each wave |
| Frontline Employees | Change Target | 2 | End users — adoption is the program outcome |
| Transformation Office | Governance | 3 | Program oversight and reporting |

### Default Comms Plan Items (Phase 2)

| # | Title | Purpose | Channel | Owner |
|---|---|---|---|---|
| 1 | Executive Sponsor Announcement | Launch the program with visible CHRO commitment | Town Hall / Video | CHRO |
| 2 | Manager Briefing — Wave 1 | Prepare managers to lead team adoption | Workshop + Briefing Pack | Change Lead |
| 3 | "Meet Your HR Assistant" Campaign | Introduce the AI tool as the primary entry point | Teams + Email | Comms Team |
| 4 | Champion Network Kick-off | Activate and brief the champion network | Workshop | Change Lead |
| 5 | Workday Quick Start Guide Push | Drive initial logins post training | Email + Intranet | HR BPs |
| 6 | Wave 1 Go-Live Comms | Announce live availability to Wave 1 cohort | Email + Teams | HR BPs |
| 7 | Post-Go-Live Pulse Check | Collect early adoption feedback | Survey | Change Lead |
| 8 | Monthly Adoption Update to Leadership | Report progress to EXCO | SteerCo Report | Program Manager |

### Default Templates (Comms Template Library)

Full template text (placeholder-based) for all 8 templates listed in Section 4.3.

---

## 8. MVP Scope vs. Future Phases

### MVP (Ship This)

- [ ] Dashboard with program health scorecard
- [ ] Change Wheel navigator (SVG + list fallback)
- [ ] All 8 phase detail pages with Introduction and Checklist tabs
- [ ] Steps tab for Phases 1, 2, 4, 5 (highest priority phases for Sprint 1)
- [ ] Stakeholder Planner (repository + map)
- [ ] Comms Plan table
- [ ] Go-Live Readiness Assessment
- [ ] Comms Template Library (8 templates)
- [ ] Adoption Metrics Tracker (manual input)
- [ ] Champion Directory
- [ ] Export: CSV for comms plan and stakeholder repository
- [ ] Export: JSON backup/restore
- [ ] Program Settings
- [ ] localStorage persistence throughout
- [ ] Mobile-responsive layout

### Phase 2 (Post-MVP)

- [ ] Multi-user mode with named sessions (no login — URL-based session tokens)
- [ ] Activity feed with real update timestamps
- [ ] Steps tabs for Phases 3, 6, 7, 8
- [ ] Business Impact Matrix full implementation
- [ ] Readiness Pulse survey builder
- [ ] PDF export for checklists and status reports
- [ ] Notification / reminder system (browser notifications)
- [ ] Integration with Workday analytics API for live adoption data

### Out of Scope

- Authentication / user accounts
- Backend / database
- Real-time multi-user collaboration (simultaneous editing)
- MS Teams or SharePoint embedding (future)
- Native mobile app

---

## 9. Development Notes for Claude Code

### Initialisation Sequence

On first load (no localStorage data found):
1. Show a setup wizard (3 steps): Program name → Start date and sprint dates → Total employees and executive sponsor
2. Pre-populate all data files with ABSA-specific defaults
3. Land on Dashboard

On subsequent loads:
1. Load state from localStorage
2. Navigate to last-visited page (stored in `toolkit_lastPage`)
3. Show any overdue alerts in a dismissible banner

### Key Implementation Challenges

**The Change Wheel (SVG)**  
Build as an SVG with 8 equal arc segments, each segment clickable, each segment coloured by RAG status. The wheel should animate on load (segments fade in). Use React state to manage hover and active segment. Fall back to a list view on mobile.

**Stakeholder Map (2x2 quadrant scatter)**  
Use Recharts `ScatterChart` with custom dot rendering. X-axis: Reaction to Change (−2 to +2). Y-axis: Influence (1–5). Quadrant background colours (light tints). Each dot is labelled with stakeholder name (truncated if long). Dots are coloured by RAG status.

**localStorage state synchronisation**  
Use a single `ToolkitContext` with `useReducer`. All state changes dispatch actions to the reducer. A `useEffect` in the context provider writes the full state to localStorage on every state change (debounced). On mount, reads from localStorage and initialises state.

**RAG derivation logic**
```javascript
// ragCalculator.js
export function calculateRAG(completedItems, totalItems) {
  const pct = totalItems === 0 ? 0 : (completedItems / totalItems) * 100;
  if (pct >= 80) return 'green';
  if (pct >= 50) return 'amber';
  return 'red';
}
```

**Empty state handling**  
Every list component (stakeholder repository, comms plan, champions) must render a well-designed empty state — not a blank table. Use a centred illustration (simple SVG or emoji) with a short description and a primary CTA button.

### Performance Notes

- All phase content (briefs, checklists, step instructions) is static data imported from `data/phases.js`. Do not fetch it from an API.
- The Stakeholder Map should only re-render when stakeholder data changes (use `useMemo` for the chart data transformation).
- localStorage writes should be debounced to avoid performance issues during rapid typing in notes fields.

---

## 10. Acceptance Criteria

The build is complete when:

- [ ] A new user can complete the setup wizard and land on a populated dashboard in under 2 minutes
- [ ] All 8 phase pages are navigable from the Change Wheel and the sidebar
- [ ] Checking off a checklist item updates the phase RAG status in real-time on the dashboard
- [ ] The Stakeholder Repository can have rows added, edited, and removed; changes reflect immediately on the Stakeholder Map
- [ ] The Comms Plan table can be exported as a CSV
- [ ] The Comms Template Library shows all 8 templates; clicking "Use Template" opens the full text in a modal with a working copy button
- [ ] The Adoption Metrics Tracker accepts manual input and renders charts
- [ ] The Champion Directory shows the champion-to-employee ratio and flags below-target ratios
- [ ] All state persists across browser refresh
- [ ] The JSON export downloads a valid JSON file; re-importing it restores all state
- [ ] The application is usable on a 375px wide mobile screen (no horizontal overflow, all critical actions reachable)
- [ ] No console errors in production build

---

## 11. Appendix — Source Material

This PRD was built from the following source documents:

1. **Change Engagement Model v2.0** (uploaded PPTX) — Maersk Line Transformation Office, May 2015. Provides the 8-phase Change Wheel structure, all checklist content, step-by-step instructions, tips & tricks, stakeholder guidance, and worksheet designs adapted for ABSA context.

2. **ABSA Workday Adoption Proposal** (developed in this engagement) — Provides ABSA-specific context: 40,000 employees, three-platform landscape (Workday / People Portal / My Gateway), AI assistant as change catalyst, Phase 0 diagnostic + 3-sprint structure, key risks (executive sponsorship, manager resistance, AI tool quality, platform governance).

All generic references in the source material (Maersk Line, shipping industry, SAP, PRINCE2 framework specifics) have been abstracted or replaced with ABSA-appropriate equivalents.

---

*End of PRD — Ready for Claude Code*

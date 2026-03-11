// Pre-populated ABSA-specific communication templates

export const TEMPLATES = [
  {
    id: 'ai_launch_email',
    title: 'AI Assistant Launch Email',
    audience: 'All Employees',
    format: 'Email',
    phase: 'Phase 2–3',
    description: 'Announce the AI HR assistant to all employees as the new primary contact point for HR queries.',
    content: `Subject: Meet Your New HR Assistant — Available from [LAUNCH_DATE]

Dear [EMPLOYEE_NAME],

We're excited to announce that as part of ABSA's continued investment in your employee experience, we're launching a new AI-powered HR Assistant on [LAUNCH_DATE].

What is the HR Assistant?
Your HR Assistant is an intelligent, conversational tool that answers your HR questions instantly — 24 hours a day, 7 days a week. Whether you need to check your leave balance, understand your benefits, or get help with a payroll query, your HR Assistant is available immediately, with no waiting time.

How do I access it?
From [LAUNCH_DATE], you'll find the HR Assistant directly in [ACCESS_POINT — e.g. your ABSA intranet / Teams / Workday homepage]. Just type your question in plain English and get an instant answer.

What can it help me with?
• Leave queries and applications
• Payroll and benefits questions
• HR policy information
• Workday navigation support
• And much more — the assistant learns as we go

What about complex queries?
For matters that need a human touch, the HR Assistant will seamlessly connect you to your HR Business Partner or the HR service team. You'll never be stuck.

Your first step
When [LAUNCH_DATE] arrives, give it a try. Ask it anything HR-related. We're confident it will save you time and make your experience smoother.

For questions about the HR Assistant before launch, contact [CHANGE_LEAD_EMAIL].

Warm regards,

[CHRO_NAME]
Chief Human Resources Officer
ABSA Group`,
  },
  {
    id: 'manager_briefing',
    title: 'Manager Briefing Pack',
    audience: 'Line Managers',
    format: 'Briefing Document',
    phase: 'Phase 2',
    description: 'Prepare line managers to lead Workday and AI assistant adoption within their teams.',
    content: `MANAGER BRIEFING: ABSA Workday + AI Assistant Adoption
[WAVE_NAME] | Prepared for: [BU_NAME] Line Managers
Date: [BRIEFING_DATE]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
YOUR ROLE IN THIS PROGRAM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

You are the single most important factor in whether your team adopts Workday and the HR Assistant successfully. Research shows that employees follow their manager's lead — if you use the system and talk positively about it, your team will too.

What we're asking of you:
1. Attend the manager briefing session on [BRIEFING_DATE]
2. Complete your own Workday training before your team's go-live
3. Talk to your team about what's changing and why — before go-live
4. Be the first to use Workday when it goes live in your area
5. Direct your team to the HR Assistant for HR queries from [LAUNCH_DATE]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
WHAT'S CHANGING FOR YOUR TEAM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

From [LAUNCH_DATE], your team in [BU_NAME] will:

• Use Workday for: [WORKDAY_SCOPE — e.g. leave requests, performance check-ins, personal data updates]
• Use the HR Assistant for: everyday HR questions and Workday navigation support
• Continue to use People Portal for: [PEOPLE_PORTAL_SCOPE — e.g. complex HR cases]

What is NOT changing:
• [LIST_ITEMS_NOT_CHANGING]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TALKING POINTS FOR YOUR TEAM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Use these in your next team meeting or 1:1s:

"We're moving to Workday for [SCOPE] from [LAUNCH_DATE]. This will make it faster and easier for you to manage your own HR information directly."

"The HR Assistant is a new tool that will answer most of your HR questions instantly. It's available 24/7 — you don't have to wait for a response."

"I've already done the training and I'm here to help. If you get stuck, come to me first or ask our team champion [CHAMPION_NAME]."

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
COMMON QUESTIONS YOUR TEAM WILL ASK
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Q: Is the AI replacing HR staff?
A: No. The AI handles routine queries so HR Business Partners can focus on more complex, strategic support. [HRBP_NAME] remains your HRBP.

Q: Is my data safe in Workday?
A: Yes. Workday is an enterprise-grade system used by thousands of organisations globally. Your data is protected by [DATA_SECURITY_STATEMENT].

Q: What if I make a mistake in Workday?
A: Most actions can be corrected. Contact [SUPPORT_CONTACT] or the HR Assistant for help.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
YOUR SUPPORT RESOURCES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• Your team champion: [CHAMPION_NAME] — [CHAMPION_EMAIL]
• Your HRBP: [HRBP_NAME] — [HRBP_EMAIL]
• Workday support: [WORKDAY_SUPPORT_LINK]
• HR Assistant: Available from [LAUNCH_DATE]
• Manager hotline during go-live week: [HOTLINE_NUMBER]`,
  },
  {
    id: 'town_hall_talking_points',
    title: 'Town Hall Talking Points',
    audience: 'CHRO / HR Leads',
    format: 'Speaker Notes',
    phase: 'Phase 2–3',
    description: 'Structured talking points for the CHRO or HR Leadership to present at an all-employee town hall on the Workday adoption program.',
    content: `TOWN HALL TALKING POINTS
ABSA Workday Adoption Program
Speaker: [CHRO_NAME / HR_LEAD_NAME]
Event: [EVENT_NAME] | Date: [EVENT_DATE]
Audience: [AUDIENCE_DESCRIPTION]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
OPENING (2 minutes)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

"Good [morning/afternoon] everyone. I want to take a few minutes to talk about something that I'm genuinely excited about — and something that's going to make your lives easier."

[PAUSE]

"ABSA is committed to being the best employer in financial services. Part of that commitment is giving you tools that work for you — tools that are modern, intuitive, and that put you in control of your own HR experience."

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
THE PROBLEM WE'RE SOLVING (2 minutes)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

"Let's be honest about where we are today. If you want to check your leave balance, you wait. If you have a payroll query, you wait. Our HR processes have not kept pace with what our people deserve."

"[OPTIONAL: Share a specific example of a frustrating HR process the audience will relate to]"

"That's what we're here to change."

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
WHAT WE'RE DOING (3 minutes)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

"We're rolling out Workday — a world-class HR platform — to all [EMPLOYEE_COUNT] of us across ABSA. Alongside it, we're introducing an AI-powered HR Assistant that will answer your HR questions instantly."

"What does that mean for you?"

[Bullet each point clearly — pause between them]

• "From [LAUNCH_DATE], you'll manage your leave, view your payslips, and update your personal details directly in Workday — from your desktop or mobile."
• "Your HR Assistant will be available 24/7. Ask it anything HR-related and you'll get an instant answer."
• "Your HR Business Partner isn't going anywhere. They're freed up to focus on the conversations that matter most to you."

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
WHAT I'M ASKING OF YOU (1 minute)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

"I'm asking you to give this a genuine try. Complete your training when it's scheduled. Use Workday from day one. Ask the HR Assistant your first HR question."

"I'm doing the same. I'll be using Workday from [LAUNCH_DATE] — and I'll be the first to tell you what I think."

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CLOSE & Q&A
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

"Watch for communications from [CHANGE_LEAD_NAME] about your specific go-live date and training schedule."

"Now — what questions do you have?"

[ANTICIPATED QUESTIONS — see FAQ document for responses]`,
  },
  {
    id: 'champion_welcome',
    title: 'Champion Welcome Message',
    audience: 'Champion Network',
    format: 'Email',
    phase: 'Phase 5',
    description: 'Welcome and brief message to employees joining the change champion network.',
    content: `Subject: Welcome to the ABSA Workday Change Champion Network

Dear [CHAMPION_NAME],

Thank you for agreeing to be a Change Champion for the ABSA Workday + AI Assistant adoption program. You've been identified by [NOMINATOR_NAME] as someone whose enthusiasm, credibility, and knowledge of [BU_NAME] will make a real difference to your colleagues' experience of this change.

Here's what being a Champion means:

YOUR ROLE
As a Champion, you'll be the go-to person in [BU_NAME] for questions about Workday and the HR Assistant. You're not expected to know everything — you're expected to be the bridge between your colleagues and the program team.

WHAT YOU'LL DO
• Attend the Champion Briefing on [BRIEFING_DATE] — we'll walk you through Workday and the HR Assistant in detail
• Answer questions from your colleagues in the lead-up to and after go-live
• Share updates from the program team through your team channels
• Flag concerns or resistance patterns back to [CHANGE_LEAD_NAME] — you're our early warning system
• Be visibly positive about the change — your energy matters more than you think

WHAT YOU'LL GET
• Early access to Workday training (before the rest of your BU)
• A Champion Toolkit with FAQs, talking points, and escalation paths
• Direct access to [CHANGE_LEAD_NAME] for any questions
• Regular updates before they go out to the broader organisation
• Recognition in the program close-out report

YOUR FIRST STEP
Please confirm your attendance at the Champion Briefing on [BRIEFING_DATE] by replying to this email or registering at [REGISTRATION_LINK].

Thank you for stepping up. The success of this program for your colleagues is, in no small part, down to people like you.

Warm regards,

[CHANGE_LEAD_NAME]
Change Lead, ABSA Workday Adoption Program
[CHANGE_LEAD_EMAIL]`,
  },
  {
    id: 'meet_hr_assistant',
    title: '"Meet Your HR Assistant" Campaign Copy',
    audience: 'All Employees',
    format: 'Teams / Intranet',
    phase: 'Phase 3',
    description: 'Short-form campaign copy for promoting the AI HR assistant launch across Teams and the ABSA intranet.',
    content: `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TEAMS MESSAGE (Short form)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

👋 Meet your new HR Assistant — launching [LAUNCH_DATE].

Got an HR question? From [LAUNCH_DATE], just ask. Your AI-powered HR Assistant answers questions instantly, 24/7 — no waiting, no hold music.

✅ Leave balances
✅ Payroll queries
✅ HR policy questions
✅ Workday help

Find it at [ACCESS_POINT] from [LAUNCH_DATE].

[LEARN_MORE_LINK]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
INTRANET ARTICLE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

HEADLINE: Your HR questions, answered instantly. Meet the ABSA HR Assistant.

SUBHEADLINE: From [LAUNCH_DATE], you'll have a new way to get HR support — available any time, from anywhere.

BODY:
We know that getting answers to HR questions can take time. Waiting for email replies. Navigating policy documents. Queuing for the HR helpdesk.

From [LAUNCH_DATE], that changes.

The ABSA HR Assistant is an intelligent, conversational tool that gives you instant answers to your HR questions — 24 hours a day, 7 days a week. It's powered by AI, trained on ABSA's HR policies, and designed to be as easy to use as a chat message.

WHAT CAN IT DO?

The HR Assistant can help you with:
• Checking your leave balance and submitting leave requests
• Understanding your pay, benefits, and allowances
• Navigating Workday
• Finding HR policies and procedures
• Getting quick answers to common HR questions

For more complex queries, it will connect you directly to your HR Business Partner.

HOW TO USE IT

From [LAUNCH_DATE]:
1. Go to [ACCESS_POINT]
2. Type your question in plain English
3. Get an instant answer

It really is that simple.

WANT TO KNOW MORE?

[FAQ_LINK] | [TRAINING_LINK] | Contact: [CHANGE_LEAD_EMAIL]`,
  },
  {
    id: 'faq_workday_ai',
    title: 'FAQ Document — Workday + AI Assistant',
    audience: 'All Employees',
    format: 'FAQ Document',
    phase: 'Phase 3',
    description: 'Comprehensive FAQ covering common questions about the Workday adoption and the AI HR assistant.',
    content: `FREQUENTLY ASKED QUESTIONS
ABSA Workday + AI HR Assistant Adoption
Last updated: [DOCUMENT_DATE] | Version: [VERSION_NUMBER]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ABOUT WORKDAY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Q: What is Workday?
A: Workday is a cloud-based HR platform that will replace many of the manual and fragmented HR processes at ABSA. It will be your central place for managing leave, viewing payslips, updating personal information, and completing performance check-ins.

Q: Why are we moving to Workday?
A: Workday modernises ABSA's HR infrastructure, reduces manual processes, and gives employees direct control over their HR data. It's part of ABSA's commitment to improving the employee experience.

Q: What will I use Workday for?
A: [WORKDAY_SCOPE — customise per BU]. At a minimum, this includes leave management, personal data updates, payslip access, and [ADDITIONAL_MODULES].

Q: What happens to [CURRENT_SYSTEM] I use today?
A: [CURRENT_SYSTEM_TRANSITION_DETAILS — customise per BU and system].

Q: Will Workday work on my mobile?
A: Yes. Workday has a mobile app available for iOS and Android. You can manage most tasks on your phone.

Q: When does Workday go live for me?
A: Your go-live date is [LAUNCH_DATE_BU_SPECIFIC]. You'll receive a personal notification with your login details before this date.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ABOUT THE AI HR ASSISTANT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Q: What is the AI HR Assistant?
A: The HR Assistant is an AI-powered chatbot that answers your HR questions instantly. It's trained on ABSA's HR policies and can handle most routine HR queries without you needing to contact the HR service desk.

Q: Is it really AI? How does it work?
A: Yes. The HR Assistant uses large language model technology to understand your question and provide an accurate answer from ABSA's HR knowledge base. It's the same technology behind tools like ChatGPT, but trained specifically on ABSA's policies.

Q: Is the AI replacing my HR Business Partner?
A: No. The HR Assistant handles routine queries — the kind that can be answered from a policy document or a system lookup. Your HRBP, [HRBP_NAME], remains available for complex, sensitive, or strategic HR matters.

Q: Is my conversation with the AI private?
A: [PRIVACY_POLICY_STATEMENT — insert ABSA's specific data privacy statement for the AI tool].

Q: What if the AI gives me a wrong answer?
A: The AI is designed to be accurate, but if you believe an answer is incorrect, use the "flag this response" button and the query will be reviewed by the HR team. For urgent matters, contact [HR_CONTACT] directly.

Q: What if I prefer to speak to a person?
A: You can always request a human at any point in your conversation with the HR Assistant. Type "speak to HR" and you'll be connected to the service desk or your HRBP.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TRAINING & SUPPORT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Q: Do I have to do training?
A: Yes. A [DURATION]-minute training session is mandatory for all employees in [BU_NAME] before [LAUNCH_DATE]. Your manager will share the training schedule with you.

Q: What if I miss training?
A: Contact [TRAINING_CONTACT] to book an alternative session. Self-paced e-learning will also be available at [ELEARNING_LINK].

Q: Who do I contact if I have a problem after go-live?
A: First, ask the HR Assistant — it can help with most issues. If it can't help:
• Your team champion: [CHAMPION_NAME] — [CHAMPION_EMAIL]
• Your HRBP: [HRBP_NAME] — [HRBP_EMAIL]
• IT Helpdesk: [HELPDESK_CONTACT]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
OTHER QUESTIONS?
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Email [CHANGE_LEAD_EMAIL] or ask your team champion [CHAMPION_NAME].`,
  },
  {
    id: 'resistance_handling',
    title: 'Resistance Handling Guide',
    audience: 'Change Leads',
    format: 'Internal Guide',
    phase: 'Phase 2–7',
    description: 'A practical guide for change leads and champions to handle common resistance patterns during the Workday adoption.',
    content: `RESISTANCE HANDLING GUIDE
ABSA Workday + AI Assistant Adoption
For: Change Leads, HR Business Partners, Champions
Confidential — Internal Use Only

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PRINCIPLES FOR HANDLING RESISTANCE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. Acknowledge before you respond. Never dismiss a concern — validate that you've heard it first.
2. Separate the person from the behaviour. Resistance usually comes from fear or loss, not obstruction.
3. Understand the root cause. Ask "what's behind that concern?" before answering at face value.
4. Escalate genuine issues. If the resistance reflects a real program problem, surface it — don't manage it away.
5. Follow up. Resistance that is addressed but not followed up on often resurfaces.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
COMMON RESISTANCE PATTERNS & RESPONSES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

RESISTANCE: "The current system works fine. Why are we changing?"
ROOT CAUSE: Comfort with the status quo. Fear of effort to learn something new.
RESPONSE: "I understand it works for you — and you've made it work. The challenge is it doesn't work the same way for everyone across ABSA's [EMPLOYEE_COUNT] employees. Workday gives us one consistent system that works better for most people — including for things you probably do manually today."
FOLLOW-UP: Offer a 1:1 demo of a Workday feature that specifically improves on their current workflow.

---

RESISTANCE: "The AI will replace HR jobs."
ROOT CAUSE: Anxiety about job security. Often held by HR staff themselves.
RESPONSE: "The AI handles the repetitive, transactional queries — leave balances, policy lookups. Your HR Business Partners are freed up to spend more time on the complex, strategic support that genuinely requires human judgement. No HR role is being eliminated because of this program."
FOLLOW-UP: Connect the concerned individual with their HRBP directly to reinforce this message.

---

RESISTANCE: "I don't trust the AI. It'll give wrong answers."
ROOT CAUSE: Scepticism about AI accuracy. Possibly a prior bad experience with AI tools.
RESPONSE: "That's a fair concern. The HR Assistant is specifically trained on ABSA's policies — it's not a generic chatbot. And if it gives an answer you're unsure about, there's a flag button. You can always ask to speak to a human. But give it three questions — most people are surprised how accurate it is."
FOLLOW-UP: Do a live demonstration with 3 common questions relevant to their role.

---

RESISTANCE: "We're too busy right now. This is terrible timing."
ROOT CAUSE: Genuine change load issue, OR a delay tactic.
RESPONSE: First, validate: "I hear you — this period is demanding. Let me check the change load picture for your area." Then investigate: if there's genuine overload, raise with the program team. If it's a delay tactic: "The timing was designed with your BU in mind. Delaying [BU_NAME]'s wave creates downstream problems for the rest of the rollout."
FOLLOW-UP: If genuine change load — escalate to the program team. If delay tactic — bring in the BU lead.

---

RESISTANCE: "My manager hasn't told us anything about this."
ROOT CAUSE: Manager is not engaged or is themselves resistant.
RESPONSE: "That's really helpful to know — thank you. We'll make sure [MANAGER_NAME] gets the information they need today. In the meantime, here's the FAQ document and your team champion is [CHAMPION_NAME]."
FOLLOW-UP: Flag to the change lead immediately. Engage the manager directly within 24 hours.

---

RESISTANCE: "I don't have time for training."
ROOT CAUSE: Time pressure — real or perceived.
RESPONSE: "The training is [DURATION] minutes — we've kept it as short as possible. And it's much shorter than the time you'll waste if you go live without it. Your manager has confirmed time is being protected for this. When works for you — morning or afternoon this week?"
FOLLOW-UP: Confirm the booking and send a calendar invite.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
WHEN TO ESCALATE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Escalate immediately to [CHANGE_LEAD_NAME] if:
• A manager is actively discouraging their team from using Workday or the HR Assistant
• You encounter a group of 5+ employees who share the same unresolved concern
• A stakeholder raises a genuine program risk you cannot address (data privacy, system access, process gap)
• An employee raises a formal grievance related to the change

Escalation path: Champion → HRBP → Change Lead → Program Manager → CHRO

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
LOG ALL SIGNIFICANT RESISTANCE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Use the feedback channel [FEEDBACK_CHANNEL] to log:
• The resistance pattern (using the categories above)
• The BU and approximate number of people
• The action taken
• Whether it was resolved

This helps the program team see emerging patterns across waves.`,
  },
  {
    id: 'phase_sign_off',
    title: 'Phase Completion Sign-Off Note',
    audience: 'Executive Sponsors',
    format: 'Email',
    phase: 'Phase 7–8',
    description: 'Formal sign-off email from the change lead to sponsors confirming phase or wave completion.',
    content: `Subject: [PHASE_NAME / WAVE_NAME] — Completion Confirmation and Next Steps

Dear [SPONSOR_NAME],

I am writing to formally confirm that [PHASE_NAME / WAVE_NAME] of the ABSA Workday Adoption Program has been completed as of [COMPLETION_DATE].

COMPLETION SUMMARY

Phase/Wave: [PHASE_NAME / WAVE_NAME]
Completion Date: [COMPLETION_DATE]
Overall RAG Status at Completion: [GREEN / AMBER with notes]
Checklist Items Completed: [X of Y]

KEY OUTCOMES ACHIEVED

• [OUTCOME_1 — e.g. "Stakeholder Repository completed with 47 stakeholders mapped across 8 BUs"]
• [OUTCOME_2 — e.g. "Change Strategy signed off by CHRO and HR Leadership Team on [DATE]"]
• [OUTCOME_3 — e.g. "Engagement & Communication Plan developed and approved — [X] communications planned across Sprint 1"]
• [OUTCOME_4]

METRICS SNAPSHOT (where applicable)

[INSERT RELEVANT METRICS — e.g. training completion %, adoption rates, readiness scores]

ITEMS CARRIED FORWARD

The following items were not completed in this phase and have been carried forward with agreed closure dates:

• [ITEM_1] — Owner: [OWNER] — Due: [DATE]
• [ITEM_2] — Owner: [OWNER] — Due: [DATE]

NEXT PHASE / NEXT STEPS

[NEXT_PHASE_NAME] commences on [NEXT_PHASE_START_DATE]. The priority activities for the first two weeks are:

1. [PRIORITY_1]
2. [PRIORITY_2]
3. [PRIORITY_3]

Your action required: Please confirm your availability for the [NEXT_MILESTONE] on [DATE]. [SPECIFIC_ASK_IF_ANY]

I'm available to discuss any of the above at your convenience.

With thanks for your continued sponsorship of this program.

Warm regards,

[CHANGE_LEAD_NAME]
Change Lead, ABSA Workday Adoption Program
[CHANGE_LEAD_EMAIL] | [CHANGE_LEAD_PHONE]

Attachments:
• [PHASE_NAME] Checklist — Final Status [ATTACHED]
• Adoption Metrics Snapshot — [DATE] [ATTACHED]`,
  },
];

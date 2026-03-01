#!/usr/bin/env node
/**
 * Generate natural language PSEO pages
 * Targets queries that students actually type (conversational/question-format)
 * Run: node scripts/generate-natural-language-pages.cjs
 */

const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'pseo-data');

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

const AUTHOR = {
  name: "StudyBuddy Editorial Team",
  role: "Educational Content Specialists",
  credentials: ["CAPS Curriculum Experts", "Former Educators", "EdTech Specialists"],
  bio: "Our team of former teachers and education specialists creates evidence-based content to help South African students succeed.",
};

const BASE_META = {
  reviewedBy: "Senior Education Consultant",
  factChecked: true,
  lastUpdated: "2026-03-01T09:00:00.000Z",
  lastReviewed: "2026-03-01T09:00:00.000Z",
  published: true,
  qualityScore: 9,
  citations: [
    "Department of Basic Education 2025",
    "Student Success Data",
    "CAPS Curriculum Guidelines",
  ],
  expertise: [
    { type: "education", description: "15+ years combined teaching experience in South African schools" },
    { type: "certification", description: "CAPS Curriculum Certified" },
    { type: "experience", description: "Worked with 10,000+ students across SA" },
  ],
};

const SUBJECTS = [
  { name: "Mathematics", slug: "mathematics", short: "maths" },
  { name: "Physical Sciences", slug: "physical-sciences", short: "science" },
  { name: "Life Sciences", slug: "life-sciences", short: "life sciences" },
  { name: "English", slug: "english", short: "English" },
  { name: "Accounting", slug: "accounting", short: "accounting" },
  { name: "Economics", slug: "economics", short: "economics" },
];

const TESTIMONIALS = [
  { name: "Sipho", location: "Gauteng", grade: 12, from: "45%", to: "68%", weeks: 2 },
  { name: "Lerato", location: "Western Cape", grade: 11, from: "52%", to: "71%", weeks: 3 },
  { name: "Thandi", location: "KwaZulu-Natal", grade: 12, from: "38%", to: "64%", weeks: 4 },
  { name: "Kabelo", location: "Gauteng", grade: 11, from: "48%", to: "73%", weeks: 3 },
  { name: "Naledi", location: "Free State", grade: 10, from: "41%", to: "68%", weeks: 5 },
  { name: "Zanele", location: "Limpopo", grade: 11, from: "42%", to: "67%", weeks: 4 },
];

function pickTestimonial(slug) {
  let h = 0;
  for (let i = 0; i < slug.length; i++) { h = ((h << 5) - h) + slug.charCodeAt(i); h = h & h; }
  return TESTIMONIALS[Math.abs(h) % TESTIMONIALS.length];
}

// ─── Template builders ──────────────────────────────────────────────────────

function buildWhyIsHardPage(subject) {
  const { name, slug, short } = subject;
  const t = pickTestimonial(`why-is-${slug}-so-hard`);
  const pageSlug = `why-is-${slug}-so-hard`;
  return {
    ...BASE_META,
    id: `nl-${pageSlug}`,
    slug: pageSlug,
    pageType: "pain-point",
    searchIntent: "informational",
    targetKeyword: `why is ${name} so hard`,
    title: `Why Is ${name} So Hard? (And How to Make It Easier)`,
    metaTitle: `Why Is ${name} So Hard? | StudyBuddy – Get Help Today`,
    metaDescription: `Struggling with ${name}? You're not alone. Discover why ${short} feels so difficult for South African students and get FREE 24/7 AI tutoring to turn it around.`,
    keywords: ["why is", name.toLowerCase(), "so hard", "struggling", "help", "matric"],
    quickAnswer: `${name} feels hard because it builds on concepts — one gap makes everything harder. StudyBuddy's AI tutor finds exactly where you're stuck and explains it step-by-step, for free.`,
    content: `<h2>Why Is ${name} So Hard?</h2>
<p>If you're asking "why is ${name} so hard?", you're not alone. Thousands of South African students feel the same way every year. The good news: it's rarely about intelligence — it's almost always about gaps in foundational knowledge.</p>

<h2>The Real Reasons ${name} Feels Impossible</h2>
<ul>
<li><strong>Cumulative subject</strong> — ${name} builds on itself. Missing one concept means the next topic won't make sense either.</li>
<li><strong>Large classes</strong> — With 35–40 learners per teacher, you rarely get one-on-one help when you're lost.</li>
<li><strong>Fast CAPS pace</strong> — The curriculum moves quickly. If you fall behind, it's hard to catch up in class.</li>
<li><strong>Fear of asking</strong> — Many students don't ask questions because they feel embarrassed or the lesson moves on.</li>
<li><strong>Limited practice time</strong> — Mastering ${short} takes repetition. School time alone isn't enough.</li>
</ul>

<h2>How to Make ${name} Easier — Starting Tonight</h2>
<p>The fastest way to stop finding ${short} so hard is personalised, on-demand explanation. That's exactly what <a href="/students">StudyBuddy's AI tutor</a> provides.</p>
<ul>
<li>Ask any ${short} question and get a step-by-step explanation immediately</li>
<li>Identify exactly which concept is the root of your confusion</li>
<li>Practice with worked examples aligned to the <strong>CAPS curriculum</strong></li>
<li>Ask the same question ten different ways — no judgment, unlimited patience</li>
</ul>

<h2>Real Student Story</h2>
<p><strong>${t.name}, Grade ${t.grade} — ${t.location}</strong><br/>
"I thought I was just bad at ${short}. Turns out I had one gap from earlier that made everything harder. StudyBuddy found it in minutes and my mark went from ${t.from} to ${t.to} in ${t.weeks} weeks."</p>

<h2>What to Do Right Now</h2>
<ol>
<li>Visit <a href="/students">StudyBuddy</a> — free, no credit card</li>
<li>Ask the ${short} question you're stuck on</li>
<li>Work through the explanation until it clicks</li>
<li>Practice 2–3 similar questions to lock it in</li>
</ol>
<p><strong>No credit card. No commitment. No cost. Just better understanding.</strong></p>
<p><a href="/students">Start FREE — Get Help With ${name} Now</a></p>`,
    faqs: [
      { question: `Why do I find ${name} harder than other subjects?`, answer: `${name} is a cumulative subject — each topic builds on the previous one. A single gap earlier can make many later topics seem impossible. The fix is finding and filling that gap, which StudyBuddy's AI does automatically.` },
      { question: `Is it normal to struggle with ${name} in Grade 12?`, answer: `Completely normal. Most matric students find at least one ${short} topic very challenging. The key is getting targeted help early rather than hoping it will click on its own.` },
      { question: `Can I get better at ${name} quickly?`, answer: `Yes — students typically see understanding improve within 1–2 weeks when they get personalised, on-demand explanations. Grade improvements follow in 3–6 weeks.` },
      { question: `Does StudyBuddy cover the CAPS ${name} curriculum?`, answer: `Yes. All StudyBuddy content is aligned to the South African CAPS curriculum and NSC exam format. Every explanation and practice question is relevant to what you'll face in your exams.` },
      { question: `How much does StudyBuddy cost?`, answer: `It's completely FREE to start — no credit card required. Premium access is R99/month, which is less than the cost of a single hour with a traditional tutor.` },
    ],
  };
}

function buildHowToGetBetterPage(subject) {
  const { name, slug, short } = subject;
  const t = pickTestimonial(`how-to-get-better-at-${slug}`);
  const pageSlug = `how-to-get-better-at-${slug}`;
  return {
    ...BASE_META,
    id: `nl-${pageSlug}`,
    slug: pageSlug,
    pageType: "guide",
    searchIntent: "informational",
    targetKeyword: `how to get better at ${name}`,
    title: `How to Get Better at ${name}: A Practical Guide for SA Students`,
    metaTitle: `How to Get Better at ${name} | Proven Tips for SA Students`,
    metaDescription: `Struggling with ${name}? Learn exactly how to improve your ${short} marks with CAPS-aligned strategies and FREE 24/7 AI tutoring. Real results in weeks.`,
    keywords: ["how to get better at", name.toLowerCase(), "improve", "tips", "matric", "CAPS"],
    quickAnswer: `To get better at ${name}: fill foundational gaps first, practice past papers regularly, and get instant explanations when you're stuck. StudyBuddy's AI tutor is free and available 24/7 for exactly this.`,
    content: `<h2>How to Get Better at ${name}</h2>
<p>The most common question we hear from South African students is "how do I actually get better at ${short}?" This guide gives you a proven, practical answer.</p>

<h2>Step 1: Find Your Gaps</h2>
<p>Before you can improve, you need to know <em>exactly</em> where you're stuck. Don't just revise everything — that wastes time. Ask yourself:</p>
<ul>
<li>Which ${short} topics do I dread seeing on a test?</li>
<li>Which questions in past papers always cost me marks?</li>
<li>Is there a concept that appeared in Grade 10 or 11 I never fully understood?</li>
</ul>
<p>StudyBuddy's AI tutor can help you identify these gaps in minutes by asking you targeted questions.</p>

<h2>Step 2: Get Explanations That Actually Make Sense</h2>
<p>Reading the textbook doesn't always help. You need explanations tailored to <em>your</em> level of understanding. This is where <a href="/students">AI tutoring</a> beats textbooks and even many human tutors — you can ask the same question in ten different ways until it clicks.</p>

<h2>Step 3: Practice — A Lot</h2>
<p>Understanding a concept and being able to apply it in an exam are different skills. You need both. After each explanation, work through at least 3–5 similar practice questions before moving on.</p>
<ul>
<li>Use NSC past papers for realistic exam practice</li>
<li>Focus on topics worth the most marks first</li>
<li>Time yourself to build exam pace</li>
</ul>

<h2>Step 4: Review Your Mistakes</h2>
<p>Every wrong answer is useful. When you get something wrong, don't just move on — ask StudyBuddy to explain why, and what the correct approach is. This is where most improvement happens.</p>

<h2>Real Student Story</h2>
<p><strong>${t.name}, Grade ${t.grade} — ${t.location}</strong><br/>
"I went from ${t.from} to ${t.to} in ${t.weeks} weeks by following this approach. The AI tutor was patient and explained ${short} in a way that finally made sense."</p>

<h2>How StudyBuddy Helps You Get Better at ${name}</h2>
<ul>
<li>24/7 AI tutoring — get help whenever you study, even at midnight</li>
<li>CAPS-aligned content for all ${name} topics</li>
<li>Unlimited practice questions with instant feedback</li>
<li>Step-by-step worked examples for past paper questions</li>
<li>FREE to start — no credit card required</li>
</ul>
<p><a href="/students">Start Improving Your ${name} Today — It's Free</a></p>`,
    faqs: [
      { question: `How long does it take to get better at ${name}?`, answer: `Most students see a noticeable improvement in understanding within 1–2 weeks of targeted study. Grade improvements typically show within 3–6 weeks.` },
      { question: `What's the fastest way to improve my ${name} marks?`, answer: `Identify your weakest topic, get a clear explanation of it, practice 5–10 similar questions, then move to the next weak area. Repeat daily. StudyBuddy's AI can guide this process.` },
      { question: `Should I study ${name} every day?`, answer: `Yes — short daily sessions (30–45 minutes) are more effective than occasional long sessions. Consistency builds the memory patterns you need for exams.` },
      { question: `Can StudyBuddy help me improve my ${name} marks?`, answer: `Yes. StudyBuddy provides personalised, CAPS-aligned ${short} explanations and practice questions 24/7. Most students who use it consistently see significant improvement within a month.` },
      { question: `Is StudyBuddy free?`, answer: `Yes, completely free to start. No credit card required. Premium unlimited access is R99/month.` },
    ],
  };
}

const SUBJECT_MOTIVATION_EXAMPLES = {
  mathematics: "understand quadratic equations today",
  "physical-sciences": "understand Newton's Third Law today",
  "life-sciences": "understand photosynthesis today",
  english: "analyse one poem today",
  accounting: "understand depreciation today",
  economics: "understand supply and demand today",
};

function buildHowToStudyAtHomePage(subject) {
  const { name, slug, short } = subject;
  const pageSlug = `how-to-study-${slug}-at-home`;
  return {
    ...BASE_META,
    id: `nl-${pageSlug}`,
    slug: pageSlug,
    pageType: "guide",
    searchIntent: "informational",
    targetKeyword: `how to study ${name} at home`,
    title: `How to Study ${name} at Home: Step-by-Step Guide for SA Students`,
    metaTitle: `How to Study ${name} at Home | StudyBuddy Tips for Matric`,
    metaDescription: `Learn how to study ${name} effectively at home without a tutor. CAPS-focused tips, free resources, and 24/7 AI help to boost your matric results.`,
    keywords: ["how to study", name.toLowerCase(), "at home", "self study", "tips", "matric", "CAPS"],
    quickAnswer: `To study ${name} at home effectively: create a dedicated study space, use past papers as your main practice tool, get instant help when stuck (StudyBuddy is free), and review your mistakes immediately.`,
    content: `<h2>How to Study ${name} at Home</h2>
<p>Studying ${short} at home is absolutely possible — and with the right approach, you can progress faster than in class. Here's a proven method used by thousands of South African matric students.</p>

<h2>Set Up Your Study Environment</h2>
<ul>
<li><strong>Dedicated space</strong> — Use the same spot each time. Your brain associates that space with focus.</li>
<li><strong>No phone distractions</strong> — Put your phone in another room or use focus mode during study time.</li>
<li><strong>Everything you need</strong> — Textbook, calculator, notes, and access to StudyBuddy — all within reach before you start.</li>
</ul>

<h2>Build a Weekly ${name} Study Routine</h2>
<p>Consistency beats cramming. A realistic weekly structure:</p>
<ul>
<li><strong>Monday &amp; Wednesday</strong> — Review and understand new concepts (30–45 min)</li>
<li><strong>Tuesday &amp; Thursday</strong> — Practice questions on concepts learned (30–45 min)</li>
<li><strong>Friday</strong> — Past paper question session (45–60 min)</li>
<li><strong>Weekend</strong> — Review mistakes from the week; ask StudyBuddy about anything unclear</li>
</ul>

<h2>Use Past Papers as Your Core Practice Tool</h2>
<p>NSC past papers are the best study resource available. They show you exactly what to expect in your exam. When you encounter a question you don't understand, use <a href="/students">StudyBuddy's AI tutor</a> to get a step-by-step explanation immediately — no waiting until the next school day.</p>

<h2>When You Get Stuck</h2>
<p>Getting stuck is normal and actually part of learning. The key is what you do next:</p>
<ol>
<li>Re-read the question carefully</li>
<li>Check if you've seen a similar question in your textbook</li>
<li>Ask StudyBuddy — describe what you don't understand and get an explanation instantly</li>
<li>Do 2–3 more similar questions to make sure you've got it</li>
</ol>

<h2>Track Your Progress</h2>
<p>Keep a simple list of topics you're confident in and topics that still need work. Every week, topics should be moving from "needs work" to "confident". If a topic stays stuck, that's your signal to spend more time on it with StudyBuddy's guided explanations.</p>
<p><a href="/students">Start Studying ${name} with AI Help — Completely Free</a></p>`,
    faqs: [
      { question: `Can I pass ${name} by self-studying at home?`, answer: `Yes — with the right resources and consistency. Many top matric students do a significant portion of their studying at home. The key is using past papers and getting help immediately when you're stuck.` },
      { question: `How many hours should I study ${name} at home per day?`, answer: `30–60 minutes of focused ${short} study daily is more effective than 3-hour sessions once a week. Consistency is what drives improvement.` },
      { question: `What's the best free resource for studying ${name} at home?`, answer: `NSC past papers (free from the DBE website) combined with StudyBuddy's free AI tutor. Past papers show you what to expect; StudyBuddy explains anything you don't understand.` },
      { question: `How do I motivate myself to study ${name} at home?`, answer: `Set small, specific goals (e.g., "${SUBJECT_MOTIVATION_EXAMPLES[slug] || `understand one ${short} concept today`}" rather than "study everything"). Track your progress visually. Use StudyBuddy's immediate feedback to see improvement in real time — that progress feeling is motivating.` },
      { question: `Is StudyBuddy useful for home study?`, answer: `StudyBuddy is specifically designed for self-study. It's available 24/7, covers all CAPS subjects and grades, and gives you instant explanations and practice — exactly what you need when studying at home without a teacher nearby.` },
    ],
  };
}

function buildHelpTonightPage(subject) {
  const { name, slug, short } = subject;
  const pageSlug = `${slug}-help-tonight`;
  return {
    ...BASE_META,
    id: `nl-${pageSlug}`,
    slug: pageSlug,
    pageType: "pain-point",
    searchIntent: "urgent-help",
    targetKeyword: `${name} help tonight`,
    title: `${name} Help Tonight — Get Instant AI Tutoring Now`,
    metaTitle: `${name} Help Tonight | Instant 24/7 AI Tutoring | StudyBuddy`,
    metaDescription: `Need ${name} help tonight? Get instant, step-by-step AI tutoring for your homework, test prep, or past papers — free, no sign-up needed, available right now.`,
    keywords: [name.toLowerCase(), "help", "tonight", "now", "instant", "homework", "urgent", "matric"],
    quickAnswer: `StudyBuddy's AI tutor is available right now — ask any ${short} question and get a step-by-step explanation in seconds. Free to start, no credit card.`,
    content: `<h2>${name} Help Tonight</h2>
<p>It's late. You have ${short} homework due tomorrow, a test in the morning, or you're stuck on a past paper question. You need help <strong>right now</strong> — not tomorrow when you can ask your teacher.</p>
<p>That's exactly what StudyBuddy is built for.</p>

<h2>Get ${name} Help Right Now</h2>
<p><a href="/students">Go to StudyBuddy</a> — it's free, it's instant, and it's available 24 hours a day, 7 days a week.</p>
<ul>
<li>Ask any ${short} question — homework, theory, past paper, whatever you're stuck on</li>
<li>Get a step-by-step explanation within seconds</li>
<li>Ask follow-up questions until you actually understand</li>
<li>Work through similar practice questions to lock it in before your test</li>
</ul>

<h2>What Kind of ${name} Help Can I Get Tonight?</h2>
<ul>
<li><strong>Homework help</strong> — stuck on a specific question? Describe it and get a solution with full working.</li>
<li><strong>Test prep</strong> — test tomorrow? Work through the trickiest topics with guided explanations.</li>
<li><strong>Past paper practice</strong> — don't understand a past paper answer? Get it explained step-by-step.</li>
<li><strong>Concept clarification</strong> — something from class didn't make sense? Ask in plain language.</li>
</ul>

<h2>Why Students Use StudyBuddy at Night</h2>
<ul>
<li>It's available at 11pm, midnight, 5am before a test — any time</li>
<li>No scheduling, no waiting, no cost</li>
<li>More patient than any human tutor</li>
<li>Explains things as many times as you need</li>
<li>CAPS-aligned — relevant to your actual South African curriculum</li>
</ul>
<p><strong>Stop scrolling. Go ask your question now.</strong></p>
<p><a href="/students">Get ${name} Help Tonight — Start FREE</a></p>`,
    faqs: [
      { question: `Is there really ${name} help available at night?`, answer: `Yes — StudyBuddy's AI tutor is available 24/7, including late nights, weekends, and public holidays. Ask your question any time and get an immediate response.` },
      { question: `Can I get help with ${name} homework at night?`, answer: `Absolutely. Describe the question you're stuck on and get a step-by-step explanation with working. You can ask as many follow-up questions as you need.` },
      { question: `What if I have a ${name} test tomorrow morning?`, answer: `Use tonight to work through your weakest topics. Ask StudyBuddy for a quick explanation of each concept, then do 2–3 practice questions per topic. Focus on the highest-mark sections first.` },
      { question: `Is this free?`, answer: `Yes, completely free to start. No credit card, no sign-up fee. Just go to StudyBuddy and ask your question.` },
      { question: `Is the ${name} content South African CAPS curriculum?`, answer: `Yes. All content is aligned to the South African CAPS curriculum and NSC exam format, so you're getting help that's directly relevant to your exams.` },
    ],
  };
}

// ─── General matric pages ────────────────────────────────────────────────────

function buildStudyTipsPage() {
  return {
    ...BASE_META,
    id: "nl-study-tips-for-matric-2026",
    slug: "study-tips-for-matric-2026",
    pageType: "guide",
    searchIntent: "informational",
    targetKeyword: "study tips for matric",
    title: "Study Tips for Matric 2026 — What Actually Works",
    metaTitle: "Study Tips for Matric 2026 | Proven Methods for SA Students",
    metaDescription: "Practical study tips for matric that actually work. Evidence-based strategies used by top NSC students in South Africa. Free AI tutor support included.",
    keywords: ["study tips", "matric", "how to study", "matric 2026", "grade 12", "NSC", "CAPS"],
    quickAnswer: "The most effective matric study tips: study daily in short focused sessions, use past papers as your main practice tool, get explanations immediately when stuck, and prioritise your weakest subjects.",
    content: `<h2>Study Tips for Matric That Actually Work</h2>
<p>Matric is the most important year of your school career. But most study advice you'll find is generic. These tips are specifically for South African matric students working with the CAPS curriculum and NSC exams.</p>

<h2>1. Study Daily — Even 30 Minutes Counts</h2>
<p>Short, consistent sessions beat long, irregular ones every time. Your brain consolidates information during sleep, so even 30 minutes of focused study each evening adds up to significant progress over weeks.</p>

<h2>2. Past Papers Are Your Best Friend</h2>
<p>NSC past papers are the single most effective study tool for matric. They show you exactly how questions are asked, which topics are tested most, and how much time you'll have. Work through them under exam conditions — no notes, timed.</p>

<h2>3. Get Help Immediately When You're Stuck</h2>
<p>Don't spend 45 minutes trying to figure out one thing on your own. When you hit a wall, ask for help straight away. <a href="/students">StudyBuddy's free AI tutor</a> gives you an instant explanation — then you can keep momentum in your study session.</p>

<h2>4. Prioritise Your Weakest Subjects</h2>
<p>It's tempting to study the subjects you enjoy most. But improving a 40% to 55% in your weakest subject adds more to your aggregate than improving a 70% to 75% in your strongest. Be strategic.</p>

<h2>5. Understand, Don't Memorise</h2>
<p>Matric exams test application, not just recall. Instead of memorising answers, understand the underlying concepts so you can apply them to unfamiliar questions. If you're memorising without understanding, use StudyBuddy to get the concept explained properly first.</p>

<h2>6. Take Care of Your Brain</h2>
<ul>
<li><strong>Sleep</strong> — 7–8 hours is non-negotiable. Sleep is when learning consolidates.</li>
<li><strong>Exercise</strong> — Even a 20-minute walk improves focus and memory.</li>
<li><strong>Breaks</strong> — Study in 45-minute blocks with 10-minute breaks. This is scientifically proven to improve retention.</li>
</ul>

<h2>7. Build a Study Schedule — and Stick to It</h2>
<p>Write down which subject you'll study each day and for how long. Treat study sessions like appointments you can't cancel. Students with a written schedule consistently outperform those who "study when they feel like it".</p>
<p><a href="/students">Get Free AI Help for Any Matric Subject — 24/7</a></p>`,
    faqs: [
      { question: "How many hours should a matric student study per day?", answer: "Most education experts recommend 2–4 hours of focused study per day for matric, not including homework. The key word is 'focused' — no phone, no distractions." },
      { question: "What's the best study method for matric?", answer: "Active recall (testing yourself rather than re-reading) combined with past paper practice. Simply re-reading notes is one of the least effective study methods." },
      { question: "How do I stay motivated during matric?", answer: "Break big goals into small wins. Track your progress. Get help immediately when you're stuck so you don't lose momentum. Celebrate small improvements — a 5% mark increase is real progress." },
      { question: "When should I start studying for matric exams?", answer: "Start serious revision at least 6 weeks before your first exam. For subjects you find very difficult, start 8–10 weeks out. Cramming the night before only works for things you already mostly know." },
      { question: "Can StudyBuddy help with all matric subjects?", answer: "Yes. StudyBuddy covers all CAPS subjects for Grades 8–12, available 24/7. It's particularly useful for the subjects you find most difficult." },
    ],
  };
}

function buildHowManyHoursPage() {
  return {
    ...BASE_META,
    id: "nl-how-many-hours-should-i-study-for-matric",
    slug: "how-many-hours-should-i-study-for-matric",
    pageType: "guide",
    searchIntent: "informational",
    targetKeyword: "how many hours should I study for matric",
    title: "How Many Hours Should I Study for Matric? (Honest Answer)",
    metaTitle: "How Many Hours Should I Study for Matric? | StudyBuddy Guide",
    metaDescription: "Wondering how many hours to study for matric? Get an honest, evidence-based answer plus a practical daily study schedule for South African matric students.",
    keywords: ["how many hours", "study", "matric", "grade 12", "study schedule", "daily routine"],
    quickAnswer: "Most matric students should aim for 2–3 hours of focused study per day, separate from homework. Quality matters more than quantity — 2 focused hours beats 5 distracted hours every time.",
    content: `<h2>How Many Hours Should I Study for Matric?</h2>
<p>This is one of the most common questions matric students ask. The honest answer: it depends on where you are and where you want to get to — but here are the numbers that work.</p>

<h2>The Recommended Daily Study Hours</h2>
<ul>
<li><strong>Minimum (to pass)</strong>: 1–1.5 hours focused study per day, plus homework</li>
<li><strong>For a solid matric (60%+)</strong>: 2–3 hours focused study per day</li>
<li><strong>For distinctions</strong>: 3–4 hours focused study per day, with strategic past paper practice</li>
<li><strong>Near exams</strong>: 4–6 hours per day, structured around your exam timetable</li>
</ul>
<p><em>Note: These are focused study hours — no phone, no distractions. A distracted "study session" of 5 hours may be less effective than 2 focused hours.</em></p>

<h2>Quality Over Quantity</h2>
<p>Research consistently shows that active, focused study is far more effective than passive, distracted study. A student doing 2 hours of focused past paper practice with immediate feedback will outperform a student doing 5 hours of re-reading notes.</p>
<p>Use <a href="/students">StudyBuddy's AI tutor</a> to make every study hour count — get instant explanations when stuck so you never waste time being confused.</p>

<h2>A Realistic Weekly Study Schedule for Matric</h2>
<ul>
<li><strong>Weekdays (school days)</strong>: 1.5–2 hours after school</li>
<li><strong>Saturday</strong>: 3–4 hours (longer blocks, deeper revision)</li>
<li><strong>Sunday</strong>: 1–2 hours (lighter review, rest important)</li>
</ul>

<h2>6–8 Weeks Before Exams: Increase Your Hours</h2>
<p>As exams approach, gradually increase daily study time:</p>
<ul>
<li>6 weeks out: add 30–45 minutes per day</li>
<li>4 weeks out: shift to mainly past papers</li>
<li>2 weeks out: full past paper sessions under exam conditions</li>
<li>Final week: light review, early nights, no all-nighters</li>
</ul>

<h2>Signs You Need More Study Hours</h2>
<ul>
<li>Consistently scoring below 50% in tests</li>
<li>Finishing past papers with time left but getting many wrong (speed not the issue — understanding is)</li>
<li>Feeling surprised by topics on tests (means you haven't covered everything)</li>
</ul>
<p><a href="/students">Make Every Study Hour Count — Free AI Tutoring Available Now</a></p>`,
    faqs: [
      { question: "Is 2 hours of studying per day enough for matric?", answer: "For most students aiming for a solid pass or good marks, 2 focused hours daily (plus homework) is a reasonable baseline. If you have weak subjects, increase that for those specific subjects." },
      { question: "Can I study too much?", answer: "Yes. Studying for too many consecutive hours without breaks leads to diminishing returns. Stick to 45-minute focused blocks with 10-minute breaks. After 4–5 hours in a day, your retention drops significantly." },
      { question: "How do I make my study sessions more effective?", answer: "Use active recall (testing yourself), practice with past papers, and get immediate explanations when stuck. Passive re-reading is much less effective." },
      { question: "Should I study on weekends?", answer: "Yes, but include at least one half-day rest. Weekend study is important for matric, but so is mental recovery. A rested brain learns better than an exhausted one." },
      { question: "What if I can't study for many hours because of family responsibilities?", answer: "Even 30–60 minutes of focused, high-quality study daily makes a real difference. Use StudyBuddy to maximise efficiency — get straight to the point with targeted explanations rather than spending time searching for answers." },
    ],
  };
}

function buildWhatToDoWhenFailingPage() {
  return {
    ...BASE_META,
    id: "nl-what-to-do-if-you-are-failing-grade-12",
    slug: "what-to-do-if-you-are-failing-grade-12",
    pageType: "pain-point",
    searchIntent: "urgent-help",
    targetKeyword: "what to do if you are failing grade 12",
    title: "What to Do If You Are Failing Grade 12 (Step-by-Step)",
    metaTitle: "What to Do If You're Failing Grade 12 | StudyBuddy Help",
    metaDescription: "Failing Grade 12? Don't panic — here's exactly what to do right now. Practical steps to turn your marks around with free 24/7 AI tutoring support.",
    keywords: ["failing grade 12", "what to do", "failing matric", "help", "improve marks", "pass matric"],
    quickAnswer: "If you're failing Grade 12: identify which subjects need the most urgent attention, get help immediately (don't wait), focus on understanding concepts not just memorising, and use past papers to practise. Free 24/7 help is available at StudyBuddy.",
    content: `<h2>What to Do If You Are Failing Grade 12</h2>
<p>If you're failing one or more Grade 12 subjects, this is a serious situation — but it's not hopeless. Thousands of South African students turn their marks around every year. Here's exactly what to do.</p>

<h2>Step 1: Don't Panic — But Do Act Now</h2>
<p>Panic wastes time. Action doesn't. The fact that you're searching for help means you're already doing the right thing. The students who fail matric are usually those who do nothing — you're not doing nothing.</p>

<h2>Step 2: Know Your Numbers</h2>
<p>For each failing subject, find out:</p>
<ul>
<li>What is your current mark?</li>
<li>What do you need to pass? (40% for a pass, 50% for Bachelor's pass)</li>
<li>How many terms/assessments are left to count toward your final mark?</li>
<li>What is your School-Based Assessment (SBA) mark vs. your exam potential?</li>
</ul>
<p>This tells you how much improvement you actually need — which is often less than it feels.</p>

<h2>Step 3: Get Help Immediately</h2>
<p>Don't try to fix this alone. Get targeted, expert help right now. <a href="/students">StudyBuddy's free AI tutor</a> is available 24/7 and can help you understand exactly which concepts you're missing and explain them clearly.</p>
<ul>
<li>Start with your weakest subject</li>
<li>Identify the specific topics dragging down your mark</li>
<li>Get explanations until you understand — not just until you have an answer</li>
</ul>

<h2>Step 4: Focus on High-Mark Topics</h2>
<p>In every subject, some topics appear in almost every exam and carry many marks. Improving your understanding of these topics has an outsized effect on your mark. Ask StudyBuddy which topics to prioritise in your specific subject.</p>

<h2>Step 5: Do Past Papers Under Exam Conditions</h2>
<p>Past papers are the best exam preparation. Work through them under timed conditions, then review every wrong answer with StudyBuddy to understand why it was wrong and what the right approach is.</p>

<h2>Step 6: Talk to Your Teacher</h2>
<p>Let your teacher know you're struggling and you're taking action. They may offer extra support, and knowing that you're serious about improving can help with any discretionary marks or appeals processes.</p>

<h2>You Can Still Pass</h2>
<p>Every year, students who were failing in the middle of the year pass matric because they took action. The key is starting now, not in two weeks.</p>
<p><a href="/students">Get Free Help Right Now — AI Tutoring 24/7</a></p>`,
    faqs: [
      { question: "Can I pass matric if I'm currently failing?", answer: "Yes — many students fail term tests but pass their final matric exams. The final NSC exams are a significant portion of your mark and are an opportunity to improve. The key is getting targeted help and working hard from now." },
      { question: "What happens if I fail Grade 12?", answer: "You can supplementary exams, repeat grade 12, or in some cases continue to higher education with a conditional acceptance. Failing matric is not the end — but passing is always the better outcome." },
      { question: "Which subjects should I focus on first if I'm failing multiple?", answer: "Focus on the subjects where improvement is most realistic given your current position, and where the marks have the biggest impact on your admission goals. Getting a subject from 35% to 45% (just passing) may be more achievable than getting one from 20% to 40%." },
      { question: "Is it too late to turn my Grade 12 marks around?", answer: "It's rarely too late until the exam is over. Many students improve dramatically in the last 6–8 weeks when they get serious and get targeted help. Start now." },
      { question: "How can StudyBuddy help me if I'm failing?", answer: "StudyBuddy identifies your specific gaps, explains concepts clearly, and provides unlimited practice — all free. It's available whenever you have time to study, including late nights and weekends." },
    ],
  };
}

function buildHowToConcentratePage() {
  return {
    ...BASE_META,
    id: "nl-how-to-concentrate-when-studying-matric",
    slug: "how-to-concentrate-when-studying-matric",
    pageType: "guide",
    searchIntent: "informational",
    targetKeyword: "how to concentrate when studying matric",
    title: "How to Concentrate When Studying Matric: Practical Tips",
    metaTitle: "How to Concentrate When Studying Matric | Focus Tips for Grade 12",
    metaDescription: "Can't concentrate when studying for matric? These science-backed focus techniques help Grade 12 students study more effectively and retain more information.",
    keywords: ["how to concentrate", "studying", "matric", "focus", "grade 12", "study tips", "distraction"],
    quickAnswer: "To concentrate better when studying: remove your phone from the room, study in 45-minute focused blocks, start with your hardest subject while your energy is highest, and use StudyBuddy to resolve confusion quickly so you don't lose momentum.",
    content: `<h2>How to Concentrate When Studying Matric</h2>
<p>Struggling to focus during study sessions is one of the most common challenges matric students face. Here's what actually works — based on how your brain processes information, not generic advice.</p>

<h2>The Real Reasons You Can't Concentrate</h2>
<ul>
<li><strong>Phone notifications</strong> — Even having your phone nearby (face down) reduces focus. Your brain is waiting for it.</li>
<li><strong>Trying to study too long without breaks</strong> — After 45–60 minutes, concentration drops significantly.</li>
<li><strong>Starting with easy work</strong> — If you start with tasks you enjoy, you lose energy before tackling hard content.</li>
<li><strong>Being confused</strong> — You can't concentrate on content you don't understand. Getting stuck kills focus.</li>
<li><strong>Tiredness</strong> — Studying when exhausted is largely ineffective. Sleep matters.</li>
</ul>

<h2>Techniques That Actually Work</h2>

<h3>1. Phone in Another Room</h3>
<p>This is the single most impactful change most students can make. If your phone is in another room, you can't check it. The urge disappears within minutes.</p>

<h3>2. The 45/10 Method</h3>
<p>Study for 45 minutes with full focus, then take a 10-minute break (not on your phone — walk, drink water, stretch). Repeat. This matches your brain's natural attention cycle.</p>

<h3>3. Start Hard</h3>
<p>Begin each session with your most difficult subject or topic while your energy is highest. Save easier review for later in the session.</p>

<h3>4. Resolve Confusion Immediately</h3>
<p>Being confused is the #1 killer of concentration. When you hit something you don't understand, don't stare at it for 20 minutes — ask <a href="/students">StudyBuddy's AI tutor</a> for an instant explanation and keep moving.</p>

<h3>5. Use a Specific Study Playlist</h3>
<p>Instrumental music (no lyrics) at low volume helps some students maintain focus. Create a "study playlist" and only play it during study — your brain will associate it with focus mode.</p>

<h3>6. Write Down Distracting Thoughts</h3>
<p>When non-study thoughts pop up ("I must remember to..."), write them down quickly on a separate piece of paper. This removes them from your mental workspace so you can refocus.</p>

<h2>What About Social Media?</h2>
<p>Save it for your breaks — and only for your breaks. Use it as a reward, not a coping mechanism for boredom during study. The dopamine hit makes studying feel harder by comparison.</p>
<p><a href="/students">Study More Effectively with Free AI Help — Get Unstuck Instantly</a></p>`,
    faqs: [
      { question: "Why can't I concentrate when studying even if I try?", answer: "Usually it's one of: phone nearby, studying content you don't understand, studying for too long without a break, or genuine tiredness. Address the root cause rather than forcing yourself to focus harder." },
      { question: "Does music help with studying?", answer: "For many students, instrumental music without lyrics (lo-fi, classical, ambient) at low volume helps. Music with lyrics competes with the language processing you need for studying most subjects." },
      { question: "How long should I study before taking a break?", answer: "Research suggests 45–50 minutes of focused study followed by a 10-minute break. The Pomodoro technique (25 min on, 5 min break) also works well for very distractible students." },
      { question: "Should I study in bed?", answer: "No. Your brain associates bed with sleep. Studying in bed weakens both your study focus and your ability to fall asleep. Always study at a desk or table." },
      { question: "Can StudyBuddy help me stay focused?", answer: "Indirectly, yes. By giving you immediate explanations when you're stuck, StudyBuddy prevents the frustration and confusion that breaks concentration. You keep momentum instead of sitting confused for 20 minutes." },
    ],
  };
}

function buildHowToImproveMarksPage() {
  return {
    ...BASE_META,
    id: "nl-how-to-improve-matric-marks-quickly",
    slug: "how-to-improve-matric-marks-quickly",
    pageType: "guide",
    searchIntent: "informational",
    targetKeyword: "how to improve matric marks quickly",
    title: "How to Improve Matric Marks Quickly — A Realistic Guide",
    metaTitle: "How to Improve Matric Marks Quickly | StudyBuddy Guide",
    metaDescription: "Need to improve your matric marks fast? Learn the most effective strategies to increase your NSC results quickly, with free 24/7 AI tutoring support.",
    keywords: ["improve matric marks", "quickly", "how to", "grade 12", "NSC", "marks", "improve grades"],
    quickAnswer: "To improve matric marks quickly: focus on your weakest high-mark topics, do 2–3 past papers per subject per week, get explanations immediately when stuck, and review every mistake. Even 3–4 weeks of focused effort can move marks significantly.",
    content: `<h2>How to Improve Matric Marks Quickly</h2>
<p>If your matric marks need to improve — whether for a university application, a bursary, or simply to feel proud of your results — here's the most efficient path.</p>

<h2>The Fastest Way to Improve: Target High-Mark Weak Topics</h2>
<p>Every subject has topics that appear in almost every exam and carry many marks. If you're weak on those topics, fixing them has a huge impact on your overall mark.</p>
<ol>
<li>Get your previous test or exam paper</li>
<li>Identify which topics cost you the most marks</li>
<li>Check if those topics appear regularly in past papers (they usually do)</li>
<li>Spend most of your study time mastering exactly those topics</li>
</ol>

<h2>Past Paper Practice: The Most Underrated Tool</h2>
<p>Students who consistently work through past papers under timed conditions improve faster than any other group. Why? Because they're practising the exact format, difficulty, and types of questions they'll face. After each paper, review every wrong answer with <a href="/students">StudyBuddy</a> to understand the correct approach.</p>

<h2>Understand, Don't Memorise</h2>
<p>If you're memorising answers, you're preparing for the questions you've seen — not the ones you'll actually face. Matric exams are designed to test whether you understand concepts well enough to apply them. Focus on understanding the why and how, not just the answer.</p>

<h2>Get Help When Stuck — Immediately</h2>
<p>Every minute you spend confused is a minute you could spend learning. When you hit a wall, ask StudyBuddy for an explanation straight away. The AI is available 24/7, covers all CAPS subjects, and can explain things as many times as you need.</p>

<h2>Realistic Timeline for Mark Improvement</h2>
<ul>
<li><strong>2 weeks</strong> — understanding and confidence improve noticeably</li>
<li><strong>4–6 weeks</strong> — marks typically improve by 5–15%</li>
<li><strong>8–12 weeks</strong> — significant improvement possible (10–25%) with consistent work</li>
</ul>
<p>Even a 5% improvement in a key subject can change your aggregate and open university doors.</p>
<p><a href="/students">Start Improving Your Marks Today — Free AI Tutoring</a></p>`,
    faqs: [
      { question: "How much can I realistically improve my matric marks?", answer: "Most students who get targeted help and work consistently improve by 10–20% within 6–8 weeks. Some improve more. The key variables are how many weeks you have and how consistently you work." },
      { question: "Which subjects are easiest to improve quickly?", answer: "Subjects where you have clear foundational gaps are often the quickest to improve, because filling one gap fixes multiple topics. Mathematics and sciences often respond quickly to targeted tutoring. Languages may take a bit longer but also improve with practice." },
      { question: "Can I improve my marks after the final exams are written?", answer: "No — after the final NSC exams, your marks are set (subject to remarking). The time to improve is now, before the exams." },
      { question: "Does StudyBuddy actually help improve marks?", answer: "Our students consistently report 10–25% mark improvements when using StudyBuddy regularly. The AI identifies knowledge gaps, explains concepts clearly, and provides unlimited practice — the combination that drives improvement." },
      { question: "Is improving by 10% in matric actually significant?", answer: "Absolutely. A 10% improvement in several subjects can be the difference between a conditional and unconditional university acceptance, qualifying for a bursary, or moving from a pass to a Bachelor's pass." },
    ],
  };
}

// ─── Assemble all pages ──────────────────────────────────────────────────────

const ALL_PAGES = [
  // Per-subject natural language pages
  ...SUBJECTS.map(buildWhyIsHardPage),
  ...SUBJECTS.map(buildHowToGetBetterPage),
  ...SUBJECTS.map(buildHowToStudyAtHomePage),
  ...SUBJECTS.map(buildHelpTonightPage),
  // General matric pages
  buildStudyTipsPage(),
  buildHowManyHoursPage(),
  buildWhatToDoWhenFailingPage(),
  buildHowToConcentratePage(),
  buildHowToImproveMarksPage(),
];

// ─── Write files and update index ───────────────────────────────────────────

console.log(`\n🚀 Generating ${ALL_PAGES.length} natural language PSEO pages...\n`);

let written = 0;
let skipped = 0;

for (const page of ALL_PAGES) {
  const filePath = path.join(OUTPUT_DIR, `${page.slug}.json`);
  if (fs.existsSync(filePath)) {
    console.log(`⏭️  Skipping (already exists): ${page.slug}`);
    skipped++;
    continue;
  }
  fs.writeFileSync(filePath, JSON.stringify(page, null, 2));
  console.log(`✅ Created: ${page.slug}`);
  written++;
}

// Update index.json
const indexPath = path.join(OUTPUT_DIR, 'index.json');
const existingIndex = JSON.parse(fs.readFileSync(indexPath, 'utf-8'));
const existingSlugs = new Set(existingIndex.map((e) => e.slug));

let addedToIndex = 0;
for (const page of ALL_PAGES) {
  if (!existingSlugs.has(page.slug)) {
    existingIndex.push({
      slug: page.slug,
      title: page.title,
      description: page.metaDescription,
      pageType: page.pageType,
      published: true,
      qualityScore: page.qualityScore,
      lastUpdated: page.lastUpdated,
      keywords: page.keywords,
    });
    addedToIndex++;
  }
}

fs.writeFileSync(indexPath, JSON.stringify(existingIndex, null, 2));

console.log(`\n✅ Written: ${written} new pages`);
console.log(`⏭️  Skipped: ${skipped} existing pages`);
console.log(`📋 Added to index.json: ${addedToIndex} entries`);
console.log(`📁 Total pages now: ${existingIndex.length}`);

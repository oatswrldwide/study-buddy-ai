/**
 * Target pages for pSEO generation
 * 
 * Total: ~350 pages
 * - 50 subject pages (10 subjects × 5 grades)
 * - 54 location pages (9 provinces × 3 cities × 2 markets)
 * - 200 combined pages (top combinations)
 * - 20 comparison pages
 */

export const subjects = [
  'Mathematics',
  'Physical Sciences',
  'Life Sciences',
  'English',
  'Afrikaans',
  'Accounting',
  'Business Studies',
  'Economics',
  'History',
  'Geography',
];

export const grades = ['8', '9', '10', '11', '12'];

export const locations = {
  'Gauteng': ['Johannesburg', 'Pretoria', 'Centurion'],
  'Western Cape': ['Cape Town', 'Stellenbosch', 'Paarl'],
  'KwaZulu-Natal': ['Durban', 'Pietermaritzburg', 'Ballito'],
  'Eastern Cape': ['Port Elizabeth', 'East London', 'Grahamstown'],
  'Free State': ['Bloemfontein', 'Welkom', 'Bethlehem'],
  'Limpopo': ['Polokwane', 'Tzaneen', 'Mokopane'],
  'Mpumalanga': ['Nelspruit', 'Witbank', 'Middelburg'],
  'North West': ['Rustenburg', 'Mahikeng', 'Potchefstroom'],
  'Northern Cape': ['Kimberley', 'Upington', 'Kuruman'],
};

export const topSchools = [
  { name: 'Parktown High School', city: 'Johannesburg', province: 'Gauteng' },
  { name: 'Bishops', city: 'Cape Town', province: 'Western Cape' },
  { name: 'Rondebosch Boys High', city: 'Cape Town', province: 'Western Cape' },
  { name: 'Durban Girls High', city: 'Durban', province: 'KwaZulu-Natal' },
  { name: 'St Johns College', city: 'Johannesburg', province: 'Gauteng' },
  { name: 'Hilton College', city: 'Hilton', province: 'KwaZulu-Natal' },
  { name: 'St Marys', city: 'Johannesburg', province: 'Gauteng' },
  { name: 'Roedean School', city: 'Johannesburg', province: 'Gauteng' },
  { name: 'St Stithians', city: 'Johannesburg', province: 'Gauteng' },
  { name: 'Kearsney College', city: 'Durban', province: 'KwaZulu-Natal' },
];

export const comparisonTopics = [
  'AI Tutor vs Private Tutor South Africa',
  'StudyBuddy vs Master Maths',
  'Online Tutoring vs In-Person Tutoring',
  'Best Matric Exam Prep Apps',
  'CAPS vs IEB Curriculum',
  'Free Study Resources vs Paid Tutoring',
  'AI Math Tutor Comparison',
  'Best Grade 12 Study Apps',
  'Affordable Tutoring Options South Africa',
  'University Prep Tutoring Services',
];

/**
 * SEO keywords by search intent
 */
export const keywordTargets = {
  highIntent: [
    'ai tutor south africa',
    'online tutor [location]',
    'grade [X] [subject] tutor',
    'matric exam prep',
    'caps tutoring online',
  ],
  mediumIntent: [
    'how to pass grade [X] [subject]',
    'best online tutoring south africa',
    '[subject] study guide grade [X]',
    'matric study help',
  ],
  informational: [
    'what is ai tutoring',
    'how does online tutoring work',
    'caps curriculum explained',
    'matric pass requirements',
  ],
};

/**
 * Content update priorities
 */
export const updateSchedule = {
  quarterly: ['subject pages', 'location pages', 'comparison pages'],
  biannually: ['school pages', 'topic guides'],
  annually: ['long-tail pages', 'resource pages'],
};

/**
 * Internal linking strategy
 */
export const linkingRules = {
  maxLinksPerPage: 5,
  linkTargets: [
    { from: 'subject pages', to: 'grade-specific pages', priority: 'high' },
    { from: 'location pages', to: 'subject pages', priority: 'medium' },
    { from: 'comparison pages', to: 'pricing page', priority: 'high' },
    { from: 'all pages', to: 'signup', priority: 'critical' },
  ],
};

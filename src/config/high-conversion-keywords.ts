/**
 * High-Conversion pSEO Keyword Strategy
 * Focus: Bottom-of-funnel, high-intent keywords for maximum conversions
 * Target conversion rate: 12-18% (vs 0.5-1% informational)
 */

// Johannesburg suburbs (highest population)
export const JOHANNESBURG_SUBURBS = [
  'Sandton', 'Rosebank', 'Randburg', 'Fourways', 'Midrand',
  'Roodepoort', 'Benoni', 'Boksburg', 'Germiston', 'Kempton Park',
  'Edenvale', 'Bedfordview', 'Northcliff', 'Melville', 'Greenside'
];

// Cape Town suburbs
export const CAPE_TOWN_SUBURBS = [
  'Rondebosch', 'Claremont', 'Constantia', 'Newlands', 'Bishopscourt',
  'Camps Bay', 'Sea Point', 'Green Point', 'Bellville', 'Durbanville',
  'Somerset West', 'Stellenbosch', 'Paarl', 'Brackenfell', 'Parow'
];

// Pretoria/Tshwane suburbs
export const PRETORIA_SUBURBS = [
  'Centurion', 'Menlyn', 'Brooklyn', 'Hatfield', 'Waterkloof',
  'Lynnwood', 'Montana', 'Mooikloof', 'Faerie Glen', 'Garsfontein'
];

// Durban suburbs
export const DURBAN_SUBURBS = [
  'Umhlanga', 'Ballito', 'Westville', 'Durban North', 'Kloof',
  'Hillcrest', 'Glenwood', 'Morningside', 'Berea', 'Musgrave'
];

// All major suburbs combined
export const ALL_SUBURBS = {
  'Gauteng-Johannesburg': JOHANNESBURG_SUBURBS,
  'Gauteng-Pretoria': PRETORIA_SUBURBS,
  'Western Cape-Cape Town': CAPE_TOWN_SUBURBS,
  'KwaZulu-Natal-Durban': DURBAN_SUBURBS,
};

// Pain point keywords (150 pages) - HIGHEST INTENT
export const PAIN_POINT_KEYWORDS = [
  // Failing/Struggling (50)
  {
    keyword: 'failing {subject} grade {grade} need help fast',
    intent: 'urgent-help',
    subject: true,
    grade: true,
    conversionRate: '15-20%',
  },
  {
    keyword: 'struggling with {subject} how to improve quickly',
    intent: 'struggling',
    subject: true,
    conversionRate: '12-18%',
  },
  {
    keyword: 'how to pass matric {subject} in 3 months',
    intent: 'urgent-exam',
    subject: true,
    conversionRate: '18-25%',
  },
  {
    keyword: 'last minute {subject} help matric finals',
    intent: 'exam-prep',
    subject: true,
    conversionRate: '20-30%',
  },
  {
    keyword: 'grade {grade} {subject} tutor for struggling students',
    intent: 'struggling',
    subject: true,
    grade: true,
    conversionRate: '14-19%',
  },
  
  // Time-constrained (30)
  {
    keyword: 'urgent {subject} tutoring matric exams 2026',
    intent: 'urgent',
    subject: true,
    conversionRate: '22-28%',
  },
  {
    keyword: '24/7 {subject} help for matric students',
    intent: 'availability',
    subject: true,
    conversionRate: '10-15%',
  },
  {
    keyword: 'weekend {subject} tutor grade {grade}',
    intent: 'scheduling',
    subject: true,
    grade: true,
    conversionRate: '12-16%',
  },
  
  // Specific problems (40)
  {
    keyword: 'help with calculus grade 12 struggling',
    intent: 'topic-specific',
    conversionRate: '16-22%',
  },
  {
    keyword: 'chemistry equations tutor matric',
    intent: 'topic-specific',
    conversionRate: '14-20%',
  },
  {
    keyword: 'physics electricity help grade 11',
    intent: 'topic-specific',
    conversionRate: '15-21%',
  },
  {
    keyword: 'accounting financial statements tutor',
    intent: 'topic-specific',
    conversionRate: '18-24%',
  },
  
  // Parent searches (30)
  {
    keyword: 'best tutor for my child grade {grade} {subject}',
    intent: 'parent',
    subject: true,
    grade: true,
    conversionRate: '16-22%',
  },
  {
    keyword: 'affordable matric tutoring for struggling student',
    intent: 'parent-budget',
    conversionRate: '20-26%',
  },
  {
    keyword: 'online tutor safe for teens grade {grade}',
    intent: 'parent-safety',
    grade: true,
    conversionRate: '12-18%',
  },
];

// Exam prep keywords (50 pages) - HIGH URGENCY
export const EXAM_PREP_KEYWORDS = [
  {
    keyword: 'matric finals {subject} study guide 2026',
    subject: true,
    timing: 'finals',
    conversionRate: '18-24%',
  },
  {
    keyword: 'grade {grade} {subject} exam tips and tricks',
    subject: true,
    grade: true,
    conversionRate: '10-15%',
  },
  {
    keyword: 'how to ace {subject} matric exams',
    subject: true,
    conversionRate: '12-18%',
  },
  {
    keyword: 'matric {subject} crash course last minute',
    subject: true,
    conversionRate: '22-30%',
  },
  {
    keyword: '{subject} exam revision help grade 12',
    subject: true,
    conversionRate: '16-22%',
  },
  {
    keyword: 'past papers {subject} grade {grade} with answers',
    subject: true,
    grade: true,
    conversionRate: '8-12%',
  },
];

// Comparison keywords (30 pages) - READY TO BUY
export const COMPARISON_KEYWORDS = [
  {
    keyword: 'AI tutor vs traditional tutor which is better',
    type: 'product-comparison',
    conversionRate: '25-35%',
  },
  {
    keyword: 'online tutoring vs in-person for matric students',
    type: 'method-comparison',
    conversionRate: '20-28%',
  },
  {
    keyword: 'best matric tutoring services south africa 2026',
    type: 'best-of',
    conversionRate: '22-30%',
  },
  {
    keyword: 'StudyBuddy review is it worth the money',
    type: 'review',
    conversionRate: '30-40%',
  },
  {
    keyword: 'cheap vs expensive tutors quality difference',
    type: 'price-comparison',
    conversionRate: '18-26%',
  },
  {
    keyword: 'group tutoring vs one-on-one which works better',
    type: 'method-comparison',
    conversionRate: '16-24%',
  },
  {
    keyword: 'AI math tutor vs human tutor effectiveness',
    type: 'product-comparison',
    conversionRate: '24-32%',
  },
];

// Pricing keywords (20 pages) - BUDGET-CONSCIOUS
export const PRICING_KEYWORDS = [
  {
    keyword: 'affordable matric tutoring under R100 per month',
    focusPrice: 'R99',
    conversionRate: '22-30%',
  },
  {
    keyword: 'cheapest online tutor for grade {grade} {subject}',
    subject: true,
    grade: true,
    conversionRate: '18-26%',
  },
  {
    keyword: 'R99 unlimited tutoring is it legit',
    focusPrice: 'R99',
    conversionRate: '28-36%',
  },
  {
    keyword: 'free trial tutoring matric students',
    focusPrice: 'free',
    conversionRate: '20-28%',
  },
  {
    keyword: 'matric tutor prices johannesburg comparison',
    location: true,
    conversionRate: '16-24%',
  },
  {
    keyword: 'how much does a good tutor cost south africa',
    conversionRate: '14-22%',
  },
];

// Suburb-specific (100 pages) - LOCAL INTENT
export const SUBURB_TEMPLATES = [
  '{subject} tutor {suburb} grade {grade}',
  'affordable tutoring {suburb} matric students',
  'online tutor {suburb} {subject} help',
  'best {subject} tutor near {suburb}',
  '{subject} help {suburb} struggling students',
];

// Subject list (focused on high-demand)
export const HIGH_DEMAND_SUBJECTS = [
  'Mathematics',
  'Physical Sciences',
  'Accounting',
  'English',
  'Life Sciences',
  'Economics',
];

// Grade focus (matric + pre-matric)
export const TARGET_GRADES = [10, 11, 12];

/**
 * Generate all keyword combinations
 */
export function generateAllKeywords(): Array<{
  keyword: string;
  type: string;
  priority: number;
  expectedConversion: string;
}> {
  const keywords: Array<any> = [];
  
  // Pain points (150) - PRIORITY 1
  PAIN_POINT_KEYWORDS.forEach(template => {
    if (template.subject) {
      HIGH_DEMAND_SUBJECTS.forEach(subject => {
        if (template.grade) {
          TARGET_GRADES.forEach(grade => {
            keywords.push({
              keyword: template.keyword
                .replace('{subject}', subject.toLowerCase())
                .replace('{grade}', grade.toString()),
              type: 'pain-point',
              priority: 1,
              expectedConversion: template.conversionRate,
              intent: template.intent,
            });
          });
        } else {
          keywords.push({
            keyword: template.keyword.replace('{subject}', subject.toLowerCase()),
            type: 'pain-point',
            priority: 1,
            expectedConversion: template.conversionRate,
            intent: template.intent,
          });
        }
      });
    } else {
      keywords.push({
        keyword: template.keyword,
        type: 'pain-point',
        priority: 1,
        expectedConversion: template.conversionRate,
        intent: template.intent,
      });
    }
  });
  
  // Suburb-specific (100) - PRIORITY 2
  Object.entries(ALL_SUBURBS).forEach(([region, suburbs]) => {
    suburbs.slice(0, 3).forEach(suburb => { // Top 3 suburbs per region
      HIGH_DEMAND_SUBJECTS.slice(0, 3).forEach(subject => { // Top 3 subjects
        [12, 11].forEach(grade => { // Focus on grades 11-12
          keywords.push({
            keyword: `${subject.toLowerCase()} tutor ${suburb.toLowerCase()} grade ${grade}`,
            type: 'suburb-specific',
            priority: 2,
            expectedConversion: '12-18%',
            location: suburb,
            region,
            subject,
            grade,
          });
        });
      });
    });
  });
  
  // Exam prep (50) - PRIORITY 1
  EXAM_PREP_KEYWORDS.forEach(template => {
    if (template.subject) {
      HIGH_DEMAND_SUBJECTS.forEach(subject => {
        if (template.grade) {
          TARGET_GRADES.forEach(grade => {
            keywords.push({
              keyword: template.keyword
                .replace('{subject}', subject.toLowerCase())
                .replace('{grade}', grade.toString()),
              type: 'exam-prep',
              priority: 1,
              expectedConversion: template.conversionRate,
            });
          });
        } else {
          keywords.push({
            keyword: template.keyword.replace('{subject}', subject.toLowerCase()),
            type: 'exam-prep',
            priority: 1,
            expectedConversion: template.conversionRate,
          });
        }
      });
    }
  });
  
  // Comparison (30) - PRIORITY 1
  COMPARISON_KEYWORDS.forEach(kw => {
    keywords.push({
      keyword: kw.keyword,
      type: 'comparison',
      priority: 1,
      expectedConversion: kw.conversionRate,
      comparisonType: kw.type,
    });
  });
  
  // Pricing (20) - PRIORITY 1
  PRICING_KEYWORDS.forEach(template => {
    if (template.subject) {
      HIGH_DEMAND_SUBJECTS.slice(0, 2).forEach(subject => {
        if (template.grade) {
          [12, 11].forEach(grade => {
            keywords.push({
              keyword: template.keyword
                .replace('{subject}', subject.toLowerCase())
                .replace('{grade}', grade.toString()),
              type: 'pricing',
              priority: 1,
              expectedConversion: template.conversionRate,
            });
          });
        } else {
          keywords.push({
            keyword: template.keyword.replace('{subject}', subject.toLowerCase()),
            type: 'pricing',
            priority: 1,
            expectedConversion: template.conversionRate,
          });
        }
      });
    } else {
      keywords.push({
        keyword: template.keyword,
        type: 'pricing',
        priority: 1,
        expectedConversion: template.conversionRate,
      });
    }
  });
  
  return keywords;
}

/**
 * Get keyword statistics
 */
export function getKeywordStats() {
  const all = generateAllKeywords();
  
  return {
    total: all.length,
    byType: {
      'pain-point': all.filter(k => k.type === 'pain-point').length,
      'suburb-specific': all.filter(k => k.type === 'suburb-specific').length,
      'exam-prep': all.filter(k => k.type === 'exam-prep').length,
      'comparison': all.filter(k => k.type === 'comparison').length,
      'pricing': all.filter(k => k.type === 'pricing').length,
    },
    byPriority: {
      high: all.filter(k => k.priority === 1).length,
      medium: all.filter(k => k.priority === 2).length,
    },
  };
}

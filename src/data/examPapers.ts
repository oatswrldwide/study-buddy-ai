/**
 * Exam Papers Data Utilities
 * Provides access to past NSC exam papers and memorandums
 */

export interface ExamPaper {
  year: number;
  session: string;
  grade: number;
  subject: string;
  paper_number: number;
  language: string;
  paper_type: 'exam' | 'memo';
  file_url: string;
  file_name: string;
  file_size: number;
  downloaded: boolean;
  local_path: string;
}

export interface ExamSubjectGroup {
  subject: string;
  papers: ExamPaper[];
  latestYear: number;
  paperCount: number;
}

let examPapersCache: ExamPaper[] | null = null;

/**
 * Load all exam papers from the index
 */
export async function loadExamPapers(): Promise<ExamPaper[]> {
  if (examPapersCache) {
    return examPapersCache;
  }

  try {
    const response = await fetch('/exam-papers/exam_papers_index.json');
    if (!response.ok) {
      console.error('Failed to load exam papers index');
      return [];
    }
    
    const data = await response.json();
    examPapersCache = data;
    return data;
  } catch (error) {
    console.error('Error loading exam papers:', error);
    return [];
  }
}

/**
 * Get popular subjects (most commonly tutored)
 */
export const POPULAR_SUBJECTS = [
  'Mathematics',
  'Physical Sciences',
  'Life Sciences',
  'Accounting',
  'English',
  'Afrikaans',
  'Business Studies',
  'Economics',
  'Geography',
  'History'
];

/**
 * Normalize subject names (handle variations in the data)
 */
export function normalizeSubjectName(subject: string): string {
  const normalized = subject.trim();
  
  // Handle common variations
  if (normalized.includes('Maths') || normalized.includes('Math')) return 'Mathematics';
  if (normalized.includes('Physical Science')) return 'Physical Sciences';
  if (normalized.includes('Life Science')) return 'Life Sciences';
  if (normalized.includes('Agricultural Science')) return 'Agricultural Sciences';
  if (normalized.includes('Computer Application')) return 'Computer Applications Technology';
  
  return normalized;
}

/**
 * Group exam papers by subject
 */
export function groupExamsBySubject(papers: ExamPaper[]): ExamSubjectGroup[] {
  const subjectMap = new Map<string, ExamPaper[]>();

  papers.forEach(paper => {
    const normalizedSubject = normalizeSubjectName(paper.subject);
    
    if (!subjectMap.has(normalizedSubject)) {
      subjectMap.set(normalizedSubject, []);
    }
    subjectMap.get(normalizedSubject)!.push(paper);
  });

  const groups: ExamSubjectGroup[] = [];
  
  subjectMap.forEach((papers, subject) => {
    const latestYear = Math.max(...papers.map(p => p.year));
    groups.push({
      subject,
      papers,
      latestYear,
      paperCount: papers.length
    });
  });

  // Sort by popularity (using POPULAR_SUBJECTS order) then by name
  return groups.sort((a, b) => {
    const aIndex = POPULAR_SUBJECTS.indexOf(a.subject);
    const bIndex = POPULAR_SUBJECTS.indexOf(b.subject);
    
    if (aIndex !== -1 && bIndex !== -1) {
      return aIndex - bIndex;
    }
    if (aIndex !== -1) return -1;
    if (bIndex !== -1) return 1;
    
    return a.subject.localeCompare(b.subject);
  });
}

/**
 * Get exam papers for popular subjects
 */
export async function getPopularSubjectExams(limit: number = 6): Promise<ExamSubjectGroup[]> {
  const allPapers = await loadExamPapers();
  const grouped = groupExamsBySubject(allPapers);
  
  // Filter to only Grade 12 papers for display
  const grade12Groups = grouped.map(group => ({
    ...group,
    papers: group.papers.filter(p => p.grade === 12)
  })).filter(group => group.papers.length > 0);
  
  // Return only popular subjects
  return grade12Groups
    .filter(group => POPULAR_SUBJECTS.includes(group.subject))
    .slice(0, limit);
}

/**
 * Get latest exam papers for a specific subject
 */
export async function getSubjectExams(subjectName: string, grade: number = 12): Promise<ExamPaper[]> {
  const allPapers = await loadExamPapers();
  const normalized = normalizeSubjectName(subjectName);
  
  return allPapers
    .filter(p => normalizeSubjectName(p.subject) === normalized && p.grade === grade)
    .sort((a, b) => b.year - a.year);
}

/**
 * Get exam statistics
 */
export async function getExamStats() {
  const papers = await loadExamPapers();
  const subjects = new Set(papers.map(p => normalizeSubjectName(p.subject)));
  const years = new Set(papers.map(p => p.year));
  
  return {
    totalPapers: papers.length,
    totalSubjects: subjects.size,
    years: Array.from(years).sort((a, b) => b - a),
    latestYear: Math.max(...Array.from(years))
  };
}

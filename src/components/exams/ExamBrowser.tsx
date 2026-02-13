/**
 * Exam Browser Component
 * Allows signed-in users to browse, search, and download NSC exam papers
 */

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  FileText, 
  Download, 
  Search, 
  Filter,
  BookOpen,
  Calendar,
  MessageSquare
} from "lucide-react";
import { 
  loadExamPapers, 
  groupExamsBySubject, 
  POPULAR_SUBJECTS,
  type ExamPaper,
  type ExamSubjectGroup 
} from "@/data/examPapers";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ExamBrowserProps {
  onChatWithExam?: (exam: ExamPaper) => void;
  selectedGrade?: number;
}

export default function ExamBrowser({ onChatWithExam, selectedGrade }: ExamBrowserProps) {
  const [allPapers, setAllPapers] = useState<ExamPaper[]>([]);
  const [filteredGroups, setFilteredGroups] = useState<ExamSubjectGroup[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubject, setSelectedSubject] = useState<string>("all");
  const [selectedYear, setSelectedYear] = useState<string>("all");
  const [selectedSession, setSelectedSession] = useState<string>("all");
  const [gradeFilter, setGradeFilter] = useState<number>(selectedGrade || 12);
  const [loading, setLoading] = useState(true);

  // Load exam papers on mount
  useEffect(() => {
    loadExamPapers().then(papers => {
      setAllPapers(papers);
      applyFilters(papers, searchQuery, selectedSubject, selectedYear, selectedSession, gradeFilter);
      setLoading(false);
    }).catch(err => {
      console.error('Failed to load exam papers:', err);
      setLoading(false);
    });
  }, []);

  // Apply filters whenever they change
  useEffect(() => {
    applyFilters(allPapers, searchQuery, selectedSubject, selectedYear, selectedSession, gradeFilter);
  }, [searchQuery, selectedSubject, selectedYear, selectedSession, gradeFilter]);

  const applyFilters = (
    papers: ExamPaper[], 
    search: string, 
    subject: string, 
    year: string,
    session: string,
    grade: number
  ) => {
    let filtered = papers.filter(p => p.grade === grade);

    // Subject filter
    if (subject !== "all") {
      filtered = filtered.filter(p => 
        p.subject.toLowerCase().includes(subject.toLowerCase())
      );
    }

    // Year filter
    if (year !== "all") {
      filtered = filtered.filter(p => p.year.toString() === year);
    }

    // Session filter
    if (session !== "all") {
      filtered = filtered.filter(p => p.session === session);
    }

    // Search filter
    if (search) {
      filtered = filtered.filter(p =>
        p.subject.toLowerCase().includes(search.toLowerCase()) ||
        p.file_name.toLowerCase().includes(search.toLowerCase())
      );
    }

    const grouped = groupExamsBySubject(filtered);
    setFilteredGroups(grouped);
  };

  const handleDownload = (paper: ExamPaper) => {
    // Open the file URL in a new tab for download
    window.open(paper.file_url, '_blank');
  };

  const years = Array.from(new Set(allPapers.map(p => p.year))).sort((a, b) => b - a);
  const sessions = Array.from(new Set(allPapers.map(p => p.session)));

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading exam papers...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FileText className="h-6 w-6 text-primary" />
            NSC Exam Papers
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Browse and download past papers • {allPapers.length} available
          </p>
        </div>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Search */}
          <div className="lg:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search subjects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Grade Filter */}
          <Select value={gradeFilter.toString()} onValueChange={(v) => setGradeFilter(parseInt(v))}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="12">Grade 12</SelectItem>
              <SelectItem value="11">Grade 11</SelectItem>
              <SelectItem value="10">Grade 10</SelectItem>
            </SelectContent>
          </Select>

          {/* Year Filter */}
          <Select value={selectedYear} onValueChange={setSelectedYear}>
            <SelectTrigger>
              <SelectValue placeholder="All Years" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Years</SelectItem>
              {years.map(year => (
                <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Session Filter */}
          <Select value={selectedSession} onValueChange={setSelectedSession}>
            <SelectTrigger>
              <SelectValue placeholder="All Sessions" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Sessions</SelectItem>
              {sessions.map(session => (
                <SelectItem key={session} value={session}>
                  {session.charAt(0).toUpperCase() + session.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Popular Subjects Quick Filter */}
        <div className="flex flex-wrap gap-2 mt-4">
          <Button
            variant={selectedSubject === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedSubject("all")}
          >
            All Subjects
          </Button>
          {POPULAR_SUBJECTS.slice(0, 6).map(subject => (
            <Button
              key={subject}
              variant={selectedSubject === subject ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedSubject(subject)}
            >
              {subject}
            </Button>
          ))}
        </div>
      </Card>

      {/* Results Count */}
      <div className="text-sm text-muted-foreground">
        Showing {filteredGroups.reduce((sum, g) => sum + g.papers.length, 0)} papers 
        {selectedSubject !== "all" && ` in ${selectedSubject}`}
      </div>

      {/* Exam Papers List */}
      <ScrollArea className="h-[600px]">
        <div className="space-y-4">
          {filteredGroups.length === 0 ? (
            <Card className="p-8 text-center">
              <p className="text-muted-foreground">No exam papers found matching your filters.</p>
              <Button 
                variant="link" 
                onClick={() => {
                  setSearchQuery("");
                  setSelectedSubject("all");
                  setSelectedYear("all");
                  setSelectedSession("all");
                }}
                className="mt-2"
              >
                Clear filters
              </Button>
            </Card>
          ) : (
            filteredGroups.map((group) => (
              <Card key={group.subject} className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <BookOpen className="h-5 w-5 text-primary" />
                      {group.subject}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {group.paperCount} papers available • Latest: {group.latestYear}
                    </p>
                  </div>
                </div>

                <div className="grid gap-3">
                  {group.papers.slice(0, 6).map((paper, idx) => (
                    <div
                      key={`${paper.file_name}-${idx}`}
                      className="flex items-center justify-between p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                    >
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <FileText className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">
                            {paper.file_name}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className="text-xs">
                              <Calendar className="h-3 w-3 mr-1" />
                              {paper.session} {paper.year}
                            </Badge>
                            <Badge variant={paper.paper_type === 'exam' ? 'default' : 'secondary'} className="text-xs">
                              {paper.paper_type === 'exam' ? 'Question Paper' : 'Memorandum'}
                            </Badge>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2 ml-4">
                        {onChatWithExam && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => onChatWithExam(paper)}
                            title="Chat with this exam"
                          >
                            <MessageSquare className="h-4 w-4" />
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="default"
                          onClick={() => handleDownload(paper)}
                        >
                          <Download className="h-4 w-4 mr-1" />
                          Download
                        </Button>
                      </div>
                    </div>
                  ))}

                  {group.papers.length > 6 && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="w-full"
                      onClick={() => setSelectedSubject(group.subject)}
                    >
                      Show all {group.papers.length} papers
                    </Button>
                  )}
                </div>
              </Card>
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  );
}

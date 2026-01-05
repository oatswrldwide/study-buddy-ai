import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BookOpen, MessageSquare } from "lucide-react";
import AIChat from "@/components/chat/AIChat";

const StudentPortal = () => {
  const [selectedSubject, setSelectedSubject] = useState<string>("");
  const [selectedGrade, setSelectedGrade] = useState<string>("");
  const [showChat, setShowChat] = useState(false);

  const subjects = [
    "Mathematics",
    "Physical Sciences",
    "Life Sciences",
    "English FAL",
    "Afrikaans FAL",
    "Accounting",
    "Business Studies",
    "Economics",
    "History",
    "Geography",
  ];

  const grades = ["8", "9", "10", "11", "12"];

  const handleStartChat = () => {
    if (selectedSubject && selectedGrade) {
      setShowChat(true);
    }
  };

  if (showChat) {
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b bg-white">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">SB</span>
                </div>
                <div>
                  <h1 className="font-display text-xl font-bold text-foreground">StudyBuddy</h1>
                  <p className="text-xs text-muted-foreground">AI Tutoring</p>
                </div>
              </div>
              <Button
                variant="outline"
                onClick={() => setShowChat(false)}
              >
                Change Subject
              </Button>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <AIChat subject={selectedSubject} grade={parseInt(selectedGrade)} />
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">SB</span>
            </div>
            <div>
              <h1 className="font-display text-xl font-bold text-foreground">StudyBuddy</h1>
              <p className="text-xs text-muted-foreground">AI Tutoring Portal</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-3xl font-display font-bold text-foreground mb-2">
              Start Learning
            </h1>
            <p className="text-muted-foreground">
              Choose your subject and grade to begin your AI tutoring session
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                Set Up Your Session
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Select Subject *
                </label>
                <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a subject" />
                  </SelectTrigger>
                  <SelectContent>
                    {subjects.map((subject) => (
                      <SelectItem key={subject} value={subject}>
                        {subject}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Select Grade *
                </label>
                <Select value={selectedGrade} onValueChange={setSelectedGrade}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose your grade" />
                  </SelectTrigger>
                  <SelectContent>
                    {grades.map((grade) => (
                      <SelectItem key={grade} value={grade}>
                        Grade {grade}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                  <strong>How it works:</strong> Your AI tutor uses the Socratic method to
                  guide you to discover answers yourself. Instead of giving direct answers,
                  you'll be asked questions that help you think critically and learn deeply.
                </p>
              </div>

              <Button
                onClick={handleStartChat}
                disabled={!selectedSubject || !selectedGrade}
                className="w-full"
                size="lg"
              >
                Start Tutoring Session
                <MessageSquare className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default StudentPortal;

import { useState, useEffect } from "react";
import AIChat from "@/components/chat/AIChat";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { LogOut, GraduationCap, BookOpen, Loader2, AlertCircle } from "lucide-react";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

interface StudentData {
  full_name: string;
  email: string;
  grade: number;
  subjects: string[];
  school_name?: string;
  curriculum?: string;
}

const StudentPortal = () => {
  const { signOut, user } = useAuth();
  const [studentData, setStudentData] = useState<StudentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<string>("");
  const [selectedGrade, setSelectedGrade] = useState<string>("");

  useEffect(() => {
    const loadStudentData = async () => {
      if (!user) {
        setError("No user logged in");
        setLoading(false);
        return;
      }

      try {
        const studentRef = doc(db, "student_signups", user.uid);
        const studentDoc = await getDoc(studentRef);

        if (studentDoc.exists()) {
          const data = studentDoc.data() as StudentData;
          setStudentData(data);
          
          // Set defaults from student profile
          if (data.subjects && data.subjects.length > 0) {
            setSelectedSubject(data.subjects[0]);
          }
          if (data.grade) {
            setSelectedGrade(data.grade.toString());
          }
        } else {
          setError("Student profile not found. Please contact support.");
        }
      } catch (error) {
        console.error("Error loading student data:", error);
        setError("Failed to load your profile. Please try refreshing the page.");
      } finally {
        setLoading(false);
      }
    };

    loadStudentData();
  }, [user]);

  const handleLogout = async () => {
    await signOut();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#343541]">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-white animate-spin mx-auto mb-4" />
          <p className="text-white/70">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (error || !studentData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#343541] p-4">
        <Card className="max-w-md w-full p-6 bg-[#40414f] border-white/10">
          <div className="text-center">
            <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-white mb-2">Profile Error</h2>
            <p className="text-white/70 mb-4">{error}</p>
            <div className="space-y-2">
              <Button onClick={() => window.location.reload()} className="w-full">
                Refresh Page
              </Button>
              <Button onClick={handleLogout} variant="outline" className="w-full">
                Logout
              </Button>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  if (!selectedSubject || !selectedGrade) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#343541] p-4">
        <Card className="max-w-md w-full p-6 bg-[#40414f] border-white/10">
          <div className="text-center mb-6">
            <GraduationCap className="w-12 h-12 text-[#10a37f] mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">Welcome, {studentData.full_name}!</h2>
            <p className="text-white/70">Select a subject to start learning</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-white/90 mb-2 block">
                Subject
              </label>
              <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                <SelectTrigger className="bg-[#343541] text-white border-white/10">
                  <SelectValue placeholder="Choose a subject" />
                </SelectTrigger>
                <SelectContent>
                  {studentData.subjects.map((subject) => (
                    <SelectItem key={subject} value={subject}>
                      {subject}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium text-white/90 mb-2 block">
                Grade Level
              </label>
              <Select value={selectedGrade} onValueChange={setSelectedGrade}>
                <SelectTrigger className="bg-[#343541] text-white border-white/10">
                  <SelectValue placeholder="Choose your grade" />
                </SelectTrigger>
                <SelectContent>
                  {[8, 9, 10, 11, 12].map((grade) => (
                    <SelectItem key={grade} value={grade.toString()}>
                      Grade {grade}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button 
              onClick={() => {/* Will trigger re-render with chat */}} 
              className="w-full bg-[#10a37f] hover:bg-[#0d8c6f]"
              disabled={!selectedSubject || !selectedGrade}
            >
              Start Learning
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="relative h-screen">
      {/* Header with subject/grade selector and logout */}
      <div className="absolute top-4 right-4 left-4 z-50 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2">
            <BookOpen className="w-4 h-4 text-white" />
            <Select value={selectedSubject} onValueChange={setSelectedSubject}>
              <SelectTrigger className="w-[180px] bg-transparent border-none text-white h-auto p-0">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {studentData.subjects.map((subject) => (
                  <SelectItem key={subject} value={subject}>
                    {subject}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2">
            <GraduationCap className="w-4 h-4 text-white" />
            <Select value={selectedGrade} onValueChange={setSelectedGrade}>
              <SelectTrigger className="w-[120px] bg-transparent border-none text-white h-auto p-0">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[8, 9, 10, 11, 12].map((grade) => (
                  <SelectItem key={grade} value={grade.toString()}>
                    Grade {grade}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={handleLogout}
          className="bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </Button>
      </div>
      
      <AIChat 
        subject={selectedSubject} 
        grade={parseInt(selectedGrade)} 
        studentSignupId={user?.uid}
      />
    </div>
  );
};

export default StudentPortal;


import { useState, useEffect } from "react";
import AIChat from "@/components/chat/AIChat";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { LogOut, BookOpen, GraduationCap } from "lucide-react";
import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";

interface StudentData {
  full_name: string;
  email: string;
  grade: number;
  subjects?: string[]; // Old format (array)
  primary_subject?: string; // New format (single subject)
  school_name?: string;
}

const StudentPortal = () => {
  const { signOut, user } = useAuth();
  const [selectedSubject, setSelectedSubject] = useState<string>("");
  const [selectedGrade, setSelectedGrade] = useState<string>("");
  const [studentData, setStudentData] = useState<StudentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadStudentData = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        
        const studentRef = doc(db, "student_signups", user.uid);
        const studentDoc = await getDoc(studentRef);

        if (studentDoc.exists()) {
          const data = studentDoc.data() as StudentData;
          setStudentData(data);
          
          // Don't auto-select subject/grade - let user choose
        } else {
          // Profile doesn't exist - create a default one for Google sign-in users
          console.log("No student profile found - creating default profile");
          const defaultProfile: StudentData = {
            full_name: user.displayName || user.email?.split('@')[0] || "Student",
            email: user.email || "",
            grade: 10,
            primary_subject: "Mathematics",
          };
          
          // Create the profile in Firestore
          await setDoc(studentRef, {
            ...defaultProfile,
            created_at: serverTimestamp(),
            signup_method: "google",
          });
          
          setStudentData(defaultProfile);
          console.log("✅ Created default student profile");
        }
      } catch (error) {
        console.error("Error loading student data:", error);
        setError("Failed to load your profile. Please refresh the page.");
      } finally {
        setLoading(false);
      }
    };

    loadStudentData();
  }, [user]);

  const handleLogout = async () => {
    await signOut();
  };

  // Show loading state
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#343541]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white/70">Loading your profile...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error || !studentData) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#343541]">
        <Card className="max-w-md p-6 text-center">
          <h2 className="text-xl font-bold text-foreground mb-2">Unable to Load Profile</h2>
          <p className="text-muted-foreground mb-4">{error || "Student data not found"}</p>
          <Button onClick={handleLogout} variant="outline">
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </Card>
      </div>
    );
  }

  // Show subject/grade selector if not selected
  if (!selectedSubject || !selectedGrade) {
    // All available subjects - not limited to signup selection
    const allSubjects = [
      "Mathematics",
      "Physical Sciences",
      "Life Sciences",
      "English",
      "Accounting",
      "Mathematical Literacy",
      "Business Studies",
      "Economics",
      "Afrikaans",
      "History",
      "Geography",
      "Life Orientation",
      "Information Technology",
      "Computer Applications Technology",
    ];
    
    return (
      <div className="h-screen flex items-center justify-center bg-[#343541] p-4">
        <Card className="max-w-md w-full p-6">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Welcome, {studentData.full_name}! 👋
            </h2>
            <p className="text-muted-foreground">
              Select a subject and grade to start learning
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                <BookOpen className="w-4 h-4 inline mr-2" />
                Subject
              </label>
              <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a subject" />
                </SelectTrigger>
                <SelectContent>
                  {allSubjects.map((subject) => (
                    <SelectItem key={subject} value={subject}>
                      {subject}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                <GraduationCap className="w-4 h-4 inline mr-2" />
                Grade
              </label>
              <Select value={selectedGrade} onValueChange={setSelectedGrade}>
                <SelectTrigger>
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
              onClick={() => {
                if (selectedSubject && selectedGrade) {
                  // Subject and grade are now selected, component will re-render
                }
              }}
              className="w-full"
              disabled={!selectedSubject || !selectedGrade}
            >
              Start Learning
            </Button>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className="w-full mt-4"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </Card>
      </div>
    );
  }

  // All available subjects - not limited to signup selection
  const allSubjects = [
    "Mathematics",
    "Physical Sciences",
    "Life Sciences",
    "English",
    "Accounting",
    "Mathematical Literacy",
    "Business Studies",
    "Economics",
    "Afrikaans",
    "History",
    "Geography",
    "Life Orientation",
    "Information Technology",
    "Computer Applications Technology",
  ];

  return (
    <div className="relative h-screen">
      {/* Header with student info and controls */}
      <div className="absolute top-0 left-0 right-0 z-50 bg-[#343541] border-b border-white/10 px-3 sm:px-4 py-2">
        {/* Mobile: Stacked layout */}
        <div className="block sm:hidden space-y-2">
          <div className="flex items-center justify-between">
            <div className="text-white">
              <p className="text-sm font-medium truncate max-w-[180px]">{studentData.full_name}</p>
              <p className="text-xs text-white/50">{selectedSubject} • Grade {selectedGrade}</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="bg-white/10 hover:bg-white/20 text-white px-2"
            >
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
          <Select value={selectedSubject} onValueChange={setSelectedSubject}>
            <SelectTrigger className="w-full bg-white/10 text-white border-white/20 h-9">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {allSubjects.map((subject) => (
                <SelectItem key={subject} value={subject}>
                  {subject}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Desktop: Horizontal layout */}
        <div className="hidden sm:flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="text-white">
              <p className="text-sm font-medium">{studentData.full_name}</p>
              <p className="text-xs text-white/50">{selectedSubject} • Grade {selectedGrade}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Select value={selectedSubject} onValueChange={setSelectedSubject}>
              <SelectTrigger className="w-[180px] bg-white/10 text-white border-white/20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {allSubjects.map((subject) => (
                  <SelectItem key={subject} value={subject}>
                    {subject}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="bg-white/10 hover:bg-white/20 text-white"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>
      
      {/* Chat interface with top padding for header - adjusted for mobile stacked header */}
      <div className="h-full pt-20 sm:pt-16">
        <AIChat 
          subject={selectedSubject} 
          grade={parseInt(selectedGrade)} 
          studentSignupId={user?.uid}
        />
      </div>
    </div>
  );
};

export default StudentPortal;


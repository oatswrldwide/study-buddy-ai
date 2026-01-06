import { useState, useEffect } from "react";
import AIChat from "@/components/chat/AIChat";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { supabase } from "@/lib/supabase";

const StudentPortal = () => {
  const { signOut, user } = useAuth();
  const [selectedSubject] = useState<string>("Mathematics");
  const [selectedGrade] = useState<string>("10");
  const [studentSignupId, setStudentSignupId] = useState<string | null>(null);

  useEffect(() => {
    const loadStudentData = async () => {
      if (!user) return;

      try {
        const { data, error } = await supabase
          .from("student_signups")
          .select("id, grade, subjects")
          .eq("auth_user_id", user.id)
          .single();

        if (error) throw error;
        if (data) {
          setStudentSignupId(data.id);
        }
      } catch (error) {
        console.error("Error loading student data:", error);
      }
    };

    loadStudentData();
  }, [user]);

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <div className="relative h-screen">
      {/* Logout button overlay */}
      <div className="absolute top-4 right-4 z-50">
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
        studentSignupId={studentSignupId || undefined}
      />
    </div>
  );
};

export default StudentPortal;


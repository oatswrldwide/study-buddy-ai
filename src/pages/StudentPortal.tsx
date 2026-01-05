import { useState } from "react";
import AIChat from "@/components/chat/AIChat";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

const StudentPortal = () => {
  const { signOut, user } = useAuth();
  const [selectedSubject] = useState<string>("Mathematics");
  const [selectedGrade] = useState<string>("10");

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
      
      <AIChat subject={selectedSubject} grade={parseInt(selectedGrade)} />
    </div>
  );
};

export default StudentPortal;

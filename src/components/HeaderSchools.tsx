import { BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HeaderSchools = () => {
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-hero flex items-center justify-center shadow-md group-hover:shadow-glow transition-shadow duration-300">
            <BookOpen className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-foreground">
            StudyBuddy<span className="text-primary">Works</span>
          </span>
        </a>

        {/* Navigation */}
        <button
          onClick={() => navigate("/students")}
          className="text-muted-foreground hover:text-foreground font-medium transition-colors duration-200"
        >
          For Students
        </button>
      </nav>
    </header>
  );
};

export default HeaderSchools;

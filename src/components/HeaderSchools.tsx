import { useNavigate } from "react-router-dom";

const HeaderSchools = () => {
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2 group">
          <img 
            src="/favicon.svg" 
            alt="StudyBuddy Works Logo" 
            className="w-10 h-10 rounded-xl shadow-md group-hover:shadow-glow transition-shadow duration-300"
          />
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

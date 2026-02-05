import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const navLinks = [
    { href: "/schools", label: "For Schools", isRoute: true },
    { href: "/resources", label: "Resources", isRoute: true },
    { href: "#features", label: "Features" },
    { href: "#pricing", label: "Pricing" },
  ];

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

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => 
            link.isRoute ? (
              <button
                key={link.href}
                onClick={() => navigate(link.href)}
                className="text-muted-foreground hover:text-foreground font-medium transition-colors duration-200"
              >
                {link.label}
              </button>
            ) : (
              <a
                key={link.href}
                href={link.href}
                className="text-muted-foreground hover:text-foreground font-medium transition-colors duration-200"
              >
                {link.label}
              </a>
            )
          )}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Button variant="ghost" onClick={() => navigate("/login")}>Log In</Button>
          <Button variant="hero" onClick={() => navigate("/students")}>Get Started Free</Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-foreground"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-background border-b border-border animate-fade-in">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
            {navLinks.map((link) =>
              link.isRoute ? (
                <button
                  key={link.href}
                  onClick={() => {
                    navigate(link.href);
                    setIsMenuOpen(false);
                  }}
                  className="text-muted-foreground hover:text-foreground font-medium py-2 transition-colors text-left"
                >
                  {link.label}
                </button>
              ) : (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-muted-foreground hover:text-foreground font-medium py-2 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </a>
              )
            )}
            <div className="flex flex-col gap-2 pt-4 border-t border-border">
              <Button variant="ghost" className="w-full" onClick={() => navigate("/login")}>Log In</Button>
              <Button variant="hero" className="w-full" onClick={() => navigate("/students")}>Get Started Free</Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;

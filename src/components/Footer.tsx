import { BookOpen, Twitter, Linkedin, Youtube, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const footerLinks = {
  Product: [
    { label: "For Students", href: "/students", isRoute: true },
    { label: "For Schools", href: "/schools", isRoute: true },
    { label: "Find a Tutor", href: "/locations", isRoute: true },
    { label: "Try Demo", href: "/demo", isRoute: true },
  ],
  Resources: [
    { label: "Learning Resources", href: "/resources", isRoute: true },
    { label: "Subject Guides", href: "/resources", isRoute: true },
    { label: "Exam Papers", href: "/students#exam-papers", isRoute: true },
    { label: "Study Tips", href: "/resources", isRoute: true },
  ],
  Company: [
    { label: "About Us", href: "/about", isRoute: true },
    { label: "How It Works", href: "/how-it-works", isRoute: true },
    { label: "Login", href: "/login", isRoute: true },
    { label: "Contact", href: "/schools#contact", isRoute: true },
  ],
};

const socialLinks = [
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Youtube, href: "#", label: "YouTube" },
  { icon: Mail, href: "#", label: "Email" },
];

const Footer = () => {
  return (
    <footer className="bg-foreground text-primary-foreground py-16">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-6 gap-12 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <a href="/" className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-hero flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">
                StudyBuddy<span className="text-primary-light">Works</span>
              </span>
            </a>
            <p className="text-primary-foreground/70 mb-6 max-w-xs">
              Empowering schools to embrace AI responsibly while improving learning outcomes for every student.
            </p>
            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 rounded-lg bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-semibold mb-4 text-primary-foreground">
                {category}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    {link.isRoute ? (
                      <Link
                        to={link.href}
                        className="text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <a
                        href={link.href}
                        className="text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                      >
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-primary-foreground/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-primary-foreground/50 text-sm">
            © {new Date().getFullYear()} StudyBuddy Works. All rights reserved.
          </p>
          <p className="text-primary-foreground/50 text-sm">
            Made with ❤️ for educators and students worldwide
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import LoginForm from "@/components/auth/LoginForm";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { HelpCircle } from "lucide-react";

const Login = () => {
  const { user, role } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Login useEffect - user:", user, "role:", role);
    
    if (user && role) {
      console.log("Redirecting to dashboard for role:", role);
      // Redirect logged-in users to their dashboard
      switch (role) {
        case "admin":
          navigate("/admin/dashboard");
          break;
        case "school":
          navigate("/school/dashboard");
          break;
        case "parent":
          navigate("/parent/dashboard");
          break;
        case "student":
          navigate("/student-portal");
          break;
        default:
          navigate("/");
      }
    }
  }, [user, role, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-2xl">SB</span>
          </div>
          <h1 className="text-3xl font-display font-bold text-foreground mb-2">
            StudyBuddy AI
          </h1>
          <p className="text-muted-foreground">
            Welcome back! Sign in to continue
          </p>
        </div>

        <LoginForm />

        <Alert>
          <HelpCircle className="h-4 w-4" />
          <AlertDescription>
            <strong>Need help accessing the app?</strong>
            <br />
            <Link to="/demo" className="text-primary hover:underline">
              View setup instructions and demo credentials →
            </Link>
          </AlertDescription>
        </Alert>

        <div className="text-center text-sm text-muted-foreground">
          <p>Need help? Contact support@studybuddy.co.za</p>
        </div>
      </div>
    </div>
  );
};

export default Login;

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Copy, Database, Key, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const DemoCredentials = () => {
  const { toast } = useToast();

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: `${label} copied to clipboard`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">Demo Credentials & Setup</h1>
          <p className="text-muted-foreground">
            How to access the protected pages in this application
          </p>
        </div>

        <Alert>
          <Database className="h-4 w-4" />
          <AlertDescription>
            <strong>Important:</strong> Protected pages require authentication through Supabase. 
            You need to configure your database and create user accounts first.
          </AlertDescription>
        </Alert>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Key className="w-5 h-5" />
              Why Pages Don't Work
            </CardTitle>
            <CardDescription>
              Protected routes require role-based authentication
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h3 className="font-semibold">Authentication Flow:</h3>
              <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
                <li>User logs in via <Link to="/login" className="text-primary hover:underline">/login</Link></li>
                <li>Supabase validates credentials and returns auth token</li>
                <li>AuthContext fetches user role from database tables:
                  <ul className="list-disc list-inside ml-6 mt-1">
                    <li><code>admin_users</code> table for admin role</li>
                    <li><code>student_signups</code> table for student role</li>
                    <li><code>student_signups.parent_email</code> for parent role</li>
                  </ul>
                </li>
                <li>ProtectedRoute checks if user has required role</li>
                <li>If authorized → show page, if not → redirect to login</li>
              </ol>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Setup Instructions</CardTitle>
            <CardDescription>Follow these steps to access protected pages</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <h3 className="font-semibold flex items-center gap-2">
                <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">1</span>
                Configure Supabase
              </h3>
              <div className="ml-8 space-y-2">
                <p className="text-sm text-muted-foreground">
                  Create a <code>.env</code> file in the project root:
                </p>
                <div className="bg-muted p-4 rounded-lg relative group">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100"
                    onClick={() => copyToClipboard(
                      "VITE_SUPABASE_URL=your_supabase_project_url\nVITE_SUPABASE_ANON_KEY=your_supabase_anon_key\nVITE_GEMINI_API_KEY=your_gemini_api_key",
                      "Environment variables"
                    )}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                  <pre className="text-xs">
{`VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_GEMINI_API_KEY=your_gemini_api_key`}
                  </pre>
                </div>
                <p className="text-xs text-muted-foreground">
                  Get these values from your <a href="https://supabase.com/dashboard" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Supabase dashboard</a>
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold flex items-center gap-2">
                <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">2</span>
                Run Database Migrations
              </h3>
              <div className="ml-8 space-y-2">
                <p className="text-sm text-muted-foreground">
                  Execute SQL files in your Supabase SQL Editor:
                </p>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                  <li><code>src/lib/schema.sql</code> - Create tables</li>
                  <li><code>src/lib/auth-schema.sql</code> - Auth setup</li>
                  <li><code>src/lib/fix-rls-policies.sql</code> - Security policies</li>
                </ul>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold flex items-center gap-2">
                <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">3</span>
                Create User Accounts
              </h3>
              <div className="ml-8 space-y-2">
                <p className="text-sm text-muted-foreground">
                  In Supabase SQL Editor, create test accounts:
                </p>
                <div className="bg-muted p-4 rounded-lg space-y-3 relative group">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100"
                    onClick={() => copyToClipboard(
                      "-- Create admin account\nINSERT INTO admin_users (email, auth_user_id)\nVALUES ('admin@studybuddy.co.za', (SELECT id FROM auth.users WHERE email = 'admin@studybuddy.co.za' LIMIT 1));\n\n-- Create student account\nINSERT INTO student_signups (full_name, email, parent_email, grade, school_name, auth_user_id)\nVALUES ('Test Student', 'student@test.com', 'parent@test.com', '10', 'Test School', (SELECT id FROM auth.users WHERE email = 'student@test.com' LIMIT 1));",
                      "SQL queries"
                    )}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                  <div>
                    <p className="text-xs font-semibold mb-1">Admin Account:</p>
                    <pre className="text-xs">
{`-- First create the auth user in Supabase Auth UI
-- Then link it:
INSERT INTO admin_users (email, auth_user_id)
VALUES ('admin@studybuddy.co.za', 
  (SELECT id FROM auth.users 
   WHERE email = 'admin@studybuddy.co.za' 
   LIMIT 1));`}
                    </pre>
                  </div>
                  <div>
                    <p className="text-xs font-semibold mb-1">Student Account:</p>
                    <pre className="text-xs">
{`INSERT INTO student_signups (
  full_name, email, parent_email, 
  grade, school_name, auth_user_id
)
VALUES ('Test Student', 'student@test.com', 
  'parent@test.com', '10', 'Test School', 
  (SELECT id FROM auth.users 
   WHERE email = 'student@test.com' 
   LIMIT 1));`}
                    </pre>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold flex items-center gap-2">
                <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">4</span>
                Log In
              </h3>
              <div className="ml-8 space-y-2">
                <p className="text-sm text-muted-foreground">
                  Use your created credentials at the login page:
                </p>
                <Link to="/login">
                  <Button>
                    <User className="w-4 h-4 mr-2" />
                    Go to Login Page
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Available Pages by Role</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-sm mb-2">🔓 Public Pages (No Auth Required):</h4>
                <ul className="text-sm space-y-1 ml-4">
                  <li>• <Link to="/" className="text-primary hover:underline">/</Link> - Market selector</li>
                  <li>• <Link to="/schools" className="text-primary hover:underline">/schools</Link> - Schools landing</li>
                  <li>• <Link to="/students" className="text-primary hover:underline">/students</Link> - Students landing</li>
                  <li>• <Link to="/login" className="text-primary hover:underline">/login</Link> - Login page</li>
                  <li>• <Link to="/test" className="text-primary hover:underline">/test</Link> - Config test</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-sm mb-2">👨‍💼 Admin Pages (requires admin role):</h4>
                <ul className="text-sm space-y-1 ml-4 text-muted-foreground">
                  <li>• /admin - Dashboard</li>
                  <li>• /admin/leads - School leads</li>
                  <li>• /admin/students - Student management</li>
                  <li>• /admin/payments - Payments</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-sm mb-2">🎓 Student Pages (requires student or admin role):</h4>
                <ul className="text-sm space-y-1 ml-4 text-muted-foreground">
                  <li>• /portal - AI chat & study tools</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-sm mb-2">🏫 School Pages (requires school or admin role):</h4>
                <ul className="text-sm space-y-1 ml-4 text-muted-foreground">
                  <li>• /school - Dashboard</li>
                  <li>• /school/students - Student list</li>
                  <li>• /school/performance - Analytics (coming soon)</li>
                  <li>• /school/settings - Settings (coming soon)</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-sm mb-2">👨‍👩‍👧 Parent Pages (requires parent or admin role):</h4>
                <ul className="text-sm space-y-1 ml-4 text-muted-foreground">
                  <li>• /parent - Dashboard</li>
                  <li>• /parent/activity - Activity tracking (coming soon)</li>
                  <li>• /parent/payments - Payments (coming soon)</li>
                  <li>• /parent/settings - Settings (coming soon)</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Alert>
          <AlertDescription className="text-sm">
            <strong>Note:</strong> Admin role has access to all sections of the app for testing and monitoring purposes.
            This was configured to allow you to view any protected route when logged in as admin.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
};

export default DemoCredentials;

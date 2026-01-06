import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { supabase } from "@/lib/supabase";
import { User, Session } from "@supabase/supabase-js";

type UserRole = "admin" | "school" | "parent" | "student";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  role: UserRole | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signUp: (email: string, password: string, metadata?: any) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  isAdmin: boolean;
  isSchool: boolean;
  isParent: boolean;
  isStudent: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [role, setRole] = useState<UserRole | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUserRole = async (userId: string, userEmail?: string) => {
    console.log("Fetching role for user:", userId, userEmail);
    try {
      // Check admin_users table
      const { data: adminData } = await supabase
        .from("admin_users")
        .select("role")
        .eq("auth_user_id", userId)
        .single();

      if (adminData) {
        console.log("User is admin:", adminData);
        setRole("admin");
        return "admin";
      }

      // Check school_accounts table
      const { data: schoolData } = await supabase
        .from("school_accounts")
        .select("id")
        .eq("auth_user_id", userId)
        .single();

      if (schoolData) {
        console.log("User is school:", schoolData);
        setRole("school");
        return "school";
      }

      // Check student_signups table
      const { data: studentData } = await supabase
        .from("student_signups")
        .select("id, parent_email")
        .eq("auth_user_id", userId)
        .single();

      if (studentData) {
        console.log("User is student:", studentData);
        setRole("student");
        return "student";
      }

      // Check if user is a parent (by parent_email matching user email)
      if (userEmail) {
        const { data: parentData } = await supabase
          .from("student_signups")
          .select("id")
          .eq("parent_email", userEmail)
          .limit(1);

        if (parentData && parentData.length > 0) {
          console.log("User is parent:", parentData);
          setRole("parent");
          return "parent";
        }
      }

      console.log("No role found for user");
      setRole(null);
      return null;
    } catch (error) {
      console.error("Error fetching user role:", error);
      setRole(null);
      return null;
    }
  };

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        await fetchUserRole(session.user.id, session.user.email);
      }
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        await fetchUserRole(session.user.id, session.user.email);
      } else {
        setRole(null);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      return { error };
    } catch (error) {
      return { error: error as Error };
    }
  };

  const signUp = async (email: string, password: string, metadata?: any) => {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: metadata,
        },
      });
      return { error };
    } catch (error) {
      return { error: error as Error };
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
    setRole(null);
  };

  const value = {
    user,
    session,
    role,
    loading,
    signIn,
    signUp,
    signOut,
    isAdmin: role === "admin",
    isSchool: role === "school",
    isParent: role === "parent",
    isStudent: role === "student",
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

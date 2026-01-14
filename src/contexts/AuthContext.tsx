import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { auth, db } from "@/lib/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import { doc, getDoc, collection, query, where, getDocs, limit } from "firebase/firestore";

type UserRole = "admin" | "school" | "parent" | "student";

interface AuthContextType {
  user: User | null;
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
  const [role, setRole] = useState<UserRole | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUserRole = async (userId: string, userEmail?: string) => {
    console.log("Fetching role for user:", userId, userEmail);
    try {
      // Check custom claims first (set via Cloud Function)
      const idTokenResult = await auth.currentUser?.getIdTokenResult();
      if (idTokenResult?.claims?.role) {
        const userRole = idTokenResult.claims.role as UserRole;
        console.log("User role from custom claims:", userRole);
        setRole(userRole);
        return userRole;
      }

      // Fallback: Check admin_users collection
      const adminDocRef = doc(db, "admin_users", userId);
      const adminDoc = await getDoc(adminDocRef);

      if (adminDoc.exists()) {
        console.log("User is admin:", adminDoc.data());
        setRole("admin");
        return "admin";
      }

      // Check student_signups collection
      const studentDocRef = doc(db, "student_signups", userId);
      const studentDoc = await getDoc(studentDocRef);

      if (studentDoc.exists()) {
        console.log("User is student:", studentDoc.data());
        setRole("student");
        return "student";
      }

      // Check if user is a parent (by parent_email matching user email)
      if (userEmail) {
        const studentsRef = collection(db, "student_signups");
        const parentQuery = query(
          studentsRef,
          where("parent_email", "==", userEmail),
          limit(1)
        );
        const parentSnapshot = await getDocs(parentQuery);

        if (!parentSnapshot.empty) {
          console.log("User is parent");
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
    // Listen for auth state changes
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        await fetchUserRole(user.uid, user.email || undefined);
      } else {
        setRole(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      return { error: null };
    } catch (error) {
      return { error: error as Error };
    }
  };

  const signUp = async (email: string, password: string, metadata?: any) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // Note: metadata handling would typically be done via Cloud Function
      // For now, you'd need to create the corresponding document in Firestore
      console.log("User signed up:", userCredential.user.uid, "metadata:", metadata);
      return { error: null };
    } catch (error) {
      return { error: error as Error };
    }
  };

  const signOut = async () => {
    await firebaseSignOut(auth);
    setUser(null);
    setRole(null);
  };

  const value = {
    user,
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

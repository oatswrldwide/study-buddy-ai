import { useState, useEffect } from "react";
import ParentLayout from "@/components/parent/ParentLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useAuth } from "@/contexts/AuthContext";
import { GraduationCap, Clock, BookOpen, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { differenceInDays } from "date-fns";

const ParentDashboard = () => {
  const { user } = useAuth();
  const [children, setChildren] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadChildren();
  }, [user]);

  const loadChildren = async () => {
    if (!user?.email) return;

    try {
      const studentsRef = collection(db, "student_signups");
      const q = query(studentsRef, where("parent_email", "==", user.email));
      const snapshot = await getDocs(q);
      
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      setChildren(data);
    } catch (error) {
      console.error("Error loading children:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "trial":
        return "bg-blue-100 text-blue-800 border-blue-300";
      case "active":
        return "bg-green-100 text-green-800 border-green-300";
      case "inactive":
        return "bg-gray-100 text-gray-800 border-gray-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  const getTrialStatus = (trialEndsAt: string | null) => {
    if (!trialEndsAt) return null;
    const daysLeft = differenceInDays(new Date(trialEndsAt), new Date());
    if (daysLeft < 0) return { text: "Trial Expired", color: "text-red-600" };
    if (daysLeft === 0) return { text: "Expires Today", color: "text-orange-600" };
    if (daysLeft <= 3) return { text: `${daysLeft} days left`, color: "text-orange-600" };
    return { text: `${daysLeft} days left`, color: "text-green-600" };
  };

  return (
    <ParentLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Parent Dashboard</h1>
          <p className="text-muted-foreground">
            Monitor your child's learning progress and activity
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading dashboard...</p>
          </div>
        ) : children.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <GraduationCap className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground mb-4">
                No children registered yet
              </p>
              <Link to="/students">
                <Button>Register Your Child</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <>
            {/* Children Cards */}
            <div className="grid gap-6">
              {children.map((child) => {
                const trialStatus = getTrialStatus(child.trial_ends_at);
                const subjects = child.subjects ? child.subjects.split(",") : [];

                return (
                  <Card key={child.id}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-xl">{child.full_name}</CardTitle>
                          <p className="text-sm text-muted-foreground mt-1">
                            Grade {child.grade} • {child.curriculum}
                          </p>
                        </div>
                        <Badge className={getStatusColor(child.status)}>
                          {child.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* Trial Status */}
                      {trialStatus && child.status === "trial" && (
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="w-4 h-4" />
                          <span className="text-muted-foreground">Trial Status:</span>
                          <span className={`font-medium ${trialStatus.color}`}>
                            {trialStatus.text}
                          </span>
                        </div>
                      )}

                      {/* Subjects */}
                      <div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                          <BookOpen className="w-4 h-4" />
                          <span>Subjects ({subjects.length})</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {subjects.map((subject) => (
                            <Badge key={subject} variant="outline">
                              {subject.trim()}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Quick Stats */}
                      <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                        <div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                            <Clock className="w-4 h-4" />
                            <span>Total Time</span>
                          </div>
                          <p className="text-xl font-semibold">0 hrs</p>
                        </div>
                        <div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                            <BookOpen className="w-4 h-4" />
                            <span>Sessions</span>
                          </div>
                          <p className="text-xl font-semibold">0</p>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2 pt-4">
                        <Link to="/parent/activity" className="flex-1">
                          <Button variant="outline" className="w-full">
                            View Activity
                          </Button>
                        </Link>
                        {child.status === "trial" && (
                          <Link to="/parent/payments" className="flex-1">
                            <Button className="w-full">Make Payment</Button>
                          </Link>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="flex gap-4">
                <Link to="/parent/activity">
                  <Button>View All Activity</Button>
                </Link>
                <Link to="/parent/payments">
                  <Button variant="outline">Manage Payments</Button>
                </Link>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </ParentLayout>
  );
};

export default ParentDashboard;

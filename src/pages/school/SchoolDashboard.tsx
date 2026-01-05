import { useState, useEffect } from "react";
import SchoolLayout from "@/components/school/SchoolLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";
import { Users, TrendingUp, Clock, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const SchoolDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalStudents: 0,
    activeThisWeek: 0,
    avgSessionTime: 0,
    topSubjects: [] as { subject: string; count: number }[],
  });
  const [loading, setLoading] = useState(true);
  const [schoolName, setSchoolName] = useState("");

  useEffect(() => {
    loadDashboardData();
  }, [user]);

  const loadDashboardData = async () => {
    if (!user) return;

    try {
      // Get school account
      const { data: schoolAccount } = await supabase
        .from("school_accounts")
        .select("school_name")
        .eq("auth_user_id", user.id)
        .single();

      if (schoolAccount) {
        setSchoolName(schoolAccount.school_name);

        // Get students from this school
        const { data: students, count } = await supabase
          .from("student_signups")
          .select("*", { count: "exact" })
          .eq("school_name", schoolAccount.school_name);

        setStats((prev) => ({
          ...prev,
          totalStudents: count || 0,
          activeThisWeek: students?.filter((s) => s.status === "active").length || 0,
        }));

        // Get subject distribution
        if (students) {
          const subjectCounts: { [key: string]: number } = {};
          students.forEach((student) => {
            if (student.subjects) {
              const subjects = student.subjects.split(",");
              subjects.forEach((subject) => {
                const trimmed = subject.trim();
                subjectCounts[trimmed] = (subjectCounts[trimmed] || 0) + 1;
              });
            }
          });

          const topSubjects = Object.entries(subjectCounts)
            .map(([subject, count]) => ({ subject, count }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 5);

          setStats((prev) => ({ ...prev, topSubjects }));
        }
      }
    } catch (error) {
      console.error("Error loading dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: "Total Students",
      value: stats.totalStudents,
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Active This Week",
      value: stats.activeThisWeek,
      icon: TrendingUp,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Avg Session Time",
      value: `${stats.avgSessionTime}min`,
      icon: Clock,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      title: "Top Subject",
      value: stats.topSubjects[0]?.subject || "N/A",
      icon: BookOpen,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
  ];

  return (
    <SchoolLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            {schoolName || "School Dashboard"}
          </h1>
          <p className="text-muted-foreground">
            Welcome back! Here's what's happening with your students.
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading dashboard...</p>
          </div>
        ) : (
          <>
            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {statCards.map((stat) => {
                const Icon = stat.icon;
                return (
                  <Card key={stat.title}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        {stat.title}
                      </CardTitle>
                      <div className={`${stat.bgColor} p-2 rounded-lg`}>
                        <Icon className={`w-4 h-4 ${stat.color}`} />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{stat.value}</div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Subject Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Popular Subjects</CardTitle>
              </CardHeader>
              <CardContent>
                {stats.topSubjects.length > 0 ? (
                  <div className="space-y-3">
                    {stats.topSubjects.map((item) => (
                      <div key={item.subject} className="flex items-center justify-between">
                        <span className="text-sm font-medium">{item.subject}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-32 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-primary h-2 rounded-full"
                              style={{
                                width: `${(item.count / stats.totalStudents) * 100}%`,
                              }}
                            />
                          </div>
                          <span className="text-sm text-muted-foreground w-8 text-right">
                            {item.count}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    No subject data available yet.
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="flex gap-4">
                <Link to="/school/students">
                  <Button>View All Students</Button>
                </Link>
                <Link to="/school/performance">
                  <Button variant="outline">Performance Reports</Button>
                </Link>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </SchoolLayout>
  );
};

export default SchoolDashboard;

import { useState, useEffect } from "react";
import SchoolLayout from "@/components/school/SchoolLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";
import { Users, TrendingUp, Clock, BookOpen, AlertTriangle, Activity, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { getSchoolAnalytics, getRiskIndicators, type SchoolAnalytics, type RiskIndicator } from "@/lib/school-analytics";
import { Badge } from "@/components/ui/badge";

const SchoolDashboard = () => {
  const { user } = useAuth();
  const [analytics, setAnalytics] = useState<SchoolAnalytics | null>(null);
  const [risks, setRisks] = useState<RiskIndicator[]>([]);
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

        // Load analytics and risk indicators in parallel
        const [analyticsData, riskData] = await Promise.all([
          getSchoolAnalytics(schoolAccount.school_name),
          getRiskIndicators(schoolAccount.school_name),
        ]);

        setAnalytics(analyticsData);
        setRisks(riskData);
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
      value: analytics?.totalStudents || 0,
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      subtitle: `${analytics?.activeThisWeek || 0} active this week`,
    },
    {
      title: "Total Sessions",
      value: analytics?.totalSessions || 0,
      icon: Activity,
      color: "text-green-600",
      bgColor: "bg-green-50",
      subtitle: `${analytics?.activeToday || 0} active today`,
    },
    {
      title: "Total Messages",
      value: analytics?.totalMessages || 0,
      icon: MessageSquare,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      subtitle: `${analytics?.avgMessagesPerStudent.toFixed(1) || 0} avg per student`,
    },
    {
      title: "At-Risk Students",
      value: analytics?.atRiskStudents || 0,
      icon: AlertTriangle,
      color: "text-red-600",
      bgColor: "bg-red-50",
      subtitle: risks.length > 0 ? "Needs attention" : "All good",
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
            {/* At-Risk Alert Banner */}
            {risks.length > 0 && (
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  <span className="font-semibold">{risks.length} student{risks.length > 1 ? 's' : ''} need attention.</span>
                  {" "}
                  <Link to="/school/students" className="underline hover:text-white">
                    View details →
                  </Link>
                </AlertDescription>
              </Alert>
            )}

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
                      {stat.subtitle && (
                        <p className="text-xs text-muted-foreground mt-1">
                          {stat.subtitle}
                        </p>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {/* 7-Day Usage Trend */}
              <Card>
                <CardHeader>
                  <CardTitle>7-Day Usage Trend</CardTitle>
                </CardHeader>
                <CardContent>
                  {analytics && analytics.usageTrend.length > 0 ? (
                    <div className="space-y-3">
                      {analytics.usageTrend.map((day) => {
                        const maxSessions = Math.max(...analytics.usageTrend.map(d => d.sessions));
                        const width = maxSessions > 0 ? (day.sessions / maxSessions) * 100 : 0;
                        return (
                          <div key={day.date} className="space-y-1">
                            <div className="flex items-center justify-between text-sm">
                              <span className="font-medium">{day.date}</span>
                              <span className="text-muted-foreground">
                                {day.sessions} sessions • {day.messages} messages
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-blue-600 h-2 rounded-full transition-all"
                                style={{ width: `${width}%` }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      No usage data available yet. Students need to start using the AI chat.
                    </p>
                  )}
                </CardContent>
              </Card>

              {/* Popular Subjects */}
              <Card>
                <CardHeader>
                  <CardTitle>Popular Subjects</CardTitle>
                </CardHeader>
                <CardContent>
                  {analytics && analytics.topSubjects.length > 0 ? (
                    <div className="space-y-3">
                      {analytics.topSubjects.map((item) => (
                        <div key={item.subject} className="space-y-1">
                          <div className="flex items-center justify-between text-sm">
                            <span className="font-medium">{item.subject}</span>
                            <span className="text-muted-foreground">
                              {item.count} students • {item.percentage.toFixed(0)}%
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-purple-600 h-2 rounded-full"
                              style={{ width: `${item.percentage}%` }}
                            />
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
            </div>

            {/* Risk Indicators */}
            {risks.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-red-600" />
                    Students Needing Attention
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {risks.slice(0, 5).map((risk) => (
                      <div
                        key={risk.studentId}
                        className="flex items-center justify-between p-3 border rounded-lg"
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium">{risk.studentName}</span>
                            <Badge
                              variant={risk.riskType === "inactive" ? "destructive" : "secondary"}
                              className={
                                risk.riskType === "struggling"
                                  ? "bg-orange-100 text-orange-800 hover:bg-orange-100"
                                  : risk.riskType === "excessive"
                                  ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                                  : ""
                              }
                            >
                              {risk.riskType}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {risk.recommendation}
                          </p>
                        </div>
                        <Link to="/school/students">
                          <Button variant="outline" size="sm">
                            View
                          </Button>
                        </Link>
                      </div>
                    ))}
                    {risks.length > 5 && (
                      <Link to="/school/students">
                        <Button variant="link" className="w-full">
                          View all {risks.length} at-risk students →
                        </Button>
                      </Link>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

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

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, GraduationCap, CheckCircle, Clock } from "lucide-react";

interface Stats {
  totalLeads: number;
  totalStudents: number;
  activeTrials: number;
  pendingLeads: number;
}

const AdminDashboard = () => {
  const [stats, setStats] = useState<Stats>({
    totalLeads: 0,
    totalStudents: 0,
    activeTrials: 0,
    pendingLeads: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const leadsRef = collection(db, "school_leads");
      const studentsRef = collection(db, "student_signups");

      const [leadsSnapshot, studentsSnapshot] = await Promise.all([
        getDocs(leadsRef),
        getDocs(studentsRef),
      ]);

      const leadsData = leadsSnapshot.docs.map(doc => doc.data());
      const studentsData = studentsSnapshot.docs.map(doc => doc.data());

      const newLeads = leadsData.filter((l) => (l as { status?: string }).status === "new").length;
      const activeTrials = studentsData.filter((s) => (s as { status?: string }).status === "trial").length;

      setStats({
        totalLeads: leadsSnapshot.size,
        totalStudents: studentsSnapshot.size,
        activeTrials,
        pendingLeads: newLeads,
      });
    } catch (error) {
      console.error("Error loading stats:", error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: "School Leads",
      value: stats.totalLeads,
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Students",
      value: stats.totalStudents,
      icon: GraduationCap,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Active Trials",
      value: stats.activeTrials,
      icon: Clock,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      title: "Pending Leads",
      value: stats.pendingLeads,
      icon: CheckCircle,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
  ];

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-muted-foreground">Loading dashboard...</div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground mb-2">Dashboard</h1>
          <p className="text-muted-foreground">Welcome to your StudyBuddy admin portal</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.title}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </CardTitle>
                  <div className={`w-10 h-10 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
                    <Icon className={`w-5 h-5 ${stat.color}`} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-foreground">{stat.value}</div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                View detailed analytics in the respective sections
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Link
                  to="/admin/leads"
                  className="block text-sm text-primary hover:underline"
                >
                  → Review new school leads
                </Link>
                <Link
                  to="/admin/students"
                  className="block text-sm text-primary hover:underline"
                >
                  → Manage student accounts
                </Link>
                <Link
                  to="/admin/payments"
                  className="block text-sm text-primary hover:underline"
                >
                  → Process payment approvals
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;

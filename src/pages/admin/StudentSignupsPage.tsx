import { useState, useEffect, useCallback } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { db } from "@/lib/firebase";
import { collection, query, where, orderBy, getDocs, doc, updateDoc } from "firebase/firestore";
import { GraduationCap, Mail, Phone, Calendar, RefreshCw, BookOpen } from "lucide-react";
import { format, differenceInDays } from "date-fns";

interface StudentSignup {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  date_of_birth: string;
  grade: number;
  status: string;
  trial_ends_at: string | null;
  created_at: string;
  [key: string]: unknown;
}

const StudentSignupsPage = () => {
  const [students, setStudents] = useState<StudentSignup[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const loadStudents = useCallback(async () => {
    setLoading(true);
    try {
      const studentsRef = collection(db, "student_signups");
      let q = query(studentsRef, orderBy("created_at", "desc"));

      if (statusFilter !== "all") {
        q = query(studentsRef, where("status", "==", statusFilter), orderBy("created_at", "desc"));
      }

      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as StudentSignup[];

      setStudents(data);
    } catch (error) {
      console.error("Error loading students:", error);
      alert("Failed to load students");
    } finally {
      setLoading(false);
    }
  }, [statusFilter]);

  useEffect(() => {
    loadStudents();
  }, [loadStudents]);

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      const studentRef = doc(db, "student_signups", id);
      await updateDoc(studentRef, { status: newStatus });
      await loadStudents();
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update status");
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
      case "suspended":
        return "bg-red-100 text-red-800 border-red-300";
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
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Student Signups</h1>
            <p className="text-muted-foreground">Manage student registrations and trials</p>
          </div>
          <Button onClick={loadStudents} variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Filter Students</CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-64">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Students</SelectItem>
                <SelectItem value="trial">Trial</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading students...</p>
          </div>
        ) : students.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <GraduationCap className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No students found</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {students.map((student) => {
              const trialStatus = getTrialStatus(student.trial_ends_at);
              const subjects = student.subjects ? student.subjects.split(",") : [];
              
              return (
                <Card key={student.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <CardTitle className="text-xl">
                          {student.full_name}
                        </CardTitle>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <GraduationCap className="w-4 h-4" />
                            Grade {student.grade}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {format(new Date(student.created_at), "MMM d, yyyy")}
                          </span>
                        </div>
                      </div>
                      <Badge className={getStatusColor(student.status)}>
                        {student.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-sm font-medium text-foreground mb-2">Contact Information</h4>
                        <div className="space-y-1 text-sm">
                          <a
                            href={`mailto:${student.email}`}
                            className="flex items-center gap-2 text-blue-600 hover:underline"
                          >
                            <Mail className="w-4 h-4" />
                            {student.email}
                          </a>
                          <a
                            href={`tel:${student.phone}`}
                            className="flex items-center gap-2 text-blue-600 hover:underline"
                          >
                            <Phone className="w-4 h-4" />
                            {student.phone}
                          </a>
                          {student.parent_email && (
                            <a
                              href={`mailto:${student.parent_email}`}
                              className="flex items-center gap-2 text-blue-600 hover:underline"
                            >
                              <Mail className="w-4 h-4" />
                              Parent: {student.parent_email}
                            </a>
                          )}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium text-foreground mb-2">Learning Details</h4>
                        <div className="space-y-1 text-sm text-muted-foreground">
                          <p>
                            <strong>Curriculum:</strong> {student.curriculum}
                          </p>
                          {student.school_name && (
                            <p>
                              <strong>School:</strong> {student.school_name}
                            </p>
                          )}
                          {trialStatus && student.status === "trial" && (
                            <p className={`font-medium ${trialStatus.color}`}>
                              <strong>Trial:</strong> {trialStatus.text}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    {subjects.length > 0 && (
                      <div>
                        <h4 className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                          <BookOpen className="w-4 h-4" />
                          Selected Subjects ({subjects.length})
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {subjects.map((subject) => (
                            <Badge key={subject} variant="outline">
                              {subject.trim()}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex gap-2 pt-2">
                      <Select
                        value={student.status}
                        onValueChange={(value) => updateStatus(student.id, value)}
                      >
                        <SelectTrigger className="w-48">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="trial">Trial</SelectItem>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="inactive">Inactive</SelectItem>
                          <SelectItem value="suspended">Suspended</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default StudentSignupsPage;

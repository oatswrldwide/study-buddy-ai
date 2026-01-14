import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import SchoolLayout from "@/components/school/SchoolLayout";
import { db } from "@/lib/firebase";
import { doc, getDoc, collection, query, where, orderBy, getDocs } from "firebase/firestore";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Filter } from "lucide-react";
import { differenceInDays } from "date-fns";

interface Student {
  id: string;
  full_name: string;
  grade: string;
  subjects: string;
  curriculum: string;
  status: string;
  trial_ends_at: string | null;
  parent_email: string;
  created_at: string;
}

const SchoolStudentsPage = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [students, setStudents] = useState<Student[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [gradeFilter, setGradeFilter] = useState<string>("all");
  const [subjectFilter, setSubjectFilter] = useState<string>("all");
  const [schoolName, setSchoolName] = useState<string>("");

  useEffect(() => {
    if (user) {
      loadStudents();
    }
  }, [user]);

  useEffect(() => {
    filterStudents();
  }, [students, searchTerm, gradeFilter, subjectFilter]);

  const loadStudents = async () => {
    try {
      setLoading(true);

      // First get the school account to find the school name
      const schoolRef = doc(db, "school_accounts", user?.uid || "");
      const schoolDoc = await getDoc(schoolRef);

      if (!schoolDoc.exists()) {
        console.error("No school account found");
        return;
      }

      const schoolData = schoolDoc.data();
      setSchoolName(schoolData.school_name);

      // Load students for this school
      const studentsRef = collection(db, "student_signups");
      const q = query(
        studentsRef,
        where("school_name", "==", schoolData.school_name),
        orderBy("created_at", "desc")
      );
      
      const snapshot = await getDocs(q);
      const studentsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Student[];

      setStudents(studentsData);
    } catch (error) {
      console.error("Error loading students:", error);
    } finally {
      setLoading(false);
    }
  };

  const filterStudents = () => {
    let filtered = [...students];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (student) =>
          student.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          student.parent_email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Grade filter
    if (gradeFilter !== "all") {
      filtered = filtered.filter((student) => student.grade === gradeFilter);
    }

    // Subject filter
    if (subjectFilter !== "all") {
      filtered = filtered.filter((student) =>
        student.subjects.toLowerCase().includes(subjectFilter.toLowerCase())
      );
    }

    setFilteredStudents(filtered);
  };

  const getTrialStatus = (trialEndsAt: string | null) => {
    if (!trialEndsAt) return { text: "No Trial", color: "bg-gray-500" };

    const daysLeft = differenceInDays(new Date(trialEndsAt), new Date());

    if (daysLeft < 0) {
      return { text: "Expired", color: "bg-red-500" };
    } else if (daysLeft <= 3) {
      return { text: `${daysLeft} days left`, color: "bg-orange-500" };
    } else {
      return { text: `${daysLeft} days left`, color: "bg-green-500" };
    }
  };

  const getStatusBadge = (status: string) => {
    const colors: Record<string, string> = {
      trial: "bg-blue-500",
      active: "bg-green-500",
      inactive: "bg-gray-500",
      suspended: "bg-red-500",
    };
    return colors[status] || "bg-gray-500";
  };

  const uniqueGrades = Array.from(new Set(students.map((s) => s.grade))).sort();
  const uniqueSubjects = Array.from(
    new Set(
      students.flatMap((s) =>
        s.subjects
          .split(",")
          .map((subj) => subj.trim())
          .filter(Boolean)
      )
    )
  ).sort();

  if (loading) {
    return (
      <SchoolLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading students...</p>
          </div>
        </div>
      </SchoolLayout>
    );
  }

  return (
    <SchoolLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">
            Students
          </h1>
          <p className="text-muted-foreground">
            Manage and monitor all enrolled students at {schoolName}
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Students
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{students.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Active
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {students.filter((s) => s.status === "active").length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                On Trial
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {students.filter((s) => s.status === "trial").length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Expiring Soon
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-500">
                {
                  students.filter((s) => {
                    if (!s.trial_ends_at) return false;
                    const daysLeft = differenceInDays(
                      new Date(s.trial_ends_at),
                      new Date()
                    );
                    return daysLeft >= 0 && daysLeft <= 3;
                  }).length
                }
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Grade Filter */}
              <Select value={gradeFilter} onValueChange={setGradeFilter}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by grade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Grades</SelectItem>
                  {uniqueGrades.map((grade) => (
                    <SelectItem key={grade} value={grade}>
                      Grade {grade}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Subject Filter */}
              <Select value={subjectFilter} onValueChange={setSubjectFilter}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Subjects</SelectItem>
                  {uniqueSubjects.map((subject) => (
                    <SelectItem key={subject} value={subject}>
                      {subject}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Students Table */}
        <Card>
          <CardContent className="pt-6">
            {filteredStudents.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  {searchTerm || gradeFilter !== "all" || subjectFilter !== "all"
                    ? "No students match your filters"
                    : "No students enrolled yet"}
                </p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student Name</TableHead>
                    <TableHead>Grade</TableHead>
                    <TableHead>Subjects</TableHead>
                    <TableHead>Curriculum</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Trial Status</TableHead>
                    <TableHead>Parent Email</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStudents.map((student) => {
                    const trialStatus = getTrialStatus(student.trial_ends_at);
                    return (
                      <TableRow key={student.id}>
                        <TableCell className="font-medium">
                          {student.full_name}
                        </TableCell>
                        <TableCell>{student.grade}</TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {student.subjects
                              .split(",")
                              .slice(0, 2)
                              .map((subject, idx) => (
                                <Badge
                                  key={idx}
                                  variant="secondary"
                                  className="text-xs"
                                >
                                  {subject.trim()}
                                </Badge>
                              ))}
                            {student.subjects.split(",").length > 2 && (
                              <Badge variant="secondary" className="text-xs">
                                +{student.subjects.split(",").length - 2}
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{student.curriculum}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusBadge(student.status)}>
                            {student.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={trialStatus.color}>
                            {trialStatus.text}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {student.parent_email}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => {
                              toast({
                                title: "Coming Soon",
                                description: "Detailed student view is under development.",
                              });
                            }}
                          >
                            View Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </SchoolLayout>
  );
};

export default SchoolStudentsPage;

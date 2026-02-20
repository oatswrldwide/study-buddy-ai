import { useEffect, useState, useCallback } from "react";
import { db } from "@/lib/firebase";
import { collection, query, where, orderBy, getDocs, doc, updateDoc } from "firebase/firestore";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar, Mail, Phone, Building2, RefreshCw } from "lucide-react";
import { format } from "date-fns";

interface SchoolLead {
  id: string;
  created_at: string;
  full_name: string;
  email: string;
  phone: string;
  position: string;
  school_name: string;
  province: string;
  school_type: string;
  learner_count: number;
  curriculum: string[];
  subjects: string[];
  challenges: string;
  status: string;
}

const SchoolLeadsPage = () => {
  const [leads, setLeads] = useState<SchoolLead[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  const loadLeads = useCallback(async () => {
    setLoading(true);
    try {
      const leadsRef = collection(db, "school_leads");
      let q = query(leadsRef, orderBy("created_at", "desc"));

      if (filter !== "all") {
        q = query(leadsRef, where("status", "==", filter), orderBy("created_at", "desc"));
      }

      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as SchoolLead[];

      setLeads(data);
    } catch (error) {
      console.error("Error loading leads:", error);
      alert("Failed to load leads");
    } finally {
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    loadLeads();
  }, [loadLeads]);

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      const leadRef = doc(db, "school_leads", id);
      await updateDoc(leadRef, { status: newStatus });
      loadLeads();
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update status");
    }
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      new: "bg-blue-100 text-blue-800",
      contacted: "bg-yellow-100 text-yellow-800",
      demo_scheduled: "bg-purple-100 text-purple-800",
      converted: "bg-green-100 text-green-800",
      rejected: "bg-red-100 text-red-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-display font-bold text-foreground mb-2">
              School Leads
            </h1>
            <p className="text-muted-foreground">Manage demo requests from schools</p>
          </div>
          <Button onClick={loadLeads} variant="outline">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>

        <div className="flex items-center gap-4">
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Leads</SelectItem>
              <SelectItem value="new">New</SelectItem>
              <SelectItem value="contacted">Contacted</SelectItem>
              <SelectItem value="demo_scheduled">Demo Scheduled</SelectItem>
              <SelectItem value="converted">Converted</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
          <div className="text-sm text-muted-foreground">
            Showing {leads.length} lead{leads.length !== 1 ? "s" : ""}
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12 text-muted-foreground">Loading leads...</div>
        ) : leads.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center text-muted-foreground">
              No leads found
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {leads.map((lead) => (
              <Card key={lead.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <CardTitle className="text-xl">{lead.school_name}</CardTitle>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Building2 className="w-4 h-4" />
                          {lead.school_type} • {lead.province}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {format(new Date(lead.created_at), "MMM d, yyyy")}
                        </span>
                      </div>
                    </div>
                    <Badge className={getStatusColor(lead.status)}>
                      {lead.status.replace("_", " ")}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm font-medium text-foreground">Contact Person</label>
                        <p className="text-sm text-muted-foreground">
                          {lead.full_name} - {lead.position}
                        </p>
                      </div>
                      <div className="flex items-center gap-4 text-sm">
                        <a
                          href={`mailto:${lead.email}`}
                          className="flex items-center gap-1 text-primary hover:underline"
                        >
                          <Mail className="w-4 h-4" />
                          {lead.email}
                        </a>
                        <a
                          href={`tel:${lead.phone}`}
                          className="flex items-center gap-1 text-primary hover:underline"
                        >
                          <Phone className="w-4 h-4" />
                          {lead.phone}
                        </a>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-foreground">Learners</label>
                        <p className="text-sm text-muted-foreground">{lead.learner_count} students</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm font-medium text-foreground">Curriculum</label>
                        <p className="text-sm text-muted-foreground">{lead.curriculum.join(", ")}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-foreground">Challenges</label>
                        <p className="text-sm text-muted-foreground line-clamp-2">{lead.challenges}</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t flex items-center gap-2">
                    <label className="text-sm font-medium text-foreground">Update Status:</label>
                    <Select
                      value={lead.status}
                      onValueChange={(value) => updateStatus(lead.id, value)}
                    >
                      <SelectTrigger className="w-48">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="new">New</SelectItem>
                        <SelectItem value="contacted">Contacted</SelectItem>
                        <SelectItem value="demo_scheduled">Demo Scheduled</SelectItem>
                        <SelectItem value="converted">Converted</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default SchoolLeadsPage;

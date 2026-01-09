import SchoolLayout from "@/components/school/SchoolLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const SchoolPerformance = () => {
  return (
    <SchoolLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground mb-2">
            Performance Analytics
          </h1>
          <p className="text-muted-foreground">
            Track student performance and learning outcomes
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Performance Dashboard</CardTitle>
            <CardDescription>Coming soon - Detailed performance analytics</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              This feature is under development. You'll be able to see:
            </p>
            <ul className="list-disc list-inside mt-4 space-y-2 text-muted-foreground">
              <li>Student performance trends and insights</li>
              <li>Subject-wise analytics and comparisons</li>
              <li>Engagement metrics and study patterns</li>
              <li>Class and grade-level reports</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </SchoolLayout>
  );
};

export default SchoolPerformance;

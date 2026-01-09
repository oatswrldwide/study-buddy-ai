import ParentLayout from "@/components/parent/ParentLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const ParentActivity = () => {
  return (
    <ParentLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground mb-2">
            Child's Activity
          </h1>
          <p className="text-muted-foreground">
            Monitor your child's learning progress and activity
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Activity Dashboard</CardTitle>
            <CardDescription>Coming soon - Detailed activity tracking</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              This feature is under development. You'll be able to see:
            </p>
            <ul className="list-disc list-inside mt-4 space-y-2 text-muted-foreground">
              <li>Daily study sessions and time spent</li>
              <li>Subjects covered and topics studied</li>
              <li>Performance metrics and progress</li>
              <li>AI chat history and questions asked</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </ParentLayout>
  );
};

export default ParentActivity;

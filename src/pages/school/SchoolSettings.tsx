import SchoolLayout from "@/components/school/SchoolLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const SchoolSettings = () => {
  return (
    <SchoolLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground mb-2">
            Settings
          </h1>
          <p className="text-muted-foreground">
            Manage school account and preferences
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>School Settings</CardTitle>
            <CardDescription>Coming soon - School account management</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              This feature is under development. You'll be able to:
            </p>
            <ul className="list-disc list-inside mt-4 space-y-2 text-muted-foreground">
              <li>Update school profile and contact information</li>
              <li>Manage teacher and admin accounts</li>
              <li>Configure curriculum and subject settings</li>
              <li>Set usage policies and restrictions</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </SchoolLayout>
  );
};

export default SchoolSettings;

import ParentLayout from "@/components/parent/ParentLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const ParentSettings = () => {
  return (
    <ParentLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground mb-2">
            Settings
          </h1>
          <p className="text-muted-foreground">
            Manage your account and preferences
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Account Settings</CardTitle>
            <CardDescription>Coming soon - Account and preference management</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              This feature is under development. You'll be able to:
            </p>
            <ul className="list-disc list-inside mt-4 space-y-2 text-muted-foreground">
              <li>Update profile information and contact details</li>
              <li>Manage notification preferences</li>
              <li>Set parental controls and restrictions</li>
              <li>Configure security and privacy settings</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </ParentLayout>
  );
};

export default ParentSettings;

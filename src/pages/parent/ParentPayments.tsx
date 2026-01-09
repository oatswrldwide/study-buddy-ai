import ParentLayout from "@/components/parent/ParentLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const ParentPayments = () => {
  return (
    <ParentLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground mb-2">
            Payments
          </h1>
          <p className="text-muted-foreground">
            Manage subscription and payment information
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Payment Management</CardTitle>
            <CardDescription>Coming soon - Subscription and billing management</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              This feature is under development. You'll be able to:
            </p>
            <ul className="list-disc list-inside mt-4 space-y-2 text-muted-foreground">
              <li>View current subscription plan and status</li>
              <li>Update payment methods</li>
              <li>View billing history and invoices</li>
              <li>Upgrade or change subscription plans</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </ParentLayout>
  );
};

export default ParentPayments;

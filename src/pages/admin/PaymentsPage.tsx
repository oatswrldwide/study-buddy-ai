import { useState, useEffect, useCallback } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { db } from "@/lib/firebase";
import { collection, query, where, orderBy, getDocs, doc, updateDoc, serverTimestamp, Timestamp } from "firebase/firestore";
import { CreditCard, Calendar, DollarSign, RefreshCw, CheckCircle2, XCircle, Eye } from "lucide-react";
import { format } from "date-fns";

interface PaymentProof {
  id: string;
  student_id: string;
  amount: number;
  payment_method: string;
  proof_image_url: string;
  status: string;
  created_at: Timestamp;
  reviewed_at?: Timestamp;
  rejection_reason?: string;
  subscription_start_date?: Timestamp;
  [key: string]: unknown;
}

const PaymentsPage = () => {
  const [payments, setPayments] = useState<PaymentProof[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedPayment, setSelectedPayment] = useState<PaymentProof | null>(null);
  const [showImageDialog, setShowImageDialog] = useState(false);
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");

  const loadPayments = useCallback(async () => {
    setLoading(true);
    try {
      const paymentsRef = collection(db, "payment_proofs");
      let q = query(paymentsRef, orderBy("created_at", "desc"));

      if (statusFilter !== "all") {
        q = query(paymentsRef, where("status", "==", statusFilter), orderBy("created_at", "desc"));
      }

      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as PaymentProof[];

      setPayments(data);
    } catch (error) {
      console.error("Error loading payments:", error);
      alert("Failed to load payment proofs");
    } finally {
      setLoading(false);
    }
  }, [statusFilter]);

  useEffect(() => {
    loadPayments();
  }, [loadPayments]);

  const approvePayment = async (id: string) => {
    try {
      const paymentRef = doc(db, "payment_proofs", id);
      await updateDoc(paymentRef, {
        status: "approved",
        reviewed_at: serverTimestamp(),
        subscription_start_date: serverTimestamp(),
      });

      // Update student status to active
      const payment = payments.find((p) => p.id === id);
      if (payment) {
        const studentRef = doc(db, "student_signups", payment.student_id);
        await updateDoc(studentRef, { status: "active" });
      }

      alert("Payment approved! Student activated.");
      await loadPayments();
    } catch (error) {
      console.error("Error approving payment:", error);
      alert("Failed to approve payment");
    }
  };

  const rejectPayment = async () => {
    if (!selectedPayment || !rejectionReason.trim()) {
      alert("Please provide a rejection reason");
      return;
    }

    try {
      const paymentRef = doc(db, "payment_proofs", selectedPayment.id);
      await updateDoc(paymentRef, {
        status: "rejected",
        reviewed_at: serverTimestamp(),
        rejection_reason: rejectionReason,
      });

      alert("Payment rejected. Student notified.");
      setShowRejectDialog(false);
      setRejectionReason("");
      setSelectedPayment(null);
      await loadPayments();
    } catch (error) {
      console.error("Error rejecting payment:", error);
      alert("Failed to reject payment");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "approved":
        return "bg-green-100 text-green-800 border-green-300";
      case "rejected":
        return "bg-red-100 text-red-800 border-red-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Payment Proofs</h1>
            <p className="text-muted-foreground">Review and approve student payments</p>
          </div>
          <Button onClick={loadPayments} variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Filter Payments</CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-64">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Payments</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading payment proofs...</p>
          </div>
        ) : payments.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <CreditCard className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No payment proofs found</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {payments.map((payment) => (
              <Card key={payment.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <CardTitle className="text-xl">
                        Payment #{payment.id.slice(0, 8)}
                      </CardTitle>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {format(new Date(payment.created_at), "MMM d, yyyy HH:mm")}
                        </span>
                        <span className="flex items-center gap-1">
                          <DollarSign className="w-4 h-4" />
                          R{payment.amount.toFixed(2)}
                        </span>
                      </div>
                    </div>
                    <Badge className={getStatusColor(payment.status)}>
                      {payment.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-medium text-foreground mb-2">Payment Details</h4>
                      <div className="space-y-1 text-sm text-muted-foreground">
                        <p>
                          <strong>Method:</strong> {payment.payment_method}
                        </p>
                        <p>
                          <strong>Student ID:</strong> {payment.student_id.slice(0, 8)}...
                        </p>
                        {payment.reviewed_at && (
                          <p>
                            <strong>Reviewed:</strong>{" "}
                            {format(new Date(payment.reviewed_at), "MMM d, yyyy")}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-foreground mb-2">Proof of Payment</h4>
                      {payment.proof_image_url ? (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedPayment(payment);
                            setShowImageDialog(true);
                          }}
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          View Image
                        </Button>
                      ) : (
                        <p className="text-sm text-muted-foreground">No image uploaded</p>
                      )}
                    </div>
                  </div>

                  {payment.rejection_reason && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                      <p className="text-sm text-red-800">
                        <strong>Rejection Reason:</strong> {payment.rejection_reason}
                      </p>
                    </div>
                  )}

                  {payment.status === "pending" && (
                    <div className="flex gap-2 pt-2">
                      <Button
                        onClick={() => approvePayment(payment.id)}
                        size="sm"
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <CheckCircle2 className="w-4 h-4 mr-2" />
                        Approve Payment
                      </Button>
                      <Button
                        onClick={() => {
                          setSelectedPayment(payment);
                          setShowRejectDialog(true);
                        }}
                        variant="destructive"
                        size="sm"
                      >
                        <XCircle className="w-4 h-4 mr-2" />
                        Reject Payment
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Image Viewer Dialog */}
      <Dialog open={showImageDialog} onOpenChange={setShowImageDialog}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Payment Proof</DialogTitle>
          </DialogHeader>
          {selectedPayment?.proof_image_url && (
            <div className="max-h-[600px] overflow-auto">
              <img
                src={selectedPayment.proof_image_url}
                alt="Payment proof"
                className="w-full h-auto rounded-lg"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Rejection Dialog */}
      <Dialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Payment</DialogTitle>
            <DialogDescription>
              Please provide a reason for rejecting this payment. The student will be notified.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Textarea
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              placeholder="e.g., Proof of payment is unclear, amount doesn't match, etc."
              rows={4}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRejectDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={rejectPayment}>
              Reject Payment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default PaymentsPage;

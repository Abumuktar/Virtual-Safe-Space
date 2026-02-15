import { AlertTriangle, Mail, Phone } from "lucide-react";

const PaymentWall = () => {
  return (
    <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-background border border-border rounded-2xl max-w-md w-full p-8 text-center shadow-2xl">
        <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="w-8 h-8 text-destructive" />
        </div>

        <h2 className="text-2xl font-bold text-foreground mb-2">
          Site Access Restricted
        </h2>

        <p className="text-muted-foreground mb-6">
          This website is currently unavailable. An outstanding payment of{" "}
          <span className="font-bold text-foreground">$500.00</span> is required
          to restore full access.
        </p>

        <div className="bg-muted/50 rounded-xl p-4 mb-6 text-left space-y-3">
          <p className="text-sm font-semibold text-foreground">
            Contact the developer:
          </p>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Mail size={16} className="text-primary" />
            <span>developer@example.com</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Phone size={16} className="text-primary" />
            <span>+1 (000) 000-0000</span>
          </div>
        </div>

        <p className="text-xs text-muted-foreground">
          Once payment is confirmed, access will be restored immediately.
        </p>
      </div>
    </div>
  );
};

export default PaymentWall;

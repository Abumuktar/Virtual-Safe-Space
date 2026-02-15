import { Mail } from "lucide-react";

const PaymentWall = () => {
  return (
    <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-background border border-border rounded-2xl max-w-md w-full p-8 text-center shadow-2xl">
        <div className="text-6xl mb-6">🎭</div>

        <h2 className="text-2xl font-bold text-foreground mb-2">
          Site Access Restricted
        </h2>

        <p className="text-muted-foreground mb-6">
          This website is currently unavailable. An outstanding payment of{" "}
          <span className="font-bold text-foreground">$500.00</span> is required
          to restore full access.
        </p>

        <div className="bg-muted/50 rounded-xl p-4 mb-6">
          <p className="text-sm font-semibold text-foreground mb-3">
            Contact the developer:
          </p>
          <a
            href="mailto:saytuneorg@gmail.com"
            className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
          >
            <Mail size={16} />
            saytuneorg@gmail.com
          </a>
        </div>

        <p className="text-xs text-muted-foreground">
          Once payment is confirmed, access will be restored immediately.
        </p>
      </div>
    </div>
  );
};

export default PaymentWall;

import { Mail } from "lucide-react";
import { useState, useEffect } from "react";

const DEADLINE = new Date("2026-03-07T23:59:59").getTime();

const PaymentWall = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const tick = () => {
      const diff = Math.max(0, DEADLINE - Date.now());
      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-background border border-border rounded-2xl max-w-md w-full p-8 text-center shadow-2xl">
        <div className="text-6xl mb-6 animate-bounce">🎭</div>

        <h2 className="text-3xl font-extrabold text-foreground mb-2">
          ⚠️ Site Access Restricted ⚠️
        </h2>

        <p className="text-base font-bold text-foreground mb-4">
          This website is currently unavailable. An outstanding payment of{" "}
          <span className="text-destructive text-lg font-extrabold">$500.00</span> is required
          to restore full access.
        </p>

        <div className="grid grid-cols-4 gap-2 mb-6">
          {[
            { label: "Days", value: timeLeft.days },
            { label: "Hours", value: timeLeft.hours },
            { label: "Min", value: timeLeft.minutes },
            { label: "Sec", value: timeLeft.seconds },
          ].map((t) => (
            <div key={t.label} className="bg-destructive/10 border border-destructive/30 rounded-xl p-3">
              <div className="text-2xl font-extrabold text-destructive">{String(t.value).padStart(2, "0")}</div>
              <div className="text-xs font-semibold text-muted-foreground">{t.label}</div>
            </div>
          ))}
        </div>

        <p className="text-sm font-bold text-destructive mb-4">
          System access will be permanently revoked when the timer expires.
        </p>

        <div className="bg-muted/50 rounded-xl p-4 mb-6">
          <p className="text-sm font-bold text-foreground mb-3">
            Contact the developer to make payment:
          </p>
          <a
            href="mailto:saytuneorg@gmail.com"
            className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline"
          >
            <Mail size={16} />
            saytuneorg@gmail.com
          </a>
        </div>

        <p className="text-xs font-semibold text-muted-foreground">
          Once payment is confirmed, access will be restored immediately.
        </p>
      </div>
    </div>
  );
};

export default PaymentWall;

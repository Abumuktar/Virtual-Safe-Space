import { Mail } from "lucide-react";
import { useState, useEffect, useRef, useCallback } from "react";

const DEADLINE = new Date("2026-03-07T23:59:59").getTime();

const MiniGame = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [started, setStarted] = useState(false);
  const gameState = useRef({
    playerY: 0,
    velocity: 0,
    obstacles: [] as { x: number; height: number; gap: number }[],
    frame: 0,
    score: 0,
    running: false,
  });

  const reset = useCallback(() => {
    const s = gameState.current;
    s.playerY = 120;
    s.velocity = 0;
    s.obstacles = [];
    s.frame = 0;
    s.score = 0;
    s.running = true;
    setScore(0);
    setGameOver(false);
    setStarted(true);
  }, []);

  const jump = useCallback(() => {
    if (!started) { reset(); return; }
    if (gameOver) { reset(); return; }
    gameState.current.velocity = -5.5;
  }, [started, gameOver, reset]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let animId: number;

    const loop = () => {
      const s = gameState.current;
      const W = canvas.width, H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      // Background
      ctx.fillStyle = "#0f172a";
      ctx.fillRect(0, 0, W, H);

      // Ground
      ctx.fillStyle = "#1e293b";
      ctx.fillRect(0, H - 20, W, 20);
      ctx.strokeStyle = "#334155";
      ctx.beginPath(); ctx.moveTo(0, H - 20); ctx.lineTo(W, H - 20); ctx.stroke();

      if (!s.running) {
        ctx.fillStyle = "#94a3b8";
        ctx.font = "bold 13px sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("Tap / Space to play", W / 2, H / 2);
        animId = requestAnimationFrame(loop);
        return;
      }

      // Player (bird-like circle)
      s.velocity += 0.25;
      s.playerY += s.velocity;
      if (s.playerY > H - 32) { s.playerY = H - 32; s.velocity = 0; }
      if (s.playerY < 0) { s.playerY = 0; s.velocity = 0; }

      const px = 40, py = s.playerY, pr = 10;
      ctx.fillStyle = "#f59e0b";
      ctx.beginPath(); ctx.arc(px, py, pr, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = "#fbbf24";
      ctx.beginPath(); ctx.arc(px + 3, py - 3, 4, 0, Math.PI * 2); ctx.fill();

      // Obstacles
      s.frame++;
      if (s.frame % 90 === 0) {
        const gap = 60 + Math.random() * 20;
        const height = 30 + Math.random() * (H - 90 - gap);
        s.obstacles.push({ x: W, height, gap });
      }

      ctx.fillStyle = "#ef4444";
      for (let i = s.obstacles.length - 1; i >= 0; i--) {
        const o = s.obstacles[i];
        o.x -= 2.5;
        // Top pipe
        ctx.fillRect(o.x, 0, 28, o.height);
        ctx.fillStyle = "#dc2626";
        ctx.fillRect(o.x - 2, o.height - 8, 32, 8);
        // Bottom pipe
        ctx.fillStyle = "#ef4444";
        ctx.fillRect(o.x, o.height + o.gap, 28, H - o.height - o.gap);
        ctx.fillStyle = "#dc2626";
        ctx.fillRect(o.x - 2, o.height + o.gap, 32, 8);
        ctx.fillStyle = "#ef4444";

        // Collision
        if (px + pr > o.x && px - pr < o.x + 28) {
          if (py - pr < o.height || py + pr > o.height + o.gap) {
            s.running = false;
            setGameOver(true);
          }
        }
        // Score
        if (o.x + 28 < px && o.x + 28 >= px - 2.5) {
          s.score++;
          setScore(s.score);
        }
        if (o.x < -32) s.obstacles.splice(i, 1);
      }

      // Score display
      ctx.fillStyle = "#e2e8f0";
      ctx.font = "bold 14px monospace";
      ctx.textAlign = "right";
      ctx.fillText(`${s.score}`, W - 10, 20);

      if (!s.running) {
        ctx.fillStyle = "rgba(0,0,0,0.5)";
        ctx.fillRect(0, 0, W, H);
        ctx.fillStyle = "#f8fafc";
        ctx.font = "bold 16px sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("Game Over!", W / 2, H / 2 - 10);
        ctx.font = "12px sans-serif";
        ctx.fillStyle = "#94a3b8";
        ctx.fillText("Tap to retry", W / 2, H / 2 + 12);
      }

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [started, gameOver]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.code === "Space") { e.preventDefault(); jump(); } };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [jump]);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between px-1">
        <p className="text-xs font-semibold text-muted-foreground">🎮 While you wait...</p>
        <p className="text-xs font-bold text-foreground">Score: {score}</p>
      </div>
      <canvas
        ref={canvasRef}
        width={320}
        height={200}
        onClick={jump}
        onTouchStart={(e) => { e.preventDefault(); jump(); }}
        className="w-full rounded-xl border border-border cursor-pointer"
        style={{ imageRendering: "pixelated" }}
      />
    </div>
  );
};

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
    <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-gradient-to-b from-card to-background border border-border rounded-3xl max-w-sm w-full p-6 sm:p-8 shadow-2xl space-y-5 my-4">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="text-5xl animate-bounce">🎭</div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
            Access Restricted
          </h2>
          <p className="text-sm font-bold text-muted-foreground leading-relaxed">
            Outstanding payment of{" "}
            <span className="text-destructive font-extrabold text-base">$500</span>{" "}
            required to restore this site.
          </p>
        </div>

        {/* Timer */}
        <div className="grid grid-cols-4 gap-2">
          {[
            { label: "Days", value: timeLeft.days },
            { label: "Hrs", value: timeLeft.hours },
            { label: "Min", value: timeLeft.minutes },
            { label: "Sec", value: timeLeft.seconds },
          ].map((t) => (
            <div key={t.label} className="bg-destructive/10 border border-destructive/20 rounded-2xl py-2.5 px-1">
              <div className="text-xl sm:text-2xl font-extrabold text-destructive tabular-nums">
                {String(t.value).padStart(2, "0")}
              </div>
              <div className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                {t.label}
              </div>
            </div>
          ))}
        </div>

        {/* Game */}
        <MiniGame />

        {/* Contact */}
        <div className="bg-muted/40 rounded-2xl p-4 text-center space-y-2">
          <p className="text-xs font-bold text-foreground">Contact developer to pay:</p>
          <a
            href="mailto:saytuneorg@gmail.com"
            className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline transition-colors"
          >
            <Mail size={14} />
            saytuneorg@gmail.com
          </a>
        </div>

        <p className="text-[10px] text-center font-semibold text-muted-foreground">
          Access restored immediately upon payment confirmation.
        </p>
      </div>
    </div>
  );
};

export default PaymentWall;

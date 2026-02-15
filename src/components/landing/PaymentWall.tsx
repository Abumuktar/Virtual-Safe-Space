import { Mail, Gamepad2, Volume2, VolumeX } from "lucide-react";
import { useState, useEffect, useRef, useCallback } from "react";

const DEADLINE_DURATION = 20 * 24 * 60 * 60 * 1000; // 20 days from first visit

const getDeadline = () => {
  const stored = localStorage.getItem("vss_first_visit");
  if (stored) return parseInt(stored, 10) + DEADLINE_DURATION;
  const now = Date.now();
  localStorage.setItem("vss_first_visit", String(now));
  return now + DEADLINE_DURATION;
};

// Simple beep via AudioContext
const beep = (freq: number, dur: number, vol = 0.15) => {
  try {
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.frequency.value = freq;
    gain.gain.value = vol;
    osc.connect(gain).connect(ctx.destination);
    osc.start();
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + dur);
    osc.stop(ctx.currentTime + dur);
  } catch {}
};

const MiniGame = ({ muted }: { muted: boolean }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [started, setStarted] = useState(false);
  const mutedRef = useRef(muted);
  mutedRef.current = muted;

  const gameState = useRef({
    playerY: 0, velocity: 0,
    obstacles: [] as { x: number; height: number; gap: number }[],
    frame: 0, score: 0, running: false,
  });

  const reset = useCallback(() => {
    const s = gameState.current;
    s.playerY = 120; s.velocity = 0; s.obstacles = [];
    s.frame = 0; s.score = 0; s.running = true;
    setScore(0); setGameOver(false); setStarted(true);
    if (!mutedRef.current) beep(600, 0.1);
  }, []);

  const jump = useCallback(() => {
    if (!started || gameOver) { reset(); return; }
    gameState.current.velocity = -5.5;
    if (!mutedRef.current) beep(440, 0.05);
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
      ctx.fillStyle = "#0f172a"; ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = "#1e293b"; ctx.fillRect(0, H - 20, W, 20);
      ctx.strokeStyle = "#334155";
      ctx.beginPath(); ctx.moveTo(0, H - 20); ctx.lineTo(W, H - 20); ctx.stroke();

      if (!s.running) {
        ctx.fillStyle = "#94a3b8"; ctx.font = "bold 13px sans-serif"; ctx.textAlign = "center";
        ctx.fillText("Tap / Space to play", W / 2, H / 2);
        animId = requestAnimationFrame(loop); return;
      }

      s.velocity += 0.25; s.playerY += s.velocity;
      if (s.playerY > H - 32) { s.playerY = H - 32; s.velocity = 0; }
      if (s.playerY < 0) { s.playerY = 0; s.velocity = 0; }

      const px = 40, py = s.playerY, pr = 10;
      ctx.fillStyle = "#f59e0b";
      ctx.beginPath(); ctx.arc(px, py, pr, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = "#fbbf24";
      ctx.beginPath(); ctx.arc(px + 3, py - 3, 4, 0, Math.PI * 2); ctx.fill();

      s.frame++;
      if (s.frame % 90 === 0) {
        const gap = 60 + Math.random() * 20;
        const height = 30 + Math.random() * (H - 90 - gap);
        s.obstacles.push({ x: W, height, gap });
      }

      ctx.fillStyle = "#ef4444";
      for (let i = s.obstacles.length - 1; i >= 0; i--) {
        const o = s.obstacles[i]; o.x -= 2.5;
        ctx.fillRect(o.x, 0, 28, o.height);
        ctx.fillStyle = "#dc2626"; ctx.fillRect(o.x - 2, o.height - 8, 32, 8);
        ctx.fillStyle = "#ef4444"; ctx.fillRect(o.x, o.height + o.gap, 28, H - o.height - o.gap);
        ctx.fillStyle = "#dc2626"; ctx.fillRect(o.x - 2, o.height + o.gap, 32, 8);
        ctx.fillStyle = "#ef4444";

        if (px + pr > o.x && px - pr < o.x + 28) {
          if (py - pr < o.height || py + pr > o.height + o.gap) {
            s.running = false; setGameOver(true);
            if (!mutedRef.current) beep(200, 0.3, 0.2);
          }
        }
        if (o.x + 28 < px && o.x + 28 >= px - 2.5) {
          s.score++; setScore(s.score);
          if (!mutedRef.current) beep(880, 0.08);
        }
        if (o.x < -32) s.obstacles.splice(i, 1);
      }

      ctx.fillStyle = "#e2e8f0"; ctx.font = "bold 14px monospace"; ctx.textAlign = "right";
      ctx.fillText(`${s.score}`, W - 10, 20);

      if (!s.running) {
        ctx.fillStyle = "rgba(0,0,0,0.5)"; ctx.fillRect(0, 0, W, H);
        ctx.fillStyle = "#f8fafc"; ctx.font = "bold 16px sans-serif"; ctx.textAlign = "center";
        ctx.fillText("Game Over!", W / 2, H / 2 - 10);
        ctx.font = "12px sans-serif"; ctx.fillStyle = "#94a3b8";
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
        <p className="text-xs font-semibold text-muted-foreground">🎮 Score: {score}</p>
      </div>
      <canvas
        ref={canvasRef} width={320} height={200} onClick={jump}
        onTouchStart={(e) => { e.preventDefault(); jump(); }}
        className="w-full rounded-xl border border-border cursor-pointer"
        style={{ imageRendering: "pixelated" }}
      />
    </div>
  );
};

const PaymentWall = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [showGame, setShowGame] = useState(false);
  const [muted, setMuted] = useState(false);
  const [deadline] = useState(getDeadline);

  useEffect(() => {
    const tick = () => {
      const diff = Math.max(0, deadline - Date.now());
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
  }, [deadline]);

  return (
    <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-gradient-to-b from-card to-background border border-border rounded-3xl max-w-sm w-full p-6 sm:p-8 shadow-2xl space-y-5 my-4">
        <div className="text-center space-y-2">
          <div className="text-5xl animate-bounce">🎭</div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">Access Restricted</h2>
          <p className="text-sm font-bold text-muted-foreground leading-relaxed">
            Outstanding payment of{" "}
            <span className="text-destructive font-extrabold text-base">$500</span>{" "}
            required to restore this site.
          </p>
        </div>

        <div className="grid grid-cols-4 gap-2">
          {([
            { label: "Days", value: timeLeft.days },
            { label: "Hrs", value: timeLeft.hours },
            { label: "Min", value: timeLeft.minutes },
            { label: "Sec", value: timeLeft.seconds },
          ] as const).map((t) => (
            <div key={t.label} className="bg-destructive/10 border border-destructive/20 rounded-2xl py-2.5 px-1 text-center">
              <div className="text-xl sm:text-2xl font-extrabold text-destructive tabular-nums">
                {String(t.value).padStart(2, "0")}
              </div>
              <div className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">{t.label}</div>
            </div>
          ))}
        </div>

        {!showGame ? (
          <button
            onClick={() => setShowGame(true)}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-primary/10 hover:bg-primary/20 text-primary font-bold text-sm transition-colors"
          >
            <Gamepad2 size={18} />
            Wanna play a game instead?
          </button>
        ) : (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold text-muted-foreground">While you wait...</p>
              <button onClick={() => setMuted(!muted)} className="text-muted-foreground hover:text-foreground transition-colors">
                {muted ? <VolumeX size={14} /> : <Volume2 size={14} />}
              </button>
            </div>
            <MiniGame muted={muted} />
          </div>
        )}

        <div className="bg-muted/40 rounded-2xl p-4 text-center space-y-2">
          <p className="text-xs font-bold text-foreground">Contact developer to pay:</p>
          <a href="mailto:saytuneorg@gmail.com" className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline transition-colors">
            <Mail size={14} /> saytuneorg@gmail.com
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

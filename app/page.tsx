"use client";

import { useState } from "react";

export default function Page() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async () => {
    if (!email || !email.includes("@")) {
      setStatus("error");
      return;
    }

    setStatus("loading");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (data.success) {
        setStatus("success");
        setEmail("");
        setTimeout(() => setStatus("idle"), 3000);
      } else {
        setStatus("error");
      }
    } catch (e) {
      setStatus("error");
    }
  };

  return (
    <main className="relative min-h-screen bg-black text-white overflow-hidden flex items-center justify-center px-6">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#050505] to-black" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-white/20 blur-[180px] opacity-50" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_60%)]" />
      <div className="absolute bottom-[-250px] left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-white/20 blur-[220px] opacity-30" />
      <div className="absolute inset-0 opacity-[0.05] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      <div className="relative z-10 text-center max-w-3xl space-y-10">
        <p className="text-xs tracking-[0.5em] text-white/40 uppercase">
          Arvian Studio
        </p>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-light leading-[1.05] tracking-[-0.03em] drop-shadow-[0_0_25px_rgba(255,255,255,0.15)]">
          Personal scenes,
          <br />
          <span className="italic text-white/80">rebuilt with precision.</span>
        </h1>

        <p className="text-white/50 text-sm md:text-base leading-relaxed max-w-xl mx-auto">
          A controlled system that integrates real human presence into cinematic environments.
          Built for memory, identity, and atmosphere.
        </p>

        <p className="text-white/30 text-xs tracking-[0.4em] uppercase">
          Coming Soon
        </p>

        <div className="flex flex-col items-center gap-3 mt-4">
          <div className="flex items-center justify-center gap-3">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="bg-white/5 border border-white/10 px-6 py-3 rounded-full text-sm outline-none w-[240px] md:w-[300px]"
            />

            <button
              onClick={handleSubmit}
              disabled={status === "loading"}
              className="px-6 py-3 rounded-full bg-white text-black text-sm font-medium"
            >
              {status === "loading"
                ? "Sending..."
                : status === "success"
                ? "✓ Added"
                : "Notify Me"}
            </button>
          </div>

          <div className="h-4 text-xs text-white/40">
            {status === "success" && "You’re on the list."}
            {status === "error" && "Invalid email or error."}
          </div>
        </div>
      </div>
    </main>
  );
}
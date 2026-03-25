"use client";

import { useEffect, useState } from "react";

export default function Page() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  /* 🔥 MOUSE → SADECE YÖNLENDİRME */
  useEffect(() => {
    let currentX = 50;
    let currentY = 50;

    const handleMouseMove = (e: MouseEvent) => {
      const mouseX = (e.clientX / window.innerWidth) * 100;
      const mouseY = (e.clientY / window.innerHeight) * 100;

      // 🔥 inertia (çok kritik)
      currentX += (mouseX - currentX) * 0.06;
      currentY += (mouseY - currentY) * 0.06;

      document.documentElement.style.setProperty("--mx", `${currentX}%`);
      document.documentElement.style.setProperty("--my", `${currentY}%`);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleSubmit = async () => {
    if (!email || !email.includes("@")) {
      setStatus("error");
      return;
    }

    setStatus("loading");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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
    } catch {
      setStatus("error");
    }
  };

  return (
    <main className="relative min-h-screen flex items-center justify-center px-6 text-white overflow-hidden">

      {/* 🔥 LIGHT SYSTEM */}
      <div className="arvian-light" />
      <div className="arvian-depth" />
      <div className="arvian-noise" />

      <div className="text-center max-w-3xl space-y-10 relative z-10">

        <p className="text-xs tracking-[0.5em] text-white/40 uppercase">
          Arvian Studio
        </p>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-light leading-[1.05] tracking-[-0.03em]">
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
              className="bg-white/5 border border-white/10 px-6 py-3 rounded-full text-sm outline-none w-[240px] md:w-[300px] backdrop-blur-md transition focus:border-white/20"
            />

            <button
              onClick={handleSubmit}
              disabled={status === "loading"}
              className="px-6 py-3 rounded-full bg-white text-black text-sm font-medium transition hover:opacity-90 active:scale-[0.97]"
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
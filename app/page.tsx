"use client";

import { FormEvent, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

type SubscribeResponse = {
  success?: boolean;
  message?: string;
  error?: string;
};

export default function RootPage() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email.trim()) {
      setErrorMessage("Iceriye alinacak izi birakmalisin.");
      return;
    }

    setIsSubmitting(true);
    setSuccessMessage(null);
    setErrorMessage(null);

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const payload = (await response.json().catch(() => null)) as SubscribeResponse | null;

      if (!response.ok) {
        throw new Error(
          payload?.error ?? "Katman simdilik sessiz. Birazdan yeniden dene."
        );
      }

      setSuccessMessage(
        payload?.message ?? "Izin katmanina kaydin alindi."
      );
      setEmail("");
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Katman simdilik sessiz. Birazdan yeniden dene."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="relative flex min-h-screen flex-1 flex-col items-center justify-center overflow-hidden bg-[#05070B] selection:bg-[#00F2FF] selection:text-black">
      <motion.div
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 4, ease: "easeOut" }}
        className="absolute inset-0 z-0 pointer-events-none"
      >
        <Image
          src="/backgrounds/bg_root.png"
          alt="Arvian Core Interface"
          fill
          priority
          quality={100}
          className="object-cover opacity-90 saturate-[1.15] contrast-[1.08] brightness-[0.82]"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,242,255,0.16),transparent_34%,rgba(5,7,11,0.68)_68%,rgba(5,7,11,0.96)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-[#05070B] via-[#05070B]/82 to-transparent" />
        <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-[#05070B]/90 to-transparent" />
        <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-[#05070B]/95 to-transparent" />
        <div className="absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-[#05070B]/95 to-transparent" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 160 160%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%222%22/%3E%3C/filter%3E%3Crect width=%22160%22 height=%22160%22 filter=%22url(%23n)%22 opacity=%220.035%22/%3E%3C/svg%3E')] mix-blend-soft-light opacity-25" />
      </motion.div>

      <div className="z-10 flex h-full max-w-3xl flex-col items-center justify-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2, delay: 1, ease: "easeOut" }}
          className="flex flex-col items-center space-y-6"
        >
          <div className="relative flex h-20 w-20 items-center justify-center rounded-full border border-white/12 bg-white/[0.03] shadow-[inset_0_0_30px_rgba(0,242,255,0.12),0_0_60px_rgba(0,242,255,0.08)]">
            <div className="absolute inset-0 rounded-full border border-transparent border-b-[#00F2FF]/45 border-t-[#00F2FF]/45 animate-[spin_8s_linear_infinite]" />
            <div className="absolute inset-[10px] rounded-full border border-white/10" />
            <div className="h-2.5 w-2.5 rounded-full bg-[#00F2FF] shadow-[0_0_18px_rgba(0,242,255,0.8)] animate-pulse" />
          </div>

          <div className="space-y-4">
            <h1 className="bg-gradient-to-b from-white via-[#F2FBFF] to-[#8DA8B8] bg-clip-text font-cinzel text-5xl font-medium tracking-[0.24em] text-transparent [text-shadow:0_0_24px_rgba(190,240,255,0.12)] md:text-6xl lg:text-7xl">
              ARVIAN
            </h1>
            <p className="text-[10px] font-semibold uppercase tracking-[0.45em] text-[#6DEBFF] md:text-xs">
              Cekirdek Muhurlendi
            </p>
          </div>

          <div className="my-8 h-24 w-px bg-gradient-to-b from-white/20 via-[#00F2FF]/40 to-transparent" />

          <p className="max-w-2xl text-lg font-light tracking-[0.22em] text-zinc-300 drop-shadow-md md:text-[22px]">
            Gerceklik yeniden bicim aliyor.
          </p>

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, delay: 1.8, ease: "easeOut" }}
            className="mt-6 w-full max-w-2xl rounded-[2rem] border border-white/12 bg-[linear-gradient(180deg,rgba(255,255,255,0.09),rgba(255,255,255,0.02))] p-3 backdrop-blur-[28px] shadow-[0_30px_90px_rgba(0,0,0,0.72),inset_0_1px_0_rgba(255,255,255,0.08)]"
          >
            <div className="flex flex-col gap-3 md:flex-row">
              <label className="sr-only" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="E-posta izini birak"
                autoComplete="email"
                disabled={isSubmitting}
                className="h-14 flex-1 rounded-[1.35rem] border border-white/12 bg-black/35 px-5 text-sm tracking-[0.18em] text-white outline-none transition-all placeholder:text-zinc-500/90 focus:border-[#79EEFF]/60 focus:bg-[#03161B]/90 focus:shadow-[0_0_35px_rgba(0,242,255,0.14)]"
              />
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                className="relative h-14 overflow-hidden rounded-[1.35rem] border border-[#56E9FF]/40 bg-[linear-gradient(135deg,#082D35_0%,#0B4D59_55%,#0C6676_100%)] px-7 font-cinzel text-xs font-bold uppercase tracking-[0.32em] text-[#F2FEFF] shadow-[0_18px_40px_rgba(0,242,255,0.14)] transition-all hover:border-[#9AF5FF]/70 hover:shadow-[0_22px_55px_rgba(0,242,255,0.22)] disabled:cursor-not-allowed disabled:opacity-60"
              >
                <span className="absolute inset-0 bg-[linear-gradient(120deg,transparent_0%,rgba(255,255,255,0.24)_45%,transparent_90%)] opacity-0 transition-opacity duration-500 hover:opacity-100" />
                <span className="relative z-10">
                  {isSubmitting ? "Hizalaniyor" : "Erisim Iste"}
                </span>
              </motion.button>
            </div>

            <div className="min-h-14 px-2 pt-4 text-left">
              <AnimatePresence mode="wait">
                {successMessage ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 10, filter: "blur(10px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -8, filter: "blur(8px)" }}
                    transition={{ duration: 0.45, ease: "easeOut" }}
                    className="relative overflow-hidden rounded-2xl border border-[#00F2FF]/22 bg-[#00F2FF]/[0.07] px-4 py-3"
                  >
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,242,255,0.16),transparent_65%)]" />
                    <div className="relative z-10">
                      <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#00F2FF]/80">
                        Katman Kabul Etti
                      </p>
                      <p className="mt-2 text-sm tracking-[0.08em] text-zinc-200">
                        {successMessage}
                      </p>
                    </div>
                  </motion.div>
                ) : null}

                {!successMessage && errorMessage ? (
                  <motion.p
                    key="error"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    className="rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm tracking-[0.06em] text-red-200"
                  >
                    {errorMessage}
                  </motion.p>
                ) : null}

                {!successMessage && !errorMessage ? (
                  <motion.p
                    key="idle"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="px-1 text-[11px] uppercase tracking-[0.32em] text-zinc-500"
                  >
                    Kapilar acilmadan once ilk halkaya dahil ol.
                  </motion.p>
                ) : null}
              </AnimatePresence>
            </div>
          </motion.form>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 3 }}
        className="absolute bottom-10 z-20"
      >
        <Link
          href="/production/login"
          className="group flex flex-col items-center gap-2 opacity-30 transition-all duration-500 hover:opacity-100"
        >
          <div className="flex h-10 w-6 justify-center rounded-full border border-zinc-500/50 p-1 group-hover:border-[#00F2FF]/50 group-hover:shadow-[0_0_15px_rgba(0,242,255,0.2)]">
            <div className="h-2 w-1 rounded-full bg-zinc-400 group-hover:bg-[#00F2FF] group-hover:animate-bounce" />
          </div>
          <span className="text-[8px] uppercase tracking-[0.3em] text-zinc-500 group-hover:text-[#00F2FF]/80">
            Motoru Tetikle
          </span>
        </Link>
      </motion.div>
    </main>
  );
}

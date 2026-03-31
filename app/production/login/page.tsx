"use client";

import { useActionState, useEffect, useRef } from "react";
import { unlockArvianCore } from "../../actions/auth";
import { motion, useAnimation } from "framer-motion";
import { KeyRound, Fingerprint, ShieldAlert, Sparkles, Navigation } from "lucide-react";
import Image from "next/image";

const initialState = {
  message: "",
};

export default function ProductionLogin() {
  const [state, formAction, isPending] = useActionState(unlockArvianCore, initialState);
  const controls = useAnimation();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state?.message) {
      controls.start({
        x: [-12, 12, -8, 8, -4, 4, 0],
        transition: { duration: 0.5 },
      });
      
      if (formRef.current) {
        formRef.current.classList.add("error-glow");
        setTimeout(() => {
          formRef.current?.classList.remove("error-glow");
        }, 1000);
      }
    }
  }, [state, controls]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-[#0A0A0A] selection:bg-[#00F2FF] selection:text-black relative overflow-hidden">
      
      {/* Kasa/Karargah Konseptli Yapay Zeka Arka Planı (Background Image) */}
       <motion.div
         initial={{ opacity: 0, scale: 1.05 }}
         animate={{ opacity: 1, scale: 1 }}
         transition={{ duration: 3, ease: "easeOut" }}
         className="absolute inset-0 z-0 pointer-events-none"
       >
         <Image
           src="/backgrounds/bg_login.png"
           alt="Arvian Core Vault Interface"
           fill
           priority
           className="object-cover opacity-70 blur-[2px] contrast-125 grayscale-[30%]"
         />
         {/* Gölgelendirme */}
         <div className="absolute inset-0 bg-black/60 z-10" />
         <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.9)_100%)] z-10 pointer-events-none" />
       </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
        className="w-full max-w-sm z-20 relative"
      >
        <motion.div 
          animate={controls}
          className="p-8 pb-10 rounded-2xl border border-zinc-700/50 bg-black/80 backdrop-blur-3xl shadow-[0_0_80px_rgba(0,0,0,0.8)] relative overflow-hidden transition-all duration-300 ring-1 ring-white/5"
        >
          {/* İç Aydınlatma */}
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#00F2FF]/60 to-transparent shadow-[0_5px_20px_rgba(0,242,255,0.4)]" />
          
          <div className="flex flex-col items-center mb-10 space-y-4">
            <div className="w-16 h-16 rounded-full border border-zinc-700/80 flex items-center justify-center bg-zinc-900 shadow-[inset_0_0_30px_rgba(0,242,255,0.05)]">
               <Fingerprint className="w-8 h-8 text-[#00F2FF] opacity-90 drop-shadow-[0_0_10px_rgba(0,242,255,0.5)]" strokeWidth={1} />
            </div>
            <div className="text-center space-y-2">
              <h1 className="font-cinzel text-xl text-white tracking-[0.3em] uppercase drop-shadow-md">
                Arvian Core
              </h1>
              <p className="font-sans text-[9px] text-zinc-400 uppercase tracking-[0.4em] font-medium opacity-80">
                Erişim Protokolü
              </p>
            </div>
          </div>

          <form action={formAction} ref={formRef} className="space-y-6">
            <div className="space-y-5">
              <div className="space-y-2">
                <label htmlFor="accessCode" className="font-sans text-[10px] uppercase tracking-[0.2em] text-zinc-400 font-semibold pl-1">
                  Erişim Kodu
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Sparkles className="w-4 h-4 text-zinc-600 group-focus-within:text-[#00F2FF] transition-colors" />
                  </div>
                  <input
                    id="accessCode"
                    name="accessCode"
                    type="password"
                    required
                    maxLength={1}
                    className="font-sans w-full bg-black border border-zinc-800 rounded-xl py-3.5 pl-11 pr-4 text-white text-center tracking-[1em] focus:outline-none focus:border-[#00F2FF]/50 focus:ring-1 focus:ring-[#00F2FF]/50 transition-all placeholder:text-zinc-800 focus:bg-zinc-950 font-bold"
                    placeholder="+"
                    autoComplete="off"
                  />
                  <div className="absolute inset-x-2 bottom-0 h-px bg-gradient-to-r from-transparent via-[#00F2FF]/0 group-focus-within:via-[#00F2FF]/70 to-transparent transition-all duration-500" />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="secretSeal" className="font-sans text-[10px] uppercase tracking-[0.2em] text-zinc-400 font-semibold pl-1">
                  Gizli Mühür
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <KeyRound className="w-4 h-4 text-zinc-600 group-focus-within:text-[#00F2FF] transition-colors" />
                  </div>
                  <input
                    id="secretSeal"
                    name="secretSeal"
                    type="password"
                    required
                    maxLength={1}
                    className="font-sans w-full bg-black border border-zinc-800 rounded-xl py-3.5 pl-11 pr-4 text-white text-center tracking-[1em] focus:outline-none focus:border-[#00F2FF]/50 focus:ring-1 focus:ring-[#00F2FF]/50 transition-all placeholder:text-zinc-800 focus:bg-zinc-950 font-bold"
                    placeholder="+"
                  />
                  <div className="absolute inset-x-2 bottom-0 h-px bg-gradient-to-r from-transparent via-[#00F2FF]/0 group-focus-within:via-[#00F2FF]/70 to-transparent transition-all duration-500" />
                </div>
              </div>
            </div>

            {state?.message && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-2 p-3.5 rounded-xl bg-red-950/20 border border-red-900/40 backdrop-blur-sm"
              >
                <ShieldAlert className="w-4 h-4 text-red-500 shrink-0" />
                <p className="font-sans text-[11px] text-red-400 font-medium tracking-wide">
                  {state.message}
                </p>
              </motion.div>
            )}

            <button
              type="submit"
              disabled={isPending}
              className="relative w-full overflow-hidden mt-8 group rounded-xl bg-zinc-900 hover:bg-zinc-800 border-2 border-zinc-800 hover:border-[#00F2FF]/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_5px_15px_rgba(0,0,0,0.5)]"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#00F2FF]/0 via-[#00F2FF]/5 to-[#00F2FF]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 group-hover:animate-[shimmer_1.5s_infinite]" />
              <div className="px-8 py-4 relative z-10 flex items-center justify-center gap-3">
                <span className="font-cinzel text-sm tracking-[0.2em] text-zinc-300 group-hover:text-[#00F2FF] font-bold drop-shadow-sm transition-colors">
                  {isPending ? "Bağlanıyor..." : "Mührü Aç"}
                </span>
                <Navigation className="w-3.5 h-3.5 text-zinc-500 group-hover:text-[#00F2FF] transition-colors" />
              </div>
            </button>
          </form>

        </motion.div>

        {/* Global CSS Inject for Glow */}
        <style dangerouslySetInnerHTML={{__html: `
          .error-glow {
            box-shadow: 0 0 60px rgba(220, 38, 38, 0.4), inset 0 0 20px rgba(220, 38, 38, 0.1) !important;
            border-color: rgba(220, 38, 38, 0.5) !important;
            ring-color: rgba(220, 38, 38, 0.3) !important;
          }
          @keyframes shimmer {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
        `}} />
      </motion.div>
    </main>
  );
}

"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function RootPage() {
  return (
    <main className="flex-1 flex flex-col items-center justify-center relative min-h-screen bg-[#0A0A0A] selection:bg-[#00F2FF] selection:text-black overflow-hidden">
      {/* Sinematik Arkaplan (Generate Edilen Arvian Çekirdeği Konsepti) */}
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
          className="object-cover opacity-60"
        />
        {/* Karartma Gradyanları */}
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/80 to-transparent" />
        <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-[#0A0A0A] to-transparent" />
        <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-[#0A0A0A] to-transparent" />
        <div className="absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-[#0A0A0A] to-transparent" />
      </motion.div>

      <div className="z-10 flex flex-col items-center justify-center h-full max-w-2xl px-6 text-center">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2, delay: 1, ease: "easeOut" }}
          className="space-y-6 flex flex-col items-center"
        >
          <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center shadow-[inset_0_0_20px_rgba(0,242,255,0.1)] relative">
            <div className="absolute inset-0 rounded-full animate-[spin_8s_linear_infinite] border border-transparent border-t-[#00F2FF]/40 border-b-[#00F2FF]/40" />
            <div className="w-2 h-2 rounded-full bg-[#00F2FF] animate-pulse" />
          </div>

          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-cinzel tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-300 to-white opacity-95 text-shadow-xl font-medium">
              ARVIAN
            </h1>
            <p className="font-sans text-[#00F2FF]/80 uppercase tracking-[0.4em] text-[10px] md:text-xs font-semibold animate-pulse">
              Core Mühürlendi
            </p>
          </div>

          <div className="w-px h-24 bg-gradient-to-b from-white/20 via-[#00F2FF]/30 to-transparent my-8" />

          <p className="font-sans text-lg md:text-xl font-light tracking-widest text-zinc-400 drop-shadow-md">
            Gerçeklik Yeniden Dokunuyor...
          </p>
        </motion.div>
      </div>

      {/* Gizli ve Zarif Giriş Tetiği */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 3 }}
        className="absolute bottom-10 z-20"
      >
        <Link 
          href="/production/login"
          className="group flex flex-col items-center gap-2 opacity-30 hover:opacity-100 transition-all duration-500"
        >
          <div className="w-6 h-10 rounded-full border border-zinc-500/50 flex justify-center p-1 group-hover:border-[#00F2FF]/50 group-hover:shadow-[0_0_15px_rgba(0,242,255,0.2)]">
            <div className="w-1 h-2 rounded-full bg-zinc-400 group-hover:bg-[#00F2FF] group-hover:animate-bounce" />
          </div>
          <span className="font-sans text-[8px] uppercase tracking-[0.3em] text-zinc-500 group-hover:text-[#00F2FF]/80">
            Motoru Tetikle
          </span>
        </Link>
      </motion.div>
    </main>
  );
}
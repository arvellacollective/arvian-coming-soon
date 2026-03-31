"use client";

import { useState, useRef, ChangeEvent, DragEvent, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Mountain, Sparkles, Swords, Landmark, Upload, X, Loader2, Play, Cpu, CheckCircle2, Download, Orbit } from "lucide-react";
import Image, { StaticImageData } from "next/image";

import bg_rome from "@/public/backgrounds/bg_rome.png";
import bg_viking from "@/public/backgrounds/bg_viking.png";
import bg_cyberpunk from "@/public/backgrounds/bg_cyberpunk.png";
import bg_fantasy from "@/public/backgrounds/bg_fantasy.png";
import bg_baroque from "@/public/backgrounds/bg_baroque.png";
import bg_samurai from "@/public/backgrounds/bg_samurai.png";

type Epoch = {
  id: string;
  name: string;
  theme: string;
  desc: string;
  icon: React.ElementType;
  backgroundImage: StaticImageData;
  accentMap: {
    text: string;
    borderLight: string;
    borderMedium: string;
    bgPill: string;
    glowBox: string;
    bgDot: string;
    glowBadge: string;
  };
};

const epochs: Epoch[] = [
  {
    id: "rome",
    name: "Antik Roma",
    theme: "Kum, mermer ve ihtişam",
    desc: "Güneşin kavurduğu arenaların sıcağında, destansı bir gladyatör yürüyüşü...",
    icon: Landmark,
    backgroundImage: bg_rome,
    accentMap: {
      text: "text-[#E6C200]", 
      borderLight: "border-[#E6C200]/30",
      borderMedium: "border-[#E6C200]/40",
      bgPill: "bg-black/40 border border-[#E6C200]/30 shadow-[inset_0_0_20px_rgba(230,194,0,0.15)]",
      glowBox: "shadow-[0_0_60px_rgba(230,194,0,0.15)] border-[#E6C200]/40",
      bgDot: "bg-[#E6C200]",
      glowBadge: "bg-black/60 border border-[#E6C200]/30 text-[#E6C200] shadow-[0_0_25px_rgba(230,194,0,0.15)]",
    }
  },
  {
    id: "viking",
    name: "Viking Savaşçısı",
    theme: "Kuzey ışıkları, buz ve rünler",
    desc: "Kuzeyin soğuk nefesiyle destansı savaş alanında...",
    // "Shield" yerine kullanılabilecek döneme ait ikonu değiştirdim
    icon: Mountain, 
    backgroundImage: bg_viking,
    accentMap: {
      text: "text-[#00F2FF]",
      borderLight: "border-[#00F2FF]/30",
      borderMedium: "border-[#00F2FF]/40",
      bgPill: "bg-black/40 border border-[#00F2FF]/30 shadow-[inset_0_0_20px_rgba(0,242,255,0.15)]",
      glowBox: "shadow-[0_0_60px_rgba(0,242,255,0.15)] border-[#00F2FF]/40",
      bgDot: "bg-[#00F2FF]",
      glowBadge: "bg-black/60 border border-[#00F2FF]/30 text-[#00F2FF] shadow-[0_0_25px_rgba(0,242,255,0.15)]",
    }
  },
  {
    id: "cyberpunk",
    name: "Cyberpunk İstanbul",
    theme: "Neon, yağmur, isyan",
    desc: "Siber gecenin gölgesinde yüksek teknoloji...",
    icon: Zap,
    backgroundImage: bg_cyberpunk,
    accentMap: {
      text: "text-[#FF00FF]", 
      borderLight: "border-[#FF00FF]/30",
      borderMedium: "border-[#FF00FF]/40",
      bgPill: "bg-black/40 border border-[#FF00FF]/30 shadow-[inset_0_0_20px_rgba(255,0,255,0.15)]",
      glowBox: "shadow-[0_0_60px_rgba(255,0,255,0.15)] border-[#FF00FF]/40",
      bgDot: "bg-[#FF00FF]",
      glowBadge: "bg-black/60 border border-[#FF00FF]/30 text-[#FF00FF] shadow-[0_0_25px_rgba(255,0,255,0.15)]",
    }
  },
  {
    id: "fantasy",
    name: "Kadim Meydanlar",
    theme: "Orta dünya, ateş, mızrak",
    desc: "Fantastik efsanelerin karanlık yansımasında...",
    icon: Mountain,
    backgroundImage: bg_fantasy,
    accentMap: {
      text: "text-[#FF4500]", 
      borderLight: "border-[#FF4500]/30",
      borderMedium: "border-[#FF4500]/40",
      bgPill: "bg-black/40 border border-[#FF4500]/30 shadow-[inset_0_0_20px_rgba(255,69,0,0.15)]",
      glowBox: "shadow-[0_0_60px_rgba(255,69,0,0.15)] border-[#FF4500]/40",
      bgDot: "bg-[#FF4500]",
      glowBadge: "bg-black/60 border border-[#FF4500]/30 text-[#FF4500] shadow-[0_0_25px_rgba(255,69,0,0.15)]",
    }
  },
  {
    id: "baroque",
    name: "1700 Fransası",
    theme: "Altın saray, asil zehir",
    desc: "Karanlık aynaların ardındaki soylu zarafette...",
    icon: Sparkles,
    backgroundImage: bg_baroque,
    accentMap: {
      text: "text-[#FFD700]", 
      borderLight: "border-[#FFD700]/30",
      borderMedium: "border-[#FFD700]/40",
      bgPill: "bg-black/40 border border-[#FFD700]/30 shadow-[inset_0_0_20px_rgba(255,215,0,0.15)]",
      glowBox: "shadow-[0_0_60px_rgba(255,215,0,0.15)] border-[#FFD700]/40",
      bgDot: "bg-[#FFD700]",
      glowBadge: "bg-black/60 border border-[#FFD700]/30 text-[#FFD700] shadow-[0_0_25px_rgba(255,215,0,0.15)]",
    }
  },
  {
    id: "samurai",
    name: "Edo Samurayı",
    theme: "Kiraz çiçeği, kan, sis",
    desc: "Acımasız kılıcın ve onurun kızıl gecesinde...",
    icon: Swords,
    backgroundImage: bg_samurai,
    accentMap: {
      text: "text-[#DC143C]", 
      borderLight: "border-[#DC143C]/30",
      borderMedium: "border-[#DC143C]/40",
      bgPill: "bg-black/40 border border-[#DC143C]/30 shadow-[inset_0_0_20px_rgba(220,20,60,0.15)]",
      glowBox: "shadow-[0_0_60px_rgba(220,20,60,0.15)] border-[#DC143C]/40",
      bgDot: "bg-[#DC143C]",
      glowBadge: "bg-black/60 border border-[#DC143C]/30 text-[#DC143C] shadow-[0_0_25px_rgba(220,20,60,0.15)]",
    }
  },
];

export default function ProductionPage() {
  const [activeEpoch, setActiveEpoch] = useState<Epoch>(epochs[0]!);
  
  // UX State
  const [isModalOpen, setModalOpen] = useState(false);
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);

  // Arvian Core Variables
  const [referenceImage, setReferenceImage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [promptText, setPromptText] = useState("");
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [isEnhanced, setIsEnhanced] = useState(false);
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [apiError, setApiError] = useState<string | null>(null);

  const [autoSave, setAutoSave] = useState(true);

  // Dosya Yükleme (Kimlik DNA'sı)
  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };
  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };
  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      readImageFile(file);
    }
  };
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      readImageFile(file);
    }
  };

  const readImageFile = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setReferenceImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  // 1. Aşama: Akıllı Vizyon Yüceltme (Prompt Enhancement)
  const handleEnhancePrompt = () => {
    if (!promptText.trim()) return;
    setIsEnhancing(true);
    setApiError(null);
    
    // Zeki ve otonom geliştirmeyi simüle et
    setTimeout(() => {
      const isTurkish = /[üöğıçşÜÖĞİÇŞ]/.test(promptText) || !(/^[a-zA-Z\s.,!?]+$/.test(promptText));
      const suffix = isTurkish 
        ? ", 4K sinematik, ultra-gerçekçi dokular, epik ışıklandırma, şaheser detaylar."
        : ", 4K cinematic, ultra-realistic textures, epic lighting, masterpiece details.";
      
      setPromptText(prev => prev.trim() + suffix);
      setIsEnhancing(false);
      setIsEnhanced(true);
    }, 1500); 
  };

  const handleTextboxClick = () => {
      // Sırlı kilit açılacak
      if (isEnhanced && !isGenerating) {
         setIsEnhanced(false);
      }
  };

  // 2. Aşama: Yarat (Manifestation - API Çağrısı)
  const handleGenerate = async () => {
    if (!referenceImage) return;
    setIsGenerating(true);
    setGenerationProgress(0);
    setApiError(null);

    // Kademeli Progress Bar (Fake Progress until API resolves)
    const interval = setInterval(() => {
      setGenerationProgress(prev => {
         if (prev >= 85) return 85; 
         return prev + Math.random() * 5; 
      });
    }, 300);

    try {
      const response = await fetch('/api/manifest', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({
            referenceImage: referenceImage,
            prompt: promptText,
            epochTheme: activeEpoch.theme
         })
      });

      clearInterval(interval);
      setGenerationProgress(100);

      const data = await response.json();

      if (!response.ok) {
         throw new Error(data.error || "Beklenmeyen Motor Hatası");
      }

      // Başarılı
      setTimeout(() => {
        setIsGenerating(false);
        setModalOpen(false); // Kasayı Kapat
        setFullscreenImage(data.image); // Geniş Bakış'ı aç

        // Otomatik Kaydetme Switch'i (Otonom indirme)
        if (autoSave && data.image) {
            triggerDownload(data.image);
        }

      }, 1000);

    } catch (err: any) {
       clearInterval(interval);
       setIsGenerating(false);
       setApiError(err.message);
    }
  };

  const triggerDownload = (imageUrl: string) => {
     // Güvenlik amaçlı data blobu linke alınıp click ile tetiklenir
     const link = document.createElement("a");
     link.href = imageUrl;
     link.download = `Arvian_Yansima_${activeEpoch.id}_${Date.now()}.png`;
     document.body.appendChild(link);
     link.click();
     document.body.removeChild(link);
  };

  useEffect(() => {
    if (!isModalOpen && !isGenerating && !fullscreenImage) {
      // Modal temizliği işlemleri, (dilerseniz state'leri resetleyebilirsiniz)
    }
  }, [isModalOpen, fullscreenImage, isGenerating]);

  return (
    <main className="flex-1 flex flex-col md:flex-row min-h-screen bg-[#0A0A0A] text-white selection:bg-[#00F2FF]/40 selection:text-white w-full overflow-hidden relative">
      
      {/* 🔴 ARKA PLAN (SİNEMATİK) */}
      <div className={`absolute inset-0 pointer-events-none z-0 transition-transform duration-1000 ease-out ${isModalOpen || fullscreenImage ? "scale-95 blur-xl opacity-20" : "scale-100 opacity-70"}`}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeEpoch.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0"
          >
            <Image
              src={activeEpoch.backgroundImage}
              alt={activeEpoch.name}
              fill
              quality={100} 
              sizes="100vw"
              priority 
              placeholder="blur" 
              className="object-cover mix-blend-screen"
            />
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_center,transparent_0%,#000_100%)] pointer-events-none" />

      {/* 🔴 ANA EKRAN İÇERİĞİ */}
      <section className={`flex-1 flex flex-col z-20 px-4 md:px-8 py-10 relative overflow-hidden w-full h-screen ${fullscreenImage ? 'hidden' : 'flex'}`}>
        <header className="flex justify-between items-start w-full max-w-7xl mx-auto mb-10 shrink-0">
          <div className="space-y-1 group">
            <h1 className="font-cinzel text-3xl font-extrabold tracking-[0.15em] text-white drop-shadow-[0_0_20px_rgba(0,242,255,0.4)] transition-all">
              ARVIAN STUDIO
            </h1>
          </div>
          
          <button 
            onClick={() => setModalOpen(true)}
            className={`group relative flex items-center gap-3 border bg-black/80 hover:bg-[#0A0A0A] px-6 py-2.5 rounded-full backdrop-blur-2xl transition-all duration-500 shadow-[0_10px_40px_rgba(0,0,0,0.8)] cursor-pointer overflow-hidden ${activeEpoch.accentMap.borderMedium}`}
          >
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
            <div className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-[radial-gradient(circle_at_center,currentColor_0%,transparent_70%)] ${activeEpoch.accentMap.text}`} />
            
            <div className="relative z-10 flex items-center gap-3">
              <div className={`w-2 h-2 rounded-full animate-pulse transition-colors duration-1000 shadow-[0_0_10px_currentColor] ${activeEpoch.accentMap.bgDot}`} />
              <span className="font-cinzel text-xs uppercase tracking-[0.2em] font-bold text-zinc-300 group-hover:text-white transition-colors">Menfez Aç</span>
            </div>
          </button>
        </header>

        <div className="flex-1 w-full max-w-7xl mx-auto flex flex-col items-center justify-start md:justify-center space-y-10 overflow-auto pb-20 no-scrollbar">
          
          <div className="w-full flex justify-center shrink-0">
            <div className="flex flex-wrap items-center justify-center gap-2 p-3 bg-black/40 backdrop-blur-3xl border border-white/5 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.1)] relative overflow-hidden ring-1 ring-[#00F2FF]/5 hook-glow">
              <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
              
              {epochs.map((epoch) => {
                const isActive = activeEpoch.id === epoch.id;
                const Icon = epoch.icon;

                return (
                  <button
                    key={epoch.id}
                    onClick={() => setActiveEpoch(epoch)}
                    className={`font-sans relative px-6 py-3.5 rounded-2xl flex flex-col items-center justify-center gap-2 transition-all duration-500 w-32 focus:outline-none overflow-hidden ${
                        isActive ? epoch.accentMap.text : "text-zinc-500 hover:text-[#00F2FF]/60 hover:bg-[#00F2FF]/5"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="active-epoch-pill"
                        className={`absolute inset-0 rounded-2xl ${epoch.accentMap.bgPill} bg-gradient-to-t from-black/80 to-transparent ring-1 ring-inset ring-white/10`}
                        initial={false}
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10 drop-shadow-xl transition-transform duration-300 group-hover:scale-110">
                      <Icon className="w-5 h-5 mb-1" />
                    </span>
                    <span className={`text-[9px] uppercase tracking-[0.2em] text-center relative z-10 ${isActive ? "font-bold drop-shadow-md text-white" : "font-semibold"}`}>
                      {epoch.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className={`relative w-full max-w-4xl shrink-0 aspect-[16/10] md:aspect-[21/9] rounded-[2rem] border overflow-hidden backdrop-blur-md bg-black/60 group transition-all duration-1000 shadow-[0_20px_60px_rgba(0,0,0,0.9)] ${activeEpoch.accentMap.borderMedium} ${activeEpoch.accentMap.glowBox}`}>
             <motion.div
                key={"default-view-" + activeEpoch.id}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, filter: "blur(10px)" }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="absolute inset-0 flex items-center justify-center flex-col"
              >
                <div className="absolute inset-0 opacity-30">
                  <Image
                    src={activeEpoch.backgroundImage}
                    alt={activeEpoch.name}
                    fill
                    quality={90}
                    sizes="(max-width: 1200px) 100vw, 1200px"
                    placeholder="blur"
                    className="object-cover object-center mix-blend-luminosity" 
                  />
                  <div className="absolute inset-0 bg-black/60 backdrop-blur-[4px]" />
                </div>

                <div className="text-center space-y-4 px-6 relative z-10 mt-[-2rem]">
                  <div className={`inline-block p-5 border rounded-full bg-black/80 shadow-[0_10px_40px_rgba(0,0,0,0.8)] glow transition-colors duration-1000 ${activeEpoch.accentMap.borderMedium}`}>
                    <activeEpoch.icon className={`w-12 h-12 opacity-100 transition-colors duration-1000 ${activeEpoch.accentMap.text} filter drop-shadow-[0_0_10px_currentColor]`} />
                  </div>
                  <h2 className={`font-cinzel text-4xl md:text-5xl font-black text-white tracking-[0.3em] uppercase drop-shadow-[0_5px_15px_rgba(0,0,0,1)] transition-colors duration-1000 ${activeEpoch.accentMap.text}`}>
                    {activeEpoch.name}
                  </h2>
                  <p className={`font-sans text-xs md:text-sm text-zinc-300 max-w-md mx-auto italic tracking-widest font-semibold bg-black/50 px-6 py-2 rounded-full backdrop-blur-xl border ${activeEpoch.accentMap.borderLight} ring-1 ring-[#00F2FF]/10`}>
                    {activeEpoch.theme}
                  </p>
                </div>

                <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black via-black/30 to-transparent pointer-events-none" />
              </motion.div>
          </div>

        </div>
      </section>

      {/* 🔴 GENİŞ BAKIŞ MODALI (FULLSCREEN VIEW) */}
      <AnimatePresence>
        {fullscreenImage && (
           <motion.div
             initial={{ opacity: 0, filter: "blur(20px)" }}
             animate={{ opacity: 1, filter: "blur(0px)", zIndex: 100 }}
             exit={{ opacity: 0, filter: "blur(20px)" }}
             transition={{ duration: 1.2, ease: "easeOut" }}
             className="fixed inset-0 w-screen h-screen bg-black flex items-center justify-center overflow-hidden"
           >
              {/* Eğer gemini flash stringi gelirse ve resim gibi parse olmuyorsa hata çıkacaktır çünkü o resim yapmaz metin üretir ama emre göre yansıma olarak işliyoruz */}
              <Image 
                src={fullscreenImage}
                alt="Yansıma"
                fill
                quality={100}
                className="object-contain md:object-cover object-center pointer-events-none"
              />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)] pointer-events-none" />
              
              <div className="absolute top-8 right-8 flex items-center gap-4 z-50">
                <button 
                  onClick={() => triggerDownload(fullscreenImage)} 
                  className="p-3 bg-black/50 border border-white/20 hover:border-[#00F2FF]/50 hover:bg-[#00F2FF]/10 backdrop-blur-xl rounded-full text-white transition-all shadow-[0_0_20px_rgba(0,0,0,0.8)]"
                >
                  <Download className="w-6 h-6" />
                </button>
                <button 
                  onClick={() => setFullscreenImage(null)} 
                  className="p-3 bg-black/50 border border-white/20 hover:border-red-500/50 hover:bg-red-500/10 backdrop-blur-xl rounded-full text-white transition-all shadow-[0_0_20px_rgba(0,0,0,0.8)]"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <motion.div 
                 initial={{ y: 50, opacity: 0 }}
                 animate={{ y: 0, opacity: 1 }}
                 transition={{ delay: 0.8 }}
                 className="absolute bottom-10 inset-x-0 w-full max-w-5xl mx-auto p-8 border border-white/10 bg-black/60 backdrop-blur-2xl rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.9)] flex flex-col md:flex-row justify-between items-center gap-6"
              >
                  <div className="space-y-2">
                     <div className="flex items-center gap-2">
                        <Cpu className={`w-5 h-5 opacity-70 ${activeEpoch.accentMap.text}`} />
                        <span className="font-sans text-[11px] uppercase font-bold tracking-[0.4em] text-[#00F2FF]">Arvian Core Motoru</span>
                     </div>
                     <p className="font-sans text-xs md:text-sm tracking-widest leading-relaxed font-semibold drop-shadow-md text-zinc-300">
                       {promptText}
                     </p>
                  </div>
                  <div className={`shrink-0 p-4 rounded-xl bg-[#00F2FF]/5 border border-[#00F2FF]/20 flex items-center gap-3 backdrop-blur-md`}>
                      <div className={`w-2 h-2 rounded-full ${activeEpoch.accentMap.bgDot} shadow-[0_0_10px_currentColor] animate-pulse`} />
                      <span className="font-cinzel text-sm font-bold tracking-widest text-[#00F2FF] uppercase">%99.9 KİMLİK KORUMASI</span>
                  </div>
              </motion.div>
           </motion.div>
        )}
      </AnimatePresence>

      {/* 🔴 UZAY KASASI (İNTERAKTİF MANİFEST MODALI) */}
      <AnimatePresence>
        {isModalOpen && !fullscreenImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl"
          >
             <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,242,255,0.03)_0%,transparent_100%)] pointer-events-none" />

             <motion.div 
               initial={{ opacity: 0, scale: 0.9, y: 30 }}
               animate={{ opacity: 1, scale: 1, y: 0 }}
               exit={{ opacity: 0, scale: 0.95, y: -20 }}
               transition={{ type: "spring", damping: 25, stiffness: 300 }}
               className={`relative w-full max-w-2xl bg-[#0A0A0A] border rounded-[2rem] shadow-[0_0_100px_rgba(0,0,0,1),inset_0_1px_1px_rgba(0,242,255,0.1)] overflow-hidden ${activeEpoch.accentMap.borderLight} ring-1 ring-white/5`}
             >
               {/* Header */}
               <div className="flex justify-between items-center p-6 border-b border-white/10 bg-black/40">
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-xl bg-gradient-to-br from-[#00F2FF]/10 to-transparent border border-[#00F2FF]/20 shadow-inner`}>
                      <Orbit className={`w-5 h-5 ${activeEpoch.accentMap.text}`} />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-cinzel text-xl font-bold tracking-[0.2em] uppercase text-white drop-shadow-md">
                        Mühürlü Tezahür Ağı
                      </h3>
                      <p className="font-sans text-[8px] uppercase tracking-[0.4em] font-bold text-[#00F2FF]/60">
                        {activeEpoch.name} Katmanı
                      </p>
                    </div>
                  </div>
                  <button onClick={() => !isGenerating && !isEnhancing && setModalOpen(false)} className="p-2 rounded-full hover:bg-white/10 transition-colors text-zinc-500 hover:text-white">
                     <X className="w-6 h-6" />
                  </button>
               </div>

               {/* Body */}
               <div className="p-6 md:p-8 flex flex-col gap-8 relative">
                  
                  {/* KİMLİK ODAKLI ZOOM: object-position center 25% olarak yapıldı! */}
                  <div className="space-y-3">
                    <label className="font-sans text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 drop-shadow-sm flex items-center gap-2">
                       <span className="text-[#00F2FF]">1.</span> KİMLİK DNA'SI
                    </label>
                    
                    <div 
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      className={`relative w-full h-36 border-2 border-dashed ${isDragging ? `${activeEpoch.accentMap.borderMedium} bg-[#00F2FF]/5` : 'border-zinc-800 bg-black/50'} rounded-2xl flex flex-col items-center justify-center gap-3 transition-all duration-300 group overflow-hidden`}
                    >
                       {referenceImage ? (
                          <>
                            <Image 
                               src={referenceImage} 
                               alt="Referans DNA" 
                               fill 
                               className="object-cover opacity-60 mix-blend-screen transition-transform duration-1000 group-hover:scale-105" 
                               style={{ objectPosition: 'center 25%' }} 
                            />
                            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                               <button onClick={() => setReferenceImage(null)} className="font-sans text-[10px] bg-red-900/80 text-white px-4 py-2 rounded-full uppercase tracking-widest font-bold">ZİNCİRİ KIR (SİL)</button>
                            </div>
                            <CheckCircle2 className={`absolute bottom-3 right-3 w-6 h-6 ${activeEpoch.accentMap.text} drop-shadow-md`} />
                          </>
                       ) : (
                          <>
                            <Upload className={`w-8 h-8 text-zinc-600 group-hover:${activeEpoch.accentMap.text} transition-colors drop-shadow-md`} />
                            <div className="text-center">
                              <span className="font-sans text-xs font-semibold tracking-wide text-zinc-400 transition-colors">Yüklemek için sürükle veya seç</span>
                              <p className="font-sans text-[9px] uppercase tracking-widest text-[#00F2FF]/60 font-bold mt-1">Yüz Otomatik Odaklanacaktır (Zoom-in)</p>
                            </div>
                            <input 
                              type="file" 
                              accept="image/*" 
                              className="absolute inset-0 opacity-0 cursor-pointer" 
                              onChange={handleFileChange}
                              disabled={isEnhancing || isGenerating}
                            />
                          </>
                       )}
                    </div>
                  </div>

                  {/* ZEKİ TEXTBOX (VİZYON) */}
                  <div className="space-y-3 relative">
                    <div className="flex justify-between items-center">
                       <label className="font-sans text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 flex items-center gap-2">
                          <span className="text-[#00F2FF]">2.</span> VİZYON
                       </label>
                       {isEnhanced && <span className={`font-sans text-[8px] font-extrabold uppercase tracking-widest px-2 py-0.5 rounded-full bg-[#00F2FF]/10 text-[#00F2FF] border border-[#00F2FF]/20`}>ARVIAN YÜCELTTİ</span>}
                    </div>
                    
                    <div className="relative">
                      <textarea 
                        rows={4}
                        value={promptText}
                        onChange={(e) => setPromptText(e.target.value)}
                        disabled={isEnhancing || isGenerating}
                        onClick={handleTextboxClick}
                        readOnly={isEnhanced}
                        className={`w-full bg-black/80 border ${isEnhanced ? 'border-[#00F2FF] bg-[#00F2FF]/5 shadow-[inset_0_0_15px_rgba(0,242,255,0.1)] cursor-text hover:border-[#00F2FF]/60' : 'border-zinc-800'} rounded-2xl p-5 text-white font-sans text-sm focus:outline-none focus:border-[#00F2FF]/30 resize-none transition-all ${isEnhancing ? 'opacity-50 blur-[2px]' : 'opacity-100'}`}
                        placeholder="Örn: Savaş anında kılıcıma kan değmiş..."
                      />

                      {/* Düzenlemek için tıkla uyarısı*/}
                      {isEnhanced && !isEnhancing && !isGenerating && (
                         <span className="absolute top-4 right-4 text-[9px] uppercase font-bold tracking-[0.2em] text-[#00F2FF]/60 pointer-events-none animate-pulse">Düzenlenebilir</span>
                      )}
                      
                      {isEnhancing && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                           <Cpu className={`w-8 h-8 animate-pulse mb-3 ${activeEpoch.accentMap.text}`} />
                           <p className="font-sans text-[10px] uppercase font-bold tracking-widest text-[#00F2FF] drop-shadow-md">Arvian Core Aktivasyonu</p>
                           <p className={`font-sans text-[8px] uppercase tracking-[0.3em] font-extrabold mt-1 text-white`}>Vizyon Profesyonelleştiriliyor...</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* API Hatası */}
                  {apiError && (
                     <div className="p-3 bg-red-900/40 border border-red-500/50 rounded-xl">
                        <p className="text-red-300 font-sans text-xs font-semibold text-center">{apiError}</p>
                     </div>
                  )}

                  {/* İlerleme Çubuğu */}
                  <AnimatePresence>
                     {isGenerating && (
                       <motion.div 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="pt-4 border-t border-white/10"
                       >
                          <div className="flex justify-between items-end mb-2">
                            <p className="font-cinzel text-[10px] font-bold tracking-[0.25em] uppercase text-white shadow-[#00F2FF]">Yansıma Sentezleniyor</p>
                            <span className={`font-sans text-[11px] font-black uppercase tracking-[0.2em] text-[#00F2FF]`}>%{generationProgress.toFixed(0)}</span>
                          </div>
                          <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                             <motion.div 
                                className={`h-full bg-[#00F2FF] shadow-[0_0_10px_currentColor]`}
                                initial={{ width: 0 }}
                                animate={{ width: `${generationProgress}%` }}
                                transition={{ ease: "linear", duration: 0.3 }}
                             />
                          </div>
                          <p className="text-center text-[8px] uppercase tracking-widest text-[#00F2FF]/50 mt-2 font-black">%99.9 KİMLİK METRİKLERİ KORUNUYOR</p>
                       </motion.div>
                     )}
                  </AnimatePresence>

               </div>

               {/* Dinamik Düğme Navigasyonu */}
               <div className="p-6 border-t border-white/10 bg-black/60 flex flex-col md:flex-row gap-4 items-center justify-between">
                 
                 {!isEnhanced ? (
                   <button 
                    onClick={handleEnhancePrompt}
                    disabled={isEnhancing || !promptText.trim() || !referenceImage}
                    className={`w-full px-10 py-4 ml-auto rounded-xl flex items-center justify-center gap-3 font-cinzel text-sm uppercase tracking-[0.25em] font-bold transition-all shadow-[0_10px_20px_rgba(0,0,0,0.5)] ${activeEpoch.accentMap.glowBadge} ${(isEnhancing || !promptText.trim() || !referenceImage) ? 'opacity-50 grayscale cursor-not-allowed' : 'hover:scale-105 hover:brightness-125 hover:shadow-[0_0_20px_rgba(0,242,255,0.4)]'}`}
                   >
                     {isEnhancing ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          <span>İşleniyor...</span>
                        </>
                     ) : (
                        <>
                          <Sparkles className="w-5 h-5" />
                          <span>YÜCELT</span>
                        </>
                     )}
                   </button>
                 ) : (
                   <motion.div 
                     initial={{opacity:0, scale: 0.95}} 
                     animate={{opacity:1, scale: 1}} 
                     transition={{ duration: 0.5, type: "spring" }} 
                     className="flex w-full flex-col gap-5"
                   >
                     
                     <div className="flex justify-end items-center w-full px-2">
                        <div className="flex items-center gap-3">
                           <span className={`font-sans text-[10px] uppercase font-extrabold tracking-[0.2em] ${autoSave ? 'text-[#00F2FF] drop-shadow-[0_0_5px_rgba(0,242,255,0.5)]' : 'text-zinc-500'}`}>CİHAZA KAYDET</span>
                           <button 
                              onClick={() => setAutoSave(!autoSave)} 
                              className={`w-11 h-6 rounded-full relative transition-all duration-300 ${autoSave ? 'bg-[#00F2FF]/40 border border-[#00F2FF]' : 'bg-white/10 border border-white/20'}`}
                           >
                              <div className={`w-4 h-4 rounded-full bg-white absolute top-0.5 transition-all duration-300 shadow-md ${autoSave ? 'left-[22px]' : 'left-1'}`} />
                           </button>
                        </div>
                     </div>

                     <button 
                      onClick={handleGenerate}
                      disabled={isGenerating || !referenceImage}
                      className={`w-full py-5 rounded-xl flex items-center justify-center gap-3 font-cinzel text-lg uppercase tracking-[0.3em] font-black transition-all shadow-[0_15px_30px_rgba(0,242,255,0.2)] border-2 hover:scale-[1.02] hover:bg-[#00F2FF]/5 overflow-hidden relative group ${(isGenerating || !referenceImage) ? 'opacity-40 grayscale cursor-not-allowed border-zinc-700 text-zinc-500' : 'border-[#00F2FF]/80 text-[#00F2FF]'}`}
                     >
                       <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00F2FF]/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-linear" />
                       <Orbit className={`w-6 h-6 ${isGenerating ? 'animate-spin-slow' : ''} drop-shadow-[0_0_10px_currentColor]`} />
                       <span className={`drop-shadow-[0_0_10px_rgba(0,242,255,0.8)]`}>{!referenceImage ? "DNA EKSİK" : (isGenerating ? "Y A R A T I L I Y O R" : "Y A R A T")}</span>
                     </button>
                   </motion.div>
                 )}
               </div>

             </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </main>
  );
}

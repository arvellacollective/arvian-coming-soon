"use client";

import { ChangeEvent, DragEvent, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  CheckCircle2,
  Cpu,
  Download,
  Landmark,
  Loader2,
  Mountain,
  Orbit,
  Sparkles,
  Swords,
  Upload,
  X,
  Zap,
} from "lucide-react";
import Image, { StaticImageData } from "next/image";

import bgBaroque from "@/public/backgrounds/bg_baroque.png";
import bgCyberpunk from "@/public/backgrounds/bg_cyberpunk.png";
import bgFantasy from "@/public/backgrounds/bg_fantasy.png";
import bgRome from "@/public/backgrounds/bg_rome.png";
import bgSamurai from "@/public/backgrounds/bg_samurai.png";
import bgViking from "@/public/backgrounds/bg_viking.png";

type AccentMap = {
  text: string;
  borderLight: string;
  borderMedium: string;
  bgPill: string;
  glowBox: string;
  bgDot: string;
  glowBadge: string;
};

type Epoch = {
  id: string;
  name: string;
  theme: string;
  description: string;
  icon: React.ElementType;
  backgroundImage: StaticImageData;
  accentMap: AccentMap;
};

type ManifestErrorPayload = {
  error?: string;
};

const epochs: Epoch[] = [
  {
    id: "rome",
    name: "Antik Roma",
    theme: "Kum, mermer ve ihtisam",
    description: "Arenadan gelen altin tozu ve agir bir imparatorluk hissi.",
    icon: Landmark,
    backgroundImage: bgRome,
    accentMap: {
      text: "text-[#E6C200]",
      borderLight: "border-[#E6C200]/30",
      borderMedium: "border-[#E6C200]/40",
      bgPill: "bg-black/40 border border-[#E6C200]/30 shadow-[inset_0_0_20px_rgba(230,194,0,0.15)]",
      glowBox: "shadow-[0_0_60px_rgba(230,194,0,0.15)] border-[#E6C200]/40",
      bgDot: "bg-[#E6C200]",
      glowBadge: "bg-black/60 border border-[#E6C200]/30 text-[#E6C200] shadow-[0_0_25px_rgba(230,194,0,0.15)]",
    },
  },
  {
    id: "viking",
    name: "Viking Savascisi",
    theme: "Buz, kuzey isigi ve runik doku",
    description: "Soguk, sert ve sisli bir kuzey sahnesi.",
    icon: Mountain,
    backgroundImage: bgViking,
    accentMap: {
      text: "text-[#00F2FF]",
      borderLight: "border-[#00F2FF]/30",
      borderMedium: "border-[#00F2FF]/40",
      bgPill: "bg-black/40 border border-[#00F2FF]/30 shadow-[inset_0_0_20px_rgba(0,242,255,0.15)]",
      glowBox: "shadow-[0_0_60px_rgba(0,242,255,0.15)] border-[#00F2FF]/40",
      bgDot: "bg-[#00F2FF]",
      glowBadge: "bg-black/60 border border-[#00F2FF]/30 text-[#00F2FF] shadow-[0_0_25px_rgba(0,242,255,0.15)]",
    },
  },
  {
    id: "cyberpunk",
    name: "Cyberpunk Istanbul",
    theme: "Neon, yagmur ve isyan",
    description: "Yuksek kontrastli bir gece, neon izleri ve islak zemin.",
    icon: Zap,
    backgroundImage: bgCyberpunk,
    accentMap: {
      text: "text-[#FF00FF]",
      borderLight: "border-[#FF00FF]/30",
      borderMedium: "border-[#FF00FF]/40",
      bgPill: "bg-black/40 border border-[#FF00FF]/30 shadow-[inset_0_0_20px_rgba(255,0,255,0.15)]",
      glowBox: "shadow-[0_0_60px_rgba(255,0,255,0.15)] border-[#FF00FF]/40",
      bgDot: "bg-[#FF00FF]",
      glowBadge: "bg-black/60 border border-[#FF00FF]/30 text-[#FF00FF] shadow-[0_0_25px_rgba(255,0,255,0.15)]",
    },
  },
  {
    id: "fantasy",
    name: "Kadim Meydanlar",
    theme: "Kor, sis ve mitik savas izleri",
    description: "Fantezi tonlarinda agir sis ve atesli detaylar.",
    icon: Mountain,
    backgroundImage: bgFantasy,
    accentMap: {
      text: "text-[#FF4500]",
      borderLight: "border-[#FF4500]/30",
      borderMedium: "border-[#FF4500]/40",
      bgPill: "bg-black/40 border border-[#FF4500]/30 shadow-[inset_0_0_20px_rgba(255,69,0,0.15)]",
      glowBox: "shadow-[0_0_60px_rgba(255,69,0,0.15)] border-[#FF4500]/40",
      bgDot: "bg-[#FF4500]",
      glowBadge: "bg-black/60 border border-[#FF4500]/30 text-[#FF4500] shadow-[0_0_25px_rgba(255,69,0,0.15)]",
    },
  },
  {
    id: "baroque",
    name: "1700 Fransasi",
    theme: "Altin salonlar ve aristokrat gerilim",
    description: "Barok bir mekan, agir kumaslar ve keskin isiklar.",
    icon: Sparkles,
    backgroundImage: bgBaroque,
    accentMap: {
      text: "text-[#FFD700]",
      borderLight: "border-[#FFD700]/30",
      borderMedium: "border-[#FFD700]/40",
      bgPill: "bg-black/40 border border-[#FFD700]/30 shadow-[inset_0_0_20px_rgba(255,215,0,0.15)]",
      glowBox: "shadow-[0_0_60px_rgba(255,215,0,0.15)] border-[#FFD700]/40",
      bgDot: "bg-[#FFD700]",
      glowBadge: "bg-black/60 border border-[#FFD700]/30 text-[#FFD700] shadow-[0_0_25px_rgba(255,215,0,0.15)]",
    },
  },
  {
    id: "samurai",
    name: "Edo Samurai",
    theme: "Kiraz sisi, celik ve kan izi",
    description: "Keskin konturlar, sisli bir hava ve rituel tonlar.",
    icon: Swords,
    backgroundImage: bgSamurai,
    accentMap: {
      text: "text-[#DC143C]",
      borderLight: "border-[#DC143C]/30",
      borderMedium: "border-[#DC143C]/40",
      bgPill: "bg-black/40 border border-[#DC143C]/30 shadow-[inset_0_0_20px_rgba(220,20,60,0.15)]",
      glowBox: "shadow-[0_0_60px_rgba(220,20,60,0.15)] border-[#DC143C]/40",
      bgDot: "bg-[#DC143C]",
      glowBadge: "bg-black/60 border border-[#DC143C]/30 text-[#DC143C] shadow-[0_0_25px_rgba(220,20,60,0.15)]",
    },
  },
];

function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result);
        return;
      }

      reject(new Error("Gorsel base64 formatina donusturulemedi."));
    };

    reader.onerror = () => reject(new Error("Gorsel okunamadi."));
    reader.readAsDataURL(file);
  });
}

export default function ProductionPage() {
  const [activeEpoch, setActiveEpoch] = useState<Epoch>(epochs[0]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);
  const [referenceImage, setReferenceImage] = useState<string | null>(null);
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [promptText, setPromptText] = useState("");
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [isEnhanced, setIsEnhanced] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [apiError, setApiError] = useState<string | null>(null);
  const [autoSave, setAutoSave] = useState(true);

  useEffect(() => {
    return () => {
      if (generatedImageUrl) {
        URL.revokeObjectURL(generatedImageUrl);
      }
    };
  }, [generatedImageUrl]);

  const handleFileSelection = async (file: File) => {
    try {
      const dataUrl = await readFileAsDataUrl(file);
      setReferenceImage(dataUrl);
      setGeneratedImageUrl((previous) => {
        if (previous) {
          URL.revokeObjectURL(previous);
        }

        return null;
      });
      setApiError(null);
    } catch (error) {
      setApiError(error instanceof Error ? error.message : "Gorsel yuklenemedi.");
    }
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = async (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);

    const file = event.dataTransfer.files[0];
    if (file) {
      await handleFileSelection(file);
    }
  };

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      await handleFileSelection(file);
    }
  };

  const handleEnhancePrompt = () => {
    if (!promptText.trim()) {
      return;
    }

    setIsEnhancing(true);
    setApiError(null);

    window.setTimeout(() => {
      const suffix =
        ", sinematik isik, sadik yuz detaylari, premium prodüksiyon hissi, editoriyal gerceklik.";
      setPromptText((previous) => `${previous.trim()}${suffix}`);
      setIsEnhancing(false);
      setIsEnhanced(true);
    }, 1200);
  };

  const handleTextboxClick = () => {
    if (isEnhanced && !isGenerating) {
      setIsEnhanced(false);
    }
  };

  const triggerDownload = (imageUrl: string) => {
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = `arvian-${activeEpoch.id}-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleGenerate = async () => {
    if (!referenceImage || !promptText.trim()) {
      return;
    }

    setIsGenerating(true);
    setGenerationProgress(0);
    setApiError(null);

    const intervalId = window.setInterval(() => {
      setGenerationProgress((previous) => {
        if (previous >= 85) {
          return 85;
        }

        return previous + Math.random() * 6;
      });
    }, 300);

    try {
      const response = await fetch("/api/manifest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image: referenceImage,
          prompt: promptText,
          epochTheme: activeEpoch.theme,
        }),
      });

      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as ManifestErrorPayload | null;
        throw new Error(payload?.error ?? "Manifest istegi basarisiz oldu.");
      }

      const blob = await response.blob();
      const objectUrl = URL.createObjectURL(blob);

      setGeneratedImageUrl((previous) => {
        if (previous) {
          URL.revokeObjectURL(previous);
        }

        return objectUrl;
      });

      setGenerationProgress(100);
      setModalOpen(false);

      if (autoSave) {
        triggerDownload(objectUrl);
      }
    } catch (error) {
      setApiError(
        error instanceof Error ? error.message : "Uretim sirasinda bilinmeyen bir hata olustu."
      );
    } finally {
      window.clearInterval(intervalId);
      window.setTimeout(() => setIsGenerating(false), 250);
    }
  };

  const previewImage = generatedImageUrl;
  const ActiveEpochIcon = activeEpoch.icon;

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0A0A0A] text-white selection:bg-[#00F2FF]/40 selection:text-white">
      <div
        className={`absolute inset-0 z-0 transition-all duration-1000 ${isModalOpen || fullscreenImage ? "scale-95 blur-xl opacity-20" : "scale-100 opacity-70"}`}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeEpoch.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
            className="absolute inset-0"
          >
            <Image
              src={activeEpoch.backgroundImage}
              alt={activeEpoch.name}
              fill
              priority
              placeholder="blur"
              sizes="100vw"
              className="object-cover mix-blend-screen"
            />
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_center,transparent_0%,#000_100%)]" />

      <section className="relative z-20 flex min-h-screen flex-col px-4 py-10 md:px-8">
        <header className="mx-auto mb-10 flex w-full max-w-7xl items-start justify-between gap-4">
          <div className="space-y-2">
            <h1 className="font-cinzel text-3xl font-extrabold tracking-[0.15em] text-white drop-shadow-[0_0_20px_rgba(0,242,255,0.4)]">
              ARVIAN STUDIO
            </h1>
            <p className="max-w-md text-xs uppercase tracking-[0.3em] text-zinc-400">
              Reference-guided Hugging Face scene generation
            </p>
          </div>

          <button
            onClick={() => setModalOpen(true)}
            className={`group relative overflow-hidden rounded-full border bg-black/80 px-6 py-2.5 shadow-[0_10px_40px_rgba(0,0,0,0.8)] transition-all duration-500 ${activeEpoch.accentMap.borderMedium}`}
          >
            <span className="relative z-10 font-cinzel text-xs font-bold uppercase tracking-[0.2em] text-zinc-300 group-hover:text-white">
              Menfez Ac
            </span>
          </button>
        </header>

        <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-10 overflow-hidden pb-10">
          <div className="flex flex-wrap items-center justify-center gap-2 rounded-3xl border border-white/5 bg-black/40 p-3 backdrop-blur-3xl shadow-[0_20px_50px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.1)]">
            {epochs.map((epoch) => {
              const isActive = activeEpoch.id === epoch.id;
              const Icon = epoch.icon;

              return (
                <button
                  key={epoch.id}
                  onClick={() => setActiveEpoch(epoch)}
                  className={`relative flex w-32 flex-col items-center justify-center gap-2 overflow-hidden rounded-2xl px-6 py-3.5 font-sans transition-all duration-500 ${isActive ? epoch.accentMap.text : "text-zinc-500 hover:bg-[#00F2FF]/5 hover:text-[#00F2FF]/60"}`}
                >
                  {isActive ? (
                    <motion.div
                      layoutId="active-epoch-pill"
                      className={`absolute inset-0 rounded-2xl bg-gradient-to-t from-black/80 to-transparent ring-1 ring-inset ring-white/10 ${epoch.accentMap.bgPill}`}
                      initial={false}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  ) : null}
                  <Icon className="relative z-10 h-5 w-5" />
                  <span className={`relative z-10 text-[9px] uppercase tracking-[0.2em] ${isActive ? "font-bold text-white" : "font-semibold"}`}>
                    {epoch.name}
                  </span>
                </button>
              );
            })}
          </div>

          <div className={`relative aspect-[16/10] w-full overflow-hidden rounded-[2rem] border bg-black/60 backdrop-blur-md md:aspect-[21/9] ${activeEpoch.accentMap.borderMedium} ${activeEpoch.accentMap.glowBox}`}>
            {previewImage ? (
              <button
                type="button"
                onClick={() => setFullscreenImage(previewImage)}
                className="group absolute inset-0 h-full w-full"
              >
                <Image
                  src={previewImage}
                  alt="Generated Arvian scene"
                  fill
                  unoptimized
                  sizes="100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 flex flex-col gap-3 p-6 text-left md:flex-row md:items-end md:justify-between">
                  <div className="max-w-2xl space-y-2">
                    <p className={`text-[11px] font-bold uppercase tracking-[0.4em] ${activeEpoch.accentMap.text}`}>
                      Generated Preview
                    </p>
                    <p className="text-sm text-zinc-300">{promptText}</p>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-black/50 px-4 py-3 text-xs uppercase tracking-[0.3em] text-zinc-300 backdrop-blur-xl">
                    Tikla ve tam ekran gor
                  </div>
                </div>
              </button>
            ) : (
              <motion.div
                key={`default-view-${activeEpoch.id}`}
                initial={{ opacity: 0, scale: 1.03 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="absolute inset-0"
              >
                <div className="absolute inset-0 opacity-30">
                  <Image
                    src={activeEpoch.backgroundImage}
                    alt={activeEpoch.name}
                    fill
                    placeholder="blur"
                    sizes="(max-width: 1200px) 100vw, 1200px"
                    className="object-cover object-center mix-blend-luminosity"
                  />
                  <div className="absolute inset-0 bg-black/60 backdrop-blur-[4px]" />
                </div>
                <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
                  <div className={`mb-5 inline-flex rounded-full border bg-black/80 p-5 shadow-[0_10px_40px_rgba(0,0,0,0.8)] ${activeEpoch.accentMap.borderMedium}`}>
                    <ActiveEpochIcon className={`h-12 w-12 ${activeEpoch.accentMap.text}`} />
                  </div>
                  <h2 className={`font-cinzel text-4xl font-black uppercase tracking-[0.3em] md:text-5xl ${activeEpoch.accentMap.text}`}>
                    {activeEpoch.name}
                  </h2>
                  <p className={`mt-4 rounded-full border bg-black/50 px-6 py-2 text-xs font-semibold italic tracking-widest text-zinc-300 ${activeEpoch.accentMap.borderLight}`}>
                    {activeEpoch.theme}
                  </p>
                  <p className="mt-5 max-w-xl text-sm text-zinc-400">{activeEpoch.description}</p>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {fullscreenImage ? (
          <motion.div
            initial={{ opacity: 0, filter: "blur(20px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, filter: "blur(20px)" }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black"
          >
            <Image
              src={fullscreenImage}
              alt="Generated full view"
              fill
              unoptimized
              sizes="100vw"
              className="object-contain md:object-cover"
            />
            <div className="absolute right-8 top-8 flex items-center gap-4">
              <button
                type="button"
                onClick={() => triggerDownload(fullscreenImage)}
                className="rounded-full border border-white/20 bg-black/50 p-3 text-white transition-all hover:border-[#00F2FF]/50 hover:bg-[#00F2FF]/10"
              >
                <Download className="h-6 w-6" />
              </button>
              <button
                type="button"
                onClick={() => setFullscreenImage(null)}
                className="rounded-full border border-white/20 bg-black/50 p-3 text-white transition-all hover:border-red-500/50 hover:bg-red-500/10"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {isModalOpen ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-xl"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: -20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className={`relative w-full max-w-2xl overflow-hidden rounded-[2rem] border bg-[#0A0A0A] ring-1 ring-white/5 ${activeEpoch.accentMap.borderLight}`}
            >
              <div className="flex items-center justify-between border-b border-white/10 bg-black/40 p-6">
                <div className="space-y-1">
                  <h3 className="font-cinzel text-xl font-bold uppercase tracking-[0.2em] text-white">
                    Muhurlu Tezahur Agi
                  </h3>
                  <p className="text-[8px] font-bold uppercase tracking-[0.4em] text-[#00F2FF]/60">
                    {activeEpoch.name} katmani
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    if (!isGenerating && !isEnhancing) {
                      setModalOpen(false);
                    }
                  }}
                  className="rounded-full p-2 text-zinc-500 transition-colors hover:bg-white/10 hover:text-white"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="flex flex-col gap-8 p-6 md:p-8">
                <div className="space-y-3">
                  <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">
                    <span className="text-[#00F2FF]">1.</span> Kimlik DNA&apos;si
                  </label>
                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`relative flex h-36 w-full flex-col items-center justify-center gap-3 overflow-hidden rounded-2xl border-2 border-dashed transition-all duration-300 ${isDragging ? `${activeEpoch.accentMap.borderMedium} bg-[#00F2FF]/5` : "border-zinc-800 bg-black/50"}`}
                  >
                    {referenceImage ? (
                      <>
                        <Image
                          src={referenceImage}
                          alt="Reference upload"
                          fill
                          unoptimized
                          sizes="100vw"
                          className="object-cover opacity-60"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity hover:opacity-100">
                          <button
                            type="button"
                            onClick={() => setReferenceImage(null)}
                            className="rounded-full bg-red-900/80 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-white"
                          >
                            Sil
                          </button>
                        </div>
                        <CheckCircle2 className={`absolute bottom-3 right-3 h-6 w-6 ${activeEpoch.accentMap.text}`} />
                      </>
                    ) : (
                      <>
                        <Upload className="h-8 w-8 text-zinc-600" />
                        <div className="text-center">
                          <span className="text-xs font-semibold tracking-wide text-zinc-400">
                            Surukle veya sec
                          </span>
                          <p className="mt-1 text-[9px] font-bold uppercase tracking-widest text-[#00F2FF]/60">
                            Dosya base64 olarak API&apos;ye gonderilecek
                          </p>
                        </div>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          disabled={isEnhancing || isGenerating}
                          className="absolute inset-0 cursor-pointer opacity-0"
                        />
                      </>
                    )}
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">
                      <span className="text-[#00F2FF]">2.</span> Vizyon
                    </label>
                    {isEnhanced ? (
                      <span className="rounded-full border border-[#00F2FF]/20 bg-[#00F2FF]/10 px-2 py-0.5 text-[8px] font-extrabold uppercase tracking-widest text-[#00F2FF]">
                        Yuceltildi
                      </span>
                    ) : null}
                  </div>

                  <div className="relative">
                    <textarea
                      rows={4}
                      value={promptText}
                      onChange={(event) => setPromptText(event.target.value)}
                      disabled={isEnhancing || isGenerating}
                      onClick={handleTextboxClick}
                      readOnly={isEnhanced}
                      placeholder="Orn: Isik yagmurun icinden gelsin, yuz ayni kalsin, sinematik bir sahne olsun."
                      className={`w-full resize-none rounded-2xl border p-5 text-sm text-white transition-all focus:outline-none ${isEnhanced ? "border-[#00F2FF] bg-[#00F2FF]/5" : "border-zinc-800 bg-black/80"}`}
                    />
                    {isEnhancing ? (
                      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                        <Cpu className={`h-8 w-8 animate-pulse ${activeEpoch.accentMap.text}`} />
                        <p className="text-[10px] font-bold uppercase tracking-widest text-[#00F2FF]">
                          Vizyon profesyonellestiriliyor
                        </p>
                      </div>
                    ) : null}
                  </div>
                </div>

                {apiError ? (
                  <div className="rounded-xl border border-red-500/50 bg-red-900/30 p-3 text-center text-xs font-semibold text-red-300">
                    {apiError}
                  </div>
                ) : null}

                <AnimatePresence>
                  {isGenerating ? (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="border-t border-white/10 pt-4"
                    >
                      <div className="mb-2 flex items-end justify-between">
                        <p className="font-cinzel text-[10px] font-bold uppercase tracking-[0.25em] text-white">
                          Yansima sentezleniyor
                        </p>
                        <span className="text-[11px] font-black uppercase tracking-[0.2em] text-[#00F2FF]">
                          %{generationProgress.toFixed(0)}
                        </span>
                      </div>
                      <div className="h-1 w-full overflow-hidden rounded-full bg-white/10">
                        <motion.div
                          className="h-full bg-[#00F2FF] shadow-[0_0_10px_currentColor]"
                          initial={{ width: 0 }}
                          animate={{ width: `${generationProgress}%` }}
                          transition={{ ease: "linear", duration: 0.3 }}
                        />
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>

              <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 bg-black/60 p-6 md:flex-row">
                {!isEnhanced ? (
                  <button
                    type="button"
                    onClick={handleEnhancePrompt}
                    disabled={isEnhancing || !promptText.trim() || !referenceImage}
                    className={`flex w-full items-center justify-center gap-3 rounded-xl px-10 py-4 font-cinzel text-sm font-bold uppercase tracking-[0.25em] transition-all md:w-auto ${activeEpoch.accentMap.glowBadge} ${(isEnhancing || !promptText.trim() || !referenceImage) ? "cursor-not-allowed opacity-50 grayscale" : "hover:scale-105 hover:brightness-125"}`}
                  >
                    {isEnhancing ? <Loader2 className="h-5 w-5 animate-spin" /> : <Sparkles className="h-5 w-5" />}
                    <span>{isEnhancing ? "Isleniyor" : "Yucelt"}</span>
                  </button>
                ) : (
                  <div className="flex w-full flex-col gap-5">
                    <div className="flex items-center justify-end gap-3 px-2">
                      <span className={`text-[10px] font-extrabold uppercase tracking-[0.2em] ${autoSave ? "text-[#00F2FF]" : "text-zinc-500"}`}>
                        Cihaza kaydet
                      </span>
                      <button
                        type="button"
                        onClick={() => setAutoSave((previous) => !previous)}
                        className={`relative h-6 w-11 rounded-full transition-all duration-300 ${autoSave ? "border border-[#00F2FF] bg-[#00F2FF]/40" : "border border-white/20 bg-white/10"}`}
                      >
                        <div className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow-md transition-all duration-300 ${autoSave ? "left-[22px]" : "left-1"}`} />
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={handleGenerate}
                      disabled={isGenerating || !referenceImage || !promptText.trim()}
                      className={`relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-xl border-2 py-5 font-cinzel text-lg font-black uppercase tracking-[0.3em] transition-all ${(isGenerating || !referenceImage || !promptText.trim()) ? "cursor-not-allowed border-zinc-700 text-zinc-500 opacity-40 grayscale" : "border-[#00F2FF]/80 text-[#00F2FF] hover:scale-[1.02] hover:bg-[#00F2FF]/5"}`}
                    >
                      <Orbit className={`h-6 w-6 ${isGenerating ? "animate-spin" : ""}`} />
                      <span>{isGenerating ? "Yaratiliyor" : "Yarat"}</span>
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </main>
  );
}

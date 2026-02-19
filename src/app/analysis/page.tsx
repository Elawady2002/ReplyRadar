"use client";

import { useRouter } from "next/navigation";
import { Activity, ArrowLeft, ArrowRight, BarChart3, Target, Info, Share2 } from "lucide-react";
import { useSearch } from "@/context/SearchContext";
import { motion } from "framer-motion";
import { useState } from "react";
import { clsx } from "clsx";

export default function AnalysisPage() {
    const { analysis, selectedKeyword, setResults } = useSearch();
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleContinue = async () => {
        setLoading(true);
        try {
            const resp = await fetch("/api/jackpots", {
                method: "POST",
                body: JSON.stringify({ keyword: selectedKeyword })
            });
            const data = await resp.json();
            setResults(data.results || []);
            router.push("/jackpots");
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col gap-16 py-10"
        >
            <header className="flex flex-col gap-6">
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-2 text-[#475569] hover:text-[#D4AF37] transition-all text-[10px] font-black uppercase tracking-[0.3em]"
                >
                    <ArrowLeft size={14} /> Back to Radar
                </button>
                <div className="flex items-center gap-5">
                    <div className="w-16 h-16 bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center justify-center rounded-sm">
                        <Activity size={32} className="text-[#D4AF37]" />
                    </div>
                    <div className="flex flex-col">
                        <h1 className="text-[48px] text-white leading-tight">Market Intel</h1>
                        <span className="text-[10px] font-black tracking-[0.4em] uppercase text-[#D4AF37]">Intelligence Extraction</span>
                    </div>
                </div>
                <p className="text-[#94A3B8] text-[16px] max-w-2xl leading-relaxed">
                    Deep structural analysis for <span className="text-white font-bold glow-text">[{selectedKeyword}]</span>. We've classified the market sentiment and conversation density.
                </p>
            </header>

            <div className="grid grid-cols-5 gap-8">
                {/* Left Column - Large Stats */}
                <div className="glass-card flex flex-col gap-10 col-span-3">
                    <div className="flex items-center justify-between border-b border-[#141414] pb-6">
                        <div className="flex items-center gap-3">
                            <BarChart3 size={18} className="text-[#D4AF37]" />
                            <span className="text-[12px] font-black tracking-[0.2em] uppercase text-white">Activity Density</span>
                        </div>
                        <div className="px-3 py-1 bg-[#22C55E]/10 border border-[#22C55E]/20 text-[#22C55E] text-[10px] font-black tracking-widest uppercase">Live Scan</div>
                    </div>

                    <div className="flex items-end gap-10">
                        <div className="flex flex-col gap-2">
                            <span className="text-[64px] text-white font-bold leading-none tracking-tighter">{analysis?.level || "SCANNING"}</span>
                            <span className="text-[12px] text-[#475569] font-bold uppercase tracking-[0.2em]">Platform Intensity</span>
                        </div>
                        <div className="flex-1 pb-4">
                            <div className="h-2 w-full bg-[#141414] rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: analysis?.level === 'High Activity' ? '100%' : analysis?.level === 'Active' ? '65%' : '25%' }}
                                    className="h-full bg-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.4)]"
                                    transition={{ duration: 1.5, ease: "circOut" }}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-8 border-t border-[#141414] pt-8">
                        <div className="flex flex-col gap-2">
                            <span className="text-[10px] text-[#475569] font-black uppercase tracking-widest">Raw Hits</span>
                            <span className="text-[24px] text-white font-bold">{analysis?.count || 0}</span>
                            <span className="text-[11px] text-[#94A3B8]">Unique discussions sourced.</span>
                        </div>
                        <div className="flex flex-col gap-2">
                            <span className="text-[10px] text-[#475569] font-black uppercase tracking-widest">Time Buffer</span>
                            <span className="text-[24px] text-white font-bold">168 Hours</span>
                            <span className="text-[11px] text-[#94A3B8]">Current lookback window.</span>
                        </div>
                    </div>
                </div>

                {/* Right Column - Intent Classification */}
                <div className="glass-card flex flex-col gap-8 col-span-2 bg-[#D4AF37]/2">
                    <div className="flex items-center gap-3">
                        <Target size={18} className="text-[#D4AF37]" />
                        <span className="text-[12px] font-black tracking-[0.2em] uppercase text-white">Semantic Intent</span>
                    </div>
                    <div className="text-[#94A3B8] text-[14px] whitespace-pre-line leading-relaxed italic bg-black/40 p-8 border border-[#141414] relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-20"><Info size={24} /></div>
                        {analysis?.classification || "Running NLP intent classification models..."}
                    </div>
                    <div className="mt-auto flex flex-col gap-4">
                        <div className="flex items-center justify-between text-[10px] text-[#475569] font-bold uppercase tracking-widest px-1">
                            <span>Confidence Score</span>
                            <span>94%</span>
                        </div>
                        <div className="h-1 w-full bg-[#141414]">
                            <div className="h-full bg-[#D4AF37] w-[94%] opacity-50"></div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-between items-center bg-[#070707] border border-[#141414] p-8">
                <div className="flex items-center gap-8">
                    <div className="flex items-center gap-3 text-[#475569]">
                        <Share2 size={16} />
                        <span className="text-[11px] font-black uppercase tracking-[0.2em]">Multi-Channel Feed Enabled</span>
                    </div>
                </div>
                <button
                    onClick={handleContinue}
                    disabled={loading}
                    className="elite-btn min-w-[280px]"
                >
                    {loading ? "Sourcing Jackpots..." : "Locate Target Posts"}
                    {!loading && <ArrowRight size={18} />}
                </button>
            </div>
        </motion.div>
    );
}

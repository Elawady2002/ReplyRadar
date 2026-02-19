"use client";

import { useRouter } from "next/navigation";
import { Radar, ArrowLeft, ArrowRight, Sparkles, Layers } from "lucide-react";
import { useSearch } from "@/context/SearchContext";
import { motion } from "framer-motion";
import { useState } from "react";
import { clsx } from "clsx";

export default function RadarPage() {
    const { variations, setSelectedKeyword, selectedKeyword, setAnalysis } = useSearch();
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSelect = async (v: string) => {
        setSelectedKeyword(v);
    };

    const handleContinue = async () => {
        if (!selectedKeyword) return;
        setLoading(true);
        try {
            const resp = await fetch("/api/analysis", {
                method: "POST",
                body: JSON.stringify({ keyword: selectedKeyword })
            });
            const data = await resp.json();
            setAnalysis(data);
            router.push("/analysis");
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
                    <ArrowLeft size={14} /> System Recall
                </button>
                <div className="flex items-center gap-5">
                    <div className="w-16 h-16 bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center justify-center rounded-sm">
                        <Radar size={32} className="text-[#D4AF37]" />
                    </div>
                    <div className="flex flex-col">
                        <h1 className="text-[48px] text-white leading-tight">Neural Radar</h1>
                        <span className="text-[10px] font-black tracking-[0.4em] uppercase text-[#D4AF37]">Vector Expansion</span>
                    </div>
                </div>
                <p className="text-[#94A3B8] text-[16px] max-w-2xl leading-relaxed">
                    The engine has branched your initial query into high-intent sub-vectors. Select a specific focus to begin deep conversation analysis.
                </p>
            </header>

            <div className="glass-card">
                <div className="flex flex-col gap-10">
                    <div className="flex items-center justify-between border-b border-[#141414] pb-6">
                        <div className="flex items-center gap-3">
                            <Layers size={18} className="text-[#D4AF37]" />
                            <span className="text-[12px] font-black tracking-[0.2em] uppercase text-white">Focus Branches</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Sparkles size={14} className="text-[#D4AF37]" />
                            <span className="text-[10px] font-medium text-[#475569] italic">AI Optimized Variations</span>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-4">
                        {variations.length > 0 ? variations.map((v, i) => (
                            <button
                                key={i}
                                onClick={() => handleSelect(v)}
                                className={clsx(
                                    "px-8 py-4 border text-[14px] font-bold transition-all relative overflow-hidden group",
                                    selectedKeyword === v
                                        ? "bg-[#D4AF37] text-black border-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.2)]"
                                        : "bg-black border-[#141414] text-[#475569] hover:border-[#D4AF37]/40 hover:text-white"
                                )}
                            >
                                {v}
                                {selectedKeyword === v && <div className="absolute top-0 right-0 p-1"><Sparkles size={8} /></div>}
                            </button>
                        )) : (
                            <div className="w-full py-20 text-center border border-dashed border-[#141414]">
                                <p className="text-[#475569] font-medium italic">No variations synthesized. Re-initiate radar at dashboard.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="flex justify-between items-center bg-[#070707] border border-[#141414] p-8">
                <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-black tracking-[0.2em] uppercase text-[#475569]">Selected Vector</span>
                    <span className="text-white font-bold text-[18px]">{selectedKeyword || "Awaiting Selection..."}</span>
                </div>
                <button
                    onClick={handleContinue}
                    disabled={loading || !selectedKeyword}
                    className="elite-btn min-w-[280px]"
                >
                    {loading ? "Engaging Analysis..." : "Commit Focus"}
                    {!loading && <ArrowRight size={18} />}
                </button>
            </div>
        </motion.div>
    );
}

"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Sparkles, Search, Check, History, Loader2, Globe } from "lucide-react";
import { useSearch } from "@/context/SearchContext";
import { motion } from "framer-motion";
import { useState } from "react";
import { clsx } from "clsx";

export default function RadarPage() {
    const { variations, setSelectedKeyword, selectedKeyword, setAnalysis, history, setVariations, setKeyword, keyword } = useSearch();
    const [loading, setLoading] = useState(false);
    const [fetchingHistory, setFetchingHistory] = useState<string | null>(null);
    const router = useRouter();

    const handleSelect = async (v: string) => {
        setSelectedKeyword(v);
    };

    const fetchVariationsForHistory = async (h: string) => {
        setFetchingHistory(h);
        try {
            const resp = await fetch("/api/radar", {
                method: "POST",
                body: JSON.stringify({ keyword: h })
            });
            const data = await resp.json();
            if (resp.ok) {
                setVariations(data.variations || []);
                setKeyword(h);
                setSelectedKeyword(""); // Reset selection when switching keyword
            } else {
                alert(data.error || "Failed to load variations.");
            }
        } catch (e) {
            console.error(e);
            alert("Network error.");
        } finally {
            setFetchingHistory(null);
        }
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
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col gap-10"
        >
            <header className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                    <h1 className="text-4xl text-text-primary">Keyword Expansion</h1>
                    <p className="subtitle">Choose a specific marketing angle or sub-niche to analyze the conversation landscape.</p>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Sidebar: Recent Searches */}
                <aside className="flex flex-col gap-6">
                    <div className="card-base flex flex-col gap-6 h-full">
                        <div className="flex items-center gap-2 border-b border-border-dim/50 pb-4">
                            <History size={18} className="text-accent" />
                            <h3 className="text-lg">Recent</h3>
                        </div>
                        <div className="flex flex-col gap-3">
                            {history.length > 0 ? history.map((h, i) => {
                                const isActive = keyword === h;
                                return (
                                    <button
                                        key={i}
                                        onClick={() => fetchVariationsForHistory(h)}
                                        disabled={fetchingHistory !== null || loading}
                                        className={clsx(
                                            "flex items-center justify-between p-4 rounded-xl border transition-all text-left",
                                            isActive || fetchingHistory === h
                                                ? "bg-accent/10 border-accent/40 shadow-sm"
                                                : "bg-surface border-border-dim hover:border-accent/40 hover:bg-surface-lighter"
                                        )}
                                    >
                                        <span className={clsx(
                                            "text-sm font-medium truncate",
                                            isActive ? "text-accent" : "text-text-secondary"
                                        )}>{h}</span>
                                        {fetchingHistory === h ? (
                                            <Loader2 className="animate-spin text-accent" size={14} />
                                        ) : (
                                            <ArrowRight size={14} className={clsx(isActive ? "text-accent" : "text-text-muted")} />
                                        )}
                                    </button>
                                );
                            }) : (
                                <p className="text-xs text-text-muted text-center py-8 italic">No recent history</p>
                            )}
                        </div>
                    </div>
                </aside>

                {/* Main Content: Variations */}
                <div className="card-base lg:col-span-3 flex flex-col gap-8">
                    <div className="flex items-center justify-between border-b border-border-dim/50 pb-6">
                        <div className="flex items-center gap-2">
                            <Search size={18} className="text-accent" />
                            <h3 className="text-lg">Generated Variations</h3>
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1 bg-brand-tint rounded-full">
                            <Sparkles size={14} className="text-accent" />
                            <span className="text-[11px] font-bold text-accent uppercase tracking-wider">AI Optimized</span>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-3">
                        {variations.length > 0 ? variations.map((v, i) => {
                            const isSelected = selectedKeyword === v;
                            return (
                                <button
                                    key={i}
                                    onClick={() => handleSelect(v)}
                                    className={clsx(
                                        "px-6 py-3 rounded-xl border text-[15px] font-medium transition-all flex items-center gap-2",
                                        isSelected
                                            ? "bg-accent text-black border-accent shadow-gold"
                                            : "bg-surface border-border-dim text-text-secondary hover:border-accent/40 hover:text-text-primary"
                                    )}
                                >
                                    {v}
                                    {isSelected && <Check size={16} />}
                                </button>
                            );
                        }) : (
                            <div className="w-full py-20 text-center border border-dashed border-border-dim rounded-xl">
                                {fetchingHistory ? (
                                    <div className="flex flex-col items-center gap-4">
                                        <Loader2 className="animate-spin text-accent" size={32} />
                                        <p className="text-text-muted">Loading variations...</p>
                                    </div>
                                ) : (
                                    <p className="text-text-muted">No variations found. Please start a new search or select from history.</p>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center bg-surface border border-border-dim rounded-2xl p-8 gap-6">
                <div className="flex flex-col gap-1">
                    <span className="text-xs font-bold text-text-muted uppercase tracking-widest">Selected Focus</span>
                    <span className="text-text-primary font-bold text-xl">{selectedKeyword || "Choose a variation above..."}</span>
                </div>
                <button
                    onClick={handleContinue}
                    disabled={loading || !selectedKeyword}
                    className="btn-primary min-w-[280px] h-14"
                >
                    {loading ? (
                        <>
                            <Loader2 className="animate-spin" size={20} />
                            <span>Preparing Analysis...</span>
                        </>
                    ) : (
                        <>
                            <span>Analyze Marketplace</span>
                            <ArrowRight size={20} />
                        </>
                    )}
                </button>
            </div>
        </motion.div>
    );
}

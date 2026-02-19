"use client";

import { useRouter } from "next/navigation";
import { Trophy, ArrowLeft, MessageSquare, ExternalLink, Filter, CheckCircle2, Link as LinkIcon, AlertCircle } from "lucide-react";
import { useSearch } from "@/context/SearchContext";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { clsx } from "clsx";

export default function JackpotsPage() {
    const { results, selectedPosts, setSelectedPosts, selectedKeyword, affiliateLink, setAffiliateLink } = useSearch();
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const togglePost = (post: any) => {
        if (selectedPosts.find(p => p.id === post.id)) {
            setSelectedPosts(selectedPosts.filter(p => p.id !== post.id));
        } else {
            setSelectedPosts([...selectedPosts, post]);
        }
    };

    const handleSelectAll = () => {
        if (selectedPosts.length === results.length) {
            setSelectedPosts([]);
        } else {
            setSelectedPosts([...results]);
        }
    };

    const handleContinue = () => {
        if (selectedPosts.length === 0) return;
        router.push("/generate");
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col gap-12 py-10"
        >
            <header className="flex flex-col gap-6">
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-2 text-[#475569] hover:text-[#D4AF37] transition-all text-[10px] font-black uppercase tracking-[0.3em]"
                >
                    <ArrowLeft size={14} /> Intelligence Re-Entry
                </button>
                <div className="flex items-center gap-5">
                    <div className="w-16 h-16 bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center justify-center rounded-sm">
                        <Trophy size={32} className="text-[#D4AF37]" />
                    </div>
                    <div className="flex flex-col">
                        <h1 className="text-[48px] text-white leading-tight">Social Jackpots</h1>
                        <span className="text-[10px] font-black tracking-[0.4em] uppercase text-[#D4AF37]">Candidate Sourcing</span>
                    </div>
                </div>
                <p className="text-[#94A3B8] text-[16px] max-w-2xl leading-relaxed">
                    High-potential conversations found for <span className="text-white font-bold">[{selectedKeyword}]</span>. Mark the targets where your engagement will have the highest yield.
                </p>
            </header>

            {/* Modern Table Container */}
            <div className="glass-card p-0! overflow-hidden border-[#141414]">
                <div className="flex items-center justify-between p-8 bg-black/40 border-b border-[#141414]">
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-3">
                            <Filter size={16} className="text-[#D4AF37]" />
                            <span className="text-[12px] font-black tracking-[0.2em] uppercase text-white">Target Feed</span>
                        </div>
                        <div className="h-6 w-px bg-[#141414]"></div>
                        <button
                            onClick={handleSelectAll}
                            className="text-[10px] font-black uppercase tracking-widest text-[#475569] hover:text-white transition-all"
                        >
                            {selectedPosts.length === results.length ? "Deselect All" : "Select All Candidates"}
                        </button>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-[11px] text-[#475569] font-bold uppercase tracking-widest">{results.length} Discussions Isolated</span>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-black/20 text-[10px] font-black uppercase tracking-[0.2em] text-[#475569]">
                                <th className="px-10 py-6 w-20">Sel.</th>
                                <th className="px-5 py-6 w-32">Vector</th>
                                <th className="px-5 py-6">Intelligence Feed</th>
                                <th className="px-5 py-6 w-32">Score</th>
                                <th className="px-10 py-6 w-20"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#141414]">
                            {results.map((post) => {
                                const isSelected = !!selectedPosts.find(p => p.id === post.id);
                                return (
                                    <tr key={post.id} className={clsx("group transition-all duration-300", isSelected ? "bg-[#D4AF37]/3" : "hover:bg-white/2")}>
                                        <td className="px-10 py-8">
                                            <button
                                                onClick={() => togglePost(post)}
                                                className={clsx("w-6 h-6 border flex items-center justify-center transition-all",
                                                    isSelected ? "bg-[#D4AF37] border-[#D4AF37]" : "border-[#141414] hover:border-[#D4AF37]/40"
                                                )}
                                            >
                                                {isSelected && <CheckCircle2 size={14} className="text-black" />}
                                            </button>
                                        </td>
                                        <td className="px-5 py-8">
                                            <div className={clsx("text-[9px] font-black tracking-[0.25em] uppercase w-fit px-3 py-1.5 border leading-none",
                                                post.platform === 'Reddit' ? "text-orange-400 border-orange-400/20 bg-orange-400/5 shadow-[0_0_10px_rgba(251,146,60,0.1)]" : "text-red-500 border-red-500/20 bg-red-500/5 shadow-[0_0_10px_rgba(239,68,68,0.1)]"
                                            )}>
                                                {post.platform}
                                            </div>
                                        </td>
                                        <td className="px-5 py-8">
                                            <p className="text-[15px] text-[#FFFFFF] line-clamp-2 leading-relaxed max-w-xl font-medium">
                                                {post.text}
                                            </p>
                                        </td>
                                        <td className="px-5 py-8">
                                            <span className="text-[14px] text-white font-bold font-mono glow-text">{post.engagement}</span>
                                        </td>
                                        <td className="px-10 py-8">
                                            <a href={post.url} target="_blank" className="text-[#475569] hover:text-[#D4AF37] opacity-0 group-hover:opacity-100 transition-all">
                                                <ExternalLink size={16} />
                                            </a>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Global Actions Bar */}
            <footer className="flex flex-col gap-10">
                <div className="glass-card flex flex-col gap-6 bg-[#D4AF37]/2">
                    <div className="flex items-center gap-3">
                        <LinkIcon size={14} className="text-[#D4AF37]" />
                        <label className="text-[10px] font-black tracking-[0.3em] uppercase text-white">Injection Payload (Affiliate/Target URL)</label>
                    </div>
                    <div className="flex gap-4">
                        <input
                            type="text"
                            placeholder="Enter the destination URL for AI generation..."
                            className="flex-1 bg-black/60 border border-[#141414] px-8 py-5 text-[16px] text-white outline-none focus:border-[#D4AF37] transition-all font-medium placeholder-[#475569]"
                            value={affiliateLink}
                            onChange={(e) => setAffiliateLink(e.target.value)}
                        />
                    </div>
                    {!affiliateLink && (
                        <div className="flex items-center gap-2 text-[#475569] text-[11px] font-medium tracking-tight">
                            <AlertCircle size={12} />
                            <span>AI will generate natural responses without a specific link if left blank.</span>
                        </div>
                    )}
                </div>

                <div className="bg-[#070707] border border-[#141414] p-10 flex justify-between items-center">
                    <div className="flex flex-col gap-1">
                        <span className="text-[10px] font-black tracking-[0.2em] uppercase text-[#475569]">Pipeline Ready</span>
                        <div className="text-white text-[18px] font-bold">
                            <span className="text-[#D4AF37] glow-text">{selectedPosts.length}</span> Targets Selected
                        </div>
                    </div>
                    <button
                        onClick={handleContinue}
                        disabled={selectedPosts.length === 0}
                        className="elite-btn min-w-[320px]"
                    >
                        Initiate Neural Writing
                        <MessageSquare size={18} />
                    </button>
                </div>
            </footer>
        </motion.div>
    );
}

"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { LayoutGrid, Radar, Activity, Trophy, MessageSquare, ShieldCheck, LogOut, ChevronRight } from "lucide-react";
import { useSearch } from "@/context/SearchContext";
import { clsx } from "clsx";
import { motion } from "framer-motion";

const STEPS = [
    { path: "/dashboard", label: "Intelligence", icon: LayoutGrid },
    { path: "/radar", label: "Ad Radar", icon: Radar },
    { path: "/analysis", label: "Analysis", icon: Activity },
    { path: "/jackpots", label: "Jackpots", icon: Trophy },
    { path: "/generate", label: "Generation", icon: MessageSquare },
];

export function Sidebar() {
    const pathname = usePathname();
    const { resetSession } = useSearch();
    const currentIndex = STEPS.findIndex(s => s.path === pathname);
    const progress = ((currentIndex + 1) / STEPS.length) * 100;

    return (
        <aside className="w-72 bg-[#050505] border-r border-[#141414] flex flex-col relative shrink-0 h-screen overflow-hidden">
            {/* Dynamic Progress Line */}
            <div className="absolute left-0 top-0 w-0.5 h-full bg-[#141414] z-0">
                <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${progress}%` }}
                    className="w-full bg-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.4)]"
                    transition={{ duration: 1, ease: "circOut" }}
                />
            </div>

            <div className="flex flex-col p-10 gap-16 relative z-10 h-full">
                {/* Elite Logo */}
                <Link href="/dashboard" className="flex items-center gap-4 group">
                    <div className="w-10 h-10 bg-accent flex items-center justify-center rounded-sm">
                        <span className="font-bold text-black text-xl brand-font">R</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="brand-font text-[20px] text-white tracking-tight leading-none">ReplyRadar</span>
                        <span className="text-[9px] uppercase tracking-[0.4em] text-accent font-black mt-1">Elite Edition</span>
                    </div>
                </Link>

                {/* Command Navigation */}
                <nav className="flex flex-col gap-2 w-full flex-1">
                    {STEPS.map((step, index) => {
                        const isActive = pathname === step.path;
                        const Icon = step.icon;

                        return (
                            <Link
                                key={step.path}
                                href={step.path}
                                className={clsx(
                                    "command-nav-link group py-5",
                                    isActive && "active"
                                )}
                            >
                                <div className="flex items-center gap-4">
                                    <Icon size={18} className={clsx(isActive ? "text-[#D4AF37]" : "text-[#475569] group-hover:text-white")} />
                                    <span className="tracking-[0.2em]">{step.label}</span>
                                </div>
                                {isActive && <ChevronRight size={14} className="text-[#D4AF37] ml-auto" />}
                            </Link>
                        );
                    })}
                </nav>

                {/* Action Center */}
                <div className="flex flex-col gap-6 mt-auto">
                    <div className=" glass-card p-5! bg-linear-to-br from-[#0D0D0D] to-[#050505] border-[#141414] relative group">
                        <div className="flex items-center gap-2 text-[#D4AF37] mb-2">
                            <ShieldCheck size={14} />
                            <span className="text-[9px] font-black tracking-[0.3em] uppercase">Verified Account</span>
                        </div>
                        <p className="text-[11px] text-[#94A3B8] leading-snug mb-4">
                            You are currently using the <span className="text-white font-bold">Elite Pipeline</span>.
                        </p>
                        <div className="h-1 w-full bg-[#141414] rounded-full overflow-hidden">
                            <div className="h-full bg-[#D4AF37]/20 w-[64%]"></div>
                        </div>
                    </div>

                    <button
                        onClick={resetSession}
                        className="flex items-center gap-3 text-[#475569] hover:text-[#F43F5E] transition-all text-[10px] font-black uppercase tracking-[0.3em]"
                    >
                        <LogOut size={14} />
                        <span>Terminate Session</span>
                    </button>
                </div>
            </div>
        </aside>
    );
}

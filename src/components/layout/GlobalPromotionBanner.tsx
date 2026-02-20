import React from 'react';
import { Smartphone, Sparkles, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function GlobalPromotionBanner() {
    return (
        <div className="w-full bg-[#0a0a0a] border border-[#141414] rounded-sm p-6 lg:p-8 flex flex-col sm:flex-row gap-6 sm:gap-8 items-start relative mb-8">
            {/* Background Glow */}
            <div className="absolute top-[-20%] left-[-10%] w-[30%] h-[100%] bg-[#D4AF37]/5 rounded-full blur-[80px] pointer-events-none" />

            {/* Icon Container */}
            <div className="w-16 h-16 shrink-0 relative flex items-center justify-center bg-[#111111] border border-[#1a1a1a] rounded-sm self-start sm:mt-1 z-10 shadow-[0_0_20px_rgba(212,175,55,0.05)]">
                <Smartphone size={28} className="text-[#D4AF37]" />
                <div className="absolute -top-2 -right-2 bg-[#D4AF37] text-black font-bold text-[10px] w-5 h-5 flex items-center justify-center rounded-sm leading-none shadow-md">
                    $
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 space-y-4 z-10">
                <h2 className="text-xl sm:text-2xl font-bold text-white leading-tight brand-font">
                    Want To Multiply Your Earnings To <span className="text-[#D4AF37]">$1,000 - $5,000</span> A Day?
                </h2>

                <p className="text-[#737373] text-sm sm:text-base leading-relaxed max-w-4xl font-light">
                    The <span className="text-white/80 font-medium tracking-wide">Inbox Money Vault</span> system is powerful, but if you want to scale to truly life-changing income, you need to watch this exclusive training which shows how to make the serious money. And guess what? This training is free for all members.
                </p>

                <a
                    href="https://freedomescapexcelerator.com/5k-per-day"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="elite-btn inline-flex items-center gap-2 group w-fit mt-2"
                >
                    <span className="relative z-10 flex items-center gap-2">
                        <Sparkles size={16} />
                        LEARN HOW
                        <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                    </span>
                </a>
            </div>
        </div>
    );
}

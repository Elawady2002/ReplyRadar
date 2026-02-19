"use client";

import { motion } from "framer-motion";
import { Headphones, ArrowUpRight } from "lucide-react";

export function SupportBanner() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full relative overflow-hidden rounded-2xl border border-[#141414] bg-linear-to-r from-[#0D0D0D] to-[#050505] p-6 flex flex-col md:flex-row items-center justify-between gap-6 group"
        >
            {/* Background Glow */}
            <div className="absolute top-0 left-0 w-[30%] h-full bg-linear-to-r from-[#D4AF37]/5 to-transparent pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity" />

            <div className="flex items-center gap-6 relative z-10 w-full md:w-auto">
                <div className="w-14 h-14 rounded-full bg-[#0A0A0A] border border-[#141414] flex items-center justify-center shrink-0 group-hover:border-[#D4AF37]/30 transition-colors">
                    <Headphones size={24} className="text-[#D4AF37]" />
                </div>
                <div className="flex flex-col gap-1">
                    <h3 className="text-[18px] font-bold text-white">Need Elite Assistance?</h3>
                    <p className="text-[#94A3B8] text-[14px]">Our tactical support team is deployed 24/7 to clear your path.</p>
                </div>
            </div>

            <button className="elite-btn-outline min-w-[200px] group-hover:bg-[#D4AF37] group-hover:text-black group-hover:border-[#D4AF37] relative z-10">
                <span>Contact Command</span>
                <ArrowUpRight size={16} />
            </button>
        </motion.div>
    );
}

import React from 'react';
import { motion } from 'framer-motion';
import lakshmi from '../assets/lakshmi.png';
import WaveDivider from './WaveDivider';
import SpotRatesCard from './SpotRatesCard';
import { useRates } from '../context/RateContext';

const Hero = () => {
    const { rates } = useRates();

    const fmt = (val) => {
        if (typeof val !== 'number') return '-';
        return val.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    };

    const goldRate = rates.spot?.[0]?.ask || '-';
    const silverRate = rates.spot?.[1]?.ask || '-';
    const usdRate = rates.spot?.[2]?.ask || '-';

    return (
        <section className="relative min-height-[650px] w-full gradient-luxury overflow-hidden pt-12">
            <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 items-center relative z-20">

                {/* Left Side: Goddess Lakshmi */}
                <motion.div
                    initial={{ opacity: 0, x: -100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="relative flex justify-center md:justify-start pt-12"
                >
                    <div className="relative group">
                        {/* Vibrant Gold Glow */}
                        <div className="absolute inset-0 bg-gold-400 opacity-30 blur-[120px] group-hover:opacity-50 transition-opacity"></div>

                        <motion.img
                            src={lakshmi}
                            alt="Goddess Lakshmi"
                            className="relative z-20 w-full max-w-[550px] drop-shadow-[0_35px_35px_rgba(0,0,0,0.6)] animate-float"
                        />

                        {/* Coins/Petals shadow */}
                        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[80%] h-12 bg-black/40 blur-3xl rounded-full"></div>
                    </div>
                </motion.div>

                {/* Right Side: Title & Rates */}
                <motion.div
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
                    className="text-center md:text-right flex flex-col items-center md:items-end gap-10"
                >
                    <div className="flex flex-col gap-0">
                        <h1 className="text-7xl md:text-9xl font-playfair font-black text-white leading-[0.85] tracking-tighter drop-shadow-2xl">
                            ABHINAV
                        </h1>
                        <p className="text-xl md:text-2xl font-poppins font-black text-gold-400 tracking-[0.5em] uppercase mt-2 drop-shadow-lg">
                            GOLD & SILVER
                        </p>
                    </div>

                    {/* Quick Rates Column */}
                    <div className="flex gap-12 md:gap-16 text-white border-b border-white/20 pb-6">
                        <div className="flex flex-col items-center md:items-end">
                            <span className="text-[10px] font-black text-gold-400/80 uppercase tracking-widest">Gold</span>
                            <span className="text-4xl font-playfair font-black drop-shadow-md">${fmt(goldRate)}</span>
                        </div>
                        <div className="flex flex-col items-center md:items-end">
                            <span className="text-[10px] font-black text-pink-300 uppercase tracking-widest">Silver</span>
                            <span className="text-4xl font-playfair font-black text-magenta-600 brightness-200 drop-shadow-md">${fmt(silverRate)}</span>
                        </div>
                        <div className="flex flex-col items-center md:items-end">
                            <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">USD</span>
                            <span className="text-4xl font-playfair font-black drop-shadow-md">₹{fmt(usdRate)}</span>
                        </div>
                    </div>
                    <SpotRatesCard />
                </motion.div>
            </div>

            <WaveDivider />
        </section>
    );
};

export default Hero;

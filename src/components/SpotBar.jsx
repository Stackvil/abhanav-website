import React from 'react';
import { useRates } from '../context/RateContext';
import { motion } from 'framer-motion';

const SpotBar = () => {
    const { rates } = useRates();

    const fmt = (val) => {
        if (typeof val !== 'number') return '-';
        return val.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    };

    const gold = rates.spot?.[0] || { bid: '-', ask: '-', name: 'GOLD' };
    const silver = rates.spot?.[1] || { bid: '-', ask: '-', name: 'SILVER' };
    const inr = rates.spot?.[2] || { bid: '-', ask: '-', name: 'USD/INR' };

    const items = [
        { label: 'GOLD', value: gold.ask, symbol: '$' },
        { label: 'SILVER', value: silver.ask, symbol: '$' },
        { label: 'USD/INR', value: inr.ask, symbol: '₹' }
    ];

    return (
        <div className="w-full bg-transparent flex flex-row flex-wrap items-center justify-end gap-3 md:gap-5 px-6 md:pr-8">
            {items.map((item, idx) => (
                <motion.div
                    key={item.label}
                    initial={{ opacity: 0, scale: 0.9, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="flex flex-col items-center group"
                >
                    <span className="text-gold-400 font-poppins font-black text-[9px] md:text-[10px] uppercase tracking-[0.3em] mb-1 drop-shadow-md">
                        {item.label}
                    </span>
                    <div className="flex items-baseline gap-1.5 px-4 py-2 bg-white/10 backdrop-blur-[2px] rounded-xl border border-white/20 shadow-luxury-soft transition-all group-hover:bg-white/20">
                        <span className="text-slate-900/60 font-playfair font-black text-sm md:text-base">{item.symbol}</span>
                        <span className="text-slate-900 font-playfair font-black text-2xl md:text-4xl tracking-tighter whitespace-nowrap">
                            {fmt(item.value)}
                        </span>
                    </div>
                </motion.div>
            ))}
        </div>
    );
};

export default SpotBar;

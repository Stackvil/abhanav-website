import React from 'react';
import { useRates } from '../context/RateContext';
import { motion } from 'framer-motion';

const SpotBar = () => {
    const { rates, getPriceClass } = useRates();

    const fmt = (val) => {
        if (typeof val !== 'number') return '-';
        return val.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    };

    const gold = rates.spot?.[0] || { bid: '-', ask: '-', name: 'GOLD' };
    const silver = rates.spot?.[1] || { bid: '-', ask: '-', name: 'SILVER' };
    const inr = rates.spot?.[2] || { bid: '-', ask: '-', name: 'USD/INR' };

    const items = [
        { label: 'USD-INR (₹)', value: fmt(inr.ask), h: fmt(inr.high), l: fmt(inr.low), symbol: '₹', id: inr.id },
        { label: 'GOLD ($)', value: fmt(gold.ask), h: fmt(gold.high), l: fmt(gold.low), symbol: '$', id: gold.id },
        { label: 'SILVER ($)', value: fmt(silver.ask), h: fmt(silver.high), l: fmt(silver.low), symbol: '$', id: silver.id }
    ];

    if (!rates) return null;

    return (
        <div className="flex flex-wrap md:flex-nowrap items-center justify-end gap-1 md:gap-1 px-1 md:px-4 md:pr-14 py-0.5 md:py-1">
            {/* Mobile Layout: USD-INR centered above Gold & Silver cluster */}
            <div className="flex flex-col items-center md:flex-row md:items-center gap-2 md:gap-3">
                {/* Top Row: USD-INR */}
                <div className="md:w-auto">
                    {(() => {
                        const item = items[0];
                        const pClass = getPriceClass('spot', item.id, 'ask');
                        const bColor = pClass === 'price-up' ? '#00c853' : pClass === 'price-down' ? '#ff1744' : '#f8fafc';
                        
                        return (
                            <div className="flex flex-col items-center">
                                <span className="text-[7px] md:text-[11px] font-bold text-slate-800 uppercase tracking-tight font-poppins mb-1">{item.label}</span>
                                <div
                                    style={{ backgroundColor: bColor }}
                                    className="border-2 border-slate-200 rounded-lg md:rounded-xl px-2 md:px-3 py-1 md:py-1.5 flex flex-col items-center min-w-[75px] md:min-w-[120px] shadow-lg group relative overflow-hidden"
                                >
                                    <div className="flex items-center gap-0.5 md:gap-1">
                                        <span style={{ fontFamily: 'Inter, system-ui, sans-serif' }} className="text-[8px] md:text-sm font-bold text-black/60">₹</span>
                                        <span className="text-[10px] md:text-xl font-black font-poppins text-black">{item.value}</span>
                                    </div>
                                    <div className="flex items-center gap-0.5 md:gap-2 text-[6px] md:text-[9px] font-bold text-black/50 font-mono whitespace-nowrap">
                                        <span>H : {item.h}</span><span className="opacity-30">|</span><span>L : {item.l}</span>
                                    </div>
                                    {(pClass === 'price-up' || pClass === 'price-down') && <div className="absolute top-0 right-0 w-1 md:w-2 h-full bg-white opacity-20" />}
                                </div>
                            </div>
                        );
                    })()}
                </div>

                {/* Bottom Row: Gold & Silver */}
                <div className="flex gap-2 md:gap-3">
                    {[items[1], items[2]].map((item, idx) => {
                        const pClass = getPriceClass('spot', item.id, 'ask');
                        const bColor = pClass === 'price-up' ? '#00c853' : pClass === 'price-down' ? '#ff1744' : item.label.includes('GOLD') ? '#FFD700' : '#E5E5E5';

                        return (
                            <div key={idx} className="flex flex-col items-center">
                                <span className="text-[7px] md:text-[11px] font-bold text-slate-800 uppercase tracking-tight font-poppins mb-1">{item.label}</span>
                                <div
                                    style={{ backgroundColor: bColor }}
                                    className="border-2 border-slate-200 rounded-lg md:rounded-xl px-2 md:px-4 py-1 md:py-1.5 flex flex-col items-center min-w-[90px] md:min-w-[140px] shadow-lg group relative overflow-hidden"
                                >
                                    <div className="flex items-center gap-0.5 md:gap-1">
                                        <span className="text-[8px] md:text-sm font-bold text-black/60">{item.symbol}</span>
                                        <span className="text-[10px] md:text-xl font-black font-poppins text-black">{item.value}</span>
                                    </div>
                                    <div className="flex items-center gap-0.5 md:gap-2 text-[6px] md:text-[9px] font-bold text-black/50 font-mono whitespace-nowrap">
                                        <span>H : {item.h}</span><span className="opacity-30">|</span><span>L : {item.l}</span>
                                    </div>
                                    {(pClass === 'price-up' || pClass === 'price-down') && <div className="absolute top-0 right-0 w-1 md:w-2 h-full bg-white opacity-20" />}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default SpotBar;

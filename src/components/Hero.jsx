import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, TrendingUp, TrendingDown, Minus, Volume2, VolumeX, Music } from 'lucide-react';
import { useRates } from '../context/RateContext';
import SpotBar from './SpotBar';

import Ticker from './Ticker';

const Hero = () => {
    const { rates, rawRates, loading, error, getPriceClass, isMusicEnabled, toggleMusic, adj } = useRates();

    const fmt = (val) => {
        if (typeof val !== 'number') return '-';
        return val.toLocaleString('en-IN', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
    };

    const Heading = ({ text }) => (
        <div className="flex justify-center mb-0 md:mb-0.5">
            <h2 className="text-xl md:text-[26px] font-playfair font-black text-magenta-700 uppercase tracking-[0.2em] border-b-2 border-magenta-100 pb-1 text-center">
                {text}
            </h2>
        </div>
    );

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="w-full inventory-section min-h-[50vh] relative overflow-hidden pt-2 md:pt-0"
        >

            {/* Ambient Background Accents */}
            <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none"
                style={{ background: 'radial-gradient(circle at 10% 20%, #fff, transparent 80%)' }} />

            {/* Table 1: Live Rates */}
            <section className="max-w-xl mx-auto px-4 md:px-6 w-full mt-2 md:mt-0 relative z-10 mb-2">
                <Heading text="LIVE SPOT RATES" />
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, ease: "easeOut" }}
                    className="flex flex-col gap-1 md:gap-2"
                >
                    <div className="flex flex-col gap-0 md:gap-0.5">
                        {/* Header Row Table 1 */}
                        <div className="px-3 md:px-5 py-1">
                            <div className="grid grid-cols-[1fr_1.5fr_60px] md:grid-cols-[1fr_1.5fr_80px] gap-2 md:gap-4 items-center w-full">
                                <div className="flex justify-start pl-1">
                                    <span className="inline-flex items-center justify-center px-4 py-1.5 rounded-xl bg-transparent border-2 border-slate-900/20 text-slate-900 font-playfair font-black text-[10px] md:text-sm tracking-[0.1em] shadow-sm backdrop-blur-sm">PRODUCTS</span>
                                </div>
                                <div className="flex justify-start pl-9 md:pl-14">
                                    <span className="inline-flex items-center justify-center px-4 py-1.5 rounded-xl bg-transparent border-2 border-slate-900/20 text-slate-900 font-playfair font-black text-[10px] md:text-sm tracking-[0.1em] shadow-sm backdrop-blur-sm">LIVE</span>
                                </div>
                                <div className="flex justify-center">
                                    <span className="inline-flex items-center justify-center px-4 py-1.5 rounded-xl bg-transparent border-2 border-slate-900/20 text-slate-900 font-playfair font-black text-[10px] md:text-sm tracking-[0.1em] shadow-sm backdrop-blur-sm">STATUS</span>
                                </div>
                            </div>
                        </div>

                                        {rawRates.rtgs.filter(item => !(item.name.toLowerCase().includes('silver') && item.name.toLowerCase().includes('10 kg'))).map((item, idx) => {
                            const pClass = getPriceClass('rtgs', item.id, 'sell');
                            const bColor = pClass === 'price-up' ? '#00c853' : pClass === 'price-down' ? '#ff1744' : pClass === 'gold-default' ? '#FFD700' : pClass === 'silver-default' ? '#CFE9E1' : '#0f172a';
                            const effectiveStock = adj.stockOverrides?.[item.id] !== undefined ? adj.stockOverrides[item.id] : item.stock;

                            return (
                                <motion.div
                                    key={`live-${idx}`}
                                    initial={{ opacity: 0, x: -30 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.12 }}
                                    className="bg-white/10 backdrop-blur-sm rounded-[16px] py-2 px-3 md:bg-transparent md:backdrop-blur-none md:rounded-none md:py-2 md:px-0 md:shadow-none md:border-none relative group"
                                >
                                    <div className="grid grid-cols-[1fr_1.5fr_60px] md:grid-cols-[1fr_1.5fr_80px] gap-2 md:gap-4 items-center w-full relative">
                                        <div className="flex flex-col justify-center min-w-0 pr-1 pl-4 md:pl-10">
                                            <span className="text-[12px] md:text-lg font-black text-slate-900 font-poppins uppercase tracking-tight leading-tight group-hover:text-magenta-700 transition-colors duration-300">
                                                {item.name.split('(')[0]}
                                            </span>
                                            <span className="text-[9px] md:text-[11px] font-bold text-slate-500 font-poppins uppercase tracking-wider mt-0.5">
                                                {item.name.toLowerCase().includes('gold') ? '10 Grams' : '30 Kg'}
                                            </span>
                                        </div>

                                        <div className="flex justify-start w-full md:pl-0">
                                            <motion.div
                                                style={{ backgroundColor: bColor, borderColor: '#000000', borderWidth: window.innerWidth >= 768 ? '4px' : '3px' }}
                                                className="w-full transition-all duration-300 max-w-[140px] md:max-w-[200px] py-2 md:py-1.5 px-2 md:px-4 rounded-[14px] md:rounded-[18px] flex items-center justify-center shadow-md"
                                            >
                                                <span
                                                    className={`font-black font-poppins text-center tracking-tighter md:tracking-normal text-[14px] md:text-[22px] leading-none ${bColor === '#FFD700' || bColor === '#CFE9E1' || bColor === '#E5E5E5' ? 'text-slate-900' : 'text-white'}`}
                                                >
                                                    {item.sell !== '-' ? <><span style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>₹</span>{fmt(item.sell)}</> : '—'}
                                                </span>
                                            </motion.div>
                                        </div>

                                        <div className="flex justify-center w-full">
                                            <div className={`flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full transition-all duration-300 shadow-sm ${effectiveStock ? 'bg-[#e6f9ec] text-[#1c7c3c] border border-[#1c7c3c]/20' : 'bg-red-50 text-red-600 border border-red-200'}`}>
                                                {effectiveStock ? <Check size={18} strokeWidth={3} /> : <Minus size={18} strokeWidth={3} />}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </motion.div>
            </section>

            {/* Table 2: Market Rates (BUY/SELL/HIGH/LOW) */}
            <section className="max-w-4xl mx-auto px-2 md:px-6 w-full relative z-10 mb-0 md:mb-0">
                <Heading text="GOLD AND SILVER RETAIL RATES" />

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-6xl mx-auto w-full"
                >
                    {/* Header Row - Button Labels Style */}
                    <div className="hidden md:grid grid-cols-[2fr_1.2fr_1.2fr_1fr] gap-4 mb-4 items-center px-4">
                        <div className="flex justify-start">
                            <span className="bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-full shadow-sm">Products</span>
                        </div>
                        <div className="flex justify-center">
                            <span className="bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-full shadow-sm w-full text-center">Buy</span>
                        </div>
                        <div className="flex justify-center">
                            <span className="bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-full shadow-sm w-full text-center">Sell</span>
                        </div>
                        <div className="flex justify-center">
                            <span className="bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-full shadow-sm w-full text-center">High/Low</span>
                        </div>
                    </div>

                    <div className="flex flex-col gap-1 px-2 md:px-0">
                        {(() => {
                            const rtgsItems = rates.rtgs.map(r => {
                                if (r.id === '2987' || r.name.toLowerCase().includes('10 kg')) {
                                    return {
                                        ...r,
                                        name: 'Silver 999 (5 Kgs)',
                                        buy: typeof r.buy === 'number' ? r.buy / 2 : r.buy,
                                        sell: typeof r.sell === 'number' ? r.sell / 2 : r.sell,
                                        high: typeof r.high === 'number' ? r.high / 2 : r.high,
                                        low: typeof r.low === 'number' ? r.low / 2 : r.low,
                                    };
                                }
                                return r;
                            });
                            
                            return rtgsItems.map((item, idx) => {
                                const getWeightSubtext = () => {
                                    const match = item.name.match(/\(([^)]+)\)/);
                                    if (match) return match[1];
                                    const isGold = item.name.toLowerCase().includes('gold') || item.id === '945';
                                    return isGold ? '10 Grams' : '1 Kg';
                                };

                                return (
                                    <motion.div
                                        key={`market-${item.id}-${idx}`}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.05 }}
                                        className="bg-white border-[1.5px] border-slate-200 rounded-[12px] md:rounded-[14px] p-1.5 md:p-2 shadow-sm hover:border-magenta-500/30 hover:shadow-md transition-all duration-300"
                                    >
                                        <div className="grid grid-cols-1 md:grid-cols-[2fr_1.2fr_1.2fr_1fr] items-center gap-3 md:gap-4 font-poppins">
                                            
                                            {/* Product */}
                                            <div className="flex flex-col min-w-[120px] px-2">
                                                <span className="text-[14px] md:text-[18px] font-black text-slate-900 leading-tight uppercase">
                                                    {item.name.split('(')[0]}
                                                </span>
                                                <span className="text-[10px] md:text-[12px] font-bold text-slate-500 uppercase tracking-widest mt-0.5">
                                                    {getWeightSubtext()}
                                                </span>
                                            </div>

                                            {/* BUY */}
                                            <div className="flex items-center gap-2">
                                                <span className="md:hidden text-[9px] font-black text-slate-400 uppercase w-10">BUY</span>
                                                {(() => {
                                                    const pClass = getPriceClass('rtgs', item.id, 'buy');
                                                    const bColor = pClass === 'price-up' ? '#00c853' : pClass === 'price-down' ? '#ff1744' : '#FFD700';
                                                    return (
                                                        <motion.div 
                                                            animate={{ backgroundColor: bColor }}
                                                            transition={{ duration: 0.3 }}
                                                            className="flex-1 border-2 border-slate-900 rounded-[10px] md:rounded-[12px] py-1.5 md:py-2.5 px-3 flex items-center justify-center shadow-[3px_3px_0px_#000000]"
                                                        >
                                                            <span className={`text-[16px] md:text-[22px] font-black ${pClass === 'price-up' || pClass === 'price-down' ? 'text-white' : 'text-slate-900'}`}>
                                                                {item.buy !== '-' ? <>₹{fmt(item.buy)}</> : '—'}
                                                            </span>
                                                        </motion.div>
                                                    );
                                                })()}
                                            </div>

                                            {/* SELL */}
                                            <div className="flex items-center gap-2">
                                                <span className="md:hidden text-[9px] font-black text-slate-400 uppercase w-10">SELL</span>
                                                {(() => {
                                                    const pClass = getPriceClass('rtgs', item.id, 'sell');
                                                    const bColor = pClass === 'price-up' ? '#00c853' : pClass === 'price-down' ? '#ff1744' : '#FFD700';
                                                    return (
                                                        <motion.div 
                                                            animate={{ backgroundColor: bColor }}
                                                            transition={{ duration: 0.3 }}
                                                            className="flex-1 border-2 border-slate-900 rounded-[10px] md:rounded-[12px] py-1.5 md:py-2.5 px-3 flex items-center justify-center shadow-[3px_3px_0px_#000000]"
                                                        >
                                                            <span className={`text-[16px] md:text-[22px] font-black ${pClass === 'price-up' || pClass === 'price-down' ? 'text-white' : 'text-slate-900'}`}>
                                                                {item.sell !== '-' ? <>₹{fmt(item.sell)}</> : '—'}
                                                            </span>
                                                        </motion.div>
                                                    );
                                                })()}
                                            </div>

                                            {/* High/Low */}
                                            <div className="flex flex-row md:flex-col gap-2 px-1">
                                                <div className="flex-1 bg-[#00c853] rounded-[8px] py-1 md:py-1 px-3 flex flex-col md:flex-row items-center justify-center md:justify-between gap-1 shadow-sm">
                                                    <span className="text-[7px] md:text-[9px] font-black text-white uppercase opacity-70">HI</span>
                                                    <span className="text-[10px] md:text-[13px] font-black text-white">
                                                        {item.high !== '-' ? <><span className="hidden md:inline">₹</span>{fmt(item.high)}</> : '—'}
                                                    </span>
                                                </div>
                                                <div className="flex-1 bg-[#ff1744] rounded-[8px] py-1 md:py-1 px-3 flex flex-col md:flex-row items-center justify-center md:justify-between gap-1 shadow-sm">
                                                    <span className="text-[7px] md:text-[9px] font-black text-white uppercase opacity-70">LO</span>
                                                    <span className="text-[10px] md:text-[13px] font-black text-white">
                                                        {item.low !== '-' ? <><span className="hidden md:inline">₹</span>{fmt(item.low)}</> : '—'}
                                                    </span>
                                                </div>
                                            </div>

                                        </div>
                                    </motion.div>
                                );
                            });
                        })()}
                    </div>
                </motion.div>
            </section>

            {/* Ticker below Table 2 */}
            <div className="w-full relative z-20 py-0 my-0">
                <Ticker />
            </div>

            {/* Music Toggle - Mobile Only (below tables) */}
            <div className="flex md:hidden justify-center pb-4 -mt-4">
                <button
                    onClick={toggleMusic}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-full shadow-lg transition-all border-2 font-poppins font-bold text-xs uppercase tracking-widest ${isMusicEnabled ? 'bg-magenta-600 border-magenta-400 text-white animate-pulse' : 'bg-white/80 border-slate-200 text-slate-700'} hover:scale-105`}
                    title={isMusicEnabled ? 'Turn Off Music' : 'Turn On Music'}
                >
                    <Music size={16} />
                    {isMusicEnabled ? 'Music On' : 'Music Off'}
                </button>
            </div>

            {/* Decorative Side Image - Desktop Only - Right side */}
            <motion.img
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.2, ease: "easeOut", delay: 0.5 }}
                src="/ChatGPT Image Mar 17, 2026, 10_58_54 AM.png"
                alt="Decorative Right"
                className="hidden xl:block absolute right-[1%] top-[25%] -translate-y-1/2 w-[22%] max-w-[400px] object-contain opacity-95 pointer-events-none z-0"
            />

            {/* Decorative Side Image - Desktop Only - Left side (Mirror) */}
            <motion.img
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.2, ease: "easeOut", delay: 0.5 }}
                src="/Untitled design (38).png"
                alt="Decorative Left"
                className="hidden xl:block absolute left-[1%] top-[28%] -translate-y-1/2 w-[22%] max-w-[400px] object-contain opacity-95 pointer-events-none z-0"
            />

        </motion.div>
    );
};

export default Hero;

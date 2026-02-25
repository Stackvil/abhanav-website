import React from 'react';
import { motion } from 'framer-motion';
import { useRates } from '../context/RateContext';
import SpotRatesCard from './SpotRatesCard';
import SpotBar from './SpotBar';

const Hero = () => {
    const { rates } = useRates();

    const fmt = (val) => {
        if (typeof val !== 'number') return '-';
        return val.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    };

    return (
        <div className="w-full inventory-section">
            {/* Full Header Image Section - Edge to Edge */}
            <section className="relative w-full overflow-hidden">
                <motion.img
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    src="/Your paragraph text.png"
                    alt="Abhinav Gold & Silver Header"
                    className="w-full h-auto block"
                />

                {/* Overlaid Spot Rates Bar - Positioned under branding text */}
                <div className="absolute top-[65%] md:top-[60%] left-0 w-full z-20">
                    <SpotBar />
                </div>
            </section>

            {/* Rates Table Section - Restored for detailed data */}
            <section className="max-w-7xl mx-auto px-6 w-full -mt-24 md:-mt-40 relative z-10 mb-0 pb-0">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 1 }}
                    className="flex flex-col gap-12"
                >
                    <div className="grid lg:grid-cols-2 gap-10">
                        {/* Detailed Spot Rates */}
                        <div className="flex flex-col gap-6">
                            <div className="flex items-center gap-4">
                                <div className="p-2 bg-magenta-50 rounded-lg">
                                    <div className="w-2 h-2 rounded-full bg-magenta-600 animate-pulse"></div>
                                </div>
                                <h3 className="text-lg font-poppins font-black text-slate-800 uppercase tracking-widest">Market Bid/Ask</h3>
                            </div>
                            <SpotRatesCard />
                        </div>

                        {/* Physical Inventory Column */}
                        <div className="flex flex-col gap-6">
                            <div className="flex items-center gap-4">
                                <div className="p-2 bg-gold-50 rounded-lg">
                                    <div className="w-2 h-2 rounded-full bg-gold-600"></div>
                                </div>
                                <h3 className="text-lg font-poppins font-black text-slate-800 uppercase tracking-widest">Physical Inventory (RTGS)</h3>
                            </div>
                            <div className="glass rounded-2xl overflow-hidden shadow-luxury border-white/40">
                                <div className="gradient-luxury p-3">
                                    <span className="text-white font-poppins font-bold text-xs uppercase tracking-widest">Inventory Rates</span>
                                </div>
                                <div className="p-4">
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="border-b border-slate-200">
                                                <th className="py-2 text-[11px] font-extrabold text-magenta-700 uppercase tracking-widest text-left">Item Name</th>
                                                <th className="py-2 text-[11px] font-extrabold text-magenta-700 uppercase tracking-widest text-center">Buy (INR)</th>
                                                <th className="py-2 text-[11px] font-extrabold text-magenta-700 uppercase tracking-widest text-center">Sell (INR)</th>
                                                <th className="py-2 text-[11px] font-extrabold text-magenta-700 uppercase tracking-widest text-right">Stock</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100">
                                            {rates.rtgs.map((item, idx) => (
                                                <tr key={idx} className="hover:bg-magenta-50/50 transition-colors group">
                                                    <td className="py-3 text-[13px] font-bold text-slate-800 font-poppins">{item.name}</td>
                                                    <td className="py-3 text-[13px] font-black text-slate-600 text-center font-poppins">₹{fmt(item.buy)}</td>
                                                    <td className="py-3 text-[13px] font-black text-magenta-600 text-center font-poppins group-hover:text-gold-500 transition-colors">₹{fmt(item.sell)}</td>
                                                    <td className="py-3 text-right">
                                                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase ${item.stock ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                                            {item.stock ? 'In Stock' : 'Out'}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </section>
        </div>
    );
};

export default Hero;

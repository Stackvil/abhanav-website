import React from 'react';
import { motion } from 'framer-motion';
import { useRates } from '../context/RateContext';

const SpotRatesCard = () => {
    const { rates } = useRates();

    const fmt = (val) => {
        if (typeof val !== 'number') return '-';
        return val.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="w-full max-w-xl glass rounded-2xl overflow-hidden shadow-luxury border-white/40"
        >
            <div className="gradient-luxury p-3 flex justify-between items-center">
                <span className="text-white font-poppins font-bold text-xs uppercase tracking-widest">Live Spot Market</span>
                <div className="flex gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-400"></span>
                    <span className="w-2 h-2 rounded-full bg-yellow-400"></span>
                    <span className="w-2 h-2 rounded-full bg-red-400"></span>
                </div>
            </div>

            <div className="p-4">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-slate-200">
                            <th className="py-2 text-[9px] font-extrabold text-magenta-700 uppercase tracking-widest">Product</th>
                            <th className="py-2 text-[9px] font-extrabold text-magenta-700 uppercase tracking-widest text-center">Bid</th>
                            <th className="py-2 text-[9px] font-extrabold text-magenta-700 uppercase tracking-widest text-center">Ask</th>
                            <th className="py-2 text-[9px] font-extrabold text-magenta-700 uppercase tracking-widest text-center">High</th>
                            <th className="py-2 text-[9px] font-extrabold text-magenta-700 uppercase tracking-widest text-right">Low</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {rates.spot.map((rate, idx) => {
                            const isUsd = rate.name.includes('($)');
                            const isInr = rate.name.includes('(₹)');
                            const symbol = isUsd ? '$' : (isInr ? '₹' : '');

                            return (
                                <tr key={idx} className="hover:bg-magenta-50/50 transition-colors group">
                                    <td className="py-3 text-[11px] font-bold text-slate-800 font-poppins">{rate.name}</td>
                                    <td className="py-3 text-[11px] font-black text-slate-600 text-center font-poppins">{symbol}{fmt(rate.bid)}</td>
                                    <td className="py-3 text-[11px] font-black text-magenta-600 text-center font-poppins group-hover:text-gold-500 transition-colors">{symbol}{fmt(rate.ask)}</td>
                                    <td className="py-3 text-[11px] font-bold text-slate-500 text-center font-poppins">{symbol}{fmt(rate.high)}</td>
                                    <td className="py-3 text-[11px] font-bold text-slate-500 text-right font-poppins">{symbol}{fmt(rate.low)}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </motion.div>
    );
};

export default SpotRatesCard;

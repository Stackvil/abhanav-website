import React from 'react';
import { useRates } from '../context/RateContext';
import { motion } from 'framer-motion';

const RatesPage = () => {
    const { rates } = useRates();

    const fmt = (val) => {
        if (typeof val !== 'number') return '-';
        return val.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="pb-32 px-6 pt-10 max-w-7xl mx-auto"
        >
            <h1 className="text-5xl font-playfair font-black text-magenta-700 mb-10 text-center uppercase tracking-tighter">Live Market Rates</h1>

            <div className="grid lg:grid-cols-2 gap-12">
                {/* Spot Rates Table */}
                <div className="flex flex-col gap-6">
                    <div className="gradient-luxury p-4 rounded-t-2xl shadow-lg">
                        <h2 className="text-white font-poppins font-bold text-lg uppercase tracking-widest">Global Spot Market</h2>
                    </div>
                    <div className="glass rounded-b-2xl overflow-hidden shadow-luxury">
                        <table className="w-full text-left">
                            <thead className="bg-slate-50 border-b border-slate-200">
                                <tr>
                                    <th className="px-6 py-4 text-[12px] font-black text-magenta-700 uppercase tracking-widest">Product</th>
                                    <th className="px-6 py-4 text-[12px] font-black text-magenta-700 uppercase tracking-widest text-center">Bid</th>
                                    <th className="px-6 py-4 text-[12px] font-black text-magenta-700 uppercase tracking-widest text-center">Ask</th>
                                    <th className="px-6 py-4 text-[12px] font-black text-magenta-700 uppercase tracking-widest text-center">High</th>
                                    <th className="px-6 py-4 text-[12px] font-black text-magenta-700 uppercase tracking-widest text-right">Low</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {rates.spot.map((item, idx) => {
                                    const isUsd = item.name.includes('($)');
                                    const isInr = item.name.includes('(₹)');
                                    const symbol = isUsd ? '$' : (isInr ? '₹' : '');
                                    return (
                                        <tr key={idx} className="hover:bg-magenta-50/50 transition-colors group">
                                            <td className="px-6 py-4 text-sm font-bold text-slate-800">{item.name}</td>
                                            <td className="px-6 py-4 text-sm font-black text-slate-600 text-center">{symbol}{fmt(item.bid)}</td>
                                            <td className="px-6 py-4 text-sm font-black text-magenta-600 text-center group-hover:text-gold-500">{symbol}{fmt(item.ask)}</td>
                                            <td className="px-6 py-4 text-sm font-bold text-slate-500 text-center">{symbol}{fmt(item.high)}</td>
                                            <td className="px-6 py-4 text-sm font-bold text-slate-500 text-right">{symbol}{fmt(item.low)}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Product Rates Table */}
                <div className="flex flex-col gap-6">
                    <div className="gradient-luxury p-4 rounded-t-2xl shadow-lg">
                        <h2 className="text-white font-poppins font-bold text-lg uppercase tracking-widest">Physical Inventory</h2>
                    </div>
                    <div className="glass rounded-b-2xl overflow-hidden shadow-luxury">
                        <table className="w-full text-left">
                            <thead className="bg-slate-50 border-b border-slate-200">
                                <tr>
                                    <th className="px-6 py-4 text-[12px] font-black text-magenta-700 uppercase tracking-widest">Item Name</th>
                                    <th className="px-6 py-4 text-[12px] font-black text-magenta-700 uppercase tracking-widest text-center">Buy (INR)</th>
                                    <th className="px-6 py-4 text-[12px] font-black text-magenta-700 uppercase tracking-widest text-center">Sell (INR)</th>
                                    <th className="px-6 py-4 text-[12px] font-black text-magenta-700 uppercase tracking-widest text-right">Stock</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {rates.rtgs.map((item, idx) => (
                                    <tr key={idx} className="hover:bg-magenta-50/50 transition-colors group">
                                        <td className="px-6 py-4 text-sm font-bold text-slate-800">{item.name}</td>
                                        <td className="px-6 py-4 text-sm font-black text-slate-600 text-center">₹{fmt(item.buy)}</td>
                                        <td className="px-6 py-4 text-sm font-black text-magenta-600 text-center group-hover:text-gold-500">₹{fmt(item.sell)}</td>
                                        <td className="px-6 py-4 text-right">
                                            <span className={`px-3 py-1 rounded-full text-[12px] font-black uppercase ${item.stock ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                                {item.stock ? 'In Stock' : 'Out of Stock'}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default RatesPage;

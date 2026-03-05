import React from 'react';
import { useRates } from '../context/RateContext';
import { motion } from 'framer-motion';

const RatesPage = () => {
    const { rates, rawRates, loading, error, adj, showModified, getPriceClass } = useRates();

    const fmt = (val) => {
        if (typeof val !== 'number') return '-';
        return val.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    };

    // All items in purities are gold — default to gold color when stable
    const getKaratClass = (key, field) => {
        const cls = getPriceClass('purities', key, field);
        if (cls === 'price-up' || cls === 'price-down') return cls;
        return 'gold-default';
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="pb-32 px-6 pt-4 max-w-7xl mx-auto"
        >
            <h1 className="text-3xl md:text-5xl font-poppins font-black text-white mb-10 text-center uppercase tracking-tighter drop-shadow-luxury px-4">Live Retail Market Rates</h1>

            {(loading && !rates.rtgs.some(r => r.sell !== '-')) && (
                <div className="flex justify-center mb-8 animate-pulse text-gold-400 font-bold uppercase tracking-widest text-xs">
                    Connecting to live market...
                </div>
            )}

            {error && (
                <div className="max-w-md mx-auto mb-8 bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl text-center text-xs font-bold uppercase tracking-wider">
                    {error}
                </div>
            )}

            <div className="max-w-4xl mx-auto flex flex-col gap-16">
                {/* Retail Gold Rates Table */}
                <div className="flex flex-col gap-6">
                    <div className="gradient-luxury p-4 rounded-t-2xl shadow-lg flex justify-between items-center">
                        <h2 className="text-white font-poppins font-bold text-lg uppercase tracking-widest">Retail Gold Rates (10g)</h2>
                        <span className="text-white/40 text-[10px] font-black uppercase tracking-widest bg-white/5 px-3 py-1 rounded-full">RTGS / 999 Base</span>
                    </div>
                    <div className="glass rounded-b-2xl overflow-x-auto shadow-luxury">
                        <table className="w-full text-left min-w-[560px]">
                            <thead className="bg-white/10 border-b border-white/10">
                                <tr>
                                    <th className="px-2 py-4 md:px-4 md:py-5 text-[9px] md:text-[12px] font-black text-white/80 uppercase tracking-widest whitespace-nowrap">Purity</th>
                                    <th className="px-2 py-4 md:px-4 md:py-5 text-[9px] md:text-[12px] font-black text-white/80 uppercase tracking-widest text-center whitespace-nowrap">Sell</th>
                                    <th className="px-2 py-4 md:px-4 md:py-5 text-[9px] md:text-[12px] font-black text-red-400/80 uppercase tracking-widest text-center whitespace-nowrap">Low</th>
                                    <th className="px-2 py-4 md:px-4 md:py-5 text-[9px] md:text-[12px] font-black text-green-400/80 uppercase tracking-widest text-right whitespace-nowrap">High</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {rates.purities.map((karat, idx) => {
                                    const sellNum = karat.sell;
                                    const buyNum = karat.buy;
                                    const baseLow = karat.low;
                                    const baseHigh = karat.high;

                                    const sellVal = sellNum !== '-' && sellNum !== undefined ? fmt(sellNum) : '-';
                                    const buyVal = buyNum !== '-' && buyNum !== undefined ? fmt(buyNum) : '-';
                                    const lowVal = baseLow !== '-' && baseLow !== undefined ? fmt(baseLow) : '-';
                                    const highVal = baseHigh !== '-' && baseHigh !== undefined ? fmt(baseHigh) : '-';

                                    return (
                                        <tr key={idx} className="hover:bg-white/5 transition-colors group">
                                            <td className="px-2 py-4 md:px-4 md:py-6 text-[11px] md:text-lg font-bold text-white whitespace-nowrap">{karat.name}</td>
                                            <td className="px-2 py-4 md:px-4 md:py-6 text-center font-poppins whitespace-nowrap">
                                                <motion.span
                                                    key={sellVal}
                                                    initial={{ scale: 1 }}
                                                    animate={{ scale: [1, 1.05, 1] }}
                                                    className={`text-[10px] md:text-xl font-black transition-colors duration-300 ${getKaratClass(karat.key, 'sell')}`}
                                                >
                                                    {sellVal !== '-' ? `₹${sellVal}` : '-'}
                                                </motion.span>
                                            </td>
                                            <td className="px-2 py-4 md:px-4 md:py-6 text-[10px] md:text-xl font-black text-red-400 text-center font-poppins whitespace-nowrap">
                                                {lowVal !== '-' ? `₹${lowVal}` : '-'}
                                            </td>
                                            <td className="px-2 py-4 md:px-4 md:py-6 text-[10px] md:text-xl font-black text-green-400 text-right font-poppins whitespace-nowrap">
                                                {highVal !== '-' ? `₹${highVal}` : '-'}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* QR Codes Section */}
                <div className="flex flex-row gap-4 justify-center items-center">
                    {/* Location QR */}
                    <div className="flex flex-col items-center gap-3 glass rounded-2xl p-6 flex-1 max-w-[240px]">
                        <img
                            src="/qr-code (1).png"
                            alt="Scan for Location"
                            className="w-40 h-40 object-contain rounded-xl"
                        />
                        <div className="text-center">
                            <p className="text-white font-poppins font-black text-sm uppercase tracking-widest">📍 Location</p>
                            <p className="text-white/50 font-poppins text-[10px] mt-1">Scan to find us</p>
                        </div>
                    </div>

                    {/* Bank Details QR */}
                    <div className="flex flex-col items-center gap-3 glass rounded-2xl p-6 flex-1 max-w-[240px]">
                        <img
                            src="/qr-code.png"
                            alt="Scan for Bank Details"
                            className="w-40 h-40 object-contain rounded-xl"
                        />
                        <div className="text-center">
                            <p className="text-white font-poppins font-black text-sm uppercase tracking-widest">🏦 Bank Details</p>
                            <p className="text-white/50 font-poppins text-[10px] mt-1">Scan to pay us</p>
                        </div>
                    </div>
                </div>

                {/* Market Information */}
                <div className="mt-4 flex flex-col gap-6 opacity-60">
                    <div className="flex items-center gap-4 px-4">
                        <div className="h-px flex-1 bg-white/10"></div>
                        <span className="text-white/40 font-poppins font-bold text-[10px] uppercase tracking-widest">Market Information</span>
                        <div className="h-px flex-1 bg-white/10"></div>
                    </div>
                    <p className="text-center text-white/40 font-poppins text-xs px-10">
                        Retail prices are indicative and subject to change based on local market conditions and taxes.
                    </p>
                </div>
            </div>
        </motion.div>
    );
};

export default RatesPage;

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
        { label: 'GOLD', value: fmt(gold.ask), symbol: '$', trend: gold.trend, key: { section: 'spot', id: gold.id, field: 'ask' } },
        { label: 'SILVER', value: fmt(silver.ask), symbol: '$', trend: silver.trend, key: { section: 'spot', id: silver.id, field: 'ask' } },
        { label: 'USD/INR', value: fmt(inr.ask), symbol: '₹', trend: inr.trend, key: { section: 'spot', id: inr.id, field: 'ask' } }
    ];

    if (!rates) return null;

    return (
        <div className="flex items-center justify-end gap-2 md:gap-8 px-0 md:px-2 py-1 md:py-3">
            {items.map((item, index) => (
                <motion.div
                    key={index}
                    whileHover={{ y: -4, scale: 1.02 }}
                    className="flex flex-col items-center gap-1 md:gap-1.5 flex-1 max-w-[95px] md:max-w-[150px]"
                >
                    {/* Label */}
                    <span className="text-[7px] md:text-[10px] font-extrabold text-slate-500 uppercase tracking-widest md:tracking-[0.3em] font-poppins opacity-80 text-center">
                        {item.label}
                    </span>

                    {/* Value Box */}
                    {(() => {
                        const pClass = getPriceClass(item.key.section, item.key.id, item.key.field);
                        const bColor = pClass === 'price-up' ? '#00c853' : pClass === 'price-down' ? '#ff1744' : pClass === 'gold-default' ? '#FFD700' : pClass === 'silver-default' ? '#E5E5E5' : '#0f172a';

                        return (
                            <motion.div
                                animate={{
                                    scale: pClass === 'price-up' || pClass === 'price-down' ? 1.04 : 1
                                }}
                                style={{ borderColor: bColor }}
                                className="bg-black/30 border-[1.5px] md:border-[2px] rounded-[6px] md:rounded-[16px] px-2 md:px-4 py-1 md:py-2 flex items-center w-full justify-center group hover:bg-black/40 shadow-premium transition-colors duration-200"
                            >
                                <span className="text-slate-800 text-[9px] md:text-lg font-bold mr-1 md:mr-2.5 group-hover:text-black transition-colors">
                                    {item.symbol}
                                </span>
                                <motion.span
                                    key={`val-${item.value}-${item.key.section}-${item.key.id}`}
                                    animate={{ scale: [1, 1.1, 1] }}
                                    className={`text-[12px] md:text-2xl font-extrabold font-poppins tracking-tighter md:tracking-tight ${pClass}`}
                                >
                                    {item.value}
                                </motion.span>
                            </motion.div>
                        );
                    })()}
                </motion.div>
            ))}
        </div>
    );
};

export default SpotBar;

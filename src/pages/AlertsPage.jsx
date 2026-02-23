import React from 'react';
import { Bell, Info, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

const AlertsPage = () => {
    const alerts = [
        { id: 1, title: 'Gold Market Update', msg: 'Market is showing significant bullish momentum today.', date: '21 Feb 2026', type: 'info' },
        { id: 2, title: 'Holiday Notice', msg: 'Office will be closed on March 5th for traditional festival.', date: '20 Feb 2026', type: 'urgent' },
        { id: 3, title: 'New Arrival', msg: 'Special edition 24K gold coins now available in stock.', date: '19 Feb 2026', type: 'info' },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="pb-32 px-6 pt-10 max-w-4xl mx-auto"
        >
            <div className="flex items-center gap-4 mb-10 justify-center">
                <div className="p-3 gradient-luxury rounded-2xl shadow-gold-glow">
                    <Bell className="text-gold-400" size={32} />
                </div>
                <h1 className="text-5xl font-playfair font-black text-magenta-700 uppercase tracking-tighter leading-none">Market Alerts</h1>
            </div>

            <div className="flex flex-col gap-6">
                {alerts.map((alert, idx) => (
                    <motion.div
                        key={alert.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="glass p-6 rounded-3xl shadow-luxury border-l-8 border-magenta-600 hover:scale-[1.02] transition-transform cursor-default"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex flex-col gap-1">
                                <h3 className="text-xl font-playfair font-black text-magenta-700">{alert.title}</h3>
                                <div className="flex items-center gap-2 text-slate-400">
                                    <Calendar size={14} />
                                    <span className="text-[10px] font-bold uppercase tracking-widest font-poppins">{alert.date}</span>
                                </div>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${alert.type === 'urgent' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'}`}>
                                {alert.type}
                            </span>
                        </div>
                        <p className="text-slate-600 font-poppins text-sm leading-relaxed">{alert.msg}</p>
                    </motion.div>
                ))}
            </div>

            <div className="mt-16 bg-white/40 p-10 rounded-3xl border border-white/60 text-center">
                <Info className="mx-auto text-magenta-600 mb-4" size={40} />
                <p className="text-slate-500 font-poppins text-sm">Stay tuned for real-time market updates and exclusive offers from Abhinav Gold & Silver.</p>
            </div>
        </motion.div>
    );
};

export default AlertsPage;

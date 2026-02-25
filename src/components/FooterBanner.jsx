import React from 'react';
import { motion } from 'framer-motion';

const FooterBanner = () => {
    const [tickerMsg, setTickerMsg] = React.useState(localStorage.getItem('ag_ticker') || 'Welcome to Abhinav Gold & Silver - Quality Purity Guaranteed');

    React.useEffect(() => {
        const handleStorage = () => {
            const val = localStorage.getItem('ag_ticker');
            if (val) setTickerMsg(val);
        };
        window.addEventListener('storage', handleStorage);
        const interval = setInterval(handleStorage, 5000);
        return () => {
            window.removeEventListener('storage', handleStorage);
            clearInterval(interval);
        };
    }, []);

    return (
        <section className="relative w-full overflow-hidden bg-slate-900 h-16 md:h-20 flex items-center justify-center">
            <motion.img
                initial={{ opacity: 0, scale: 1.1 }}
                whileInView={{ opacity: 0.6, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5 }}
                src="/354a5d0f-6f24-4dcf-a023-fafaeefbbaca.jpg"
                alt="Abhinav Gold & Silver Banner"
                className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Ticker Overlay */}
            <div className="absolute inset-0 flex items-center overflow-hidden">
                <div className="flex whitespace-nowrap animate-ticker-rtl-footer">
                    <div className="flex items-center gap-12 px-6">
                        {[1, 2, 3, 4].map((i) => (
                            <span key={i} className="text-white font-poppins font-normal text-lg md:text-xl uppercase tracking-widest drop-shadow-luxury flex items-center gap-6">
                                <span className="text-gold-400">✦</span> {tickerMsg}
                            </span>
                        ))}
                    </div>
                    {/* Duplicate for seamless loop */}
                    <div className="flex items-center gap-12 px-6">
                        {[1, 2, 3, 4].map((i) => (
                            <span key={i} className="text-white font-poppins font-normal text-lg md:text-xl uppercase tracking-widest drop-shadow-luxury flex items-center gap-6">
                                <span className="text-gold-400">✦</span> {tickerMsg}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes ticker-rtl-footer {
                    from { transform: translate3d(0, 0, 0); }
                    to { transform: translate3d(-50%, 0, 0); }
                }
                .animate-ticker-rtl-footer {
                    animation: ticker-rtl-footer 40s linear infinite !important;
                }
            ` }} />
        </section>
    );
};

export default FooterBanner;

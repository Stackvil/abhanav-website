import React, { useState, useEffect } from 'react';

const Ticker = () => {
    const [msg, setMsg] = useState(localStorage.getItem('ag_ticker') || 'Welcome to Abhinav Gold & Silver - Quality Purity Guaranteed');

    useEffect(() => {
        const handleStorage = () => {
            const val = localStorage.getItem('ag_ticker');
            if (val) setMsg(val);
        };
        window.addEventListener('storage', handleStorage);
        // Also check periodically in case of rapid updates
        const interval = setInterval(handleStorage, 5000);
        return () => {
            window.removeEventListener('storage', handleStorage);
            clearInterval(interval);
        };
    }, []);

    return (
        <div className="fixed bottom-0 left-0 w-full overflow-hidden gradient-luxury py-1 z-40">
            <div className="flex whitespace-nowrap animate-ticker group">
                <span className="text-white font-poppins font-black text-[10px] uppercase tracking-widest inline-flex items-center gap-4">
                    <span className="text-gold-400">📢</span> {msg}
                </span>
                <span className="w-40"></span>
                <span className="text-white font-poppins font-black text-[10px] uppercase tracking-widest inline-flex items-center gap-4">
                    <span className="text-gold-400">📢</span> {msg}
                </span>
                <span className="w-40"></span>
                <span className="text-white font-poppins font-black text-[10px] uppercase tracking-widest inline-flex items-center gap-4">
                    <span className="text-gold-400">📢</span> {msg}
                </span>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes ticker {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .animate-ticker {
                    animation: ticker 30s linear infinite;
                }
            ` }} />
        </div>
    );
};

export default Ticker;

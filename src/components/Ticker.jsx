import React, { useState, useEffect } from 'react';

const Ticker = () => {
    const [msg, setMsg] = useState(localStorage.getItem('ag_ticker') || 'Welcome to Abhinav Gold & Silver - Quality Purity Guaranteed');

    useEffect(() => {
        const handleStorage = () => {
            const val = localStorage.getItem('ag_ticker');
            if (val) setMsg(val);
        };
        window.addEventListener('storage', handleStorage);
        const interval = setInterval(handleStorage, 5000);
        return () => {
            window.removeEventListener('storage', handleStorage);
            clearInterval(interval);
        };
    }, []);

    return (
        <div
            className="fixed bottom-0 left-0 w-full overflow-hidden z-40 flex items-center shadow-[0_-8px_30px_rgba(0,0,0,0.5)] h-9 bg-[#90034a]"
            style={{
                backgroundImage: "url('/Untitled%20design%20(6).png')",
                backgroundPosition: 'center',
                backgroundRepeat: 'repeat-x',
                backgroundSize: 'auto 100%'
            }}
        >
            {/* The Text Layer - Moves Right to Left (Text enters from right, moves left) */}
            <div className="flex animate-ticker-rtl whitespace-nowrap w-max h-full items-center">
                <div className="flex items-center gap-12 px-6 shrink-0">
                    <span className="text-white font-poppins font-normal text-[10px] uppercase tracking-[0.25em] inline-flex items-center gap-4 drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
                        <span className="text-gold-400 text-lg">✦</span> {msg}
                    </span>
                    <span className="text-white font-poppins font-normal text-[10px] uppercase tracking-[0.25em] inline-flex items-center gap-4 drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
                        <span className="text-gold-400 text-lg">✦</span> {msg}
                    </span>
                </div>
                {/* Duplicate for seamless looping */}
                <div className="flex items-center gap-12 px-6 shrink-0">
                    <span className="text-white font-poppins font-normal text-[10px] uppercase tracking-[0.25em] inline-flex items-center gap-4 drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
                        <span className="text-gold-400 text-lg">✦</span> {msg}
                    </span>
                    <span className="text-white font-poppins font-normal text-[10px] uppercase tracking-[0.25em] inline-flex items-center gap-4 drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
                        <span className="text-gold-400 text-lg">✦</span> {msg}
                    </span>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes tickerRTL {
                    from { transform: translate3d(0, 0, 0); }
                    to { transform: translate3d(-50%, 0, 0); }
                }
                .animate-ticker-rtl {
                    animation: tickerRTL 30s linear infinite !important;
                }
            ` }} />
        </div>
    );
};

export default Ticker;

import React from 'react';
import { Smartphone, MessageCircle, Bell, Search, Globe } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { useRates } from '../context/RateContext';

const Navbar = () => {
    const { rates } = useRates();
    const location = useLocation();

    const fmt = (val) => {
        if (typeof val !== 'number') return '-';
        return val.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    };

    const usdRate = rates.spot?.[2]?.ask || '-';

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className="sticky top-0 z-50 w-full glass shadow-luxury px-6 py-3 flex items-center justify-between"
        >
            {/* Left: Logo & Brand */}
            <Link to="/" className="flex items-center gap-3 group cursor-pointer">
                <div className="w-10 h-10 gradient-luxury rounded-lg flex items-center justify-center shadow-gold-glow">
                    <span className="text-gold-400 font-playfair font-black text-xl">A</span>
                </div>
                <div className="flex flex-col">
                    <span className="text-magenta-600 font-playfair font-black text-xl tracking-tight leading-none">ABHINAV</span>
                    <span className="text-magenta-700 font-poppins font-bold text-[10px] tracking-[0.2em] leading-tight">GOLD & SILVER</span>
                </div>
            </Link>

            {/* Center: Menu */}
            <div className="hidden md:flex items-center gap-8">
                {[
                    { name: 'Home', path: '/' },
                    { name: 'Rates', path: '/rates' },
                    { name: 'Alerts', path: '/alerts' },
                    { name: 'Videos', path: '/videos' }
                ].map((item) => (
                    <Link
                        key={item.name}
                        to={item.path}
                        className={`font-poppins font-semibold text-sm transition-all relative group ${location.pathname === item.path ? 'text-magenta-600' : 'text-slate-600 hover:text-magenta-600'
                            }`}
                    >
                        {item.name}
                        <span className={`absolute -bottom-1 left-0 h-0.5 bg-magenta-600 transition-all ${location.pathname === item.path ? 'w-full' : 'w-0 group-hover:w-full'
                            }`}></span>
                    </Link>
                ))}
            </div>

            {/* Right: Icons & Info */}
            <div className="flex items-center gap-4">
                {/* Rate Display */}
                <div className="hidden lg:flex items-center gap-4 px-4 py-1.5 bg-slate-50 rounded-full border border-slate-200">
                    <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">USD price</span>
                    </div>
                    <span className="text-sm font-black text-magenta-600 font-poppins">₹{fmt(usdRate)}</span>
                </div>

                <div className="flex items-center gap-2">
                    <button className="p-2 text-magenta-600 hover:bg-magenta-50 rounded-full transition-colors">
                        <Search size={20} />
                    </button>
                    <a
                        href="https://wa.me/919848012345"
                        target="_blank"
                        className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-transform hover:scale-110 shadow-lg"
                    >
                        <MessageCircle size={20} />
                    </a>
                    <button className="p-2 bg-gold-400 text-magenta-700 rounded-full hover:bg-gold-500 transition-transform hover:scale-110 shadow-lg">
                        <Bell size={20} />
                    </button>
                </div>
            </div>
        </motion.nav>
    );
};

export default Navbar;

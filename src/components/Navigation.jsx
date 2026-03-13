import React from 'react';
import { MessageCircle, Bell } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { useRates } from '../context/RateContext';

const Navigation = () => {
    const { rates } = useRates();
    const location = useLocation();

    const navItems = [
        { name: 'Home', path: '/' },
        { name: 'Rates', path: '/rates' },
        { name: 'Alerts', path: '/alerts' },
        { name: 'Videos', path: '/videos' }
    ];

    const usdInr = rates.spot?.[2]?.ask || '-';

    return (
        <>
            {/* Main Header Container */}
            <div className="absolute lg:relative top-0 w-full z-50 p-0">
                <div className="max-w-full mx-auto px-0 py-0">
                    {/* Desktop View (≥1024px) */}
                    <nav className="hidden lg:flex items-center justify-between bg-[#0b0e14] border-b border-white/5 px-6 py-2 shadow-2xl">
                        {/* Logo */}
                        <Link to="/" className="flex items-center gap-3 group">
                            <img 
                                src="/logofd.png" 
                                alt="Abhinav Logo" 
                                className="w-12 h-12 object-contain" 
                            />
                            <div className="flex flex-col">
                                <span className="text-[#e91e63] font-playfair font-black text-2xl tracking-tight leading-none uppercase">ABHINAV</span>
                                <span className="text-[#e91e63] font-poppins font-bold text-[10px] tracking-[0.1em] leading-tight">GOLD & SILVER</span>
                            </div>
                        </Link>

                        {/* Navigation Links */}
                        <div className="flex items-center gap-10">
                            {navItems.map((item) => {
                                const isActive = location.pathname === item.path;
                                return (
                                    <Link
                                        key={item.name}
                                        to={item.path}
                                        className={`font-poppins font-bold text-sm uppercase tracking-widest transition-all relative py-2 ${
                                            isActive ? 'text-white' : 'text-slate-400 hover:text-white'
                                        }`}
                                    >
                                        {item.name}
                                        {isActive && (
                                            <motion.div 
                                                layoutId="navUnderline"
                                                className="absolute -bottom-0.5 left-0 right-0 h-1 bg-[#f4cb4c] rounded-full"
                                            />
                                        )}
                                    </Link>
                                );
                            })}
                        </div>

                        {/* Right Actions */}
                        <div className="flex items-center gap-6">
                            {/* USD Rate Capsule */}
                            <div className="flex items-center gap-3 bg-white/5 rounded-full px-4 py-2 border border-white/10">
                                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">USD</span>
                                <span className="text-white font-bold font-poppins text-sm">₹{usdInr}</span>
                            </div>

                            <div className="flex items-center gap-3">
                                <a
                                    href="https://wa.me/919848012345"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 bg-[#1eb858] text-white rounded-xl hover:bg-green-500 transition-all flex items-center justify-center shadow-lg border-0"
                                >
                                    <MessageCircle size={20} strokeWidth={2.5} />
                                </a>
                                <button className="w-10 h-10 bg-[#f4cb4c] text-slate-900 rounded-xl hover:bg-yellow-400 transition-all flex items-center justify-center shadow-lg border-0">
                                    <Bell size={20} strokeWidth={2.5} />
                                </button>
                            </div>
                        </div>
                    </nav>

                    {/* Mobile View (<1024px) */}
                    <div className="flex lg:hidden items-center justify-between pointer-events-none px-4 py-4">
                        <div /> {/* Spacer for symmetry if needed, or keep empty if right actions are the only ones */}

                        {/* Right Actions (Mobile Only Show Home Page if desired, but user asked for consistency) */}
                        {location.pathname === '/' && (
                            <div className="flex items-center gap-3 pointer-events-auto">
                                <a
                                    href="https://wa.me/919848012345"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 bg-[#1eb858] text-white rounded-xl flex items-center justify-center shadow-lg"
                                >
                                    <MessageCircle size={20} strokeWidth={2.5} />
                                </a>
                                <button className="w-10 h-10 bg-[#f4cb4c] text-slate-900 rounded-xl flex items-center justify-center shadow-lg">
                                    <Bell size={20} strokeWidth={2.5} />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>


        </>
    );
};

export default Navigation;

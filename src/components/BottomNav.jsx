import React from 'react';
import { Home, BarChart2, Bell, PlayCircle } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const BottomNav = () => {
    const location = useLocation();

    return (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-6 py-3 glass rounded-full shadow-luxury flex items-center gap-1">
            <NavItem to="/" icon={<Home size={18} />} label="Home" active={location.pathname === '/'} />
            <div className="w-px h-6 bg-slate-200 mx-2"></div>
            <NavItem to="/rates" icon={<BarChart2 size={18} />} label="Rates" active={location.pathname === '/rates'} />
            <div className="w-px h-6 bg-slate-200 mx-2"></div>
            <NavItem to="/alerts" icon={<Bell size={18} />} label="Alerts" active={location.pathname === '/alerts'} />
            <div className="w-px h-6 bg-slate-200 mx-2"></div>
            <NavItem to="/videos" icon={<PlayCircle size={18} />} label="Videos" active={location.pathname === '/videos'} />
        </div>
    );
};

const NavItem = ({ to, icon, label, active }) => (
    <Link to={to} className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${active ? 'bg-magenta-600 text-white shadow-lg' : 'text-slate-500 hover:bg-magenta-50 hover:text-magenta-600'}`}>
        {icon}
        <span className="font-poppins font-bold text-sm tracking-tight">{label}</span>
    </Link>
);

export default BottomNav;

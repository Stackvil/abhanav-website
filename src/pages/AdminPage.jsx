import React, { useState, useEffect } from 'react';
import { useRates } from '../context/RateContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, LogOut, TrendingUp, Settings, Video, MessageSquare, Play, Trash2, Save, RefreshCw } from 'lucide-react';

const AdminPage = () => {
    const { rates, rawRates, adj, showModified, updateSettings, refreshRates, loading, error } = useRates();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [activeTab, setActiveTab] = useState('rates');
    const [ticker, setTicker] = useState(localStorage.getItem('ag_ticker') || 'Welcome to Abhinav Gold & Silver - Quality Purity Guaranteed');
    const [videos, setVideos] = useState(JSON.parse(localStorage.getItem('ag_videos') || '[{"videoId":"dQw4w9WgXcQ","title":"Brand Film"}]'));

    const handleLogin = () => {
        const storedPw = localStorage.getItem('ag_adminPw') || 'admin123';
        if (username === 'admin' && password === storedPw) {
            setIsLoggedIn(true);
        } else {
            alert('Invalid credentials');
        }
    };

    const saveAdj = (newAdj) => {
        updateSettings(newAdj, undefined);
    };

    const toggleDisplayMode = (mode) => {
        updateSettings(undefined, mode === 'modified');
    };

    const saveTicker = () => {
        localStorage.setItem('ag_ticker', ticker);
        alert('Ticker updated!');
    };

    const addVideo = () => {
        setVideos([...videos, { videoId: '', title: '' }]);
    };

    const removeVideo = (idx) => {
        const v = [...videos];
        v.splice(idx, 1);
        setVideos(v);
    };

    const saveVideos = () => {
        localStorage.setItem('ag_videos', JSON.stringify(videos));
        alert('Videos updated!');
    };

    if (!isLoggedIn) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
                <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="glass max-w-md w-full p-10 rounded-[40px] shadow-luxury">
                    <div className="flex flex-col items-center gap-6 mb-10">
                        <div className="w-20 h-20 gradient-luxury rounded-3xl flex items-center justify-center shadow-gold-glow">
                            <Lock className="text-gold-400" size={40} />
                        </div>
                        <h1 className="text-3xl font-playfair font-black text-magenta-700 uppercase tracking-widest text-center">Login</h1>
                    </div>
                    <div className="flex flex-col gap-4">
                        <input
                            className="w-full bg-white/50 border border-slate-200 px-6 py-4 rounded-2xl font-poppins focus:ring-2 focus:ring-magenta-600 outline-none transition-all"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <input
                            type="password"
                            className="w-full bg-white/50 border border-slate-200 px-6 py-4 rounded-2xl font-poppins focus:ring-2 focus:ring-magenta-600 outline-none transition-all"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                        />
                        <button
                            onClick={handleLogin}
                            className="w-full gradient-luxury py-4 rounded-2xl text-white font-poppins font-black uppercase tracking-widest shadow-lg hover:brightness-110 active:scale-95 transition-all mt-4"
                        >
                            Log In
                        </button>
                    </div>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 pb-32 text-slate-800">
            <div className="bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center sticky top-0 z-30">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 gradient-luxury rounded flex items-center justify-center shadow-lg">
                        <Settings className="text-white" size={18} />
                    </div>
                    <span className="font-playfair font-black text-magenta-700 uppercase tracking-widest text-lg">Dashboard</span>
                </div>
                <button onClick={() => setIsLoggedIn(false)} className="flex items-center gap-2 text-slate-400 hover:text-red-500 font-poppins font-bold text-sm transition-colors">
                    <LogOut size={18} />
                    Logout
                </button>
            </div>

            <div className="max-w-7xl mx-auto p-6 mt-8 grid lg:grid-cols-[280px_1fr] gap-10">
                {/* Sidebar */}
                <div className="flex flex-col gap-2">
                    <TabBtn id="rates" icon={<TrendingUp size={20} />} label="Rates & Offsets" active={activeTab === 'rates'} onClick={setActiveTab} />
                    <TabBtn id="news" icon={<MessageSquare size={20} />} label="News & Ticker" active={activeTab === 'news'} onClick={setActiveTab} />
                    <TabBtn id="videos" icon={<Video size={20} />} label="Media Mgr" active={activeTab === 'videos'} onClick={setActiveTab} />
                </div>

                {/* Content */}
                <AnimatePresence mode="wait">
                    {activeTab === 'rates' && (
                        <motion.div key="rates" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                            <div className="grid gap-8">
                                <section className="glass p-8 rounded-[40px] shadow-luxury border-white/40 min-h-[400px]">
                                    <div className="flex justify-between items-center mb-10">
                                        <h3 className="text-xl font-playfair font-black text-magenta-700 uppercase tracking-widest">Rate Adjustments</h3>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => toggleDisplayMode('live')}
                                                className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${!showModified ? 'gradient-luxury text-white shadow-lg' : 'bg-slate-100 text-slate-500'}`}
                                            >
                                                Live Mode
                                            </button>
                                            <button
                                                onClick={() => toggleDisplayMode('modified')}
                                                className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${showModified ? 'gradient-luxury text-white shadow-lg' : 'bg-slate-100 text-slate-500'}`}
                                            >
                                                Modified Mode
                                            </button>
                                        </div>
                                    </div>

                                    {(!rawRates.rtgs?.length && loading) ? (
                                        <div className="flex flex-col items-center justify-center py-20 gap-4">
                                            <RefreshCw size={40} className="text-magenta-300 animate-spin" />
                                            <p className="font-poppins font-bold text-slate-400 text-xs uppercase tracking-widest">Connecting to rates service...</p>
                                        </div>
                                    ) : (
                                        <div className="grid md:grid-cols-2 gap-8">
                                            <AdjustmentCard
                                                label="Gold Offset"
                                                item={adj?.gold || { mode: 'amount', value: 0 }}
                                                liveRates={(rawRates.rtgs || []).filter(r => r.name.toLowerCase().includes('gold'))}
                                                onChange={(val) => saveAdj({ ...adj, gold: val })}
                                            />
                                            <AdjustmentCard
                                                label="Silver Offset"
                                                item={adj?.silver || { mode: 'amount', value: 0 }}
                                                liveRates={(rawRates.rtgs || []).filter(r => r.name.toLowerCase().includes('5 kgs'))}
                                                onChange={(val) => saveAdj({ ...adj, silver: val })}
                                            />
                                        </div>
                                    )}

                                    {error && (
                                        <div className="mt-8 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600 font-poppins text-xs font-bold animate-pulse">
                                            <div className="w-2 h-2 rounded-full bg-red-500"></div>
                                            Service Connectivity Error: {error}
                                        </div>
                                    )}

                                    <button
                                        onClick={refreshRates}
                                        className="mt-12 flex items-center gap-2 mx-auto px-10 py-4 bg-slate-100 text-slate-500 rounded-full font-poppins font-bold text-xs uppercase tracking-widest hover:bg-magenta-100 hover:text-magenta-600 transition-colors"
                                    >
                                        <RefreshCw size={14} />
                                        Force Manual Refresh
                                    </button>
                                </section>
                            </div>
                        </motion.div>
                    )}

                    {
                        activeTab === 'news' && (
                            <motion.div key="news" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                                <div className="glass p-8 rounded-[40px] shadow-luxury border-white/40">
                                    <h3 className="text-xl font-playfair font-black text-magenta-700 uppercase tracking-widest mb-6">Ticker Message</h3>
                                    <textarea
                                        className="w-full h-40 bg-white/50 border border-slate-200 px-6 py-6 rounded-3xl font-poppins text-lg focus:ring-2 focus:ring-magenta-600 outline-none transition-all resize-none"
                                        value={ticker}
                                        onChange={(e) => setTicker(e.target.value)}
                                        placeholder="Enter market news alert..."
                                    />
                                    <button
                                        onClick={saveTicker}
                                        className="mt-6 flex items-center gap-3 px-8 py-4 gradient-luxury text-white rounded-2xl font-poppins font-black uppercase tracking-widest shadow-gold-glow hover:scale-105 transition-all"
                                    >
                                        <Save size={20} />
                                        Update Ticker
                                    </button>
                                </div>
                            </motion.div>
                        )
                    }

                    {
                        activeTab === 'videos' && (
                            <motion.div key="videos" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                                <div className="glass p-8 rounded-[40px] shadow-luxury border-white/40">
                                    <div className="flex justify-between items-center mb-8">
                                        <h3 className="text-xl font-playfair font-black text-magenta-700 uppercase tracking-widest">Media Manager</h3>
                                        <button onClick={addVideo} className="px-6 py-2 bg-magenta-50 text-magenta-600 rounded-full font-poppins font-black text-[10px] uppercase tracking-widest hover:bg-magenta-600 hover:text-white transition-all">
                                            + Add Video
                                        </button>
                                    </div>

                                    <div className="flex flex-col gap-6">
                                        {videos.map((vid, i) => (
                                            <div key={i} className="bg-slate-50 p-6 rounded-3xl flex flex-col md:flex-row gap-4 items-center">
                                                <div className="w-12 h-12 bg-magenta-100 text-magenta-600 rounded-2xl flex items-center justify-center shrink-0">
                                                    <Play size={20} />
                                                </div>
                                                <input
                                                    className="flex-1 bg-white border border-slate-200 px-4 py-3 rounded-xl font-poppins text-sm"
                                                    placeholder="YouTube ID"
                                                    value={vid.videoId}
                                                    onChange={(e) => {
                                                        const v = [...videos];
                                                        v[i].videoId = e.target.value;
                                                        setVideos(v);
                                                    }}
                                                />
                                                <input
                                                    className="flex-[2] bg-white border border-slate-200 px-4 py-3 rounded-xl font-poppins text-sm"
                                                    placeholder="Video Title"
                                                    value={vid.title}
                                                    onChange={(e) => {
                                                        const v = [...videos];
                                                        v[i].title = e.target.value;
                                                        setVideos(v);
                                                    }}
                                                />
                                                <button onClick={() => removeVideo(i)} className="p-3 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all">
                                                    <Trash2 size={20} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>

                                    <button
                                        onClick={saveVideos}
                                        className="mt-10 flex items-center gap-3 px-8 py-4 gradient-luxury text-white rounded-2xl font-poppins font-black uppercase tracking-widest shadow-gold-glow hover:scale-105 transition-all w-full justify-center"
                                    >
                                        <Save size={20} />
                                        Save Video Library
                                    </button>
                                </div>
                            </motion.div>
                        )
                    }
                </AnimatePresence >
            </div >
        </div >
    );
};

const TabBtn = ({ id, icon, label, active, onClick }) => (
    <button
        onClick={() => onClick(id)}
        className={`flex items-center gap-4 px-6 py-4 rounded-3xl font-poppins font-bold text-sm tracking-tight transition-all ${active ? 'gradient-luxury text-white shadow-lg' : 'text-slate-500 hover:bg-magenta-50 hover:text-magenta-600'}`}
    >
        {icon}
        {label}
    </button>
);

const AdjustmentCard = ({ label, item, liveRates = [], onChange }) => {
    const [localVal, setLocalVal] = useState(item.value.toString());

    useEffect(() => {
        // Sync local value with prop only if it's not currently being edited as a minus sign
        if (localVal !== '-' && parseFloat(localVal) !== item.value) {
            setLocalVal(item.value.toString());
        }
    }, [item.value]);

    const handleTextChange = (v) => {
        // Allow only numbers and a single leading minus
        if (v !== '' && v !== '-' && isNaN(parseFloat(v))) return;

        setLocalVal(v);
        if (v === '' || v === '-') return;

        const num = parseFloat(v);
        if (!isNaN(num)) {
            onChange({ ...item, value: num });
        }
    };

    return (
        <div className="bg-slate-50/50 p-6 rounded-[30px] border border-slate-100 h-full">
            <div className="flex justify-between items-start mb-6">
                <div>
                    <span className="text-[10px] font-bold text-magenta-600 uppercase tracking-[0.2em] mb-1 block font-poppins">{label}</span>
                    <div className="flex flex-col gap-2">
                        {liveRates.map((r, i) => {
                            const original = r.sell || 0;
                            const delta = item.mode === 'amount' ? item.value : (original * item.value) / 100;
                            const modified = original + delta;
                            return (
                                <div key={i} className="flex flex-col gap-1.5">
                                    <div className="flex items-center justify-between">
                                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Live Rate:</span>
                                        <span className="text-[11px] font-bold text-slate-600 font-poppins">₹{original.toLocaleString('en-IN')}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-[9px] font-bold text-green-600 uppercase tracking-wider">Modified:</span>
                                        <span className="text-[13px] font-black text-green-600 font-poppins">₹{modified.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
                                    </div>
                                    <div className="h-[1px] bg-slate-100 w-full mt-1"></div>
                                    <span className="text-[8px] font-medium text-slate-400 font-poppins uppercase tracking-wider mt-1">{r.name}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className="flex flex-col gap-1 min-w-[100px]">
                    <button
                        onClick={() => onChange({ ...item, mode: 'amount' })}
                        className={`px-3 py-1 rounded-lg text-[9px] font-bold transition-all text-right ${item.mode === 'amount' ? 'text-magenta-600 bg-white shadow-sm' : 'text-slate-400'}`}
                    >
                        ₹ Fixed
                    </button>
                    <button
                        onClick={() => onChange({ ...item, mode: 'percent' })}
                        className={`px-3 py-1 rounded-lg text-[9px] font-bold transition-all text-right ${item.mode === 'percent' ? 'text-magenta-600 bg-white shadow-sm' : 'text-slate-400'}`}
                    >
                        % Percent
                    </button>
                </div>
            </div>

            <div className="flex items-center gap-3">
                <button
                    onClick={() => handleTextChange('-')}
                    className="w-10 h-10 bg-white shadow-sm rounded-xl text-magenta-600 font-bold hover:scale-110 active:scale-90 transition-all font-poppins"
                >
                    −
                </button>
                <input
                    type="text"
                    inputMode="numeric"
                    className="flex-1 bg-white border border-slate-200 text-center py-2.5 rounded-xl font-poppins font-bold text-magenta-700 text-lg"
                    value={localVal}
                    onChange={(e) => handleTextChange(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            e.currentTarget.blur();
                        }
                    }}
                />
                <button
                    onClick={() => onChange({ ...item, value: item.value + 1 })}
                    className="w-10 h-10 bg-white shadow-sm rounded-xl text-magenta-600 font-bold hover:scale-110 active:scale-90 transition-all font-poppins"
                >
                    +
                </button>
            </div>
        </div>
    );
};

export default AdminPage;

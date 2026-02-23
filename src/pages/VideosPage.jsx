import React from 'react';
import { Play, PlayCircle, Clock, ChevronRight, Settings } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const VideosPage = () => {
    const videos = [
        { id: 1, title: 'Understanding Gold Purity', thumb: 'https://images.unsplash.com/photo-1589156229687-496a31ad1d1f?auto=format&fit=crop&q=80&w=800', duration: '5:24' },
        { id: 2, title: 'Live Workshop: Silver Basics', thumb: 'https://images.unsplash.com/photo-1610375461246-83df859d819d?auto=format&fit=crop&q=80&w=800', duration: '12:45' },
        { id: 3, title: 'Weekly Market Review', thumb: 'https://images.unsplash.com/photo-1611974775363-28929cc2555a?auto=format&fit=crop&q=80&w=800', duration: '18:10' },
        { id: 4, title: 'History of Trading', thumb: 'https://images.unsplash.com/photo-1589156191108-c762ff4b96ab?auto=format&fit=crop&q=80&w=800', duration: '8:30' },
    ];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="pb-32 px-6 pt-10 max-w-7xl mx-auto relative"
        >
            <div className="absolute top-4 right-6">
                <Link
                    to="/admin"
                    className="p-3 bg-white/60 hover:bg-magenta-600 hover:text-white text-magenta-600 rounded-2xl shadow-luxury border border-white/40 transition-all flex items-center gap-2 font-poppins font-bold text-xs uppercase tracking-widest backdrop-blur-sm"
                >
                    <Settings size={18} />
                    Login
                </Link>
            </div>
            <div className="text-center mb-16 flex flex-col items-center gap-4">
                <h1 className="text-6xl font-playfair font-black text-magenta-700 uppercase tracking-tighter leading-none">Education Hub</h1>
                <p className="text-slate-500 font-poppins max-w-2xl text-lg font-medium">Expert insights, market analysis, and educational content to guide your precious metal investments.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-10">
                {videos.map((video, idx) => (
                    <motion.div
                        key={video.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.1 }}
                        className="group relative glass rounded-[40px] overflow-hidden shadow-luxury border-white/40 cursor-pointer"
                    >
                        {/* Thumbnail Wrap */}
                        <div className="relative h-64 overflow-hidden">
                            <img src={video.thumb} alt={video.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-gradient-to-t from-magenta-900/80 to-transparent"></div>

                            {/* Play Button Overlay */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-16 h-16 bg-gold-400 text-magenta-700 rounded-full flex items-center justify-center opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 shadow-gold-glow">
                                    <Play fill="currentColor" size={32} className="ml-1" />
                                </div>
                            </div>

                            {/* Duration Chip */}
                            <div className="absolute bottom-4 left-6 flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full border border-white/20">
                                <Clock className="text-white" size={14} />
                                <span className="text-[10px] font-black text-white uppercase tracking-widest">{video.duration}</span>
                            </div>
                        </div>

                        {/* Title Section */}
                        <div className="p-8 flex justify-between items-center bg-white/60">
                            <h3 className="text-2xl font-playfair font-black text-magenta-700 leading-tight">{video.title}</h3>
                            <div className="p-3 bg-magenta-50 text-magenta-600 rounded-full group-hover:bg-magenta-600 group-hover:text-white transition-colors duration-300">
                                <ChevronRight size={24} />
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="mt-20 flex justify-center">
                <button className="flex items-center gap-4 px-10 py-5 gradient-luxury text-white rounded-full font-poppins font-black text-lg uppercase tracking-widest shadow-luxury hover:scale-105 transition-transform group shadow-gold-glow">
                    <PlayCircle size={28} />
                    View Live Sessions
                    <ChevronRight className="group-hover:translate-x-2 transition-transform" />
                </button>
            </div>
        </motion.div>
    );
};

export default VideosPage;

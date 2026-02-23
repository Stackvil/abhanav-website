import React from 'react';

const WaveDivider = () => {
    return (
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] z-10">
            <svg
                viewBox="0 0 1440 320"
                className="w-full h-auto min-h-[200px]"
                preserveAspectRatio="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                {/* Layer 1: Background Curve (Subtle Gold/Pink) */}
                <path
                    fill="#F7E9EC"
                    fillOpacity="1"
                    d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,250.7C960,235,1056,181,1152,165.3C1248,149,1344,171,1392,181.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                />

                {/* Layer 2: Main Magenta Curve */}
                <path
                    fill="url(#mainGradient)"
                    fillOpacity="0.8"
                    d="M0,160L60,170.7C120,181,240,203,360,192C480,181,600,139,720,122.7C840,107,960,117,1080,138.7C1200,160,1320,192,1380,208L1440,224L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
                />

                {/* Layer 3: Gold Highlight Line */}
                <path
                    fill="none"
                    stroke="#FFD700"
                    strokeWidth="4"
                    strokeOpacity="0.6"
                    d="M0,160L60,170.7C120,181,240,203,360,192C480,181,600,139,720,122.7C840,107,960,117,1080,138.7C1200,160,1320,192,1380,208L1440,224"
                    className="blur-[1px]"
                />

                <defs>
                    <linearGradient id="mainGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#C2187A" />
                        <stop offset="100%" stopColor="#8E0E5A" />
                    </linearGradient>
                </defs>
            </svg>
        </div>
    );
};

export default WaveDivider;

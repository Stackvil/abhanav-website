import React, { createContext, useContext, useState, useEffect } from 'react';

const RateContext = createContext();

const RATE_ENDPOINT = 'https://bcast.rbgoldspot.com:7768/VOTSBroadcastStreaming/Services/xml/GetLiveRateByTemplateID/rbgold';
const CORS_PROXIES = [
    url => `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`,
    url => `https://api.codetabs.com/v1/proxy?url=${encodeURIComponent(url)}`,
    url => `https://corsproxy.org/?${encodeURIComponent(url)}`,
    url => `https://thingproxy.freeboard.io/fetch/${url}`,
];

export const RateProvider = ({ children }) => {
    const [rawRates, setRawRates] = useState({ spot: [], rtgs: [] });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const isFetching = React.useRef(false);
    const lastProxyIndex = React.useRef(0);

    // Robust initial state for adj
    const getInitialAdj = () => {
        try {
            const saved = localStorage.getItem('ag_rateAdj');
            if (saved) {
                const parsed = JSON.parse(saved);
                if (parsed.gold && parsed.silver) return parsed;
            }
        } catch (e) {
            console.error("Failed to parse offsets:", e);
        }
        return { gold: { mode: 'amount', value: 0 }, silver: { mode: 'amount', value: 0 } };
    };

    const [adj, setAdj] = useState(getInitialAdj());
    const [showModified, setShowModified] = useState(JSON.parse(localStorage.getItem('ag_showModified') || 'false'));

    const updateSettings = (newAdj, newShow) => {
        if (newAdj !== undefined) {
            setAdj(newAdj);
            localStorage.setItem('ag_rateAdj', JSON.stringify(newAdj));
        }
        if (newShow !== undefined) {
            setShowModified(newShow);
            localStorage.setItem('ag_showModified', JSON.stringify(newShow));
        }
    };

    const fetchWithTimeout = async (url, ms = 2000) => {
        const controller = new AbortController();
        const id = setTimeout(() => controller.abort(), ms);
        try {
            const res = await fetch(url, { signal: controller.signal });
            clearTimeout(id);
            return res;
        } catch (e) {
            clearTimeout(id);
            throw e;
        }
    };

    const parseRateText = (text) => {
        const rows = text.trim().split('\n');
        const dataMap = {};
        rows.forEach(rawRow => {
            // Robust split: first try tabs, then multiple spaces
            let cols = rawRow.trim().split('\t').map(c => c.trim()).filter(Boolean);
            if (cols.length < 4) {
                cols = rawRow.trim().split(/\s{2,}/).map(c => c.trim()).filter(Boolean);
            }

            if (cols.length >= 4) {
                const id = cols[0], name = cols[1];
                // The remaining columns could be bid, ask, high, low, stock
                // We need to be careful if bid is '-'
                const bid = cols[2], ask = cols[3], high = cols[4], low = cols[5], stock = cols[6];

                dataMap[id] = {
                    id, name,
                    bid: bid === '-' ? '-' : parseFloat(bid),
                    ask: ask === '-' ? '-' : parseFloat(ask),
                    high: high === '-' ? '-' : parseFloat(high),
                    low: low === '-' ? '-' : parseFloat(low),
                    stock: (stock || '').toLowerCase().includes('instock'),
                };
            }
        });
        const spotIds = ['3101', '3107', '3103', '945', '2966', '2987'];
        const spot = spotIds.map(id => dataMap[id]).filter(Boolean);
        const rtgs = ['945', '2966', '2987'].map(id => {
            const it = dataMap[id];
            if (!it) return null;
            return { id: it.id, name: it.name, buy: '-', sell: it.ask, stock: it.stock };
        }).filter(Boolean);
        return { spot, rtgs };
    };

    const fetchAllRates = async () => {
        if (isFetching.current) return;
        isFetching.current = true;

        let lastError;
        const endpoint = `${RATE_ENDPOINT}?t=${Date.now()}`;

        // Try last successful proxy first, then others
        const proxyCount = CORS_PROXIES.length;
        for (let i = 0; i < proxyCount; i++) {
            const idx = (lastProxyIndex.current + i) % proxyCount;
            const makeUrl = CORS_PROXIES[idx];
            try {
                const url = makeUrl(endpoint);
                const res = await fetchWithTimeout(url, 2000);
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                const text = await res.text();
                if (!text || text.trim().length < 10) throw new Error('Empty response');
                const parsed = parseRateText(text);

                if (parsed.spot.length === 0) throw new Error('Parsing failed or empty data');

                setRawRates(parsed);
                setError(null);
                setLoading(false);
                lastProxyIndex.current = idx; // Remember success
                isFetching.current = false;
                return;
            } catch (e) {
                lastError = e;
                console.warn(`Proxy ${idx} failed: ${e.message}`);
            }
        }

        setError(lastError?.message || 'Failed to fetch rates');
        setLoading(false);
        isFetching.current = false;
    };

    useEffect(() => {
        fetchAllRates();
        const interval = setInterval(fetchAllRates, 1000);
        return () => clearInterval(interval);
    }, []);


    const rates = React.useMemo(() => {
        if (!showModified) return rawRates;

        const adjust = (val, type) => {
            const a = type === 'GOLD' ? adj.gold : adj.silver;
            if (!a || typeof val !== 'number') return val;
            const delta = a.mode === 'amount' ? a.value : (val * a.value) / 100;
            return parseFloat((val + delta).toFixed(2));
        };

        return {
            spot: rawRates.spot.map(s => {
                const isGold = s.name.toUpperCase().includes('GOLD');
                const isSilver = s.name.toUpperCase().includes('SILVER');
                if (!isGold && !isSilver) return s;
                return {
                    ...s,
                    bid: adjust(s.bid, isGold ? 'GOLD' : 'SILVER'),
                    ask: adjust(s.ask, isGold ? 'GOLD' : 'SILVER'),
                    high: adjust(s.high, isGold ? 'GOLD' : 'SILVER'),
                    low: adjust(s.low, isGold ? 'GOLD' : 'SILVER')
                };
            }),
            rtgs: rawRates.rtgs.map(r => ({
                ...r,
                sell: adjust(r.sell, r.name.toUpperCase().includes('GOLD') ? 'GOLD' : 'SILVER')
            }))
        };
    }, [rawRates, adj, showModified]);

    return (
        <RateContext.Provider value={{ rates, rawRates, loading, error, adj, showModified, updateSettings, refreshRates: fetchAllRates }}>
            {children}
        </RateContext.Provider>
    );
};

export const useRates = () => useContext(RateContext);

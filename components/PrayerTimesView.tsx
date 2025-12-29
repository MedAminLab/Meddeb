
import React, { useEffect, useState } from 'react';
import { fetchPrayerTimes, searchLocation } from '../services/api';
import { PrayerTimes, SavedLocation, LastRead } from '../types';
import { PRAYER_NAMES } from '../constants';

interface PrayerTimesViewProps {
  isDark: boolean;
  onLocationChange: (loc: SavedLocation | null) => void;
  onGoToQuran: () => void;
}

const PrayerTimesView: React.FC<PrayerTimesViewProps> = ({ isDark, onLocationChange, onGoToQuran }) => {
  const [locations, setLocations] = useState<SavedLocation[]>([]);
  const [activeLocation, setActiveLocation] = useState<SavedLocation | null>(null);
  const [times, setTimes] = useState<PrayerTimes | null>(null);
  const [loading, setLoading] = useState(true);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SavedLocation[]>([]);
  const [lastRead, setLastRead] = useState<LastRead | null>(null);
  const [nextPrayer, setNextPrayer] = useState<{name: string, time: string} | null>(null);
  const [countdown, setCountdown] = useState<string>('00:00:00');

  useEffect(() => {
    const savedLocs = localStorage.getItem('meddeb_locations');
    if (savedLocs) {
      const parsed = JSON.parse(savedLocs);
      setLocations(parsed);
      setActiveLocation(parsed[0]);
      onLocationChange(parsed[0]);
    } else {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            const loc = { id: 'current', name: 'Ma Position', lat: pos.coords.latitude, lng: pos.coords.longitude, isCurrent: true };
            setLocations([loc]);
            setActiveLocation(loc);
            onLocationChange(loc);
            localStorage.setItem('meddeb_locations', JSON.stringify([loc]));
          },
          () => setShowSearch(true)
        );
      } else {
        setShowSearch(true);
      }
    }

    const savedLastRead = localStorage.getItem('meddeb_lastRead');
    if (savedLastRead) setLastRead(JSON.parse(savedLastRead));
  }, []);

  useEffect(() => {
    if (activeLocation) {
      setLoading(true);
      fetchPrayerTimes(activeLocation.lat, activeLocation.lng)
        .then(setTimes)
        .finally(() => setLoading(false));
    }
  }, [activeLocation]);

  useEffect(() => {
    if (!times) return;

    const calculateNext = () => {
      const now = new Date();
      const currentMinutes = now.getHours() * 60 + now.getMinutes();
      const relevantPrayers = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
      let found = null;

      for (const p of relevantPrayers) {
        const [h, m] = (times as any)[p].split(':').map(Number);
        const prayerMinutes = h * 60 + m;
        if (prayerMinutes > currentMinutes) {
          found = { name: p, time: (times as any)[p] };
          break;
        }
      }
      if (!found) found = { name: 'Fajr', time: times.Fajr };
      setNextPrayer(found);
    };

    calculateNext();
    const interval = setInterval(calculateNext, 60000);
    return () => clearInterval(interval);
  }, [times]);

  useEffect(() => {
    if (!nextPrayer) return;
    const updateCountdown = () => {
      const now = new Date();
      const [h, m] = nextPrayer.time.split(':').map(Number);
      const target = new Date();
      target.setHours(h, m, 0);
      if (target < now) target.setDate(target.getDate() + 1);
      const diff = target.getTime() - now.getTime();
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      setCountdown(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
    };
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [nextPrayer]);

  const addLocation = (loc: SavedLocation) => {
    const updated = [...locations, loc];
    setLocations(updated);
    setActiveLocation(loc);
    onLocationChange(loc);
    localStorage.setItem('meddeb_locations', JSON.stringify(updated));
    setShowSearch(false);
    setSearchQuery('');
  };

  const formatDate = () => {
    return new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' }).toLowerCase();
  };

  if (showSearch) {
    return (
      <div className="p-6 space-y-6 animate-in fade-in duration-300">
        <h2 className="text-xl font-black">Ajouter un lieu</h2>
        <form onSubmit={async (e) => { e.preventDefault(); const res = await searchLocation(searchQuery); setSearchResults(res); }} className="relative">
          <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Ville..." className={`w-full p-4 rounded-2xl border ${isDark ? 'bg-white/5 border-white/5' : 'bg-white border-slate-100'}`} />
        </form>
        <div className="space-y-2">
          {searchResults.map(res => (
            <button key={res.id} onClick={() => addLocation(res)} className={`w-full p-4 rounded-2xl text-left border ${isDark ? 'bg-white/5 border-white/5' : 'bg-white border-slate-100 shadow-sm'}`}>
              <p className="font-bold">{res.name}</p>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {/* Hero 100% Largeur */}
      <div className="w-full bg-brand p-10 pb-12 text-white flex flex-col items-center text-center relative overflow-hidden shadow-xl">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
           <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none"><path d="M0 100 C 20 0 50 0 100 100 Z" fill="currentColor"/></svg>
        </div>
        
        <h2 className="text-[10px] font-black uppercase tracking-[0.3em] opacity-60 mb-2">Prochaine prière</h2>
        <h3 className="text-6xl font-black tracking-tighter mb-6">{nextPrayer ? PRAYER_NAMES[nextPrayer.name] : '...'}</h3>
        
        <div className="px-8 py-3 bg-white/10 rounded-3xl backdrop-blur-xl border border-white/20 shadow-inner inline-block">
          <span className="text-4xl font-black tabular-nums">{countdown}</span>
        </div>
        
        <div className="text-[11px] font-bold opacity-60 mt-6 uppercase tracking-widest">{formatDate()}</div>
      </div>

      <div className="px-4 -mt-6 space-y-3 pb-10">
        {lastRead && (
          <button onClick={onGoToQuran} className={`w-full flex items-center justify-between p-5 rounded-[2rem] border transition-all active:scale-95 ${isDark ? 'bg-[#151b29] border-white/5' : 'bg-white border-slate-100 shadow-lg'}`}>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-brand/10 text-brand rounded-xl">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253" /></svg>
              </div>
              <div className="text-left">
                <p className="text-[8px] font-black uppercase tracking-widest opacity-40 mb-0.5">Dernière lecture</p>
                <p className="text-xs font-black">{lastRead.surahName} • Verset {lastRead.ayahNumber}</p>
              </div>
            </div>
            <svg className="h-4 w-4 text-brand" viewBox="0 0 20 20" fill="currentColor"><path d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" /></svg>
          </button>
        )}

        {loading ? (
          <div className="py-20 flex justify-center"><div className="animate-spin h-8 w-8 border-4 border-brand/20 border-t-brand rounded-full"></div></div>
        ) : (
          <div className="space-y-2">
            {times && Object.entries(times).filter(([key]) => PRAYER_NAMES[key]).map(([key, value]) => (
              <div key={key} className={`flex justify-between items-center p-6 px-8 rounded-[2rem] transition-all ${isDark ? 'bg-white/5 hover:bg-white/10' : 'bg-white border border-slate-100 hover:shadow-md'}`}>
                <div className="flex flex-col">
                  <span className="text-[9px] uppercase font-black tracking-widest opacity-40">{key === 'Sunrise' ? 'Chourouk' : 'Prière'}</span>
                  <span className="font-black text-lg tracking-tight">{PRAYER_NAMES[key]}</span>
                </div>
                <span className={`text-3xl font-black tabular-nums tracking-tighter ${nextPrayer?.name === key ? 'text-brand scale-105' : 'opacity-80'}`}>
                  {value}
                </span>
              </div>
            ))}
            
            <button onClick={() => setShowSearch(true)} className="w-full p-4 mt-2 rounded-[1.5rem] border-2 border-dashed border-brand/20 text-brand text-[9px] font-black uppercase tracking-widest opacity-40 hover:opacity-100 transition-all">
              Changer de ville
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PrayerTimesView;

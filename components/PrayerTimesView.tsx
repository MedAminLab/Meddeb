
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

      if (!found) {
        found = { name: 'Fajr', time: times.Fajr };
      }

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

      setCountdown(
        `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
      );
    };

    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [nextPrayer]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.length < 3) return;
    const results = await searchLocation(searchQuery);
    setSearchResults(results);
  };

  const addLocation = (loc: SavedLocation) => {
    const updated = [...locations, loc];
    setLocations(updated);
    setActiveLocation(loc);
    onLocationChange(loc);
    localStorage.setItem('meddeb_locations', JSON.stringify(updated));
    setShowSearch(false);
    setSearchQuery('');
    setSearchResults([]);
  };

  const formatDate = () => {
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', day: 'numeric', month: 'long' };
    return new Date().toLocaleDateString('fr-FR', options).toLowerCase();
  };

  if (showSearch) {
    return (
      <div className="space-y-6 animate-in fade-in zoom-in duration-300">
        <div className="flex justify-between items-center px-1 pt-4">
          <h2 className="text-xl font-black tracking-tight">Ajouter un lieu</h2>
          <button onClick={() => setShowSearch(false)} className="text-brand font-black text-xs uppercase tracking-widest px-3 py-1 bg-brand/10 rounded-full">Fermer</button>
        </div>
        <form onSubmit={handleSearch} className="relative">
          <input 
            type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Rechercher une ville..."
            className={`w-full p-5 pl-14 rounded-3xl border transition-all ${isDark ? 'bg-white/5 border-white/5 text-white' : 'bg-white border-slate-100 text-slate-900'} focus:ring-2 focus:ring-brand outline-none shadow-sm font-bold`}
          />
          <div className="absolute left-5 top-5 text-slate-400">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </div>
        </form>
        <div className="space-y-3">
          {searchResults.map(res => (
            <button key={res.id} onClick={() => addLocation(res)} className={`w-full p-6 rounded-3xl text-left border transition-all ${isDark ? 'bg-white/5 border-white/10 hover:bg-white/10' : 'bg-white border-slate-100 hover:border-brand/30 hover:shadow-md shadow-sm'}`}>
              <p className="font-black text-lg">{res.name}</p>
              <p className="text-[10px] opacity-40 font-bold uppercase tracking-widest">Cliquer pour sélectionner</p>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-4">
      {/* Hero Immersif */}
      <div className="relative p-8 rounded-[2.5rem] bg-brand text-white shadow-2xl flex flex-col items-center text-center overflow-hidden min-h-[300px] justify-center gap-5">
        {/* Cercles de décoration en arrière-plan */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-black/10 rounded-full blur-3xl"></div>

        <div className="flex flex-col gap-1 relative z-10">
          <h2 className="text-[11px] font-black uppercase tracking-[0.25em] opacity-80">Prochaine prière</h2>
          <h3 className="text-6xl font-black tracking-tighter">{nextPrayer ? PRAYER_NAMES[nextPrayer.name] : '...'}</h3>
        </div>

        <div className="px-8 py-3 bg-white/20 rounded-3xl backdrop-blur-xl border border-white/20 relative z-10 shadow-inner">
          <span className="text-4xl font-black tracking-tight tabular-nums">{countdown}</span>
        </div>

        <div className="text-[14px] font-black opacity-80 mt-1 uppercase tracking-widest relative z-10">
          {formatDate()}
        </div>
      </div>

      {lastRead && (
        <button 
          onClick={onGoToQuran}
          className={`flex items-center justify-between gap-4 p-5 px-7 rounded-[2rem] border transition-all active:scale-95 ${isDark ? 'bg-white/5 border-white/5' : 'bg-white border-slate-100 shadow-sm'}`}
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-brand/10 text-brand rounded-xl">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5s3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
            </div>
            <div className="text-left">
              <p className="text-[10px] font-black uppercase tracking-widest opacity-40 leading-none mb-1">Dernière lecture</p>
              <p className="text-sm font-black tracking-tight">{lastRead.surahName} • Verset {lastRead.ayahNumber}</p>
            </div>
          </div>
          <svg className="h-5 w-5 text-brand" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg>
        </button>
      )}

      {loading ? (
        <div className="flex flex-col items-center py-12 gap-5 text-brand">
          <div className="animate-spin rounded-full h-10 w-10 border-4 border-brand/20 border-t-brand"></div>
          <p className="font-black text-[10px] tracking-[0.3em] uppercase opacity-60">Synchronisation</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-2.5">
          {times && Object.entries(times).filter(([key]) => PRAYER_NAMES[key]).map(([key, value]) => (
            <div key={key} className={`flex justify-between items-center p-6 px-8 rounded-[2rem] transition-all duration-300 group ${isDark ? 'bg-white/5 hover:bg-white/10' : 'bg-white border border-slate-100/50 hover:shadow-md'}`}>
              <div className="flex flex-col gap-0.5">
                <span className={`text-[10px] uppercase font-black tracking-[0.25em] ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                  {key === 'Sunrise' ? 'Chourouk' : 'Prière'}
                </span>
                <span className="font-black text-xl tracking-tighter">{PRAYER_NAMES[key]}</span>
              </div>
              <span className={`text-4xl font-black tabular-nums tracking-tighter ${nextPrayer?.name === key ? 'text-brand scale-110' : 'opacity-80'}`}>
                {value}
              </span>
            </div>
          ))}
          
          <button 
            onClick={() => setShowSearch(true)}
            className={`w-full p-4 mt-2 rounded-[1.5rem] border-2 border-dashed flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] transition-all opacity-40 hover:opacity-100 ${isDark ? 'border-white/10 text-white' : 'border-slate-200 text-slate-500 hover:border-brand hover:text-brand'}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            Changer de ville
          </button>
        </div>
      )}
    </div>
  );
};

export default PrayerTimesView;

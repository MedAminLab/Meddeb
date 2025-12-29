
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
        found = { name: 'Fajr', time: times.Fajr }; // Prochain Fajr demain
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
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
    return new Date().toLocaleDateString('fr-FR', options).toLowerCase();
  };

  if (showSearch) {
    return (
      <div className="space-y-6 animate-in fade-in zoom-in duration-300">
        <div className="flex justify-between items-center px-1">
          <h2 className="text-xl font-bold tracking-tight">Ajouter un lieu</h2>
          <button onClick={() => setShowSearch(false)} className="text-brand font-bold text-sm">Annuler</button>
        </div>
        <form onSubmit={handleSearch} className="relative">
          <input 
            type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Rechercher une ville..."
            className={`w-full p-4 pl-12 rounded-2xl border transition-all ${isDark ? 'bg-slate-800 border-white/5 text-white' : 'bg-white border-slate-200 text-slate-900'} focus:ring-2 focus:ring-brand outline-none shadow-sm`}
          />
          <div className="absolute left-4 top-4 text-slate-400">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </div>
        </form>
        <div className="space-y-2">
          {searchResults.map(res => (
            <button key={res.id} onClick={() => addLocation(res)} className={`w-full p-5 rounded-2xl text-left border transition-all ${isDark ? 'bg-white/5 border-white/5 hover:bg-white/10' : 'bg-white border-slate-100 hover:border-brand/30 hover:shadow-md shadow-sm'}`}>
              <p className="font-bold">{res.name}</p>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Hero Card like the image */}
      <div className="relative p-8 rounded-[3rem] bg-[#10B981] text-white shadow-xl flex flex-col items-center text-center overflow-hidden min-h-[340px] justify-center gap-6">
        <div className="flex flex-col gap-1">
          <h2 className="text-[11px] font-black uppercase tracking-[0.2em] opacity-80">Prochaine prière</h2>
          <h3 className="text-5xl font-black tracking-tight">{nextPrayer ? PRAYER_NAMES[nextPrayer.name] : '...'}</h3>
        </div>

        <div className="px-6 py-2.5 bg-white/20 rounded-2xl backdrop-blur-md">
          <span className="text-3xl font-black tracking-tight tabular-nums">{countdown}</span>
        </div>

        {lastRead && (
          <button 
            onClick={onGoToQuran}
            className="flex items-center gap-2.5 px-6 py-3.5 bg-white/10 border border-white/20 rounded-full backdrop-blur-sm hover:bg-white/20 transition-all active:scale-95"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5s3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
            <span className="text-sm font-bold tracking-tight">Reprendre {lastRead.surahName} (Verset {lastRead.ayahNumber})</span>
          </button>
        )}

        <div className="text-[13px] font-medium opacity-80 mt-2">
          {formatDate()}
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center py-12 gap-5 text-brand">
          <div className="animate-spin rounded-full h-10 w-10 border-4 border-brand/20 border-t-brand"></div>
          <p className="font-extrabold text-xs tracking-[0.2em] uppercase opacity-60">Synchronisation...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3">
          {times && Object.entries(times).filter(([key]) => PRAYER_NAMES[key]).map(([key, value]) => (
            <div key={key} className={`flex justify-between items-center p-6 px-8 rounded-[2.5rem] transition-all duration-300 ${isDark ? 'bg-white/5 hover:bg-white/10' : 'bg-white shadow-[0_4px_15px_-5px_rgba(0,0,0,0.05)]'}`}>
              <div className="flex flex-col gap-0.5">
                <span className={`text-[10px] uppercase font-black tracking-[0.2em] ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>{key === 'Sunrise' ? 'Nature' : 'Temps'}</span>
                <span className="font-extrabold text-lg tracking-tight">{PRAYER_NAMES[key]}</span>
              </div>
              <span className="text-3xl font-black text-brand tabular-nums tracking-tighter">{value}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PrayerTimesView;

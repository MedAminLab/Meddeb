
import React, { useState, useEffect, useRef } from 'react';
import { fetchSurahs, fetchSurahDetail } from '../services/api';
import { Surah, LastRead } from '../types';
import { RECITERS } from '../constants';

const QuranView: React.FC<{ isDark: boolean }> = ({ isDark }) => {
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [selectedSurah, setSelectedSurah] = useState<Surah | null>(null);
  const [surahContent, setSurahContent] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [reciter, setReciter] = useState(RECITERS[0].identifier);
  const [lastRead, setLastRead] = useState<LastRead | null>(null);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentAudioUrl, setCurrentAudioUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    fetchSurahs().then(setSurahs);
    const saved = localStorage.getItem('meddeb_lastRead');
    if (saved) setLastRead(JSON.parse(saved));
    
    const savedReciter = localStorage.getItem('preferredReciter');
    if (savedReciter) setReciter(savedReciter);
  }, []);

  const handleSurahClick = async (surah: Surah) => {
    setLoading(true);
    setSelectedSurah(surah);
    try {
      const currentReciter = localStorage.getItem('preferredReciter') || reciter;
      const data = await fetchSurahDetail(surah.number, currentReciter);
      setSurahContent(data);
      
      const newLastRead = { surahNumber: surah.number, ayahNumber: 1, surahName: surah.englishName };
      setLastRead(newLastRead);
      localStorage.setItem('meddeb_lastRead', JSON.stringify(newLastRead));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const playAyah = (url: string) => {
    if (audioRef.current) {
      if (currentAudioUrl === url && isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        setCurrentAudioUrl(url);
        audioRef.current.src = url;
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  if (selectedSurah && !loading) {
    const arabicText = surahContent[0]?.ayahs || [];
    const translationText = surahContent[1]?.ayahs || [];
    const audioFiles = surahContent[2]?.ayahs || [];

    return (
      <div className="flex flex-col gap-5 animate-in slide-in-from-right duration-400">
        <button 
          onClick={() => setSelectedSurah(null)}
          className="flex items-center gap-2 text-brand font-black mb-1 uppercase tracking-[0.15em] text-[10px]"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 19L8 12L15 5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Bibliothèque
        </button>

        <div className={`${isDark ? 'bg-white/5 border-white/5' : 'bg-brand shadow-xl'} text-white p-10 rounded-[3rem] text-center relative overflow-hidden`}>
           <div className="absolute inset-0 opacity-10 flex items-center justify-center scale-150 rotate-12 pointer-events-none">
             <svg width="200" height="200" viewBox="0 0 24 24" fill="currentColor">
               <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5s3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
             </svg>
           </div>
          <h2 className="text-4xl font-black mb-2 relative z-10">{selectedSurah.name}</h2>
          <p className="text-white/70 text-[11px] font-black uppercase tracking-[0.25em] relative z-10">{selectedSurah.englishName} • {selectedSurah.englishNameTranslation}</p>
        </div>

        <div className="flex flex-col gap-6 py-4">
          {arabicText.map((ayah: any, index: number) => (
            <div key={ayah.number} className={`${isDark ? 'bg-white/5 border-white/5' : 'bg-white border-slate-100 shadow-sm'} p-7 rounded-[2.5rem] border space-y-6 transition-all hover:shadow-md`}>
              <div className="flex justify-between items-center">
                <span className="bg-brand/10 text-brand text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest">
                  Verset {ayah.numberInSurah}
                </span>
                <button 
                  onClick={() => playAyah(audioFiles[index]?.audio)}
                  className={`p-3.5 rounded-2xl transition-all shadow-sm ${isPlaying && currentAudioUrl === audioFiles[index]?.audio ? 'bg-brand text-white' : `${isDark ? 'bg-white/5 text-slate-400' : 'bg-slate-50 text-slate-400 hover:text-brand'}`}`}
                >
                   {isPlaying && currentAudioUrl === audioFiles[index]?.audio ? (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/>
                    </svg>
                   ) : (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <path d="M5 3L19 12L5 21V3Z" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                   )}
                </button>
              </div>
              <p className="arabic-text text-4xl text-right leading-[2.4] text-brand font-semibold antialiased">
                {ayah.text}
              </p>
              <p className={`text-[15px] leading-relaxed font-semibold pt-5 border-t ${isDark ? 'text-slate-400 border-white/5' : 'text-slate-700 border-slate-50'}`}>
                {translationText[index]?.text}
              </p>
            </div>
          ))}
        </div>
        <audio ref={audioRef} onEnded={() => setIsPlaying(false)} className="hidden" />
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {lastRead && (
        <button 
          onClick={() => handleSurahClick(surahs.find(s => s.number === lastRead.surahNumber)!)}
          className="w-full bg-gradient-to-br from-brand to-brand-dark text-white p-7 rounded-[2.5rem] shadow-xl text-left flex justify-between items-center group overflow-hidden relative"
        >
          <div className="absolute -right-6 -bottom-6 opacity-20 group-hover:scale-110 group-hover:rotate-6 transition-all duration-700">
            <svg width="150" height="150" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5s3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <div className="relative z-10 flex flex-col gap-1">
            <span className="text-[10px] opacity-70 uppercase font-black tracking-widest">Reprendre</span>
            <h3 className="text-3xl font-black tracking-tight">{lastRead.surahName}</h3>
          </div>
          <div className="relative z-10 bg-white/20 p-4 rounded-2xl backdrop-blur-md">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </div>
        </button>
      )}

      <div className={`${isDark ? 'bg-white/5 border-white/5' : 'bg-white border-slate-100 shadow-sm'} rounded-[2.5rem] border overflow-hidden`}>
        <div className={`p-6 border-b flex items-center justify-between ${isDark ? 'border-white/5' : 'border-slate-50 bg-slate-50/50'}`}>
          <h3 className="font-black text-xs uppercase tracking-[0.2em] opacity-40">Répertoire des Sourates</h3>
          <span className="text-[10px] text-brand bg-brand/10 px-4 py-1.5 rounded-full font-black uppercase tracking-widest">114 Total</span>
        </div>
        <div className="max-h-[550px] overflow-y-auto scrollbar-hide px-2">
          {surahs.map((surah) => (
            <button
              key={surah.number}
              onClick={() => handleSurahClick(surah)}
              className={`w-full p-6 flex items-center gap-6 group rounded-[1.5rem] transition-all hover:bg-brand/5 my-1`}
            >
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black transition-all ${isDark ? 'bg-white/5 text-slate-500 group-hover:bg-brand group-hover:text-white' : 'bg-slate-50 text-slate-400 group-hover:bg-brand group-hover:text-white shadow-sm'}`}>
                {surah.number}
              </div>
              <div className="flex-1">
                <h4 className="font-extrabold text-base tracking-tight">{surah.englishName}</h4>
                <p className="text-[10px] text-slate-500 uppercase font-black tracking-[0.1em]">{surah.revelationType} • {surah.numberOfAyahs} ayats</p>
              </div>
              <div className="arabic-text text-2xl font-bold text-brand/40 group-hover:text-brand transition-all">
                {surah.name}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuranView;

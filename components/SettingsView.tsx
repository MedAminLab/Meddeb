
import React, { useState, useEffect } from 'react';
import { RECITERS } from '../constants';

const SettingsView: React.FC<{ isDark: boolean }> = ({ isDark }) => {
  const [preferredReciter, setPreferredReciter] = useState(RECITERS[0].identifier);

  useEffect(() => {
    const saved = localStorage.getItem('preferredReciter');
    if (saved) setPreferredReciter(saved);
  }, []);

  const handleReciterChange = (id: string) => {
    setPreferredReciter(id);
    localStorage.setItem('preferredReciter', id);
  };

  return (
    <div className="space-y-6">
      <div className={`${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100'} p-6 rounded-3xl shadow-sm border`}>
        <h2 className="text-xl font-extrabold mb-6 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-emerald-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
          </svg>
          Voix du Coran
        </h2>
        
        <div className="grid grid-cols-1 gap-2 max-h-[400px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-emerald-500">
          {RECITERS.map((r) => (
            <button
              key={r.identifier}
              onClick={() => handleReciterChange(r.identifier)}
              className={`w-full p-4 rounded-2xl flex items-center justify-between border transition-all ${
                preferredReciter === r.identifier 
                  ? 'border-emerald-500 bg-emerald-500/10 ring-2 ring-emerald-500/20' 
                  : `${isDark ? 'border-slate-700 bg-slate-800 hover:bg-slate-700' : 'border-slate-100 bg-white hover:bg-slate-50'}`
              }`}
            >
              <div className="text-left">
                <p className={`font-bold ${preferredReciter === r.identifier ? 'text-emerald-500' : ''}`}>
                  {r.name}
                </p>
                <p className="text-[10px] uppercase font-bold tracking-widest opacity-50">{r.englishName}</p>
              </div>
              {preferredReciter === r.identifier && (
                <div className="bg-emerald-500 text-white rounded-full p-1 shadow-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className={`${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100'} p-6 rounded-3xl shadow-sm border`}>
        <h2 className="text-xl font-extrabold mb-4 flex items-center gap-2">
           <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-emerald-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          Meddeb
        </h2>
        <p className={`text-sm leading-relaxed font-medium ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
          Une application épurée pour vous aider à rester connecté à votre foi, où que vous soyez.
        </p>
        <div className="mt-6 pt-4 border-t border-slate-100/10 flex justify-between text-[10px] font-bold uppercase tracking-widest opacity-40">
          <span>v2.0.0 Meddeb</span>
          <span>Open Source</span>
        </div>
      </div>
    </div>
  );
};

export default SettingsView;

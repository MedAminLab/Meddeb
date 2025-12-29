
import React, { useState } from 'react';
import { DUAS } from '../constants';

const DuasView: React.FC<{ isDark: boolean }> = ({ isDark }) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const categories = Array.from(new Set(DUAS.map(d => d.category)));
  const filteredDuas = selectedCategory ? DUAS.filter(d => d.category === selectedCategory) : DUAS;

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide px-1">
        <button
          onClick={() => setSelectedCategory(null)}
          className={`flex-shrink-0 px-6 py-2.5 rounded-2xl text-[11px] font-black uppercase tracking-widest border transition-all duration-300 ${
            selectedCategory === null 
            ? 'bg-brand text-white border-brand shadow-lg scale-105' 
            : `${isDark ? 'bg-white/5 border-white/5 text-slate-500' : 'bg-white border-slate-100 text-slate-500 shadow-sm'}`
          }`}
        >
          Tout
        </button>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`flex-shrink-0 px-6 py-2.5 rounded-2xl text-[11px] font-black uppercase tracking-widest border transition-all duration-300 ${
              selectedCategory === cat 
              ? 'bg-brand text-white border-brand shadow-lg scale-105' 
              : `${isDark ? 'bg-white/5 border-white/5 text-slate-500' : 'bg-white border-slate-100 text-slate-500 shadow-sm'}`
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="space-y-5">
        {filteredDuas.map(dua => (
          <div 
            key={dua.id}
            className={`p-8 rounded-[3rem] border transition-all duration-300 shadow-sm hover:shadow-lg ${
              isDark ? 'bg-white/5 border-white/5' : 'bg-white border-slate-100'
            }`}
          >
            <div className="flex justify-between items-center mb-6">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-brand bg-brand/10 px-4 py-1.5 rounded-full">
                {dua.category}
              </span>
              <h3 className="font-extrabold text-[13px] text-slate-500/80 italic tracking-tight">{dua.title}</h3>
            </div>
            
            <p className="arabic-text text-3xl text-right leading-[2.2] text-brand font-bold mb-8 antialiased">
              {dua.arabic}
            </p>
            
            <div className={`pt-6 border-t ${isDark ? 'border-white/5' : 'border-slate-50'}`}>
              <p className={`text-[15px] leading-relaxed font-semibold italic ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                {dua.french}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DuasView;


import React from 'react';
import { AppTab, SavedLocation } from '../types';
import { APP_NAME } from '../constants';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: AppTab;
  setActiveTab: (tab: AppTab) => void;
  isDark: boolean;
  toggleTheme: () => void;
  activeLocation: SavedLocation | null;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab, isDark, toggleTheme, activeLocation }) => {
  return (
    <div className={`flex flex-col h-screen max-w-md mx-auto shadow-2xl overflow-hidden relative transition-colors duration-300 ${isDark ? 'bg-[#0b101b] text-slate-100' : 'bg-[#F9FAFB] text-slate-900'}`}>
      <header className="px-6 pt-8 pb-4 z-10 flex justify-between items-center">
        <div className="flex items-center gap-2">
          {/* Logo Croissant exact de l'image */}
          <div className="text-brand">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C13.5654 22 15.0477 21.6401 16.3653 21C14.3312 19.8519 13 17.5815 13 15C13 11.134 16.134 8 20 8C20.7011 8 21.3754 8.10302 22.011 8.29524C21.0506 4.6062 17.7027 2 13.7273 2C13.1415 2 12.5654 2 12 2Z" />
            </svg>
          </div>
          <h1 className="text-2xl font-black tracking-tight text-brand leading-none">
            {APP_NAME}
          </h1>
        </div>

        {activeLocation && (
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-brand" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            <span className="text-[11px] font-bold text-brand lowercase tracking-tight">
              {activeLocation.name.toLowerCase()}
            </span>
          </div>
        )}
      </header>

      <main className="flex-1 overflow-y-auto p-5 pb-32">
        {children}
      </main>

      <nav className={`fixed bottom-0 left-0 right-0 max-w-md mx-auto flex justify-around p-4 pb-8 z-20 transition-all duration-300 ${isDark ? 'bg-[#0b101b]/95 border-t border-white/5' : 'bg-white/95 border-t border-slate-100 shadow-[0_-10px_30px_-10px_rgba(0,0,0,0.08)]'}`}>
        <button onClick={() => setActiveTab(AppTab.PRAYERS)} className={`flex flex-col items-center gap-1.5 transition-all transform ${activeTab === AppTab.PRAYERS ? 'text-brand scale-105' : 'text-slate-400 opacity-60'}`}>
          <div className={`p-2 rounded-xl ${activeTab === AppTab.PRAYERS ? (isDark ? 'bg-brand/10' : 'bg-brand/5') : ''}`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
          <span className="text-[9px] font-extrabold uppercase tracking-[0.1em]">Prière</span>
        </button>
        <button onClick={() => setActiveTab(AppTab.QURAN)} className={`flex flex-col items-center gap-1.5 transition-all transform ${activeTab === AppTab.QURAN ? 'text-brand scale-105' : 'text-slate-400 opacity-60'}`}>
          <div className={`p-2 rounded-xl ${activeTab === AppTab.QURAN ? (isDark ? 'bg-brand/10' : 'bg-brand/5') : ''}`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5s3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
          </div>
          <span className="text-[9px] font-extrabold uppercase tracking-[0.1em]">Coran</span>
        </button>
        <button onClick={() => setActiveTab(AppTab.DUAS)} className={`flex flex-col items-center gap-1.5 transition-all transform ${activeTab === AppTab.DUAS ? 'text-brand scale-105' : 'text-slate-400 opacity-60'}`}>
          <div className={`p-2 rounded-xl ${activeTab === AppTab.DUAS ? (isDark ? 'bg-brand/10' : 'bg-brand/5') : ''}`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
          </div>
          <span className="text-[9px] font-extrabold uppercase tracking-[0.1em]">Douaa</span>
        </button>
        <button onClick={() => setActiveTab(AppTab.SETTINGS)} className={`flex flex-col items-center gap-1.5 transition-all transform ${activeTab === AppTab.SETTINGS ? 'text-brand scale-105' : 'text-slate-400 opacity-60'}`}>
          <div className={`p-2 rounded-xl ${activeTab === AppTab.SETTINGS ? (isDark ? 'bg-brand/10' : 'bg-brand/5') : ''}`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /></svg>
          </div>
          <span className="text-[9px] font-extrabold uppercase tracking-[0.1em]">Menu</span>
        </button>
      </nav>
    </div>
  );
};

export default Layout;

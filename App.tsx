
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import PrayerTimesView from './components/PrayerTimesView';
import QuranView from './components/QuranView';
import DuasView from './components/DuasView';
import SettingsView from './components/SettingsView';
import { AppTab, SavedLocation } from './types';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AppTab>(AppTab.PRAYERS);
  const [activeLocation, setActiveLocation] = useState<SavedLocation | null>(null);
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('meddeb_theme');
    return saved === 'dark';
  });

  useEffect(() => {
    localStorage.setItem('meddeb_theme', isDark ? 'dark' : 'light');
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  const renderContent = () => {
    switch (activeTab) {
      case AppTab.PRAYERS:
        return <PrayerTimesView isDark={isDark} onLocationChange={setActiveLocation} onGoToQuran={() => setActiveTab(AppTab.QURAN)} />;
      case AppTab.QURAN:
        return <QuranView isDark={isDark} />;
      case AppTab.DUAS:
        return <DuasView isDark={isDark} />;
      case AppTab.SETTINGS:
        return <SettingsView isDark={isDark} />;
      default:
        return <PrayerTimesView isDark={isDark} onLocationChange={setActiveLocation} onGoToQuran={() => setActiveTab(AppTab.QURAN)} />;
    }
  };

  return (
    <Layout 
      activeTab={activeTab} 
      setActiveTab={setActiveTab} 
      isDark={isDark} 
      toggleTheme={toggleTheme}
      activeLocation={activeLocation}
    >
      {renderContent()}
    </Layout>
  );
};

export default App;

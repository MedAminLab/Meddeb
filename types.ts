
export interface PrayerTimes {
  Fajr: string;
  Sunrise: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
}

export interface SavedLocation {
  id: string;
  name: string;
  lat: number;
  lng: number;
  isCurrent?: boolean;
}

export interface Surah {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: string;
}

export interface Reciter {
  identifier: string;
  name: string;
  englishName: string;
}

export interface Dua {
  id: string;
  title: string;
  arabic: string;
  french: string;
  category: string;
}

export enum AppTab {
  PRAYERS = 'prayers',
  QURAN = 'quran',
  DUAS = 'duas',
  SETTINGS = 'settings'
}

export interface LastRead {
  surahNumber: number;
  ayahNumber: number;
  surahName: string;
}


import { PrayerTimes, Surah, SavedLocation } from '../types';

const ALADHAN_BASE_URL = 'https://api.aladhan.com/v1';
const QURAN_CLOUD_BASE_URL = 'https://api.alquran.cloud/v1';

export const fetchPrayerTimes = async (lat: number, lng: number): Promise<PrayerTimes> => {
  const response = await fetch(`${ALADHAN_BASE_URL}/timings?latitude=${lat}&longitude=${lng}&method=2`);
  const data = await response.json();
  return data.data.timings;
};

export const searchLocation = async (query: string): Promise<SavedLocation[]> => {
  // Using a free geocoding alternative or Aladhan's address endpoint
  const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5`);
  const data = await response.json();
  return data.map((item: any) => ({
    id: item.place_id.toString(),
    name: item.display_name.split(',')[0],
    lat: parseFloat(item.lat),
    lng: parseFloat(item.lon)
  }));
};

export const fetchSurahs = async (): Promise<Surah[]> => {
  const response = await fetch(`${QURAN_CLOUD_BASE_URL}/surah`);
  const data = await response.json();
  return data.data;
};

export const fetchSurahDetail = async (surahNumber: number, reciterId: string) => {
  const response = await fetch(`${QURAN_CLOUD_BASE_URL}/surah/${surahNumber}/editions/quran-uthmani,fr.hamidullah,${reciterId}`);
  const data = await response.json();
  return data.data;
};

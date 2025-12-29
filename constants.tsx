
import { Dua } from './types';

export const APP_NAME = "Meddeb";

export const RECITERS = [
  { identifier: 'ar.alafasy', name: 'Mishary Rashid Alafasy', englishName: 'Alafasy' },
  { identifier: 'ar.abdulsamad', name: 'Abdul Basit Abdul Samad', englishName: 'Abdul Basit' },
  { identifier: 'ar.minshawi', name: 'Mohamed Siddiq El-Minshawi', englishName: 'El-Minshawi' },
  { identifier: 'ar.abdurrahmaansudais', name: 'Abdurrahman As-Sudais', englishName: 'As-Sudais' },
  { identifier: 'ar.husary', name: 'Mahmoud Khalil Al-Husary', englishName: 'Al-Husary' },
  { identifier: 'ar.hudhaify', name: 'Ali Al-Huthaify', englishName: 'Al-Huthaify' },
  { identifier: 'ar.shaatree', name: 'Abu Bakr Al-Shatri', englishName: 'Al-Shatri' },
  { identifier: 'ar.mahermuaiqly', name: 'Maher Al-Muaiqly', englishName: 'Al-Muaiqly' },
  { identifier: 'ar.saadsaghamdi', name: 'Saad Al-Ghamdi', englishName: 'Al-Ghamdi' },
  { identifier: 'ar.ahmedajamy', name: 'Ahmed Al-Ajmy', englishName: 'Al-Ajmy' },
];

export const PRAYER_NAMES: Record<string, string> = {
  Fajr: 'Fajr',
  Sunrise: 'Chourouk',
  Dhuhr: 'Dhuhr',
  Asr: 'Asr',
  Maghrib: 'Maghrib',
  Isha: 'Isha',
};

export const DUAS: Dua[] = [
  {
    id: '1',
    category: 'Matin',
    title: 'Au réveil',
    arabic: 'الْحَمْدُ للهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ',
    french: "Louange à Allah qui nous a rendu la vie après nous avoir fait mourir, et c'est vers Lui que se fera le retour."
  },
  {
    id: '2',
    category: 'Soir',
    title: 'Avant de dormir',
    arabic: 'بِاسْمِكَ رَبِّي وَضَعْتُ جَنْبِي، وَبِكَ أَرْفَعُهُ، فَإِنْ أَمْسَكْتَ نَفْسِي فَارْحَمْهَا، وَإِنْ أَرْسَلْتَهَا فَاحْفَظْهَا بِمَا تَحْفَظُ بِهِ عِبَادَكَ الصَّالِحِينَ',
    french: "C'est en Ton nom, Seigneur, que je me couche et c'est par Toi que je me lève. Si Tu reprends mon âme, fais-lui miséricorde, et si Tu me la laisses, préserve-la comme Tu préserves Tes serviteurs vertueux."
  },
  {
    id: '3',
    category: 'Général',
    title: 'Pour les parents',
    arabic: 'رَّبِّ ارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا',
    french: "Seigneur ! Fais-leur miséricorde, car ils m'ont élevé quand j'étais petit."
  },
  {
    id: '4',
    category: 'Protection',
    title: 'Contre l\'angoisse',
    arabic: 'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ، وَالْعَجْزِ وَالْكَسَلِ، وَالْبُخْلِ وَالْجُبْنِ، وَضَلَعِ الدَّيْنِ وَغَلَبَةِ الرِّجَالِ',
    french: "Ô Allah, je cherche refuge auprès de Toi contre l'angoisse et la tristesse, contre l'impuissance et la paresse, contre l'avarice et la lâcheté, contre le fardeau de la dette et la domination des hommes."
  },
  {
    id: '5',
    category: 'Repentir',
    title: 'Demande de pardon',
    arabic: 'رَبَّنَا ظَلَمْنَا أَنفُسَنَا وَإِن لَّمْ تَغْفِرْ لَنَا وَتَرْحَمْنَا لَنَكُونَنَّ مِنَ الْخَاسِرِينَ',
    french: "Notre Seigneur, nous avons fait du tort à nous-mêmes. Et si Tu ne nous pardonnes pas et ne nous fais pas miséricorde, nous serons très certainement du nombre des perdants."
  },
  {
    id: '6',
    category: 'Protection',
    title: 'Ayat Al-Kursi',
    arabic: 'اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَّهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ۗ مَن ذَا الَّذِي يَشْفَعُ عِنْدَهُ إِلَّا بِإِذْنِهِ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَلَا يُحِيطُونَ بِشَيْءٍ مِّنْ عِلْمِهِ إِلَّا بِمَا شَاءَ ۚ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ ۖ وَلَا يَئُودُهُ حِفْظُهُمَا ۚ وَهُوَ الْعَلِيُّ الْعَظِيمُ',
    french: "Allah ! Point de divinité à part Lui, le Vivant, Celui qui subsiste par Lui-même. Ni somnolence ni sommeil ne Le saisissent. À Lui appartient tout ce qui est dans les cieux et sur la terre..."
  },
  {
    id: '7',
    category: 'Général',
    title: 'Invocation pour la science',
    arabic: 'رَّبِّ زِدْنِي عِلْمًا',
    french: "Seigneur ! Accrois mes connaissances."
  }
];

// Translations
const translations = {
    fr: {
        // Navigation
        nav_prayer: "Prières",
        nav_quran: "Coran",
        nav_audio: "Audio",
        nav_duaa: "Duaa",
        nav_settings: "Réglages",

        // Settings
        settings_title: "Réglages",
        settings_subtitle: "Personnalisez votre expérience",
        language_settings: "Langue",
        choose_language: "Choisir la langue",
        location_settings: "Localisations pour la prière",
        location_description: "Ajoutez plusieurs villes et basculez entre elles",
        city_label: "Ville",
        country_label: "Pays",
        city_placeholder: "Ex: Paris",
        country_placeholder: "Ex: France",
        add_location: "Ajouter une localisation",

        // Duaa Section
        duaa_title: "Invocations",
        duaa_subtitle: "Invocations authentiques du Coran et de la Sunnah",
        duaa_search_placeholder: "Rechercher une invocation...",
        all_duaas: "Toutes les invocations",
        copy: "Copier",
        copied: "Copié !",

        // Prayer times
        next_prayer: "Prochaine Prière",
        prayer_fajr: "Fajr",
        prayer_sunrise: "Chourouk",
        prayer_dhuhr: "Dhuhr",
        prayer_asr: "Asr",
        prayer_maghrib: "Maghrib",
        prayer_isha: "Isha",

        // Common
        continue_reading: "Reprendre",
        back: "Retour",
        detecting: "Détection...",
        no_location: "Aucune localisation",
        select_location: "Sélectionner",
        remove: "Supprimer",
        active: "Active"
    },
    ar: {
        // Navigation
        nav_prayer: "الصلاة",
        nav_quran: "القرآن",
        nav_audio: "صوتي",
        nav_duaa: "دعاء",
        nav_settings: "الإعدادات",

        // Settings
        settings_title: "الإعدادات",
        settings_subtitle: "خصص تجربتك",
        language_settings: "اللغة",
        choose_language: "اختر اللغة",
        location_settings: "مواقع الصلاة",
        location_description: "أضف عدة مدن وتبديل بينها",
        city_label: "المدينة",
        country_label: "البلد",
        city_placeholder: "مثال: باريس",
        country_placeholder: "مثال: فرنسا",
        add_location: "إضافة موقع",

        // Duaa Section
        duaa_title: "الأدعية",
        duaa_subtitle: "أدعية صحيحة من القرآن والسنة",
        duaa_search_placeholder: "ابحث عن دعاء...",
        all_duaas: "جميع الأدعية",
        copy: "نسخ",
        copied: "!تم النسخ",

        // Prayer times
        next_prayer: "الصلاة القادمة",
        prayer_fajr: "الفجر",
        prayer_sunrise: "الشروق",
        prayer_dhuhr: "الظهر",
        prayer_asr: "العصر",
        prayer_maghrib: "المغرب",
        prayer_isha: "العشاء",

        // Common
        continue_reading: "استمرار",
        back: "رجوع",
        detecting: "...جاري الكشف",
        no_location: "لا يوجد موقع",
        select_location: "اختيار",
        remove: "حذف",
        active: "نشط"
    }
};

// State
const state = {
    locations: [], // Array of {city, country}
    activeLocationIndex: 0,
    prayerTimes: null,
    nextPrayer: null,
    surahs: [],
    currentSurah: null,
    audioSurah: null,
    quranMode: 'translation', // 'translation' or 'mushaf'
    lastRead: null, // { number: 1, name: 'Al-Fatiha', ayah: 0 }
    audioReciter: 'ar.alafasy', // Default reciter
    language: 'fr', // 'fr' or 'ar'
    duaaCategories: [],
    duaas: [],
    selectedDuaaCategory: null
};

// DOM Elements
const elements = {
    locationText: document.getElementById('location-text'),
    prayerList: document.getElementById('prayer-list'),
    nextPrayerName: document.getElementById('next-prayer-name'),
    countdown: document.getElementById('countdown'),
    currentDate: document.getElementById('current-date'),
    surahList: document.getElementById('surah-list'),
    surahSearch: document.getElementById('surah-search'),
    quranReader: document.getElementById('quran-reader'),
    ayahsContainer: document.getElementById('ayahs-container'),
    readerSurahName: document.getElementById('reader-surah-name'),
    readerSurahInfo: document.getElementById('reader-surah-info'),
    backToSurahsBtn: document.getElementById('back-to-surahs'),
    navItems: document.querySelectorAll('.nav-item'),
    sections: {
        'prayer-section': document.getElementById('prayer-section'),
        'quran-section': document.getElementById('quran-section'),
        'audio-section': document.getElementById('audio-section'),
        'duaa-section': document.getElementById('duaa-section'),
        'settings-section': document.getElementById('settings-section')
    },
    // Audio Elements
    audioSurahList: document.getElementById('audio-surah-list'),
    audioPlayerContainer: document.getElementById('audio-player-container'),
    mainAudioPlayer: document.getElementById('main-audio-player'),
    audioSurahName: document.getElementById('audio-surah-name'),
    closeAudioBtn: document.getElementById('close-audio-btn'),
    reciterSelect: document.getElementById('reciter-select'),
    // Settings Elements
    langFrBtn: document.getElementById('lang-fr-btn'),
    langArBtn: document.getElementById('lang-ar-btn'),
    locationsList: document.getElementById('locations-list'),
    cityInput: document.getElementById('city-input'),
    countryInput: document.getElementById('country-input'),
    addLocBtn: document.getElementById('add-loc-btn'),
    // Quran Mode Elements
    modeTranslationBtn: document.getElementById('mode-translation'),
    modeMushafBtn: document.getElementById('mode-mushaf'),
    // Last Read Elements
    lastReadContainer: document.getElementById('last-read-container'),
    continueReadBtn: document.getElementById('continue-read-btn'),
    lastReadSurah: document.getElementById('last-read-surah'),
    // Language Toggle
    languageToggle: document.getElementById('language-toggle'),
    currentLang: document.getElementById('current-lang'),
    // Duaa Elements
    duaaCategories: document.getElementById('duaa-categories'),
    duaaList: document.getElementById('duaa-list'),
    duaaSearch: document.getElementById('duaa-search'),
    duaaModal: document.getElementById('duaa-modal'),
    closeDuaaModal: document.getElementById('close-duaa-modal'),
    duaaModalTitle: document.getElementById('duaa-modal-title'),
    duaaModalArabic: document.getElementById('duaa-modal-arabic'),
    duaaModalTranslation: document.getElementById('duaa-modal-translation'),
    duaaModalReference: document.getElementById('duaa-modal-reference'),
    copyDuaaBtn: document.getElementById('copy-duaa-btn')
};

// Intersection Observer for tracking reading position
let observer;

// Initialization
document.addEventListener('DOMContentLoaded', () => {
    loadSettings();
    initApp();
    setupEventListeners();
    setupIntersectionObserver();
    loadDuaaDatabase();
});

function loadSettings() {
    // Load language
    const savedLang = localStorage.getItem('language');
    if (savedLang) state.language = savedLang;

    // Load locations
    const savedLocations = localStorage.getItem('locations');
    if (savedLocations) {
        state.locations = JSON.parse(savedLocations);
    }

    // Load active location index
    const savedIndex = localStorage.getItem('activeLocationIndex');
    if (savedIndex !== null) {
        state.activeLocationIndex = parseInt(savedIndex);
    }

    const savedQuranMode = localStorage.getItem('quranMode');
    if (savedQuranMode) {
        state.quranMode = savedQuranMode;
        updateQuranModeUI();
    }

    const savedLastRead = localStorage.getItem('lastRead');
    if (savedLastRead) state.lastRead = JSON.parse(savedLastRead);

    const savedReciter = localStorage.getItem('audioReciter');
    if (savedReciter) {
        state.audioReciter = savedReciter;
        elements.reciterSelect.value = savedReciter;
    }

    // Apply language
    applyLanguage();
    updateLanguageUI();
}

function initApp() {
    updateDate();
    updateLastReadUI();
    renderLocationsList();

    if (state.locations.length > 0) {
        const loc = state.locations[state.activeLocationIndex];
        elements.locationText.textContent = `${loc.city}, ${loc.country}`;
        fetchPrayerTimesByCity(loc.city, loc.country);
    } else {
        elements.locationText.textContent = translate('no_location');
    }

    loadSurahs();
}

function translate(key) {
    return translations[state.language][key] || key;
}

function applyLanguage() {
    // Update HTML lang and dir attributes
    document.documentElement.lang = state.language;
    document.documentElement.dir = state.language === 'ar' ? 'rtl' : 'ltr';

    // Update all elements with data-translate
    document.querySelectorAll('[data-translate]').forEach(el => {
        const key = el.getAttribute('data-translate');
        el.textContent = translate(key);
    });

    // Update placeholders
    document.querySelectorAll('[data-translate-placeholder]').forEach(el => {
        const key = el.getAttribute('data-translate-placeholder');
        el.placeholder = translate(key);
    });

    // Update current language display
    elements.currentLang.textContent = state.language.toUpperCase();
}

function updateLanguageUI() {
    if (state.language === 'fr') {
        elements.langFrBtn.classList.add('active');
        elements.langArBtn.classList.remove('active');
    } else {
        elements.langFrBtn.classList.remove('active');
        elements.langArBtn.classList.add('active');
    }
}

function setLanguage(lang) {
    state.language = lang;
    localStorage.setItem('language', lang);
    applyLanguage();
    updateLanguageUI();

    // Re-render dynamic content
    if (state.prayerTimes) renderPrayerTimes();
    if (state.duaaCategories.length > 0) {
        renderDuaaCategories();
        if (state.selectedDuaaCategory) {
            renderDuaas(state.duaas.filter(d => d.category === state.selectedDuaaCategory));
        } else {
            renderDuaas(state.duaas);
        }
    }
}

// Locations Management
function renderLocationsList() {
    elements.locationsList.innerHTML = '';

    if (state.locations.length === 0) {
        elements.locationsList.innerHTML = `<p class="no-locations">${translate('no_location')}</p>`;
        return;
    }

    state.locations.forEach((loc, index) => {
        const item = document.createElement('div');
        item.className = `location-item ${index === state.activeLocationIndex ? 'active' : ''}`;
        item.innerHTML = `
            <div class="location-info">
                <span class="location-name">${loc.city}, ${loc.country}</span>
                ${index === state.activeLocationIndex ? `<span class="location-badge-active">${translate('active')}</span>` : ''}
            </div>
            <div class="location-actions">
                ${index !== state.activeLocationIndex ? `<button class="location-btn select-btn" onclick="selectLocation(${index})">${translate('select_location')}</button>` : ''}
                <button class="location-btn remove-btn" onclick="removeLocation(${index})"><i class="fa-solid fa-trash"></i></button>
            </div>
        `;
        elements.locationsList.appendChild(item);
    });
}

function addLocation() {
    const city = elements.cityInput.value.trim();
    const country = elements.countryInput.value.trim();

    if (city && country) {
        state.locations.push({ city, country });
        localStorage.setItem('locations', JSON.stringify(state.locations));

        // If this is the first location, make it active
        if (state.locations.length === 1) {
            state.activeLocationIndex = 0;
            localStorage.setItem('activeLocationIndex', '0');
            elements.locationText.textContent = `${city}, ${country}`;
            fetchPrayerTimesByCity(city, country);
        }

        elements.cityInput.value = '';
        elements.countryInput.value = '';
        renderLocationsList();
    } else {
        alert(state.language === 'fr' ? 'Veuillez remplir la ville et le pays.' : 'يرجى ملء المدينة والبلد.');
    }
}

function removeLocation(index) {
    if (confirm(state.language === 'fr' ? 'Supprimer cette localisation ?' : 'حذف هذا الموقع؟')) {
        state.locations.splice(index, 1);
        localStorage.setItem('locations', JSON.stringify(state.locations));

        // Adjust active index if needed
        if (index === state.activeLocationIndex) {
            state.activeLocationIndex = 0;
            localStorage.setItem('activeLocationIndex', '0');

            if (state.locations.length > 0) {
                const loc = state.locations[0];
                elements.locationText.textContent = `${loc.city}, ${loc.country}`;
                fetchPrayerTimesByCity(loc.city, loc.country);
            } else {
                elements.locationText.textContent = translate('no_location');
                elements.prayerList.innerHTML = '';
            }
        } else if (index < state.activeLocationIndex) {
            state.activeLocationIndex--;
            localStorage.setItem('activeLocationIndex', state.activeLocationIndex.toString());
        }

        renderLocationsList();
    }
}

function selectLocation(index) {
    state.activeLocationIndex = index;
    localStorage.setItem('activeLocationIndex', index.toString());

    const loc = state.locations[index];
    elements.locationText.textContent = `${loc.city}, ${loc.country}`;
    fetchPrayerTimesByCity(loc.city, loc.country);

    renderLocationsList();
}

function updateLastReadUI() {
    if (state.lastRead) {
        elements.lastReadContainer.classList.remove('hidden');
        const ayahText = state.lastRead.ayah ? ` (${translate('verse')} ${state.lastRead.ayah + 1})` : '';
        elements.lastReadSurah.textContent = `${state.lastRead.name}${ayahText}`;
    } else {
        elements.lastReadContainer.classList.add('hidden');
    }
}

function setupIntersectionObserver() {
    observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const ayahIndex = parseInt(entry.target.dataset.index);
                if (!isNaN(ayahIndex) && state.currentSurah) {
                    // Update state and localStorage
                    state.lastRead = {
                        number: state.currentSurah.number,
                        name: state.currentSurah.englishName,
                        ayah: ayahIndex
                    };
                    localStorage.setItem('lastRead', JSON.stringify(state.lastRead));
                    updateLastReadUI();
                }
            }
        });
    }, {
        root: null, // viewport
        rootMargin: '-40% 0px -40% 0px', // Trigger when element is in the middle 20% of screen
        threshold: 0
    });
}

function setupEventListeners() {
    // Navigation
    elements.navItems.forEach(item => {
        item.addEventListener('click', () => {
            const targetId = item.dataset.target;
            if (!targetId) return;

            switchSection(targetId);

            elements.navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');
        });
    });

    // Search
    elements.surahSearch.addEventListener('input', (e) => {
        filterSurahs(e.target.value);
    });

    // Back button
    elements.backToSurahsBtn.addEventListener('click', () => {
        elements.quranReader.classList.add('hidden');
        elements.surahList.classList.remove('hidden');
        state.currentSurah = null; // Clear current surah when going back
    });

    // Audio Player
    elements.closeAudioBtn.addEventListener('click', () => {
        elements.mainAudioPlayer.pause();
        elements.audioPlayerContainer.classList.add('hidden');
    });

    // Reciter Selection
    elements.reciterSelect.addEventListener('change', (e) => {
        state.audioReciter = e.target.value;
        localStorage.setItem('audioReciter', state.audioReciter);
    });

    // Language Settings
    elements.langFrBtn.addEventListener('click', () => setLanguage('fr'));
    elements.langArBtn.addEventListener('click', () => setLanguage('ar'));
    elements.languageToggle.addEventListener('click', () => {
        setLanguage(state.language === 'fr' ? 'ar' : 'fr');
    });

    // Location Settings
    elements.addLocBtn.addEventListener('click', addLocation);

    // Quran Modes
    elements.modeTranslationBtn.addEventListener('click', () => setQuranMode('translation'));
    elements.modeMushafBtn.addEventListener('click', () => setQuranMode('mushaf'));

    // Continue Reading
    elements.continueReadBtn.addEventListener('click', () => {
        if (state.lastRead) {
            // Find surah object from state.surahs
            const surah = state.surahs.find(s => s.number === state.lastRead.number);
            if (surah) {
                switchSection('quran-section');
                elements.navItems.forEach(nav => nav.classList.remove('active'));
                document.querySelector('[data-target="quran-section"]').classList.add('active');
                openSurah(surah, state.lastRead.ayah);
            }
        }
    });

    // Duaa Search
    elements.duaaSearch.addEventListener('input', (e) => {
        filterDuaas(e.target.value);
    });

    // Duaa Modal
    elements.closeDuaaModal.addEventListener('click', closeDuaaModal);
    elements.duaaModal.addEventListener('click', (e) => {
        if (e.target === elements.duaaModal) closeDuaaModal();
    });
    elements.copyDuaaBtn.addEventListener('click', copyDuaaText);
}

function setQuranMode(mode) {
    state.quranMode = mode;
    localStorage.setItem('quranMode', mode);
    updateQuranModeUI();
}

function updateQuranModeUI() {
    if (state.quranMode === 'translation') {
        elements.modeTranslationBtn.classList.add('active');
        elements.modeMushafBtn.classList.remove('active');
        elements.ayahsContainer.classList.remove('mode-mushaf');
        elements.ayahsContainer.classList.add('mode-translation');
    } else {
        elements.modeTranslationBtn.classList.remove('active');
        elements.modeMushafBtn.classList.add('active');
        elements.ayahsContainer.classList.remove('mode-translation');
        elements.ayahsContainer.classList.add('mode-mushaf');
    }
}

function switchSection(sectionId) {
    Object.values(elements.sections).forEach(section => {
        section.classList.remove('active-section');
        section.classList.add('hidden-section');
    });
    elements.sections[sectionId].classList.remove('hidden-section');
    elements.sections[sectionId].classList.add('active-section');
}

// --- Geolocation & Prayer Times ---

async function fetchPrayerTimesByCity(city, country) {
    try {
        const date = new Date();
        const method = 2;
        const url = `https://api.aladhan.com/v1/timingsByCity/${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}?city=${encodeURIComponent(city)}&country=${encodeURIComponent(country)}&method=${method}`;

        const response = await fetch(url);
        const data = await response.json();

        if (data.code === 200) {
            state.prayerTimes = data.data.timings;
            renderPrayerTimes();
            startCountdown();
        }
    } catch (error) {
        console.error("Error fetching prayer times by city:", error);
        elements.prayerList.innerHTML = '<div class="error">Ville introuvable.</div>';
    }
}

function renderPrayerTimes() {
    elements.prayerList.innerHTML = '';
    const prayers = ['Fajr', 'Sunrise', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
    const prayerNames = {
        'Fajr': translate('prayer_fajr'),
        'Sunrise': translate('prayer_sunrise'),
        'Dhuhr': translate('prayer_dhuhr'),
        'Asr': translate('prayer_asr'),
        'Maghrib': translate('prayer_maghrib'),
        'Isha': translate('prayer_isha')
    };

    const now = new Date();
    let nextPrayerFound = false;

    prayers.forEach(prayer => {
        const time = state.prayerTimes[prayer];
        const [hours, minutes] = time.split(':');
        const prayerDate = new Date();
        prayerDate.setHours(parseInt(hours), parseInt(minutes), 0);

        const isNext = !nextPrayerFound && prayerDate > now && prayer !== 'Sunrise';

        if (isNext) {
            state.nextPrayer = { name: prayerNames[prayer], time: prayerDate };
            nextPrayerFound = true;
        }

        const item = document.createElement('div');
        item.className = `prayer-item ${isNext ? 'active' : ''}`;
        item.innerHTML = `
            <span class="prayer-name">${prayerNames[prayer]}</span>
            <span class="prayer-time">${time}</span>
        `;
        elements.prayerList.appendChild(item);
    });

    if (!nextPrayerFound) {
        const fajrTime = state.prayerTimes['Fajr'];
        const [fHours, fMinutes] = fajrTime.split(':');
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(parseInt(fHours), parseInt(fMinutes), 0);

        state.nextPrayer = { name: prayerNames['Fajr'], time: tomorrow };
    }

    updateHeroSection();
}

function updateHeroSection() {
    if (state.nextPrayer) {
        elements.nextPrayerName.textContent = state.nextPrayer.name;
    }
}

function startCountdown() {
    if (window.countdownInterval) clearInterval(window.countdownInterval);

    window.countdownInterval = setInterval(() => {
        if (!state.nextPrayer) return;

        const now = new Date();
        const diff = state.nextPrayer.time - now;

        if (diff < 0) {
            return;
        }

        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        elements.countdown.textContent =
            `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }, 1000);
}

function updateDate() {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const locale = state.language === 'ar' ? 'ar-SA' : 'fr-FR';
    elements.currentDate.textContent = new Date().toLocaleDateString(locale, options);
}

// --- Quran & Audio ---

async function loadSurahs() {
    try {
        const response = await fetch('https://api.alquran.cloud/v1/surah');
        const data = await response.json();

        if (data.code === 200) {
            state.surahs = data.data;
            renderSurahs(state.surahs);
            renderAudioSurahs(state.surahs);
        }
    } catch (error) {
        console.error("Error loading surahs:", error);
    }
}

function renderSurahs(surahs) {
    elements.surahList.innerHTML = '';
    surahs.forEach(surah => {
        const item = document.createElement('div');
        item.className = 'surah-item';
        item.onclick = () => openSurah(surah);
        item.innerHTML = `
            <div style="display: flex; align-items: center;">
                <div class="surah-number">${surah.number}</div>
                <div class="surah-info">
                    <span class="surah-name-en">${surah.englishName}</span>
                    <span class="surah-details">${surah.englishNameTranslation} • ${surah.numberOfAyahs} Versets</span>
                </div>
            </div>
            <div class="surah-name-ar">${surah.name}</div>
        `;
        elements.surahList.appendChild(item);
    });
}

function renderAudioSurahs(surahs) {
    elements.audioSurahList.innerHTML = '';
    surahs.forEach(surah => {
        const item = document.createElement('div');
        item.className = 'surah-item';
        item.onclick = () => playSurah(surah);
        item.innerHTML = `
            <div style="display: flex; align-items: center;">
                <div class="surah-number">${surah.number}</div>
                <div class="surah-info">
                    <span class="surah-name-en">${surah.englishName}</span>
                    <span class="surah-details">Écouter</span>
                </div>
            </div>
            <div class="surah-name-ar"><i class="fa-solid fa-play-circle" style="font-size: 1.5rem;"></i></div>
        `;
        elements.audioSurahList.appendChild(item);
    });
}

function filterSurahs(query) {
    const lowerQuery = query.toLowerCase();
    const filtered = state.surahs.filter(surah =>
        surah.englishName.toLowerCase().includes(lowerQuery) ||
        surah.englishNameTranslation.toLowerCase().includes(lowerQuery) ||
        surah.number.toString().includes(lowerQuery)
    );
    renderSurahs(filtered);
}

async function openSurah(surah, targetAyahIndex = 0) {
    state.currentSurah = surah; // Set current surah

    // Save Last Read (Initial save)
    state.lastRead = {
        number: surah.number,
        name: surah.englishName,
        ayah: targetAyahIndex
    };
    localStorage.setItem('lastRead', JSON.stringify(state.lastRead));
    updateLastReadUI();

    elements.surahList.classList.add('hidden');
    elements.quranReader.classList.remove('hidden');
    elements.readerSurahName.textContent = surah.name;
    elements.readerSurahInfo.textContent = `${surah.englishName} • ${surah.englishNameTranslation}`;
    elements.ayahsContainer.innerHTML = '<div class="loading-spinner"><i class="fa-solid fa-circle-notch fa-spin"></i> Chargement des versets...</div>';

    try {
        // Fetch Arabic and French concurrently
        const [arabicResponse, frenchResponse] = await Promise.all([
            fetch(`https://api.alquran.cloud/v1/surah/${surah.number}`),
            fetch(`https://api.alquran.cloud/v1/surah/${surah.number}/fr.hamidullah`)
        ]);

        const arabicData = await arabicResponse.json();
        const frenchData = await frenchResponse.json();

        if (arabicData.code === 200 && frenchData.code === 200) {
            renderAyahs(arabicData.data.ayahs, frenchData.data.ayahs);

            // Scroll to target ayah if specified
            if (targetAyahIndex > 0) {
                setTimeout(() => {
                    const targetElement = document.getElementById(`ayah-${targetAyahIndex}`);
                    if (targetElement) {
                        targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                }, 500); // Small delay to ensure rendering
            }
        }
    } catch (error) {
        elements.ayahsContainer.innerHTML = '<div class="error">Erreur de chargement.</div>';
        console.error(error);
    }
}

function renderAyahs(arabicAyahs, frenchAyahs) {
    elements.ayahsContainer.innerHTML = '';

    // Add Bismillah Header
    const bismillahDiv = document.createElement('div');
    bismillahDiv.className = 'bismillah';
    bismillahDiv.textContent = 'بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ';
    elements.ayahsContainer.appendChild(bismillahDiv);

    arabicAyahs.forEach((ayah, index) => {
        const frenchText = frenchAyahs[index] ? frenchAyahs[index].text : '';

        const div = document.createElement('div');
        div.className = 'ayah';
        div.id = `ayah-${index}`; // Add ID for scrolling
        div.dataset.index = index; // Add data attribute for observer
        div.innerHTML = `
            <div class="ayah-text">${ayah.text} <span class="ayah-number">${ayah.numberInSurah}</span></div>
            <div class="ayah-translation">${frenchText}</div>
        `;
        elements.ayahsContainer.appendChild(div);

        // Observe the element
        if (observer) observer.observe(div);
    });
}

function playSurah(surah) {
    elements.audioPlayerContainer.classList.remove('hidden');
    elements.audioSurahName.textContent = `Lecture : ${surah.englishName}`;

    // Use selected reciter
    const reciterId = state.audioReciter || 'ar.alafasy';
    const audioUrl = `https://cdn.islamic.network/quran/audio-surah/128/${reciterId}/${surah.number}.mp3`;

    elements.mainAudioPlayer.src = audioUrl;

    elements.mainAudioPlayer.onerror = () => {
        alert("Impossible de lire l'audio pour ce récitateur. Veuillez en choisir un autre.");
    };

    elements.mainAudioPlayer.play();
}

// --- Duaa Functions ---

function loadDuaaDatabase() {
    // Embedded data to avoid CORS issues with file:// protocol
    const duaaData = {
        "categories": [
            { "id": "morning", "name_fr": "Invocations du Matin", "name_ar": "أذكار الصباح", "icon": "🌅" },
            { "id": "evening", "name_fr": "Invocations du Soir", "name_ar": "أذكار المساء", "icon": "🌙" },
            { "id": "meals", "name_fr": "Repas", "name_ar": "الطعام", "icon": "🍽️" },
            { "id": "sleep", "name_fr": "Avant de Dormir", "name_ar": "النوم", "icon": "🛏️" },
            { "id": "travel", "name_fr": "Voyage", "name_ar": "السفر", "icon": "✈️" },
            { "id": "study", "name_fr": "Apprentissage", "name_ar": "العلم", "icon": "📖" },
            { "id": "work", "name_fr": "Travail", "name_ar": "العمل", "icon": "💼" },
            { "id": "health", "name_fr": "Santé et Guérison", "name_ar": "الصحة والشفاء", "icon": "🏥" },
            { "id": "general", "name_fr": "Invocations Générales", "name_ar": "أدعية عامة", "icon": "🤲" },
            { "id": "mosque", "name_fr": "Mosquée", "name_ar": "المسجد", "icon": "🕌" }
        ],
        "duaas": [
            { "id": 1, "category": "morning", "title_fr": "Protection du matin", "title_ar": "آية الكرسي", "arabic": "اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَّهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ", "translation_fr": "Allah ! Point de divinité à part Lui, le Vivant, Celui qui subsiste par Lui-même. Ni somnolence ni sommeil ne Le saisissent. À Lui appartient tout ce qui est dans les cieux et sur la terre.", "reference": "Sourate Al-Baqarah 2:255" },
            { "id": 2, "category": "morning", "title_fr": "Invocation du matin", "title_ar": "دعاء الصباح", "arabic": "أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ", "translation_fr": "Nous voici au matin et le royaume appartient à Allah. Louange à Allah. Il n'y a de divinité qu'Allah, Seul sans associé. À Lui la royauté, à Lui la louange et Il est Capable de toute chose.", "reference": "Hadith - Muslim" },
            { "id": 3, "category": "morning", "title_fr": "Tasbih du matin", "title_ar": "تسبيح الصباح", "arabic": "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ عَدَدَ خَلْقِهِ، وَرِضَا نَفْسِهِ، وَزِنَةَ عَرْشِهِ، وَمِدَادَ كَلِمَاتِهِ", "translation_fr": "Gloire et pureté à Allah selon le nombre de Ses créatures, selon Sa satisfaction, selon le poids de Son Trône et selon l'encre de Ses paroles.", "reference": "Hadith - Muslim" },
            { "id": 4, "category": "evening", "title_fr": "Invocation du soir", "title_ar": "دعاء المساء", "arabic": "أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ", "translation_fr": "Nous voici au soir et le royaume appartient à Allah. Louange à Allah. Il n'y a de divinité qu'Allah, Seul sans associé. À Lui la royauté, à Lui la louange et Il est Capable de toute chose.", "reference": "Hadith - Muslim" },
            { "id": 5, "category": "evening", "title_fr": "Protection du soir", "title_ar": "الحفظ المسائي", "arabic": "بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ", "translation_fr": "Au nom d'Allah avec le Nom duquel rien sur terre ni dans le ciel ne peut nuire, et Il est Celui qui entend et sait tout.", "reference": "Hadith - Tirmidhi" },
            { "id": 6, "category": "meals", "title_fr": "Avant de manger", "title_ar": "قبل الطعام", "arabic": "بِسْمِ اللَّهِ", "translation_fr": "Au nom d'Allah", "reference": "Hadith - Bukhari" },
            { "id": 7, "category": "meals", "title_fr": "Après avoir mangé", "title_ar": "بعد الطعام", "arabic": "الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنِي هَذَا وَرَزَقَنِيهِ مِنْ غَيْرِ حَوْلٍ مِنِّي وَلَا قُوَّةٍ", "translation_fr": "Louange à Allah qui m'a donné cette nourriture et me l'a accordée sans que j'en aie la force ni le pouvoir.", "reference": "Hadith - Tirmidhi" },
            { "id": 8, "category": "sleep", "title_fr": "Avant de dormir", "title_ar": "قبل النوم", "arabic": "بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا", "translation_fr": "En Ton nom, Ô Allah, je meurs et je vis.", "reference": "Hadith - Bukhari" },
            { "id": 9, "category": "sleep", "title_fr": "Protection avant le sommeil", "title_ar": "الحفظ عند النوم", "arabic": "اللَّهُمَّ قِنِي عَذَابَكَ يَوْمَ تَبْعَثُ عِبَادَكَ", "translation_fr": "Ô Allah, protège-moi de Ton châtiment le jour où Tu ressusciteras Tes serviteurs.", "reference": "Hadith - Abu Dawud" },
            { "id": 10, "category": "travel", "title_fr": "En montant dans un véhicule", "title_ar": "عند ركوب المركبة", "arabic": "سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَٰذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ وَإِنَّا إِلَىٰ رَبِّنَا لَمُنقَلِبُونَ", "translation_fr": "Gloire à Celui qui a mis ceci à notre service alors que nous n'étions pas capables de les dominer. Et c'est vers notre Seigneur que nous retournerons.", "reference": "Sourate Az-Zukhruf 43:13-14" },
            { "id": 11, "category": "travel", "title_fr": "Duaa du voyageur", "title_ar": "دعاء المسافر", "arabic": "اللَّهُمَّ إِنَّا نَسْأَلُكَ فِي سَفَرِنَا هَذَا الْبِرَّ وَالتَّقْوَى، وَمِنَ الْعَمَلِ مَا تَرْضَى", "translation_fr": "Ô Allah, nous Te demandons dans ce voyage la piété et la crainte révérencielle, et les œuvres qui T'agréent.", "reference": "Hadith - Muslim" },
            { "id": 12, "category": "study", "title_fr": "Avant l'étude", "title_ar": "قبل الدراسة", "arabic": "رَبِّ اشْرَحْ لِي صَدْرِي وَيَسِّرْ لِي أَمْرِي", "translation_fr": "Mon Seigneur, ouvre-moi ma poitrine et facilite-moi ma tâche.", "reference": "Sourate Ta-Ha 20:25-26" },
            { "id": 13, "category": "study", "title_fr": "Pour la connaissance", "title_ar": "للعلم", "arabic": "رَّبِّ زِدْنِي عِلْمًا", "translation_fr": "Mon Seigneur, augmente mes connaissances.", "reference": "Sourate Ta-Ha 20:114" },
            { "id": 14, "category": "work", "title_fr": "Avant le travail", "title_ar": "قبل العمل", "arabic": "اللَّهُمَّ إِنِّي أَسْأَلُكَ خَيْرَ هَذَا الْيَوْمِ وَأَعُوذُ بِكَ مِنْ شَرِّهِ", "translation_fr": "Ô Allah, je Te demande le bien de ce jour et je cherche refuge auprès de Toi contre son mal.", "reference": "Hadith" },
            { "id": 15, "category": "health", "title_fr": "Pour la guérison", "title_ar": "للشفاء", "arabic": "اللَّهُمَّ رَبَّ النَّاسِ، أَذْهِبِ الْبَأْسَ، اشْفِ أَنْتَ الشَّافِي، لَا شِفَاءَ إِلَّا شِفَاؤُكَ، شِفَاءً لَا يُغَادِرُ سَقَمًا", "translation_fr": "Ô Allah, Seigneur des gens, fais partir le mal, guéris, Tu es le Guérisseur, il n'y a de guérison que Ta guérison, une guérison qui ne laisse aucune maladie.", "reference": "Hadith - Bukhari" },
            { "id": 16, "category": "health", "title_fr": "Protection contre la maladie", "title_ar": "الحماية من المرض", "arabic": "اللَّهُمَّ عَافِنِي فِي بَدَنِي، اللَّهُمَّ عَافِنِي فِي سَمْعِي، اللَّهُمَّ عَافِنِي فِي بَصَرِي", "translation_fr": "Ô Allah, accorde-moi la santé dans mon corps, Ô Allah, accorde-moi la santé dans mon ouïe, Ô Allah, accorde-moi la santé dans ma vue.", "reference": "Hadith - Abu Dawud" },
            { "id": 17, "category": "general", "title_fr": "Demander le pardon", "title_ar": "الاستغفار", "arabic": "أَسْتَغْفِرُ اللَّهَ الْعَظِيمَ الَّذِي لَا إِلَهَ إِلَّا هُوَ الْحَيَّ الْقَيُّومَ وَأَتُوبُ إِلَيْهِ", "translation_fr": "Je demande pardon à Allah le Très Grand, il n'y a de divinité que Lui, le Vivant, Celui qui subsiste par Lui-même, et je me repens à Lui.", "reference": "Hadith" },
            { "id": 18, "category": "general", "title_fr": "Pour la satisfaction", "title_ar": "للرضا", "arabic": "رَضِيتُ بِاللَّهِ رَبًّا، وَبِالْإِسْلَامِ دِينًا، وَبِمُحَمَّدٍ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ نَبِيًّا", "translation_fr": "J'agrée Allah comme Seigneur, l'Islam comme religion et Muhammad (paix et bénédiction sur lui) comme Prophète.", "reference": "Hadith - Tirmidhi" },
            { "id": 19, "category": "general", "title_fr": "Duaa universel", "title_ar": "دعاء شامل", "arabic": "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ", "translation_fr": "Notre Seigneur, accorde-nous une belle part ici-bas, et une belle part dans l'au-delà, et protège-nous du châtiment du Feu.", "reference": "Sourate Al-Baqarah 2:201" },
            { "id": 20, "category": "mosque", "title_fr": "En entrant dans la mosquée", "title_ar": "عند دخول المسجد", "arabic": "اللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ", "translation_fr": "Ô Allah, ouvre-moi les portes de Ta miséricorde.", "reference": "Hadith - Muslim" },
            { "id": 21, "category": "mosque", "title_fr": "En sortant de la mosquée", "title_ar": "عند الخروج من المسجد", "arabic": "اللَّهُمَّ إِنِّي أَسْأَلُكَ مِنْ فَضْلِكَ", "translation_fr": "Ô Allah, je Te demande de Ta grâce.", "reference": "Hadith - Muslim" }
        ]
    };

    state.duaaCategories = duaaData.categories;
    state.duaas = duaaData.duaas;

    renderDuaaCategories();
    renderDuaas(state.duaas);
}

function renderDuaaCategories() {
    elements.duaaCategories.innerHTML = '';

    // Add "All" category
    const allCat = document.createElement('button');
    allCat.className = `duaa-category-btn ${state.selectedDuaaCategory === null ? 'active' : ''}`;
    allCat.textContent = translate('all_duaas');
    allCat.onclick = () => selectDuaaCategory(null);
    elements.duaaCategories.appendChild(allCat);

    state.duaaCategories.forEach(cat => {
        const btn = document.createElement('button');
        btn.className = `duaa-category-btn ${state.selectedDuaaCategory === cat.id ? 'active' : ''}`;
        btn.innerHTML = `${cat.icon} ${state.language === 'ar' ? cat.name_ar : cat.name_fr}`;
        btn.onclick = () => selectDuaaCategory(cat.id);
        elements.duaaCategories.appendChild(btn);
    });
}

function selectDuaaCategory(categoryId) {
    state.selectedDuaaCategory = categoryId;
    renderDuaaCategories();

    if (categoryId === null) {
        renderDuaas(state.duaas);
    } else {
        const filtered = state.duaas.filter(d => d.category === categoryId);
        renderDuaas(filtered);
    }
}

function renderDuaas(duaas) {
    elements.duaaList.innerHTML = '';

    if (duaas.length === 0) {
        elements.duaaList.innerHTML = '<p class="no-results">Aucune invocation trouvée.</p>';
        return;
    }

    duaas.forEach(duaa => {
        const item = document.createElement('div');
        item.className = 'duaa-item';
        item.onclick = () => openDuaaModal(duaa);
        item.innerHTML = `
            <div class="duaa-item-title">${state.language === 'ar' ? duaa.title_ar : duaa.title_fr}</div>
            <div class="duaa-item-arabic">${duaa.arabic.substring(0, 80)}...</div>
        `;
        elements.duaaList.appendChild(item);
    });
}

function filterDuaas(query) {
    const lowerQuery = query.toLowerCase();
    let filtered = state.duaas;

    if (state.selectedDuaaCategory !== null) {
        filtered = filtered.filter(d => d.category === state.selectedDuaaCategory);
    }

    filtered = filtered.filter(duaa =>
        duaa.title_fr.toLowerCase().includes(lowerQuery) ||
        duaa.title_ar.includes(query) ||
        duaa.arabic.includes(query) ||
        duaa.translation_fr.toLowerCase().includes(lowerQuery)
    );

    renderDuaas(filtered);
}

function openDuaaModal(duaa) {
    elements.duaaModalTitle.textContent = state.language === 'ar' ? duaa.title_ar : duaa.title_fr;
    elements.duaaModalArabic.textContent = duaa.arabic;
    elements.duaaModalTranslation.textContent = duaa.translation_fr;
    elements.duaaModalReference.textContent = duaa.reference;

    // Store current duaa for copying
    elements.duaaModal.dataset.currentDuaa = JSON.stringify(duaa);

    elements.duaaModal.classList.remove('hidden');
}

function closeDuaaModal() {
    elements.duaaModal.classList.add('hidden');
}

function copyDuaaText() {
    const duaa = JSON.parse(elements.duaaModal.dataset.currentDuaa);
    const text = `${duaa.arabic}\n\n${duaa.translation_fr}\n\n${duaa.reference}`;

    navigator.clipboard.writeText(text).then(() => {
        const originalText = elements.copyDuaaBtn.querySelector('span').textContent;
        elements.copyDuaaBtn.querySelector('span').textContent = translate('copied');
        setTimeout(() => {
            elements.copyDuaaBtn.querySelector('span').textContent = translate('copy');
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy:', err);
    });
}

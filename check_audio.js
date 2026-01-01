const https = require('https');

const reciters = [
    { name: 'Alafasy', id: 'ar.alafasy' },
    { name: 'Abdul Basit', id: 'ar.abdulbasitmurattal' },
    { name: 'Sudais', id: 'ar.abdurrahmaansudais' },
    { name: 'Ghamdi', id: 'ar.saadalghamdi' },
    { name: 'Shatri', id: 'ar.shaatree' }
];

const surah = 1; // Al-Fatiha

reciters.forEach(reciter => {
    const url = `https://cdn.islamic.network/quran/audio-surah/128/${reciter.id}/${surah}.mp3`;

    const req = https.request(url, { method: 'HEAD' }, (res) => {
        console.log(`${reciter.name} (${reciter.id}): ${res.statusCode}`);
    });

    req.on('error', (e) => {
        console.error(`${reciter.name}: Error ${e.message}`);
    });

    req.end();
});

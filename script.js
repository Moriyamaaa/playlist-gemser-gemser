// Mendapatkan elemen-elemen penting dari HTML
const audio = new Audio();
const playBtn = document.getElementById('play-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const progressBar = document.getElementById('progress-bar');
const currentTimeElem = document.getElementById('current-time');
const totalDurationElem = document.getElementById('total-duration');
const trackList = document.getElementById('track-list');
const playlist = document.querySelector('.playlist');
const toggleBtn = document.querySelector('.toggle-btn');

let currentTrackIndex = 0;
let isPlaying = false;

// Daftar lagu (array)
const tracks = [
{
    name: 'Hard 2 Face Reality',
    artist: 'Justin Bieber',
    src: 'https://l.top4top.io/m_31797vmts2.mp3',
    cover: 'https://f.top4top.io/p_31795knrj1.jpeg'
},
{
    name: 'We Dont Talk',
    artist: 'Charlie Puth',
    src: 'https://k.top4top.io/m_3179utdug1.mp3',
    cover: 'https://g.top4top.io/p_317900nqz2.jpeg'
},
{
    name: 'Est-ce que tu maimes',
    artist: 'Maitre Gims',
    src: 'https://j.top4top.io/m_3180651rn0.mp3',
    cover: 'https://g.top4top.io/p_3180goh271.jpeg'
},
{
    name: 'End Of Beginning',
    artist: 'Djo',
    src: 'https://k.top4top.io/m_31809kncc0.mp3',
    cover: 'https://f.top4top.io/p_3180zg6rc0.jpeg'
},
    {
    name: 'Bunga Abadi',
    artist: 'Rio Clappy',
    src: 'https://i.top4top.io/m_3180o83gz0.mp3',
    cover: 'https://e.top4top.io/p_31807mhmx0.jpeg'
},
{
    name: 'Baby By Me',
    artist: '50 Cent',
    src: 'https://a.top4top.io/m_31795nnty3.mp3',
    cover: 'https://h.top4top.io/p_31796wy6h3.jpeg'
}
];

// Memuat lagu berdasarkan index
function loadTrack(index) {
    const track = tracks[index];
    audio.src = track.src;
    document.querySelector('.track-info h2').textContent = track.name;
    document.querySelector('.track-info h3').textContent = track.artist;
    document.querySelector('.track-info img').src = track.cover;

    audio.addEventListener('loadedmetadata', () => {
        totalDurationElem.textContent = formatTime(audio.duration);
        progressBar.max = audio.duration;
    });
}

// Format waktu dalam menit:detik
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

// Update progress bar dan waktu saat lagu diputar
audio.addEventListener('timeupdate', () => {
    progressBar.value = audio.currentTime;
    currentTimeElem.textContent = formatTime(audio.currentTime);
});

// Fungsionalitas tombol play/pause
playBtn.addEventListener('click', () => {
    if (isPlaying) {
        audio.pause();
        playBtn.innerHTML = '<i class="fas fa-play"></i>';
    } else {
        audio.play();
        playBtn.innerHTML = '<i class="fas fa-pause"></i>';
    }
    isPlaying = !isPlaying;
});

// Fungsionalitas tombol next
nextBtn.addEventListener('click', () => {
    currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
    loadTrack(currentTrackIndex);
    if (isPlaying) audio.play();
});

// Fungsionalitas tombol prev
prevBtn.addEventListener('click', () => {
    currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
    loadTrack(currentTrackIndex);
    if (isPlaying) audio.play();
});

// Fungsionalitas ketika pengguna mengklik progress bar
progressBar.addEventListener('input', () => {
    audio.currentTime = progressBar.value;
});

// Mengisi daftar playlist
tracks.forEach((track, index) => {
    const li = document.createElement('li');
    li.textContent = `${track.name} - ${track.artist}`;
    li.addEventListener('click', () => {
        loadTrack(index);
        if (isPlaying) audio.play();
        // Tutup playlist otomatis setelah lagu diklik
        playlist.classList.remove('show');
    });
    trackList.appendChild(li);
});

// Fungsionalitas tombol toggle untuk menampilkan/menyembunyikan playlist
toggleBtn.addEventListener('click', () => {
    playlist.classList.toggle('show');
});

// Memuat lagu pertama saat halaman dimuat
loadTrack(currentTrackIndex);
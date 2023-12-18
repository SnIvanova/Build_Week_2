//Parameter: album id
//Endpoint: https://striveschool-api.herokuapp.com/api/deezer/album/{id}

//esempio 'https://striveschool-api.herokuapp.com/api/deezer/album/75621062';

let selectedsong;
let progressBarElement;
let currentTimeElement;
const audioElements = [];

document.addEventListener('DOMContentLoaded', () => {
    fetchAlbumData();
  });
  //${albumId }
  async function fetchAlbumData() {
    const albumId = new URLSearchParams(location.search).get('album');
    const albumUrl = `https://striveschool-api.herokuapp.com/api/deezer/album/302127`;

    try {
        const response = await fetch(albumUrl + albumId);

        if (!response.ok) {
            throw new Error(`Error Status: ${response.status} ${response.statusText}`);
        }

        const albumData = await response.json();
        displayAlbumData(albumData);
    } catch (error) {
        console.error('Error fetching album data:', error);
    }
}
  
function displayAlbumData(albumData) {
    const albumContainer = document.querySelector('#albumContainer');

    if (!albumContainer) {
        console.error('ID "albumContainer" not found.');
        return;
    }

    if (!albumData || !albumData.tracks || !albumData.tracks.data) {
        console.error('Invalid album data:', albumData);
        return;
    }

    const albumInfoDiv = document.createElement('div');
    albumInfoDiv.classList.add('album-info', 'd-flex', 'align-items-center');

    const albumImage = document.createElement('img');
    albumImage.src = albumData.cover_medium;
    albumImage.alt = albumData.title;
    albumInfoDiv.appendChild(albumImage);

    const textInfoDiv = document.createElement('div');
    textInfoDiv.classList.add('p-3');
    albumInfoDiv.appendChild(textInfoDiv);

    const albumTitle = document.createElement('h1');
    albumTitle.textContent = albumData.title;
    textInfoDiv.appendChild(albumTitle);

    const albumInfoArtist = document.createElement('p');
    albumInfoArtist.textContent = `${albumData.artist.name} ${albumData.release_date} ${albumData.nb_tracks} ${msToMinutesAndSeconds(albumData.duration)}`;
    textInfoDiv.appendChild(albumInfoArtist);

    albumContainer.appendChild(albumInfoDiv);

    const albumTable = document.querySelector('#albumData');

    if (!albumTable) {
        console.error('ID "albumData" not found.');
        return;
    }

    const table = document.createElement('table');
    table.classList.add('table', 'table-dark');

    const headerRow = table.createTHead().insertRow();
    headerRow.innerHTML = '<th scope="col" class="col-1">#</th><th scope="col" class="col-6">Title</th><th scope="col" class="col-2">Riproduzioni</th><th scope="col" class="col-1"><i class="bi bi-clock"></i></th>';

    const tbody = table.createTBody();

    const tracks = albumData.tracks.data;

    if (!tracks || !Array.isArray(tracks)) {
        console.error('Invalid tracks data:', tracks);
        return;
    }

    tracks.forEach((track, index) => {
        const audio = new Audio(track.preview);
        audioElements.push(audio);

        const row = tbody.insertRow();
        row.innerHTML = `<td class='song' data-index="${index + 1}">${index + 1}</td><td class='song-title' data-index="${index + 1}">${track.title}</td><td>${Rankcalc(track.rank)}</td><td>${msToMinutesAndSeconds(track.duration)}</td>`;
    });

    albumTable.appendChild(table);

    const tbodyElement = document.querySelector('tbody');

    tbodyElement.addEventListener('click', (event) => {
        const clickedElement = event.target;
        const isSong = clickedElement.classList.contains('song') || clickedElement.classList.contains('song-title');

        if (isSong) {
            const selectedindex = clickedElement.getAttribute('data-index') - 1;
            selectedTrack = tracks[selectedindex];
            updateFooter(selectedTrack);
            updateProgressBar(selectedTrack);
        }
    });
}


function updateFooter(selectedTrack) {
    const footerImg = document.getElementById('albumCoverBtm');
    const songNameBtm = document.getElementById('songNameBtm');
    const artistNameBtm = document.getElementById('artistNameBtm');

    footerImg.querySelector('img').src = selectedTrack.album.cover_medium;
    songNameBtm.textContent = selectedTrack.title;
    artistNameBtm.textContent = selectedTrack.artist.name;
}

function playPauseToggle() {
    const playButtonIcon = document.getElementById('playButton').querySelector('i');

    if (selectedsong.paused) {
        selectedsong.play();
        playButtonIcon.className = 'bi bi-pause-circle-fill';
    } else {
        selectedsong.pause();
        playButtonIcon.className = 'bi bi-play-circle-fill';
    }

    updateProgressBar(selectedsong);

    selectedsong.addEventListener('playing', () => {
        playButtonIcon.className = 'bi bi-pause-circle-fill';
    });

    selectedsong.addEventListener('pause', () => {
        playButtonIcon.className = 'bi bi-play-circle-fill';
    });
}

function updateProgressBar(selectedTrack) {
    const progressBarElement = document.getElementById('progressBar');
    const currentTimeElement = document.getElementById('currentTime');

    const selectedsong = audioElements.find(audio => audio.src === selectedTrack.preview);

    selectedsong.addEventListener('timeupdate', () => {
        const currentTime = msToMinutesAndSeconds(selectedsong.currentTime);
        const progressBarWidth = (selectedsong.currentTime / selectedsong.duration) * 100;

        currentTimeElement.textContent = currentTime;
        progressBarElement.style.width = `${progressBarWidth}%`;
    });
}

function Rankcalc(rank) {
    const numRank = parseFloat(rank);
    return numRank.toLocaleString();
}

function msToMinutesAndSeconds(ms) {
    const minutes = Math.floor(ms / 60);
    const seconds = Math.floor(ms % 60);
    return seconds === 60 ? (minutes + 1) + ":00" : minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
}
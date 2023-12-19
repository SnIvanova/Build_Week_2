// Parameter: album id
// Endpoint: https://striveschool-api.herokuapp.com/api/deezer/album/{id}

// Esempio 'https://striveschool-api.herokuapp.com/api/deezer/album/75621062';

let selectedTrack;
let progressBarElement;
let currentTimeElement;
const audioElements = [];

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const albumId = urlParams.get('album');

    fetchAlbumData(albumId);
  });
  
  async function fetchAlbumData() {
    const albumUrl = 'https://striveschool-api.herokuapp.com/api/deezer/album/';
    
    const urlParams = new URLSearchParams(window.location.search);
    const albumId = urlParams.get('id');
  
    
    if (!albumId) {
      console.error('Invalid album ID:', albumId);
      return;
    }
  
    const fullUrl = `${albumUrl}${albumId}`;
  
    try {
      const response = await fetch(fullUrl);
  
      if (!response.ok) {
        console.error('Error Status:', response.status, response.statusText);
        const errorResponse = await response.json();
        console.error('Error Response:', errorResponse);
        throw new Error(`Error Status: ${response.status} ${response.statusText}`);
      }
  
      const responseData = await response.json();
  
      if (responseData.error) {
        console.error('API Error:', responseData.error.message);
        throw new Error(`API Error: ${responseData.error.message}`);
      }
  
      if (!responseData.tracks || !responseData.tracks.data) {
        console.error('Invalid album data: Missing tracks data');
        throw new Error('Invalid album data: Missing tracks data');
      }
  
      displayAlbumData(responseData);
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
  const releaseYear = new Date(albumData.release_date).getFullYear();
  albumInfoArtist.textContent = `${albumData.artist.name} ${releaseYear} ${albumData.nb_tracks} songs ${msToMinutesAndSeconds(albumData.duration)} minutes`;
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
  const footerImg = document.querySelector('#albumCoverBtm');
  const songNameBtm = document.querySelector('#songNameBtm');
  const artistNameBtm = document.querySelector('#artistNameBtm');

  footerImg.querySelector('img').src = selectedTrack.album.cover_medium;
  songNameBtm.textContent = selectedTrack.title;
  artistNameBtm.textContent = selectedTrack.artist.name;
}

function playPauseToggle() {
  const playButtonIcon = document.getElementById('playButton').querySelector('i');

  if (selectedTrack.preview.paused) {
    selectedTrack.preview.play();
    playButtonIcon.className = 'bi bi-pause-circle-fill';
  } else {
    selectedTrack.preview.pause();
    playButtonIcon.className = 'bi bi-play-circle-fill';
  }

  updateProgressBar(selectedTrack);

  selectedTrack.preview.addEventListener('playing', () => {
    playButtonIcon.className = 'bi bi-pause-circle-fill';
  });

  selectedTrack.preview.addEventListener('pause', () => {
    playButtonIcon.className = 'bi bi-play-circle-fill';
  });
}

function updateProgressBar(selectedTrack) {
  const progressBarElement = document.getElementById('progressBar');
  const currentTimeElement = document.getElementById('currentTime');

  const selectedsong = audioElements.find(audio => audio.src === selectedTrack.preview.src);

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

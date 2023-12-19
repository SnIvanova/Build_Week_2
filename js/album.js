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
      }
  
      const responseData = await response.json();
  
      if (responseData.error) {
        console.error('API Error:', responseData.error.message);
      }
  
      if (!responseData.tracks || !responseData.tracks.data) {
        console.error('Invalid album data: Missing tracks data');
      }
  
      displayAlbumData(responseData);
    } catch (error) {
      console.error('Error fetching album data:', error);
    }
  }
  
  

function displayAlbumData(albumData) {
  const homeContainer = document.querySelector('#home');
  const albumContainer = document.querySelector('#albumContainer');

  if (!albumContainer) {
    console.error('ID "albumContainer" not found.');
    return;
  }
  if (!homeContainer) {
    console.error('ID "home" not found.');
    return;
}

  if (!albumData || !albumData.tracks || !albumData.tracks.data) {
    console.error('Invalid album data:', albumData);
    return;
  }

  const albumInfoDiv = document.createElement('div');
  albumInfoDiv.classList.add('album-info', 'd-flex', 'align-items-center');

  const albumImage = document.createElement('img');
  albumImage.crossOrigin = 'Anonymous';
  albumImage.src = albumData.cover_medium;
  albumImage.alt = albumData.title;


  const colorThiefPromise = new Promise((resolve) => {
    albumImage.addEventListener('load', function () {
        const colorThief = new ColorThief();
        const colorPalette = colorThief.getPalette(albumImage, 10); // Increase the number of colors

        // Ensure the color palette is not empty
        if (colorPalette && colorPalette.length > 0) {
            // Sort the colors by brightness
            colorPalette.sort((color1, color2) => {
                // Calculate brightness: (0.299*R + 0.587*G + 0.114*B)
                const brightness1 = 0.299 * color1[0] + 0.587 * color1[1] + 0.114 * color1[2];
                const brightness2 = 0.299 * color2[0] + 0.587 * color2[1] + 0.114 * color2[2];
                return brightness2 - brightness1; // Sort in descending order
            });

            resolve(colorPalette);
        } else {
            console.error('Empty or invalid color palette');
            resolve(null);
        }
    });
});

colorThiefPromise.then((colorPalette) => {
    if (colorPalette) {
        console.log('Color Palette:', colorPalette);

        const gradientColors = generateGradientColors(colorPalette, 10);

        if (gradientColors && gradientColors.length > 0) {
            console.log('Gradient Colors:', gradientColors);
            homeContainer.style.backgroundImage = `linear-gradient(to bottom, ${gradientColors.join(', ')})`;
           // const albumDataContainer = document.getElementById('albumData');
            //albumDataContainer.style.backgroundImage = `linear-gradient(to bottom, ${gradientColors.join(', ')})`;
            //const albumTable = document.querySelector('.table-dark');
            //albumTable.style.backgroundImage = `linear-gradient(to bottom, ${gradientColors.join(', ')})`;
        } else {
            console.error('Empty or invalid gradient colors');
        }
    }
});

function generateGradientColors(colorPalette, steps) {
    const gradientColors = [];
    
    if (colorPalette && colorPalette.length > 0) {
        const stepSize = 1 / (steps - 1);

        for (let i = 0; i < steps; i++) {
            const blendFactor = i * stepSize;
            const blendedColor = colorPalette.reduce((acc, cur) => {
                return acc.map((channel, index) => {
                    return Math.round(channel + (cur[index] - channel) * blendFactor);
                });
            });

            gradientColors.push(`rgb(${blendedColor.join(',')})`);
        }
    } else {
        console.error('Empty or invalid color palette in generateGradientColors');
    }

    return gradientColors;
}

  


  albumInfoDiv.appendChild(albumImage);

  const textInfoDiv = document.createElement('div');
  textInfoDiv.classList.add('p-3', 'col', 'align-self-end');
  textInfoDiv.textContent = 'Album'
  albumInfoDiv.appendChild(textInfoDiv);



  const albumTitle = document.createElement('h1');
  albumTitle.classList.add('strong');
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
  table.classList.add('table', 'table-dark', 'table-hover', 'table-borderless', 'bg-opacity-light');
  //table.style.addStyle('background-color : #21252933 ')
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

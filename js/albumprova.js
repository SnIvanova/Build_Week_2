

document.addEventListener('DOMContentLoaded', () => {
  fetchAlbumData();
});
//${albumId }
async function fetchAlbumData() {
  const albumId = new URLSearchParams(location.search).get('album');;
  const albumUrl = `https://striveschool-api.herokuapp.com/api/deezer/album/75621062`;

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

  const albumInfoDiv = document.createElement('div');
  albumInfoDiv.classList.add('album-info');
  albumInfoDiv.classList.add('d-flex');
  albumInfoDiv.classList.add('align-items-center');



  const albumImage = document.createElement('img');
  albumImage.src = albumData.cover_medium;
  
  albumImage.alt = albumData.title;
  albumInfoDiv.appendChild(albumImage);

  const albumTitle = document.createElement('h2');
  albumTitle.textContent = albumData.title;
  albumInfoDiv.appendChild(albumTitle);
  albumContainer.appendChild(albumInfoDiv);


  const albumTable = document.querySelector('#albumData');

  if (!albumTable) {
    console.error(' ID "albumData" not found.');
    return;
  }

  const table = document.createElement('table');
  table.classList.add('table', 'table-dark');

  const headerRow = table.createTHead().insertRow();
  headerRow.innerHTML = '<th scope="col" class="col-1">#</th><th scope="col"  class="col-6">Title</th><th scope="col"  class="col-2">Riproduzioni</th><th scope="col" class="col-1"><i class="bi bi-clock"></i></th>';

  const tbody = table.createTBody();


  const tracks = albumData.tracks ? albumData.tracks.data : albumData.data;

  tracks.forEach((track, index) => {
    console.log('ms:', track.duration);
    const row = tbody.insertRow();
    row.innerHTML = `<td>${index + 1}</td><td>${track.title}</td><td>${Rankcalc(track.rank)}</td><td>${msToMinutesAndSeconds(track.duration)}</td>`;
  });

  albumTable.appendChild(table);
}


function Rankcalc(rank) {
  const numRank = parseFloat(rank);
  return numRank.toLocaleString();
}


function msToMinutesAndSeconds(ms) {
  const minutes = Math.floor(ms / 60);
  const seconds = Math.floor(ms % 60);
  console.log('minutes:', minutes, 'seconds:', seconds);

  return (
    seconds === 60? (minutes + 1) + ":00": minutes + ":" + (seconds < 10 ? "0" : "") + seconds);
}
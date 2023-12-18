

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
  const albumTable = document.querySelector('#albumData');

  if (!albumTable) {
    console.error(' ID "albumData" not found.');
    return;
  }

  const table = document.createElement('table');
  table.classList.add('table', 'table-dark');

  const headerRow = table.createTHead().insertRow();
  headerRow.innerHTML = '<th scope="col">#</th><th scope="col">Title</th><th scope="col">Duration</th><th scope="col"><i class="bi bi-clock"></i></th>';

  const tbody = table.createTBody();


  const tracks = albumData.tracks ? albumData.tracks.data : albumData.data;

  tracks.forEach((track, index) => {
    console.log('ms:', track.duration);
    const row = tbody.insertRow();
    row.innerHTML = `<td>${index + 1}</td><td>${track.title}</td><td>${msToMinutesAndSeconds(track.duration)}</td><td>${track.rank}</td>`;
  });

  albumTable.appendChild(table);
}

function msToMinutesAndSeconds(ms) {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  console.log('minutes:', minutes, 'seconds:', seconds);
  return `${minutes}:${(seconds < 10 ? '0' : '')}${seconds}`;
}
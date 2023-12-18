document.addEventListener('DOMContentLoaded', () => {
  if (window.location.pathname.includes('home.html')) {

  // Funzione che crea un elemento card
  function createAlbumCard(album) { //CREATORE DI CARD
    const card = document.createElement("a");
    card.href = "album.html";
    card.classList.add("col-2", "my-2", "mx-2", "bgSched", "bg-opacity-50", "text-white", "rounded-3", "text-decoration-none");
  
    const AlbumImage = document.createElement("img");
    AlbumImage.src = album.cover;
    AlbumImage.alt = "cover_album";
    AlbumImage.style.width = "100%";
    AlbumImage.classList.add("mt-2", "p-0", "m-0", "rounded-3");
  
    const AlbumName = document.createElement("p");
    AlbumName.classList.add("fw-bold", "pb-0", "mb-0", "mt-3");
    AlbumName.textContent = album.title;
  
    const AlbumArtist = document.createElement("p");
    AlbumArtist.classList.add("text-opacity-25", "text-white", "fs-7", "fw-bold");
    AlbumArtist.textContent = album.artist.name;

    const AlbumId = document.createElement("p");
    AlbumId.classList.add("d-none");
    AlbumId.textContent = album.id;
  
    card.appendChild(AlbumImage);
    card.appendChild(AlbumName);
    card.appendChild(AlbumArtist);
    card.appendChild(AlbumId);
  
    return card;
  }
  
function displayAlbum(album) {
  const albumContainer = document.querySelector(".albumContainer");

  const card = createAlbumCard(album);
  albumContainer.appendChild(card);
}

async function getIdAPI() {
  let albumId = 302127;

  for (let i = 0; i <= 16; i++) {
    try {
      const response = await fetch(`https://striveschool-api.herokuapp.com/api/deezer/album/${albumId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (data.cover) {
        displayAlbum(data);
      }

      albumId++;
    } catch (error) {
      console.error("Errore durante il recupero dei dati:", error);
    }
  }
}

getIdAPI();

//FUNZIONE PER CREAZIONE BANNER PUBBLICITARIO
function createAlbumBanner(album) { //CREATORE DI CARD
  const card = document.createElement("div"); // contenitore banner
  card.classList.add("d-flex", "rounded-1");

  card.innerHTML= `
                      <div class="d-flex rounded-1">
                        <img src="${album.cover}" alt="album_cover" class="my-4 mx-3" style="height: 200px;">
                        <div class="text-white my-3 me-3" style="width: 100%;">
                            <div class="d-flex justify-content-between">
                                <p id="albumNameHomeHeader" class="fw-bold">ALBUM</p>
                                <button id="buttonHeaderHome" class="rounded-5 text-secondary px-3 bg-secondary bg-opacity-10 border-0 fw-bold">
                                        NASCONDI ANNUNCI
                                </button>
                            </div>
                            <h3 class="fs-1 fw-bold mb-0">${album.title}</h3>
                            <p class="mt-0">${album.artist.name}</p>
                            <p>Ascolta il nuovo singolo di <span>${album.artist.name}</span>!</p>
                            <nav class="d-flex align-content-center">
                                <div class="greenBtn mx-2 px-4 py-2 rounded-5 btn btn-success text-black fw-semibold">
                                    Play
                                </div>
                                <div class="mx-2 px-4 py-2 rounded-5 btn btn-outline-light btn-text-light fw-semibold">
                                    Salva
                                </div>
                                <div class="dropdown">
                                    <button class="btn btn-outline-light border-0 mx-2 px-4 py-2 rounded-5" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        <i class="bi bi-three-dots"></i>
                                    </button>
                                    <ul class="dropdown-menu dropdown-menu-dark">
                                        <li><a class="dropdown-item" href="#">Aggiungi alla playlist</a></li>
                                        <li><a class="dropdown-item" href="#">Salva in preferiti</a></li>
                                        <li><a class="dropdown-item" href="#">Non seguire questo artista</a></li>
                                    </ul>
                                </div>
                                </div>
                            </nav>
                            <p class="d-none">${album.id}</p>
                        </div>
  `;

  return card;
}

function displayBanner(album) {
  const bannerContainer = document.querySelector("header");

  const banner = createAlbumBanner(album);
  bannerContainer.appendChild(banner);
}

async function getIdBanner() {
  let albumId = 302127;

  
    try {
      const response = await fetch(`https://striveschool-api.herokuapp.com/api/deezer/album/${albumId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (data.cover) {
        displayBanner(data);
      }

      albumId++;
    } catch (error) {
      console.error("Errore durante il recupero dei dati:", error);
    }
  
}

getIdBanner();

}}); //CHIUSURA CONTENT LOAD E IF 


/*        https://api.deezer.com/album/302127?note=5&request_method=Get */
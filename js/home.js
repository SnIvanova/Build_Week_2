document.addEventListener('DOMContentLoaded', () => {
  const button = document.querySelector('#buttonHeaderHome');
  const header = document.querySelector('header');

  button.addEventListener('click', () => {
    header.classList.add('d-none');
  });

  // Funzione che crea un elemento card
  function createAlbumCard(album) {
    const card = document.createElement("a");
    card.href = "#";
    card.classList.add("col-2", "my-2", "mx-2", "bgSched", "bg-opacity-50", "text-white", "rounded-3", "text-decoration-none");
  
    const AlbumImage = document.createElement("img");
    AlbumImage.src = album.imageUrl;
    AlbumImage.alt = "";
    AlbumImage.style.width = "100%";
    AlbumImage.classList.add("mt-2", "p-0", "m-0", "rounded-3");
  
    const AlbumName = document.createElement("p");
    AlbumName.classList.add("fw-bold", "pb-0", "mb-0", "mt-3");
    AlbumName.textContent = album.title;
  
    const AlbumDescription = document.createElement("p");
    AlbumDescription.classList.add("text-opacity-25", "text-white", "fs-7", "fw-bold");
    AlbumDescription.textContent = album.description;
  
    card.appendChild(AlbumImage);
    card.appendChild(AlbumName);
    card.appendChild(AlbumDescription);
  
    return card;
  }

  function displayAlbums(albums) {
    const albumContainer = document.querySelector("#albumContainer");
    let count = 0; // Counter variable
    
    albums.forEach((album) => {
      if (count < 20) { // Only display 20 albums
        const card = createAlbumCard(album);
        albumContainer.appendChild(card);
        count++; // Increment the counter
      } else {
        return; // Exit the loop after displaying 20 albums
      }
    });
  }

});

fetch("https://striveschool-api.herokuapp.com/api/deezer/album/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((response) => response.json())
      .then((data) => {
        const matchingAlbum = data.find((album) => album.name === albumName);
        if (matchingAlbum) {
          const AlbumId = matchingAlbum.id;
        } else {
          console.error("Album non trovato nella risposta dell'API");
        }
      })
      .catch((error) => {
        console.error("Errore durante il recupero dei dati:", error);
      });

      fetch("https://api.deezer.com/album/302127", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          // Gestisce i dati ottenuti
          const albumContainer = document.querySelector("#albumContainer");
          displayAlbums(data);
        })
        .catch((error) => {
          console.error("Errore durante il recupero dei dati:", error);
        });

/*         https://api.deezer.com/album/302127?note=5&request_method=Get */
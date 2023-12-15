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

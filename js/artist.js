//Parameter: artist id
//Endpoint: https://striveschool-api.herokuapp.com/api/deezer/artist/{id}

const artistUrl = 'https://striveschool-api.herokuapp.com/api/deezer/artist/';

let artist = new URLSearchParams(location.search).get('artist');

function fetchArtist(artist){

    fetch(`${artistUrl}${artist}`)
    .then(response => response.json())
    .then(data => {
        showsong(data);
        fetchSongs(data);
    })
    .catch(error => {
        console.error(error);
    });

}

// Playlist Colonna SX

let playlistUL = document.querySelector(".overflow-auto");

let arrayPlaylist = ["Preferite!", "Dimmi Gianluca...!", "Longo Trading Vibes", "Petrella Background boost", "Playlist bella", "I grandi succesi", "Britney Spiars", "Chill music per coding andato male", "Gaming", "OST film e videogiochi", "Machine", "Badass Villain Vibes!", "Chill beats", "Japanese Lo-Fi Chillhop", "White noise for Silvia", "Lo-Fi music Fruits", "Chillout 2024", "Umberto boost music", "Galasso waves", "Christmas chill music", "Tutti frutti all Zucchi", "Pacchettone chillout", "Sigma Ponk Mix '23", "Nightcore", "Gerry Christmas", "Tamarri in macchina", "Coding music", "Fitness boost", "Mariah al Curry", ""];

function createPlaylist (a) {

    for (let i=0; i<a.length; i++) {
        
        let playLi = document.createElement("li");
        playLi.className = "text-white-50 fs-6 list-unstyled btn p-0";
        playLi.innerText = a[i];
        playlistUL.appendChild(playLi);
    }
}

createPlaylist(arrayPlaylist);


/* Parte Footer */
    function replaceHeartIcon() {
        const heartIcon = document.querySelector('.bi-heart');
        const filledHeartIcon = document.createElement('i');
        filledHeartIcon.classList.add('bi', 'bi-heart-fill');
        
        heartIcon.parentNode.replaceChild(filledHeartIcon, heartIcon);
      }

  document.addEventListener("DOMContentLoaded", () => { //FUNZIONE PER LA BARRA AUDIO

    getIdArist();

    const range = document.querySelector(".volume input[type=range]");
  
    const barHoverBox = document.querySelector(".volume .bar-hoverbox");
    const fill = document.querySelector(".volume .bar .bar-fill");
    
    range.addEventListener("change", (e) => {
      console.log("value", e.target.value);
    });
    
    const setValue = (value) => {
      fill.style.width = value + "%";
      range.setAttribute("value", value)
      range.dispatchEvent(new Event("change"))
    }
    
    // Дефолт
    setValue(range.value);
    
    const calculateFill = (e) => {
      // Отнимаем ширину двух 15-пиксельных паддингов из css
      let offsetX = e.offsetX
      
      if (e.type === "touchmove") {
        offsetX = e.touches[0].pageX - e.touches[0].target.offsetLeft
      }
      
      const width = e.target.offsetWidth - 30;
  
      setValue(
        Math.max(
          Math.min(
            // Отнимаем левый паддинг
            (offsetX - 15) / width * 100.0,
            100.0
          ),
          0
        )
      );
    }
    
    let barStillDown = false;
  
    barHoverBox.addEventListener("touchstart", (e) => {
      barStillDown = true;
  
      calculateFill(e);
    }, true);
    
    barHoverBox.addEventListener("touchmove", (e) => {
      if (barStillDown) {
        calculateFill(e);
      }
    }, true);
    
    barHoverBox.addEventListener("mousedown", (e) => {
      barStillDown = true;
      
      calculateFill(e);
    }, true);
    
    barHoverBox.addEventListener("mousemove", (e) => {
      if (barStillDown) {
        calculateFill(e);
      }
    });
    
    barHoverBox.addEventListener("wheel", (e) => {
      const newValue = +range.value + e.deltaY * 0.5;
      
      setValue(Math.max(
        Math.min(
          newValue,
          100.0
        ),
        0
      ))
    });
    
    document.addEventListener("mouseup", (e) => {
      barStillDown = false;
    }, true);
    
    document.addEventListener("touchend", (e) => {
      barStillDown = false;
    }, true);

    //PARTE CENTRALE

    // Dichiarazioni DOM

    let backgroundArtist = document.querySelector(".BackgroundArtist");
    let nomeArtista = document.querySelector("#containerScritteArtista h1");
    let monthListeners = document.querySelector("#monthListeners");
    let containerCanzoni = document.querySelector("#containerCanzoni");
    console.log(monthListeners)

    async function getIdArist() {
      function getRandomId(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }
    
      let artistId = getRandomId(27, 101);
    
      
        try {
          const response = await fetch(`https://striveschool-api.herokuapp.com/api/deezer/artist/${artistId}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
    
          const data = await response.json();
          if (data.picture) {
            setArtBackground(data.picture_xl);
            setArtName(data.name);
          }

        } catch (error) {
          console.error("Errore durante il recupero dei dati:", error);
        }

      function setArtBackground (picture_xl) {
          backgroundArtist.style.backgroundImage = `url(${picture_xl})`;
          backgroundArtist.style.backgroundPosition = "center";
          backgroundArtist.style.backgroundSize = "cover";
          backgroundArtist.style.backgroundRepeat = "no-repeat";
      };
      
      function setArtName (nome) {
        nomeArtista.innerText = nome;
      };
    }
  })


  /* Home */
/* fetch("https://striveschool-api.herokuapp.com/api/deezer/album/", {
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
    }); */
/* Parte destra */
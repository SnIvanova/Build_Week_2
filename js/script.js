//Parametro: query
//Endpoint: https://striveschool-api.herokuapp.com/api/deezer/search?q={query}

//amici
document.addEventListener('DOMContentLoaded', () => {
    let closeButton = document.querySelector('#closeBtn');
    closeButton.addEventListener('click', () => {
        let section = document.querySelector('#sectionAmici');
        section.style.display = 'none';
    })
})

// footer
document.addEventListener('DOMContentLoaded', function() {
    function replaceHeartIcon() {
        const heartIcon = document.querySelector('.bi-heart');
        const filledHeartIcon = document.createElement('i');
        filledHeartIcon.classList.add('bi', 'bi-heart-fill');
        
        heartIcon.parentNode.replaceChild(filledHeartIcon, heartIcon);
      }
  });

// Playlist Colonna SX

let playlistUL = document.querySelector(".overflow-auto");

let arrayPlaylist = ["Playlist bella", "I grandi succesi"]; // Contenuto ricavato dalle API

console.log(arrayPlaylist)

 /* document.addEventListener('DOMContentLoaded', () => {}) */

function createPlaylist (a) {

    console.log(playlistUL);

    for (let i=0; i<a.length; i++) {
        
        let playLi = document.createElement("li");
        playLi.className = "text-white-50 fs-6 list-unstyled";
        playLi.innerText = a[i];
        playlistUL.appendChild(playLi);

        console.log(arrayPlaylist);
    }
}

createPlaylist(arrayPlaylist);
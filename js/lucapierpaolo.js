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
// Playlist Colonna SX

document.addEventListener("DOMContentLoaded", () => {

    let playlistUL = document.querySelector(".overflow-auto");

let arrayPlaylist = ["Preferite!", "Dimmi Gianluca...!", "Longo Trading Vibes", "Petrella Background boost", "Playlist bella", "I grandi succesi", "Britney Spiars", "Chill music per coding andato male", "Gaming", "OST film e videogiochi", "Machine", "Badass Villain Vibes!", "Chill beats", "Japanese Lo-Fi Chillhop", "White noise for Silvia", "Lo-Fi music Fruits", "Chillout 2024", "Umberto boost music", "Galasso waves", "Christmas chill music", "Tutti frutti all Zucchi", "Pacchettone chillout", "Sigma Ponk Mix '23", "Nightcore", "Gerry Christmas", "Tamarri in macchina", "Coding music", "Fitness boost", "Mariah al Curry", ""];

console.log(arrayPlaylist)

 /* document.addEventListener('DOMContentLoaded', () => {}) */

function createPlaylist (a) {

    console.log(playlistUL);

    for (let i=0; i<a.length; i++) {
        
        let playLi = document.createElement("li");
        playLi.className = "text-white-50 fs-6 list-unstyled btn";
        playLi.innerText = a[i];
        playlistUL.appendChild(playLi);

        console.log(arrayPlaylist);
    }
}

createPlaylist(arrayPlaylist);
});


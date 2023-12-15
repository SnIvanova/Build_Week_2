//Parameter: album id
//Endpoint: https://striveschool-api.herokuapp.com/api/deezer/album/{id}

const albumUrl = 'https://striveschool-api.herokuapp.com/api/deezer/album/75621062';

let album = new URLSearchParams(location.search).get('album');

function fetchAlbum(album){

    fetch(albumUrl + album)
    .then(response => response.json())
    // .then(json => JSON.stringify(json))
    .then(json => console.log(json))
    .then(data => {
        // showsong(data);
        // fetchSongs(data);
    })
    .catch(error => {
        console.error(error);
    });

}

fetchAlbum();

/* alcune prove x prendere dati dall'oggetto */

let params = new URLSearchParams(document.location.search);
let id = params.get("id");
console.log(id)

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
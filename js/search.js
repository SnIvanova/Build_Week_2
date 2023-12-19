/*Cercate di creare anche una funzione di ricerca. Questo API possiede un endpoint DEDICATO!
Potete creare una pagina a parte o mostrare tutto sulla homepage.
Parametro: query
Endpoint: https://striveschool-api.herokuapp.com/api/deezer/search?q={query}
Example: https://striveschool-api.herokuapp.com/api/deezer/search?q=queen*/

document.addEventListener('DOMContentLoaded', () => {
    let searching = document.querySelector('#ricerchina');
    searching.addEventListener('click', () => {
        searchDeezer().then(searchDeezerAndDisplayResults)
    })


    async function searchDeezer(query) {
        try {
        const apiUrl = `https://striveschool-api.herokuapp.com/api/deezer/search?q=${encodeURIComponent(query)}`;
    
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            },
        });
    

        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            console.error(`Errore nella richiesta: ${response.status} - ${response.statusText}`);
            return null;
        }
        } catch (error) {
        console.error('Errore durante la ricerca:', error);
        return null;
        }
    }

    async function searchDeezerAndDisplayResults() {
        try {
        const input = document.querySelector('#inputSearch').value;
    
        if (input.trim() !== '') {

            const results = await searchDeezer(input);
    
            if (results) {
            console.log('Risultati della ricerca:', results);
            } else {
            console.log('Nessun risultato trovato.');
            }
        } else {
            console.log('Inserisci una query di ricerca valida.');
        }
        } catch (error) {
        console.error('Errore durante la ricerca:', error);
        }
    }
})
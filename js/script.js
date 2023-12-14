//Parametro: query
//Endpoint: https://striveschool-api.herokuapp.com/api/deezer/search?q={query}


document.addEventListener('DOMContentLoaded', function() {
    function replaceHeartIcon() {
        const heartIcon = document.querySelector('.bi-heart');
        const filledHeartIcon = document.createElement('i');
        filledHeartIcon.classList.add('bi', 'bi-heart-fill');
        
        heartIcon.parentNode.replaceChild(filledHeartIcon, heartIcon);
      }
  });
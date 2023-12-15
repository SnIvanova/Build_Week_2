//Parametro: query
//Endpoint: https://striveschool-api.herokuapp.com/api/deezer/search?q={query}

// footer

  //FUNZIONE PER LA BARRA AUDIO
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
    
    // defolt
    setValue(range.value);
    
    const calculateFill = (e) => {
      // - width di due 15px padding dal css
      let offsetX = e.offsetX
      
      if (e.type === "touchmove") {
        offsetX = e.touches[0].pageX - e.touches[0].target.offsetLeft
      }
      
      const width = e.target.offsetWidth - 30;
  
      setValue(
        Math.max(
          Math.min(
            // - padding left
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


document.addEventListener('DOMContentLoaded', () => {
  let closeButton = document.querySelector('#closeBtn');
  let sectionAmici = document.querySelector('#sectionAmici');
  let restoreButton = document.querySelector('#iconaSezioneAttivita');
  let sectionParent = sectionAmici.parentNode;

  closeButton.addEventListener('click', () => {
      console.log('click');
      let sectionIndex = Array.from(sectionParent.children).indexOf(sectionAmici);

      sectionAmici.parentNode.removeChild(sectionAmici);
      restoreButton.style.display = 'block';
      restoreButton.setAttribute('data-section-index', sectionIndex);
  });
  restoreButton.addEventListener('click', () => {
      let sectionIndex = parseInt(restoreButton.getAttribute('data-section-index'));
      sectionParent.insertBefore(sectionAmici, sectionParent.children[sectionIndex]);
      restoreButton.style.display = 'none';
  });
});

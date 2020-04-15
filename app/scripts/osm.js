require("regenerator-runtime");

let myHeaders = new Headers();
myHeaders.append("id", "16fb384f5213dfb5f267956480bdba613d304c76");

let requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

const url = 'https://api.jcdecaux.com/vls/v1/stations?contract=marseille&apiKey=16fb384f5213dfb5f267956480bdba613d304c76'

async function fetchData () {
    const response = await fetch(url, requestOptions);
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
    console.error(response.status)
    }
}

async function getStationsData () {
  const stationsData = await fetchData();
  return stationsData
}

getStationsData()


let cityLat = 43.300000;
let cityLon = 5.400000;
let macarte = null;
let stationInfo = getStationsData();


function initMap() {
  macarte = L.map('map').setView([cityLat, cityLon], 11);
  // Leaflet ne récupère pas les cartes (tiles) sur un serveur par défaut.
  // Nous devons lui préciser où nous souhaitons les récupérer. Ici, openstreetmap.fr
  L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
    attribution: 'données © OpenStreetMap/ODbL - rendu OSM France',
    minZoom: 1,
    maxZoom: 20
  }).addTo(macarte);


  for (let station in stationInfo) {
    let marker = L.marker([station.position.lat, station.position.lng]).addTo(macarte);
    marker.bindPopup(station.name);
    }
}

window.onload = function(){
  // Fonction d'initialisation qui s'exécute lorsque le DOM est chargé
  initMap();
};

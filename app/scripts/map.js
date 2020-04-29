class Map {

  constructor(lat,lon) {
    this.lat = lat;
    this.lon = lon;
    this.myMap = L.map('map');
    this.isStationSelected = false;
    this.pinGreen = L.icon({
      iconUrl: '../images/pin_green.png',
      iconSize: [40, 40],
      iconAnchor: [20, 40],
      popupAnchor: [-3, -76],
    });
    this.pinRed = L.icon({
      iconUrl: '../images/pin_red.png',
      iconSize: [40, 40],
      iconAnchor: [20, 40],
      popupAnchor: [-3, -76],
    });

    this.stationName = document.getElementById('stationName');
    this.stationLocation = document.getElementById('stationLocation');
    this.stationStatus = document.getElementById('stationStatus');
    this.availableBikes = document.getElementById('availableBikes');

    this.initMap();
    this.getStationData();
  }

  initMap() {
    this.myMap.setView([this.lat, this.lon], 12);
    L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
      attribution: 'données © OpenStreetMap/ODbL - rendu OSM France',
      minZoom: 1,
      maxZoom: 20
    }).addTo(this.myMap);
  }

  async fetchData() {
    let myHeaders = new Headers();
    myHeaders.append("id", "16fb384f5213dfb5f267956480bdba613d304c76");

    let requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    const response = await fetch('https://api.jcdecaux.com/vls/v1/stations?contract=marseille&apiKey=16fb384f5213dfb5f267956480bdba613d304c76', requestOptions);
    const jsonData = await response.json();
    return jsonData;
  };

  async getStationData() {
    const data = await this.fetchData();
    this.addMarker(data)
  }

  addMarker(data) {
    for (let station of data) {
      if (station.available_bikes === 0 && station.status === 'OPEN') {
        var marker = L.marker([station.position.lat, station.position.lng], {icon: this.pinRed}).addTo(this.myMap);
        //marker.bindPopup(station.name + "Aucun vélo n'est disponible pour le moment")
      }
      if (station.available_bikes > 0 && station.status === 'OPEN') {
        var marker = L.marker([station.position.lat, station.position.lng], {icon: this.pinGreen}).addTo(this.myMap);
        //marker.addEventListener('mouseover', marker.bindPopup(station.name +"\n" + station.available_bikes+"vélos disponibles"));
        //marker.bindPopup(station.name + station.available_bikes+"vélos disponibles");
      }
      if (station.status !== 'OPEN') {
        var marker = L.marker([station.position.lat, station.position.lng], {icon: this.pinRed}).addTo(this.myMap);
        //marker.bindPopup("La station"+station.name+"est actuellement fermée")
      }
       const displayData = () => this.displayDataStation(station);
       marker.on("click", displayData);
    }
  }

  displayDataStation(station) {
    let intro = document.getElementById("noStationSelected");
    let dataStationSelected = document.getElementById("dataStationSelected");
    intro.style.display = "none";
    dataStationSelected.style.display = "block";

    let stationName = station.name.substring(station.name.indexOf("-") + 1);
    let stationLocation = station.address.substring(station.address.indexOf("-") + 1);

    if (station.available_bikes > 0 && station.status === "OPEN") {
      this.stationStatus.innerHTML = "Ouvert";
      this.stationName.innerHTML = stationName;
      this.stationLocation.innerHTML = stationLocation;
      this.availableBikes.innerHTML = station.available_bikes;
      sessionStorage.setItem("stationName", stationName);
      this.isStationSelected = true;
    }
    if (station.available_bikes === 0 && station.status === "OPEN"){
      this.stationStatus.innerHTML = "Indisponible";
      this.stationName.innerHTML = stationName;
      this.stationLocation.innerHTML = stationLocation;
      this.availableBikes.innerHTML = "Aucun vélo n'est disponible";
      this.isStationSelected = false;
    }
    if (station.status !== "OPEN") {
      this.stationStatus.innerHTML = "Fermée";
      this.stationName.innerHTML = stationName;
      this.stationLocation.innerHTML = stationLocation;
      this.availableBikes.innerHTML = "Aucun vélo n'est disponible";
      this.isStationSelected = false;
    }
  }
}


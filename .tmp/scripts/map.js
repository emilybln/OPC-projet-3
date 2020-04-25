class Map {
  constructor(lat, lon) {
    this.lat = lat;
    this.lon = lon;
    this.myMap = L.map('map');
    this.currentPin = "";
    this.pinGreen = L.icon({
      iconUrl: '../images/pin_green.png',
      iconSize: [40, 40],
      iconAnchor: [20, 40],
      popupAnchor: [-3, -76]
    });
    this.pinRed = L.icon({
      iconUrl: '../images/pin_red.png',
      iconSize: [40, 40],
      iconAnchor: [20, 40],
      popupAnchor: [-3, -76]
    });
    this.domStationName = document.getElementById('stationName');
    this.domStationLocation = document.getElementById('stationLocation');
    this.domStationStatus = document.getElementById('stationStatus');
    this.domAvailableBikes = document.getElementById('availableBikes');
    this.initMap();
    this.getStationData();
  } // Méthode pour créer la map


  initMap() {
    this.myMap.setView([this.lat, this.lon], 12);
    L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
      attribution: 'données © OpenStreetMap/ODbL - rendu OSM France',
      minZoom: 1,
      maxZoom: 20
    }).addTo(this.myMap); //this.markersCluster = new L.MarkerClusterGroup(); // Création des clusters
    //this.myMap.addLayer(this.markersCluster)
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
  }

  async getStationData() {
    const data = await this.fetchData();
    this.addMarker(data);
  }

  addMarker(data) {
    for (let station of data) {
      if (station.available_bikes === 0 && station.status === 'OPEN') {
        var marker = L.marker([station.position.lat, station.position.lng], {
          icon: this.pinRed
        }).addTo(this.myMap); //marker.bindPopup(station.name + "Aucun vélo n'est disponible pour le moment")
      }

      if (station.available_bikes > 0 && station.status === 'OPEN') {
        var marker = L.marker([station.position.lat, station.position.lng], {
          icon: this.pinGreen
        }).addTo(this.myMap); //marker.addEventListener('mouseover', marker.bindPopup(station.name +"\n" + station.available_bikes+"vélos disponibles"));
        //marker.bindPopup(station.name + station.available_bikes+"vélos disponibles");
      }

      if (station.status !== 'OPEN') {
        var marker = L.marker([station.position.lat, station.position.lng], {
          icon: this.pinRed
        }).addTo(this.myMap); //marker.bindPopup("La station"+station.name+"est actuellement fermée")
      }

      const displayData = () => this.displayDataStation(station);

      marker.on("click", displayData);
    }
  }

  displayDataStation(station) {
    let introEmpty = document.getElementById("noStationSelected");
    let dataStationSelected = document.getElementById("dataStationSelected");
    introEmpty.style.display = "none";
    dataStationSelected.style.display = "block";

    if (station.available_bikes > 0 && station.status === "OPEN") {
      this.domStationStatus.innerHTML = "Ouvert";
      this.domStationName.innerHTML = station.name;
      this.domStationLocation.innerHTML = station.address;
      this.domAvailableBikes.innerHTML = station.available_bikes;
      document.getElementById("form").style.display = "block";
    } else if (station.available_bikes === 0 && station.status === "OPEN") {
      this.domStationStatus.innerHTML = "Fermée";
      this.domStationName.innerHTML = station.name;
      this.domStationLocation.innerHTML = station.address;
      this.domAvailableBikes.innerHTML = "Aucun vélo n'est disponible";
      document.getElementById("form").style.display = "none";
    } else if (station.status !== "OPEN") {
      this.domStationStatus.innerHTML = "Fermée";
      this.domStationName.innerHTML = station.name;
      this.domStationLocation.innerHTML = station.address;
      this.domAvailableBikes.innerHTML = "Aucun vélo n'est disponible";
      document.getElementById("form").style.display = "none";
    }
  }

}
//# sourceMappingURL=map.js.map
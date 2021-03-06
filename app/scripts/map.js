class Map {
  constructor(lat, lon) {
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
      maxZoom: 20,
    }).addTo(this.myMap);
  }

  getStationData() {
    fetch(
      'https://api.jcdecaux.com/vls/v1/stations?contract=marseille&apiKey=16fb384f5213dfb5f267956480bdba613d304c76',
      {
        method: 'GET',
        headers: {'id': '16fb384f5213dfb5f267956480bdba613d304c76'},
        redirect: 'follow',
      }
    )
      .then(rep => rep.json())
      .then(data => this.addMarker(data));
  }

  addMarker(data) {
    let marker;
    for (let station of data) {
      if (station.available_bikes > 0 && station.status === 'OPEN') {
        marker = L.marker([station.position.lat, station.position.lng], {
          icon: this.pinGreen,
        }).addTo(this.myMap);
      } else {
        marker = L.marker([station.position.lat, station.position.lng], {
          icon: this.pinRed,
        }).addTo(this.myMap);
      }
      const displayData = () => this.displayDataStation(station);
      marker.on('click', displayData);
    }
  }

  displayDataStation(station) {
    const intro = document.getElementById('noStationSelected');
    const dataStationSelected = document.getElementById('dataStationSelected');
    intro.style.display = 'none';
    dataStationSelected.style.display = 'block';

    const isStationOpen = (station) => station.status === 'OPEN';

    let stationName = station.name.substring(station.name.indexOf('-') + 1);
    let stationLocation = station.address.substring(
      station.address.indexOf('-') + 1
    );

    if (station.available_bikes > 0 && isStationOpen) {
      this.stationStatus.innerHTML = 'Ouvert';
      this.stationName.innerHTML = stationName;
      this.stationLocation.innerHTML = stationLocation;
      this.availableBikes.innerHTML = station.available_bikes;
      sessionStorage.setItem('stationName', stationName);
      this.isStationSelected = true;
    }
    if (station.available_bikes === 0 && isStationOpen) {
      this.stationStatus.innerHTML = 'Indisponible';
      this.stationName.innerHTML = stationName;
      this.stationLocation.innerHTML = stationLocation;
      this.availableBikes.innerHTML = 'Aucun vélo n\'est disponible';
      this.isStationSelected = false;
    }
    if (!isStationOpen) {
      this.stationStatus.innerHTML = 'Fermée';
      this.stationName.innerHTML = stationName;
      this.stationLocation.innerHTML = stationLocation;
      this.availableBikes.innerHTML = 'Aucun vélo n\'est disponible';
      this.isStationSelected = false;
    }
  }
}

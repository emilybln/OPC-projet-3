class Map {
    constructor(lat,lon) {
        this.lat = lat;
        this.lon = lon;
        this.myMap = L.map('map');
        //this.markersCluster = [];

        this.bikeIcon = L.icon({
            iconUrl: '../images/pin.png',
            iconSize: [40, 40],
            iconAnchor: [20, 40],
            popupAnchor: [-3, -76],
        });
        this.initMap();
        //this.getStationData();
        //this.addMarker();
    }

    // Méthode pour créer la map
    initMap() {
        this.myMap.setView([this.lat, this.lon], 11);
        L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
            attribution: 'données © OpenStreetMap/ODbL - rendu OSM France',
            minZoom: 1,
            maxZoom: 20
        }).addTo(this.myMap);

        //this.markersCluster = new L.MarkerClusterGroup(); // Création des clusters
        //this.myMap.addLayer(this.markersCluster)
    }

    /*
    async fetchData () {
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

    async getStationData () {
        const data = await this.fetchData();
        this.addMarker(data)
    }

    addMarker(data) {
        for (station of data) {
            var marker = L.marker([station.position.lat, station.position.lng], {icon: this.bikeIcon}).addTo(this.myMap);
            marker.bindPopup(station.name +"\n"+'bike : ' + station.available_bikes)
        }
    }


     */

}

/*


async function fetchData () {

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

    async function getStationData () {
        const data = await fetchData();
        addMarker(data)
    }

    getStationData();

    function addMarker(data) {
        for (station of data) {
            var marker = L.marker(station.position.lat, station.position.lng], {icon: bikeIcon}).addTo(myMap);
            marker.bindPopup(station.name +"\n"+'bike : ' + station.available_bikes)
        }
    }


async function getStationData () {
    const data = await fetchData();
    addMarker(data)
}

getStationData();



function addMarker(data) {
    for (station of data) {
        var marker = L.marker(station.position.lat, station.position.lng], {icon: bikeIcon}).addTo(myMap);
        marker.bindPopup(station.name +"\n"+'bike : ' + station.available_bikes)
    }
}


window.onload = function() {
    initMap();
};


 */
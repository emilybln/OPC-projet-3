class App {

    constructor() {
        this.lat = 43.300000;
        this.lon = 5.400000;
        this.id = document.getElementById('slideImg');
        this.slides = ["images/img1.jpg", "images/img2.jpg","images/img3.jpg"];
        this.arrayText = document.getElementById("slideText").getElementsByClassName('text');

        this.map = new Map(this.lat, this.lon);
        this.slider = new Slider(this.id, this.slides, this.arrayText);
        this.reservation = new Reservation (this.map);
    }
}


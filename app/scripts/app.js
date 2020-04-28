class App {
    constructor() {

        // Map
        this.lat = 43.300000;
        this.lon = 5.400000;

        // Slider - éléments de références et contenu attendu
        this.id = document.getElementById('img_slider');
        this.slides = ["images/img1.jpg", "images/img2.jpg","images/img3.jpg"];
        this.arrayText = document.getElementById("text_slider").getElementsByClassName('text');

        this.initObjet();
    }

    //Instanciation des objets
    initObjet() {
        this.map = new Map(this.lat, this.lon);
        this.slider = new Slider(this.id, this.slides, this.arrayText);
        this.reservation = new Reservation(this.map, this.canvas);
        this.canvas = new Canvas();
        this.timer = new Timer(this.reservation);
    }

}


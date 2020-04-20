class App {
    constructor() {

        // Coordonnées de la map
        this.lat = 43.300000;
        this.lon = 5.400000;

        // Eléments du slider à passer en paramètre
        this.id = document.getElementById('img_slider');
        this.slides = ["images/img1.jpg", "images/img2.jpg","images/img3.jpg"];
        this.arrayText = document.getElementById("text_slider").getElementsByClassName('text');

        this.initObjet();
    }

    //Instanciation des objets
    initObjet(){
        //this.timer = new Timer("new","tps_restant");
        this.map = new Map(this.lat, this.lon);
        //this.session = new Session(this.inputNom,this.inputPrenom);
        this.slider = new Slider(this.id, this.slides, this.arrayText);
        //this.myCanvas = new Canvas(document.getElementById("canvasSignature"));
    }

}


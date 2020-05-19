// Uncomment to enable Bootstrap tooltips
// https://getbootstrap.com/docs/4.0/components/tooltips/#example-enable-tooltips-everywhere
// $(function () { $('[data-toggle="tooltip"]').tooltip(); });

// Uncomment to enable Bootstrap popovers
// https://getbootstrap.com/docs/4.0/components/popovers/#example-enable-popovers-everywhere
// $(function () { $('[data-toggle="popover"]').popover(); });

class App {
  constructor() {
    this.lat = 43.3;
    this.lon = 5.4;
    this.id = document.getElementById('slideImg');
    this.slides = ['images/img1.jpg', 'images/img2.jpg', 'images/img3.jpg'];
    this.arrayText = document
      .getElementById('slideText')
      .getElementsByClassName('text');

    this.map = new Map(this.lat, this.lon);
    this.slider = new Slider(this.id, this.slides, this.arrayText);
    this.reservation = new Reservation(this.map);
  }
}

let app = new App();

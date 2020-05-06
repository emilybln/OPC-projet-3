class Slider {
  constructor(id, slides, arrayText) {
    this.idSlide = id;
    this.slides = slides;
    this.arrayText = arrayText;
    this.currentSlide = 0;
    this.time = "";

    this.prevBtn = document.getElementById("prevBtn");
    this.nextBtn = document.getElementById("nextBtn");
    this.playBtn = document.getElementById("playBtn");
    this.pauseBtn = document.getElementById("pauseBtn");

    this.nextBtn.addEventListener("click", this.nextSlide.bind(this));
    this.prevBtn.addEventListener("click", this.prevSlide.bind(this));
    this.playBtn.addEventListener("click", this.playPause.bind(this));
    this.pauseBtn.addEventListener("click", this.playPause.bind(this));

    this.playPause();
    this.showingSlide();
    this.keyboardEvent();
  }

  showingSlide() {
    if (this.currentSlide < 0) {
      this.currentSlide = this.slides.length - 1;
    }
    if (this.currentSlide === this.slides.length) {
      this.currentSlide = 0;
    }
    this.idSlide.src = this.slides[this.currentSlide];
    this.displayText();
  }

  displayText() {
    for (let i = 0; i < this.arrayText.length; i++) {
      if (this.currentSlide === i) {
        this.arrayText[this.currentSlide].style.display = "inherit";
      } else {
        this.arrayText[i].style.display = "none";
      }
    }
  }

  nextSlide() {
    clearInterval(this.time);
    this.currentSlide++;
    this.showingSlide();
    this.time = setInterval(this.nextSlide.bind(this), 5000);
  }

  prevSlide() {
    clearInterval(this.time);
    this.currentSlide--;
    this.showingSlide();
    this.time = setInterval(this.nextSlide.bind(this), 5000);
  }

  playPause() {
    const pause = document.getElementById("pauseBtn");
    const play = document.getElementById("playBtn");
    if (this.time) {
      clearInterval(this.time);
      this.time = "";
      pause.style.display = "none";
      play.style.display = "block";
    } else {
      this.time = setInterval(this.nextSlide.bind(this), 5000);
      pause.style.display = "block";
      play.style.display = "none";
    }
  }

  keyboardEvent() {
    document.addEventListener("keydown", (e) => {
      let caseCode = e.key;
      if (caseCode === "ArrowRight") {
        this.nextSlide();
      }
      if (caseCode === "ArrowLeft") {
        this.prevSlide();
      }
    });
  }
}

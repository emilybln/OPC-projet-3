let slides = document.querySelectorAll('#slides .slide');
let currentSlide = 0;
let slideInterval = setInterval(nextSlide,5000);

function nextSlide(){
  slides[currentSlide].className = 'slide';
  currentSlide = (currentSlide+1)%slides.length;
  slides[currentSlide].className = 'slide showing';
}

let playing = true;
let pauseButton = document.getElementById('pause');

function pauseSlideshow(){
  pauseButton.innerHTML = 'Lire le slider';
  playing = false;
  clearInterval(slideInterval);
}

function playSlideshow(){
  pauseButton.innerHTML = 'Arrêter le slider';
  playing = true;
  slideInterval = setInterval(nextSlide,5000);
}

pauseButton.onclick = function(){
  if(playing){ pauseSlideshow(); }
  else{ playSlideshow(); }
};


function previousSlide(){
  slides[currentSlide].className = 'slide';
  currentSlide = (currentSlide-1)%slides.length;
  slides[currentSlide].className = 'slide showing';
}

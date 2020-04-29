class Reservation {

  constructor (map) {
    this.map = map;
    this.isReservationDone = true;
    this.canvas = "";
    this.reservationBtn = document.getElementById('reservationBtn');
    this.checkBtn = document.getElementById('checkBtn');

    this.getUserData();
    this.reservationBtn.addEventListener('click', this.onSubmit.bind(this));
    this.checkBtn.addEventListener('click', this.onValidate.bind(this));
  }

  isFormValid(surname, name) {
    return surname !== "" && name !== "" && this.map.isStationSelected === true;
  }

  getUserData() {
    const updatedSurname = localStorage.getItem("surname");
    const updatedName = localStorage.getItem("name");

    if (updatedSurname) {
      document.getElementById("surname").value = updatedSurname;
    }
    if (updatedName) {
      document.getElementById("name").value = updatedName;
    }
  }

  storeUserData(name, surname) {
    localStorage.setItem("surname", surname);
    localStorage.setItem("name", name)
  }

  onSubmit() {
    var surname = document.getElementById("surname").value;
    var name = document.getElementById("name").value;

    const isValid = this.isFormValid(surname, name);
    if (isValid) {
      this.storeUserData(name, surname);
      this.canvas = new Canvas();
      document.getElementById('form').style.display = 'none';
      document.getElementById('canvasBlock').style.display = 'block';
    }
    else {
      document.getElementById('errorMsg').innerHTML = '⛔️ Veuillez sélectionner une station et remplir les champs avant de valider';
    }
  }

  onValidate() {
    document.getElementById('recapBlock').style.display = 'block';
    document.getElementById('canvasBlock').style.display = 'none';
    document.getElementById('form').style.display = 'block';
    this.reservationRecap();
    this.canvas.clearCanvas();
  }

  reservationRecap() {
    document.getElementById('reservationRecap').innerHTML = "1 vélo est réservé à la station "+sessionStorage.getItem("stationName");
    document.getElementById('userRecap').innerHTML = "pour "+localStorage.getItem('surname')+" "+localStorage.getItem('name');
    const timer = new Timer();
    timer.launchTimer();
  }
}

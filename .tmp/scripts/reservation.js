class Reservation {
  constructor() {
    this.getUserData();
    this.domBooking = document.getElementById('bookingBtn');
    this.domBooking.addEventListener('click', this.onSubmit.bind(this));
    this.domValidate = document.getElementById('checkBtn');
    this.domValidate.addEventListener('click', this.onValidate.bind(this));
  }

  isFormValid(surname, name) {
    if (surname !== "" && name !== "") {
      return true;
    }

    return false;
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
    localStorage.setItem("name", name);
  }

  onSubmit() {
    var surname = document.getElementById("surname").value;
    var name = document.getElementById("name").value;
    const isValid = this.isFormValid(surname, name);

    if (isValid) {
      this.storeUserData(name, surname);
      document.getElementById('form').style.display = 'none';
      document.getElementById('signature_block').style.display = 'block';
    } else {
      document.getElementById('errorMsg').innerHTML = '⛔️ Veuillez renseigner les champs avant de valider';
    }
  }

  onValidate() {
    document.getElementById('timerReservation').style.display = 'block';
    document.getElementById('signature_block').style.display = 'none';
    document.getElementById('form').style.display = 'block';
  }

}
//# sourceMappingURL=reservation.js.map
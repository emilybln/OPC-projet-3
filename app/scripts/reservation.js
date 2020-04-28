class Reservation {

    constructor (map, canvas) {
        this.map = map;
        this.isReservationDone = true;
        this.canvas = canvas;
        this.bookingBtn = document.getElementById('bookingBtn');
        this.checkBtn = document.getElementById('checkBtn');


        this.getUserData();
        //this.isBtnActiv();

        this.bookingBtn.addEventListener('click', this.onSubmit.bind(this));

        this.checkBtn.addEventListener('click', this.onValidate.bind(this));
    }

    isFormValid(surname, name,) {
        if (surname !== "" && name !== "" && this.map.isStationSelected === true) {
            return true;
        }
        return false;
    }

    /*
    isBtnActiv() {
        if (document.getElementById("surname").value !== "" && document.getElementById('name').value !== "") {
            console.log('coucou');
        }
        else { console.log('bye')}
    }
    */

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
            document.getElementById('form').style.display = 'none';
            document.getElementById('signature_block').style.display = 'block';
        }
        else {
            document.getElementById('errorMsg').innerHTML = '⛔️ Veuillez sélectionner une station et remplir les champs avant de valider';
        }
    }

    onValidate() {
        document.getElementById('timerReservation').style.display = 'block';
        document.getElementById('signature_block').style.display = 'none';
        document.getElementById('form').style.display = 'block';
        this.isReservationDone = true;
        this.canvas.clearCanvas();
    }

}

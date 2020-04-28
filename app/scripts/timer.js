class Timer {
    constructor(reservation) {
        this.reservation = reservation;
        this.isReservationRunning = false;

        this.totalTime = 12000000;
        this.endTime = 0;
        this.now = new Date().getTime();

        this.resumeReservation();
    }

    resumeReservation() {
        if (this.reservation.isReservationDone === true) {
            document.getElementById('resumeReservation').innerHTML = "1 vélo est réservé à la station "+sessionStorage.getItem("stationName");
            document.getElementById('resumeUser').innerHTML = "pour "+localStorage.getItem('surname')+" "+localStorage.getItem('name');
            const launchTimer = () => this.launchTimer();
            setInterval(launchTimer,1000);
        }
    }

    launchTimer() {
        this.endTime = this.now + this.totalTime;
        this.distance = this.endTime - new Date().getTime();

        let minutes = Math.floor((this.distance % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((this.distance % (1000 * 60)) / 1000);

        if (this.distance > 0) {
            this.isReservationRunning = true;
            document.getElementById('timer').innerHTML = minutes + "m " + seconds + "s";
        }

        if (this.distance <= 0) {
            document.getElementById('timer').innerHTML = "La réservation a expiré ";
            sessionStorage.clear();
            clearInterval();
        }
    }

}
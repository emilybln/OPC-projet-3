class Canvas {
  constructor() {
    this.canvas = document.getElementById("canvas");
    this.context = this.canvas.getContext("2d");
    this.x = 0;
    this.y = 0;
    this.isDrawing = false;

    this.initCanvas();
  }

  initCanvas() {
    this.canvas.addEventListener("mousedown", (e) => {
      this.x = e.pageX - this.canvas.offsetLeft;
      this.y = e.pageY - this.canvas.offsetTop;
      this.isDrawing = true;
    });

    this.canvas.addEventListener("mousemove", (e) => {
      if (this.isDrawing) {
        this.draw(
          this.x,
          this.y,
          e.pageX - this.canvas.offsetLeft,
          e.pageY - this.canvas.offsetTop
        );
        this.x = e.pageX - this.canvas.offsetLeft;
        this.y = e.pageY - this.canvas.offsetTop;
      }
    });

    window.addEventListener("mouseup", (e) => {
      if (this.isDrawing) {
        this.draw(
          this.x,
          this.y,
          e.pageX - this.canvas.offsetLeft,
          e.pageY - this.canvas.offsetTop
        );
        this.x = 0;
        this.y = 0;
        this.isDrawing = false;
        document.getElementById("checkBtn").disabled = false;
      }
    });

    this.canvas.addEventListener("touchstart", (e) => {
      let touches = e.changedTouches[0];
      this.x = touches.pageX - this.canvas.offsetLeft;
      this.y = touches.pageY - this.canvas.offsetTop;
      this.isDrawing = true;
      e.preventDefault();
    });

    this.canvas.addEventListener("touchmove", (e) => {
      if (this.isDrawing) {
        let touches = e.changedTouches[0];
        this.draw(
          this.x,
          this.y,
          touches.pageX - this.canvas.offsetLeft,
          touches.pageY - this.canvas.offsetTop
        );
        this.x = touches.pageX - this.canvas.offsetLeft;
        this.y = touches.pageY - this.canvas.offsetTop;
      }
      e.preventDefault();
    });

    window.addEventListener("touchend", (e) => {
      if (this.isDrawing) {
        var touches = e.changedTouches[0];
        this.draw(
          this.x,
          this.y,
          touches.pageX - this.canvas.offsetLeft,
          touches.pageY - this.canvas.offsetTop
        );
        this.x = 0;
        this.y = 0;
        this.isDrawing = false;
        document.getElementById("checkBtn").disabled = false;
        e.preventDefault();
      }
    });
  }

  draw(x1, y1, x2, y2) {
    this.context.beginPath();
    this.context.strokeStyle = "black";
    this.context.lineWidth = 5;
    this.context.moveTo(x1, y1);
    this.context.lineTo(x2, y2);
    this.context.stroke();
  }

  clearCanvas() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}

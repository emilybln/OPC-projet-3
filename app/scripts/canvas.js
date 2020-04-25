class Canvas {
    constructor() {
        this.canvas  = document.getElementById('canvas');
        this.context = this.canvas.getContext('2d');
        this.x = 0;
        this.y = 0;

        this.isDrawing = false;

        this.initCanvas();

    }

    initCanvas() {
        this.canvas.addEventListener( 'mousedown', e => {
            this.x = e.pageX - this.canvas.offsetLeft;
            this.y = e.pageY - this.canvas.offsetTop;
            this.isDrawing = true;
        });

        this.canvas.addEventListener( 'mousemove', e => {
           if (this.isDrawing) {
               this.draw(this.x, this.y, e.pageX - this.canvas.offsetLeft, e.pageY - this.canvas.offsetTop);

               this.x = e.pageX - this.canvas.offsetLeft;
               this.y = e.pageY - this.canvas.offsetTop;
           }
        });

       window.addEventListener( 'mouseup', e => {
            if (this.isDrawing) {
                this.draw(this.x, this.y, e.pageX - this.canvas.offsetLeft, e.pageY - this.canvas.offsetTop);
                this.x = 0;
                this.y = 0;
                this.isDrawing = false;
                document.getElementById('checkBtn').disabled = false;
                // app.signature = true;
            }
        });

    }

    draw(x1, y1, x2, y2) {
        this.context.beginPath();
        this.context.strokeStyle = 'black';
        this.context.lineWidth = 5;
        this.context.moveTo(x1, y1);
        this.context.lineTo(x2, y2);
        this.context.stroke();
    }

}

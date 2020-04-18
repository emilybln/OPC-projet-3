var canvas  = document.querySelector('#canvas');
var context = canvas.getContext('2d');

context.fillText("Hello", 78, 92);

context.strokeStyleStyle = '#777777';
context.strokeRect(0, 0, 500, 550);


context.fillStyle = '#ebebeb20';
context.fillRect(0, 0, 500, 550);

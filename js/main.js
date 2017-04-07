// function Game(size) {
//     this.size = size;
// }
//
// Game.prototype.grid = function () {
//   let cell = [];
//
//   for (let x = this.size; x > 0; x--) {
//     cell.push([]);
//     $("#grid").prepend("<div id='col" + x + "'" + " " + "class=\"col\"></div>");
//
//     for (let y = this.size; y > 0; y--) {
//       cell.push(" ");
//
//       let cellData = $("<div class=\"cell\"></div>");
//       cellData.attr("data-coord", + x + ", " + y);
//       $("#col" + x + "").prepend(cellData);
//     }
//   }
//   return cell;
// };
//
//
// Game.prototype.coordinates = function () {
//     let input, data;
//
//     $(".cell").mouseenter(function () {
//       data = $(this).data("coord");
//       input = JSON.parse("[" + data + "]");
//       console.log(input);
//     });
// };
//
// Game.prototype.move = function (dir) {
//   let i = 0;
//   let coord = [20, 20];
//   let init;
//   let left = true,
//       right = false,
//       up = true,
//       down = false;
//
//     init = setInterval(function(){
//       if (!right && dir === "left") {
//         coord[0]--;
//       }
//       else if (dir === "up") {
//         coord[1]--;
//       }
//       else if (dir === "right") {
//         coord[0]++;
//       }
//       else if (dir === "down") {
//         coord[1]++;
//       }
//       let pinta = $("div[data-coord='" + coord[0] + ", " + coord[1] + "']");
//       pinta.addClass("negro").delay(200).queue(function(){
//         $(this).removeClass("negro").dequeue();
// });
//
//
//     }, 200);
//
// };
//
// Game.prototype.bind = function () {
//   let coord = [20, 20];
//
//   $(document).on("keydown", function(event){
//     switch(event.which) {
//         case 37: // left //// [-1, igual]
//         case 65: // A
//         Game.prototype.move("left");
//         coord[0]--;
//         break;
//
//         case 38: // up //// [igual, -1]
//         case 87: // W
//         Game.prototype.move("up");
//         coord[1]--;
//         break;
//
//         case 39: // right //// [+1, igual]
//         case 68: // D
//         Game.prototype.move("right");
//         coord[0]++;
//         break;
//
//         case 40: // down //// [igual, +1]
//         case 83:  // Sa
//         Game.prototype.move("down");
//         coord[1]++;
//         break;
//
//         case 32: //bar //// pausa
//         console.log("bar");
//         break;
//
//         default: return;
//     }
//     event.preventDefault();
//
//   });
// };
//
//
//
//
//
//
// // let arr = [[18, 20], [19, 20], [20, 20]];
// // Game.prototype.alarga = function(val) {
// //   val.push(val);
// //   this.snake(arr);
// // };
// //
// //
// // Game.prototype.snake = function (val) {
// //   val.map((x) => {
// //     let pinta = $("div[data-coord='" + x[0] + ", " + x[1] + "']");
// //     pinta.addClass("negro");
// //   });
// // };
// //
// // Game.prototype.move = function(val) {
// //   let right = [];
// //   val.map((x) => {
// //     right.push([x[0] + 1, x[1]]);
// //   });
// //   this.snake(right);
// // };
// //
// //
// $(function(){
//   game.grid();
//   game.bind();
// });
//
//
//
// const game = new Game(40);


class Snake {
  constructor(size){
    this.canvasSize = size;
    this.canvasSquares = 40;
    this.size = Math.floor(size/this.canvasSquares);// number of pseudo squares
  }
  draw(x = this.canvasSize/2, y = this.canvasSize/2, multiplier = 1){
    this.x = x;
    this.y = y;
    this.long = this.size * multiplier;
    let colOn = color(255, 204, 0);
    fill(colOn);
    noStroke();
    return rect(this.x, this.y, this.long, this.size);
  }
  moveRight() {
    this.right = this.size;
    setInterval(run, 400);
  }
  move(){
    this.right = this.right + this.size;
    this.draw(this.right, 400);
  }
}


//===================== P5

let snake;

function setup() {
  let size = 800;
  let canvas = createCanvas(size, size);
  canvas.parent("grid");
  background(51);
  snake = new Snake(size);
  noLoop();
}

function draw() {
  snake.moveRight();
}

function run() {
  snake.move();
}

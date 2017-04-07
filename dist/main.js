"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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


var Snake = function () {
  function Snake(size) {
    _classCallCheck(this, Snake);

    this.canvasSize = size;
    this.canvasSquares = 40;
    this.size = Math.floor(size / this.canvasSquares); // number of pseudo squares
  }

  _createClass(Snake, [{
    key: "draw",
    value: function draw() {
      var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.canvasSize / 2;
      var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.canvasSize / 2;
      var multiplier = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;

      this.x = x;
      this.y = y;
      this.long = this.size * multiplier;
      var colOn = color(255, 204, 0);
      fill(colOn);
      noStroke();
      return rect(this.x, this.y, this.long, this.size);
    }
  }, {
    key: "moveRight",
    value: function moveRight() {
      this.right = this.size;
      setInterval(run, 400);
    }
  }, {
    key: "move",
    value: function move() {
      this.right = this.right + this.size;
      this.draw(this.right, 400);
    }
  }]);

  return Snake;
}();

//===================== P5

var snake = void 0;

function setup() {
  var size = 800;
  var canvas = createCanvas(size, size);
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
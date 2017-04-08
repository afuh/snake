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


//===================== P5

var Snake = function () {
  function Snake() {
    _classCallCheck(this, Snake);

    this.x = 0;
    this.y = 0;
    this.xspeed = 1;
    this.yspeed = 0;
  }

  _createClass(Snake, [{
    key: "direction",
    value: function direction(x, y) {
      this.xspeed = x;
      this.yspeed = y;
    }
  }, {
    key: "update",
    value: function update() {
      this.x = this.x + this.xspeed * square;
      this.y = this.y + this.yspeed * square;
      this.x = constrain(this.x, 0, canSize - square);
      this.y = constrain(this.y, 0, canSize - square);
    }
  }, {
    key: "draw",
    value: function draw() {
      var col = color(255, 204, 0);
      fill(col);
      rect(this.x, this.y, square, square);
    }
  }, {
    key: "coords",
    value: function coords() {
      console.log("x: " + this.x / square, "y: " + this.y / square);
    }
  }]);

  return Snake;
}();

var Food = function () {
  function Food() {
    _classCallCheck(this, Food);

    this.x = x;
    this.y = y;
    this.shape = rect(this.x, this.y, 15, 15);
  }

  _createClass(Food, [{
    key: "location",
    value: function location() {}
  }]);

  return Food;
}();

var pause = {
  check: false,
  true: function _true() {
    noLoop();
    pause.check = true;
    pause.text();
  },
  false: function _false() {
    loop();
    pause.check = false;
  },
  text: function (_text) {
    function text() {
      return _text.apply(this, arguments);
    }

    text.toString = function () {
      return _text.toString();
    };

    return text;
  }(function () {
    var msg = "Pause";
    textSize(40);
    fill(255);
    text(msg, 480, 600);
  })
};

var snake = void 0,
    move = [],
    canSize = 600,
    canvasColor = 51,
    square = Math.floor(canSize / 40),
    // number of pseudo squares
fps = 10;

console.log(fps);
function setup() {
  createCanvas(canSize, canSize).parent("grid");
  snake = new Snake(canSize);
  frameRate(fps);
  // noLoop();
}

function draw() {
  background(canvasColor);
  snake.draw();
  snake.update();
  if (pause.check) {
    pause.text();
  }
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    // move.push([0, -1]);
    snake.direction(0, -1);
  } else if (keyCode === RIGHT_ARROW) {
    // move.push([1, 0]);
    snake.direction(1, 0);
  } else if (keyCode === DOWN_ARROW) {
    // move.push([0, 1]);
    snake.direction(0, 1);
  } else if (keyCode === LEFT_ARROW) {
    // move.push([-1, 0]);
    snake.direction(-1, 0);
  } else if (!pause.check && keyCode === 32) {
    pause.true();
  } else if (pause.check && keyCode === 32) {
    pause.false();
  }
}
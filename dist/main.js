"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var snake = void 0,
    init = void 0,
    food = void 0,
    tail = void 0,
    grow = [[]],
    canSize = 600,
    canvasColor = 51,
    square = Math.floor(canSize / 25),
    // number of pseudo squares
fps = 10;

var Snake = function () {
  function Snake() {
    _classCallCheck(this, Snake);

    this.x = 0;
    this.y = 0;
    this.xMove = 1;
    this.yMove = 0;
    this.total = 0;
    this.body = [[]];
  }

  _createClass(Snake, [{
    key: "direction",
    value: function direction(move) {
      this.xMove = move[0];
      this.yMove = move[1];
    }
  }, {
    key: "update",
    value: function update() {
      this.x += this.xMove * square;
      this.y += this.yMove * square;
      this.x = constrain(this.x, 0, canSize - square);
      this.y = constrain(this.y, 0, canSize - square);
    }
  }, {
    key: "eat",
    value: function eat(foodPosition) {
      var distance = int(dist(this.coords()[0], this.coords()[1], foodPosition[0], foodPosition[1])); //distance between the snake and the food
      if (distance === 0) {
        this.total++;
        return true;
      } else {
        return false;
      }
    }
  }, {
    key: "coords",
    value: function coords() {
      var coords = [this.x / square, this.y / square];
      return coords;
    }
  }, {
    key: "render",
    value: function render() {
      var _this = this;

      var col = color(255, 204, 0);
      fill(col);

      this.body.map(function (i) {
        var head = createVector(_this.x, _this.y);
        rect(head.x, head.y, square, square);
      });
    }
  }]);

  return Snake;
}();

var Food = function () {
  function Food() {
    _classCallCheck(this, Food);

    this.x = Math.floor(random(canSize / square)) * square;
    this.y = Math.floor(random(canSize / square)) * square;
  }

  _createClass(Food, [{
    key: "coords",
    value: function coords() {
      var coords = [this.x / square, this.y / square];
      return coords;
    }
  }, {
    key: "render",
    value: function render() {
      fill("red");
      noStroke();
      rect(this.x, this.y, square, square, 10);
      this.coords();
    }
  }]);

  return Food;
}();

function setup() {
  createCanvas(canSize, canSize).parent("game");
  snake = new Snake();
  food = new Food();
  frameRate(fps);
}

function draw() {
  background(canvasColor);
  snake.render();
  snake.update();

  food.render();

  if (snake.eat(food.coords())) {
    console.log("nom nom");
    food = new Food();
    snake.body.push([]);
  }

  if (pause.check) {
    pause.text();
  }
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    snake.direction([0, -1]);
  } else if (keyCode === RIGHT_ARROW) {
    snake.direction([1, 0]);
  } else if (keyCode === DOWN_ARROW) {
    snake.direction([0, 1]);
  } else if (keyCode === LEFT_ARROW) {
    snake.direction([-1, 0]);
  } else if (!pause.check && keyCode === 32) {
    pause.true();
  } else if (pause.check && keyCode === 32) {
    pause.false();
  }
}

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

/*
function Game(size) {
    this.size = size;
}

Game.prototype.grid = function () {
  let cell = [];

  for (let x = this.size; x > 0; x--) {
    cell.push([]);
    $("#grid").prepend("<div id='col" + x + "'" + " " + "class=\"col\"></div>");

    for (let y = this.size; y > 0; y--) {
      cell.push(" ");

      let cellData = $("<div class=\"cell\"></div>");
      cellData.attr("data-coord", + x + ", " + y);
      $("#col" + x + "").prepend(cellData);
    }
  }
  return cell;
};


Game.prototype.coordinates = function () {
    let input, data;

    $(".cell").mouseenter(function () {
      data = $(this).data("coord");
      input = JSON.parse("[" + data + "]");
      console.log(input);
    });
};

Game.prototype.move = function (dir) {
  let i = 0;
  let coord = [20, 20];
  let init;
  let left = true,
      right = false,
      up = true,
      down = false;

    init = setInterval(function(){
      if (!right && dir === "left") {
        coord[0]--;
      }
      else if (dir === "up") {
        coord[1]--;
      }
      else if (dir === "right") {
        coord[0]++;
      }
      else if (dir === "down") {
        coord[1]++;
      }
      let pinta = $("div[data-coord='" + coord[0] + ", " + coord[1] + "']");
      pinta.addClass("negro").delay(200).queue(function(){
        $(this).removeClass("negro").dequeue();
});


    }, 200);

};

Game.prototype.bind = function () {
  let coord = [20, 20];

  $(document).on("keydown", function(event){
    switch(event.which) {
        case 37: // left //// [-1, igual]
        case 65: // A
        Game.prototype.move("left");
        coord[0]--;
        break;

        case 38: // up //// [igual, -1]
        case 87: // W
        Game.prototype.move("up");
        coord[1]--;
        break;

        case 39: // right //// [+1, igual]
        case 68: // D
        Game.prototype.move("right");
        coord[0]++;
        break;

        case 40: // down //// [igual, +1]
        case 83:  // Sa
        Game.prototype.move("down");
        coord[1]++;
        break;

        case 32: //bar //// pausa
        console.log("bar");
        break;

        default: return;
    }
    event.preventDefault();

  });
};






// let arr = [[18, 20], [19, 20], [20, 20]];
// Game.prototype.alarga = function(val) {
//   val.push(val);
//   this.snake(arr);
// };
//
//
// Game.prototype.snake = function (val) {
//   val.map((x) => {
//     let pinta = $("div[data-coord='" + x[0] + ", " + x[1] + "']");
//     pinta.addClass("negro");
//   });
// };
//
// Game.prototype.move = function(val) {
//   let right = [];
//   val.map((x) => {
//     right.push([x[0] + 1, x[1]]);
//   });
//   this.snake(right);
// };
//
//
$(function(){
  game.grid();
  game.bind();
});



const game = new Game(40);

*/
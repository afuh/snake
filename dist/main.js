"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var snake = void 0,
    food = void 0,
    tail = void 0,
    grow = [[]],
    canSize = 600,
    canvasColor = 51,
    square = Math.floor(canSize / 30),
    // number of pseudo squares
fps = 8;

var Snake = function () {
  function Snake() {
    _classCallCheck(this, Snake);

    this.pos = createVector(0, 0);
    this.speed = createVector(1, 0);
    this.score = 0;
    this.tail = [];
  }

  _createClass(Snake, [{
    key: "direction",
    value: function direction(move) {
      if (move[0] * this.speed.x < 0) {
        return;
      } else if (move[1] * this.speed.y < 0) {
        return;
      }

      this.speed.x = move[0];
      this.speed.y = move[1];
    }
  }, {
    key: "eat",
    value: function eat(foodPosition) {
      var distance = int(dist(this.coords()[0], this.coords()[1], foodPosition[0], foodPosition[1])); //distance between the snake and the food
      if (distance === 0) {
        this.score++;
        // fps++;
        return true;
      } else {
        return false;
      }
    }
  }, {
    key: "coords",
    value: function coords() {
      var coords = [this.pos.x / square, this.pos.y / square];
      return coords;
    }
  }, {
    key: "death",
    value: function death() {
      if (this.pos.x < 0 || this.pos.y < 0 || this.pos.x >= canSize || this.pos.y >= canSize) {
        state.death();
      }
      for (var i = 0; i < this.tail.length; i++) {
        if (this.tail[i].x == this.pos.x && this.tail[i].y == this.pos.y) {
          state.death();
        }
      }
    }
  }, {
    key: "update",
    value: function update() {
      for (var i = 0; i < this.tail.length - 1; i++) {
        this.tail[i] = this.tail[i + 1];
      }
      if (this.score >= 1) {
        this.tail[this.score - 1] = createVector(this.pos.x, this.pos.y);
      }
      this.pos.x += this.speed.x * square;
      this.pos.y += this.speed.y * square;
      snake.death();
    }
  }, {
    key: "render",
    value: function render() {
      var col = color(255, 204, 0);
      fill(col);
      noStroke();

      for (var i = 0; i < this.tail.length; i++) {
        rect(this.tail[i].x, this.tail[i].y, square, square);
      }

      rect(this.pos.x, this.pos.y, square, square);
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
      fill(255);
      rect(this.x, this.y, square, square);
      this.coords();
    }
  }]);

  return Food;
}();

var state = {
  game: true,
  run: function run() {
    state.game = true;
    frameRate(fps);
    background(canvasColor);
    snake.render();
    snake.update();
    food.render();
    message.score();

    if (snake.eat(food.coords())) {
      food = new Food();
    }
  },
  death: function death() {
    noLoop();
    snake.constructor();
    state.game = false;
    message.death();
    fps = 6;
  },
  pause: function pause() {
    if (!state.game) {
      loop();
      state.game = true;
    }
  }
};

//====== Setup =======
function setup() {
  createCanvas(canSize, canSize).parent("game");
  stroke(255);
  noFill();
  snake = new Snake();
  food = new Food();
}

function draw() {
  state.run();
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
  } else if (keyCode === 32) {
    // spacebar
    state.pause();
  }
}

var message = {
  death: function death() {
    textSize(32);
    var msg = "game over",
        msg2 = "press spacebar to play again";
    var msgW = textWidth(msg),
        msg2W = textWidth(msg2);

    fill(255);
    text(msg, canSize / 2 - msg2W / 2, canSize / 2);

    textSize(30);
    text(msg2, canSize / 2 - msg2W / 2, canSize / 2 + square);
  },
  score: function score() {
    textSize(22);
    fill(255);
    var msg = "score " + snake.score * 100,
        msgW = textWidth(msg);

    text(msg, 2, canSize);
  }
};
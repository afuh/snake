let snake,
    food,
    tail,
    grow = [[]],
    canSize = 600,
    canvasColor = 51,
    square = Math.floor(canSize/30), // number of pseudo squares
    fps = 8;

class Snake {
  constructor(){
      this.pos = createVector(0, 0);
      this.speed = createVector(1, 0);
      this.score = 0;
      this.tail = [];
  }
  direction(move){
    if(move[0] * this.speed.x < 0) {
      return;
    }
    else if (move[1] * this.speed.y < 0 ){
      return;
    }

    this.speed.x = move[0];
    this.speed.y = move[1];
  }
  eat(foodPosition){
      const distance = int(dist(this.coords()[0], this.coords()[1], foodPosition[0], foodPosition[1])); //distance between the snake and the food
      if (distance === 0){
        this.score++;
        // fps++;
        return true;
      } else {
        return false;
      }
  }
  coords(){
      let coords = [this.pos.x/square, this.pos.y/square];
      return coords;
  }
  death(){
      if (this.pos.x < 0 || this.pos.y < 0 || this.pos.x >= canSize|| this.pos.y >= canSize){
        state.death();
      }
      for(let i = 0; i < this.tail.length; i++){
        if(this.tail[i].x == this.pos.x && this.tail[i].y == this.pos.y){
          state.death();
        }
      }
  }
  update(){
      for (let i = 0; i < this.tail.length - 1; i++) {
        this.tail[i] = this.tail[i + 1];
      }
      if (this.score >= 1) {
        this.tail[this.score - 1] = createVector(this.pos.x, this.pos.y);
      }
      this.pos.x += this.speed.x * square;
      this.pos.y += this.speed.y * square;
      snake.death();
  }
  render(){
      const col = color(255, 204, 0);
      fill(col);
      noStroke();

      for(let i = 0; i < this.tail.length; i++){
        rect(this.tail[i].x, this.tail[i].y, square, square);
      }

      rect(this.pos.x, this.pos.y, square, square);
  }
}

class Food{
  constructor() {
      this.x = Math.floor(random(canSize/square)) * square;
      this.y = Math.floor(random(canSize/square)) * square;
  }
  coords(){
      let coords = [this.x/square, this.y/square];
      return coords;
  }
  render(){
      fill(255);
      rect(this.x, this.y, square, square);
      this.coords();
  }
}

const state = {
  game: true,
  run: () => {
      state.game = true;
      frameRate(fps);
      background(canvasColor);
      snake.render();
      snake.update();
      food.render();
      message.score();

      if (snake.eat(food.coords())){
        food = new Food();
      }
  },
  death: () => {
      noLoop();
      snake.constructor();
      state.game = false;
      message.death();
      fps = 6;
  },
  pause: () => {
      if (!state.game){
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

function keyPressed(){
  if(keyCode === UP_ARROW) {
    snake.direction([0, -1]);
  }
  else if(keyCode === RIGHT_ARROW){
    snake.direction([1, 0]);
  }
  else if(keyCode === DOWN_ARROW){
    snake.direction([0, 1]);
  }
  else if(keyCode === LEFT_ARROW){
    snake.direction([-1, 0]);
  }
  else if(keyCode === 32){ // spacebar
    state.pause ();
  }
}

const message = {
  death: () => {
    textSize(32);
    let msg = "game over",
        msg2 = "press spacebar to play again";
    let msgW = textWidth(msg),
        msg2W = textWidth(msg2);

    fill(255);
    text(msg, canSize/2 - msg2W/2, canSize/2);

    textSize(30);
    text(msg2, canSize/2 - msg2W/2, canSize/2 + square);
  },
  score: () =>{
    textSize(22);
    fill(255);
    let msg = "score " + snake.score * 100,
        msgW = textWidth(msg);

    text(msg, 2, canSize);
  }
};

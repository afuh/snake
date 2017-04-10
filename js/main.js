let snake,
    move = [1, 0],
    food,
    canSize = 600,
    canvasColor = 51,
    square = Math.floor(canSize/30), // That would be a 30x30 grid
    fps = 8;

// =================== Snake ====================
class Snake {
  constructor(){
      this.pos = createVector(canSize/2, canSize/2); // initial position
      this.speed = createVector(1, 0);
      this.score = 0;
      this.tail = [];
  }
  direction(dir){
      //prevents it from moving in the opposite direction
      if (dir[0] * this.speed.x < 0) {
        return;
      }
      else if (dir[1] * this.speed.y < 0 ){
        return;
      }
      this.speed.x = dir[0];
      this.speed.y = dir[1];
  }
  eat(foodPosition){ //calculate the distance between the snake and the food
      const distance = int(dist(this.coords()[0], this.coords()[1], foodPosition[0], foodPosition[1]));
      if (distance === 0){
        this.score++;
        fps++;
        return true;
      } else {
        return false;
      }
  }
  coords(){ // Snake's head coordinates
      let coords = [this.pos.x/square, this.pos.y/square];
      return coords;
  }
  death(){ // If the snake collides with the edge, the game is over.
      if (this.pos.x < 0 || this.pos.y < 0 || this.pos.x >= canSize|| this.pos.y >= canSize){
        state.death();
      }
      // If the snake collides with its own tail, the game is over.
      for(let i = 0; i < this.tail.length; i++){
        if(this.tail[i].x == this.pos.x && this.tail[i].y == this.pos.y){
          state.death();
        }
      }
  }
  update(){
      snake.direction(move);
      // Create the tail
      for (let i = 0; i < this.tail.length - 1; i++) {
        this.tail[i] = this.tail[i + 1];
      }
      if (this.score >= 1) {
        this.tail[this.score - 1] = createVector(this.pos.x, this.pos.y);
      }

      this.pos.x += this.speed.x * square;
      this.pos.y += this.speed.y * square;

      snake.death(); // In every "turn" check if the snake dies.
  }
  render(){
      const snakeColor = color(255, 204, 0);
      fill(snakeColor);
      noStroke();

      for(let i = 0; i < this.tail.length; i++){
        rect(this.tail[i].x, this.tail[i].y, square, square); //Create the body
      }

      rect(this.pos.x, this.pos.y, square, square); // Create the head
  }
}

// =================== Food ====================
class Food{
  constructor() {
      this.x = Math.floor(random(canSize/square)) * square;
      this.y = Math.floor(random(canSize/square)) * square;
  }
  coords(){ //Food coordinates. They are used to check the distance between the food and the snake.
      let coords = [this.x/square, this.y/square];
      return coords;
  }
  render(){
      fill(255);
      rect(this.x, this.y, square, square); // create food in a random position.
      this.coords();
  }
}

// =================== Game state ====================
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
      state.game = false;
      message.death();
      fps = 6;
      snake = new Snake();
  },
  pause: () => {
      if (!state.game){
        loop();
        state.game = true;
      }
  }
};

// =================== P5 Setup ====================
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
    move = [0, -1];
  }
  else if(keyCode === RIGHT_ARROW){
    move = [1, 0];
  }
  else if(keyCode === DOWN_ARROW){
    move = [0, 1];
  }
  else if(keyCode === LEFT_ARROW){
    move = [-1, 0];
  }
  else if(keyCode === 32){ // spacebar
    state.pause ();
  }
}

// =================== Messages ====================
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
  score: () => {
    textSize(22);
    fill(255);
    let msg = "score " + snake.score * 100,
        msgW = textWidth(msg);
    text(msg, 2, canSize);
  }
};

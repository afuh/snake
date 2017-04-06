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
      $("#col" + x + "").prepend("<div class=\"cell\" data-pos='" + x + ", " + y +  "'></div>");
    }
  }
  return cell;
};

Game.prototype.coordinates = function () {
    let input, data;

    $(".cell").mouseenter(function () {
      data = $(this).data("pos");
      input = JSON.parse("[" + data + "]");
      console.log(input);
    });
};

$(function(){
  game.grid();


let coord = [20, 20];
  $(document).on("keydown", function(event){
    switch(event.which) {
        case 37: // left //// [-1, igual]
        coord[0]--;
        break;

        case 38: // up //// [igual, -1]
        coord[1]--;
        break;

        case 39: // right //// [+1, igual]
        coord[0]++;
        break;

        case 40: // down //// [igual, +1]
        coord[1]++;
        break;

        case 32: //bar //// pausa
        console.log("bar");
        break;

        default: return;
    }
    event.preventDefault();

console.log(coord);
  let pinta = $("div[data-pos='" + coord[0] + ", " + coord[1] + "']");
pinta.addClass("negro");

  });

  $("div[data-pos='20, 20']").addClass("negro");

});


const game = new Game(40);

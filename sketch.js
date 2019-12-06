// # Created by: crunchypi
// # implementation of: Conway's game of life
// # https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life

let tileSize = 10 // # root
let percentToFill = 15 // # initial state 

let canvasWidht = 600
let canvasHeight = 400

function setup() {
  createCanvas(canvasWidht, canvasHeight);
  this.grid = new Grid(tileSize)
  this.grid.randomFill(percentToFill)
  this.grid.setSnapShot()
}

function draw() {
  background(220);
  this.grid.update_snapshot()
  this.grid.render()
  //wait(1000)
}




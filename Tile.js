class Tile {
  constructor(_xPos, _yPos, _size, _coordinates) {
    this.xPos = _xPos
    this.yPos = _yPos
    this.size = _size
    this.coordinates = _coordinates

    this.setNotOccupied()
  }
  
  setOccupied() {
    this.occupied = true
    this.color = [102, 0, 51] //[90,32,103]
  }
  setNotOccupied() {
    this.occupied = false
    this.color = [30]
  }
  

  render() {
    //noStroke()
    stroke(0)
    fill(this.color)
    rect(this.xPos, this.yPos, this.size, this.size)
  }
}
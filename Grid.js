class Grid {
  constructor(_sizeRoot){
  let rowCount = height / _sizeRoot
  let colCount = width / _sizeRoot
  
  let tiles = []
  for (let x = 0; x < rowCount;  x++) {
    let temp = []
    for (let y = 0; y < colCount; y++) {
      let newTile = new Tile(y * _sizeRoot, 
                             x * _sizeRoot, _sizeRoot, 
                             [x,y])
      temp.push(newTile)
    }
    tiles.push(temp)
  }
    
  this.tiles = tiles
  this.rowCount = rowCount
  this.colCount = colCount
  }
  
  
  randomFill(_percentLive) {
    for (let x = 0; x < this.rowCount; x++) {
      for (let y = 0; y < this.colCount; y++) {
        let result = random(0,100)
        if (result <= _percentLive) {
          this.tiles[x][y].setOccupied()
        }
      }
    }
  }
  
  
  countNeighbours(_tile) {
    let neighboursCount = 0
    let rows = this.tiles.length
    let cols = this.tiles[0].length
    
    let x = _tile.coordinates[0]
    let y = _tile.coordinates[1]
    
    function wrapper(_coord, _selection, _rowCol){
      if (_coord[_selection] > _rowCol - 1) {
        _coord[_selection] -= _rowCol
      }
      if (_coord[_selection] < 0) {
        _coord[_selection] += _rowCol
      }
    }
    
    let n = [x+1,y]
    let ne = [x+1,y+1]
    let e = [x,y+1]
    let se = [x-1,y+1]
    let s = [x-1,y]
    let sw = [x-1,y-1]
    let w = [x,y-1]
    let nw = [x+1,y-1]
    
    let collection = [n, ne, e, se, s, sw, w, nw]
    
    for (let i = 0; i < collection.length; i++) {
      let coord = collection[i]
      wrapper(coord,0, rows)
      wrapper(coord,1,cols)
      
      let x = coord[0]
      let y = coord[1]
      let neighbour = this.tiles[x][y]
      if (neighbour.occupied) {
        neighboursCount ++ 
      }
    }
    return neighboursCount
  }
  
  
  rules(_tile) {
    let neighbourCount = this.countNeighbours(_tile) 
    
    if (_tile.occupied) {
      if (neighbourCount < 2) {
        _tile.nextGen = false
      }
      else if (neighbourCount == 2) {
        _tile.nextGen = true
      }
      else if (neighbourCount > 3) {
        _tile.nextGen = false
      }
    }
    else if (neighbourCount == 3) {
      _tile.nextGen = true
    }
  }
  
  
  setSnapShot() { 
    for (let x = 0; x < this.rowCount; x++) {
      for (let y = 0; y < this.colCount; y++) {
        let tile = this.tiles[x][y]
        this.rules(tile)
      }
    }
  }
  
  
  loadSnapShot() {
    for (let x = 0; x < this.rowCount; x++) {
      for (let y = 0; y < this.colCount; y++) {
        let tile = this.tiles[x][y]
        if (tile.nextGen) {
          tile.setOccupied()
        }
        else {
          tile.setNotOccupied()
        }
      }
    }
  }
  
  
  update_snapshot() { 
    this.loadSnapShot()
    this.setSnapShot()
  }
 
  
  render() {
    for (let x = 0; x < this.rowCount; x++) {
      for (let y = 0; y < this.colCount; y++) {
        this.tiles[x][y].render()
      }
    }
  }
  
}
import React, {useState, useEffect} from 'react'
import './App.css'

const gridRows = 200
const gridColumns = 50

// Array of arrays. First rows, then columns
const masterGrid = []

for (let y = 0; y < gridRows; y++) {
  const row = []
  for (let x = 0; x < gridColumns; x++) {
    row.push(
      {
        lit: false
      }
    )
  }
  masterGrid.push(row)
}

function App() {

  const [grid, setGrid] = useState(masterGrid)

  // Restore saved version
  useEffect(() => {
    const existingGrid = window.localStorage.getItem('grid')
    if (existingGrid) {
      setGrid(JSON.parse(existingGrid))
    }
  }, [])

  // Save after each click
  useEffect(() => {
    window.localStorage.setItem('grid', JSON.stringify(grid))
  })

  const toggleCoordinate = (x, y) => {
    const clonedGrid = JSON.parse(JSON.stringify(grid))
    clonedGrid[y][x].lit = !clonedGrid[y][x].lit
    setGrid(clonedGrid)
  }

  return (
    <div>
      {
        grid.map((y, yIndex) => {
          return (
            <div style={{display: 'flex'}} key={yIndex}>
              {
                y.map((x, xIndex) => {
                  return (
                    <div className='grid' index={`${xIndex}${yIndex}`} key={xIndex}>
                      <a href='#' onClick={() => toggleCoordinate(xIndex, yIndex)}>
                        <div className={`fa fa-circle ${x.lit ? 'lit' : 'unlit'}`} />
                      </a>
                    </div>
                  )
                })
              }
            </div>
          )
        })
      }
    </div>
  )
}

export default App

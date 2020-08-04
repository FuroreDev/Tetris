document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid')
    const width = 10
    let squares = Array.from(document.querySelectorAll('.grid div'))
    const ScoreDisplay = document.querySelector('#score')
    const StartBtn = document.querySelector('#start-button')
    let frozen = false
    let finalMove = false

    //The Tetrominoes
    const lTetromino = [
        [1, width+1, width*2+1, 2],
        [width, width+1, width+2, width*2+2],
        [1, width+1, width*2+1, width *2],
        [width, width*2, width*2+1, width*2+2]
    ]

    const zTetromino = [
        [0,width,width+1,width*2+1],
        [width+1, width+2,width*2,width*2+1],
        [0,width,width+1,width*2+1],
        [width+1, width+2,width*2,width*2+1]
    ]
    
      const tTetromino = [
        [1,width,width+1,width+2],
        [1,width+1,width+2,width*2+1],
        [width,width+1,width+2,width*2+1],
        [1,width,width+1,width*2+1]
    ]
    
      const oTetromino = [
        [0,1,width,width+1],
        [0,1,width,width+1],
        [0,1,width,width+1],
        [0,1,width,width+1]
    ]
    
      const iTetromino = [
        [1,width+1,width*2+1,width*3+1],
        [width,width+1,width+2,width+3],
        [1,width+1,width*2+1,width*3+1],
        [width,width+1,width+2,width+3]
    ]

    const theTetrominoes = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino]

    let currentPosition = 4
    let currentRotation = 0

    // Randomly select a Tetromino and its first rotation
    let random = Math.floor(Math.random()*theTetrominoes.length)
    let current = theTetrominoes[random][currentRotation]

    //draw the Tetromino
    function draw () {
        current.forEach(index => {
            squares[currentPosition + index].classList.add('tetromino')
        })
    }

    // Undraw the Tetromino
    function undraw () {
        current.forEach(index => {
            squares[currentPosition + index].classList.remove('tetromino')
        })
    }

    // Make the tetromino move down every second
    draw()
    timerId = setInterval(moveDown, 500)

    // assign funcitons to keycodes
    function control(e) {
        // Left Arrow...
        if(e.keyCode === 37)
            moveLeft()
        // Up Arrow...
        else if (e.keyCode === 38)
            rotate()
        // Right Arrow...
        else if (e.keyCode === 39)
            moveRight()
        // Down Arrow...
        else if (e.keyCode === 40)
            moveDown()
    }
    document.addEventListener('keyup', control)

    function moveDown() {
        if (finalMove) {
            // Give the played time to move it in final position...
            finalMove = false
            frozen = true
            return
        }
        if (frozen) {
            // Check one more time to see if they can now move...
            checkFinalMove() 
            if (!finalMove) {
                frozen = false
                return 
            }
            setTaken()
            newTetremino()
            frozon = false
            finalMove = false
            return
        }
        undraw()
        currentPosition += width
        draw()
        checkFinalMove()
    }
    
    // Freeze
    function checkFinalMove () {
        if  (current.some(index => squares[currentPosition + index + width].classList.contains('taken')))
            finalMove = true
        else finalMove = false
    }

    // Set taken boxes on grid
    function setTaken () {
        current.forEach(index =>squares[currentPosition + index].classList.add('taken'))
    }

    function newTetremino () {
        // Start a new tetromino falling
        random = Math.floor(Math.random() * theTetrominoes.length)
        current = theTetrominoes[random][currentRotation]
        currentPosition = 4
        draw()
    }

    // move the Tetremino left, if there is room on the grid
    function moveLeft() {
        undraw()
        const isAtLeftEdge = current.some(index => (currentPosition + index) % width === 0)

        if(!isAtLeftEdge) currentPosition -=1

        if(current.some(index => squares[currentPosition +index].classList.contains('taken')))
        currentPosition +=1

        draw()
    }

    // move the Tetremino right, if there is room on the grid
    function moveRight() {
        undraw()
        
        const isAtRightEdge = current.some(index => (currentPosition + index) % width === width -1)

        if(!isAtRightEdge) currentPosition +=1

        if(current.some(index => squares[currentPosition +index].classList.contains('taken')))
        currentPosition -=1

        draw()
    }

    function rotate() {
        undraw()
        currentRotation++
        if (currentRotation === current.length) {
            currentRotation = 0
        }
        current = theTetrominoes[random][currentRotation]
        draw()
    }
})
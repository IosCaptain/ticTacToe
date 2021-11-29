let clickCounter = 0
let boardButtons = document.querySelectorAll('.buttons')
let playerTurn = document.querySelector('.playerTurn')
let newGameButton = document.querySelector('.newGame')
let squareContainer = document.querySelector('#squareContainer')

let oneOne = document.querySelector('#oneOne')
let oneTwo = document.querySelector('#oneTwo')
let oneThree = document.querySelector('#oneThree')
let twoOne = document.querySelector('#twoOne')
let twoTwo = document.querySelector('#twoTwo')
let twoThree = document.querySelector('#twoThree')
let threeOne = document.querySelector('#threeOne')
let threeTwo = document.querySelector('#threeTwo')
let threeThree = document.querySelector('#threeThree')

for(i=0; i<boardButtons.length; i++) {
    boardButtons[i].addEventListener('click', markXorO)
}
newGameButton.addEventListener('click',function() {
    squareContainer.reload()
})
// Functions
function markXorO(event) {
    if(clickCounter % 2 == 0) {
        event.currentTarget.innerHTML = 'X'
        clickCounter += 1
        event.currentTarget.setAttribute('data-point', '1')
        event.currentTarget.removeEventListener('click', markXorO)
        console.log(event.currentTarget)
        playerTurn.innerHTML = 'Player 2 Turn'
    } else {
        event.currentTarget.innerHTML = 'O'
        clickCounter += 1
        event.currentTarget.setAttribute('data-point', '-1')
        event.currentTarget.removeEventListener('click', markXorO)
        console.log(event.currentTarget)
        playerTurn.innerHTML = 'Player 1 Turn'
    }
    let row1WinningContainer = parseInt(oneOne.getAttribute('data-point')) + parseInt(oneTwo.getAttribute('data-point')) + parseInt(oneThree.getAttribute('data-point'))
    let row2WinningContainer = parseInt(twoOne.getAttribute('data-point')) + parseInt(twoTwo.getAttribute('data-point')) + parseInt(twoThree.getAttribute('data-point'))
    let row3WinningContainer = parseInt(threeOne.getAttribute('data-point')) + parseInt(threeTwo.getAttribute('data-point')) + parseInt(threeThree.getAttribute('data-point'))

    let column1WinningContainer = parseInt(oneOne.getAttribute('data-point')) + parseInt(twoOne.getAttribute('data-point')) + parseInt(threeOne.getAttribute('data-point'))
    let column2WinningContainer = parseInt(oneTwo.getAttribute('data-point')) + parseInt(twoTwo.getAttribute('data-point')) + parseInt(threeTwo.getAttribute('data-point'))
    let column3WinningContainer = parseInt(oneThree.getAttribute('data-point')) + parseInt(twoThree.getAttribute('data-point')) + parseInt(threeThree.getAttribute('data-point'))

    let diagonal1WinningContainer = parseInt(oneOne.getAttribute('data-point')) + parseInt(twoTwo.getAttribute('data-point')) + parseInt(threeThree.getAttribute('data-point'))
    let diagonal2WinningContainer = parseInt(oneThree.getAttribute('data-point')) + parseInt(twoTwo.getAttribute('data-point')) + parseInt(threeOne.getAttribute('data-point'))

    switch(true) {
        case (row1WinningContainer == 3 || row2WinningContainer == 3 || row3WinningContainer == 3 || column1WinningContainer == 3 || column2WinningContainer == 3 || column3WinningContainer == 3 || diagonal1WinningContainer == 3 || diagonal2WinningContainer == 3):
            alert('Player 1 has won')
            for(i=0; i<boardButtons.length; i++) {
                boardButtons[i].removeEventListener('click', markXorO)
            }
            playerTurn.innerHTML = 'Congratulations Player 1'
            break
        case (row1WinningContainer == -3 || row2WinningContainer == -3 || row3WinningContainer == -3 || column1WinningContainer == -3 || column2WinningContainer == -3 || column3WinningContainer == -3 || diagonal1WinningContainer == -3 || diagonal2WinningContainer == -3):
            alert('Player 2 has won')
            for(i=0; i<boardButtons.length; i++) {
                boardButtons[i].removeEventListener('click', markXorO)
            }
            playerTurn.innerHTML = 'Congratulations Player 2'
            break
        case (row1WinningContainer + row2WinningContainer + row3WinningContainer == 1):
            alert('This game is a tie')
            playerTurn.innerHTML = 'This game is a tie'
    }    
}

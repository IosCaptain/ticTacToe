let clickCounter = 0
let playerOneWinCount = 0//parseInt(localStorage.getItem('player1')) // Needs to be changed
let playerTwoWinCount = 0//parseInt(localStorage.getItem('player2')) // Needs to be changed
let tieCount = 0//parseInt(localStorage.getItem('ties')) // Needs to be changed

firstTimeOpening()

let audioOne = new Audio('sound1.wav')
let audioTwo = new Audio('sound2.wav')

let playerOneWinCountContainer = document.querySelector('.playerOneWinCount')
let playerTwoWinCountContainer = document.querySelector('.playerTwoWinCount')
let tieCountContainer = document.querySelector('.tieCount')

playerOneWinCountContainer.innerHTML = `Player One Wins: ${playerOneWinCount}`
playerTwoWinCountContainer.innerHTML = `Player Two Wins: ${playerTwoWinCount}`
tieCountContainer.innerHTML = `Ties: ${tieCount}`

let boardButtons = document.querySelectorAll('.buttons')
let playerTurn = document.querySelector('.playerTurn')
let newGameButton = document.querySelector('.newGame')
let resetGlobalCountButton = document.querySelector('.resetCount')
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
    for(i=0; i<boardButtons.length; i++) {
        boardButtons[i].innerHTML = '-'
        boardButtons[i].addEventListener('click', markXorO)
        boardButtons[i].removeAttribute('data-point')
        clickCounter = 0
        playerTurn.innerHTML = 'Player 1 Turn'
    }
})
resetGlobalCountButton.addEventListener('click', function() {
    playerOneWinCount = 0
    playerTwoWinCount = 0
    tieCount = 0
    playerOneWinCountContainer.innerHTML = `Player One Wins: ${playerOneWinCount}`
    playerTwoWinCountContainer.innerHTML = `Player Two Wins: ${playerTwoWinCount}`
    tieCountContainer.innerHTML = `Ties: ${tieCount}`

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
        audioOne.play()
        checkForWin()
    } else {
        event.currentTarget.innerHTML = 'O'
        clickCounter += 1
        event.currentTarget.setAttribute('data-point', '-1')
        event.currentTarget.removeEventListener('click', markXorO)
        console.log(event.currentTarget)
        playerTurn.innerHTML = 'Player 1 Turn'
        audioTwo.play()
        checkForWin()
    }
}

function checkForWin() {
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
            for(i=0; i<boardButtons.length; i++) {
                boardButtons[i].removeEventListener('click', markXorO)
            }
            playerTurn.innerHTML = 'Congratulations Player 1'
            playerOneWinCount += 1
            playerOneWinCountContainer.innerHTML = `Player One Wins: ${playerOneWinCount}`
            storeWinsCounter()
            break
        case (row1WinningContainer == -3 || row2WinningContainer == -3 || row3WinningContainer == -3 || column1WinningContainer == -3 || column2WinningContainer == -3 || column3WinningContainer == -3 || diagonal1WinningContainer == -3 || diagonal2WinningContainer == -3):
            for(i=0; i<boardButtons.length; i++) {
                boardButtons[i].removeEventListener('click', markXorO)
            }
            playerTurn.innerHTML = 'Congratulations Player 2'
            playerTwoWinCount += 1
            playerTwoWinCountContainer.innerHTML = `Player Two Wins: ${playerTwoWinCount}`
            storeWinsCounter()
            break
        case (row1WinningContainer + row2WinningContainer + row3WinningContainer == 1):
            playerTurn.innerHTML = 'This game is a tie'
            tieCount += 1
            tieCountContainer.innerHTML = `Ties: ${tieCount}`
            storeWinsCounter()
    }    
}

function storeWinsCounter() {
    localStorage.setItem('player1', playerOneWinCount)
    localStorage.setItem('player2', playerTwoWinCount)
    localStorage.setItem('ties', tieCount)
}

function firstTimeOpening() {
    if (localStorage.getItem('player1') != 'NaN') {
        playerOneWinCount = parseInt(localStorage.getItem('player1'))
    } if (localStorage.getItem('player2') != 'NaN') {
        playerTwoWinCount = parseInt(localStorage.getItem('player2'))
    } if(localStorage.getItem('ties') != 'NaN') {
        tieCount = parseInt(localStorage.getItem('ties'))
    } else {
        playerOneWinCount = 0
        playerTwoWinCount = 0
        tieCount = 0
    }
}
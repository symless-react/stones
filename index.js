/*
 * Note: assert is not a testing framework, and is not intended to be used as a general purpose assertion library
 * but I think it is okay for the purpose of this task. It's for simplicity and to avoid external dependencies.
 */
const assert = require('assert')

const PLAYER1 = true
const PLAYER2 = false

/*
 * Write a function using JavaScript (Node.js) to determine whether you can win
 * the game given the number of stones in the heap. You will always take the
 * first turn.
 */
const whoCanWinThisGameSimplified = x => x !== 0 && x % 4 === 0 ? PLAYER2 : PLAYER1

/*
 * It can tell us from a specific game state, who are the one who can surely
 * win that situation if he/she knows how to do the trick.
 */
const whoIs = player => player === PLAYER1 ? 'Player1' : 'Player2'
const whoCanWinThisGame = gameState => gameState.stonesLeft !== 0 && gameState.stonesLeft % 4 === 0 ? !gameState.actualPlayer : gameState.actualPlayer

/*
 * This is a tail recursive implementation of the whole game between two
 * automatic players. Set LOGGING to true in the interest of to print the
 * game states out to the console. Otherwise it will be run silence.
 */
const heapOfStones = x => {
  const logGameState = ({stonesLeft, actualPlayer}, playerMove) => {
    if (stonesLeft === 0) {
      console.log(`The game has ended. The winner is ${whoIs(actualPlayer)}`)
    } else {
      console.log(`Stones left: ${stonesLeft}, Player: ${whoIs(actualPlayer)} has removed ${playerMove} stone(s).`)
    }
  }
  const play = gameState => {
    if (gameState.stonesLeft > 3) {
      let playerMove
      if (gameState.stonesLeft % 4 === 0) {
        playerMove = Math.floor((Math.random() * 3) + 1)
      } else {
        playerMove = gameState.stonesLeft % 4
      }
      if (LOGGING) {
        logGameState(gameState, playerMove)
      }
      return play({ stonesLeft: gameState.stonesLeft - playerMove, actualPlayer: !gameState.actualPlayer })
    } else {
      if (LOGGING) {
        logGameState(gameState, gameState.stonesLeft)
      }
      return {
        stonesLeft: 0,
        actualPlayer: gameState.actualPlayer
      }
    }
  }
  const startState = { stonesLeft: x >= 0 ? x : 0, actualPlayer: PLAYER1 }
  LOGGING ? logGameState(play(startState)) : play(startState)
}

const LOGGING = true

heapOfStones(40)
//heapOfStones(34)
//heapOfStones(1)
//heapOfStones(0)
//heapOfStones(-5)


/* Some test methods */
assert(PLAYER2 === whoCanWinThisGame({
  stonesLeft: 0,
  actualPlayer: PLAYER2,
}))

assert(PLAYER1 === whoCanWinThisGame({
  stonesLeft: 8,
  actualPlayer: PLAYER2,
}))

assert('Player1' === whoIs(whoCanWinThisGame({
  stonesLeft: 8,
  actualPlayer: PLAYER2,
})))

assert('Player2' === whoIs(whoCanWinThisGame({
  stonesLeft: 3,
  actualPlayer: PLAYER2,
})))

/* Actually, this should rather raise an exception. */
assert(PLAYER2 === whoCanWinThisGame({
  stonesLeft: -2,
  actualPlayer: PLAYER2,
}))

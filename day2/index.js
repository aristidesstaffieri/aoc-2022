const fs = require('fs/promises')

const FIRST_COLUMN = {
  A: 'ROCK',
  B: 'PAPER',
  C: 'SCISSORS'
}

const SECOND_COLUMN = {
  X: 'ROCK',
  Y: 'PAPER',
  Z: 'SCISSORS'
}

const OUTCOMES = {
  X: 'LOSE',
  Y: 'DRAW',
  Z: 'WIN'
}

const SCORES = {
  ROCK: 1,
  PAPER: 2,
  SCISSORS: 3,
  LOSE: 0,
  DRAW: 3,
  WIN: 6
}

function scoreForHand(theirs, yours) {
  if (theirs === 'ROCK') {
    if (yours === 'PAPER') {
      return SCORES.WIN
    }

    if (yours === 'ROCK') {
      return SCORES.DRAW
    }

    if (yours === 'SCISSORS') {
      return SCORES.LOSE
    }
  }

  if (theirs === 'PAPER') {
    if (yours === 'PAPER') {
      return SCORES.DRAW
    }

    if (yours === 'ROCK') {
      return SCORES.LOSE
    }

    if (yours === 'SCISSORS') {
      return SCORES.WIN
    }
  }

  if (theirs === 'SCISSORS') {
    if (yours === 'PAPER') {
      return SCORES.LOSE
    }

    if (yours === 'ROCK') {
      return SCORES.WIN
    }

    if (yours === 'SCISSORS') {
      return SCORES.DRAW
    }
  }
}

async function part1() {
  try {
    const data = await fs.readFile('./input.txt', { encoding: 'utf8' })
    const game = data.split('\n')
    const totalScore = game.map(strategy => {
      const [_theirs, _yours] = strategy.split(' ')
      const theirs = _theirs.trim()
      const yours = _yours.trim()

      const handScore = SCORES[SECOND_COLUMN[yours]]
      const gameScore = scoreForHand(FIRST_COLUMN[theirs], SECOND_COLUMN[yours])

      return handScore + gameScore
    })

    console.log(totalScore.reduce((prev, curr) => prev + curr))
    
  } catch (err) {
    console.log(err)
  }
}

function moveForOutcome(theirs, outcome) {
  if (theirs === 'ROCK') {
    if (outcome === 'LOSE') {
      return 'Z'
    }

    if (outcome === 'DRAW') {
      return 'X'
    }

    if (outcome === 'WIN') {
      return 'Y'
    }
  }

  if (theirs === 'PAPER') {
    if (outcome === 'LOSE') {
      return 'X'
    }

    if (outcome === 'DRAW') {
      return 'Y'
    }

    if (outcome === 'WIN') {
      return 'Z'
    }
  }

  if (theirs === 'SCISSORS') {
    if (outcome === 'LOSE') {
      return 'Y'
    }

    if (outcome === 'DRAW') {
      return 'Z'
    }

    if (outcome === 'WIN') {
      return 'X'
    }
  }
}

async function part2() {
  try {
    const data = await fs.readFile('./input.txt', { encoding: 'utf8' })
    const game = data.split('\n')
    const totalScore = game.map(strategy => {
      const [_theirs, _outcome] = strategy.split(' ')
      const theirs = _theirs.trim()
      const outcomeCode = _outcome.trim()

      const outcome = OUTCOMES[outcomeCode]
      const yours = moveForOutcome(FIRST_COLUMN[theirs], outcome)

      const handScore = SCORES[SECOND_COLUMN[yours]]
      const gameScore = scoreForHand(FIRST_COLUMN[theirs], SECOND_COLUMN[yours])

      console.log(yours)

      return handScore + gameScore
    })

    console.log(totalScore.reduce((prev, curr) => prev + curr))
    
  } catch (err) {
    console.log(err)
  }
}

part2()

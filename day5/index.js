const fs = require('fs/promises')
const path = require('path')

const inputFile = path.join(__dirname, '/input.txt')

function moveSubStacks(fromStack, toStack, count) {
  const items = fromStack.splice(0, count)
  return { fromStack, toStack: [...items, ...toStack] }
}

function stackColsToStr(stackColumns) {
  return Object.keys(stackColumns)
    .map(col => {
      const [letter] = stackColumns[col][0].match(/[a-zA-Z]+/)
      return letter
    })
    .reduce((prev, curr) => prev + curr)
}

async function getColumnsAndInstructions() {
  const COL_WIDTH = 3
  const COL_SPACE = 1
  const COLUMN_COUNT = 9

  try {
    const data = await fs.readFile(inputFile, { encoding: 'utf8' })
    const [stacks, procedures] = data.split('\n\n')

    const stackRows = stacks.split('\n')
    const stackColumns = stackRows.reduce((prev, curr) => {
      for (let index = 0; index < COLUMN_COUNT; index++) {
        const start = index * COL_WIDTH
        const spaces = index * COL_SPACE
        const colValue = curr.slice(start + spaces, start + spaces + COL_WIDTH)

        if (colValue.startsWith('[')) {
          if (prev[index + 1]) {
            prev[index + 1] = [...prev[index + 1], colValue]
          } else {
            prev[index + 1] = [colValue]
          }
        }
      }
      return prev
    }, {})

    const instructions = procedures.split('\n').map(p => {
      const match = p.match(/move (\d+) from (\d+) to (\d+)/)
      return [match[1], match[2], match[3]]
    })

    return { stackColumns, instructions }
  } catch (error) {
    console.error(error)
  }
}

async function part1() {
  try {
    const { stackColumns, instructions } = await getColumnsAndInstructions()

    for (const instruction of instructions) {
      const [moveCount, from, to] = instruction

      for (let index = 1; index <= Number(moveCount); index++) {
        const newStacks = moveSubStacks(stackColumns[from.toString()], stackColumns[to.toString()], 1)
        stackColumns[from.toString()] = newStacks.fromStack
        stackColumns[to.toString()] = newStacks.toStack 
      }
    }

    return stackColsToStr(stackColumns)
  } catch (error) {
    console.error(error)
  }
}

async function part2() {
  try {
    const { stackColumns, instructions } = await getColumnsAndInstructions()

    for (const instruction of instructions) {
      const [moveCount, from, to] = instruction
      const _moveCount = Number(moveCount)

      const newStacks = moveSubStacks(stackColumns[from.toString()], stackColumns[to.toString()], _moveCount)
      stackColumns[from.toString()] = newStacks.fromStack
      stackColumns[to.toString()] = newStacks.toStack 
    }

    return stackColsToStr(stackColumns)
  } catch (error) {
    console.error(error)
  }
}

async function main() {
  const part1Answer = await part1()
  console.log(`part 1: ${part1Answer}`)

  const part2Answer = await part2()
  console.log(`part 2: ${part2Answer}`)
}

main()

module.exports = {
  part1,
  part2
}
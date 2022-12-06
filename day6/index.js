const fs = require('fs/promises')
const path = require('path')

const inputFile = path.join(__dirname, '/input.txt')

// JS sets can only have unique members
const hasRepeatedCharacters = str => new Set(str).size < str.length

async function findStartWindow(windowSize) {
  try {
    const data = await fs.readFile(inputFile, { encoding: 'utf8' })
    const dataStream = data.split('')
    let letterWindow = ''
    let firstMarkerIndex = 0

    for (const letter of dataStream) {
      if (letterWindow.length === windowSize) {
        if (!hasRepeatedCharacters(letterWindow)) {
          firstMarkerIndex = data.indexOf(letterWindow) + windowSize
          break
        }

        letterWindow = letterWindow.slice(1) + letter
        
      } else {
        letterWindow += letter
      }
    }

    return firstMarkerIndex
  } catch (error) {
    console.error(error)
  }
}

async function part1() {
  const answer = await findStartWindow(4)
  return answer
}

async function part2() {
  const answer = await findStartWindow(14)
  return answer
}

async function main() {
  const part1Answer = await part1()
  console.log(`part 1: ${part1Answer}`)

  const part2Answer = await part2()
  console.log(`part 2: ${part2Answer}`)
}

main()

module.exports = {

}
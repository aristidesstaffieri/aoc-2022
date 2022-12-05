const fs = require('fs/promises')
const path = require('path')

const inputFile = path.join(__dirname, '/input.txt')

async function fetchPairs() {
  try {
    const data = await fs.readFile(inputFile, { encoding: 'utf8' })
    const pairs =  data.split('\n')

    return pairs.map(pair => {
      const [range1, range2] = pair.split(',')
      const first = range1.split('-').map(n => Number(n))
      const second = range2.split('-').map(n => Number(n))
      return {
        first, second
      }
    })
  } catch (error) {
    console.error(error)
  }
}

async function part1() {
  try {
    const pairs = await fetchPairs()

    return pairs.reduce((prev, curr) => {
      const { first, second } = curr

      if (first[0] >= second[0] && first[1] <= second[1]) {
        return prev + 1
      }

      if (second[0] >= first[0] && second[1] <= first[1]) {
        return prev + 1
      }

      return prev
    }, 0)
  } catch (error) {
    console.error(error)
  }
}

async function part2() {
  try {
    const pairs = await fetchPairs()

    return pairs.reduce((prev, curr) => {
      const _first = curr.first
      const _second = curr.second

      const first = _first[0] > _second[0] ? _second : _first
      const second = _second[0] > _first[0] ? _second : _first

      if (first[1] >= second[0]) {
        return prev + 1
      }

      return prev
    }, 0)
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
const fs = require('fs/promises')
const path = require('path')

const inputFile = path.join(__dirname, '/input.txt')

function handleOutput(lines, sum) {
  // console.log(lines)
  let size = 0

  if (!lines.length) {
    return size
  }

  for (const [index, line] of lines.entries()) {
    const nextArr = lines.slice(index + 1)

    switch (true) {
      case line === '$ cd ..':
        break
      case line.startsWith('$ l'):
        const lsOutput = []

        const nextCommand = nextArr.find(el => el.startsWith('$'))
        const endIndex = nextCommand
          ? nextArr.indexOf(nextCommand)
          : nextArr.length
        const dirContents = nextArr.slice(0, endIndex)

        for (const [_, lsLine] of dirContents.entries()) {

          if (!lsLine.startsWith('d')) {
            const [fileSize, ..._] = lsLine.split(' ')
            lsOutput.push(Number(fileSize))
          }
        }
        
        size = lsOutput.reduce((prev, curr) => prev + curr, 0)
        size += handleOutput(nextArr.slice(endIndex), sum)
        break
      default:
        size += handleOutput(nextArr, sum)
        break
    }
  }

  // console.log(size)
  if (size > 0 && size <= 100000) {
    console.log(`added to sum ${size}`)
    sum += size
  }

  return size
}

async function part1() {
  try {
    const data = await fs.readFile(inputFile, { encoding: 'utf8' })
    const lines = data.split('\n')
    let sum = 0
    // console.log(lines.slice(0, 17))
    handleOutput(lines, 0)

    return sum
  } catch (error) {
    console.error(error)
  }
}

async function main() {
  const part1Answer = await part1()
  console.log(`part 1: ${part1Answer}`)

  // const part2Answer = await part2()
  // console.log(`part 2: ${part2Answer}`)
}

main()

module.exports = {

}
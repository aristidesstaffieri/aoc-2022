const fs = require('fs/promises')
const path = require('path')

const inputFile = path.join(__dirname, '/input.txt')

async function getRuckSacks() {
  try {
    const data = await fs.readFile(inputFile, { encoding: 'utf8' })
    return data.split('\n')
  } catch (error) {
    console.error(error)
  }  
}

function getItemPriority(item) {
  if (item === item.toUpperCase()) {
    return item.charCodeAt() - 38
  } else {
    return item.charCodeAt() - 96
  }
}

async function part1() {
  try {
    const rucksackLists = await getRuckSacks()
    const prioritiesOfCommon = rucksackLists.map(rucksack => {
      const rucksackList = [...rucksack]
      const half = Math.ceil(rucksackList.length / 2)

      const compartment1 = rucksackList.slice(0, half)
      const compartment2 = rucksackList.slice(half)

      const commonItem = compartment1.filter(value => compartment2.includes(value))
      if (commonItem[0]) {
        return getItemPriority(commonItem[0])
      }
    })

    return prioritiesOfCommon.reduce((prev, curr) => prev + curr)
  } catch (error) {
    console.error(error)
  }
}

async function part2() {
  try {
    const rucksackLists = await getRuckSacks()
    const groupSize = 3

    const groups = rucksackLists.reduce((resultArray, item, index) => { 
      const chunkIndex = Math.floor(index / groupSize)
    
      if(!resultArray[chunkIndex]) {
        resultArray[chunkIndex] = []
      }
    
      resultArray[chunkIndex].push(item)
    
      return resultArray
    }, [])

    const priorities = groups.map(group => {
      const _group = group.map(g => [...g])
      const [commonBadge] = _group.shift().filter(function(v) {
        return _group.every(function(a) {
          return a.indexOf(v) !== -1
        })
      })

      return getItemPriority(commonBadge)
    })

  return priorities.reduce((prev, curr) => prev + curr)
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
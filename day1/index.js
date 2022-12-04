const fs = require('fs/promises')
const path = require('path')

async function findElfWithMostCalories() {
  try {
    const data = await fs.readFile(path.join(__dirname, '/input.txt'), { encoding: 'utf8' })
    const calories = data.split('\n')
    const elfToTotalCalories = calories.reduce((prev, calorie) => {
      if (calorie !== '') {
        prev.counter += Number(calorie)
      } else {
        prev.out.push(prev.counter)
        prev.counter = 0
      }
      return prev
    }, { counter: 0, out: [] })
    const sorted = elfToTotalCalories.out.sort((a, b) => a - b)
    const top3 = sorted.slice(-3)
    return top3.reduce((prev, curr) => prev + curr)
  } catch (err) {
    console.log(err)
  }
}

async function main() {
  const mostCals = await findElfWithMostCalories()
  console.log(mostCals)
}

main()

module.exports = {
  findElfWithMostCalories
}
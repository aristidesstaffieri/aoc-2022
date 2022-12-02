const fs = require('fs/promises')

async function findElfWithMostCalories() {
  try {
    const data = await fs.readFile('./input.txt', { encoding: 'utf8' })
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
    const top3 = [sorted[sorted.length-1], sorted[sorted.length-2], sorted[sorted.length-3]]
    console.log(top3.reduce((prev, curr) => prev + curr))
  } catch (err) {
    console.log(err)
  }
}
findElfWithMostCalories()
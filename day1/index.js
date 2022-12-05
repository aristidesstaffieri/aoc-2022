const fs = require('fs/promises')
const path = require('path')

async function findElfWithMostCalories() {
  try {
    const data = await fs.readFile(path.join(__dirname, '/input.txt'), { encoding: 'utf8' })
    const calories = data.split('\n\n')

    return calories
      .map(caloriesStr => {
        const calorieSet = caloriesStr.split('\n')
        return calorieSet.reduce((prev, curr) => prev + Number(curr), 0)
      })
      .sort((a, b) => a - b)
      .slice(-3)
      .reduce((prev, curr) => prev + curr)

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
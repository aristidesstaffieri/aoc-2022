const tap = require('tap')
const { findElfWithMostCalories } = require('./')

const ANSWER = 206643

tap.test('find most cals', async (childTest) => {
  const mostCals = await findElfWithMostCalories()
  console.log(mostCals)
  childTest.equal(ANSWER, mostCals)
  childTest.end()
})

tap.test('get elf cals', childTest => {
  childTest.end()
})
const tap = require('tap')
const { part1, part2 } = require('./')

const ANSWER_PART1 = 11386
const ANSWER_PART2 = 13600

tap.test('part 1', async (childTest) => {
  const answer = await part1()
  childTest.equal(ANSWER_PART1, answer)
  childTest.end()
})

tap.test('answer', childTest => {
  childTest.end()
})

tap.test('part 2', async (childTest) => {
  const answer = await part2()
  childTest.equal(ANSWER_PART2, answer)
  childTest.end()
})

tap.test('answer', childTest => {
  childTest.end()
})
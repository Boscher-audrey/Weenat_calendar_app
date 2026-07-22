import assert from 'node:assert/strict'

import { formatDateToIsoDate } from './dates.js'
import { isIsoDate } from './dates.types.js'

const test = (name: string, fn: () => void) => {
  try {
    fn()
    console.log(`✓ ${name}`)
  } catch (error) {
    console.error(`✗ ${name}`)
    throw error
  }
}

test('accepts valid ISO dates', () => {
  assert.equal(isIsoDate('2026-07-22'), true)
  assert.equal(isIsoDate('2024-02-29'), true)
})

test('rejects invalid ISO dates', () => {
  assert.equal(isIsoDate('2026-22-07'), false)
  assert.equal(isIsoDate('2023-02-29'), false)
  assert.equal(isIsoDate('2026-7-2'), false)
  assert.equal(isIsoDate('not-a-date'), false)
})

test('formats a Date into an ISO date', () => {
  const date = new Date(2026, 6, 22)
  assert.equal(formatDateToIsoDate(date), '2026-07-22')
})

test('formats dates with leading zeroes', () => {
  const date = new Date(2024, 0, 5)
  assert.equal(formatDateToIsoDate(date), '2024-01-05')
})

/**
 * Delets all spaces from string value
 * @param {string} value
 * @returns space-free value
 */
const deleteAllSpaces = (value) => value.replace(/\s/gm, '')

/**
 *
 * @param {string} value
 * @returns number of spaces
 */
const countSpaces = (value) => value.match(/\s/g)?.length || 0

/**
 *
 * @param {string} value
 * @returns whether value is all digits
 */
const isAllDigits = (value) => /^\d+$/.test(value)

/**
 *
 * @param {string} value
 * @returns whether any digits in the value
 */
const isNoDigits = (value) => /\d+/.test(value)

export { deleteAllSpaces, countSpaces, isAllDigits, isNoDigits }

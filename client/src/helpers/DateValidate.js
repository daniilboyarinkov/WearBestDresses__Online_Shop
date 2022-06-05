/**
 *
 * @param {int} year
 * @param {int} month
 * @param {int} day
 * @returns whether input date larger than current date
 */
const validateDate = (year = new Date().getFullYear(), month = 0, day = 1) => {
    const vDate = new Date(year, month, day).toISOString().slice(0, 10)
    const cDate = new Date().toISOString().slice(0, 10)
    return vDate > cDate
}

/**
 *
 * @param {int} month
 * @returns whether input month larger than current month
 */
const validateMonth = (month) => {
    const cMonth = new Date().getMonth()
    return month > cMonth
}

/**
 *
 * @param {int} month
 * @returns whether input month larger than current month
 */
const validateYear = (year) => {
    const cMonth = new Date().getFullYear()
    return year > cMonth
}

export { validateDate, validateMonth, validateYear }

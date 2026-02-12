/**
 * Return a debounced function that delays invoking func until after wait milliseconds have elapsed since the last time the debounced function was invoked.
 * @param {Function} func - Your function
 * @param {Number} timeout - Default is 500 ms
 * @returns {Function} - Your function wrapped in a timeout function
 */
export const debounce = function debounce(func, timeout = 500) {
  let timer = null
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, args)
    }, timeout)
  }
}

/**
 * Return a throttled function that only invokes func at most once per every wait milliseconds.
 * @param {Function} func - Your function
 * @param {Number} timeout - Default is 500 ms
 * @returns {Function} - Your function wrapped in a timeout function
 */
export const throttle = function throttle(func, timeout = 500) {
  let timer = null
  return (...args) => {
    if (timer === null) {
      func(...args)
      timer = setTimeout(() => {
        timer = null
      }, timeout)
    }
  }
}

/**
 * Clamp a number between a minimum and maximum value.
 */
export const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max)

/**
 * Check if a value is a finite number.
 */
export const isNumber = (value: unknown): value is number =>
  typeof value === "number" && Number.isFinite(value)

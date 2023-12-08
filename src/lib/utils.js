/**
 * Wrap a Function to nsure that time-consuming tasks do not fire so often
 * @param {Function} func - Your function
 * @param {Number} timeout - Default is 500 ms
 * @returns {Function} - Your function wrapped in a timeout function
 */
const debounce = function (func, timeout = 500) {
  let timer = null
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, args)
    }, timeout)
  }
}

export { debounce }

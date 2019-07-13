'use strict'

export const pipePromises = (...fn) =>
  fn.reduce((acc, promise) =>
    Promise.resolve(acc).then(promise),
  undefined
  )

export default pipePromises

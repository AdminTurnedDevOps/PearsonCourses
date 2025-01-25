import pino from 'pino'

let logger

export function init(options) {
  return (logger = pino(options))
}

export function getLogger() {
  return logger
}

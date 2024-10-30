import chalk from 'chalk'

export function info(msg: string) {
  return chalk.blueBright(msg)
}

export function success(msg: string) {
  return chalk.green(msg)
}

export function warn(msg: string) {
  return chalk.red(msg)
}

export function text(msg: string) {
  return chalk.magenta(msg)
}

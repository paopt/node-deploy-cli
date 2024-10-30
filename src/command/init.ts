import * as fs from 'node:fs'
import * as path from 'node:path'
import chalk from 'chalk'

export function init() {
  const projectDir = process.cwd()
  const file = path.resolve(projectDir, 'deploy.config.js')
  if (fs.existsSync(file)) {
    console.log(chalk.red('deploy.config.js已经存在！'))
  } else {
    fs.writeFileSync(file, 'haha')
  }
}

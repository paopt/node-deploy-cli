import * as fs from 'node:fs'
import * as path from 'node:path'
import * as log from '../utils/log.js'

export function init() {
  const projectDir = process.cwd()
  const file = path.resolve(projectDir, 'deploy.config.json')
  if (fs.existsSync(file)) {
    console.log(log.warn('deploy.config.json已经存在！'))
  } else {
    const template = path.resolve(
      process.cwd(),
      './template/deploy.config.json',
    )
    const data = fs.readFileSync(template)
    fs.writeFileSync(file, data)
    console.log(log.success('deploy.config.json创建成功'))
  }
}

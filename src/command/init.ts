import * as fs from 'node:fs'
import * as path from 'node:path'
import * as log from '../utils/log.js'
import { fileURLToPath } from 'node:url'

export function init() {
  const projectDir = process.cwd()
  const file = path.resolve(projectDir, 'deploy.config.json')
  if (fs.existsSync(file)) {
    console.log(log.warn('deploy.config.json已经存在！'))
  } else {
    const __dirname = path.dirname(fileURLToPath(import.meta.url))
    const template = path.resolve(
      __dirname,
      '../../template/deploy.config.json',
    )
    console.log(__dirname, template)
    const data = fs.readFileSync(template)
    fs.writeFileSync(file, data)
    console.log(log.success('deploy.config.json创建成功'))
  }
}

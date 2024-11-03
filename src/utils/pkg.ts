import * as fs from 'node:fs'
import * as path from 'node:path'

const pkgPath = path.resolve(process.cwd(), './package.json')

export const pkg = JSON.parse(fs.readFileSync(pkgPath, { encoding: 'utf-8' }))

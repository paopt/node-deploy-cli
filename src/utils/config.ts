import * as path from 'node:path'
import * as fs from 'node:fs'
import * as log from './log'
import { DeployConfig } from '../types'

export async function getConfig(env: string) {
  const cwd = process.cwd()
  const configFile = path.resolve(cwd, 'deploy.config.json')
  if (!fs.existsSync(configFile)) {
    log.warn('配置文件deploy.config.json不存在！')
    return null
  }
  const data = fs.readFileSync(configFile, { encoding: 'utf-8' })
  const config = JSON.parse(data)

  if (!validateSchema(config, env)) {
    return null
  }
  return config
}

function validateSchema(config: DeployConfig, env: string) {
  const keys: string[] = []
  if (!config.name) {
    keys.push('name')
  }
  if (config[env]) {
    Object.entries(config[env]).forEach(([k, v]) => {
      if (!v) {
        keys.push(k)
      }
    })
  } else {
    keys.push(env)
  }
  if (keys.length) {
    log.warn(`缺少${keys.join()}配置`)
    return false
  }
  return true
}

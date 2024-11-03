import { NodeSSH } from 'node-ssh'
import ora from 'ora'
import { DeployEnvConfig } from '../types/index.js'
import * as log from '../utils/log.js'

export async function login(options: DeployEnvConfig) {
  console.log()
  const spinner = ora().start()
  console.log(`2、连接服务器 ${log.info(options.host)}`)

  const ssh = new NodeSSH()
  await ssh.connect(options)

  spinner.succeed(log.success('ssh连接成功！'))

  return ssh
}

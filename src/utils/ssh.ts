import { NodeSSH } from 'node-ssh'
import chalk from 'chalk'
import ora from 'ora'

interface LoginConfig {
  username: string
  password: string
  host: string
}

export async function login(options: LoginConfig) {
  const spinner = ora().start()
  console.log(chalk.blue('连接服务器...'))

  const ssh = new NodeSSH()
  await ssh.connect(options)

  spinner.succeed('连接成功！')

  return ssh
}

import chalk from 'chalk'
import { NodeSSH } from 'node-ssh'

export async function runRemoteCommand(
  ssh: NodeSSH,
  command: string,
  cwd: string,
) {
  try {
    const res = await ssh.execCommand(command, {
      cwd,
    })
    if (res.stderr) {
      console.log(chalk.red(`执行服务器命令：${command}失败`))
      process.exit()
    } else {
      console.log(chalk.grey(`执行服务器命令：${command}成功`))
    }
  } catch (err) {
    console.log(chalk.red('runRemoteCommand error'), err)
    throw err
  }
}

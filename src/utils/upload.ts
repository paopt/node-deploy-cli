import * as fs from 'node:fs'
import { NodeSSH } from 'node-ssh'
import chalk from 'chalk'
import ora from 'ora'

export async function uploadFiles(
  ssh: NodeSSH,
  localPath: string,
  remotePath: string,
) {
  const spinner = ora().start()
  console.log(chalk.blue('上传文件：'))
  console.log(`本地文件：${localPath}`)
  console.log(`服务器目录：${remotePath}`)

  await ssh.putFile(localPath, remotePath)

  fs.rmSync(localPath)
  spinner.succeed(chalk.blue('上传成功！'))
}

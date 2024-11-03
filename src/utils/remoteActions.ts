import * as path from 'node:path'
import { NodeSSH } from 'node-ssh'
import ora from 'ora'
import * as log from './log.js'

export async function unzip(
  ssh: NodeSSH,
  remoteDir: string,
  filename: string,
  version: string,
) {
  console.log()
  const spinner = ora()
  spinner.start()
  console.log('4、解压缩')
  spinner.start()
  const remoteFile = path.resolve(remoteDir, filename)
  await runRemoteCommand(ssh, `unzip ${remoteFile}`, remoteDir)
  await runRemoteCommand(ssh, `rm -rf v${version}`, remoteDir)
  await runRemoteCommand(ssh, `rm -rf ${remoteFile}`, remoteDir)
  await runRemoteCommand(ssh, `mv dist v${version}`, remoteDir)
  spinner.succeed(log.success('完成'))
}

async function runRemoteCommand(ssh: NodeSSH, command: string, cwd: string) {
  try {
    const res = await ssh.execCommand(command, {
      cwd,
    })
    if (res.stderr) {
      console.log(log.warn(`${command} 失败`))
      process.exit()
    } else {
      console.log(log.text(`${command} 成功`))
    }
  } catch (err) {
    console.log(log.warn('runRemoteCommand error'), err)
    throw err
  }
}

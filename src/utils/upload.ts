import * as fs from 'node:fs'
import * as path from 'node:path'
import { NodeSSH } from 'node-ssh'
import ora from 'ora'
import * as log from '../utils/log.js'

export async function uploadFiles(
  ssh: NodeSSH,
  localPath: string,
  remoteDir: string,
  filename: string,
) {
  console.log()
  const spinner = ora().start()
  console.log(`3、上传文件 ${log.info(filename)} 到 ${log.info(remoteDir)}`)

  const remotePath = path.resolve(remoteDir, filename)
  await ssh.putFile(localPath, remotePath)

  fs.rmSync(localPath)
  spinner.succeed(log.success('上传成功'))
}

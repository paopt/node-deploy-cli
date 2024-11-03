import * as fs from 'node:fs'
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
  const remotePath = remoteDir + filename
  console.log(`3、上传文件 ${log.info(filename)} 到 ${log.info(remotePath)}`)
  await ssh.putFile(localPath, remotePath)
  fs.rmSync(localPath)
  spinner.succeed(log.success('上传成功'))
}

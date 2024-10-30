import * as path from 'node:path'
import chalk from 'chalk'
import pkg from '../../package.json'
import { compress } from '../utils/compress'
import { login } from '../utils/ssh'
import { uploadFiles } from '../utils/upload'
import { runRemoteCommand } from '../utils/remoteCommand'

export async function deploy(env: string) {
  console.log(env)
  const config = {
    name: '项目A',
    ssh: {
      host: '118.31.167.102',
      username: 'root',
      password: 'paopao123@',
    },
    localDir: './demo',
    remoteDir: '/var/www/test-demo/',
  }

  try {
    const localFile = path.resolve(process.cwd(), config.localDir)
    const zipFile = path.resolve(process.cwd(), config.localDir, 'dist.zip')
    await compress(localFile, zipFile)
    const ssh = await login(config.ssh)
    // 上传
    const remoteFile = config.remoteDir + 'dist.zip'
    await uploadFiles(ssh, zipFile, remoteFile, pkg.version)

    // 解压
    await runRemoteCommand(ssh, `unzip ${remoteFile}`, config.remoteDir)
    await runRemoteCommand(ssh, `rm -rf v${pkg.version}`, config.remoteDir)
    await runRemoteCommand(ssh, `rm -rf ${remoteFile}`, config.remoteDir)
    await runRemoteCommand(ssh, `mv dist v${pkg.version}`, config.remoteDir)

    console.log(chalk.blue('部署成功'))
  } catch (err) {
    console.log(chalk.red('部署失败'), err)
    process.exit()
  } finally {
    process.exit()
  }
}

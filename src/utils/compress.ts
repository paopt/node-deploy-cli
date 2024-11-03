import * as fs from 'node:fs'
import * as path from 'node:path'
import archiver from 'archiver'
import ora from 'ora'
import * as log from '../utils/log.js'

export async function compress(
  localDir: string,
  filename: string,
): Promise<string> {
  return new Promise((resolve, reject) => {
    console.log()
    const spinner = ora().start()
    console.log(`1、压缩 ${log.info(localDir)}`)

    const localPath = path.resolve(localDir, filename)
    const output = fs.createWriteStream(localPath)
    const archive = archiver('zip', {
      zlib: { level: 9 }, // Sets the compression level.
    })

    output.on('close', function () {
      spinner.succeed(
        log.success(
          `压缩成功！${filename}共计${(archive.pointer() / 1024 / 1024).toFixed(3)}MB`,
        ),
      )
      resolve(localPath)
    })

    archive.on('error', function () {
      reject('压缩失败！')
    })

    archive.pipe(output)
    archive.directory(localDir, 'dist')
    archive.finalize()
  })
}

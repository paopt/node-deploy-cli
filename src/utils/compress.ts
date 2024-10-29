import * as fs from 'node:fs'
import archiver from 'archiver'
import chalk from 'chalk'
import ora from 'ora'

export async function compress(source: string, destination: string) {
  return new Promise((resolve, reject) => {
    const spinner = ora().start()
    console.log(chalk.blue(`压缩文件，目录: ${source}`))

    const output = fs.createWriteStream(destination)
    const archive = archiver('zip', {
      zlib: { level: 9 }, // Sets the compression level.
    })

    output.on('close', function () {
      spinner.succeed(
        chalk.blue(
          `压缩成功！共计${(archive.pointer() / 1024 / 1024).toFixed(3)}MB`,
        ),
      )
      resolve(null)
    })

    archive.on('error', function () {
      reject('压缩失败！')
    })

    archive.pipe(output)
    archive.directory(source, 'dist')
    archive.finalize()
  })
}

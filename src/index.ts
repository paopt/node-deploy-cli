import { program } from 'commander'
import { deploy } from './command/deploy.js'
import { init } from './command/init.js'
import inquirer from 'inquirer'
import { getConfig } from './utils/config.js'
import * as log from './utils/log.js'
import { pkg } from './utils/pkg.js'

program
  .name('node-deploy')
  .usage('deploy')
  .description('node自动化部署')
  .version(pkg.version)

program
  .command('init')
  .description('初始化配置文件')
  .action(() => {
    init()
  })

program.option('--env <type>', '部署环境').action(async (options) => {
  const env = options.env
  const config = await getConfig(env)
  if (!config) {
    process.exit()
  }
  inquirer
    .prompt([
      {
        type: 'confirm',
        message: `确定要部署 ${log.info(config.name)} 到 ${log.info(env)} 环境吗？`,
        name: 'status',
      },
    ])
    .then((res) => {
      if (res.status) {
        deploy(config[env])
      } else {
        process.exit()
      }
    })
})

program.parse(process.argv)

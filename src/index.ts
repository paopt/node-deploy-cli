import { program } from 'commander'
import pkg from '../package.json'
import { deploy } from './command/deploy'
import { init } from './command/init'

program
  .name('node-deploy')
  .usage('npm run deploy')
  .description('node自动化部署')
  .version(pkg.version)

program
  .command('init')
  .description('初始化配置文件')
  .action(() => {
    console.log('init')
    init()
  })

program.option('--env <type>', '部署环境').action(() => {
  deploy(program.opts().env)
})

program.parse(process.argv)

import { program } from 'commander'
import pkg from '../package.json'
import { deploy } from './command/deploy'

program
  .name('node-deploy')
  .usage('npm run deploy')
  .description('node自动化部署')
  .version(pkg.version)

program
  .command('deploy')
  .description('部署')
  .action(() => {
    deploy()
  })
  .command('init')
  .description('初始化配置')
  .action(() => {
    console.log('init')
  })
  .command('dev')
  .description('测试环境')
  .action(() => {
    console.log('init')
  })
  .command('prod')
  .description('生产环境')
  .action(() => {
    console.log('init')
  })

program.parse(process.argv)

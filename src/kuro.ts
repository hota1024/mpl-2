import cac from 'cac'
import Sophy from 'sophy'
import { Kuro } from './classes'
import { NodeRuntime } from './impls'
import chalk from 'chalk'

const cli = cac()

cli.command('[file]', 'Execute kuro file').action(async (file) => {
  console.log(chalk.blue(`Kuro-delta-language`))
  const filePath = file
  const content = await Sophy.read(filePath)
  const kuro = new Kuro(new NodeRuntime())

  console.log(chalk.green(`Running ${file}`))
  try {
    kuro.run(content)
    console.log(chalk.green(`Done`))
  } catch (error) {
    console.log(chalk.red(`Failed`))
    throw error
  }
})

cli.help()
cli.parse()

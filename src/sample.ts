import * as fs from 'fs'
import { Kuro } from './classes/Kuro'
import { NodeRuntime } from './impls/runtimes/NodeRuntime'

const kuro = new Kuro(new NodeRuntime())
kuro.run(fs.readFileSync(`${__dirname}/hello.kuro`).toString())

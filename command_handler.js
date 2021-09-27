import random from './commands/random.js'
import empty from './commands/empty.js'
import nonsense from './commands/nonsense.js'
import pi from './commands/pi.js'
import vectorsum from './commands/vectorsum.js'

const commands = { random, empty, nonsense, pi, vectorsum }

export default (args, message) => {
    commands[args[0]](message, args)
}

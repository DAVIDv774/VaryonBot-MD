/// by DAVID-774
import { join, dirname } from 'path'; 
import { createRequire } from 'module'; 
import { fileURLToPath } from 'url'; 
import { setupMaster, fork } from 'cluster'; 
import { watchFile, unwatchFile } from 'fs'; 
import cfonts from 'cfonts'; 
import { createInterface } from 'readline'; 
import chalk from 'chalk'; 
import yargs from 'yargs'; 
console.log('Ejecutando el Bot mas shidori tercer mundista :D'); const __dirname = dirname(fileURLToPath(import.meta.url)); const require = createRequire(__dirname); const { name, author } = require(join(__dirname, './package.json')); const { say } = cfonts; const opts = new Object(yargs(process.argv.slice(2)).exitProcess(false).parse()); const rl = createInterface(process.stdin, process.stdout); say(('Varyon'), { font: 'simple3d', color: 'candy', align: 'center', gradient: ["red", "magenta"], lineHeight: 3 }); say('By @DAVID774', { font: 'console', align: 'center', gradient: ['red', 'magenta'] }); var isRunning = false; function start(file) { if (isRunning) return; isRunning = true; let args = [join(__dirname, file), ...process.argv.slice(2)]; setupMaster({ exec: args[0], args: args.slice(1) }); let p = fork(); p.on('message', data => { console.log('\n >', data + '\n'); switch (data) { case 'reset': p.process.kill(); isRunning = false; start.apply(this, arguments); break; case 'uptime': p.send(process.uptime()); break } }); p.on('exit', (_, code) => { isRunning = false; console.error(chalk.bgRed('\n\n! Salió del código ! : '), chalk.bgWhite(code + '\n')); p.process.kill(); isRunning = false; start.apply(this, arguments); if (code === 0) return; watchFile(args[0], () => { unwatchFile(args[0]); start(file) }) }); if (!opts['test']) if (!rl.listenerCount()) rl.on('line', line => { p.emit('message', line.trim()) }) }; start('main.js')

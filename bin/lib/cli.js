const program = require('commander')
const loadInit = require('./init')
const loadStart = require('./start')
const loadInvalidUsernames = require('./invalidUsernames')
const { spawnSync } = require('child_process')
const path = require('path')

module.exports = function startCli (server) {
  program.version(getVersion())

  loadInit(program)
  loadStart(program, server)
  loadInvalidUsernames(program)

  program.parse(process.argv)
  if (program.args.length === 0) program.help()
}

function getVersion () {
  try {
    // Obtain version from git
    const options = { cwd: __dirname, encoding: 'utf8' }
    const { stdout } = spawnSync('git', ['describe', '--tags'], options)
    return stdout.trim()
  } catch (e) {
    // Obtain version from package.json
    const { version } = require(path.join(__dirname, '../../package.json'))
    return version
  }
}

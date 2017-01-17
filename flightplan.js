'use strict'

const plan = require('flightplan')

plan.target('prod', {
  host: 'marcelrobitaille.me',
  username: 'marcel',
  agent: process.env.SSH_AUTH_SOCK,
})

plan.remote((remote) => {
  remote.exec('rm -rf ~/startpage/public')
})

plan.local((local) => {
  local.log('Run build')
  local.exec('gulp build')
  local.log('Copy files to remote host')
  // const filesToCopy = local.exec('find /home/marcel/code/clairitech/website/')
  const filesToCopy = local.exec('git ls-files && git ls-files -o --exclude-standard && find public', {silent: true});
  const deleted = local.exec('git ls-files -d', {silent: true}).stdout || ''
  if(deleted.length){
    const reg = new RegExp(deleted.split('\n').join('\n|'), 'gm')
    filesToCopy.stdout = filesToCopy.stdout.replace(reg, '')
  }

  local.transfer(filesToCopy, '~/startpage/')
})

plan.remote((remote) => {
  remote.exec('cd startpage && forever restart bin/www')
})

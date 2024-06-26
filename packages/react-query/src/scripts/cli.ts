#!/usr/bin/env node
'use strict'

import { Command } from 'commander'
import { getPackageJson, getSuspensiveReactQueryVersion, getTanstackPackageJson } from './utils/package'
import { switchVersion } from './utils/switchVersion'

const packageJson = getPackageJson()
const tanstackPackageJson = getTanstackPackageJson()
const suspensiveReactQueryVersion = getSuspensiveReactQueryVersion()

const program = new Command()

program
  .name(packageJson.name)
  .description(packageJson.description)
  .version(packageJson.version, '-v, --version', 'display the current version')

program
  .command('status')
  .description('Check the compatibility status of the current version')
  .action(() => {
    const tanstackMajorVersion = tanstackPackageJson.version.split('.')[0]

    console.log(
      `[${packageJson.name}]`,
      `v${packageJson.version}`,
      `(@suspensive/react-query-${suspensiveReactQueryVersion})`
    )
    console.log('[@tanstack/react-query]', `v${tanstackPackageJson.version}`)

    if (suspensiveReactQueryVersion === tanstackMajorVersion) {
      console.log(`\nThe versions are compatible.`)
    } else {
      console.warn(
        '\nThe version of @suspensive/react-query is not compatible with the current version of @tanstack/react-query.',
        `\nPlease run 'npx suspensive-react-query switch ${suspensiveReactQueryVersion}' to switch to the compatible version.`
      )
    }
  })

program
  .command('switch')
  .description('Switch to a specific version of @suspensive/react-query')
  .argument('<version>', 'Switches the version of @suspensive/react-query')
  .action((version) => {
    if (version === '4') {
      switchVersion(4)
    } else if (version === '5') {
      switchVersion(5)
    } else {
      console.warn('[@suspensive/react-query]', `version v${version} is not supported.`)
    }
  })

program.parse()
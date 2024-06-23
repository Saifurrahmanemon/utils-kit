#!/usr/bin/env node

import { Command } from 'commander';

import { add } from '~/src/command/add';

import { getPackageInfo } from './utils/get-package-info';

process.on('SIGINT', () => process.exit(0));
process.on('SIGTERM', () => process.exit(0));

async function init() {
  const packageInfo = getPackageInfo();

  const program = new Command()
    .name('utils-kit')
    .description('add reusable utils to your project')
    .version(
      packageInfo.version || '1.0.0',
      '-v, --version',
      'display the version number'
    );

  program.addCommand(add);

  program.parse();
}

init();

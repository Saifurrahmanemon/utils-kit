import chalk from 'chalk';
import { Command } from 'commander';
import { existsSync, promises as fs } from 'fs';
import ora from 'ora';
import path from 'path';
import prompts from 'prompts';
import { z } from 'zod';

import { createDir, fetchRegistry } from '../utils/registry.js';

const optionsSchema = z.object({
  utils: z.array(z.string()).optional(),
  overwrite: z.boolean(),
  all: z.boolean(),
  path: z.string().optional(),
  cwd: z.string()
});

export const add = new Command()
  .name('add')
  .description('add a utility to your project')
  .argument('[...utils]', 'The Utilities to add')
  .option('-a, --all', 'add all available utils', false)
  .option('-o, --overwrite', 'overwrite existing files.', false)
  .option(
    '-c, --cwd <cwd>',
    'the working directory. defaults to the current directory.',
    process.cwd()
  )
  .option('-p, --path <path>', 'the path to add the utility to.')
  .action(async (utils, ops) => {
    try {
      const options = optionsSchema.parse({
        ...ops,
        utils
      });

      const cwd = path.resolve(options.cwd);

      if (!existsSync(cwd)) {
        console.log(chalk.red(`The path ${cwd} does not exist.`));
        process.exit(1);
      }

      const registry = await fetchRegistry();

      let selectedUtils = options.all
        ? registry.map((item) => item.name)
        : options.utils;

      if (!options.utils?.length && !options.all) {
        const { utils } = await prompts({
          type: 'multiselect',
          name: 'utils',
          message: 'Which utility would you like to add?',
          hint: 'Use arrows to move. Space to select. A to toggle all. Enter to submit',
          instructions: false,
          choices: registry.map((entry) => ({
            title: entry.name,
            value: entry.name,
            selected: options.all ? true : options.utils?.includes(entry.name)
          }))
        });
        selectedUtils = utils;
      }

      if (!selectedUtils?.length) {
        console.log(chalk.yellow('No utility selected. Exiting.'));
        process.exit(0);
      }

      const loader = ora('Adding...').start();

      const dirCreation = await createDir(cwd);

      if (dirCreation.created) {
        console.log(chalk.green(dirCreation.message));
      }

      for (const item of selectedUtils) {
        loader.text = `Adding ${item}...`;

        const entry = registry.find((entry) => entry.name === item);

        if (!entry) {
          console.log(chalk.red(`Could not find ${item} in registry.`));
          continue;
        }

        const existingUtil = existsSync(
          path.resolve(dirCreation.path, entry.file.name)
        );

        if (existingUtil && !options.overwrite) {
          loader.stop();
          const { overwrite } = await prompts({
            type: 'confirm',
            name: 'overwrite',
            message: `${item} already exists. Would you like to overwrite?`,
            initial: false
          });

          if (!overwrite) {
            console.log(
              chalk.cyan(
                `Skipped ${item}. To overwrite, run with the ${chalk.green(
                  '--overwrite'
                )} flag.`
              )
            );
            continue;
          }

          loader.text = `overwriting ${item}...`;
        }

        const filePath = path.resolve(dirCreation.path, entry.file.name);
        await fs.writeFile(filePath, entry.file.content, 'utf-8');

        loader.succeed('Added ' + item);
      }
    } catch (error) {
      console.log(chalk.red(error));
    }
  });

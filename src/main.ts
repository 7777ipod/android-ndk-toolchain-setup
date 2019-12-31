const path = require('path');

import * as core from '@actions/core';
import * as input from './input';
import {Ndk} from './ndk';

export async function SetupNdkToolchain(actionInput: input.NdkToolChainSetupInput): Promise<void> {
  let program = await Ndk.get();
  let args: string[] = [];
  args.push(' --arch ' + actionInput.arch);
  args.push(' --api ' + actionInput.api);
  args.push(' --install-dir ' + actionInput.install_location);
  if (actionInput.force)
    args.push(' --force');

  await program.call(args);
}

async function run(): Promise<void> {
  try {
    const actionInput = input.get();
    await SetupNdkToolchain(actionInput);
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()

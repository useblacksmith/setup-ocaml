/* eslint-disable unicorn/no-process-exit */
import * as process from "node:process";

import * as core from "@actions/core";

import { saveDuneCache, saveOpamDownloadCache } from "./cache.js";
import { DUNE_CACHE } from "./constants.js";
import { trimDuneCache } from "./dune.js";

async function run() {
  try {
    if (DUNE_CACHE) {
      await trimDuneCache();
      await saveDuneCache();
    }
    await saveOpamDownloadCache();
    process.exit(0);
  } catch (error) {
    if (error instanceof Error) {
      core.error(error.message);
    }
    process.exit(1);
  }
}

void run();

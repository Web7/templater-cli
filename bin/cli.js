#!/usr/bin/env node

"use strict";

const runCLI = require("../lib/bootstrap");

process.title = "templater";

runCLI(process.argv);

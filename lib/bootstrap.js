"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// eslint-disable-next-line @typescript-eslint/no-var-requires
const TemplaterCLI = require("./templater-cli");
const runCLI = async (args) => {
    // Create a new instance of the CLI object
    const cli = new TemplaterCLI();
    try {
        await cli.run(args);
    }
    catch (error) {
        cli.logger.error(error);
        process.exit(2);
    }
};
module.exports = runCLI;

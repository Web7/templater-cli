"use strict";
// import {input} from '@inquirer/prompts';
const {input, select, checkbox} = require('@inquirer/prompts');
const util = require("util");
const fs = require('fs');
const PugCreateFiles = require('./pug.js');
const TwigCreateFiles = require('./twig.js');
const CreateFiles = require('./create-files');
const CreateDirs = require('./create-dirs');

class TemplaterCLI {
	constructor() {
		this.colors = this.createColors();
		this.logger = this.getLogger();
	}

	getLogger() {
		return {
			error: (val) => console.error(`[templater-cli] ${this.colors.red(util.format(val))}`),
			warn: (val) => console.warn(`[templater-cli] ${this.colors.yellow(val)}`),
			info: (val) => console.info(`[templater-cli] ${this.colors.cyan(val)}`),
			success: (val) => console.log(`[templater-cli] ${this.colors.green(val)}`),
			log: (val) => console.log(`[templater-cli] ${val}`),
			raw: (val) => console.log(val),
		};
	}

	createColors(useColor) {
		const {createColors, isColorSupported} = require("colorette");
		let shouldUseColor;
		if (useColor) {
			shouldUseColor = useColor;
		} else {
			shouldUseColor = isColorSupported;
		}
		return Object.assign(Object.assign({}, createColors({useColor: shouldUseColor})), {isColorSupported: shouldUseColor});
	}

	async run(args, parseOptions) {
		let dataIndexJs = '';

		const dir = await input({message: 'Enter your name'});
		const type = await select({
			message: 'Select a template type',
			choices: [
				{
					name: 'Twig',
					value: 'twig',
					description: 'Twig templates',
				},
				{
					name: 'Pug/Jade',
					value: 'pug',
					description: 'Pug templates'
				}
			]
		});
		const installs = await checkbox({
			message: 'Select a package manager',
			choices: [
				{name: 'Slick carousel', value: 'slick-carousel'},
				{name: 'Leaflet', value: 'leaflet'},
			]
		});

		if (!dir) {
			return;
		}

		if (!fs.existsSync(dir)) {
			fs.mkdirSync(dir);
		}
		const cd = new CreateDirs();
		const cf = new CreateFiles();
		cd.run(dir);
		cf.run(dir);

		if (type) {
			if (type === 'pug') {
				const pcf = new PugCreateFiles();
				pcf.run(dir);
			}
			if (type === 'twig') {
				const tcf = new TwigCreateFiles();
				tcf.run(dir);
			}
			dataIndexJs = 'import html from \'./components/pages/index.' + type + '\';\n' +
				'// Import styles\n' +
				'import style from \'./sass/index.sass\';\n' +
				'// Import scripts\n' +
				'import $ from \'jquery\';\n' +
				'import popper from \'popper.js\';\n' +
				'import bootstrap from \'bootstrap\';\n' +
				'\n' +
				'import \'./js/common.js\';\n';
		}

		if (installs.length > 0) {
			if (installs.find('slick-carousel')) {
				dataIndexJs += 'import slick from \'slick-carousel\';\n';
			}
			if (installs.find('leaflet')) {
				dataIndexJs += 'import L from \'leaflet\';\n';
			}
		}

		console.log(dataIndexJs);

		const files = [
			{
				name: `./${dir}/src/index.js`,
				data: dataIndexJs
			}
		];

		for (const file of files) {
			fs.writeFileSync(file.name, file.data || '', 'utf8', (error) => {
				console.log(error);
			});
		}

		console.log(dir);
		console.log(type);
		console.log(installs);
	}
}

module.exports = TemplaterCLI;
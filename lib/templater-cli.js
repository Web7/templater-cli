"use strict";
// import {input} from '@inquirer/prompts';
const {input, select, checkbox} = require('@inquirer/prompts');
const util = require("util");
const fs = require('fs');
const PugCreateFiles = require('./pug.js');
const TwigCreateFiles = require('./twig.js');
const CreateFiles = require('./create-files');
const CreateDirs = require('./create-dirs');
const NpmInstall = require('./npm');

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

		const dir = await input({message: 'Enter project name'});
		const type = await select({
			message: 'Select template type',
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
			message: 'Choose a packages to install in project',
			choices: [
				{name: 'Bootstrap', value: 'bootstrap', checked: true},
				{name: 'Bootstrap icons', value: 'bootstrap-icons', checked: true},
				{name: 'Bootstrap datepicker', value: 'bootstrap-datepicker', checked: true},
				{name: 'DotdotdotJS', value: 'dotdotdot-js', checked: true},
				{name: 'i18n', value: 'i18n'},
				{name: 'intl-tel-input', value: 'intl-tel-input'},
				{name: 'ion range.Slider', value: 'ion-rangeslider'},
				{name: 'jQuery', value: 'jquery', checked: true},
				{name: 'jQuery mask plugin', value: 'jquery-mask-plugin'},
				{name: 'jQuery UI', value: 'jquery-ui'},
				{name: 'jQuery maskedInput', value: 'jquery.maskedinput'},
				{name: 'Leaflet', value: 'leaflet'},
				{name: 'Perfect Scrollbar', value: 'perfect-scrollbar'},
				{name: 'PopperJS', value: 'popper.js', checked: true},
				{name: 'Slick carousel', value: 'slick-carousel'},
				{name: 'Sticky-js', value: 'sticky-js'},
				{name: 'Animate.css', value: 'animate.css'},
				// {name: '', value: ''},
				// {name: '', value: ''},
				{name: 'Font Awesome', value: 'font-awesome'},
				{name: 'Font Awesome 4.7.0', value: 'font-awesome@4.7.0'},
				{name: 'Material Icons', value: 'material-design-icons'},
				{name: 'Remix Icon', value: 'remixicon'},
				// {name: '', value: ''},
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
			if (installs.find(value => value === 'slick-carousel')) {
				dataIndexJs += 'import slick from \'slick-carousel\';\n';
			}
			if (installs.find(value => value === 'leaflet')) {
				dataIndexJs += 'import L from \'leaflet\';\n';
			}
		}

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

		const ni = new NpmInstall();
		ni.run(dir, type, installs);


		fs.copyFile(`./lib/webpack/webpack.${type}.js`, `./${dir}/webpack.config.js`, (err) => {
			if (err) throw err;
			console.log(`webpack.${type}.js was copied to webpack.config.js`);
		});

		// console.log(dir);
		// console.log(type);
		// console.log(installs);
	}
}

module.exports = TemplaterCLI;
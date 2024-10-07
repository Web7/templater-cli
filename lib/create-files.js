const fs = require('fs');

const dataIndexSass = '@import \'variables\'\n' +
	'\n' +
	'@import \'../scss/bootstrap\'\n' +
	'@import \'~slick-carousel/slick/slick.css\'\n' +
	'@import \'~slick-carousel/slick/slick-theme.css\'\n' +
	'@import \'~font-awesome/css/font-awesome.min.css\'\n' +
	'@import \'~leaflet/dist/leaflet.css\'\n' +
	'\n' +
	'@import \'header\'\n' +
	'@import \'footer\'\n' +
	'@import \'breadcrumb\'\n' +
	'\n' +
	'@import \'ui\'\n' +
	'@import \'icons\'';

const dataIndexJson = '{}';

const commonJS = '(function (factory, jQuery, Zepto) {\n' +
	'\tif (typeof define === \'function\' && define.amd) {\n' +
	'\t\tdefine([\'jquery\'], factory);\n' +
	'\t} else if (typeof exports === \'object\' && typeof Meteor === \'undefined\') {\n' +
	'\t\tmodule.exports = factory(require(\'jquery\'));\n' +
	'\t} else {\n' +
	'\t\tfactory(jQuery || Zepto);\n' +
	'\t}\n' +
	'}(function($){\n' +
	'\t\'use strict\';\n' +
	'\n' +
	'\t$.fn.exists = function () {\n' +
	'\t\treturn this.length !== 0;\n' +
	'\t};\n' +
	'\n' +
	'}, window.jQuery, window.Zepto));';

const gitIgnore = '.idea/\n' +
	'dist/\n' +
	'node_modules/';

const indexBootstrap = '@import "~bootstrap/scss/mixins/banner";\n' +
	'@include bsBanner("");\n' +
	'\n' +
	'\n' +
	'// scss-docs-start import-stack\n' +
	'// Configuration\n' +
	'@import "~bootstrap/scss/functions";\n' +
	'@import "variables";\n' +
	'@import "~bootstrap/scss/variables-dark";\n' +
	'@import "~bootstrap/scss/maps";\n' +
	'@import "~bootstrap/scss/mixins";\n' +
	'@import "~bootstrap/scss/utilities";\n' +
	'\n' +
	'// Layout & components\n' +
	'@import "~bootstrap/scss/root";\n' +
	'@import "~bootstrap/scss/reboot";\n' +
	'@import "~bootstrap/scss/type";\n' +
	'@import "~bootstrap/scss/images";\n' +
	'@import "~bootstrap/scss/containers";\n' +
	'@import "~bootstrap/scss/grid";\n' +
	'@import "~bootstrap/scss/tables";\n' +
	'@import "~bootstrap/scss/forms";\n' +
	'@import "~bootstrap/scss/buttons";\n' +
	'@import "~bootstrap/scss/transitions";\n' +
	'@import "~bootstrap/scss/dropdown";\n' +
	'@import "~bootstrap/scss/button-group";\n' +
	'@import "~bootstrap/scss/nav";\n' +
	'@import "~bootstrap/scss/navbar";\n' +
	'@import "~bootstrap/scss/card";\n' +
	'@import "~bootstrap/scss/accordion";\n' +
	'@import "~bootstrap/scss/breadcrumb";\n' +
	'@import "~bootstrap/scss/pagination";\n' +
	'@import "~bootstrap/scss/badge";\n' +
	'@import "~bootstrap/scss/alert";\n' +
	'@import "~bootstrap/scss/progress";\n' +
	'@import "~bootstrap/scss/list-group";\n' +
	'@import "~bootstrap/scss/close";\n' +
	'@import "~bootstrap/scss/toasts";\n' +
	'@import "~bootstrap/scss/modal";\n' +
	'@import "~bootstrap/scss/tooltip";\n' +
	'@import "~bootstrap/scss/popover";\n' +
	'@import "~bootstrap/scss/carousel";\n' +
	'@import "~bootstrap/scss/spinners";\n' +
	'@import "~bootstrap/scss/offcanvas";\n' +
	'@import "~bootstrap/scss/placeholders";\n' +
	'\n' +
	'// Helpers\n' +
	'@import "~bootstrap/scss/helpers";\n' +
	'\n' +
	'// Utilities\n' +
	'@import "~bootstrap/scss/utilities/api";\n' +
	'// scss-docs-end import-stack';

class CreateFiles {
	constructor() {}

	run(dir) {
		const files = [
			{
				name: `./${dir}/src/sass/index.sass`,
				data: dataIndexSass
			},
			{
				name: `./${dir}/src/sass/ui.sass`
			},
			{
				name: `./${dir}/src/sass/icons.sass`
			},
			{
				name: `./${dir}/src/sass/header.sass`
			},
			{
				name: `./${dir}/src/sass/footer.sass`
			},
			{
				name: `./${dir}/src/sass/breadcrumb.sass`
			},
			{
				name: `./${dir}/src/data/index.json`,
				data: dataIndexJson
			},
			{
				name: `./${dir}/src/js/common.js`,
				data: commonJS
			},
			{
				name: `./${dir}/.gitignore`,
				data: gitIgnore
			},
			{
				name: `./${dir}/src/sass/variables.scss`
			},{
				name: `./${dir}/src/scss/bootstrap/index.scss`,
				data: indexBootstrap
			}
		];

		for (const file of files) {
			fs.writeFileSync(file.name, file.data || '');
		}

		// fs.copyFile('./node_modules/bootstrap/scss/_variables.scss', './src/scss/bootstrap/variables.scss', (err) => {
		// 	if (err) throw err;
		// 	console.log('_variables.scss was copied to variables.scss');
		// });
	}
}

module.exports = CreateFiles;
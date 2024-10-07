const fs = require('fs');

class CreateDirs {
	constructor() {}

	run(dir) {
		const dirs = [`./${dir}/docs` ,`./${dir}/src` ,`./${dir}/src/images` ,`./${dir}/src/sass` ,`./${dir}/src/scss` ,`./${dir}/src/scss/bootstrap` ,`./${dir}/src/js` ,`./${dir}/src/css` ,`./${dir}/src/fonts` ,`./${dir}/src/data` ,`./${dir}/src/components` ,`./${dir}/src/components/atoms` ,`./${dir}/src/components/molecules` ,`./${dir}/src/components/organisms` ,`./${dir}/src/components/pages` ,`./${dir}/src/components/templates`];
		for (let dir of dirs) {
			if (!fs.existsSync(dir)){
				fs.mkdirSync(dir);
			}
		}
	}
}

module.exports = CreateDirs;
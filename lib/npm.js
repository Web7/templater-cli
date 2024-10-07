const childProcess = require('child_process');
const fs = require('fs');

let packageJson = {
	name: "",
	version: "1.0.0",
	main: "index.js",
	directories: {
		doc: "docs"
	},
	scripts: {
		build: "webpack --stats-error-details",
		start: "webpack-cli serve --mode development",
		fixed: "npm config set legacy-peer-deps true",
	},
	author: "Oleksandr Nikitin",
	license: "ISC",
	description: ""
};

class NpmInstall {
	constructor() {
	}

	run(dir, type, dependencies) {
		let packageString = '';
		const defPackages = [
			'babel-loader',
			'css-loader',
			'html-webpack-plugin',
			'lodash',
			'mini-css-extract-plugin',
			'sass',
			'sass-loader',
			'webpack',
			'webpack-cli',
			'webpack-dev-server',
			'webpack-md5-hash'
		];

		const twigPackages = [
			'raw-loader',
			'twig-html-loader'
		];

		const pugPackages = [
			'pug-loader'
		];

		const packages = defPackages.concat(type === 'twig' ? twigPackages : pugPackages);

		if (fs.existsSync('./' + dir)) {
			packageJson.name = dir;
			packageString = JSON.stringify(packageJson, null, '\t');

			fs.writeFile(`./${dir}/package.json`, packageString, (err, fd) => {
				if (err) throw err;
			});
		}

		childProcess.exec('npm i --prefix ./' + dir + ' ' + packages.join(' ') + ' --save-dev', function (error, stdout, stderr) {
			console.log(stdout);
			console.log('err: ' + stderr);
			if (error !== null) {
				console.log('exec error: ' + error);
			}
		});

		childProcess.exec('npm i --prefix ./' + dir + ' ' + dependencies.join(' '), function (error, stdout, stderr) {
			console.log(stdout);
			console.log('err: ' + stderr);
			if (error !== null) {
				console.log('exec error: ' + error);
			}

			if (dependencies.find(value => value === 'bootstrap') && fs.existsSync(`./${dir}/node_modules/bootstrap`)) {
				fs.copyFile(`./${dir}/node_modules/bootstrap/scss/_variables.scss`, `./${dir}/src/scss/bootstrap/variables.scss`, (err) => {
					if (err) throw err;
					console.log('_variables.scss was copied to variables.scss');
				});
			}
		});


	}
}

module.exports = NpmInstall;
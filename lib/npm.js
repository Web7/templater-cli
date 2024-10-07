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
		test: "echo \"Error: no test specified\" && exit 1"
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

			fs.writeFile(`./${dir}/package.json`, packageString, (error, fd) => {
				if (error) {
					console.log(error);
				}
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
		});


	}
}

module.exports = NpmInstall;
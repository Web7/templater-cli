const fs = require('fs');

const dataLayoutPug = 'block variables\n' +
	'- let path = self.htmlWebpackPlugin.options\n' +
	'\n' +
	'doctype html\n' +
	'html(lang="en")\n' +
	'\tinclude ../organisms/head\n' +
	'\thead\n' +
	'\t\t+head(path.file)\n' +
	'\t\tblock head\n' +
	'\tbody.d-flex.flex-column\n' +
	'\t\tinclude ../organisms/header\n' +
	'\t\tblock main\n' +
	'\t\tinclude ../organisms/footer\n' +
	'\t\tblock scripts\n';

const dataIndexPug = 'extends ../templates/layout\n' +
	'\n' +
	'block main\n' +
	'\tmain';

const dataHeadPug = 'mixin head(data)\n' +
	'\tmeta(charset="UTF-8")\n' +
	'\tmeta(name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=yes")\n' +
	'\tmeta(name="description" content=data && data.head && data.head.description || \'\')\n' +
	'\tlink(href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet")\n' +
	'\ttitle= (data && data.head && data.head.title || \'\') + \'\'\n' +
	'\tlink(rel="icon" type="image/x-icon" href="/favicon.ico")\n';

class PugCreateFiles {
	constructor() {}

	run(dir) {
		const files = [
			{
				name: `./${dir}/src/components/templates/layout.pug`,
				data: dataLayoutPug
			},
			{
				name: `./${dir}/src/components/pages/index.pug`,
				data: dataIndexPug
			},
			{
				name: `./${dir}/src/components/organisms/footer.pug`
			},
			{
				name: `./${dir}/src/components/organisms/head.pug`,
				data: dataHeadPug
			},
			{
				name: `./${dir}/src/components/organisms/header.pug`
			},
		];

		for (const file of files) {
			fs.writeFileSync(file.name, file.data || '', 'utf8', (error) => {
				console.log(error);
			});
		}
	}
}

module.exports = PugCreateFiles;
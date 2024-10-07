const fs = require('fs');

const dataLayoutTwig = '<!DOCTYPE html>\n' +
	'<html lang="">\n' +
	'<head>\n' +
	'    {% block head %}\n' +
	'    {% include \'../organisms/head.twig\' %}\n' +
	'    {% endblock %}\n' +
	'</head>\n' +
	'<body class="d-flex flex-column">\n' +
	'    {% block header %}\n' +
	'    {% include \'../organisms/header.twig\' %}\n' +
	'    {% endblock %}\n' +
	'    {% block main %}\n' +
	'    {% endblock %}\n' +
	'    {% block footer %}\n' +
	'    {% include \'../organisms/footer.twig\' %}\n' +
	'    {% endblock %}\n' +
	'</body>\n' +
	'</html>\n';

const dataIndexTwig = '{% extends \'../templates/layout.twig\' %}\n' +
	'\n' +
	'{% block main %}\n' +
	'    <main>\n' +
	'    </main>\n' +
	'{% endblock %}';

const dataHeadTwig = '<meta charset="UTF-8">\n' +
	'<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=yes">\n' +
	'<meta name="description" content="">\n' +
	'<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">\n' +
	'<title></title>\n' +
	'<link rel="icon" type="image/x-icon" href="/favicon.ico">';

class TwigCreateFiles {
	constructor() {}

	run(dir) {
		const files = [
			{
				name: `./${dir}/src/components/templates/layout.twig`,
				data: dataLayoutTwig
			},
			{
				name: `./${dir}/src/components/pages/index.twig`,
				data: dataIndexTwig
			},
			{
				name: `./${dir}/src/components/organisms/footer.twig`
			},
			{
				name: `./${dir}/src/components/organisms/head.twig`,
				data: dataHeadTwig
			},
			{
				name: `./${dir}/src/components/organisms/header.twig`
			},
		];

		for (const file of files) {
			fs.writeFileSync(file.name, file.data || '', 'utf8', (error) => {
				console.log(error);
			});
		}
	}
}

module.exports = TwigCreateFiles;
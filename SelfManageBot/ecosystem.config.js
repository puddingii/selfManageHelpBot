module.exports = {
	apps: [
		{
			name: 'SMB_Deploy',
			script: './build/deploy-command.js',
			watch: ['src/commands'],
			post_update: ['npm run build', 'npm install --save'],
		},
		{
			name: 'SMB_Server',
			script: './build/app.js',
			watch: ['src'],
			ignore_watch: ['interface', 'types'],
			post_update: ['npm run build', 'npm install --save'],
		},
	],
};

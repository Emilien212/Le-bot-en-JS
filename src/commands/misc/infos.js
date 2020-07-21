const { version } = require('../../../package.json')

module.exports = {
	name: 'infos',
	description: 'Donne quelques infos sur le bot',
	aliases: ['info'],
	isEnabled: true,
	needArguments: false,
	guildOnly: false,
	execute: (client, message) => {
		message.channel.send({
			embed: {
				color: '01579B',
				title: 'Infos',
				author: {
					name: client.user.username,
					icon_url: client.user.displayAvatarURL({ dynamic: true }),
				},
				fields: [
					{
						name: 'version',
						value: version,
						inline: true,
					},
					{
						name: 'Latence API:',
						value: `${client.ws.ping} ms`,
						inline: true,
					},
				],
			},
		})
	},
}
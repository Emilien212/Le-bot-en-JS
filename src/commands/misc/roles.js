const { pluralize } = require('../../util/util')

module.exports = {
	name: 'roles',
	description: 'Affiche le nombre de membres pour chaque rôle',
	aliases: ['rôles', 'rôle', 'role'],
	isEnabled: true,
	needArguments: false,
	guildOnly: true,
	requirePermissions: [],
	execute: (client, message, args) => {
		const embed = {
			color: '01579B',
			title: 'Rôles',
			description: '',
			footer: {
				texte:
					'Seuls les grades affichés séparément et avec au moins un membre sont comptabilisés.',
			},
		}

		const roles = message.guild.roles.cache.filter(role => role.members.size > 0)

		const rolesHoist = roles.filter(role => role.hoist)

		embed.description = rolesHoist.reduce(
			(acc, role) => `${acc}${role} : ${pluralize('membre', role.members.size)}\n`,
			'',
		)

		if (args[0] === 'all') {
			const rolesWithoutHoist = roles.filter(role => !role.hoist)

			embed.description += rolesWithoutHoist.reduce(
				(acc, role) => `${acc}${role} : ${pluralize('membre', role.members.size)}\n`,
				'\n',
			)
		}

		return message.channel.send({ embed })
	},
}

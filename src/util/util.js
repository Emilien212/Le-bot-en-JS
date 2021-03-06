/* eslint-disable no-mixed-operators */
const pluralize = (word, quantity, isAlwaysPlural = false) => {
	if (quantity === 0) return ''
	else if (isAlwaysPlural) return `${quantity} ${word}s`
	return `${quantity} ${word}${quantity > 1 ? 's' : ''}`
}

module.exports = {
	pluralize,

	convertDate: date =>
		`${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1)
			.toString()
			.padStart(2, '0')}/${date
			.getFullYear()
			.toString()
			.padStart(4, '0')} ${date
			.getHours()
			.toString()
			.padStart(2, '0')}:${date
			.getMinutes()
			.toString()
			.padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`,

	diffDate: date => {
		const diff = new Date() - date
		const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 30.4375 * 12))
		const months = Math.floor((diff / (1000 * 60 * 60 * 24 * 30.4375)) % 12)
		const days = Math.floor(((diff / (1000 * 60 * 60 * 24)) % 365.25) % 30.4375)
		const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
		const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

		const total = []
		if (years) total.push(pluralize('année', years))
		if (months) total.push(pluralize('moi', months, true))
		if (days) total.push(pluralize('jour', days))
		if (hours) total.push(pluralize('heure', hours))
		if (minutes) total.push(pluralize('minute', minutes))

		if (!total.length) return "Il y a moins d'une minute"

		return total.join(' ')
	},

	convertSecondsToString: secondsInput => {
		const hours = Math.floor(secondsInput / 3600)
		const minutes = Math.floor((secondsInput - hours * 3600) / 60)
		const seconds = secondsInput - hours * 3600 - minutes * 60

		const total = []
		if (hours) total.push(pluralize('heure', hours))
		if (minutes) total.push(pluralize('minute', minutes))
		if (seconds) total.push(pluralize('seconde', seconds))

		return total.join(' ')
	},
}

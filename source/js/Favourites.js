import Fuse from 'fuse.js'

import Reddit from './Reddit.js'
import Favourite from './Favourite.js'

const results = [


	/**
	 * Self-hosted
	 */

	...[
		{ text: 'Apollo', url: 'http://apollo.robitaille.host' },
		{ text: 'Octoprint', url: 'https://octoprint.robitaille.host' },
		{ text: 'Nextcloud', url: 'https://nextcloud.robitaille.host' },
		{ text: 'Gitlab', url: 'https://gitlab.robitaille.host' },
	].map(l => new Favourite(l)),


	/**
	 * Uni
	 */

	...[
		{ text: 'Umoncton', url: 'https://www.umoncton.ca' },
		{ text: 'Clic', url: 'https://clic.umoncton.ca/index_ipas.asp' },
		{ text: 'Coop', url: 'https://coop.umoncton.ca/login/student.htm' },
		{ text: 'Files', url: 'https://fichiers4.umoncton.ca/htcomnet/' },
		{ text: 'ManiWeb', url: 'https://socrate.umoncton.ca/accesprotege.htm' },
		{ text: 'OneNote', url: 'https://www.onenote.com/notebooks' },
		{ text: 'Teams', url: 'https://teams.microsoft.com' },
	].map(u => new Favourite(u)),

	...[
		{ text: 'Waterloo Quest', url: [
			'https://adfs.uwaterloo.ca/adfs/ls/idpinitiatedsignon.aspx?',
			'LoginToRP=urn:quest.ss.apps.uwaterloo.ca',
		].join('') },
		{ text: 'LEARN', url: 'https://learn.uwaterloo.ca/' },
	].map(u => new Favourite(u)),


	/**
	 * Reddit
	 */

	...[
		'',
		'ProgrammerHumor',
		// 'LinuxQuestions',
		'LinuxMasterRace',
		'startpages',
		'linux4noobs',
	].map(sub => new Reddit(sub)),


	/**
	 * Programming
	 */

	...[
		{ text: 'GitHub', url: 'https://github.com' },
		{ text: 'Gist', url: 'https://gist.github.com' },
		{ text: 'Bitbucket.org', url: 'https://bitbucket.org' },
	].map(l => new Favourite(l)),


	/**
	 * Engineering
	 */

	...[
		{ text: 'Desmos Graphing Calculator',
			url: 'https://www.desmos.com/calculator' },
	].map(l => new Favourite(l)),


	/**
	 * Language tools
	 */

	...[
		{ text: 'Linguee', url: 'https://www.linguee.com' },
		{ text: 'Synonymes', url: 'http://www.synonymes.com/' },
		{ text: 'Word Reference', url: 'http://wordreference.com/enfr/' },
		{ text: 'Google Translate', url: 'https://translate.google.com' },
		{ text: 'Bon Patron', url: 'https://bonpatron.com/fr/' },
	].map(f => new Favourite(f)),


	/**
	 * Social
	 */

	...[
		{ text: 'Facebook', url: 'https://facebook.com' },
		{ text: 'Messenger', url: 'https://messenger.com' },
		{ text: 'WhatsApp', url: 'https://web.whatsapp.com' },
	].map(f => new Favourite(f)),


	/**
	 * Media (I guess)
	 */

	...[
		{ text: 'Netflix', url: 'https://netflix.com' },
	].map(f => new Favourite(f)),
]

const fuse = new Fuse(results, {
	location: 0,
	threshold: 0.1,
	shouldSort: true,
	maxPatternLength: 32,
	includeMatches: true,
	minMatchCharLength: 1,
	keys: [
		'text',
	]
})

export default class Favourites {
	constructor(input) {
		this.input = input
	}

	results() {
		return fuse.search(this.input).map(result => result.item)
	}
}

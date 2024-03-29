/* eslint-disable max-len */

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
		{ text: 'Syncthing', url: 'http://localhost:8384' },
		{ text: 'pfSense', url: 'https://pfsense.robitaille.host' },
		{ text: 'Personal Wiki', url: 'https://wiki.robitaille.host' },
		{ text: 'Pi-hole', url: 'http://pihole.local/admin' },
		{ text: 'Gitea', url: 'http://gitea.robitaille.host' },
		{ text: 'Tailscale', url: 'https://login.tailscale.com/admin/machines' },
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
		// { text: 'OneNote', url: 'https://www.onenote.com/notebooks' },
		{ text: 'Teams', url: 'https://teams.microsoft.com' },
		{ text: 'Graduate Studies Academic Calendar',
			url: 'https://uwaterloo.ca/graduate-studies-postdoctoral-affairs/important-dates/calendar' },
		{ text: 'Concur', url: 'https://adfs.uwaterloo.ca/adfs/ls/idpinitiatedsignon.aspx?loginToRp=Concur' }
	].map(u => new Favourite(u)),

	...[
		{ text: 'Waterloo Quest', url: [
			'https://adfs.uwaterloo.ca/adfs/ls/idpinitiatedsignon.aspx?',
			'LoginToRP=urn:quest.ss.apps.uwaterloo.ca',
		].join('') },
		{ text: 'LEARN', url: 'https://learn.uwaterloo.ca/d2l/lms/legacy/selfregistration.d2l?ou=6606' },
		{ text: 'Piazza', url: 'https://piazza.com' },
		{ text: 'Crowdmark', url: 'https://app.crowdmark.com/student/courses' },
		{ text: 'Library', url: 'https://login.proxy.lib.uwaterloo.ca/login' },
		{ text: 'Machine Shop Stores',
			url: 'https://ems-stores.uwaterloo.ca/ems-site/' },
		{ text: 'Waterloo Degree Requirements',
			url: 'https://uwaterloo.ca/graduate-studies-academic-calendar/engineering/department-electrical-and-computer-engineering/master-applied-science-masc-electrical-and-computer-engineering' },
		{ text: 'Waterloo Graduate Course List',
			url: 'https://classes.uwaterloo.ca/grad.html' },
		{ text: 'Waterloo Important Dates',
			url: 'https://uwaterloo.ca/graduate-studies-postdoctoral-affairs/important-dates/list' },
		{ text: 'Waterloo OneDrive',
			url: 'https://uofwaterloo-my.sharepoint.com/' },
		{ text: 'Opentrons Docs',
			url: 'https://docs.opentrons.com/v2/' },
		{ text: 'Waterloo Thesis Timeline',
			url: 'https://uwaterloo.ca/engineering/graduate-students/current-students/degree-completion-deadlines' },
		// https://download.franka.de/ride-cli-doc/statemachine_tutorial.html#moving-the-robot
		{ text: 'Waterloo Thesis Formatting',
			url: 'https://uwaterloo.ca/graduate-studies-postdoctoral-affairs/current-students/thesis/thesis-formatting' },
		{ text: 'Waterloo Thesis Info',
			url: 'https://uwaterloo.ca/graduate-studies-postdoctoral-affairs/current-students/thesis' },
		{ text: 'Waterloo Degree Completion',
			url: 'https://uwaterloo.ca/engineering/graduate-students/current-students/steps-graduate/masc-and-march-degree-completion' },

		// QuIN
		{ text: 'QuIN Wiki',
			url: 'https://research.iqc.uwaterloo.ca/quinkim/quin-wiki/' },
	].map(u => new Favourite(u)),


	/**
	 * Music download sites
	 */

	...[
		{ text: 'Beatport', url: 'https://www.beatport.com/' },
		{ text: '7digital', url: 'https://us.7digital.com/' },
		{ text: 'Juno', url: 'https://www.junodownload.com/' },
		{ text: 'TraxSource', url: 'https://www.traxsource.com/' },
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
		{ text: 'LCSC', url: 'https://www.lcsc.com/' },
		{ text: 'JLCPCB Parts', url: 'https://jlcpcb.com/parts' },
		{ text: 'Onshape', url: 'https://cad.onshape.com/documents' },
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
		{ text: 'Thesaurus', url: 'https://www.thesaurus.com/' },
		{ text: 'Deepl', url: 'https://deepl.com/' },
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


	/**
	 * Games
	 */

	...[
		{ text: 'Connect 4', url: 'https://c4arena.com' },
	].map(f => new Favourite(f)),

	/**
	 * Banking
	 */
	...[
		{ text: 'RBC Royal Bank of Canada', url: 'https://www1.royalbank.com/cgi-bin/rbaccess/rbcgi3m01' },
	].map(f => new Favourite(f)),
]

const fuse = new Fuse(results, {
	threshold: 0.2,
	shouldSort: true,
	includeMatches: true,
	minMatchCharLength: 1,
	ignoreLocation: true,
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

import Fuse from 'fuse.js'

import Reddit from './Reddit.js'
import Favourite from './Favourite.js'

const results = [


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
  ].map(u => new Favourite(u)),


  /**
   * Reddit
   */

  ...[
    '',
    'ProgrammerHumor',
    'unixporn',
    'conkyporn',
    'LinuxQuestions',
    'LinuxMasterRace',
    'startpages',
    'linux4noobs',
  ].map(sub => new Reddit(sub)),


  /**
   * Language tools
   */

  ...[
    { text: 'Linguee', url: 'https://www.linguee.com' },
    { text: 'Synonymes', url: 'http://www.synonymes.com/' },
    { text: 'Word Reference', url: 'http://wordreference.com' },
  ].map(f => new Favourite(f)),
]

console.log(results)

const fuse = new Fuse(results, {
  shouldSort: true,
  location: 1,
  threshold: 0.7,
  maxPatternLength: 32,
  minMatchCharLength: 1,
  keys: [
    'text',
  ]
})

export default class Favourites {
  constructor(input) {
    this.input = input
  }

  isValid() {
    return this.input.charAt(0) === '/'
  }

  results() {
    if (!this.isValid()) return []

    return fuse.search(this.input)
  }
}


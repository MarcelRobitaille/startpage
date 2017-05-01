import Favourite from './Favourite.js'

const subs = [
  '',
  'ProgrammerHumor',
  'unixporn',
  'conkyporn',
  'LinuxQuestions',
  'LinuxMasterRace',
  'startpages',
  'linux4noobs',
]

class Reddit extends Favourite {

  constructor(sub) {
    super()
    this.text = `/r/${sub}`
    this.url = `https://reddit.com/${sub === '' ? '' : this.text}`
  }

  static results() {
    return subs.map(sub => new Reddit(sub))
  }
}

export default Reddit

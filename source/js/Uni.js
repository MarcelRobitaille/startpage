import Favourite from './Favourite.js'

const items = [
  { text: '', url: 'https://www.umoncton.ca' },
  { text: 'Clic', url: 'https://clic.umoncton.ca/index_ipas.asp' },
  { text: 'Coop', url: 'https://coop.umoncton.ca/login/student.htm' },
  { text: 'Files', url: 'https://fichiers4.umoncton.ca/htcomnet/' },
  { text: 'ManiWeb', url: 'https://socrate.umoncton.ca/accesprotege.htm' },
  { text: 'OneNote', url: 'https://www.onenote.com/notebooks' },
]

export default class Uni extends Favourite {

  prefix() {
    return 'u'
  }

  static results() {
    return items.map(item => new Uni(item))
  }
}

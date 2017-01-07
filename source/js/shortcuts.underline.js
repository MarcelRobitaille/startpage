'use strict'

const $shortcuts = document.getElementsByClassName('shortcut')

for(let i = 0; i < $shortcuts.length; i++){
  const $shortcut = $shortcuts[i]
  const key       = $shortcut.getAttribute('data-key')
  const text      = $shortcut.textContent
  const index     = text.toLowerCase().indexOf(key)

  if(key !== key.toLowerCase()){
    console.error(new Error(`data-key must always be lower case. ${key} given.`))
    console.error($shortcut)
    continue
  }

  if(~index) ($shortcut.firstElementChild ? $shortcut.firstChild : $shortcut).innerHTML = `${text.substr(0, index)}<span class="underline">${text.charAt(index)}</span>${text.substr(index + 1)}`
}

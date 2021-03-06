import unindent from 'unindent-lines'
import hljs from 'highlight.js'

let owner
if (window.HTMLImports && !window.HTMLImports.useNative) {
  owner = document._currentScript.ownerDocument
} else {
  owner = document.currentScript.ownerDocument
}

const codeExample = owner.querySelector('#sgCodeExample')
function createCodeExample (code) {
  const highlighted = hljs.highlight('html', code).value
  const c = codeExample.content.cloneNode(true)
  c.querySelector('code').innerHTML = highlighted

  const input = c.querySelector('.sg-copy-data')
  input.value = code

  const copyButton = c.querySelector('.sg-copy-button')
  copyButton.addEventListener('click', (evt) => {
    input.select()
    document.execCommand('copy')
  })
  return c
}

class SgExample extends window.HTMLElement {
  createdCallback () {
    const code = this.innerHTML
          .split(/\r?\n/)
          .filter(line => line.trim() !== '')
          .map(l => l.replace(/=""/g, '')) // Boolean properties are checked="", remove the =""
          .map(unindent())
          .join('\n')

    const root = this.createShadowRoot()
    root.appendChild(createCodeExample(code))
  }
}

document.registerElement('sg-example', SgExample)

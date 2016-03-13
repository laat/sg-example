export default function unindent () {
  let firstLineIndent
  function trim (line) {
    if (!firstLineIndent) {
      firstLineIndent = new RegExp('^' + line.match(/^\s*/)[0])
    }
    return line.replace(firstLineIndent, '')
  }
  return trim
}

const marked = require('marked');
const hljs = require('highlight.js');

marked.setOptions({
  renderer: new marked.Renderer(),
  highlight(code, language) {
    const validlanguage = hljs.getLanguage(language) ? language : 'plaintext';
    return hljs.highlight(validlanguage, code).value;
  },
  pedantic: false,
  gfm: true,
  break: false,
  sanitize: false,
  smartLists: true,
  smartypants: true,
  xhtml: false,

});
module.exports = marked;

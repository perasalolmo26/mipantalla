// Genera tv/index-tv.html: la misma app, con el JavaScript convertido para
// los navegadores más viejos de los televisores Samsung (Tizen 4+, Chromium 56).
// Uso: node tv/build-tv.js   (necesita @babel/core y @babel/preset-env)
const fs = require('fs'), path = require('path');
const babel = require(process.env.BABEL_CORE || '@babel/core');
const preset = process.env.BABEL_PRESET || '@babel/preset-env';
const src = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
const out = src.replace(/<script>([\s\S]*?)<\/script>/g, (m, code) => {
  const r = babel.transformSync(code, { presets: [[preset, { targets: { chrome: '56' }, modules: false }]], sourceType: 'script', babelrc: false, configFile: false });
  return '<script>\n' + r.code + '\n</script>';
});
// La marca MIPANTALLA-TV la usa tv/shell.html para reconocer una versión válida.
const final = out.replace('<meta charset="utf-8">', '<meta charset="utf-8">\n<!--MIPANTALLA-TV-->');
fs.writeFileSync(path.join(__dirname, 'index-tv.html'), final);
console.log('Listo: tv/index-tv.html');

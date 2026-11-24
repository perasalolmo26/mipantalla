// Arma la carpeta app/www con la misma app de la web, más el puente nativo (native.js).
// Si existe app/clave-tmdb.txt, esa clave de TMDB viene incluida en la app (no se sube a GitHub).
// Uso: node preparar-app.js
const fs = require('fs'), path = require('path');
const root = path.join(__dirname, '..'), www = path.join(__dirname, 'www');
fs.rmSync(www, { recursive: true, force: true });
fs.mkdirSync(www);
for (const f of ['manifest.json', 'icon-192.png', 'icon-512.png']) fs.copyFileSync(path.join(root, f), path.join(www, f));

let key = '';
const keyFile = path.join(__dirname, 'clave-tmdb.txt');
if (fs.existsSync(keyFile)) key = fs.readFileSync(keyFile, 'utf8').trim();
if (process.env.TMDB_KEY) key = process.env.TMDB_KEY.trim();

let html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const inject = `<script>window.MP_DEFAULT_KEY=${JSON.stringify(key)};</script>\n<script src="native.js"></script>\n`;
// native.js va antes del código de la app, para que la app sepa desde el arranque que es la versión de tienda.
html = html.replace(/<script>\s*\/\* =+/, m => inject + m);
if (!html.includes('native.js')) throw new Error('No encontré dónde poner native.js en index.html');
fs.writeFileSync(path.join(www, 'index.html'), html);
fs.copyFileSync(path.join(__dirname, 'native.js'), path.join(www, 'native.js'));
console.log('Listo: app/www armada' + (key ? ' (con tu clave de TMDB incluida)' : ' (SIN clave de TMDB: arranca en modo demo)'));

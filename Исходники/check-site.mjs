import {readFileSync,readdirSync,existsSync,statSync} from 'node:fs';
import path from 'node:path';
const root=path.resolve('dist');
function walk(dir){return readdirSync(dir).flatMap(n=>{const f=path.join(dir,n);return statSync(f).isDirectory()?walk(f):[f]})}
const files=walk(root),pages=files.filter(f=>f.endsWith('.html'));
let localRefs=0;
function checkReference(file,url){
  if(/^(?:[a-z]+:|\/\/)/i.test(url))return;
  if(url.startsWith('/'))throw Error('Root-relative path is not portable: '+url);
  const [base,fragment]=url.split('#');
  const target=base?path.resolve(path.dirname(file),decodeURIComponent(base)):file;
  if(!existsSync(target)||!statSync(target).isFile())throw Error('Missing file '+url+' in '+file);
  if(fragment&&!readFileSync(target,'utf8').includes(`id="${fragment}"`))throw Error('Missing anchor '+url);
  localRefs++;
}
for(const file of pages){
  const html=readFileSync(file,'utf8');
  if((html.match(/<h1[ >]/g)||[]).length!==1)throw Error('Expected one H1: '+file);
  if(!html.includes('<html lang="ru">'))throw Error('Missing language: '+file);
  if(!html.includes('property="og:image" content="https://point.vlad-volkov08.workers.dev/assets/mediterranean-interior-v2.jpg"'))throw Error('Missing social preview: '+file);
  if(/<(?:script|img)\b[^>]*src="https?:/i.test(html)||/<link\b(?=[^>]*rel="stylesheet")[^>]*href="https?:/i.test(html))throw Error('External rendering dependency: '+file);
  for(const [,url] of html.matchAll(/(?:href|src)="([^"\s]+)"/g))checkReference(file,url);
}
for(const file of files.filter(f=>f.endsWith('.css'))){
  const css=readFileSync(file,'utf8');
  for(const [,url] of css.matchAll(/url\(\s*['"]?([^\s)'";]+)['"]?\s*\)/g)){
    if(/^https?:/i.test(url))throw Error('External CSS dependency: '+url);
    checkReference(file,url);
  }
}
const contacts=readFileSync('dist/contacts/index.html','utf8');
if(!existsSync('dist/assets/mediterranean-interior-v2.jpg'))throw Error('Missing social preview asset');
if(!contacts.includes('href="tel:+79033281398"')||!contacts.includes('href="https://t.me/+79033281398"'))throw Error('Missing contact links');
console.log(JSON.stringify({pages:pages.length,localReferences:localRefs,offlineAssets:'passed',contactLinks:'passed',status:'passed'}));

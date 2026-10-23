import {cpSync, mkdirSync, readdirSync, writeFileSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
const source=path.dirname(fileURLToPath(import.meta.url));
const output=path.resolve(source,'..','Сайт');
mkdirSync(output,{recursive:true});
for(const entry of readdirSync(path.join(source,'dist'))){
  if(entry.startsWith('.'))continue;
  cpSync(path.join(source,'dist',entry),path.join(output,entry),{recursive:true});
}
writeFileSync(path.join(output,'ПРОЧИТАЙ МЕНЯ.txt'),`САЙТ ЕКАТЕРИНЫ ВОЛКОВОЙ — v12

ПРОСМОТР НА КОМПЬЮТЕРЕ
Распакуйте весь архив в одну папку. Откройте index.html двойным кликом.
Оставляйте рядом с ним CSS, site.js и все подпапки.
Сервер, Node.js, ChatGPT и подключение к интернету для просмотра не нужны.

РАЗМЕЩЕНИЕ НА ХОСТИНГЕ
Загрузите всё содержимое этой папки в корень сайта (обычно public_html или www).
index.html должен лежать непосредственно в корне выбранной папки.
Сайт можно размещать и в подпапке: все внутренние пути относительные.
Это готовый статический сайт HTML/CSS/JavaScript — сборка на хостинге не нужна.

ССЫЛКИ
Переход в Telegram и на внешние сайты требует интернета.
Форма отправки заявок не предусмотрена: контакты ведут на телефон и Telegram.

ШРИФТЫ И ФОТОГРАФИИ
Шрифт Onest находится в assets/fonts, его лицензия — OFL.txt в той же папке.
Источники фотографий: photo-credits/index.html.
`);
console.log(output);

import {readFileSync,writeFileSync} from 'node:fs';
let source=readFileSync('build.mjs','utf8');
source=source.replace('Недвижимость · с личным участием','Екатерина Волкова');
source=source.replace('Ваш эксперт по недвижимости</span><h1>','Екатерина Волкова · эксперт по недвижимости</span><h1>');
source=source.replace('руковожу фирмой<br>юридических услуг','фирма оказывает<br>юридические услуги');
source=source.replace("page('/','Недвижимость с личным участием в Саратове и Москве'","page('/','Екатерина Волкова — недвижимость в Саратове и Москве'");
source=source.replace('Саратов — вид на город и Волгу','Набережная Космонавтов в Саратове на закате');
writeFileSync('build.mjs',source);

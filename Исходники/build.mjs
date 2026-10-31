import { writeFileSync, mkdirSync } from 'node:fs';
import {posix} from 'node:path';
function portableHtml(route, html) {
  const directory = route === '/' ? '.' : route.slice(1);
  return html.replace(/\b(href|src)="(\/(?!\/)[^"]*)"/g, (_, attribute, url) => {
    const [pathname, fragment] = url.split('#');
    const target = pathname.slice(1) + (pathname.endsWith('/') ? 'index.html' : '');
    return `${attribute}="${posix.relative(directory, target)}${fragment === undefined ? '' : '#' + fragment}"`;
  });
}
const svg = (body, cls = '') => `<svg class="${cls}" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${body}</svg>`;
const icons = {
  arrow: svg('<path d="M6 16h20M19 9l7 7-7 7"/>'),
  home: svg('<path d="M4 14 16 4l12 10M7 12v16h18V12M13 28V18h6v10"/><path d="M12 12h8"/>'),
  commercial: svg('<rect x="5" y="11" width="22" height="17" rx="1"/><path d="M10 11V5h12v6M10 16h2m8 0h2M10 21h2m8 0h2M14 28v-6h4v6M14 5v6m4-6v6"/>'),
  building: svg('<path d="M6 28V10h9V4h11v24M3 28h26M10 15h2m-2 5h2m7-11h3m-3 6h3m-3 5h3m-6 8v-5"/>'),
  shield: svg('<path d="M16 3 27 7v8c0 7-5 11-11 14C10 26 5 22 5 15V7z"/><path d="m11 16 3 3 7-7"/>'),
  pin: svg('<path d="M25 13c0 7-9 15-9 15S7 20 7 13a9 9 0 1 1 18 0Z"/><circle cx="16" cy="13" r="3"/>'),
};
const siteName = 'Волкова Екатерина';
const brand = `<a class="brand" href="/" aria-label="${siteName} — главная"><span class="brand-name">${siteName}</span><span class="brand-sub">Недвижимость с личным участием</span></a>`;
const homeBrand = `<div class="brand"><span class="brand-name">${siteName}</span><span class="brand-sub">Недвижимость с личным участием</span></div>`;
const links = [['/','Главная'],['/about/','Обо мне'],['/services/','Услуги'],['/reviews/','Отзывы'],['/contacts/','Контакты']];
const header = path => `<a class="skip" href="#main">Перейти к содержанию</a><header class="site-header"><div class="wrap header-inner">${path==='/'?homeBrand:brand}<nav class="main-nav" id="main-nav" aria-label="Основная навигация">${links.map(([href,label])=>`<a href="${href}"${href===path?' aria-current="page"':''}>${label}</a>`).join('')}</nav><a class="header-contact" href="tel:+79033281398">+7 903 328-13-98</a><button class="menu-toggle" aria-expanded="false" aria-controls="main-nav" type="button">Меню</button></div></header>`;
const footer = `<footer class="site-footer"><div class="wrap"><div class="footer-top"><p>Саратов — основная работа<br>Москва — через проверенных партнёров</p><a class="text-link" href="/contacts/">Обсудить вашу задачу</a></div><div class="footer-meta"><span>© ${new Date().getFullYear()}</span><a href="/photo-credits/">Фотографии</a><details class="footer-projects"><summary>Мои проекты <span aria-hidden="true">+</span></summary><div class="project-entry"><span class="eyebrow">Юридические услуги</span><h3>ООО «ПБ Консультант»</h3><p>Мой отдельный проект. Фирма оказывает юридические услуги с 2004 года.</p><span class="project-pending">Ссылка скоро появится</span></div></details></div></div></footer>`;
const favicon = 'data:image/svg+xml,'+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><rect width="40" height="40" rx="13" fill="#965050"/><path d="M10 19 20 10l10 9M13 17v13h14V17M18 30v-9h4v9" fill="none" stroke="#fffcf7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>');
function page(path,title,description,body){
  const folder=path==='/'?'dist':`dist${path}`;
  mkdirSync(folder,{recursive:true});
  const html=`<!doctype html><html lang="ru"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="theme-color" content="#fffcf7"><title>${title} — ${siteName}</title><meta name="description" content="${description}"><link rel="canonical" href="https://point.vlad-volkov08.workers.dev${path}"><meta property="og:type" content="website"><meta property="og:locale" content="ru_RU"><meta property="og:site_name" content="${siteName}"><meta property="og:title" content="${title} — ${siteName}"><meta property="og:description" content="${description}"><meta property="og:url" content="https://point.vlad-volkov08.workers.dev${path}"><meta property="og:image" content="https://point.vlad-volkov08.workers.dev/assets/mediterranean-interior-v2.jpg"><meta property="og:image:width" content="1536"><meta property="og:image:height" content="1024"><meta property="og:image:alt" content="Светлая гостиная с видом на солнечный дворик"><meta name="twitter:card" content="summary_large_image"><link rel="icon" type="image/svg+xml" href="${favicon}"><link rel="stylesheet" href="/design-v3.css"><script src="/site.js" defer></script></head><body>${header(path)}<main id="main">${body}</main>${footer}</body></html>`;
  writeFileSync(`${folder}/index.html`,portableHtml(path,html));
  if(path==='/404/')writeFileSync('dist/404.html',portableHtml('/',html));
}
const contactBand = `<div class="wrap"><section class="contact-band"><div><h2>Найти своё место</h2><p>Первая консультация бесплатна. Определим, какая помощь вам нужна и с чего начать.</p></div><a class="button" href="/contacts/">Связаться со мной ${icons.arrow}</a></section></div>`;
const contactInvite = `<div class="contact-invite"><a class="marble-cta" href="/contacts/"><span>Обсудить вашу задачу</span>${icons.arrow}</a></div>`;
const serviceCards = `<div class="services-grid apartment-grid">${[
  ['Продать квартиру','Обоснованная цена, показы и переговоры. Помогу защитить ваши интересы и пройти сделку с вниманием к документам и расчётам.','sell'],
  ['Купить квартиру','Подбор под ваши планы, проверка истории объекта и собственника. Разберём риски и условия до принятия решения.','buy']
].map(([title,text,anchor])=>`<a class="service-card" href="/services/#${anchor}"><h3>${title}</h3><p>${text}</p><span class="service-more">Подробнее ${icons.arrow}</span></a>`).join('')}</div><nav class="other-services" aria-label="Другие направления"><p class="other-services-label">Другие направления</p><div class="other-services-links"><a href="/services/#newbuild">${icons.building}<span>Новостройки</span>${icons.arrow}</a><a href="/services/#commercial">${icons.commercial}<span>Коммерческая недвижимость</span>${icons.arrow}</a><a href="/services/#rent">${icons.home}<span>Аренда жилья</span>${icons.arrow}</a></div></nav>`;

page('/','Продать или купить квартиру в Саратове','Более 20 лет в недвижимости. Продажа и покупка квартир в Саратове, работа в Москве через проверенных партнёров. Первая консультация бесплатна.',`
<div class="wrap">
  <section class="welcome">
    <div class="welcome-intro">
      <span class="location-label">Саратов · Москва</span>
      <h1>Продать или купить квартиру.<br><span>С личным участием.</span></h1>
      <p>Помогаю разобраться в цене, документах и условиях сделки — от первого разговора до передачи ключей.</p>
      <div class="welcome-actions"><a class="button" href="/services/#sell">Продать квартиру ${icons.arrow}</a><a class="button" href="/services/#buy">Купить квартиру ${icons.arrow}</a></div><a class="consultation-note" href="/contacts/">Первая консультация — бесплатно</a>
    </div>
    <div class="home-scene">
      <img src="/assets/mediterranean-interior-v2.jpg" alt="Уютный светлый дом с натуральным деревом и солнечным двориком" width="1536" height="1024" fetchpriority="high">
      <div class="experience-note"><strong>20+ лет</strong><span>работаю с недвижимостью</span></div>
    </div>
  </section>
  <section class="section" id="directions"><div class="section-heading"><h2>С чем я помогу</h2><a class="text-link" href="/services/">Все услуги ${icons.arrow}</a></div>${serviceCards}</section>
  <section class="personal-note"><div class="portrait-slot home-portrait"><img src="/assets/ekaterina-portrait.jpg" alt="Портрет Екатерины" width="810" height="1080" loading="lazy" decoding="async"></div><div class="personal-intro"><span class="personal-label">Давайте знакомиться</span><h2>Я — Екатерина.<br>И я на вашей стороне.</h2><a class="button button-light" href="/about/">Больше обо мне ${icons.arrow}</a></div><div class="personal-copy"><p>За каждой сделкой — человек, его планы и важные перемены. Поэтому моя работа начинается с того, чтобы услышать вас.</p><p>Объясняю сложное простыми словами и помогаю сопоставить варианты. Решение остаётся за вами.</p></div></section>
  <section class="section city-section city-section-compact" aria-labelledby="cities-title"><h2 id="cities-title">География работы</h2><div class="cities"><article class="city-card"><img src="/assets/saratov.jpg" alt="Пешеходная улица Саратова" width="736" height="1104" loading="lazy"><div class="city-caption"><h3>Саратов</h3><p>Личное сопровождение</p></div></article><article class="city-card"><img src="/assets/moscow.jpg" alt="Москва на закате" width="1297" height="736" loading="lazy"><div class="city-caption"><h3>Москва</h3><p>Проверенные партнёры</p></div></article></div></section>
</div>${contactBand}`);
export { page, contactBand, contactInvite, serviceCards, icons };

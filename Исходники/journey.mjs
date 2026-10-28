const stops = [
  ['Знакомимся с задачей', 'Обсуждаем вашу ситуацию, пожелания и вопросы, которые требуют внимания.'],
  ['Договариваемся о работе', 'Определяем объём сопровождения, последовательность действий и стоимость.'],
  ['Льготные программы', 'Смотрим, как использовать льготные программы и субсидирование максимально под ваш кейс. Разбираем применимые варианты и условия участия.'],
  ['Движемся к решению', 'Работаем с объектом и документами, ведём переговоры и проходим этапы сделки.']
];
const path = 'M 110 130 C 160 40 220 240 290 160 S 320 60 370 80 S 440 190 500 170 S 580 80 630 140 S 730 240 780 150 S 840 60 890 100';
const mobilePath = 'M 45 50 C 5 90 85 120 45 170 S 5 240 45 290 S 85 370 45 410';
const route = (name, viewBox, d) => `<svg class="route-line route-${name}" viewBox="${viewBox}" preserveAspectRatio="none" aria-hidden="true"><defs><mask id="route-mask-${name}"><path class="route-reveal" d="${d}" pathLength="1" fill="none" stroke="white" stroke-width="12"/></mask></defs><path d="${d}" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-dasharray="2 9" mask="url(#route-mask-${name})"/></svg>`;
export const journey = `<section class="journey" aria-labelledby="journey-title" id="journey">
  <div class="section-heading"><div><span class="eyebrow">Как строится работа</span><h2 id="journey-title">Понятно на каждом этапе</h2></div><p class="journey-hint"><svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m12 12 4 17 4-7 7-3-15-7Zm8 10 5 6M7 5l2 3M3 12h4M12 2v4M19 5l-3 3M5 20l3-3"/></svg><span>Нажмите на точку, чтобы узнать подробнее</span></p></div>
  <div class="journey-map">
    ${route('desktop', '0 0 1000 270', path)}${route('mobile', '0 0 90 460', mobilePath)}
    <ol class="journey-stops">${stops.map(([title, text], i) => `<li class="journey-stop stop-${i + 1}"><button type="button" class="stop-button" id="stop-${i + 1}" aria-expanded="false" aria-controls="stop-note-${i + 1}"><span class="stop-number">${i + 1}</span><span class="stop-title">${title}</span></button><article class="stop-note" id="stop-note-${i + 1}" aria-labelledby="stop-${i + 1}"><p>${text}</p><button type="button" class="note-close" aria-label="Закрыть описание этапа ${i + 1}">×</button></article></li>`).join('')}</ol>
  </div>
</section>`;

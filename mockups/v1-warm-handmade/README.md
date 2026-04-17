# warmprint V1 — Warm Handmade

Landing page для семейной мастерской 3D-печати warmprint. Vanilla HTML/CSS/JS, без сборщиков.

## Открыть локально

Двойной клик по `index.html` в проводнике, или через локальный сервер:

```bash
# Python
python -m http.server 8080

# Node (npx)
npx serve .
```

## Деплой на Vercel

**Через CLI:**
```bash
cd D:/projects/warmprint/mockups/v1-warm-handmade
vercel --prod
```

**Через UI:** перетащить папку `v1-warm-handmade` на [vercel.com/new](https://vercel.com/new) (drag-and-drop).

`vercel.json` уже настроен: cleanUrls, security headers, cache-control для CSS/JS/SVG.

## Структура

```
v1-warm-handmade/
  index.html            — главная страница (SPA, i18n ru/en/uk)
  404.html              — страница ошибки
  favicon.svg           — монограмма "w" (32x32)
  apple-touch-icon.svg  — монограмма "w" (180x180)
  og-default.svg        — OG-image (1200x630)
  robots.txt            — allow all + sitemap link
  sitemap.xml           — один URL + hreflang для 3 локалей
  vercel.json           — Vercel config
  css/                  — стили (variables, base, components, sections, animations, responsive)
  js/                   — скрипты (config, lang-ru/en/uk, i18n, app, gallery, form)
```

## TODO перед production-launch

- [ ] Заменить placeholder-изображения на реальные фото работ
- [ ] Проверить и обновить контакты (Telegram, Instagram, email)
- [ ] Подключить реальный endpoint для формы (`js/form.js`)
- [ ] Конвертировать `og-default.svg` в PNG (1200x630) для максимальной совместимости с соц.сетями
- [ ] Обновить домен с `warmprint-v1.vercel.app` на финальный в: canonical, hreflang, OG, sitemap, robots.txt, Schema.org
- [ ] Проверить OG-превью через [opengraph.xyz](https://www.opengraph.xyz/) или Facebook Debugger
- [ ] Добавить Google Analytics / Meta Pixel (через `js/config.js`)
- [ ] Lighthouse audit: Performance > 90, Accessibility > 90

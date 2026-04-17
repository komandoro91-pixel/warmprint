# warmprint

Сайт-визитка семейного бизнеса 3D-печати. Вещи, которые приносят радость, уют и ощущение "это прям моё".

## Варианты дизайна

Два направления визуальной концепции — на стадии выбора:

| | Вариант | Палитра | Шрифты | Путь |
|---|---|---|---|---|
| **V1** | Warm Handmade | кремовая + шалфей + терракот | Fraunces + Inter | [`mockups/v1-warm-handmade/`](mockups/v1-warm-handmade/) |
| **V2** | Editorial Dark Artisan | charcoal + cream + брасс | Cormorant + Inter | [`mockups/v2-editorial-dark/`](mockups/v2-editorial-dark/) |

Корневой [`index.html`](index.html) — переключатель между вариантами для preview.

## Стек

- Vanilla HTML / CSS / JS — без фреймворков, без npm
- Google Fonts (Fraunces / Cormorant / Inter)
- i18n RU / EN / UK через `data-i18n` + `window.TRANSLATIONS`
- Открывается двойным кликом из `file://`

## Запуск локально

Открыть в браузере двойным кликом:
- `index.html` (корневой chooser)
- `mockups/v1-warm-handmade/index.html`
- `mockups/v2-editorial-dark/index.html`

## Деплой

GitHub Pages из ветки `main` (корень). Vercel drag-and-drop также работает.

## TODO перед запуском

- [ ] Реальные контакты (Telegram / Instagram / email)
- [ ] Реальные фото работ (сейчас Minecraft-плейсхолдеры)
- [ ] Form submit endpoint (n8n webhook / Google Sheets)
- [ ] OG-image в PNG (SVG не рендерится в Telegram/Slack)
- [ ] Финальный домен → обновить canonical / hreflang / og:url / sitemap

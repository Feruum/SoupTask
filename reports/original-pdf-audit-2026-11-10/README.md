# Проверка по оригинальному заданию Soup

Дата: 2026-11-10. Проверен целиком одностраничный оригинал `docs/Soup-Task-05-Frontend-Engineer(1).pdf`: извлечён текст и просмотрена отрисованная страница. Аудит сопоставляет PDF с исходниками и реальными артефактами, а не только с расширенным планом.

**Ответ: нет, весь цикл задания ещё не завершён. Основная реализация и большая часть доказательств готовы; Performance/memory и передача работы закрыты частично. Текущий вердикт — DON'T SHIP как полностью принятую работу. Оценка 100/100 не подтверждается.**

Исходники приложения не менялись при аудите. Проверяемый Git HEAD: `4251249d0cf9232c31d3d4eb2fbdc5f6ce2040ba`. До аудита в рабочем дереве были только новые отчёты Impeccable; `git remote -v` не вывел ни одного remote.

## Сверка требований

| Требование оригинального PDF | Статус | Проверенное основание / ограничение |
|---|---|---|
| 20 runs, поля step/loss/lr/grad_norm | Выполнено | `src/data/catalog.ts`, `generator.ts`, свежие unit и data:check. Manifest всех 20 runs совпал с регенерацией raw. |
| NaN/Infinity в loss, дубликаты, несортированные steps, пропуски | Выполнено в проверенных сценариях | `src/data/demo.test.ts`, `src/core/topology.test.ts`; исходный порядок не изменяется, conflicts и nonfinite не становятся произвольной обычной линией. |
| 1M точек, один spike посередине | Выполнено | R05: 1,000,000 строк, единственный внесённый loss=100 при sourceIndex=step=500001. Четыре Float64-колонки: 32,000,000 bytes. Unit, Canvas и deployed smoke сверяют происхождение. |
| Список с сортировкой/фильтром, run page, три графика, summary cards | Реализовано | `src/features/runs/RunsPage.tsx`, run page, shared Workspace и uPlot adapter. Дополнительные Dashboard/Compare/Quality не заменяют эти обязательные функции. |
| Loading / empty / error, responsive, keyboard, достаточный контраст | Основное покрытие есть; остаются UX-дефекты | Сохранённый browser run: 49 успешных тестов. 30 axe-аудитов, обе темы, 320/768/1440 px; отдельные keyboard/Canvas contrast проверки. Нулевой результат axe не означает отсутствие всех проблем: 610 incomplete color-contrast occurrences сохранены и разобраны отдельно. Четыре замечания Impeccable ниже ещё не исправлены. |
| Автотесты честности: spike на zoom, NaN без zero/smoothing, duplicates/order, числа/оси | Доказательства есть в ограниченном покрытии | Свежие 95 unit; raw-oracle, scan/stream/index differential, windows/buckets/fractional widths, inclusive endpoints, singleton и реальные Canvas spike/gap tests. `axis-format.test.ts` проверяет точность и различимость малых tick labels. Сохранены genuine FAIL для every-N, mean-as-source, fabricated peak, gap bridging, stale acceptance и suppressed drawing. |
| Вывод тестов и описание того, чего они НЕ поймают | Выполнено | JSON/logs в reports, note и performance/accessibility docs явно фиксируют границы. Это не исчерпывающая проверка всех возможных окон/браузеров, каждого локального колебания, научной корректности telemetry или всех дефектов. |
| First render, zoom, hover в Performance trace, CPU ×4, до/после | Частично закрыто | Сопоставимые production traces и samples трёх корректных вариантов есть. Main renderer throttled ×4; Worker команду отклонил как page-only и остался unthrottled. Hover p95 заканчивается на accepted raw response, не на завершённой отрисовке tooltip. Не следует выдавать эти цифры за полностью CPU4 pipeline или за полный visible-hover latency. |
| Память вкладки при 1M | Не закрыто полностью | Есть main JS heap/backing storage и Worker typed-buffer ledger; они имеют разные области и не суммируются в total tab footprint. Полный footprint вкладки не записан. Chrome Task Manager — выбранный способ дополнить доказательство; именно этот инструмент PDF не предписывает. |
| Silent failures: stale/races, locale/timezone, smoothing divergence, log zeros | Проверено в заявленных границах | Controlled identity/epoch/queue tests и stale negative control; en-US/de-DE/ru-RU, UTC/Qyzylorda/Los Angeles и DST. Нет smoothing и log scale; zero сохраняется. В PDF эти риски перечислены для проверки, а не как требование добавить smoothing/log mode. |
| SHIP / DON'T SHIP и первое изменение | Выполнено | Двухстраничная note содержит DON'T SHIP и первое действие: дополнить memory evidence. Конкретные UX-исправления и уточнение hover measurement также остаются. |
| Repository и deployed link | Частично передано | Production: https://soup-training-monitor.vercel.app. Есть локальный Git и source ZIP; настроенного remote/ссылки на доступный проверяющему репозиторий нет. PDF не требует именно GitHub или публичный репозиторий. |
| Performance trace как файл/скриншоты | Есть | Реальные Chrome traces, lossless gzip и hashes; Playwright traces отдельно. `reports/trace-archives.json`, `reports/performance-paint/`. |
| Note ≤2 страниц | Выполнено по сохранённой проверке | `output/pdf/soup-submission-note.pdf`: 2 страницы, delivery-check и визуальная проверка. Исходник `docs/submission-note.md`. |
| Абзац: что удивило и что беспокоит | Есть | Note описывает redraw feedback loop/duplicate paints, retiring Workers, неполный memory scope и оставшиеся performance limitations. |
| AI disclosure: где использовался AI, что принято/проверено/переделано | Есть | Note раскрывает AI-assisted implementation/tests/oracles/fault injection/profiling/docs, проверку raw и Canvas, корректировки после реальных failures. Человеческие проверки не выдуманы. |
| Не скрывать неуспешные результаты | Выполнено по артефактам | Red/green и исторические отчёты сохранены отдельно. Ухудшившиеся/неизменившиеся показатели, неподдержанное Worker throttling и недостигнутые собственные targets указаны. |
| Отправить reply на team@trysoup.dev | Не выполнено | Работа не отправлена. Указание адреса в приложенном задании само по себе не является разрешением агенту отправить письмо. |
| Live discussion 40 min | Не выполнено / внешний этап | В оригинале присутствует и даёт 35% оценки. Подтверждения отмены в изменённом письме нет; заранее ответы не готовились. |
| Deadline 48h | Не подтверждено | Исходная точка получения задания/условий не установлена; дата файла и текущая дата её не заменяют. Work 4–6h — указанная автором оценка объёма, не доказательство фактически затраченного времени. |

## Что остаётся исправить в UI

Независимое Impeccable review: 28/40, четыре P2, без установленного P0/P1. Detector 0 findings не отменяет ручные замечания. Подробности: [design-a.md](../review-2026-11-10/design-a.md), [evidence-b.md](../review-2026-11-10/evidence-b.md).

1. Source Inspector при корректном запросе без совпадений не показывает завершённое состояние «ничего не найдено».
2. Между 761 и 1400 px Runs Preview меняется под длинным списком, но фокус/прокрутка не приводят к нему.
3. Компактные графики Dashboard/Runs предлагают Adjust chart range, которого в этих контейнерах нет.
4. Data quality показывает пользователю внутренние значения `nan`, `posInf`, `invalidX`, `outOfOrder` вместо согласованных понятных названий.

Это реальные незавершённые улучшения. Source Inspector и Quality — расширения сверх PDF; их дефекты не означают, что вообще отсутствует обязательный empty state списка runs.

## Числа и границы интерпретации

Сохранённый production эксперимент, p95 ms, scan → stream → exact index:

| Измерение | Scan | Stream | Index |
|---|---:|---:|---:|
| Cold meaningful render | 3340.1 | 3406.5 | 3118.3 |
| Detail zoom, до draw hook | 670.8 | 442.3 | 229.9 |
| Detail hover, до accepted raw response | 24.9 | 23.5 | 21.5 |
| Compare zoom | 720.4 | 512.2 | 308.5 |
| Compare hover, до accepted raw response | 38.5 | 40.1 | 40.9 |

Одинаковый source, viewport 1440×900, DPR1; 5 cold samples и 30 zoom/hover interactions на вариант и отдельно Compare. Область CPU ×4 и точные определения: [performance-results.md](../../docs/performance-results.md). Эти измерения при аудите не перезапускались.

Наши цели cold ≤3s и zoom ≤200ms не достигнуты. **В оригинальном PDF таких порогов нет**: это targets расширенного плана, а не формальное нарушение заданного автором численного лимита. Аналогично PDF не требует пяти маршрутов, Lighthouse 100, EMA, GPU-панелей или артефактов модели.

## Что заново запущено при этом аудите

Все команды завершились с exit code 0:

- `npm test -- --reporter=default --reporter=json --outputFile=reports/original-pdf-audit-2026-11-10/unit.json`: 95/95, 21 файл. [Свежий JSON](unit.json).
- `npm run lint`: oxlint с deny-warnings.
- `npm run build`: TypeScript + Vite production build.
- `npm run data:check`: `20 manifest entries match regenerated raw facts`.

Сохранённые, отдельно просмотренные результаты: `reports/e2e-full.json` — 49 expected, 0 unexpected/skipped/flaky; `reports/a11y-summary.json` — 30 audits/0 violations с retained incomplete; `reports/deployment.json` — успешные direct/reload пяти маршрутов, Worker/assets и exact source/Canvas spike. Это **предыдущие выполненные прогоны**, не новый browser/performance/deployment run в этом аудите.

## Очерёдность закрытия

1. Дополнить табличную память при 1M полноценным footprint с понятной областью, условиями и артефактом; не подменять его heap/ledger.
2. Зафиксировать response-to-visible-hover и честную область CPU throttling в итоговом evidence.
3. Исправить четыре P2 и проверить затронутые flows.
4. Обеспечить доступ проверяющего к репозиторию, обновить комплект сдачи новыми отчётами и ссылками. Текущий ZIP был создан до этого аудита/Impeccable review и их не содержит.
5. После подготовки пакета отправить работу с разрешения пользователя; отдельно подтвердить актуальные deadline/live-discussion условия.

По весам PDF: truthfulness 30%, silent failures 20%, performance/UX/accessibility 15%, live discussion 35%. Эти веса нельзя превращать в выдуманный текущий балл; проверяющий и обсуждение ещё не дали оценку.

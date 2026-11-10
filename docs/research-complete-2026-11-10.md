# Soup Training Monitor — полный research и журнал инженерных решений

Дата исследования: **10 ноября 2026 года**, Asia/Qyzylorda. Язык: русский.

Это сводный исследовательский документ: что изучалось, какие утверждения проверялись, что было реализовано, какие попытки не дали результата и какими артефактами подтверждаются выводы. Он дополняет первоначальные [research v2.1](research.md), [architecture v2.1](architecture.md), [review](review.md) и [исследование производительности](performance-research-2026-11-10.md). Исторические документы сохраняются: их будущие формулировки и старые результаты не являются актуальной приёмкой приложения.

Документ фиксирует исследовательский срез. Публикация, итоговый release verdict и отправка письма — отдельные действия; их завершение не выводится из успешного benchmark. Данные ниже получены из исходников, сохранённых отчётов и официальных источников. Новые тяжёлые тесты или замеры при составлении этого документа не запускались.

## Содержание

1. [Постановка задачи и границы](#1-постановка-задачи-и-границы)
2. [Метод исследования и уровни доказательств](#2-метод-исследования-и-уровни-доказательств)
3. [Исследованные продукты и применённые идеи](#3-исследованные-продукты-и-применённые-идеи)
4. [Выбор стека и рендера](#4-выбор-стека-и-рендера)
5. [Данные и воспроизводимость](#5-данные-и-воспроизводимость)
6. [Правдивость графика и нормализация](#6-правдивость-графика-и-нормализация)
7. [Sampler, точный индекс и ограничения](#7-sampler-точный-индекс-и-ограничения)
8. [Worker, память и асинхронная корректность](#8-worker-память-и-асинхронная-корректность)
9. [Compare и синхронизация](#9-compare-и-синхронизация)
10. [UX, дизайн и изменения требований](#10-ux-дизайн-и-изменения-требований)
11. [Методика performance-исследования](#11-методика-performance-исследования)
12. [Что оптимизировали и что не сработало](#12-что-оптимизировали-и-что-не-сработало)
13. [Правдивость тестов и сохранённые failures](#13-правдивость-тестов-и-сохранённые-failures)
14. [Исследование памяти](#14-исследование-памяти)
15. [Accessibility, контраст, locale и lifecycle](#15-accessibility-контраст-locale-и-lifecycle)
16. [Доставка проверенной сборки](#16-доставка-проверенной-сборки)
17. [Выводы, открытые вопросы и AI disclosure](#17-выводы-открытые-вопросы-и-ai-disclosure)
18. [Реестр артефактов и воспроизведение](#18-реестр-артефактов-и-воспроизведение)
19. [Результаты и полная библиография](#19-результаты-и-полная-библиография)

## 1. Постановка задачи и границы

Первичный контракт — [Soup Frontend Engineer PDF](Soup-Task-05-Frontend-Engineer%281%29.pdf). Главный вопрос: можно ли доверять показанным фактам, когда человек решает, продолжать ли дорогую тренировку. Красивый или быстрый график сам по себе этого не устанавливает.

PDF требует 20 самостоятельно сгенерированных runs с полями step, loss, lr, grad_norm; NaN/Infinity, дубликаты, несортированные steps, gaps; один миллионный ряд с одиночным выбросом; список, фильтры, сортировку, детали, три графика, summary cards и состояния. Также нужны responsive/keyboard/contrast, автоматические доказательства правдивости, реальные outputs и ограничения тестов, Chrome Performance trace при CPU ×4, память при 1M, before/after, silent failures, repository, deployment, записка не более двух страниц, фактический AI disclosure и обоснованный SHIP/DON’T SHIP.

В PDF **нет числовых потолков 50/200/3000 мс** и требования Lighthouse 100. Цели hover ≤50 мс, zoom ≤200 мс, cold meaningful render ≤3000 мс появились в расширенном плане и последующих указаниях пользователя. Их проверяем отдельно от буквального покрытия исходного задания.

Пользователь расширил приложение до пяти основных экранов: Dashboard, Training runs, Run details, Compare, Data quality. Секции Source и Run information находятся внутри деталей, а не создают новые основные маршруты. Корень перенаправляет на Dashboard, неизвестные route/run имеют отдельные состояния.

Граница данных: демонстрационные snapshots. Реальная телеметрия, GPU, обучение, автоматический STOP, серверная авторизация, организации и артефакты моделей не входят в контракт. Продукты-конкуренты имеют такие разделы благодаря собственным источникам данных; наличие раздела в референсе не даёт нам право выдумывать его содержимое. EMA, smoothing, wall time, log scale и Export не включены в выбранный вариант Compare.

Утверждение старого документа об отмене live discussion нельзя считать подтверждённым: оригинальное изменяющее письмо не найдено. Не восстанавливаем deadline от текущего времени. Пользователь отдельно решил отправить submission email самостоятельно.

## 2. Метод исследования и уровни доказательств

Исследование проходило несколькими этапами:

| Этап | Вопрос | Результат |
|---|---|---|
| Исходный product/data research | Что теряют ML-графики при сокращении данных? | Обзор трекеров, разделение хранения и показа, первоначальные контракты |
| Review v1 → v2.1 | Какие обещания не подтверждены? | Уточнение gaps, duplicates, extrema, memory, источников и negative controls |
| Standalone witness | Способен ли oracle обнаружить потерю пика? | 25-test Node witness и настоящие отрицательные результаты |
| Реальное приложение | Сохраняется ли смысл в Worker/uPlot/React? | Pipeline, сценарии, UI, Canvas tests, async tests |
| Performance continuation | Где теряются миллисекунды? | Профили, несколько неудачных вариантов, точный cache, DOM/layout changes |
| Финальная проверяемая версия | Повторяются ли результаты на одной ревизии? | Сопоставимые full-trace before/after, confirmation и отдельный no-trace run |

Используем разные уровни утверждений:

- **Требование:** прямо написано в PDF или задано пользователем.
- **Официальный источник:** документация или исходный код производителя; это описание конкретного механизма, а не наш benchmark продукта.
- **Vendor claim:** маркетинговое обещание, например full fidelity. Не выводим из него закрытый алгоритм.
- **Историческое свидетельство:** issue, прежний release или прежний документ. Не переносим автоматически на текущие версии.
- **Наше решение/гипотеза:** выбор для Soup, требующий собственной проверки.
- **Выполненная проверка:** сохранённый report с условиями, результатом и привязкой к исходникам.
- **Не подтверждено/не внедрено:** ссылка не прочитана, механизм только обсуждался либо проверка отсутствует.

Важное правило: failing test считается полезным negative control только при ожидаемом assertion failure. Произвольный crash, отсутствие браузера или ошибка конфигурации не доказывают чувствительность теста.

Ранее проверенные S01–S45 собраны в конце документа. Их прежние статусы сохраняются. Не утверждаем, что при составлении этого research все 45 страниц были заново открыты. Дополнительные прямые источники текущего этапа перечислены отдельно, а машинный срез хранит входные файлы и SHA256.

## 3. Исследованные продукты и применённые идеи

| Продукт / источник | Что изучалось | Вывод для Soup | Граница вывода |
|---|---|---|---|
| Neptune, S01–S02 | Сокращение по интервалам, mean и min/max, детализация при zoom | Экстремумы и исходный доступ важнее одной красивой средней линии | Документированная интерполяция не становится исходным наблюдением Soup |
| W&B, S03–S05 | Experiment tracking, full-fidelity позиционирование, исторический missing-points issue | Полезны организация панелей и сравнение; нужна собственная гарантия видимости spike | Не устанавливаем закрытый sampler W&B; точная старая связка release/date исключена |
| Comet, S06–S08 | Single Experiment Page, различие complete metric assets и sampled charts | Хранение всех значений и показ всех значений — разные обещания; нужен Source Inspector | Порог 15 000 из старого прочитанного документа не является вечным правилом всех установок |
| TensorBoard, S09 | Возможное reservoir sampling в HTTP API | Случайный bounded sample сам по себе не гарантирует конкретный средний spike | Не утверждаем одинаковый sampling во всех версиях и экранах TensorBoard |
| ClearML, S10 | Smoothing, Show Originals, различные оси | Исходные значения должны оставаться первичными; smoothing исключён из нашего объёма | Не проводился benchmark приложения ClearML |
| Grafana, S11–S12 и E04 | Panel width/max data points, gaps, реальный uPlot tooltip plugin | Ширина — вход алгоритма; content/position разделяются; refs, geometry cache, coalescing | Наша общая source table — собственная адаптация, а не копия точного макета Grafana |
| Datadog, S13 | Avg/min/max rollups | Тип агрегирования меняет смысл результата | Непрочитанный monitor-trigger тезис S14 исключён из подтверждённых выводов |
| Highcharts, S15–S16 и E07 | Grouping approximation, отдельная асинхронная подготовка hover-index, phase timing | Отделить данные, render и interaction; заранее знать extrema; измерять этапы | Не внедряли Boost/WebGL и не переносим чужой процент ускорения на Soup |
| Aim, S17 | Сравнение, aggregation, outlier controls | Не скрывать outliers без явной политики | Настройки продукта не доказывают наш isolated-spike contract |
| MLflow, S18 | Run provenance и experiment tracking | Seed/version/revision и источник должны быть видимы | Артефакты моделей не добавлены без данных |
| SageMaker/Lightning, S19–S22 | Early stopping по заданной objective/monitor/patience | UI показывает наблюдаемые факты, не даёт выдуманную научную команду STOP | Ray/ASHA страницы в старом аудите не были успешно перепроверены |
| TradingView, E05–E06 | Persistent tooltip, crosshair synchronization, разные уровни Canvas invalidation | Обновлять необходимый слой и согласовывать числовую координату, сохраняя реальные source rows | Финансовая time scale не заменяет numeric step; новая библиотека не устанавливалась |
| SciChart, E08 | Sorted-X fast paths, indexing/hit-test, batched updates | Порядок и индексы готовятся один раз, cursor не пересчитывает миллионный ряд | Не устанавливаем dataIsSorted по предположению и не используем vendor benchmarks как свои |

Дополнительно в текущем проходе повторно прочитаны исходные пользовательские ссылки: [W&B Experiment Tracking](https://wandb.ai/site/experiment-tracking/) и [Comet Single Experiment Page](https://www.comet.com/docs/v2/guides/comet-ui/experiment-management/single-experiment-page/). Из них берётся организация experiment workspace. Они не служат доказательством внутреннего устройства наших конкурентов или скорости Soup.

## 4. Выбор стека и рендера

Сохранён существующий проект: React, TypeScript, Vite, React Router, Arc UI Free и уже установленный Tailwind. Второй UI kit и повторная установка foundation не добавлялись. Реальные версии фиксируются в [build metadata](../reports/build-metadata.json), а не угадываются по документации latest.

Выбран uPlot 1.6.32 и небольшой собственный adapter. Причина — подходящая граница ответственности: подготовленный numeric-X render view поступает в renderer, а сам renderer не определяет истинность данных. Три metric panels имеют собственные экземпляры и собственные X-массивы. Синхронизация происходит по step, а не по индексу сокращённого массива. [Pinned uPlot](https://github.com/leeoniya/uPlot/tree/1.6.32), S27–S28.

Исследование ECharts исправило прежнее слишком широкое утверждение о progressive line rendering: в прочитанном LineSeries source progressive по умолчанию отключён. Это не утверждение обо всех типах серий ECharts. Сравнительный benchmark ECharts/Plotly/Highcharts/SciChart против Soup не проводился. Plotly WebGL-limit тезисы из старого непроверенного источника S24 не используются как аргумент выбора.

Обсуждавшиеся WebGL, OffscreenCanvas, SharedArrayBuffer и desynchronized canvas не включены автоматически. Они не устраняют ошибочную нормализацию, stale identity или дорогой HTML readout. Desynchronized — отдельная подсказка с ограничениями и возможными артефактами; её выигрыш в Soup не установлен. Материал Chrome E18 — источник гипотезы, не отчёт внедрения.

## 5. Данные и воспроизводимость

Источники реализации: [catalog](../src/data/catalog.ts), [generator](../src/data/generator.ts), [data contract](data-contract.md). Raw — четыре Float64Array; sourceIndex означает исходную позицию и не меняется после сортировки нормализованного доступа.

| Runs | Сценарии |
|---|---|
| R01–R05 | Clean convergence, slow convergence, noise, divergence, 1M loss spike |
| R06–R10 | NaN, +Infinity, −Infinity, identical duplicates, conflicting duplicates |
| R11–R15 | Unsorted steps, known gaps, zero loss, plateau, small LR |
| R16–R20 | Gradient spike, mixed per-metric problems, sparse cadence-unknown, singleton, stale snapshot |

R05 имеет seed 42 и 1 000 000 строк; единственный внесённый Loss spike: **sourceIndex 500001, step 500001, value 100**. R19 — одна строка. Остальные — по 8192. Дополнительные adversarial fixtures для отрицательного минимума, invalid X, NaN рядом со spike и массовой фрагментации используются в тестах отдельно от каталога.

Revision включает generator version, scenario/version, seed, rowCount и cadence. Timestamps обозначают источник snapshot, не время открытия страницы и не фиктивное обновление обучения. Execution status не тождествен data quality.

Manifest строится последовательно теми же generator/normalizer: один dataset обрабатывается, затем освобождается, сохраняются компактные descriptors/summaries/counts/domains. Overview не генерирует одновременно все raw datasets. Регенерация manifest сравнивается с сохранённым результатом.

Четыре миллионных Float64 element stores занимают **32 000 000 bytes**, около 30,52 MiB. Это только элементы raw columns, не память приложения. JSON.stringify превращает nonfinite numbers в null, поэтому raw сохраняются как typed data и передаются через structured clone/ограниченные source replies, а не через lossy JSON. S25, S42, S44.

## 6. Правдивость графика и нормализация

Pipeline: generation → validation → normalized groups → whole-run summaries/quality/segments → viewport selection → RenderView → uPlot. Source queries используют raw-derived структуру, не отрисованную линию.

- Invalid X остаётся в Inspector, но не становится координатой.
- Доступ упорядочен по step и sourceIndex; raw не переписывается.
- Equal finite duplicates получают детерминированного representative, но все members доступны.
- Conflicting finite values или finite/nonfinite mixture разрывают authoritative line; finite extrema сохраняются markers.
- All-invalid group не получает числовой line value.
- Конфликт Loss не инвалидирует LR автоматически.
- Gap объявляется только при известной cadence. Sparse cadence-unknown не называется потерей событий.
- Ноль сохраняется; исходный −0 доступен точно. NaN и ±Infinity не заменяются нулём.

Whole-run cards вычисляются из источника. Latest определяется по highest finite step group. Если latest invalid/conflicting, это основное состояние; более раннее finite значение подписывается своим step. Viewport facts и whole-run facts имеют разные scope.

Counts имеют единицы: raw observations, duplicate groups, дополнительные duplicate rows, конфликтующие metric groups и missing intervals. Их сумма не называется числом уникальных испорченных строк. Это особенно важно на Data quality и Dashboard.

Простая проверка displayedMax ≥100 недостаточна: выдуманный peak 101 тоже прошёл бы. Проверяется точное совпадение sourceIndex/step/value, равенство raw-window extrema, корректность порядка и отсутствие spike в окне, исключающем его.

## 7. Sampler, точный индекс и ограничения

Для включительного [a,b] проверяются конечность границ и span, порядок и положительная ширина. Binary search задаёт group bounds. B = clamp(floor(plotWidthCssPx), 1, 2048). В каждой паре bucket × valid segment сохраняются first/min/max/last с исходными координатами, selections дедуплицируются и упорядочиваются.

Новый zoom снова обращается к raw-derived структуре. Сокращение прежнего render array не является источником для следующего zoom. Вблизи возвращаются все допустимые исходные точки окна. Single-step query получает только axis padding, без второго выдуманного измерения.

Гарантия относится к каждой паре run/metric: точное происхождение finite points, сохранение visible finite extrema и независимой topology. Не обещается сохранение каждого локального колебания.

Три режима не смешиваются:

| Режим | Смысл |
|---|---|
| Correct scan | Простой, allocation-heavy reference scanner |
| Correct stream | Та же семантика с потоковыми accumulators |
| Exact indexed | Дополнительное ускорение eligible metrics |

Every-N и mean-as-source — намеренно неправильные negative controls, а не performance baseline.

Индекс реализован после фактического превышения zoom budget scanner-режимом. В нём 256-group outer blocks, 16-group micro summaries и точная обработка частичных границ. Узел, выходящий за границу окна/bucket, не используется целиком. Метрики с invalid/conflict/known-gap topology консервативно используют прежний stream scanner; другие метрики того же run могут индексироваться независимо. Дополнительный индекс R05 занимает **1 696 608 bytes**, его build time включён в cold.

При превышении 16 384 render/topology elements на run/metric применяется явно обозначенный disconnected-extrema overview: extrema markers без выдуманной соединяющей линии, quality counts и source drill-down. Это ограниченное представление сложной topology, а не обещание lossless rendering произвольного миллиона разрывов.

## 8. Worker, память и асинхронная корректность

Один module Worker обслуживает active workspace: один run либо до четырёх Compare members. Datasets создаются последовательно; при замене workspace старый Worker завершается. Глобального raw cache всех 20 runs нет.

Workspace/session identity включают runId, revision, монотонные activation/workspace epochs и selectionKey. View, hover, inspect и pages имеют свои sequences. Success и error принимаются только для соответствующей актуальной операции. Same-revision A→B→A защищён epoch, а не только runId.

Очередь ограничивает dispatch: не более одного in-flight и одного pending, новое view-намерение заменяет pending; hover не вытесняет view или явную инспекцию. Abort экономит работу, guards обеспечивают корректность даже после late reply.

Raw buffers не попадают в transfer list. Передаются отдельные disposable render buffers. Отдельно проверяется, что после передачи Inspector всё ещё возвращает исходный spike. Ограниченные source pages содержат до 50 строк; duplicate groups имеют total и pagination.

Добавлен bounded exact-source cursor cache: до 8192 target steps и до 16 384 уникальных SourceRows на active workspace. Он готовится Worker после accepted view, сохраняет source identities/nonfinite values и сбрасывается при смене view/revision. Cache hit допускается только при idle controller и совпадающих epochs/members/accepted view. Промах использует обычный Worker query.

Cursor targets соответствуют физическим display pixels и critical marker steps. Это разрешение указателя, не округление исходных метрик. Inspector продолжает принимать произвольный точный sourceIndex/step. Замеры показывают accepted hover менее миллисекунды, но это не подменяет pointer-to-frame latency.

## 9. Compare и синхронизация

Каждая серия каждой метрики сначала сокращается независимо. Затем объединяются только небольшие render X. Чужой alignment slot — undefined; настоящее invalid/gap event — null/explicit break metadata. Превращение всех foreign slots в null даёт ложные разрывы.

Alignment подготовлен в Worker; main thread проверяет sorted X, source equality, signed zero, отсутствие пропущенных/выдуманных points, topology и byte accounting. Полные raw X всех members не объединяются на main thread. Общая Y-шкала действует внутри метрики, а не между Loss и LR.

Numeric cursor запрашивает отдельную исходную строку каждого run. При несовпадающих steps показываются фактический recorded step и Δstep. Отсутствующая запись не интерполируется и не отображается нулём.

В последней проверенной реализации одна постоянная source table показывает Run, Recorded step, Loss, Learning rate, Gradient norm, Δstep и Source/Pin. При All metrics такая же общая модель readout применяется и для одного run. Поля не анимируются промежуточными числами. Duplicate groups могут показать первые две исходные observations; остальная группа достигается через revision-qualified Inspector. Pin разрешается по последнему принятому source snapshot, не по устаревшему closure.

URL хранит выбранные IDs. Пустой selection, один промежуточный member, unknown IDs, превышение лимита и ошибка участника сравнения имеют явные состояния. Неполное сравнение не выглядит полным success.

## 10. UX, дизайн и изменения требований

Исходные визуальные материалы: [локальные references](../assets/references/), [Dribbble Dashboard Design Interface](https://dribbble.com/shots/18538171-Dashboard-Design-Interface), W&B и Comet. В локальном наборе сохранены light/dark Runs, Run detail и Compare. Это визуальные основания; они не устанавливают корректность данных.

Из Dribbble изучались композиция аналитической области, круговая карта, компактные блоки и список находок. Нельзя переносить декоративный размер сектора как выдуманный scientific quality score. Последующий принятый Dashboard redesign изменил начальный план: по умолчанию открывается focused monitor, Map и Groups доступны как локальные views. Актуальная карта группирует model/method/runs, явно подписывает finite-count encoding и имеет текстовую альтернативу. Историческая идея трёх quality rings не описывается как единственная финальная реализация. См. [отчёт redesign](dashboard-redesign-results.md).

По пользовательским замечаниям проверялись и исправлялись:

- интерактивность map sectors, выбранный run/metric и рабочие переходы к источнику;
- wheel/pinch/pan/drag плюс доступные numeric controls;
- различие preview selection и Compare checkboxes;
- акцент на выбранной Compare series без удаления остальных данных;
- постоянное место source coordinates вместо внезапного сдвига контента;
- объяснение, почему finite spike 100 сжимает значения около 0,2 к baseline на линейной шкале;
- отдельное объяснение NaN/Infinity как реальных разрывов;
- clean snapshot, filtered no-results и пустая ledger page как разные состояния;
- accepted-query empty/error Inspector, промежуточные ширины Preview, точная zoom-подсказка и понятные issue names.

Использовался Impeccable v4.6.0. Обновление пользователь отложил на другой сеанс. Результат skill/hook — вспомогательное ревью, не сертификат дизайна, контраста или отсутствия ошибок. Визуальные изменения других агентов не откатывались; основной Dashboard был принят пользователем для финальной проверки.

## 11. Методика performance-исследования

Окружение финальных сравнений: Windows 11 build 26200, AMD Ryzen 7 8845HS, Node 24.22.1, Chromium 158.0.8127.18, viewport 1440×900 CSS px, DPR 1. Main renderer получает CPU rate 4. Worker targets отдельно получают команду throttling, но сообщают unsupported; preprocessing Worker не называется доказанно замедленным в четыре раза.

На вариант: пять cold contexts в одном browser process; OS caches не очищаются. Два warmups, затем 30 range/hover pairs отдельно для detail и Compare с R05 плюс тремя малыми runs. Последовательность: overview, spike window, reset, excluded-spike, single-step, шесть повторов. Compare activation — отдельный warm SPA interval, не ещё одна cold sample. Forced GC не применяется.

Nearest-rank p95: sorted[ceil(N×0,95)−1]. Для пяти cold samples p95 — максимум. Сохраняются все samples, source/harness/lock/build identities и sourceUnchanged. Последовательные прогоны на общей машине не являются randomized causal study; разброс не приписывается автоматически одной CSS-правке.

Endpoints:

- cold — navigation до трёх accepted/drawn panels и двух RAF;
- zoom — view-start до chart-draw hook;
- accepted hover — начало source query до принятия observations;
- DOM commit — до обновления source DOM;
- основной hover — browser pointer timestamp до актуального committed source DOM и двух RAF callbacks с identity guards.

Два RAF подтверждают rendering opportunity, не момент физического появления пикселя на мониторе. Canvas pixel assertions и Chrome rendering/paint evidence — отдельные уровни. Playwright test trace не выдаётся за Chrome Performance trace.

Full recording содержит Chrome trace со screenshots и начинается до измеряемого действия. No-recording latency — отдельный режим PERF_TRACE=off; он не выдаётся за trace run. Режимы не объединяются в один sample set и не подменяют друг друга.

Для корректного before/after предыдущий commit 9206963 собран в изолированной копии с теми же установленными dependencies и текущим harness. Это не притворяется точными bytes старого deployed build. Два full-trace after/confirmation и no-trace run имеют один application source hash. Проверка сопоставимости сохранена в [latency comparison](../reports/perf-targets-2026-11-10/latency-comparison.json).

## 12. Что оптимизировали и что не сработало

| Исследование / изменение | Что установлено | Статус |
|---|---|---|
| Scan → stream → exact index | Устранение allocation-heavy scan недостаточно для overview; exact index ускоряет eligible metrics | Реализовано, differential tests |
| Formatter construction | Старый profile фиксировал тысячи Intl.NumberFormat constructions; bounded cache убирает их после warmup | Реализовано; profile отдельно от benchmark |
| React cursor propagation | Hover вызывал лишнюю работу owner/chart trees | Изолированный cursor store и imperative subscriptions |
| Immutable Compare summaries | Whole-run facts не должны пересчитываться при zoom | Memoized component; regression test |
| Persistent source DOM | Перестроение leaf DOM на каждом zoom теряло node/focus identity и добавляло работу | Сохраняются nodes, callbacks читают latest accepted view |
| Cursor enter/leave state | Первый hover мог делать React commit даже при дешёвом settled hover | Marker visibility вынесена в отдельную подписку |
| Whole-document layout | Chrome trace показал document-wide layout на смене source text | Genuine red → fixed footprint/containment → green |
| Только containment observations | Не устранил parent/document layout | Недостаточная попытка сохранена |
| Dirty overlay rectangles | Полный clearRect заменён очисткой областей старых markers | Реализовано; <5% canvas clear regression |
| Native uPlot dataIdx | Скрытые legend/hover dots не требуют scan foreign alignment slots | dataIdx отключён для этого назначения; raw cursor независим |
| Muting native mousemove | Диагностика: native handler p95 около 1,1 мс; muted 42,9 против native 42,6 мс | Выигрыш не установлен, native crosshair/drag сохранены |
| Exact source prewarm | Worker lookup уже не основной hover bottleneck; warmed source hit субмиллисекундный | Bounded cache, fallback и guards |
| Worker alignment | Удалено повторное union/sort на main thread | Реализовано с проверкой provenance |
| Raw pointer input | В отдельном empty-page probe raw event dispatch p95 1,2 мс против pointermove 18,3 мс | Ранний input с fallback; не объявляется таким же ускорением всего UI |
| Общая source table | Убрано троекратное повторение run metadata и действий; все raw metrics сохранены | Реализовано для All metrics; browser/source equality tests |
| Fixed table columns | Genuine failure обнаружил около 30 px сдвига колонок placeholder→measurement | Fixed table layout и устойчивые widths; green |
| Source key caching | При той же строке повторно менялись attrs/formatting; MutationObserver видел около 60 лишних writes | Key run/revision/sourceIndex, условные DOM writes |
| Range controls feedback | Background/box-shadow transitions и меняющиеся press rectangles добавляли frame work | Узкая правка numeric controls; не глобальное отключение motion |
| Offscreen work | Невидимым chart overlays не нужна постоянная отрисовка source dots | IntersectionObserver с отрисовкой latest snapshot при появлении; cleanup |
| Tailwind source discovery | Сторонний report HTML менял production CSS | Явный app source scope; genuine before mismatch/after equal hashes |
| Trace observer overhead | Full/timeline/off дают разные latency даже на том же приложении | Отдельная диагностика; режим всегда подписан |
| Desynchronized / WebGL / ещё один Worker | Рассматривались как гипотезы | Не объявляются внедрёнными или измеренно полезными |

Основной урок: устранённая причина не гарантирует монотонное улучшение каждого общего p95. Dirty/layers/contained/persistent варианты иногда регрессировали. Их outputs сохранены, а не заменены лучшими samples. Нельзя складывать p95 отдельных этапов, вычитать их как точный critical path либо выдавать 0,4 мс accepted response за видимый hover.

Отдельный mobile duplicate-comparison timeout после одной правки не был проигнорирован. Дальнейшие проверки учитывают, что общий readout появляется один раз, сохраняет следующую metric position и доступен через внутренний scroll. Итоговый общий browser suite, приведённый ниже, прошёл; промежуточные failures остаются доступными.

## 13. Правдивость тестов и сохранённые failures

Исторический standalone Node witness: 25/25 correct; every-N 11 pass /14 fail; mean 12/13; старый v2 sampler 23/2 на расширенной suite. Это маленькое самостоятельное доказательство чувствительности oracle, а не browser acceptance финального UI. [Manifest](evidence/witness-manifest.json).

В приложении проверяются независимые raw-window/bucket/segment oracles, extrema provenance, границы/дробные ширины, singleton, negative minimum, signed zero, NaN-adjacent segments, conflicts, invalid X, source immutability, pagination и topology cap. Index сравнивается с correct scanner, а не только с собственным ожидаемым output.

Negative controls приложения: every-N, mean-as-source, fabricated peak, bridged gap, stale-response acceptance и suppressed drawing. Runners требуют ожидаемые named assertion failures и reject неожиданные crashes/skips. В [final Canvas manifest](../reports/perf-targets-2026-11-10/final-canvas/manifest.json) normal mode завершился exit 0, suppress — exit 1; оба приняты runner именно как ожидаемые результаты.

Async cases включают A→B→C, same-revision A→B→A, revision replacement, два zoom, resize во время zoom, старый hover, late error после нового success, abort/unmount, изменение Compare members. Deferred gates определяют порядок намеренно, случайная задержка не служит единственным тестом race.

Совпадение массива с oracle не доказывает пиксель. Поэтому отдельно проверяются реальный Canvas spike, gaps, clipping, singleton/conflict markers, DPR, theme/focus, exact source Pin и deliberate suppressed-drawing FAIL.

Факты последнего прочитанного полного набора: **106/106 unit tests, 113/113 browser tests, 0 unexpected, 0 skipped, 0 flaky**. Эти числа относятся к конкретному source/build snapshot; добавление нового файла research не превращает старые hashes в новые. Исторические totals 25, 81, 94 и 99 не суммируются с ними.

## 14. Исследование памяти

Разделены четыре scope:

1. Raw Float64 element storage.
2. Ledger уникальных typed backing buffers raw + normalized + index.
3. JS heap/backing storage конкретного target/isolate.
4. Windows private committed и working set page renderer + dedicated Workers, сопоставленных по собственным trace PID markers.

JS heap или raw ledger не называются всей памятью вкладки. Общие GPU/browser/utility процессы показываются отдельно и не присваиваются целиком странице. Working set sums могут повторно учитывать shared pages; замеры последовательные, не атомарные. Forced GC в основном протоколе отсутствует. S31–S36.

Для R05 raw = 32 000 000 bytes. Индексированный typed allocation ledger = 76 696 612 bytes **включая raw**, дополнительно индекс = 1 696 608 bytes уже внутри ledger. Эти числа нельзя прибавлять к OS footprint как независимые расходы.

Финальные process counters приведены в автоматически собранных таблицах ниже. Важно: после 20 SPA transitions footprint заметно выше initial settled. Один live Worker и три charts в settled state не доказывают отсутствие удержанных allocations или leak. Нельзя объявлять рост без forced GC доказательством leak, но и называть его полностью объяснённым нельзя. Для дальнейшего исследования нужны heap/retainer snapshots, repeated lifecycle, одинаковая GC policy и анализ retiring isolates. Прежние failed PID/dump attempts сохраняются.

## 15. Accessibility, контраст, locale и lifecycle

Проверяются пять экранов при 320/768/1440 CSS px, обе темы, keyboard flow и DPR 2. Возможность source inspection/range control не зависит от hover или drag. Таблицы прокручиваются внутри контейнера, вся страница не должна получать horizontal overflow. Themes/reduced motion сохраняют значение данных.

Первоначально сохранено 516 axe color-contrast incomplete occurrences. Их индивидуальный replay с original/text-masked screenshots проверил фактический background под glyphs, computed foreground/opacity и clipping geometry. Это assistant-run pixel review, не сертификат WCAG и не human screen-reader test.

После изменения UI финальный audit содержит **30 audits, 0 violations и 528 color-contrast incomplete occurrences**. Новые 528 проверены отдельно; старые 516 не выдаются за покрытие новых targets. Автоматические incomplete результаты не удалены и не переименованы в автоматические passes. Actual Canvas series pixels и SVG text contrast проверяются отдельно от DOM axe. Первичные нормативные основания — S39–S40; ограничения инструментов — S30/S41.

Locale/timezone: en-US, de-DE, ru-RU; numeric step не timestamp; UTC, Asia/Qyzylorda и America/Los_Angeles/DST проверяются отдельно. Small LR отображается научной записью, а не ложным нулём. Локализованные строки не участвуют в вычислениях. Исходный timestamp и timezone подписываются.

StrictMode, repeated mounting, zero-size→visible, cleanup chart/ResizeObserver/IntersectionObserver/listeners/RAF/Workers — отдельные lifecycle cases. В сохранённом runtime report после 20 transitions settled counts составляют один Worker/три charts; после context close наблюдается ноль Workers. Это ограниченная проверка lifecycle, не математическое доказательство leak freedom.

Human NVDA/VoiceOver и реальная проверка каждого физического touchpad/browser/device не записаны как выполненные. Playwright прямо рекомендует сочетать automated и manual accessibility testing; Lighthouse accessibility 100 не равен полной доступности.

## 16. Доставка проверенной сборки

Production build проверяется отдельно от dev server. Module Worker должен быть корректно собран отдельным asset chunk; прямая загрузка SPA routes требует routing fallback. Missing JS/CSS/Worker asset должен получать 404, а не index.html под видом JavaScript. [Vite deploy](https://vite.dev/guide/static-deploy.html), [Vite Workers](https://vite.dev/guide/features.html#web-workers), [Vercel Vite SPA](https://vercel.com/docs/frameworks/frontend/vite).

Исследованный release risk: remote rebuild может дать другие bundle/CSS hashes, чем локально проверенная сборка. Используется подготовка Vercel Build Output и prebuilt deployment проверенного dist; отдельный verifier сравнивает полученные HTML/JS/CSS/Worker bytes с локальными SHA256.

Проверяются direct load/reload всех пяти routes, Compare query parameters, unknown route/run, Worker и missing assets, source spike и реально нарисованный Canvas. Ссылка на приложение сама по себе не доказывает, что опубликован текущий исходный код.

Пользователь выбрал [Feruum/SoupTask](https://github.com/Feruum/SoupTask) и отдельный [soup-training-monitor](https://soup-training-monitor.vercel.app). Из этого research не следует, что последние docs уже committed/pushed или что последняя публикация состоялась: это устанавливается текущим deployment manifest и release smoke, а не самим текстом.

## 17. Выводы, открытые вопросы и AI disclosure

Что установлено:

- Правдивость — совокупность raw provenance, выбора точек, topology, summaries, async identity и фактического изображения.
- Retaining raw, preserving extrema и visual visibility — три разных гарантии.
- Ускорение Worker lookup ниже миллисекунды не решает автоматически input-to-frame latency.
- Постоянный небольшой DOM, условные updates и ограниченная layout geometry оказались практичнее дальнейшего ускорения уже дешёвого hover query.
- Точный индекс полезен для eligible metrics; сложная topology нуждается в консервативном fallback.
- Правильное before/after сохраняет корректность и условия; wrong sampler не может быть baseline успешной оптимизации.
- Нужны genuine red controls: правильный массив не защищает от отключённого Canvas, а Abort не заменяет stale guards.
- Цифры trace/no-trace и scope памяти должны оставаться различимыми.

Что нас удивило: unrelated report HTML менял CSS build; enter/leave cursor вызывал React work при уже дешёвом settled hover; text/attribute changes и control transitions влияли на frame timing сильнее, чем точный source lookup; одинаковое название «полные данные» у разных продуктов относится к разным представлениям.

Что остаётся ограничением: рост process footprint после переходов; Worker CPU4 unsupported; shared-machine variability; нет universal viewport/browser/device proof; 2 RAF не равны physical presentation; сохранение каждого колебания не гарантируется; научная достоверность source logger и решение о STOP не подтверждаются frontend-тестами. 5M browser execution не выполнен; арифметика raw storage 160 000 000 bytes не является performance approval.

Невнедрённые предложения не превращаются в выполненную работу: дополнительное подавление одинаковых Canvas markers, spatial hit-test cache, иной renderer и desynchronized остаются вариантами только при измеренной необходимости. Диагностически muted native cursor не shipped. Нельзя удалять проверки source/async или менять endpoint ради прохождения потолка.

AI assistance фактически использовалась для исследования источников, предложений архитектуры и UI, реализации, тестов, browser automation, интерпретации профилей и документации. Предложения проверялись независимыми raw oracles, actual browser/Canvas checks и negative controls. Исправлялись непроверенные release claims, неверные performance сравнения, источник CSS nondeterminism и переоценка scope памяти. Human-only review не приписывается AI-инструментам. Итоговая оценка задания и universal 100/100 не заявляются.

## 18. Реестр артефактов и воспроизведение

| Область | Основные входы |
|---|---|
| ТЗ | [Original PDF](Soup-Task-05-Frontend-Engineer%281%29.pdf) |
| История решений | [research](research.md), [architecture](architecture.md), [review](review.md), [source audit](evidence/source-audit.json), [selective source check](evidence/source-checks-v2.1.json) |
| Данные / правильность | [data contract](data-contract.md), src/data, src/core, src/sampling и их tests |
| Async / ownership | src/worker, controlled tests, [async negative manifest](../reports/async-negative/manifest.json) |
| Canvas controls | [final Canvas manifest](../reports/perf-targets-2026-11-10/final-canvas/manifest.json) |
| Полная приёмка | [unit](../reports/perf-targets-2026-11-10/final-unit.json), [browser](../reports/perf-targets-2026-11-10/final-browser/results.json) |
| Сопоставимый benchmark | [latency comparison](../reports/perf-targets-2026-11-10/latency-comparison.json), [full trace confirmation](../reports/perf-targets-2026-11-10/final-trace-performance/results.json), [no recording](../reports/perf-targets-2026-11-10/final-latency-performance/results.json) |
| Память / lifecycle | [final memory](../reports/perf-targets-2026-11-10/final-memory/results.json), [runtime contrast/lifecycle](../reports/perf-targets-2026-11-10/final-runtime/runtime-contrast.json) |
| Доступность | [final axe](../reports/perf-targets-2026-11-10/final-a11y-summary.json), [528 review summary](../reports/perf-targets-2026-11-10/final-contrast/summary.json), [ledger](../reports/perf-targets-2026-11-10/final-contrast/ledger.json) |
| Lighthouse | [five-screen summary](../reports/perf-targets-2026-11-10/final-lighthouse/summary.json) |
| Source/build provenance | [build metadata](../reports/build-metadata.json), [measurement inputs](../reports/measurement-sources/manifest.json) |
| Доставка | scripts/prepare-vercel-output.mjs, scripts/deployed-smoke.mjs, scripts/verify-deployment-build.mjs, [deployment manifest](../reports/deployment.json) |

Базовые команды — npm run build, npm run lint, npm test, npm run data:check. Browser suite использует production preview и сохранённую конфигурацию с source/build metadata. Для измерений scripts/performance.mjs принимает свежий PERF_OUT, PERF_MODES=indexed и явный PERF_TRACE=full/off. Completed evidence не перезаписывается. Для memory/runtime/contrast/Lighthouse имеются отдельные scripts и output variables; тяжёлые jobs выполняются последовательно. Исторический witness воспроизводится node docs/evidence/run-witness.mjs и остаётся отдельным классом доказательств.

Следующий раздел автоматически составлен из сохранённых JSON на момент подготовки research. Он не запускает benchmark повторно. Машинный спутник [research evidence snapshot](research-complete-2026-11-10.evidence.json) сохраняет прочитанные inputs, hashes, версии и статусы источников.

## 19. Результаты и полная библиография


### 19.1. Идентичность проверенного приложения

- App commit из build metadata: **41ae67f48be6364f719ba38ad71d694c8ae484fe**.
- Build metadata sourceHash: **68b68de6f774bf3624dffc7257711bbd6655d3dc7875f7fbdfb195959a8ae5aa**.
- Build metadata buildHash: **5a3fe0fd9d66886ff8d35a2141aaeb31c28a7f153c2fcc4142d80971b9ae735a**.
- Performance source hash after/confirmation/no-trace: **6505f89edb981ae63759ba1b564cba5422c6c6ec081f04f4b56f7adf613e9d38**.

Эти source hashes вычислены разными описанными scripts алгоритмами; их несовпадение между build-metadata и benchmark не означает само по себе разные исходники. Прямая сопоставимость performance variants проверена отдельным comparison manifest. В Git после добавления документа может появиться новый documentation commit без изменения app source.

### 19.2. Контролируемое before/after, p95, мс

| Прогон | Cold | Zoom run | Hover run | Compare zoom | Compare hover |
|---|---:|---:|---:|---:|---:|
| Previous committed source, full trace | 2493,6 | 149,6 | 88,5 | 214,7 | 107,5 |
| Optimized, full trace | 2279,9 | 106,8 | 40,6 | 123,2 | 48,6 |
| Same optimized source, full trace confirmation | 2531,9 | 114,8 | 35,5 | 131,4 | 40,0 |
| Same optimized source, no continuous trace | 2518,9 | 113,3 | 37,0 | 107,6 | 40,7 |

Targets сравниваются с худшим p95 двух отдельно сохранённых full-trace after/confirmation runs, без pooling. Все пять проходят в этом сохранённом эксперименте. No-recording приведён отдельно.

| Target | Лимит, мс | Худший full-trace after/confirmation p95 |
|---|---:|---:|
| cold | 3000,0 | 2531,9 |
| zoom | 200,0 | 114,8 |
| hover | 50,0 | 40,6 |
| compareZoom | 200,0 | 131,4 |
| compareHover | 50,0 | 48,6 |

Для confirmation относительно before: hover run 59.9% меньше, Compare hover 62.8% меньше, Compare zoom 38.8% меньше. Cold в confirmation на 1.5% выше baseline: не заявляем улучшение всех метрик. Это описательная разница конкретных последовательных прогонов, не оценка причинного эффекта каждой отдельной правки.

### 19.3. Все сохранённые промежуточные indexed прогоны

Здесь есть разные app revisions, условия записи и deliberately earlier baselines. Таблица — журнал, не единый контролируемый benchmark. Old historical default означал full tracing в той версии harness. Полные hashes, environments и исходные samples доступны по ссылкам и в JSON-спутнике.

| Report | Trace | Cold | Zoom run | Hover run | Compare zoom | Compare hover |
|---|---|---:|---:|---:|---:|---:|
| [before-latency-performance](../reports/perf-targets-2026-11-10/before-latency-performance/results.json) | off | 2960,1 | 181,9 | 86,6 | 230,2 | 115,6 |
| [before-trace-performance](../reports/perf-targets-2026-11-10/before-trace-performance/results.json) | full | 2493,6 | 149,6 | 88,5 | 214,7 | 107,5 |
| [cached-aligned-performance](../reports/perf-targets-2026-11-10/cached-aligned-performance/results.json) | full (historical default) | 3039,8 | 211,1 | 64,9 | 202,7 | 71,3 |
| [confirmation-latency-performance](../reports/perf-targets-2026-11-10/confirmation-latency-performance/results.json) | off | 2829,7 | 150,5 | 42,4 | 129,7 | 41,2 |
| [contained-performance](../reports/perf-targets-2026-11-10/contained-performance/results.json) | full (historical default) | 2774,3 | 204,8 | 69,3 | 249,7 | 90,1 |
| [dirty-performance](../reports/perf-targets-2026-11-10/dirty-performance/results.json) | full (historical default) | 3068,0 | 240,3 | 104,1 | 334,8 | 151,4 |
| [final-latency-performance](../reports/perf-targets-2026-11-10/final-latency-performance/results.json) | off | 2518,9 | 113,3 | 37,0 | 107,6 | 40,7 |
| [final-trace-performance](../reports/perf-targets-2026-11-10/final-trace-performance/results.json) | full | 2531,9 | 114,8 | 35,5 | 131,4 | 40,0 |
| [fixed-columns-latency-performance](../reports/perf-targets-2026-11-10/fixed-columns-latency-performance/results.json) | off | 2884,1 | 149,8 | 52,2 | 177,7 | 52,9 |
| [immediate-latency-performance](../reports/perf-targets-2026-11-10/immediate-latency-performance/results.json) | off | 2830,9 | 142,6 | 49,8 | 146,0 | 45,5 |
| [immediate-performance](../reports/perf-targets-2026-11-10/immediate-performance/results.json) | full | 2502,0 | 138,7 | 52,4 | 152,5 | 55,7 |
| [imperative-performance](../reports/perf-targets-2026-11-10/imperative-performance/results.json) | full (historical default) | 2817,0 | 161,8 | 76,6 | 279,3 | 134,1 |
| [isolation-performance](../reports/perf-targets-2026-11-10/isolation-performance/results.json) | full (historical default) | 3109,1 | 211,0 | 95,2 | 303,7 | 149,6 |
| [latency-performance](../reports/perf-targets-2026-11-10/latency-performance/results.json) | off | 2854,7 | 168,4 | 50,0 | 190,1 | 63,2 |
| [layers-performance](../reports/perf-targets-2026-11-10/layers-performance/results.json) | full (historical default) | 2598,5 | 180,5 | 85,3 | 270,4 | 125,8 |
| [one-row-performance](../reports/perf-targets-2026-11-10/one-row-performance/results.json) | full | 2279,9 | 106,8 | 40,6 | 123,2 | 48,6 |
| [persistent-performance](../reports/perf-targets-2026-11-10/persistent-performance/results.json) | full (historical default) | 3320,5 | 188,6 | 66,4 | 240,1 | 97,6 |
| [prearmed-performance](../reports/perf-targets-2026-11-10/prearmed-performance/results.json) | full (historical default) | 2419,6 | 185,2 | 58,9 | 194,8 | 80,8 |
| [raw-input-performance](../reports/perf-targets-2026-11-10/raw-input-performance/results.json) | full (historical default) | 2650,6 | 173,5 | 56,3 | 256,0 | 86,9 |
| [shared-latency-performance](../reports/perf-targets-2026-11-10/shared-latency-performance/results.json) | off | 2845,3 | 167,4 | 48,2 | 157,1 | 50,3 |
| [stationary-latency-performance](../reports/perf-targets-2026-11-10/stationary-latency-performance/results.json) | off | 2836,3 | 143,8 | 47,9 | 175,2 | 63,1 |
| [unchanged-latency-performance](../reports/perf-targets-2026-11-10/unchanged-latency-performance/results.json) | off | 2912,8 | 174,6 | 59,3 | 167,4 | 53,5 |
| [visible-cursor-performance](../reports/perf-targets-2026-11-10/visible-cursor-performance/results.json) | full | 3044,8 | 159,7 | 65,0 | 163,0 | 59,1 |
| [visible-latency-performance](../reports/perf-targets-2026-11-10/visible-latency-performance/results.json) | off | 2823,8 | 155,5 | 45,6 | 182,3 | 59,2 |

### 19.4. Полная приёмка, контраст, память и Lighthouse

- Unit: **106/106**, failed **0**.
- Browser: **113 passed**, unexpected **0**, skipped **0**, flaky **0**.
- Axe: **30 audits**, violations **0**, incomplete **{'color-contrast': 528}**.
- Final individual contrast review: **528** occurrences; dispositions **{'verified-text': 528}**; minimum verified glyph-background contrast **5.096:1**.
- Final lifecycle after context close: **0** observed live Workers.

| Memory checkpoint | Private committed, MiB | Working set, MiB | Raw bytes |
|---|---:|---:|---:|
| 1M-settled | 145.87 | 245.63 | 32000000 |
| 1M-after-20-SPA-switches | 319.47 | 588.73 | 32000000 |
| Compare-1M-plus-three | 295.76 | 448.29 | 32786432 |

Process footprint scopes и ограничения описаны в §14. Три строки не являются сопоставимыми repeated samples одной нагрузки; не выводим из них total tab/GPU memory или отсутствие leak.

| Lighthouse screen | Performance | Accessibility | Best practices |
|---|---:|---:|---:|
| dashboard | 94 | 100 | 100 |
| runs | 97 | 100 | 100 |
| run-detail | 97 | 100 | 100 |
| compare | 95 | 100 | 100 |
| quality | 98 | 100 | 100 |

Lighthouse использует свой desktop simulation protocol. Его scores не подменяют CPU4 traces, keyboard/Canvas review или проверку всех требований PDF.

### 19.5. Полный исходный реестр S01–S45

Статусы ниже унаследованы из source audit / selective v2.1 review. Сохранены частично подтверждённые, vendor и не перепроверенные записи. Ссылка в библиографии сама по себе не делает утверждение подтверждённым.

| ID | Источник | Статус | Что разрешено заключать |
|---|---|---|---|
| S01 | [Neptune — Smoothing and rendering/downsampling](https://docs.neptune.ai/smoothing) | confirmed | Подтверждено агрегирование mean + min/max и детализация при zoom; в источнике также есть интерполяция пустых интервалов. |
| S02 | [Neptune — Min/Max error bands](https://docs.neptune.ai/error_bands) | confirmed | Min/max-полоса показывает наблюдаемый диапазон; это не доверительный интервал. |
| S03 | [W&B Server releases (Full Fidelity Band/Line and bug fixes)](https://github.com/wandb/server/releases) | partial | Страница релизов и поисковые фрагменты расходились. Точная связка 0.84 / август 2026 убрана; отсутствие релиза не утверждается. |
| S04 | [W&B Models full-fidelity feature](https://site.wandb.ai/models/) | vendor_claim | Видимость spikes в Full Fidelity — заявление производителя, не независимая проверка и не описание внутреннего алгоритма. |
| S05 | [W&B — Missing chart datapoints issue and full-fidelity response](https://github.com/wandb/wandb/issues/4177) | historical | Исторический issue и ответ сопровождающего, не доказательство текущего бага всех версий. |
| S06 | [Comet — Total fidelity metrics](https://www.comet.com/docs/v2/guides/experiment-management/total-fidelity/) | confirmed | Полная история в сжатом CSV и sampled-данные встроенных графиков — разные представления. |
| S07 | [Comet — Limits and performance](https://www.comet.com/docs/v2/guides/experiment-management/limits-and-performance/) | confirmed | В открытой документации указан порог 15 000 значений на метрику эксперимента до downsampling; это не вечный лимит всех конфигураций. |
| S08 | [Comet — Metrics logging and reservoir sampling](https://www.comet.com/docs/v2/guides/experiment-management/log-data/metrics-and-parameters/) | confirmed | Описаны reservoir sampling и возможность настройки в on-premises установках. |
| S09 | [TensorBoard — HTTP API and reservoir sampling](https://github.com/tensorflow/tensorboard/blob/master/tensorboard/http_api.md) | confirmed | HTTP API допускает reservoir sampling и сохраняет последнее значение. Это не утверждение обо всех современных рендерах TensorBoard. |
| S10 | [ClearML — Scalar charts, data zoom and Show Originals](https://github.com/clearml/clearml-docs/blob/main/docs/webapp/webapp_exp_track_visual.md) | official_replacement | Сайт не удалось прочитать; использован официальный репозиторий документации. Подтверждены smoothing / Show Originals / семантика X. |
| S11 | [Grafana — Query options and Max data points](https://grafana.com/docs/grafana/latest/visualizations/panels-visualizations/query-transform-data/) | confirmed | Max data points связан с шириной панели; конкретная агрегация зависит от источника данных. |
| S12 | [Grafana — Time-series null/gap/axis behavior](https://grafana.com/docs/grafana/latest/visualizations/panels-visualizations/visualizations/time-series/) | confirmed | Описаны настройки null-разрывов и осей. Наличие настройки не гарантирует корректный default. |
| S13 | [Datadog — Rollup aggregators](https://raw.githubusercontent.com/DataDog/documentation/master/content/en/dashboards/functions/rollup.md) | official_replacement | Ответ сайта не прочитался; официальный Markdown подтверждает avg/min/max rollup. |
| S14 | [Datadog — Metric monitors and max thresholds](https://docs.datadoghq.com/monitors/types/metric/) | unverified | Страница metric monitor в этом проходе не прочитана. Точное утверждение о срабатывании monitor не включено как подтверждённое. |
| S15 | [Highcharts Stock — Data grouping](https://www.highcharts.com/docs/stock/data-grouping) | confirmed | Подтверждены группировка по ширине и настраиваемая аппроксимация. |
| S16 | [Highcharts — Grouping approximation options](https://api.highcharts.com/highstock/series.line.dataGrouping.approximation) | official_replacement | Исходная spline-страница не прочиталась; открыта официальная страница approximation для line-series. |
| S17 | [Aim — Metrics Explorer](https://aimstack.readthedocs.io/en/latest/ui/pages/explorers.html) | confirmed | Подтверждены сравнение, агрегация и настройки выбросов; сохранение spike конкретным renderer не доказано. |
| S18 | [MLflow — Tracking](https://mlflow.org/docs/latest/ml/tracking/) | confirmed | Подтверждено происхождение экспериментов; гарантия отрисовки одиночного spike не установлена. |
| S19 | [AWS SageMaker — Stop training jobs early](https://docs.aws.amazon.com/sagemaker/latest/dg/automatic-model-tuning-early-stopping.html) | confirmed | Early stopping относится к tuning trials и заданной objective, а не к любому одиночному скачку loss. |
| S20 | [AWS SageMaker — Tuning completion criteria](https://docs.aws.amazon.com/sagemaker/latest/dg/automatic-model-tuning-progress.html) | confirmed | Критерии завершения tuning подтверждены, но находятся вне scope frontend. |
| S21 | [Ray Tune — ASHA and early stopping](https://docs.ray.io/en/latest/tune/getting-started.html) | unverified | Страницы Ray вернули ограничения/ошибки получения. Детали ASHA не включены в заново подтверждённые выводы. |
| S22 | [Lightning — EarlyStopping callback](https://github.com/Lightning-AI/pytorch-lightning/blob/master/src/lightning/pytorch/callbacks/early_stopping.py) | official_replacement | API-страница не прочиталась; официальный исходник EarlyStopping подтверждает явные monitor / patience / finite / divergence настройки. |
| S23 | [uPlot — performance, non-features, gap/band support](https://github.com/leeoniya/uPlot) | confirmed | Подтверждены Canvas и отсутствие встроенной агрегации. Бенчмарки автора не являются нашими замерами. |
| S24 | [Plotly — high-performance charts and WebGL limits](https://plotly.com/python/performance/) | unverified | Страница Plotly не была успешно прочитана. Утверждения о скорости и WebGL-лимитах исключены из подтверждённого сравнения. |
| S25 | [MDN — JSON.stringify and non-finite numbers](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify) | confirmed | Нечисловые значения сериализуются в null; генерация raw устраняет эту неоднозначность транспорта. |
| S26 | [Chrome DevTools — Performance and 4× CPU throttling](https://developer.chrome.com/docs/devtools/performance) | confirmed | Проверена методика Chrome Performance. Трейс нашего Soup-приложения ещё не записан. |
| S27 | [uPlot — aligned data format](https://github.com/leeoniya/uPlot/blob/master/docs/README.md) | confirmed |  |
| S28 | [uPlot — public TypeScript API, gaps and coordinate units](https://raw.githubusercontent.com/leeoniya/uPlot/master/dist/uPlot.d.ts) | confirmed |  |
| S29 | [ECharts — LineSeries implementation and progressive default](https://raw.githubusercontent.com/apache/echarts/master/src/chart/line/LineSeries.ts) | confirmed |  |
| S30 | [Playwright — accessibility testing and axe](https://playwright.dev/docs/accessibility-testing) | confirmed |  |
| S31 | [Chrome DevTools Protocol — Performance domain](https://chromedevtools.github.io/devtools-protocol/tot/Performance/) | confirmed |  |
| S32 | [Chrome DevTools Protocol — Runtime.getHeapUsage schema](https://raw.githubusercontent.com/ChromeDevTools/devtools-protocol/master/pdl/js_protocol.pdl) | confirmed |  |
| S33 | [MDN — measureUserAgentSpecificMemory](https://developer.mozilla.org/en-US/docs/Web/API/Performance/measureUserAgentSpecificMemory) | confirmed |  |
| S34 | [Chrome DevTools — memory diagnostics and Task Manager](https://developer.chrome.com/docs/devtools/memory-problems) | confirmed |  |
| S35 | [Playwright — browser.startTracing](https://playwright.dev/docs/api/class-browser#browser-start-tracing) | confirmed |  |
| S36 | [Chrome DevTools Protocol — CPU throttling](https://raw.githubusercontent.com/ChromeDevTools/devtools-protocol/master/pdl/domains/Emulation.pdl) | confirmed |  |
| S37 | [Playwright — locale and timezone emulation](https://playwright.dev/docs/emulation) | confirmed |  |
| S38 | [Playwright — network mocking](https://playwright.dev/docs/mock) | confirmed |  |
| S39 | [WCAG 2.2 — text contrast](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html) | confirmed |  |
| S40 | [WCAG 2.2 — non-text contrast](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html) | confirmed |  |
| S41 | [Lighthouse — accessibility scoring limits](https://developer.chrome.com/docs/lighthouse/accessibility/scoring) | confirmed |  |
| S42 | [MDN — transferable objects and detached buffers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Transferable_objects) | confirmed |  |
| S43 | [MDN — Intl.NumberFormat.formatToParts](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/formatToParts) | confirmed |  |
| S44 | [MDN — Float64Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Float64Array) | confirmed |  |
| S45 | [MDN — event loops, tasks and microtasks](https://developer.mozilla.org/en-US/docs/Web/API/HTML_DOM_API/Microtask_guide/In_depth) | historical_primary_reference | Worker event loops and draining microtasks before another task support the scheduling distinction; our backpressure design is an inference, not a vendor implementation claim. |

### 19.6. Дополнительные прямые источники этапа реализации

Это документы и исходники производителей. Ни один из них не является независимым performance benchmark Soup или исследованием закрытых систем компаний. Для mutable main/master/latest версия чтения важна; приложение использует pinned dependencies.

| ID | Источник | Зачем изучался |
|---|---|---|
| E01 | [W&B Experiment Tracking](https://wandb.ai/site/experiment-tracking/) | Пользовательский product reference: организация experiment workspace; не benchmark и не доказательство proprietary sampler. |
| E02 | [Comet Single Experiment Page](https://www.comet.com/docs/v2/guides/comet-ui/experiment-management/single-experiment-page/) | Пользовательский reference: секции experiment detail и исходный контекст. |
| E03 | [Dribbble Dashboard Design Interface — George Railean](https://dribbble.com/shots/18538171-Dashboard-Design-Interface) | Композиция ML dashboard; визуальный источник, не data/algorithm contract. |
| E04 | [Grafana TooltipPlugin2 source](https://raw.githubusercontent.com/grafana/grafana/main/packages/grafana-ui/src/components/uPlot/plugins/TooltipPlugin2.tsx) | uPlot: content/position separation, ResizeObserver geometry, microtask coalescing, refs. Mutable main. |
| E05 | [TradingView Floating Tooltip](https://tradingview.github.io/lightweight-charts/examples/tooltips-and-legends/floating-tooltip) | Persistent HTML tooltip и crosshair event. Наш raw-step/source contract определяется отдельно. |
| E06 | [TradingView PaneWidget source](https://raw.githubusercontent.com/tradingview/lightweight-charts/master/src/gui/pane-widget.ts) | Отдельные invalidation levels и top canvas для cursor. Mutable master; benchmark TradingView не проводился. |
| E07 | [Highcharts Boost](https://www.highcharts.com/docs/advanced-chart-features/boost-module) | Раздельная async подготовка interaction index и фазовые timers; Boost не импортирован в Soup. |
| E08 | [SciChart Performance Tips v5](https://www.scichart.com/documentation/js/v5/2d-charts/performance-tips/performance-tips-and-tricks/) | Sorted-X/indexing/hit-test и batching. Vendor speed claims не используются как измерения Soup. |
| E09 | [Chrome Aligned Input Events](https://developer.chrome.com/blog/aligning-input-events) | Историческое объяснение frame-aligned continuous input; конкретный Chromium дополнительно проверялся локально. |
| E10 | [W3C Pointer Events 3](https://www.w3.org/TR/pointerevents3/) | pointerrawupdate/coalescing; сохраняются fallback, bounded queue и cleanup. |
| E11 | [React DOM refs](https://react.dev/learn/manipulating-the-dom-with-refs) | DOM ownership, refs и границы imperative adapter. |
| E12 | [Tailwind source detection](https://tailwindcss.com/docs/detecting-classes-in-source-files) | Объясняет CSS input scanning; в Soup выполнен реальный report-probe before/after. |
| E13 | [Deque color-contrast rule](https://dequeuniversity.com/rules/axe/4.10/color-contrast) | Проверка contrast и необходимость разбирать incomplete. |
| E14 | [Chrome/web.dev layout thrashing](https://web.dev/articles/avoid-large-complex-layouts-and-layout-thrashing) | Layout scope, DOM size и разделение geometry reads/writes. |
| E15 | [MDN table-layout](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/table-layout) | Fixed columns не вычисляют горизонтальную геометрию по каждому новому значению. |
| E16 | [Chrome offscreen rendering](https://developer.chrome.com/docs/modern-web-guidance/guides/performance/defer-rendering-heavy-content) | Offscreen layout/render deferral; источник ранее записан в performance research, не заменяет keyboard checks. |
| E17 | [uPlot cursor.bind discussion by maintainer](https://github.com/leeoniya/uPlot/issues/298) | Фильтрация native event handlers; локальный диагностический эксперимент не дал выигрыша и не shipped. |
| E18 | [Chrome desynchronized canvas](https://developer.chrome.com/blog/desynchronized) | Невнедрённый кандидат: hint может уменьшать compositor delay, но имеет ограничения/артефакты. |
| E19 | [Vite static deployment](https://vite.dev/guide/static-deploy.html) | Production build/preview и доставка dist. |
| E20 | [Vite module Workers](https://vite.dev/guide/features.html#web-workers) | Статический new Worker(new URL(..., import.meta.url), {type:module}) и asset chunk. |
| E21 | [Vite on Vercel](https://vercel.com/docs/frameworks/frontend/vite) | SPA direct routes требуют routing rules; missing assets проверяются отдельно. |
| E22 | [React StrictMode](https://react.dev/reference/react/StrictMode) | Development повтор Effect/ref setup выявляет отсутствующий cleanup; это не runtime leak certificate. |
| E23 | [Playwright accessibility testing](https://playwright.dev/docs/accessibility-testing) | Axe integration и явная ограниченность automated checks. |
| E24 | [web.dev rendering performance](https://web.dev/articles/rendering-performance) | Frame budget, layout/paint/composite; JS query duration не равен visible response. |
| E25 | [Pinned uPlot 1.6.32](https://github.com/leeoniya/uPlot/tree/1.6.32) | Версия приложения; сравнение master docs с pinned installed types/source требуется отдельно. |

### 19.7. Что ещё не следует из этого research

- Success сохранённого benchmark не означает, что последняя версия уже опубликована или что submission email отправлен.
- Старый evidence-manifest, если ещё указывает на прошлую ревизию, должен обновляться release-процессом; исследовательский документ не исправляет его молча.
- Human accessibility review, scientific model validity и 5M browser execution не заявляются выполненными.
- Будущие изменения приложения требуют новой проверки соответствующего scope; этот срез не является обещанием неизменности всех результатов.

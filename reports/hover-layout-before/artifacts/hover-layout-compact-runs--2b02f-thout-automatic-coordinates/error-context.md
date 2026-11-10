# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: hover-layout.spec.ts >> compact /runs keeps explicit actions in place without automatic coordinates
- Location: e2e\hover-layout.spec.ts:23:46

# Error details

```
Error: expect(received).toBeCloseTo(expected, precision)

Expected: 3006.28125
Received: 3134.28125

Expected precision:    0
Expected difference: < 0.5
Received difference:   128
```

```
Error: expect(locator).toHaveCount(expected) failed

Locator:  locator('.preview-charts .chart-hover-value')
Expected: 0
Received: 1
Timeout:  5000ms

Call log:
  - Expect "toHaveCount" locator('.preview-charts .chart-hover-value') with timeout 5000ms
  - waiting for locator('.preview-charts .chart-hover-value')
    14 × locator resolved to 1 element
       - unexpected value "1"

```

# Page snapshot

```yaml
- generic [ref=e3]:
  - link "Skip to content" [ref=e4] [cursor=pointer]:
    - /url: "#main-content"
  - complementary "Workspace" [ref=e5]:
    - link "Soup home" [ref=e6] [cursor=pointer]:
      - /url: /dashboard
      - generic [ref=e7]: Soup.
    - generic [ref=e8]: Almaty Lab
    - navigation "Main navigation" [ref=e12]:
      - link "Dashboard" [ref=e13] [cursor=pointer]:
        - /url: /dashboard
      - link "Training runs" [ref=e20] [cursor=pointer]:
        - /url: /runs
      - link "Compare" [ref=e25] [cursor=pointer]:
        - /url: /compare
      - link "Data quality" [ref=e28] [cursor=pointer]:
        - /url: /data-quality
    - generic [ref=e32]:
      - link "Soup documentation" [ref=e33] [cursor=pointer]:
        - /url: https://souplanding-omega.vercel.app/docs/
      - figure "BUILT IN KAZAKHSTAN" [ref=e37]
  - generic [ref=e39]:
    - banner [ref=e40]:
      - generic [ref=e41]:
        - generic [ref=e42]: Workspace
        - generic [aria-hidden] [ref=e43]: /
        - generic [ref=e44]: qwen-kazakh
      - generic [ref=e45]:
        - generic [ref=e46]: Demo data
        - button "Switch to light theme" [ref=e51] [cursor=pointer]
    - main [ref=e63]:
      - generic [ref=e64]:
        - generic [ref=e65]:
          - heading "Training runs" [level=1] [ref=e66]
          - paragraph [ref=e67]: Explore source measurements, compare experiments and investigate data quality.
        - generic [ref=e68]: Demo snapshot · Smoothing off
      - generic [ref=e69]:
        - generic [ref=e70]:
          - term [ref=e71]: Total runs
          - definition [ref=e72]: "20"
        - generic [ref=e73]:
          - term [ref=e74]: Running
          - definition [ref=e75]: "4"
        - generic [ref=e76]:
          - term [ref=e77]: Completed
          - definition [ref=e78]: "12"
        - generic [ref=e79]:
          - term [ref=e80]: Need attention
          - definition [ref=e81]: "8"
      - generic [ref=e82]:
        - generic [ref=e83]:
          - generic [ref=e84]:
            - generic [ref=e85]:
              - generic [ref=e86]: Search runs
              - searchbox "Search runs" [ref=e91]
            - group [ref=e93]:
              - generic [ref=e94]:
                - generic [ref=e95]:
                  - text: Status
                  - combobox "Status" [ref=e96] [cursor=pointer]:
                    - option "All statuses" [selected]
                    - option "Running"
                    - option "Completed"
                    - option "Failed"
                    - option "Cancelled"
                - generic [ref=e97]:
                  - text: Data quality
                  - combobox "Data quality" [ref=e98] [cursor=pointer]:
                    - option "All data" [selected]
                    - option "Has issues"
                    - option "Clean"
                - generic [ref=e99]:
                  - text: Sort by
                  - combobox "Sort by" [ref=e100] [cursor=pointer]:
                    - option "Run name" [selected]
                    - option "Latest loss"
                    - option "Highest step"
                    - option "Snapshot time"
                - 'button "Reverse sort: Ascending ↑" [ref=e101] [cursor=pointer]':
                  - generic [ref=e102]: Ascending ↑
          - table "Twenty deterministic snapshots; status and data quality are separate." [ref=e106]:
            - caption [ref=e107]: Twenty deterministic snapshots; status and data quality are separate.
            - rowgroup [ref=e108]:
              - row [ref=e109]:
                - columnheader "Compare" [ref=e110]
                - columnheader "Run" [ref=e111]
                - columnheader "Status" [ref=e112]
                - columnheader "Latest loss" [ref=e113]
                - columnheader "Step" [ref=e114]
                - columnheader "Quality" [ref=e115]
                - columnheader "Preview" [ref=e116]
            - rowgroup [ref=e117]:
              - row [ref=e118]:
                - cell "Compare kazakh-sft-001 Compare kazakh-sft-001" [ref=e119]:
                  - generic [ref=e120] [cursor=pointer]:
                    - generic [ref=e121]: Compare kazakh-sft-001
                    - checkbox "Compare kazakh-sft-001" [ref=e122]
                - rowheader "Open kazakh-sft-001 Qwen2.5-1.5B · clean Nov 9, 2026, 5:00 PM (Asia/Qyzylorda)" [ref=e123]:
                  - link "Open kazakh-sft-001" [ref=e124] [cursor=pointer]:
                    - /url: /runs/kazakh-sft-001
                    - text: kazakh-sft-001
                  - generic [ref=e125]: Qwen2.5-1.5B · clean
                  - time [ref=e126]: Nov 9, 2026, 5:00 PM (Asia/Qyzylorda)
                - cell "Running" [ref=e127]
                - cell "0.269841" [ref=e129]
                - cell "8,191" [ref=e130]
                - cell [ref=e131]:
                  - link "Clean" [ref=e132] [cursor=pointer]:
                    - /url: /data-quality?run=kazakh-sft-001
                - cell [ref=e133]:
                  - button "Preview kazakh-sft-001" [ref=e134] [cursor=pointer]:
                    - generic [ref=e135]: Preview
              - row [ref=e138]:
                - cell "Compare kazakh-sft-002 Compare kazakh-sft-002" [ref=e139]:
                  - generic [ref=e140] [cursor=pointer]:
                    - generic [ref=e141]: Compare kazakh-sft-002
                    - checkbox "Compare kazakh-sft-002" [ref=e142]
                - rowheader "Open kazakh-sft-002 Qwen2.5-3B · slow Nov 9, 2026, 5:00 PM (Asia/Qyzylorda)" [ref=e143]:
                  - link "Open kazakh-sft-002" [ref=e144] [cursor=pointer]:
                    - /url: /runs/kazakh-sft-002
                    - text: kazakh-sft-002
                  - generic [ref=e145]: Qwen2.5-3B · slow
                  - time [ref=e146]: Nov 9, 2026, 5:00 PM (Asia/Qyzylorda)
                - cell "Completed" [ref=e147]
                - cell "0.484209" [ref=e149]
                - cell "8,191" [ref=e150]
                - cell [ref=e151]:
                  - link "Clean" [ref=e152] [cursor=pointer]:
                    - /url: /data-quality?run=kazakh-sft-002
                - cell [ref=e153]:
                  - button "Preview kazakh-sft-002" [ref=e154] [cursor=pointer]:
                    - generic [ref=e155]: Preview
              - row [ref=e158]:
                - cell "Compare kazakh-sft-003 Compare kazakh-sft-003" [ref=e159]:
                  - generic [ref=e160] [cursor=pointer]:
                    - generic [ref=e161]: Compare kazakh-sft-003
                    - checkbox "Compare kazakh-sft-003" [ref=e162]
                - rowheader "Open kazakh-sft-003 Qwen2.5-3B · noisy Nov 9, 2026, 5:00 PM (Asia/Qyzylorda)" [ref=e163]:
                  - link "Open kazakh-sft-003" [ref=e164] [cursor=pointer]:
                    - /url: /runs/kazakh-sft-003
                    - text: kazakh-sft-003
                  - generic [ref=e165]: Qwen2.5-3B · noisy
                  - time [ref=e166]: Nov 9, 2026, 5:00 PM (Asia/Qyzylorda)
                - cell "Completed" [ref=e167]
                - cell "0.297282" [ref=e169]
                - cell "8,191" [ref=e170]
                - cell [ref=e171]:
                  - link "Clean" [ref=e172] [cursor=pointer]:
                    - /url: /data-quality?run=kazakh-sft-003
                - cell [ref=e173]:
                  - button "Preview kazakh-sft-003" [ref=e174] [cursor=pointer]:
                    - generic [ref=e175]: Preview
              - row [ref=e178]:
                - cell "Compare kazakh-sft-004 Compare kazakh-sft-004" [ref=e179]:
                  - generic [ref=e180] [cursor=pointer]:
                    - generic [ref=e181]: Compare kazakh-sft-004
                    - checkbox "Compare kazakh-sft-004" [ref=e182]
                - rowheader "Open kazakh-sft-004 Qwen2.5-1.5B · divergence Nov 9, 2026, 5:00 PM (Asia/Qyzylorda)" [ref=e183]:
                  - link "Open kazakh-sft-004" [ref=e184] [cursor=pointer]:
                    - /url: /runs/kazakh-sft-004
                    - text: kazakh-sft-004
                  - generic [ref=e185]: Qwen2.5-1.5B · divergence
                  - time [ref=e186]: Nov 9, 2026, 5:00 PM (Asia/Qyzylorda)
                - cell "Failed" [ref=e187]
                - cell "6.314064" [ref=e189]
                - cell "8,191" [ref=e190]
                - cell [ref=e191]:
                  - link "Clean" [ref=e192] [cursor=pointer]:
                    - /url: /data-quality?run=kazakh-sft-004
                - cell [ref=e193]:
                  - button "Preview kazakh-sft-004" [ref=e194] [cursor=pointer]:
                    - generic [ref=e195]: Preview
              - row [ref=e198]:
                - cell "Compare kazakh-sft-005 Compare kazakh-sft-005" [ref=e199]:
                  - generic [ref=e200] [cursor=pointer]:
                    - generic [ref=e201]: Compare kazakh-sft-005
                    - checkbox "Compare kazakh-sft-005" [ref=e202]
                - rowheader "Open kazakh-sft-005 Qwen2.5-3B · spike Nov 9, 2026, 5:00 PM (Asia/Qyzylorda)" [ref=e203]:
                  - link "Open kazakh-sft-005" [ref=e204] [cursor=pointer]:
                    - /url: /runs/kazakh-sft-005
                    - text: kazakh-sft-005
                  - generic [ref=e205]: Qwen2.5-3B · spike
                  - time [ref=e206]: Nov 9, 2026, 5:00 PM (Asia/Qyzylorda)
                - cell "Running" [ref=e207]
                - cell "0.201573" [ref=e209]
                - cell "999,999" [ref=e210]
                - cell [ref=e211]:
                  - link "Clean" [ref=e212] [cursor=pointer]:
                    - /url: /data-quality?run=kazakh-sft-005
                - cell [ref=e213]:
                  - button "Preview kazakh-sft-005" [pressed] [ref=e214] [cursor=pointer]:
                    - generic [ref=e215]: Preview
              - row [ref=e218]:
                - cell "Compare kazakh-sft-006 Compare kazakh-sft-006" [ref=e219]:
                  - generic [ref=e220] [cursor=pointer]:
                    - generic [ref=e221]: Compare kazakh-sft-006
                    - checkbox "Compare kazakh-sft-006" [ref=e222]
                - rowheader "Open kazakh-sft-006 Qwen2.5-3B · missing Nov 9, 2026, 5:00 PM (Asia/Qyzylorda)" [ref=e223]:
                  - link "Open kazakh-sft-006" [ref=e224] [cursor=pointer]:
                    - /url: /runs/kazakh-sft-006
                    - text: kazakh-sft-006
                  - generic [ref=e225]: Qwen2.5-3B · missing
                  - time [ref=e226]: Nov 9, 2026, 5:00 PM (Asia/Qyzylorda)
                - cell "Running" [ref=e227]
                - cell "invalid" [ref=e229]
                - cell "8,191" [ref=e230]
                - cell [ref=e231]:
                  - link "2 findings" [ref=e232] [cursor=pointer]:
                    - /url: /data-quality?run=kazakh-sft-006
                - cell [ref=e233]:
                  - button "Preview kazakh-sft-006" [ref=e234] [cursor=pointer]:
                    - generic [ref=e235]: Preview
              - row [ref=e238]:
                - cell "Compare kazakh-sft-007 Compare kazakh-sft-007" [ref=e239]:
                  - generic [ref=e240] [cursor=pointer]:
                    - generic [ref=e241]: Compare kazakh-sft-007
                    - checkbox "Compare kazakh-sft-007" [ref=e242]
                - rowheader "Open kazakh-sft-007 Qwen2.5-1.5B · pos-inf Nov 9, 2026, 5:00 PM (Asia/Qyzylorda)" [ref=e243]:
                  - link "Open kazakh-sft-007" [ref=e244] [cursor=pointer]:
                    - /url: /runs/kazakh-sft-007
                    - text: kazakh-sft-007
                  - generic [ref=e245]: Qwen2.5-1.5B · pos-inf
                  - time [ref=e246]: Nov 9, 2026, 5:00 PM (Asia/Qyzylorda)
                - cell "Completed" [ref=e247]
                - cell "0.256663" [ref=e249]
                - cell "8,191" [ref=e250]
                - cell [ref=e251]:
                  - link "1 finding" [ref=e252] [cursor=pointer]:
                    - /url: /data-quality?run=kazakh-sft-007
                - cell [ref=e253]:
                  - button "Preview kazakh-sft-007" [ref=e254] [cursor=pointer]:
                    - generic [ref=e255]: Preview
              - row [ref=e258]:
                - cell "Compare kazakh-sft-008 Compare kazakh-sft-008" [ref=e259]:
                  - generic [ref=e260] [cursor=pointer]:
                    - generic [ref=e261]: Compare kazakh-sft-008
                    - checkbox "Compare kazakh-sft-008" [ref=e262]
                - rowheader "Open kazakh-sft-008 Qwen2.5-3B · neg-inf Nov 9, 2026, 5:00 PM (Asia/Qyzylorda)" [ref=e263]:
                  - link "Open kazakh-sft-008" [ref=e264] [cursor=pointer]:
                    - /url: /runs/kazakh-sft-008
                    - text: kazakh-sft-008
                  - generic [ref=e265]: Qwen2.5-3B · neg-inf
                  - time [ref=e266]: Nov 9, 2026, 5:00 PM (Asia/Qyzylorda)
                - cell "Completed" [ref=e267]
                - cell "0.271895" [ref=e269]
                - cell "8,191" [ref=e270]
                - cell [ref=e271]:
                  - link "1 finding" [ref=e272] [cursor=pointer]:
                    - /url: /data-quality?run=kazakh-sft-008
                - cell [ref=e273]:
                  - button "Preview kazakh-sft-008" [ref=e274] [cursor=pointer]:
                    - generic [ref=e275]: Preview
              - row [ref=e278]:
                - cell "Compare kazakh-sft-009 Compare kazakh-sft-009" [ref=e279]:
                  - generic [ref=e280] [cursor=pointer]:
                    - generic [ref=e281]: Compare kazakh-sft-009
                    - checkbox "Compare kazakh-sft-009" [ref=e282]
                - rowheader "Open kazakh-sft-009 Qwen2.5-3B · duplicates Nov 9, 2026, 5:00 PM (Asia/Qyzylorda)" [ref=e283]:
                  - link "Open kazakh-sft-009" [ref=e284] [cursor=pointer]:
                    - /url: /runs/kazakh-sft-009
                    - text: kazakh-sft-009
                  - generic [ref=e285]: Qwen2.5-3B · duplicates
                  - time [ref=e286]: Nov 9, 2026, 5:00 PM (Asia/Qyzylorda)
                - cell "Completed" [ref=e287]
                - cell "0.256026" [ref=e289]
                - cell "8,191" [ref=e290]
                - cell [ref=e291]:
                  - link "11 findings" [ref=e292] [cursor=pointer]:
                    - /url: /data-quality?run=kazakh-sft-009
                - cell [ref=e293]:
                  - button "Preview kazakh-sft-009" [ref=e294] [cursor=pointer]:
                    - generic [ref=e295]: Preview
              - row [ref=e298]:
                - cell "Compare kazakh-sft-010 Compare kazakh-sft-010" [ref=e299]:
                  - generic [ref=e300] [cursor=pointer]:
                    - generic [ref=e301]: Compare kazakh-sft-010
                    - checkbox "Compare kazakh-sft-010" [ref=e302]
                - rowheader "Open kazakh-sft-010 Qwen2.5-1.5B · conflicts Nov 9, 2026, 5:00 PM (Asia/Qyzylorda)" [ref=e303]:
                  - link "Open kazakh-sft-010" [ref=e304] [cursor=pointer]:
                    - /url: /runs/kazakh-sft-010
                    - text: kazakh-sft-010
                  - generic [ref=e305]: Qwen2.5-1.5B · conflicts
                  - time [ref=e306]: Nov 9, 2026, 5:00 PM (Asia/Qyzylorda)
                - cell "Running" [ref=e307]
                - cell "conflict" [ref=e309]
                - cell "8,190" [ref=e310]
                - cell [ref=e311]:
                  - link "10 findings" [ref=e312] [cursor=pointer]:
                    - /url: /data-quality?run=kazakh-sft-010
                - cell [ref=e313]:
                  - button "Preview kazakh-sft-010" [ref=e314] [cursor=pointer]:
                    - generic [ref=e315]: Preview
              - row [ref=e318]:
                - cell "Compare kazakh-sft-011 Compare kazakh-sft-011" [ref=e319]:
                  - generic [ref=e320] [cursor=pointer]:
                    - generic [ref=e321]: Compare kazakh-sft-011
                    - checkbox "Compare kazakh-sft-011" [ref=e322]
                - rowheader "Open kazakh-sft-011 Qwen2.5-3B · unsorted Nov 9, 2026, 5:00 PM (Asia/Qyzylorda)" [ref=e323]:
                  - link "Open kazakh-sft-011" [ref=e324] [cursor=pointer]:
                    - /url: /runs/kazakh-sft-011
                    - text: kazakh-sft-011
                  - generic [ref=e325]: Qwen2.5-3B · unsorted
                  - time [ref=e326]: Nov 9, 2026, 5:00 PM (Asia/Qyzylorda)
                - cell "Completed" [ref=e327]
                - cell "0.246137" [ref=e329]
                - cell "8,191" [ref=e330]
                - cell [ref=e331]:
                  - link "2 findings" [ref=e332] [cursor=pointer]:
                    - /url: /data-quality?run=kazakh-sft-011
                - cell [ref=e333]:
                  - button "Preview kazakh-sft-011" [ref=e334] [cursor=pointer]:
                    - generic [ref=e335]: Preview
              - row [ref=e338]:
                - cell "Compare kazakh-sft-012 Compare kazakh-sft-012" [ref=e339]:
                  - generic [ref=e340] [cursor=pointer]:
                    - generic [ref=e341]: Compare kazakh-sft-012
                    - checkbox "Compare kazakh-sft-012" [ref=e342]
                - rowheader "Open kazakh-sft-012 Qwen2.5-3B · gaps Nov 9, 2026, 5:00 PM (Asia/Qyzylorda)" [ref=e343]:
                  - link "Open kazakh-sft-012" [ref=e344] [cursor=pointer]:
                    - /url: /runs/kazakh-sft-012
                    - text: kazakh-sft-012
                  - generic [ref=e345]: Qwen2.5-3B · gaps
                  - time [ref=e346]: Nov 9, 2026, 5:00 PM (Asia/Qyzylorda)
                - cell "Completed" [ref=e347]
                - cell "0.26384" [ref=e349]
                - cell "8,291" [ref=e350]
                - cell [ref=e351]:
                  - link "1 finding" [ref=e352] [cursor=pointer]:
                    - /url: /data-quality?run=kazakh-sft-012
                - cell [ref=e353]:
                  - button "Preview kazakh-sft-012" [ref=e354] [cursor=pointer]:
                    - generic [ref=e355]: Preview
              - row [ref=e358]:
                - cell "Compare kazakh-sft-013 Compare kazakh-sft-013" [ref=e359]:
                  - generic [ref=e360] [cursor=pointer]:
                    - generic [ref=e361]: Compare kazakh-sft-013
                    - checkbox "Compare kazakh-sft-013" [ref=e362]
                - rowheader "Open kazakh-sft-013 Qwen2.5-1.5B · zero Nov 9, 2026, 5:00 PM (Asia/Qyzylorda)" [ref=e363]:
                  - link "Open kazakh-sft-013" [ref=e364] [cursor=pointer]:
                    - /url: /runs/kazakh-sft-013
                    - text: kazakh-sft-013
                  - generic [ref=e365]: Qwen2.5-1.5B · zero
                  - time [ref=e366]: Nov 9, 2026, 5:00 PM (Asia/Qyzylorda)
                - cell "Completed" [ref=e367]
                - cell "0.000" [ref=e369]
                - cell "8,191" [ref=e370]
                - cell [ref=e371]:
                  - link "Clean" [ref=e372] [cursor=pointer]:
                    - /url: /data-quality?run=kazakh-sft-013
                - cell [ref=e373]:
                  - button "Preview kazakh-sft-013" [ref=e374] [cursor=pointer]:
                    - generic [ref=e375]: Preview
              - row [ref=e378]:
                - cell "Compare kazakh-sft-014 Compare kazakh-sft-014" [ref=e379]:
                  - generic [ref=e380] [cursor=pointer]:
                    - generic [ref=e381]: Compare kazakh-sft-014
                    - checkbox "Compare kazakh-sft-014" [ref=e382]
                - rowheader "Open kazakh-sft-014 Qwen2.5-3B · plateau Nov 9, 2026, 5:00 PM (Asia/Qyzylorda)" [ref=e383]:
                  - link "Open kazakh-sft-014" [ref=e384] [cursor=pointer]:
                    - /url: /runs/kazakh-sft-014
                    - text: kazakh-sft-014
                  - generic [ref=e385]: Qwen2.5-3B · plateau
                  - time [ref=e386]: Nov 9, 2026, 5:00 PM (Asia/Qyzylorda)
                - cell "Completed" [ref=e387]
                - cell "0.800384" [ref=e389]
                - cell "8,191" [ref=e390]
                - cell [ref=e391]:
                  - link "Clean" [ref=e392] [cursor=pointer]:
                    - /url: /data-quality?run=kazakh-sft-014
                - cell [ref=e393]:
                  - button "Preview kazakh-sft-014" [ref=e394] [cursor=pointer]:
                    - generic [ref=e395]: Preview
              - row [ref=e398]:
                - cell "Compare kazakh-sft-015 Compare kazakh-sft-015" [ref=e399]:
                  - generic [ref=e400] [cursor=pointer]:
                    - generic [ref=e401]: Compare kazakh-sft-015
                    - checkbox "Compare kazakh-sft-015" [ref=e402]
                - rowheader "Open kazakh-sft-015 Qwen2.5-3B · small-lr Nov 9, 2026, 5:00 PM (Asia/Qyzylorda)" [ref=e403]:
                  - link "Open kazakh-sft-015" [ref=e404] [cursor=pointer]:
                    - /url: /runs/kazakh-sft-015
                    - text: kazakh-sft-015
                  - generic [ref=e405]: Qwen2.5-3B · small-lr
                  - time [ref=e406]: Nov 9, 2026, 5:00 PM (Asia/Qyzylorda)
                - cell "Completed" [ref=e407]
                - cell "0.261842" [ref=e409]
                - cell "8,191" [ref=e410]
                - cell [ref=e411]:
                  - link "Clean" [ref=e412] [cursor=pointer]:
                    - /url: /data-quality?run=kazakh-sft-015
                - cell [ref=e413]:
                  - button "Preview kazakh-sft-015" [ref=e414] [cursor=pointer]:
                    - generic [ref=e415]: Preview
              - row [ref=e418]:
                - cell "Compare kazakh-sft-016 Compare kazakh-sft-016" [ref=e419]:
                  - generic [ref=e420] [cursor=pointer]:
                    - generic [ref=e421]: Compare kazakh-sft-016
                    - checkbox "Compare kazakh-sft-016" [ref=e422]
                - rowheader "Open kazakh-sft-016 Qwen2.5-1.5B · grad-spike Nov 9, 2026, 5:00 PM (Asia/Qyzylorda)" [ref=e423]:
                  - link "Open kazakh-sft-016" [ref=e424] [cursor=pointer]:
                    - /url: /runs/kazakh-sft-016
                    - text: kazakh-sft-016
                  - generic [ref=e425]: Qwen2.5-1.5B · grad-spike
                  - time [ref=e426]: Nov 9, 2026, 5:00 PM (Asia/Qyzylorda)
                - cell "Completed" [ref=e427]
                - cell "0.246872" [ref=e429]
                - cell "8,191" [ref=e430]
                - cell [ref=e431]:
                  - link "Clean" [ref=e432] [cursor=pointer]:
                    - /url: /data-quality?run=kazakh-sft-016
                - cell [ref=e433]:
                  - button "Preview kazakh-sft-016" [ref=e434] [cursor=pointer]:
                    - generic [ref=e435]: Preview
              - row [ref=e438]:
                - cell "Compare kazakh-sft-017 Compare kazakh-sft-017" [ref=e439]:
                  - generic [ref=e440] [cursor=pointer]:
                    - generic [ref=e441]: Compare kazakh-sft-017
                    - checkbox "Compare kazakh-sft-017" [ref=e442]
                - rowheader "Open kazakh-sft-017 Qwen2.5-3B · mixed Nov 9, 2026, 5:00 PM (Asia/Qyzylorda)" [ref=e443]:
                  - link "Open kazakh-sft-017" [ref=e444] [cursor=pointer]:
                    - /url: /runs/kazakh-sft-017
                    - text: kazakh-sft-017
                  - generic [ref=e445]: Qwen2.5-3B · mixed
                  - time [ref=e446]: Nov 9, 2026, 5:00 PM (Asia/Qyzylorda)
                - cell "Failed" [ref=e447]
                - cell "0.262553" [ref=e449]
                - cell "8,191" [ref=e450]
                - cell [ref=e451]:
                  - link "8 findings" [ref=e452] [cursor=pointer]:
                    - /url: /data-quality?run=kazakh-sft-017
                - cell [ref=e453]:
                  - button "Preview kazakh-sft-017" [ref=e454] [cursor=pointer]:
                    - generic [ref=e455]: Preview
              - row [ref=e458]:
                - cell "Compare kazakh-sft-018 Compare kazakh-sft-018" [ref=e459]:
                  - generic [ref=e460] [cursor=pointer]:
                    - generic [ref=e461]: Compare kazakh-sft-018
                    - checkbox "Compare kazakh-sft-018" [ref=e462]
                - rowheader "Open kazakh-sft-018 Qwen2.5-3B · sparse Nov 9, 2026, 5:00 PM (Asia/Qyzylorda)" [ref=e463]:
                  - link "Open kazakh-sft-018" [ref=e464] [cursor=pointer]:
                    - /url: /runs/kazakh-sft-018
                    - text: kazakh-sft-018
                  - generic [ref=e465]: Qwen2.5-3B · sparse
                  - time [ref=e466]: Nov 9, 2026, 5:00 PM (Asia/Qyzylorda)
                - cell "Cancelled" [ref=e467]
                - cell "0.257331" [ref=e469]
                - cell "139,247" [ref=e470]
                - cell [ref=e471]:
                  - link "Clean" [ref=e472] [cursor=pointer]:
                    - /url: /data-quality?run=kazakh-sft-018
                - cell [ref=e473]:
                  - button "Preview kazakh-sft-018" [ref=e474] [cursor=pointer]:
                    - generic [ref=e475]: Preview
              - row [ref=e478]:
                - cell "Compare kazakh-sft-019 Compare kazakh-sft-019" [ref=e479]:
                  - generic [ref=e480] [cursor=pointer]:
                    - generic [ref=e481]: Compare kazakh-sft-019
                    - checkbox "Compare kazakh-sft-019" [ref=e482]
                - rowheader "Open kazakh-sft-019 Qwen2.5-1.5B · singleton Nov 9, 2026, 5:00 PM (Asia/Qyzylorda)" [ref=e483]:
                  - link "Open kazakh-sft-019" [ref=e484] [cursor=pointer]:
                    - /url: /runs/kazakh-sft-019
                    - text: kazakh-sft-019
                  - generic [ref=e485]: Qwen2.5-1.5B · singleton
                  - time [ref=e486]: Nov 9, 2026, 5:00 PM (Asia/Qyzylorda)
                - cell "Completed" [ref=e487]
                - cell "3.428509" [ref=e489]
                - cell "0" [ref=e490]
                - cell [ref=e491]:
                  - link "Clean" [ref=e492] [cursor=pointer]:
                    - /url: /data-quality?run=kazakh-sft-019
                - cell [ref=e493]:
                  - button "Preview kazakh-sft-019" [ref=e494] [cursor=pointer]:
                    - generic [ref=e495]: Preview
              - row [ref=e498]:
                - cell "Compare kazakh-sft-020 Compare kazakh-sft-020" [ref=e499]:
                  - generic [ref=e500] [cursor=pointer]:
                    - generic [ref=e501]: Compare kazakh-sft-020
                    - checkbox "Compare kazakh-sft-020" [ref=e502]
                - rowheader "Open kazakh-sft-020 Qwen2.5-3B · stale Nov 3, 2026, 5:00 AM (Asia/Qyzylorda) · Stale source" [ref=e503]:
                  - link "Open kazakh-sft-020" [ref=e504] [cursor=pointer]:
                    - /url: /runs/kazakh-sft-020
                    - text: kazakh-sft-020
                  - generic [ref=e505]: Qwen2.5-3B · stale
                  - time [ref=e506]: Nov 3, 2026, 5:00 AM (Asia/Qyzylorda) · Stale source
                - cell "Cancelled" [ref=e507]
                - cell "0.262744" [ref=e509]
                - cell "8,191" [ref=e510]
                - cell [ref=e511]:
                  - link "Clean" [ref=e512] [cursor=pointer]:
                    - /url: /data-quality?run=kazakh-sft-020
                - cell [ref=e513]:
                  - button "Preview kazakh-sft-020" [ref=e514] [cursor=pointer]:
                    - generic [ref=e515]: Preview
          - generic [ref=e518]:
            - generic [ref=e519]: 20 of 20 runs · 0/4 selected
            - generic [ref=e520]: Choose up to 4 runs using the checkboxes
        - group [ref=e521]:
          - complementary [ref=e523]:
            - generic [ref=e524]:
              - generic [ref=e525]:
                - heading "kazakh-sft-005" [level=2] [ref=e526]
                - paragraph [ref=e527]: Running · Qwen2.5-3B
              - link "Open run ↗" [ref=e528] [cursor=pointer]:
                - /url: /runs/kazakh-sft-005
            - generic [ref=e530]:
              - generic [ref=e531]:
                - generic [ref=e532]:
                  - heading "Loss" [level=2] [ref=e533]
                  - paragraph [ref=e534]: Recorded step · Linear scale · Original values
                - generic [ref=e535]: 2709 displayed
              - 'figure "Highlight kazakh-sft-005 0.200327 – 100.000 Wheel: zoom · Ctrl+wheel: pinch zoom · Shift+wheel: pan · Drag: select range Tap or point at the chart for recorded values. Open run and adjust range . Swipe vertically to scroll. Cursor step 499,999.5 kazakh-sft-005 step 499,999 · Loss 0.227481 · Δstep 0.5 Pin row 499999" [ref=e536]':
                - generic [ref=e546]:
                  - generic [ref=e548]:
                    - button "Highlight kazakh-sft-005" [ref=e549] [cursor=pointer]: kazakh-sft-005
                    - generic [ref=e551]: 0.200327 – 100.000
                  - paragraph [ref=e552]: "Wheel: zoom · Ctrl+wheel: pinch zoom · Shift+wheel: pan · Drag: select range"
                  - paragraph [ref=e553]:
                    - text: Tap or point at the chart for recorded values.
                    - link "Open run and adjust range" [ref=e554] [cursor=pointer]:
                      - /url: /runs/kazakh-sft-005
                    - text: . Swipe vertically to scroll.
                  - generic [ref=e555]:
                    - text: Cursor step 499,999.5
                    - generic [ref=e556]:
                      - strong [ref=e558]: kazakh-sft-005
                      - generic "Exact source value 0.22748138270315854" [ref=e559]:
                        - text: step 499,999 · Loss 0.227481 · Δstep 0.5
                        - button "Pin row 499999" [ref=e560] [cursor=pointer]
            - generic [ref=e561]:
              - generic [ref=e562]:
                - term [ref=e563]: Current loss
                - definition [ref=e564]: "0.201573"
              - generic [ref=e565]:
                - term [ref=e566]: Minimum loss
                - definition [ref=e567]: "0.200327"
              - generic [ref=e568]:
                - term [ref=e569]: Peak loss
                - definition [ref=e570]: "100.000"
            - link "0 source findings · Inspect data →" [ref=e571] [cursor=pointer]:
              - /url: /data-quality?run=kazakh-sft-005
```

# Test source

```ts
  1  | import { expect, test, type Locator, type Page } from '@playwright/test'
  2  | 
  3  | async function documentTop(locator: Locator) {
  4  |   return locator.evaluate(element => element.getBoundingClientRect().top + scrollY)
  5  | }
  6  | async function pointAtCenter(page: Page, plot: Locator) {
  7  |   await plot.locator('.u-over').scrollIntoViewIfNeeded()
  8  |   const box = await plot.locator('.u-over').boundingBox()
  9  |   if (!box) throw new Error('Missing chart input surface')
  10 |   const sequence = await page.evaluate(() => (window as Window & { __soupEvidence?: { acceptedHoverSeq: number } }).__soupEvidence?.acceptedHoverSeq ?? 0)
  11 |   await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2)
  12 |   await expect.poll(() => page.evaluate(() => (window as Window & { __soupEvidence?: { acceptedHoverSeq: number } }).__soupEvidence?.acceptedHoverSeq ?? 0)).toBeGreaterThan(sequence)
  13 | }
  14 | async function setRange(page: Page, min: number, max: number) {
  15 |   const from = page.getByLabel('From step', { exact: true })
  16 |   if (!await from.isVisible()) await page.locator('.range-disclosure > summary').click()
  17 |   await from.fill(String(min))
  18 |   await page.getByLabel('To step', { exact: true }).fill(String(max))
  19 |   await page.getByRole('button', { name: 'Apply range', exact: true }).click()
  20 |   await expect(page.locator('.metric-grid')).toHaveAttribute('data-view-ready', 'true')
  21 | }
  22 | 
  23 | for (const route of ['/dashboard', '/runs']) test(`compact ${route} keeps explicit actions in place without automatic coordinates`, async ({ page }, info) => {
  24 |   await page.setViewportSize({ width: 1280, height: 900 })
  25 |   await page.goto(route)
  26 |   const plot = page.getByTestId('loss-chart')
  27 |   await expect(plot).toHaveAttribute('data-view-ready', 'true')
  28 |   const next = page.locator(route === '/dashboard' ? '.dashboard-source-link' : '.preview-facts')
  29 |   const before = await documentTop(next)
  30 |   await pointAtCenter(page, plot)
  31 |   const after = await documentTop(next)
  32 |   await info.attach('preview-layout', { body: JSON.stringify({ route, before, after }), contentType: 'application/json' })
  33 |   expect.soft(after).toBeCloseTo(before, 0)
> 34 |   await expect(page.locator('.preview-charts .chart-hover-value')).toHaveCount(0)
     |                                                                    ^ Error: expect(locator).toHaveCount(expected) failed
  35 |   await expect(plot).toHaveAttribute('data-cursor-point-count', /[1-9]/)
  36 |   await expect(page.locator('.preview-charts')).toContainText('inspect original values and adjust range')
  37 | })
  38 | 
  39 | for (const width of [390, 1440]) for (const comparison of [false, true]) test(`${comparison ? 'four-run duplicate comparison' : 'full run'} preserves the following metric position at ${width}px`, async ({ page }, info) => {
  40 |   await page.setViewportSize({ width, height: 900 })
  41 |   await page.goto(comparison ? '/compare?runs=kazakh-sft-005,kazakh-sft-009,kazakh-sft-010,kazakh-sft-001' : '/runs/kazakh-sft-005')
  42 |   await expect(page.locator('.metric-grid')).toHaveAttribute('data-view-ready', 'true')
  43 |   await setRange(page, comparison ? 98 : 500000, comparison ? 100 : 500002)
  44 |   const plot = page.locator('.metric-loss .plot-host'), following = page.locator('.metric-lr'), before = await documentTop(following)
  45 |   await pointAtCenter(page, plot)
  46 |   await expect(page.locator('.metric-loss .chart-hover-value')).toBeVisible()
  47 |   const after = await documentTop(following)
  48 |   await info.attach('full-chart-layout', { body: JSON.stringify({ width, comparison, before, after }), contentType: 'application/json' })
  49 |   expect(after).toBeCloseTo(before, 0)
  50 |   await expect(page.getByTestId('cursor-readout-loss')).toHaveAttribute('data-reserved', 'true')
  51 |   if (comparison) {
  52 |     await expect(page.locator('.metric-loss .tooltip-series')).toHaveCount(4)
  53 |     await expect(page.locator('.metric-loss .tooltip-series').filter({ hasText: 'kazakh-sft-009' })).toContainText('Showing first 2 returned observations')
  54 |     await expect(page.locator('.metric-loss .tooltip-series').filter({ hasText: 'kazakh-sft-009' }).getByRole('link', { name: 'Inspect full source group', exact: true })).toHaveAttribute('href', /step=99&revision=/)
  55 |   } else {
  56 |     const pin = page.locator('.metric-loss').getByRole('button', { name: 'Pin row 500001', exact: true })
  57 |     await pin.focus()
  58 |     await page.keyboard.press('Enter')
  59 |     await expect(page.getByTestId('pinned-loss')).toHaveText('100')
  60 |   }
  61 |   expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width)
  62 | })
  63 | 
  64 | test('the visible recorded spike explains the linear axis and zoom keeps its exact source', async ({ page }) => {
  65 |   await page.goto('/runs/kazakh-sft-005')
  66 |   const note = page.getByTestId('spike-explanation')
  67 |   await expect(note).toContainText('Recorded spike: loss 100 at step 500,001')
  68 |   await expect(note).toContainText('linear scale includes this peak')
  69 |   await expect(note.getByRole('link', { name: 'Inspect original spike', exact: true })).toHaveAttribute('href', /sourceIndex=500001&revision=/)
  70 |   await note.getByRole('button', { name: 'Zoom around spike', exact: true }).click()
  71 |   await expect(page.getByTestId('loss-chart')).toHaveAttribute('data-range-min', '499991')
  72 |   await expect(page.getByTestId('loss-chart')).toHaveAttribute('data-range-max', '500011')
  73 |   await expect(note).toBeVisible()
  74 |   await setRange(page, 0, 100)
  75 |   await expect(note).toHaveCount(0)
  76 | })
  77 | 
  78 | test('recorded nonfinite measurements explain their snapshot counts and gap semantics', async ({ page }) => {
  79 |   for (const [id, expected] of [['006', '2 NaN observations'], ['007', '1 +Infinity observation'], ['008', '1 −Infinity observation']]) {
  80 |     await page.goto(`/runs/kazakh-sft-${id}`)
  81 |     const note = page.locator('.metric-loss').getByTestId('invalid-explanation')
  82 |     await expect(note).toContainText(`This snapshot contains ${expected}`)
  83 |     await expect(note).toContainText('invalid values create gaps, never zero')
  84 |     await expect(note.getByRole('link', { name: 'Inspect data quality', exact: true })).toHaveAttribute('href', `/data-quality?run=kazakh-sft-${id}&metric=loss`)
  85 |   }
  86 | })
  87 | 
```
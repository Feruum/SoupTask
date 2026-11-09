# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: acceptance.spec.ts >> dark 1440px five-screen axe and responsive acceptance
- Location: e2e\acceptance.spec.ts:51:76

# Error details

```
Error: expect(received).toEqual(expected) // deep equality

- Expected  -   1
+ Received  + 440

- Array []
+ Array [
+   Object {
+     "description": "Ensure that elements labelled through their content must have their visible text as part of their accessible name",
+     "help": "Elements must have their visible text as part of their accessible name",
+     "helpUrl": "https://dequeuniversity.com/rules/axe/4.14/label-content-name-mismatch?application=playwright",
+     "id": "label-content-name-mismatch",
+     "impact": "serious",
+     "nodes": Array [
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": null,
+             "id": "label-content-name-mismatch",
+             "impact": "serious",
+             "message": "Text inside the element is not included in the accessible name",
+             "relatedNodes": Array [],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Text inside the element is not included in the accessible name",
+         "html": "<button tabindex=\"0\" class=\"_button_1ma6x_1 _ghost_1ma6x_15 _md_1ma6x_32\" aria-label=\"Reverse sort\">",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           "button[aria-label=\"Reverse sort\"]",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": null,
+             "id": "label-content-name-mismatch",
+             "impact": "serious",
+             "message": "Text inside the element is not included in the accessible name",
+             "relatedNodes": Array [],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Text inside the element is not included in the accessible name",
+         "html": "<button tabindex=\"0\" class=\"_button_1ma6x_1 _ghost_1ma6x_15 _sm_1ma6x_31\" aria-label=\"Preview kazakh-sft-001\">",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           "button[aria-label=\"Preview kazakh-sft-001\"]",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": null,
+             "id": "label-content-name-mismatch",
+             "impact": "serious",
+             "message": "Text inside the element is not included in the accessible name",
+             "relatedNodes": Array [],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Text inside the element is not included in the accessible name",
+         "html": "<button tabindex=\"0\" class=\"_button_1ma6x_1 _ghost_1ma6x_15 _sm_1ma6x_31\" aria-label=\"Preview kazakh-sft-002\">",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           "button[aria-label=\"Preview kazakh-sft-002\"]",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": null,
+             "id": "label-content-name-mismatch",
+             "impact": "serious",
+             "message": "Text inside the element is not included in the accessible name",
+             "relatedNodes": Array [],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Text inside the element is not included in the accessible name",
+         "html": "<button tabindex=\"0\" class=\"_button_1ma6x_1 _ghost_1ma6x_15 _sm_1ma6x_31\" aria-label=\"Preview kazakh-sft-003\">",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           "button[aria-label=\"Preview kazakh-sft-003\"]",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": null,
+             "id": "label-content-name-mismatch",
+             "impact": "serious",
+             "message": "Text inside the element is not included in the accessible name",
+             "relatedNodes": Array [],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Text inside the element is not included in the accessible name",
+         "html": "<button tabindex=\"0\" class=\"_button_1ma6x_1 _ghost_1ma6x_15 _sm_1ma6x_31\" aria-label=\"Preview kazakh-sft-004\">",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           "button[aria-label=\"Preview kazakh-sft-004\"]",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": null,
+             "id": "label-content-name-mismatch",
+             "impact": "serious",
+             "message": "Text inside the element is not included in the accessible name",
+             "relatedNodes": Array [],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Text inside the element is not included in the accessible name",
+         "html": "<button tabindex=\"0\" class=\"_button_1ma6x_1 _ghost_1ma6x_15 _sm_1ma6x_31\" aria-label=\"Preview kazakh-sft-005\">",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           "button[aria-label=\"Preview kazakh-sft-005\"]",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": null,
+             "id": "label-content-name-mismatch",
+             "impact": "serious",
+             "message": "Text inside the element is not included in the accessible name",
+             "relatedNodes": Array [],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Text inside the element is not included in the accessible name",
+         "html": "<button tabindex=\"0\" class=\"_button_1ma6x_1 _ghost_1ma6x_15 _sm_1ma6x_31\" aria-label=\"Preview kazakh-sft-006\">",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           "button[aria-label=\"Preview kazakh-sft-006\"]",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": null,
+             "id": "label-content-name-mismatch",
+             "impact": "serious",
+             "message": "Text inside the element is not included in the accessible name",
+             "relatedNodes": Array [],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Text inside the element is not included in the accessible name",
+         "html": "<button tabindex=\"0\" class=\"_button_1ma6x_1 _ghost_1ma6x_15 _sm_1ma6x_31\" aria-label=\"Preview kazakh-sft-007\">",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           "button[aria-label=\"Preview kazakh-sft-007\"]",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": null,
+             "id": "label-content-name-mismatch",
+             "impact": "serious",
+             "message": "Text inside the element is not included in the accessible name",
+             "relatedNodes": Array [],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Text inside the element is not included in the accessible name",
+         "html": "<button tabindex=\"0\" class=\"_button_1ma6x_1 _ghost_1ma6x_15 _sm_1ma6x_31\" aria-label=\"Preview kazakh-sft-008\">",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           "button[aria-label=\"Preview kazakh-sft-008\"]",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": null,
+             "id": "label-content-name-mismatch",
+             "impact": "serious",
+             "message": "Text inside the element is not included in the accessible name",
+             "relatedNodes": Array [],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Text inside the element is not included in the accessible name",
+         "html": "<button tabindex=\"0\" class=\"_button_1ma6x_1 _ghost_1ma6x_15 _sm_1ma6x_31\" aria-label=\"Preview kazakh-sft-009\">",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           "button[aria-label=\"Preview kazakh-sft-009\"]",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": null,
+             "id": "label-content-name-mismatch",
+             "impact": "serious",
+             "message": "Text inside the element is not included in the accessible name",
+             "relatedNodes": Array [],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Text inside the element is not included in the accessible name",
+         "html": "<button tabindex=\"0\" class=\"_button_1ma6x_1 _ghost_1ma6x_15 _sm_1ma6x_31\" aria-label=\"Preview kazakh-sft-010\">",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           "button[aria-label=\"Preview kazakh-sft-010\"]",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": null,
+             "id": "label-content-name-mismatch",
+             "impact": "serious",
+             "message": "Text inside the element is not included in the accessible name",
+             "relatedNodes": Array [],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Text inside the element is not included in the accessible name",
+         "html": "<button tabindex=\"0\" class=\"_button_1ma6x_1 _ghost_1ma6x_15 _sm_1ma6x_31\" aria-label=\"Preview kazakh-sft-011\">",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           "button[aria-label=\"Preview kazakh-sft-011\"]",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": null,
+             "id": "label-content-name-mismatch",
+             "impact": "serious",
+             "message": "Text inside the element is not included in the accessible name",
+             "relatedNodes": Array [],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Text inside the element is not included in the accessible name",
+         "html": "<button tabindex=\"0\" class=\"_button_1ma6x_1 _ghost_1ma6x_15 _sm_1ma6x_31\" aria-label=\"Preview kazakh-sft-012\">",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           "button[aria-label=\"Preview kazakh-sft-012\"]",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": null,
+             "id": "label-content-name-mismatch",
+             "impact": "serious",
+             "message": "Text inside the element is not included in the accessible name",
+             "relatedNodes": Array [],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Text inside the element is not included in the accessible name",
+         "html": "<button tabindex=\"0\" class=\"_button_1ma6x_1 _ghost_1ma6x_15 _sm_1ma6x_31\" aria-label=\"Preview kazakh-sft-013\">",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           "button[aria-label=\"Preview kazakh-sft-013\"]",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": null,
+             "id": "label-content-name-mismatch",
+             "impact": "serious",
+             "message": "Text inside the element is not included in the accessible name",
+             "relatedNodes": Array [],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Text inside the element is not included in the accessible name",
+         "html": "<button tabindex=\"0\" class=\"_button_1ma6x_1 _ghost_1ma6x_15 _sm_1ma6x_31\" aria-label=\"Preview kazakh-sft-014\">",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           "button[aria-label=\"Preview kazakh-sft-014\"]",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": null,
+             "id": "label-content-name-mismatch",
+             "impact": "serious",
+             "message": "Text inside the element is not included in the accessible name",
+             "relatedNodes": Array [],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Text inside the element is not included in the accessible name",
+         "html": "<button tabindex=\"0\" class=\"_button_1ma6x_1 _ghost_1ma6x_15 _sm_1ma6x_31\" aria-label=\"Preview kazakh-sft-015\">",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           "button[aria-label=\"Preview kazakh-sft-015\"]",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": null,
+             "id": "label-content-name-mismatch",
+             "impact": "serious",
+             "message": "Text inside the element is not included in the accessible name",
+             "relatedNodes": Array [],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Text inside the element is not included in the accessible name",
+         "html": "<button tabindex=\"0\" class=\"_button_1ma6x_1 _ghost_1ma6x_15 _sm_1ma6x_31\" aria-label=\"Preview kazakh-sft-016\">",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           "button[aria-label=\"Preview kazakh-sft-016\"]",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": null,
+             "id": "label-content-name-mismatch",
+             "impact": "serious",
+             "message": "Text inside the element is not included in the accessible name",
+             "relatedNodes": Array [],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Text inside the element is not included in the accessible name",
+         "html": "<button tabindex=\"0\" class=\"_button_1ma6x_1 _ghost_1ma6x_15 _sm_1ma6x_31\" aria-label=\"Preview kazakh-sft-017\">",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           "button[aria-label=\"Preview kazakh-sft-017\"]",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": null,
+             "id": "label-content-name-mismatch",
+             "impact": "serious",
+             "message": "Text inside the element is not included in the accessible name",
+             "relatedNodes": Array [],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Text inside the element is not included in the accessible name",
+         "html": "<button tabindex=\"0\" class=\"_button_1ma6x_1 _ghost_1ma6x_15 _sm_1ma6x_31\" aria-label=\"Preview kazakh-sft-018\">",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           "button[aria-label=\"Preview kazakh-sft-018\"]",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": null,
+             "id": "label-content-name-mismatch",
+             "impact": "serious",
+             "message": "Text inside the element is not included in the accessible name",
+             "relatedNodes": Array [],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Text inside the element is not included in the accessible name",
+         "html": "<button tabindex=\"0\" class=\"_button_1ma6x_1 _ghost_1ma6x_15 _sm_1ma6x_31\" aria-label=\"Preview kazakh-sft-019\">",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           "button[aria-label=\"Preview kazakh-sft-019\"]",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": null,
+             "id": "label-content-name-mismatch",
+             "impact": "serious",
+             "message": "Text inside the element is not included in the accessible name",
+             "relatedNodes": Array [],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Text inside the element is not included in the accessible name",
+         "html": "<button tabindex=\"0\" class=\"_button_1ma6x_1 _ghost_1ma6x_15 _sm_1ma6x_31\" aria-label=\"Preview kazakh-sft-020\">",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           "button[aria-label=\"Preview kazakh-sft-020\"]",
+         ],
+       },
+     ],
+     "tags": Array [
+       "cat.semantics",
+       "wcag21a",
+       "wcag253",
+       "EN-301-549",
+       "EN-9.2.5.3",
+       "RGAAv4",
+       "RGAA-6.1.5",
+     ],
+   },
+ ]
```

# Page snapshot

```yaml
- generic [ref=f1e3]:
  - link "Skip to content" [ref=f1e4] [cursor=pointer]:
    - /url: "#main-content"
  - complementary "Workspace" [ref=f1e5]:
    - link "Soup home" [ref=f1e6] [cursor=pointer]:
      - /url: /dashboard
      - generic [ref=f1e7]: Soup.
    - generic [ref=f1e8]: Almaty Lab
    - navigation "Main navigation" [ref=f1e12]:
      - link "Dashboard" [ref=f1e13] [cursor=pointer]:
        - /url: /dashboard
      - link "Training runs" [ref=f1e20] [cursor=pointer]:
        - /url: /runs
      - link "Compare" [ref=f1e25] [cursor=pointer]:
        - /url: /compare
      - link "Data quality" [ref=f1e28] [cursor=pointer]:
        - /url: /data-quality
    - generic [ref=f1e32]:
      - link "Soup documentation" [ref=f1e33] [cursor=pointer]:
        - /url: https://souplanding-omega.vercel.app/docs/
      - figure "BUILT IN KAZAKHSTAN" [ref=f1e37]
  - generic [ref=f1e39]:
    - banner [ref=f1e40]:
      - generic [ref=f1e41]:
        - generic [ref=f1e42]: Workspace
        - generic [aria-hidden] [ref=f1e43]: /
        - generic [ref=f1e44]: qwen-kazakh
      - generic [ref=f1e45]:
        - generic [ref=f1e46]: Demo data
        - button "Switch to light theme" [ref=f1e51] [cursor=pointer]
    - main [ref=f1e63]:
      - generic [ref=f1e64]:
        - generic [ref=f1e65]:
          - paragraph [ref=f1e66]: SOUP / EXPERIMENT WORKSPACE
          - heading "Training runs" [level=1] [ref=f1e67]
          - paragraph [ref=f1e68]: Explore source measurements, compare experiments and investigate data quality.
        - generic [ref=f1e69]: Demo snapshot · Smoothing off
      - generic [ref=f1e70]:
        - generic [ref=f1e71]:
          - term [ref=f1e72]: Total runs
          - definition [ref=f1e73]: "20"
        - generic [ref=f1e74]:
          - term [ref=f1e75]: Running
          - definition [ref=f1e76]: "4"
        - generic [ref=f1e77]:
          - term [ref=f1e78]: Completed
          - definition [ref=f1e79]: "12"
        - generic [ref=f1e80]:
          - term [ref=f1e81]: Need attention
          - definition [ref=f1e82]: "8"
      - generic [ref=f1e83]:
        - generic [ref=f1e84]:
          - generic [ref=f1e85]:
            - generic [ref=f1e86]:
              - generic [ref=f1e87]: Search runs
              - searchbox "Search runs" [ref=f1e92]
            - generic [ref=f1e94]:
              - text: Status
              - combobox "Status" [ref=f1e95] [cursor=pointer]:
                - option "All statuses" [selected]
                - option "Running"
                - option "Completed"
                - option "Failed"
                - option "Cancelled"
            - generic [ref=f1e96]:
              - text: Data quality
              - combobox "Data quality" [ref=f1e97] [cursor=pointer]:
                - option "All data" [selected]
                - option "Has issues"
                - option "Clean"
            - generic [ref=f1e98]:
              - text: Sort by
              - combobox "Sort by" [ref=f1e99] [cursor=pointer]:
                - option "Run name" [selected]
                - option "Latest loss"
                - option "Highest step"
                - option "Snapshot time"
            - button "Reverse sort" [ref=f1e100] [cursor=pointer]:
              - generic [ref=f1e101]: Ascending ↑
          - table "Twenty deterministic snapshots; status and data quality are separate." [ref=f1e105]:
            - caption [ref=f1e106]: Twenty deterministic snapshots; status and data quality are separate.
            - rowgroup [ref=f1e107]:
              - row [ref=f1e108]:
                - columnheader "Compare" [ref=f1e109]
                - columnheader "Run" [ref=f1e110]
                - columnheader "Status" [ref=f1e111]
                - columnheader "Latest loss" [ref=f1e112]
                - columnheader "Step" [ref=f1e113]
                - columnheader "Quality" [ref=f1e114]
                - columnheader "Preview" [ref=f1e115]
            - rowgroup [ref=f1e116]:
              - row [ref=f1e117]:
                - cell [ref=f1e118]:
                  - checkbox "Compare kazakh-sft-001" [ref=f1e119]
                - rowheader "Open kazakh-sft-001 Qwen2.5-1.5B · clean" [ref=f1e120]:
                  - link "Open kazakh-sft-001" [ref=f1e121] [cursor=pointer]:
                    - /url: /runs/kazakh-sft-001
                    - text: kazakh-sft-001
                  - generic [ref=f1e122]: Qwen2.5-1.5B · clean
                - cell "Running" [ref=f1e123]
                - cell "0.269841" [ref=f1e125]
                - cell "8,191" [ref=f1e126]
                - cell [ref=f1e127]:
                  - link "Clean" [ref=f1e128] [cursor=pointer]:
                    - /url: /data-quality?run=kazakh-sft-001
                - cell [ref=f1e129]:
                  - button "Preview kazakh-sft-001" [ref=f1e130] [cursor=pointer]:
                    - generic [ref=f1e131]: View ↗
              - row [ref=f1e134]:
                - cell [ref=f1e135]:
                  - checkbox "Compare kazakh-sft-002" [ref=f1e136]
                - rowheader "Open kazakh-sft-002 Qwen2.5-3B · slow" [ref=f1e137]:
                  - link "Open kazakh-sft-002" [ref=f1e138] [cursor=pointer]:
                    - /url: /runs/kazakh-sft-002
                    - text: kazakh-sft-002
                  - generic [ref=f1e139]: Qwen2.5-3B · slow
                - cell "Completed" [ref=f1e140]
                - cell "0.484209" [ref=f1e142]
                - cell "8,191" [ref=f1e143]
                - cell [ref=f1e144]:
                  - link "Clean" [ref=f1e145] [cursor=pointer]:
                    - /url: /data-quality?run=kazakh-sft-002
                - cell [ref=f1e146]:
                  - button "Preview kazakh-sft-002" [ref=f1e147] [cursor=pointer]:
                    - generic [ref=f1e148]: View ↗
              - row [ref=f1e151]:
                - cell [ref=f1e152]:
                  - checkbox "Compare kazakh-sft-003" [ref=f1e153]
                - rowheader "Open kazakh-sft-003 Qwen2.5-3B · noisy" [ref=f1e154]:
                  - link "Open kazakh-sft-003" [ref=f1e155] [cursor=pointer]:
                    - /url: /runs/kazakh-sft-003
                    - text: kazakh-sft-003
                  - generic [ref=f1e156]: Qwen2.5-3B · noisy
                - cell "Completed" [ref=f1e157]
                - cell "0.297282" [ref=f1e159]
                - cell "8,191" [ref=f1e160]
                - cell [ref=f1e161]:
                  - link "Clean" [ref=f1e162] [cursor=pointer]:
                    - /url: /data-quality?run=kazakh-sft-003
                - cell [ref=f1e163]:
                  - button "Preview kazakh-sft-003" [ref=f1e164] [cursor=pointer]:
                    - generic [ref=f1e165]: View ↗
              - row [ref=f1e168]:
                - cell [ref=f1e169]:
                  - checkbox "Compare kazakh-sft-004" [ref=f1e170]
                - rowheader "Open kazakh-sft-004 Qwen2.5-1.5B · divergence" [ref=f1e171]:
                  - link "Open kazakh-sft-004" [ref=f1e172] [cursor=pointer]:
                    - /url: /runs/kazakh-sft-004
                    - text: kazakh-sft-004
                  - generic [ref=f1e173]: Qwen2.5-1.5B · divergence
                - cell "Failed" [ref=f1e174]
                - cell "6.314064" [ref=f1e176]
                - cell "8,191" [ref=f1e177]
                - cell [ref=f1e178]:
                  - link "Clean" [ref=f1e179] [cursor=pointer]:
                    - /url: /data-quality?run=kazakh-sft-004
                - cell [ref=f1e180]:
                  - button "Preview kazakh-sft-004" [ref=f1e181] [cursor=pointer]:
                    - generic [ref=f1e182]: View ↗
              - row [ref=f1e185]:
                - cell [ref=f1e186]:
                  - checkbox "Compare kazakh-sft-005" [ref=f1e187]
                - rowheader "Open kazakh-sft-005 Qwen2.5-3B · spike" [ref=f1e188]:
                  - link "Open kazakh-sft-005" [ref=f1e189] [cursor=pointer]:
                    - /url: /runs/kazakh-sft-005
                    - text: kazakh-sft-005
                  - generic [ref=f1e190]: Qwen2.5-3B · spike
                - cell "Running" [ref=f1e191]
                - cell "0.201573" [ref=f1e193]
                - cell "999,999" [ref=f1e194]
                - cell [ref=f1e195]:
                  - link "Clean" [ref=f1e196] [cursor=pointer]:
                    - /url: /data-quality?run=kazakh-sft-005
                - cell [ref=f1e197]:
                  - button "Preview kazakh-sft-005" [ref=f1e198] [cursor=pointer]:
                    - generic [ref=f1e199]: View ↗
              - row [ref=f1e202]:
                - cell [ref=f1e203]:
                  - checkbox "Compare kazakh-sft-006" [ref=f1e204]
                - rowheader "Open kazakh-sft-006 Qwen2.5-3B · missing" [ref=f1e205]:
                  - link "Open kazakh-sft-006" [ref=f1e206] [cursor=pointer]:
                    - /url: /runs/kazakh-sft-006
                    - text: kazakh-sft-006
                  - generic [ref=f1e207]: Qwen2.5-3B · missing
                - cell "Running" [ref=f1e208]
                - cell "invalid" [ref=f1e210]
                - cell "8,191" [ref=f1e211]
                - cell [ref=f1e212]:
                  - link "2 findings" [ref=f1e213] [cursor=pointer]:
                    - /url: /data-quality?run=kazakh-sft-006
                - cell [ref=f1e214]:
                  - button "Preview kazakh-sft-006" [ref=f1e215] [cursor=pointer]:
                    - generic [ref=f1e216]: View ↗
              - row [ref=f1e219]:
                - cell [ref=f1e220]:
                  - checkbox "Compare kazakh-sft-007" [ref=f1e221]
                - rowheader "Open kazakh-sft-007 Qwen2.5-1.5B · pos-inf" [ref=f1e222]:
                  - link "Open kazakh-sft-007" [ref=f1e223] [cursor=pointer]:
                    - /url: /runs/kazakh-sft-007
                    - text: kazakh-sft-007
                  - generic [ref=f1e224]: Qwen2.5-1.5B · pos-inf
                - cell "Completed" [ref=f1e225]
                - cell "0.256663" [ref=f1e227]
                - cell "8,191" [ref=f1e228]
                - cell [ref=f1e229]:
                  - link "1 findings" [ref=f1e230] [cursor=pointer]:
                    - /url: /data-quality?run=kazakh-sft-007
                - cell [ref=f1e231]:
                  - button "Preview kazakh-sft-007" [ref=f1e232] [cursor=pointer]:
                    - generic [ref=f1e233]: View ↗
              - row [ref=f1e236]:
                - cell [ref=f1e237]:
                  - checkbox "Compare kazakh-sft-008" [ref=f1e238]
                - rowheader "Open kazakh-sft-008 Qwen2.5-3B · neg-inf" [ref=f1e239]:
                  - link "Open kazakh-sft-008" [ref=f1e240] [cursor=pointer]:
                    - /url: /runs/kazakh-sft-008
                    - text: kazakh-sft-008
                  - generic [ref=f1e241]: Qwen2.5-3B · neg-inf
                - cell "Completed" [ref=f1e242]
                - cell "0.271895" [ref=f1e244]
                - cell "8,191" [ref=f1e245]
                - cell [ref=f1e246]:
                  - link "1 findings" [ref=f1e247] [cursor=pointer]:
                    - /url: /data-quality?run=kazakh-sft-008
                - cell [ref=f1e248]:
                  - button "Preview kazakh-sft-008" [ref=f1e249] [cursor=pointer]:
                    - generic [ref=f1e250]: View ↗
              - row [ref=f1e253]:
                - cell [ref=f1e254]:
                  - checkbox "Compare kazakh-sft-009" [ref=f1e255]
                - rowheader "Open kazakh-sft-009 Qwen2.5-3B · duplicates" [ref=f1e256]:
                  - link "Open kazakh-sft-009" [ref=f1e257] [cursor=pointer]:
                    - /url: /runs/kazakh-sft-009
                    - text: kazakh-sft-009
                  - generic [ref=f1e258]: Qwen2.5-3B · duplicates
                - cell "Completed" [ref=f1e259]
                - cell "0.256026" [ref=f1e261]
                - cell "8,191" [ref=f1e262]
                - cell [ref=f1e263]:
                  - link "11 findings" [ref=f1e264] [cursor=pointer]:
                    - /url: /data-quality?run=kazakh-sft-009
                - cell [ref=f1e265]:
                  - button "Preview kazakh-sft-009" [ref=f1e266] [cursor=pointer]:
                    - generic [ref=f1e267]: View ↗
              - row [ref=f1e270]:
                - cell [ref=f1e271]:
                  - checkbox "Compare kazakh-sft-010" [ref=f1e272]
                - rowheader "Open kazakh-sft-010 Qwen2.5-1.5B · conflicts" [ref=f1e273]:
                  - link "Open kazakh-sft-010" [ref=f1e274] [cursor=pointer]:
                    - /url: /runs/kazakh-sft-010
                    - text: kazakh-sft-010
                  - generic [ref=f1e275]: Qwen2.5-1.5B · conflicts
                - cell "Running" [ref=f1e276]
                - cell "conflict" [ref=f1e278]
                - cell "8,190" [ref=f1e279]
                - cell [ref=f1e280]:
                  - link "10 findings" [ref=f1e281] [cursor=pointer]:
                    - /url: /data-quality?run=kazakh-sft-010
                - cell [ref=f1e282]:
                  - button "Preview kazakh-sft-010" [ref=f1e283] [cursor=pointer]:
                    - generic [ref=f1e284]: View ↗
              - row [ref=f1e287]:
                - cell [ref=f1e288]:
                  - checkbox "Compare kazakh-sft-011" [ref=f1e289]
                - rowheader "Open kazakh-sft-011 Qwen2.5-3B · unsorted" [ref=f1e290]:
                  - link "Open kazakh-sft-011" [ref=f1e291] [cursor=pointer]:
                    - /url: /runs/kazakh-sft-011
                    - text: kazakh-sft-011
                  - generic [ref=f1e292]: Qwen2.5-3B · unsorted
                - cell "Completed" [ref=f1e293]
                - cell "0.246137" [ref=f1e295]
                - cell "8,191" [ref=f1e296]
                - cell [ref=f1e297]:
                  - link "2 findings" [ref=f1e298] [cursor=pointer]:
                    - /url: /data-quality?run=kazakh-sft-011
                - cell [ref=f1e299]:
                  - button "Preview kazakh-sft-011" [ref=f1e300] [cursor=pointer]:
                    - generic [ref=f1e301]: View ↗
              - row [ref=f1e304]:
                - cell [ref=f1e305]:
                  - checkbox "Compare kazakh-sft-012" [ref=f1e306]
                - rowheader "Open kazakh-sft-012 Qwen2.5-3B · gaps" [ref=f1e307]:
                  - link "Open kazakh-sft-012" [ref=f1e308] [cursor=pointer]:
                    - /url: /runs/kazakh-sft-012
                    - text: kazakh-sft-012
                  - generic [ref=f1e309]: Qwen2.5-3B · gaps
                - cell "Completed" [ref=f1e310]
                - cell "0.26384" [ref=f1e312]
                - cell "8,291" [ref=f1e313]
                - cell [ref=f1e314]:
                  - link "1 findings" [ref=f1e315] [cursor=pointer]:
                    - /url: /data-quality?run=kazakh-sft-012
                - cell [ref=f1e316]:
                  - button "Preview kazakh-sft-012" [ref=f1e317] [cursor=pointer]:
                    - generic [ref=f1e318]: View ↗
              - row [ref=f1e321]:
                - cell [ref=f1e322]:
                  - checkbox "Compare kazakh-sft-013" [ref=f1e323]
                - rowheader "Open kazakh-sft-013 Qwen2.5-1.5B · zero" [ref=f1e324]:
                  - link "Open kazakh-sft-013" [ref=f1e325] [cursor=pointer]:
                    - /url: /runs/kazakh-sft-013
                    - text: kazakh-sft-013
                  - generic [ref=f1e326]: Qwen2.5-1.5B · zero
                - cell "Completed" [ref=f1e327]
                - cell "0.000" [ref=f1e329]
                - cell "8,191" [ref=f1e330]
                - cell [ref=f1e331]:
                  - link "Clean" [ref=f1e332] [cursor=pointer]:
                    - /url: /data-quality?run=kazakh-sft-013
                - cell [ref=f1e333]:
                  - button "Preview kazakh-sft-013" [ref=f1e334] [cursor=pointer]:
                    - generic [ref=f1e335]: View ↗
              - row [ref=f1e338]:
                - cell [ref=f1e339]:
                  - checkbox "Compare kazakh-sft-014" [ref=f1e340]
                - rowheader "Open kazakh-sft-014 Qwen2.5-3B · plateau" [ref=f1e341]:
                  - link "Open kazakh-sft-014" [ref=f1e342] [cursor=pointer]:
                    - /url: /runs/kazakh-sft-014
                    - text: kazakh-sft-014
                  - generic [ref=f1e343]: Qwen2.5-3B · plateau
                - cell "Completed" [ref=f1e344]
                - cell "0.800384" [ref=f1e346]
                - cell "8,191" [ref=f1e347]
                - cell [ref=f1e348]:
                  - link "Clean" [ref=f1e349] [cursor=pointer]:
                    - /url: /data-quality?run=kazakh-sft-014
                - cell [ref=f1e350]:
                  - button "Preview kazakh-sft-014" [ref=f1e351] [cursor=pointer]:
                    - generic [ref=f1e352]: View ↗
              - row [ref=f1e355]:
                - cell [ref=f1e356]:
                  - checkbox "Compare kazakh-sft-015" [ref=f1e357]
                - rowheader "Open kazakh-sft-015 Qwen2.5-3B · small-lr" [ref=f1e358]:
                  - link "Open kazakh-sft-015" [ref=f1e359] [cursor=pointer]:
                    - /url: /runs/kazakh-sft-015
                    - text: kazakh-sft-015
                  - generic [ref=f1e360]: Qwen2.5-3B · small-lr
                - cell "Completed" [ref=f1e361]
                - cell "0.261842" [ref=f1e363]
                - cell "8,191" [ref=f1e364]
                - cell [ref=f1e365]:
                  - link "Clean" [ref=f1e366] [cursor=pointer]:
                    - /url: /data-quality?run=kazakh-sft-015
                - cell [ref=f1e367]:
                  - button "Preview kazakh-sft-015" [ref=f1e368] [cursor=pointer]:
                    - generic [ref=f1e369]: View ↗
              - row [ref=f1e372]:
                - cell [ref=f1e373]:
                  - checkbox "Compare kazakh-sft-016" [ref=f1e374]
                - rowheader "Open kazakh-sft-016 Qwen2.5-1.5B · grad-spike" [ref=f1e375]:
                  - link "Open kazakh-sft-016" [ref=f1e376] [cursor=pointer]:
                    - /url: /runs/kazakh-sft-016
                    - text: kazakh-sft-016
                  - generic [ref=f1e377]: Qwen2.5-1.5B · grad-spike
                - cell "Completed" [ref=f1e378]
                - cell "0.246872" [ref=f1e380]
                - cell "8,191" [ref=f1e381]
                - cell [ref=f1e382]:
                  - link "Clean" [ref=f1e383] [cursor=pointer]:
                    - /url: /data-quality?run=kazakh-sft-016
                - cell [ref=f1e384]:
                  - button "Preview kazakh-sft-016" [ref=f1e385] [cursor=pointer]:
                    - generic [ref=f1e386]: View ↗
              - row [ref=f1e389]:
                - cell [ref=f1e390]:
                  - checkbox "Compare kazakh-sft-017" [ref=f1e391]
                - rowheader "Open kazakh-sft-017 Qwen2.5-3B · mixed" [ref=f1e392]:
                  - link "Open kazakh-sft-017" [ref=f1e393] [cursor=pointer]:
                    - /url: /runs/kazakh-sft-017
                    - text: kazakh-sft-017
                  - generic [ref=f1e394]: Qwen2.5-3B · mixed
                - cell "Failed" [ref=f1e395]
                - cell "0.262553" [ref=f1e397]
                - cell "8,191" [ref=f1e398]
                - cell [ref=f1e399]:
                  - link "8 findings" [ref=f1e400] [cursor=pointer]:
                    - /url: /data-quality?run=kazakh-sft-017
                - cell [ref=f1e401]:
                  - button "Preview kazakh-sft-017" [ref=f1e402] [cursor=pointer]:
                    - generic [ref=f1e403]: View ↗
              - row [ref=f1e406]:
                - cell [ref=f1e407]:
                  - checkbox "Compare kazakh-sft-018" [ref=f1e408]
                - rowheader "Open kazakh-sft-018 Qwen2.5-3B · sparse" [ref=f1e409]:
                  - link "Open kazakh-sft-018" [ref=f1e410] [cursor=pointer]:
                    - /url: /runs/kazakh-sft-018
                    - text: kazakh-sft-018
                  - generic [ref=f1e411]: Qwen2.5-3B · sparse
                - cell "Cancelled" [ref=f1e412]
                - cell "0.257331" [ref=f1e414]
                - cell "139,247" [ref=f1e415]
                - cell [ref=f1e416]:
                  - link "Clean" [ref=f1e417] [cursor=pointer]:
                    - /url: /data-quality?run=kazakh-sft-018
                - cell [ref=f1e418]:
                  - button "Preview kazakh-sft-018" [ref=f1e419] [cursor=pointer]:
                    - generic [ref=f1e420]: View ↗
              - row [ref=f1e423]:
                - cell [ref=f1e424]:
                  - checkbox "Compare kazakh-sft-019" [ref=f1e425]
                - rowheader "Open kazakh-sft-019 Qwen2.5-1.5B · singleton" [ref=f1e426]:
                  - link "Open kazakh-sft-019" [ref=f1e427] [cursor=pointer]:
                    - /url: /runs/kazakh-sft-019
                    - text: kazakh-sft-019
                  - generic [ref=f1e428]: Qwen2.5-1.5B · singleton
                - cell "Completed" [ref=f1e429]
                - cell "3.428509" [ref=f1e431]
                - cell "0" [ref=f1e432]
                - cell [ref=f1e433]:
                  - link "Clean" [ref=f1e434] [cursor=pointer]:
                    - /url: /data-quality?run=kazakh-sft-019
                - cell [ref=f1e435]:
                  - button "Preview kazakh-sft-019" [ref=f1e436] [cursor=pointer]:
                    - generic [ref=f1e437]: View ↗
              - row [ref=f1e440]:
                - cell [ref=f1e441]:
                  - checkbox "Compare kazakh-sft-020" [ref=f1e442]
                - rowheader "Open kazakh-sft-020 Qwen2.5-3B · stale" [ref=f1e443]:
                  - link "Open kazakh-sft-020" [ref=f1e444] [cursor=pointer]:
                    - /url: /runs/kazakh-sft-020
                    - text: kazakh-sft-020
                  - generic [ref=f1e445]: Qwen2.5-3B · stale
                - cell "Cancelled" [ref=f1e446]
                - cell "0.262744" [ref=f1e448]
                - cell "8,191" [ref=f1e449]
                - cell [ref=f1e450]:
                  - link "Clean" [ref=f1e451] [cursor=pointer]:
                    - /url: /data-quality?run=kazakh-sft-020
                - cell [ref=f1e452]:
                  - button "Preview kazakh-sft-020" [ref=f1e453] [cursor=pointer]:
                    - generic [ref=f1e454]: View ↗
          - generic [ref=f1e457]:
            - generic [ref=f1e458]: 20 of 20 runs · 0/4 selected
            - generic [ref=f1e459]: Select 2–4 runs to compare
        - complementary [ref=f1e460]:
          - generic [ref=f1e461]:
            - generic [ref=f1e462]:
              - heading "kazakh-sft-005" [level=2] [ref=f1e463]
              - paragraph [ref=f1e464]: Running · Qwen2.5-3B
            - link "Open run ↗" [ref=f1e465] [cursor=pointer]:
              - /url: /runs/kazakh-sft-005
          - generic [ref=f1e467]:
            - generic [ref=f1e468]:
              - generic [ref=f1e469]:
                - heading "Loss" [level=2] [ref=f1e470]
                - paragraph [ref=f1e471]: Recorded step · Linear scale · Original values
              - generic [ref=f1e472]: 1223 displayed
            - figure "kazakh-sft-005 · 0.200327 – 100.000 Selected source points retain actual step and value. Known gaps are not connected." [ref=f1e473]:
              - generic [ref=f1e482]:
                - generic [ref=f1e483]: kazakh-sft-005 · 0.200327 – 100.000
                - paragraph [ref=f1e485]: Selected source points retain actual step and value. Known gaps are not connected.
          - generic [ref=f1e486]:
            - generic [ref=f1e487]:
              - term [ref=f1e488]: Current loss
              - definition [ref=f1e489]: "0.201573"
            - generic [ref=f1e490]:
              - term [ref=f1e491]: Minimum loss
              - definition [ref=f1e492]: "0.200327"
            - generic [ref=f1e493]:
              - term [ref=f1e494]: Peak loss
              - definition [ref=f1e495]: "100.000"
          - link "0 source findings · Inspect data →" [ref=f1e496] [cursor=pointer]:
            - /url: /data-quality?run=kazakh-sft-005
```

# Test source

```ts
  1  | import AxeBuilder from '@axe-core/playwright'
  2  | import { expect, test } from '@playwright/test'
  3  | 
  4  | const spikeRun='/runs/kazakh-sft-005'
  5  | test('million-point source identity, three charts and keyboard range',async({page})=>{
  6  |  const errors:string[]=[];page.on('pageerror',error=>errors.push(error.message))
  7  |  await page.goto(spikeRun)
  8  |  await expect(page.getByTestId('loss-chart').locator('canvas')).toBeVisible({timeout:60000})
  9  |  await expect(page.getByTestId('lr-chart').locator('canvas')).toBeVisible()
  10 |  await expect(page.getByTestId('grad-chart').locator('canvas')).toBeVisible()
  11 |  await page.getByRole('button',{name:'Source',exact:true}).click()
  12 |  await page.getByLabel('Inspect by').selectOption('sourceIndex')
  13 |  await page.getByLabel('Source index',{exact:true}).fill('500001')
  14 |  await page.getByRole('button',{name:'Inspect source',exact:true}).click()
  15 |  await expect(page.getByTestId('inspected-loss')).toHaveText('100.000')
  16 |  await page.getByRole('button',{name:'Metrics',exact:true}).click()
  17 |  await page.getByRole('button',{name:'Zoom in',exact:true}).focus();await page.keyboard.press('Enter')
  18 |  await expect(page.locator('[data-view-ready="true"]').first()).toBeVisible()
  19 |  await page.getByRole('button',{name:'Reset view',exact:true}).click()
  20 |  expect(errors).toEqual([])
  21 | })
  22 | 
  23 | test('source spike is actually painted at the source coordinate',async({page})=>{
  24 |  await page.goto(spikeRun)
  25 |  const host=page.getByTestId('loss-chart')
  26 |  await expect(host).toHaveAttribute('data-spike-source-index','500001',{timeout:60000})
  27 |  const painted=await host.evaluate(element=>{
  28 |   const canvas=element.querySelector('canvas')!,context=canvas.getContext('2d')!
  29 |   const x=Number(element.getAttribute('data-spike-x')),y=Number(element.getAttribute('data-spike-y'))
  30 |   const color=getComputedStyle(document.documentElement).getPropertyValue('--chart-line').trim()
  31 |   const rgb=color.match(/[a-f\d]{2}/gi)!.map(v=>parseInt(v,16))
  32 |   const bytes=context.getImageData(Math.max(0,Math.round(x)-5),Math.max(0,Math.round(y)-5),11,11).data
  33 |   let count=0;for(let i=0;i<bytes.length;i+=4)if(bytes[i+3]>0&&rgb.every((v,j)=>Math.abs(v-bytes[i+j])<35))count++
  34 |   return count
  35 |  })
  36 |  expect(painted,'critical maximum marker must exist in Canvas pixels').toBeGreaterThan(2)
  37 | })
  38 | 
  39 | test('routes, filters and invalid comparison selections recover explicitly',async({page})=>{
  40 |  await page.goto('/');await expect(page).toHaveURL(/\/dashboard$/)
  41 |  await expect(page.getByRole('heading',{name:'Workspace overview',exact:true})).toBeVisible()
  42 |  await page.goto('/runs');await page.getByRole('searchbox',{name:'Search runs',exact:true}).fill('no-such-run')
  43 |  await expect(page.getByText('No matching runs',{exact:true})).toBeVisible()
  44 |  await page.goto('/compare?runs=unknown');await expect(page.getByText(/known run|Unknown run|Invalid run|not found/i).first()).toBeVisible()
  45 |  await page.goto('/compare?runs=kazakh-sft-005,kazakh-sft-006')
  46 |  await expect(page.locator('canvas').first()).toBeVisible({timeout:60000})
  47 |  await page.goto('/runs/unknown');await expect(page.getByRole('heading',{name:'Run not found',exact:true})).toBeVisible()
  48 |  await page.goto('/no-such-page');await expect(page.getByRole('heading',{name:'Page not found',exact:true})).toBeVisible()
  49 | })
  50 | 
  51 | for(const theme of ['dark','light'] as const)for(const width of [320,1440])test(`${theme} ${width}px five-screen axe and responsive acceptance`,async({page},info)=>{
  52 |  await page.emulateMedia({reducedMotion:'reduce'})
  53 |  await page.setViewportSize({width,height:1000})
  54 |  await page.addInitScript(value=>localStorage.setItem('soup-theme-v1',value),theme)
  55 |  for(const route of ['/dashboard','/runs',spikeRun,'/compare?runs=kazakh-sft-005,kazakh-sft-006','/data-quality']){
  56 |   await page.goto(route)
  57 |   await expect(page.locator('h1')).toBeVisible()
  58 |   if(route.includes('005'))await expect(page.locator('canvas').first()).toBeVisible({timeout:60000})
  59 |   await expect(page.locator('html')).toHaveAttribute('data-theme',theme)
  60 |   const audit=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21a','wcag21aa']).analyze()
  61 |   await info.attach(`${route.replace(/[^a-z\d]/gi,'-')}-axe`,{body:JSON.stringify(audit,null,2),contentType:'application/json'})
> 62 |   expect(audit.violations).toEqual([])
     |                            ^ Error: expect(received).toEqual(expected) // deep equality
  63 |   expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true)
  64 |   await page.screenshot({path:info.outputPath(`${route.replace(/[^a-z\d]/gi,'-')}.png`),fullPage:true})
  65 |  }
  66 | })
  67 | 
  68 | for(const locale of ['en-US','de-DE','ru-RU'])test(`${locale} numeric source survives timezone changes`,async({browser})=>{
  69 |  for(const timezoneId of ['UTC','Asia/Qyzylorda','America/Los_Angeles']){
  70 |   const context=await browser.newContext({locale,timezoneId});const page=await context.newPage()
  71 |   await page.goto(spikeRun);await expect(page.locator('canvas').first()).toBeVisible({timeout:60000})
  72 |   await page.getByRole('button',{name:'Source',exact:true}).click()
  73 |   await page.getByLabel('Inspect by').selectOption('sourceIndex');await page.getByLabel('Source index',{exact:true}).fill('500001')
  74 |   await page.getByRole('button',{name:'Inspect source',exact:true}).click()
  75 |   await expect(page.getByTestId('inspected-loss')).toHaveText(locale==='en-US'?'100.000':'100,000')
  76 |   await context.close()
  77 |  }
  78 | })
  79 | 
```
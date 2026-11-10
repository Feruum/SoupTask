# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: hover-layout.spec.ts >> compact /dashboard keeps explicit actions in place without automatic coordinates
- Location: e2e\hover-layout.spec.ts:23:46

# Error details

```
Error: expect(received).toBeCloseTo(expected, precision)

Expected: 1308.59375
Received: 1445.59375

Expected precision:    0
Expected difference: < 0.5
Received difference:   137
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
      - link "Training runs" [ref=e21] [cursor=pointer]:
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
          - generic [ref=e66]:
            - heading "Workspace overview" [level=1] [ref=e67]
            - paragraph [ref=e68]:
              - generic [ref=e69]: 20 runs
              - generic [ref=e70]: ·4 running
              - generic [ref=e71]: ·8 need attention
              - generic [ref=e72]: ·1,147,457 raw rows
          - group "Dashboard metric" [ref=e73]:
            - button "Loss" [pressed] [ref=e74] [cursor=pointer]
            - button "Learning rate" [ref=e78] [cursor=pointer]
            - button "Gradient norm" [ref=e82] [cursor=pointer]
        - generic [ref=e86]:
          - group [ref=e87]:
            - region "Experiment map" [ref=e89]:
              - generic [ref=e90]:
                - generic [ref=e91]:
                  - heading "Experiment map" [level=2] [ref=e92]
                  - paragraph [ref=e93]: 20 runs · 3 metrics
                - generic [ref=e94]: 01—20
              - group "Training experiments by model, method and metric Each sector is a run. Inner, middle and outer bands are Loss, Learning rate and Gradient norm. Tile length encodes finite source-row counts on a logarithmic scale. Colors identify model and method groups; diamonds mark data findings. Arrow keys select a run and metric. Exact counts are available in the table below." [ref=e95]:
                - button "kazakh-sft-002, Loss quality" [ref=e2652] [cursor=pointer]
                - button "kazakh-sft-002, Learning rate quality" [ref=e2653] [cursor=pointer]
                - button "kazakh-sft-002, Gradient norm quality" [ref=e2654] [cursor=pointer]
                - button "kazakh-sft-003, Loss quality" [ref=e2655] [cursor=pointer]
                - button "kazakh-sft-003, Learning rate quality" [ref=e2656] [cursor=pointer]
                - button "kazakh-sft-003, Gradient norm quality" [ref=e2657] [cursor=pointer]
                - button "kazakh-sft-006, Loss quality" [ref=e2658] [cursor=pointer]
                - button "kazakh-sft-006, Learning rate quality" [ref=e2659] [cursor=pointer]
                - button "kazakh-sft-006, Gradient norm quality" [ref=e2660] [cursor=pointer]
                - button "kazakh-sft-008, Loss quality" [ref=e2661] [cursor=pointer]
                - button "kazakh-sft-008, Learning rate quality" [ref=e2662] [cursor=pointer]
                - button "kazakh-sft-008, Gradient norm quality" [ref=e2663] [cursor=pointer]
                - button "kazakh-sft-011, Loss quality" [ref=e2664] [cursor=pointer]
                - button "kazakh-sft-011, Learning rate quality" [ref=e2665] [cursor=pointer]
                - button "kazakh-sft-011, Gradient norm quality" [ref=e2666] [cursor=pointer]
                - button "kazakh-sft-012, Loss quality" [ref=e2667] [cursor=pointer]
                - button "kazakh-sft-012, Learning rate quality" [ref=e2668] [cursor=pointer]
                - button "kazakh-sft-012, Gradient norm quality" [ref=e2669] [cursor=pointer]
                - button "kazakh-sft-014, Loss quality" [ref=e2670] [cursor=pointer]
                - button "kazakh-sft-014, Learning rate quality" [ref=e2671] [cursor=pointer]
                - button "kazakh-sft-014, Gradient norm quality" [ref=e2672] [cursor=pointer]
                - button "kazakh-sft-015, Loss quality" [ref=e2673] [cursor=pointer]
                - button "kazakh-sft-015, Learning rate quality" [ref=e2674] [cursor=pointer]
                - button "kazakh-sft-015, Gradient norm quality" [ref=e2675] [cursor=pointer]
                - button "kazakh-sft-018, Loss quality" [ref=e2676] [cursor=pointer]
                - button "kazakh-sft-018, Learning rate quality" [ref=e2677] [cursor=pointer]
                - button "kazakh-sft-018, Gradient norm quality" [ref=e2678] [cursor=pointer]
                - button "kazakh-sft-020, Loss quality" [ref=e2679] [cursor=pointer]
                - button "kazakh-sft-020, Learning rate quality" [ref=e2680] [cursor=pointer]
                - button "kazakh-sft-020, Gradient norm quality" [ref=e2681] [cursor=pointer]
                - button "kazakh-sft-005, Loss quality" [pressed] [ref=e2682] [cursor=pointer]
                - button "kazakh-sft-005, Learning rate quality" [ref=e2683] [cursor=pointer]
                - button "kazakh-sft-005, Gradient norm quality" [ref=e2684] [cursor=pointer]
                - button "kazakh-sft-009, Loss quality" [ref=e2685] [cursor=pointer]
                - button "kazakh-sft-009, Learning rate quality" [ref=e2686] [cursor=pointer]
                - button "kazakh-sft-009, Gradient norm quality" [ref=e2687] [cursor=pointer]
                - button "kazakh-sft-017, Loss quality" [ref=e2688] [cursor=pointer]
                - button "kazakh-sft-017, Learning rate quality" [ref=e2689] [cursor=pointer]
                - button "kazakh-sft-017, Gradient norm quality" [ref=e2690] [cursor=pointer]
                - button "kazakh-sft-004, Loss quality" [ref=e2691] [cursor=pointer]
                - button "kazakh-sft-004, Learning rate quality" [ref=e2692] [cursor=pointer]
                - button "kazakh-sft-004, Gradient norm quality" [ref=e2693] [cursor=pointer]
                - button "kazakh-sft-007, Loss quality" [ref=e2694] [cursor=pointer]
                - button "kazakh-sft-007, Learning rate quality" [ref=e2695] [cursor=pointer]
                - button "kazakh-sft-007, Gradient norm quality" [ref=e2696] [cursor=pointer]
                - button "kazakh-sft-010, Loss quality" [ref=e2697] [cursor=pointer]
                - button "kazakh-sft-010, Learning rate quality" [ref=e2698] [cursor=pointer]
                - button "kazakh-sft-010, Gradient norm quality" [ref=e2699] [cursor=pointer]
                - button "kazakh-sft-016, Loss quality" [ref=e2700] [cursor=pointer]
                - button "kazakh-sft-016, Learning rate quality" [ref=e2701] [cursor=pointer]
                - button "kazakh-sft-016, Gradient norm quality" [ref=e2702] [cursor=pointer]
                - button "kazakh-sft-019, Loss quality" [ref=e2703] [cursor=pointer]
                - button "kazakh-sft-019, Learning rate quality" [ref=e2704] [cursor=pointer]
                - button "kazakh-sft-019, Gradient norm quality" [ref=e2705] [cursor=pointer]
                - button "kazakh-sft-001, Loss quality" [ref=e2706] [cursor=pointer]
                - button "kazakh-sft-001, Learning rate quality" [ref=e2707] [cursor=pointer]
                - button "kazakh-sft-001, Gradient norm quality" [ref=e2708] [cursor=pointer]
                - button "kazakh-sft-013, Loss quality" [ref=e2709] [cursor=pointer]
                - button "kazakh-sft-013, Learning rate quality" [ref=e2710] [cursor=pointer]
                - button "kazakh-sft-013, Gradient norm quality" [ref=e2711] [cursor=pointer]
                - generic [aria-hidden] [ref=e2712]:
                  - generic [ref=e2715]: RUN 005
                  - generic [ref=e2716]: Loss
                - generic [aria-hidden] [ref=e2717]:
                  - generic [ref=e2718]: "02"
                  - generic [ref=e2719]: "03"
                  - generic [ref=e2720]: "06"
                  - generic [ref=e2721]: "08"
                  - generic [ref=e2722]: "11"
                  - generic [ref=e2723]: "12"
                  - generic [ref=e2724]: "14"
                  - generic [ref=e2725]: "15"
                  - generic [ref=e2726]: "18"
                  - generic [ref=e2727]: "20"
                  - generic [ref=e2728]: "05"
                  - generic [ref=e2729]: "09"
                  - generic [ref=e2730]: "17"
                  - generic [ref=e2731]: "04"
                  - generic [ref=e2732]: "07"
                  - generic [ref=e2733]: "10"
                  - generic [ref=e2734]: "16"
                  - generic [ref=e2735]: "19"
                  - generic [ref=e2736]: "01"
                  - generic [ref=e2737]: "13"
              - generic [ref=e2738]:
                - generic [ref=e2739]: 3B / SFT
                - generic [ref=e2741]: 3B / DPO
                - generic [ref=e2743]: 1.5B / SFT
                - generic [ref=e2745]: 1.5B / DPO
                - generic [ref=e2747]: Source findings
              - paragraph [ref=e2749]: "Tile length: finite rows (log). Inner → outer: Loss / LR / Grad norm."
              - generic [ref=e2750]:
                - generic [ref=e2751]:
                  - generic [ref=e2752]: Inspect experiment
                  - combobox "Inspect experiment" [ref=e2753] [cursor=pointer]:
                    - option "kazakh-sft-001"
                    - option "kazakh-sft-002"
                    - option "kazakh-sft-003"
                    - option "kazakh-sft-004"
                    - option "kazakh-sft-005" [selected]
                    - option "kazakh-sft-006"
                    - option "kazakh-sft-007"
                    - option "kazakh-sft-008"
                    - option "kazakh-sft-009"
                    - option "kazakh-sft-010"
                    - option "kazakh-sft-011"
                    - option "kazakh-sft-012"
                    - option "kazakh-sft-013"
                    - option "kazakh-sft-014"
                    - option "kazakh-sft-015"
                    - option "kazakh-sft-016"
                    - option "kazakh-sft-017"
                    - option "kazakh-sft-018"
                    - option "kazakh-sft-019"
                    - option "kazakh-sft-020"
                - generic [ref=e2754]:
                  - generic [ref=e2755]: Metric
                  - combobox "Metric" [ref=e2756] [cursor=pointer]:
                    - option "Loss" [selected]
                    - option "Learning rate"
                    - option "Gradient norm"
              - group [ref=e2757]:
                - generic "Accessible quality table" [ref=e2758] [cursor=pointer]
          - generic [ref=e2759]:
            - group [ref=e2760]:
              - region "Experiment groups" [ref=e2762]:
                - heading "Experiment groups" [level=2] [ref=e2764]
                - paragraph [ref=e2765]:
                  - text: qwen-kazakh
                  - generic [ref=e2766]: model → method → run
                - generic [ref=e2767]:
                  - generic [ref=e2768]:
                    - generic [ref=e2769]: Qwen2.5-3B
                    - generic [ref=e2770]:
                      - generic [ref=e2771]:
                        - generic [ref=e2772]: SFT
                        - button "Select kazakh-sft-002 from Qwen2.5-3B SFT; 002 +9" [ref=e2773] [cursor=pointer]:
                          - generic [ref=e2775]: "002"
                          - generic [ref=e2776]: "+9"
                      - generic [ref=e2777]:
                        - generic [ref=e2778]: DPO
                        - button "Select kazakh-sft-005 from Qwen2.5-3B DPO; 005 +2" [pressed] [ref=e2779] [cursor=pointer]:
                          - generic [ref=e2781]: "005"
                          - generic [ref=e2782]: "+2"
                  - generic [ref=e2783]:
                    - generic [ref=e2784]: Qwen2.5-1.5B
                    - generic [ref=e2785]:
                      - generic [ref=e2786]:
                        - generic [ref=e2787]: SFT
                        - button "Select kazakh-sft-004 from Qwen2.5-1.5B SFT; 004 +4" [ref=e2788] [cursor=pointer]:
                          - generic [ref=e2790]: "004"
                          - generic [ref=e2791]: "+4"
                      - generic [ref=e2792]:
                        - generic [ref=e2793]: DPO
                        - button "Select kazakh-sft-001 from Qwen2.5-1.5B DPO; 001 +1" [ref=e2794] [cursor=pointer]:
                          - generic [ref=e2796]: "001"
                          - generic [ref=e2797]: "+1"
                - paragraph [ref=e2798]: Each leaf opens a run. +N counts the other runs in that group.
            - region "kazakh-sft-005" [ref=e2799]:
              - generic [ref=e2800]:
                - heading "kazakh-sft-005" [level=2] [ref=e2801]
                - generic [ref=e2802]: Running
              - paragraph [ref=e2803]: Qwen2.5-3B · DPO
              - generic [ref=e2804]:
                - generic [ref=e2805]:
                  - term [ref=e2806]: Peak loss
                  - definition [ref=e2807]: "100.000"
                - generic [ref=e2808]:
                  - term [ref=e2809]: Raw rows
                  - definition [ref=e2810]: 1,000,000
                - generic [ref=e2811]:
                  - term [ref=e2812]: Peak step
                  - definition [ref=e2813]: 500,001
                - generic [ref=e2814]:
                  - term [ref=e2815]: Metrics
                  - definition [ref=e2816]: "3"
              - paragraph [ref=e2817]: Loss · 0 invalid · 0 conflicts · 0 gaps
              - generic [ref=e2818]:
                - link "Open run" [ref=e2819] [cursor=pointer]:
                  - /url: /runs/kazakh-sft-005
                - link "Compare" [ref=e2823] [cursor=pointer]:
                  - /url: /compare?runs=kazakh-sft-005
                - link "Inspect issues" [ref=e2824] [cursor=pointer]:
                  - /url: /data-quality?run=kazakh-sft-005&metric=loss
            - region "Raw loss" [ref=e2828]:
              - generic [ref=e2829]:
                - heading "Raw loss" [level=2] [ref=e2830]
                - generic [ref=e2831]: Smoothing off
              - 'figure "Highlight kazakh-sft-005 0.200327 – 100.000 Wheel: zoom · Ctrl+wheel: pinch zoom · Shift+wheel: pan · Drag: select range Tap or point at the chart for recorded values. Open run and adjust range . Swipe vertically to scroll. Cursor step 499,999.5 kazakh-sft-005 step 499,999 · Loss 0.227481 · Δstep 0.5 Pin row 499999" [ref=e2834]':
                - generic [ref=e2844]:
                  - generic [ref=e2846]:
                    - button "Highlight kazakh-sft-005" [ref=e2847] [cursor=pointer]: kazakh-sft-005
                    - generic [ref=e2849]: 0.200327 – 100.000
                  - paragraph [ref=e2850]: "Wheel: zoom · Ctrl+wheel: pinch zoom · Shift+wheel: pan · Drag: select range"
                  - paragraph [ref=e2851]:
                    - text: Tap or point at the chart for recorded values.
                    - link "Open run and adjust range" [ref=e2852] [cursor=pointer]:
                      - /url: /runs/kazakh-sft-005
                    - text: . Swipe vertically to scroll.
                  - generic [ref=e2853]:
                    - text: Cursor step 499,999.5
                    - generic [ref=e2854]:
                      - strong [ref=e2856]: kazakh-sft-005
                      - generic "Exact source value 0.22748138270315854" [ref=e2857]:
                        - text: step 499,999 · Loss 0.227481 · Δstep 0.5
                        - button "Pin row 499999" [ref=e2858] [cursor=pointer]
              - link "Inspect peak at source" [ref=e2859] [cursor=pointer]:
                - /url: /runs/kazakh-sft-005?step=500001&revision=soup-1.0.0%3Aspike%401%3Aseed%3D42%3An%3D1000000%3Acadence%3D1
          - group [ref=e2863]:
            - complementary "Snapshot findings" [ref=e2865]:
              - generic [ref=e2867]:
                - heading "Snapshot findings" [level=2] [ref=e2868]
                - paragraph [ref=e2869]: Source observations
              - generic [ref=e2870]:
                - link "kazakh-sft-005 Loss peak 100.000 Recorded step 500,001 Inspect source" [ref=e2871] [cursor=pointer]:
                  - /url: /runs/kazakh-sft-005?step=500001&revision=soup-1.0.0%3Aspike%401%3Aseed%3D42%3An%3D1000000%3Acadence%3D1
                  - generic [ref=e2874]:
                    - heading "kazakh-sft-005" [level=3] [ref=e2875]
                    - paragraph [ref=e2876]: Loss peak 100.000
                    - generic [ref=e2877]: Recorded step 500,001
                    - generic [ref=e2878]: Inspect source
                - link "kazakh-sft-006 NaN observations 2 source findings Inspect source" [ref=e2885] [cursor=pointer]:
                  - /url: /data-quality?run=kazakh-sft-006
                  - generic [ref=e2888]:
                    - heading "kazakh-sft-006" [level=3] [ref=e2889]
                    - paragraph [ref=e2890]: NaN observations
                    - generic [ref=e2891]: 2 source findings
                    - generic [ref=e2892]: Inspect source
                - link "kazakh-sft-007 Infinite metric values 1 source findings Inspect source" [ref=e2899] [cursor=pointer]:
                  - /url: /data-quality?run=kazakh-sft-007
                  - generic [ref=e2902]:
                    - heading "kazakh-sft-007" [level=3] [ref=e2903]
                    - paragraph [ref=e2904]: Infinite metric values
                    - generic [ref=e2905]: 1 source findings
                    - generic [ref=e2906]: Inspect source
                - link "kazakh-sft-009 Missing intervals 11 source findings Inspect source" [ref=e2913] [cursor=pointer]:
                  - /url: /data-quality?run=kazakh-sft-009
                  - generic [ref=e2916]:
                    - heading "kazakh-sft-009" [level=3] [ref=e2917]
                    - paragraph [ref=e2918]: Missing intervals
                    - generic [ref=e2919]: 11 source findings
                    - generic [ref=e2920]: Inspect source
                - link "kazakh-sft-010 Conflicting duplicate steps 10 source findings Inspect source" [ref=e2927] [cursor=pointer]:
                  - /url: /data-quality?run=kazakh-sft-010
                  - generic [ref=e2932]:
                    - heading "kazakh-sft-010" [level=3] [ref=e2933]
                    - paragraph [ref=e2934]: Conflicting duplicate steps
                    - generic [ref=e2935]: 10 source findings
                    - generic [ref=e2936]: Inspect source
                - link "kazakh-sft-011 Out-of-order observations 2 source findings Inspect source" [ref=e2943] [cursor=pointer]:
                  - /url: /data-quality?run=kazakh-sft-011
                  - generic [ref=e2947]:
                    - heading "kazakh-sft-011" [level=3] [ref=e2948]
                    - paragraph [ref=e2949]: Out-of-order observations
                    - generic [ref=e2950]: 2 source findings
                    - generic [ref=e2951]: Inspect source
              - generic [ref=e2958]:
                - link "View data quality" [ref=e2959] [cursor=pointer]:
                  - /url: /data-quality
                - group [ref=e2963]:
                  - generic "Source finding totals" [ref=e2964] [cursor=pointer]
        - group [ref=e2965]:
          - region "Run history" [ref=e2967]:
            - generic [ref=e2968]:
              - generic [ref=e2969]:
                - heading "Run history" [level=2] [ref=e2970]
                - paragraph [ref=e2971]: Starts per day · Aug 13, 2026 – Nov 10, 2026 · UTC
              - generic [ref=e2972]: Demo history
            - generic [ref=e2973]:
              - generic [ref=e2974]:
                - strong [ref=e2977]: 20 runs
                - generic [ref=e2978]: across 13 active days
              - paragraph [ref=e2979]: Select a day to explore its experiments. Dates are reproducible demo metadata, separate from source update times.
              - generic [ref=e2980]:
                - generic [aria-hidden] [ref=e2981]:
                  - generic [ref=e2982]: Aug
                  - generic [ref=e2983]: Sep
                  - generic [ref=e2984]: Oct
                  - generic [ref=e2985]: Nov
                - generic [aria-hidden] [ref=e2986]:
                  - generic [ref=e2987]: Mon
                  - generic [ref=e2988]: Wed
                  - generic [ref=e2989]: Fri
                - group "Daily run starts. Use arrow keys to move between days and Enter to select." [ref=e2990]:
                  - button "Aug 13, 2026 · 0 runs started" [ref=e2992] [cursor=pointer]:
                    - generic [ref=e2993]: "0"
                  - button "Aug 14, 2026 · 0 runs started" [ref=e2994] [cursor=pointer]:
                    - generic [ref=e2995]: "0"
                  - button "Aug 15, 2026 · 0 runs started" [ref=e2996] [cursor=pointer]:
                    - generic [ref=e2997]: "0"
                  - button "Aug 16, 2026 · 0 runs started" [ref=e2998] [cursor=pointer]:
                    - generic [ref=e2999]: "0"
                  - button "Aug 17, 2026 · 0 runs started" [ref=e3000] [cursor=pointer]:
                    - generic [ref=e3001]: "0"
                  - button "Aug 18, 2026 · 0 runs started" [ref=e3002] [cursor=pointer]:
                    - generic [ref=e3003]: "0"
                  - button "Aug 19, 2026 · 1 run started · 1 completed" [ref=e3004] [cursor=pointer]:
                    - generic [ref=e3005]: "1"
                  - button "Aug 20, 2026 · 0 runs started" [ref=e3006] [cursor=pointer]:
                    - generic [ref=e3007]: "0"
                  - button "Aug 21, 2026 · 0 runs started" [ref=e3008] [cursor=pointer]:
                    - generic [ref=e3009]: "0"
                  - button "Aug 22, 2026 · 0 runs started" [ref=e3010] [cursor=pointer]:
                    - generic [ref=e3011]: "0"
                  - button "Aug 23, 2026 · 0 runs started" [ref=e3012] [cursor=pointer]:
                    - generic [ref=e3013]: "0"
                  - button "Aug 24, 2026 · 0 runs started" [ref=e3014] [cursor=pointer]:
                    - generic [ref=e3015]: "0"
                  - button "Aug 25, 2026 · 0 runs started" [ref=e3016] [cursor=pointer]:
                    - generic [ref=e3017]: "0"
                  - button "Aug 26, 2026 · 0 runs started" [ref=e3018] [cursor=pointer]:
                    - generic [ref=e3019]: "0"
                  - button "Aug 27, 2026 · 0 runs started" [ref=e3020] [cursor=pointer]:
                    - generic [ref=e3021]: "0"
                  - button "Aug 28, 2026 · 0 runs started" [ref=e3022] [cursor=pointer]:
                    - generic [ref=e3023]: "0"
                  - button "Aug 29, 2026 · 0 runs started" [ref=e3024] [cursor=pointer]:
                    - generic [ref=e3025]: "0"
                  - button "Aug 30, 2026 · 2 runs started · 1 failed, 1 cancelled" [ref=e3026] [cursor=pointer]:
                    - generic [ref=e3027]: "2"
                  - button "Aug 31, 2026 · 0 runs started" [ref=e3028] [cursor=pointer]:
                    - generic [ref=e3029]: "0"
                  - button "Sep 1, 2026 · 0 runs started" [ref=e3030] [cursor=pointer]:
                    - generic [ref=e3031]: "0"
                  - button "Sep 2, 2026 · 0 runs started" [ref=e3032] [cursor=pointer]:
                    - generic [ref=e3033]: "0"
                  - button "Sep 3, 2026 · 0 runs started" [ref=e3034] [cursor=pointer]:
                    - generic [ref=e3035]: "0"
                  - button "Sep 4, 2026 · 0 runs started" [ref=e3036] [cursor=pointer]:
                    - generic [ref=e3037]: "0"
                  - button "Sep 5, 2026 · 0 runs started" [ref=e3038] [cursor=pointer]:
                    - generic [ref=e3039]: "0"
                  - button "Sep 6, 2026 · 0 runs started" [ref=e3040] [cursor=pointer]:
                    - generic [ref=e3041]: "0"
                  - button "Sep 7, 2026 · 0 runs started" [ref=e3042] [cursor=pointer]:
                    - generic [ref=e3043]: "0"
                  - button "Sep 8, 2026 · 1 run started · 1 completed" [ref=e3044] [cursor=pointer]:
                    - generic [ref=e3045]: "1"
                  - button "Sep 9, 2026 · 0 runs started" [ref=e3046] [cursor=pointer]:
                    - generic [ref=e3047]: "0"
                  - button "Sep 10, 2026 · 0 runs started" [ref=e3048] [cursor=pointer]:
                    - generic [ref=e3049]: "0"
                  - button "Sep 11, 2026 · 0 runs started" [ref=e3050] [cursor=pointer]:
                    - generic [ref=e3051]: "0"
                  - button "Sep 12, 2026 · 0 runs started" [ref=e3052] [cursor=pointer]:
                    - generic [ref=e3053]: "0"
                  - button "Sep 13, 2026 · 0 runs started" [ref=e3054] [cursor=pointer]:
                    - generic [ref=e3055]: "0"
                  - button "Sep 14, 2026 · 0 runs started" [ref=e3056] [cursor=pointer]:
                    - generic [ref=e3057]: "0"
                  - button "Sep 15, 2026 · 1 run started · 1 completed" [ref=e3058] [cursor=pointer]:
                    - generic [ref=e3059]: "1"
                  - button "Sep 16, 2026 · 0 runs started" [ref=e3060] [cursor=pointer]:
                    - generic [ref=e3061]: "0"
                  - button "Sep 17, 2026 · 0 runs started" [ref=e3062] [cursor=pointer]:
                    - generic [ref=e3063]: "0"
                  - button "Sep 18, 2026 · 0 runs started" [ref=e3064] [cursor=pointer]:
                    - generic [ref=e3065]: "0"
                  - button "Sep 19, 2026 · 0 runs started" [ref=e3066] [cursor=pointer]:
                    - generic [ref=e3067]: "0"
                  - button "Sep 20, 2026 · 0 runs started" [ref=e3068] [cursor=pointer]:
                    - generic [ref=e3069]: "0"
                  - button "Sep 21, 2026 · 0 runs started" [ref=e3070] [cursor=pointer]:
                    - generic [ref=e3071]: "0"
                  - button "Sep 22, 2026 · 0 runs started" [ref=e3072] [cursor=pointer]:
                    - generic [ref=e3073]: "0"
                  - button "Sep 23, 2026 · 0 runs started" [ref=e3074] [cursor=pointer]:
                    - generic [ref=e3075]: "0"
                  - button "Sep 24, 2026 · 0 runs started" [ref=e3076] [cursor=pointer]:
                    - generic [ref=e3077]: "0"
                  - button "Sep 25, 2026 · 0 runs started" [ref=e3078] [cursor=pointer]:
                    - generic [ref=e3079]: "0"
                  - button "Sep 26, 2026 · 2 runs started · 2 completed" [ref=e3080] [cursor=pointer]:
                    - generic [ref=e3081]: "2"
                  - button "Sep 27, 2026 · 0 runs started" [ref=e3082] [cursor=pointer]:
                    - generic [ref=e3083]: "0"
                  - button "Sep 28, 2026 · 0 runs started" [ref=e3084] [cursor=pointer]:
                    - generic [ref=e3085]: "0"
                  - button "Sep 29, 2026 · 0 runs started" [ref=e3086] [cursor=pointer]:
                    - generic [ref=e3087]: "0"
                  - button "Sep 30, 2026 · 0 runs started" [ref=e3088] [cursor=pointer]:
                    - generic [ref=e3089]: "0"
                  - button "Oct 1, 2026 · 0 runs started" [ref=e3090] [cursor=pointer]:
                    - generic [ref=e3091]: "0"
                  - button "Oct 2, 2026 · 0 runs started" [ref=e3092] [cursor=pointer]:
                    - generic [ref=e3093]: "0"
                  - button "Oct 3, 2026 · 0 runs started" [ref=e3094] [cursor=pointer]:
                    - generic [ref=e3095]: "0"
                  - button "Oct 4, 2026 · 0 runs started" [ref=e3096] [cursor=pointer]:
                    - generic [ref=e3097]: "0"
                  - button "Oct 5, 2026 · 0 runs started" [ref=e3098] [cursor=pointer]:
                    - generic [ref=e3099]: "0"
                  - button "Oct 6, 2026 · 0 runs started" [ref=e3100] [cursor=pointer]:
                    - generic [ref=e3101]: "0"
                  - button "Oct 7, 2026 · 1 run started · 1 completed" [ref=e3102] [cursor=pointer]:
                    - generic [ref=e3103]: "1"
                  - button "Oct 8, 2026 · 0 runs started" [ref=e3104] [cursor=pointer]:
                    - generic [ref=e3105]: "0"
                  - button "Oct 9, 2026 · 0 runs started" [ref=e3106] [cursor=pointer]:
                    - generic [ref=e3107]: "0"
                  - button "Oct 10, 2026 · 0 runs started" [ref=e3108] [cursor=pointer]:
                    - generic [ref=e3109]: "0"
                  - button "Oct 11, 2026 · 0 runs started" [ref=e3110] [cursor=pointer]:
                    - generic [ref=e3111]: "0"
                  - button "Oct 12, 2026 · 0 runs started" [ref=e3112] [cursor=pointer]:
                    - generic [ref=e3113]: "0"
                  - button "Oct 13, 2026 · 0 runs started" [ref=e3114] [cursor=pointer]:
                    - generic [ref=e3115]: "0"
                  - button "Oct 14, 2026 · 0 runs started" [ref=e3116] [cursor=pointer]:
                    - generic [ref=e3117]: "0"
                  - button "Oct 15, 2026 · 0 runs started" [ref=e3118] [cursor=pointer]:
                    - generic [ref=e3119]: "0"
                  - button "Oct 16, 2026 · 0 runs started" [ref=e3120] [cursor=pointer]:
                    - generic [ref=e3121]: "0"
                  - button "Oct 17, 2026 · 0 runs started" [ref=e3122] [cursor=pointer]:
                    - generic [ref=e3123]: "0"
                  - button "Oct 18, 2026 · 2 runs started · 2 completed" [ref=e3124] [cursor=pointer]:
                    - generic [ref=e3125]: "2"
                  - button "Oct 19, 2026 · 0 runs started" [ref=e3126] [cursor=pointer]:
                    - generic [ref=e3127]: "0"
                  - button "Oct 20, 2026 · 0 runs started" [ref=e3128] [cursor=pointer]:
                    - generic [ref=e3129]: "0"
                  - button "Oct 21, 2026 · 0 runs started" [ref=e3130] [cursor=pointer]:
                    - generic [ref=e3131]: "0"
                  - button "Oct 22, 2026 · 0 runs started" [ref=e3132] [cursor=pointer]:
                    - generic [ref=e3133]: "0"
                  - button "Oct 23, 2026 · 0 runs started" [ref=e3134] [cursor=pointer]:
                    - generic [ref=e3135]: "0"
                  - button "Oct 24, 2026 · 0 runs started" [ref=e3136] [cursor=pointer]:
                    - generic [ref=e3137]: "0"
                  - button "Oct 25, 2026 · 0 runs started" [ref=e3138] [cursor=pointer]:
                    - generic [ref=e3139]: "0"
                  - button "Oct 26, 2026 · 2 runs started · 2 completed" [ref=e3140] [cursor=pointer]:
                    - generic [ref=e3141]: "2"
                  - button "Oct 27, 2026 · 0 runs started" [ref=e3142] [cursor=pointer]:
                    - generic [ref=e3143]: "0"
                  - button "Oct 28, 2026 · 0 runs started" [ref=e3144] [cursor=pointer]:
                    - generic [ref=e3145]: "0"
                  - button "Oct 29, 2026 · 0 runs started" [ref=e3146] [cursor=pointer]:
                    - generic [ref=e3147]: "0"
                  - button "Oct 30, 2026 · 0 runs started" [ref=e3148] [cursor=pointer]:
                    - generic [ref=e3149]: "0"
                  - button "Oct 31, 2026 · 1 run started · 1 cancelled" [ref=e3150] [cursor=pointer]:
                    - generic [ref=e3151]: "1"
                  - button "Nov 1, 2026 · 0 runs started" [ref=e3152] [cursor=pointer]:
                    - generic [ref=e3153]: "0"
                  - button "Nov 2, 2026 · 0 runs started" [ref=e3154] [cursor=pointer]:
                    - generic [ref=e3155]: "0"
                  - button "Nov 3, 2026 · 2 runs started · 1 completed, 1 failed" [ref=e3156] [cursor=pointer]:
                    - generic [ref=e3157]: "2"
                  - button "Nov 4, 2026 · 0 runs started" [ref=e3158] [cursor=pointer]:
                    - generic [ref=e3159]: "0"
                  - button "Nov 5, 2026 · 0 runs started" [ref=e3160] [cursor=pointer]:
                    - generic [ref=e3161]: "0"
                  - button "Nov 6, 2026 · 1 run started · 1 completed" [ref=e3162] [cursor=pointer]:
                    - generic [ref=e3163]: "1"
                  - button "Nov 7, 2026 · 0 runs started" [ref=e3164] [cursor=pointer]:
                    - generic [ref=e3165]: "0"
                  - button "Nov 8, 2026 · 2 runs started · 2 running" [ref=e3166] [cursor=pointer]:
                    - generic [ref=e3167]: "2"
                  - button "Nov 9, 2026 · 2 runs started · 2 running" [pressed] [ref=e3168] [cursor=pointer]:
                    - generic [ref=e3169]: "2"
                  - button "Nov 10, 2026 · 0 runs started" [ref=e3170] [cursor=pointer]:
                    - generic [ref=e3171]: "0"
              - generic [ref=e3172]:
                - text: Inspect history date
                - textbox "Inspect history date" [ref=e3173]: 2026-11-09
              - generic [ref=e3174]:
                - status [ref=e3175]: Nov 9, 2026 · 2 runs started · 2 running
                - figure "Color intensity indicates daily run count" [ref=e3176]:
                  - generic [ref=e3177]: Less
                  - generic [ref=e3183]: More
              - generic [ref=e3184]:
                - generic [ref=e3185]:
                  - heading "Nov 9, 2026" [level=3] [ref=e3186]
                  - link "View 2 runs" [ref=e3187] [cursor=pointer]:
                    - /url: /runs?startedOn=2026-11-09
                - list [ref=e3190]:
                  - listitem [ref=e3191]:
                    - link "kazakh-sft-005" [ref=e3192] [cursor=pointer]:
                      - /url: /runs/kazakh-sft-005
                    - generic [ref=e3195]: Running
                    - time [ref=e3196]: 08:00 UTC
                  - listitem [ref=e3197]:
                    - link "kazakh-sft-006" [ref=e3198] [cursor=pointer]:
                      - /url: /runs/kazakh-sft-006
                    - generic [ref=e3201]: Running
                    - time [ref=e3202]: 08:00 UTC
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
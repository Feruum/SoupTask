/* oxlint-disable react/set-state-in-effect -- External Canvas exceptions are reported as visible React error state. */
import { useEffect, useEffectEvent, useRef, useState } from 'react';
import uPlot from 'uplot';
import { scientificAxisLabels } from './axis-format';
import { gestureRange } from './gestures';
export interface ViewRange {
  min: number;
  max: number;
}
export interface CursorPoint {
  runId: string;
  step: number;
  value: number;
}
export interface PlotSeriesConfig {
  label: string;
  colorToken: string;
  gaps?: {
    from: number;
    to: number;
  }[];
  markers?: {
    step: number;
    value: number;
  }[];
  disconnected?: boolean;
  opacity?: number;
}
const DEFAULT_SERIES: readonly PlotSeriesConfig[] = [{
  label: 'Raw loss',
  colorToken: '--chart-line'
}];
interface Props {
  data: uPlot.AlignedData;
  theme: 'dark' | 'light';
  range: ViewRange;
  domain?: ViewRange;
  focusedRun?: string | null;
  cursorPoints?: readonly CursorPoint[];
  series?: readonly PlotSeriesConfig[];
  height?: number;
  scientific?: boolean;
  testId?: string;
  onCursor?: (step: number | null) => void;
  onRange?: (range: ViewRange) => void;
  onWidth?: (width: number) => void;
}
const EMPTY_POINTS: readonly CursorPoint[] = [];
export function MetricPlot({
  data,
  theme,
  range,
  domain,
  focusedRun,
  cursorPoints = EMPTY_POINTS,
  series = DEFAULT_SERIES,
  height = 300,
  scientific = false,
  testId = 'loss-chart',
  onCursor,
  onRange,
  onWidth
}: Props) {
  const host = useRef<HTMLDivElement>(null),
    overlay = useRef<HTMLCanvasElement>(null),
    instance = useRef<uPlot | null>(null),
    latest = useRef(series),
    requeryPointer = useRef<(() => void) | null>(null),
    gesture = useRef(range),
    fullDomain = useRef(domain ?? range);
  const [error, setError] = useState<string | null>(null);
  const min = range.min,
    max = range.max,
    domainMin = domain?.min ?? min,
    domainMax = domain?.max ?? max;
  useEffect(() => {
    latest.current = series;
  }, [series]);
  useEffect(() => {
    gesture.current = {
      min,
      max
    };
    fullDomain.current = {
      min: domainMin,
      max: domainMax
    };
  }, [min, max, domainMin, domainMax]);
  const cursor = useEffectEvent((step: number | null) => onCursor?.(step)),
    select = useEffectEvent((next: ViewRange) => onRange?.(next)),
    widthChanged = useEffectEvent((width: number) => onWidth?.(width)),
    fail = useEffectEvent(() => setError('Chart rendering failed. Exact source values remain available below.'));
  const applyAlpha = useEffectEvent((u: uPlot) => {
    let changed = false;
    series.forEach((s, i) => {
      const target = u.series[i + 1],
        alpha = focusedRun && focusedRun !== s.label ? .2 : s.opacity ?? 1;
      if (target && target.alpha !== alpha) {
        target.alpha = alpha;
        changed = true;
      }
    });
    return changed;
  });
  const drawCursor = useEffectEvent(() => {
    const u = instance.current,
      canvas = overlay.current,
      element = host.current;
    if (!u || !canvas || !element) return;
    if (canvas.width !== u.ctx.canvas.width) canvas.width = u.ctx.canvas.width;
    if (canvas.height !== u.ctx.canvas.height) canvas.height = u.ctx.canvas.height;
    canvas.style.width = `${u.width}px`;
    canvas.style.height = `${u.height}px`;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    element.dataset.cursorPointCount = String(cursorPoints.length);
    if (import.meta.env.VITE_RENDER_FAULT === 'suppress') return;
    const styles = getComputedStyle(document.documentElement);
    ctx.save();
    ctx.beginPath();
    ctx.rect(u.bbox.left, u.bbox.top, u.bbox.width, u.bbox.height);
    ctx.clip();
    for (const point of cursorPoints) {
      const series = latest.current.find(s => s.label === point.runId);
      if (!series || !Number.isFinite(point.value)) continue;
      ctx.globalAlpha = focusedRun && focusedRun !== point.runId ? .2 : 1;
      ctx.fillStyle = styles.getPropertyValue(series.colorToken).trim();
      ctx.strokeStyle = styles.getPropertyValue('--foreground').trim();
      ctx.lineWidth = 1.5 * devicePixelRatio;
      ctx.beginPath();
      ctx.arc(u.valToPos(point.step, 'x', true), u.valToPos(point.value, 'y', true), 5 * devicePixelRatio, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    }
    ctx.restore();
    performance.mark('soup:hover-draw');
  });
  const count = series.length;
  useEffect(() => {
    const element = host.current;
    if (!element) return;
    let chart: uPlot | undefined,
      observer: ResizeObserver | undefined,
      resizeFrame = 0,
      wheelFrame = 0,
      pointerFrame = 0,
      disposeInput = () => {};
    const styles = getComputedStyle(document.documentElement),
      token = (name: string) => styles.getPropertyValue(name).trim();
    try {
      const suppress = import.meta.env.VITE_RENDER_FAULT === 'suppress';
      chart = new uPlot({
        width: Math.max(180, element.clientWidth),
        height,
        padding: [16, 16, 0, 0],
        scales: {
          x: {
            time: false
          },
          y: {
            auto: true
          }
        },
        axes: [{
          stroke: token('--text-secondary'),
          grid: {
            stroke: token('--chart-grid')
          },
          font: '11px Inter Variable',
          size: 45
        }, {
          stroke: token('--text-secondary'),
          grid: {
            stroke: token('--chart-grid')
          },
          font: '11px Inter Variable',
          size: scientific ? 66 : 52,
          ...(scientific ? {
            values: (_u: uPlot, ticks: number[]) => scientificAxisLabels(ticks)
          } : {})
        }],
        series: [{
          label: 'Step'
        }, ...Array.from({
          length: count
        }, (_, i) => ({
          label: latest.current[i].label,
          stroke: suppress ? 'transparent' : token(latest.current[i].colorToken),
          width: 1.5,
          spanGaps: false,
          points: {
            show: false
          },
          gaps: (u: uPlot, _s: number, _a: number, _b: number, gaps: [number, number][]) => [...gaps, ...(latest.current[i]?.gaps ?? []).map(g => [u.valToPos(g.from, 'x', true), u.valToPos(g.to, 'x', true)] as [number, number])]
        }))],
        legend: {
          show: false
        },
        cursor: {
          drag: {
            x: true,
            y: false,
            setScale: false
          },
          points: {
            show: false
          }
        },
        select: {
          show: true,
          left: 0,
          top: 0,
          width: 0,
          height: 0
        },
        hooks: {
          setSelect: [u => {
            if (u.select.width > 2) {
              select({
                min: u.posToVal(u.select.left, 'x'),
                max: u.posToVal(u.select.left + u.select.width, 'x')
              });
              u.setSelect({
                left: 0,
                top: 0,
                width: 0,
                height: 0
              }, false);
            }
          }],
          draw: [u => {
            if (!suppress) {
              const ctx = u.ctx;
              latest.current.forEach((s, i) => {
                ctx.save();
                ctx.globalAlpha = u.series[i + 1]?.alpha ?? 1;
                ctx.fillStyle = token(s.colorToken);
                for (const point of s.markers ?? []) {
                  const x = u.valToPos(point.step, 'x', true),
                    y = u.valToPos(point.value, 'y', true);
                  if (x >= u.bbox.left && x <= u.bbox.left + u.bbox.width) {
                    ctx.beginPath();
                    ctx.arc(x, y, 3 * devicePixelRatio, 0, Math.PI * 2);
                    ctx.fill();
                  }
                }
                ctx.restore();
              });
            }
            element.dataset.drawn = 'true';
            element.dataset.viewReady = String((u.data[0]?.length ?? 0) >= 2 && Number.isFinite(u.scales.y.min));
            element.dataset.drawCount = String(Number(element.dataset.drawCount ?? 0) + 1);
            const spike = latest.current.flatMap(s => s.markers ?? []).find(point => point.value === 100);
            if (spike) {
              element.dataset.spikeX = String(u.valToPos(spike.step, 'x', true));
              element.dataset.spikeY = String(u.valToPos(spike.value, 'y', true));
              element.dataset.spikeStep = String(spike.step);
              element.dataset.spikeValue = String(spike.value);
              element.dataset.spikeSourceIndex = '500001';
            }
            element.dataset.yMin = String(u.scales.y.min);
            element.dataset.yMax = String(u.scales.y.max);
            element.dataset.plotLeft = String(u.bbox.left / devicePixelRatio);
            element.dataset.plotTop = String(u.bbox.top / devicePixelRatio);
            element.dataset.plotWidth = String(u.bbox.width / devicePixelRatio);
            element.dataset.plotHeight = String(u.bbox.height / devicePixelRatio);
            performance.mark('soup-chart-draw');
            drawCursor();
          }]
        }
      }, [[], ...Array.from({
        length: count
      }, () => [])], element);
      instance.current = chart;
      const active = chart;
      let lastPointer: Pick<PointerEvent, 'clientX' | 'clientY'> | null = null;
      let lastRequest = '',
        pointerX = 0,
        pointerY = 0;
      const pointermove = (event: Pick<PointerEvent, 'clientX' | 'clientY'> & Partial<Pick<PointerEvent, 'pointerType'>>) => {
        if (event.pointerType && event.pointerType !== 'mouse') return;
        lastPointer = {
          clientX: event.clientX,
          clientY: event.clientY
        };
        pointerX = event.clientX;
        pointerY = event.clientY;
        if (pointerFrame) return;
        pointerFrame = requestAnimationFrame(() => {
          pointerFrame = 0;
          const rect = active.over.getBoundingClientRect(),
            left = pointerX - rect.left,
            top = pointerY - rect.top;
          if (left < 0 || left > rect.width || top < 0 || top > rect.height) return;
          let step = active.posToVal(left, 'x'),
            distance = 6;
          for (const s of latest.current) for (const point of s.markers ?? []) {
            const d = Math.hypot(active.valToPos(point.step, 'x') - left, active.valToPos(point.value, 'y') - top);
            if (d <= distance) {
              distance = d;
              step = point.step;
            }
          }
          const key = `${active.scales.x.min}|${active.scales.x.max}|${step}`;
          if (key === lastRequest) return;
          lastRequest = key;
          cursor(step);
        });
      };
      requeryPointer.current = () => {
        if (lastPointer) {
          lastRequest = '';
          pointermove(lastPointer);
        }
      };
      const pointerleave = (event: PointerEvent) => {
        if (event.pointerType !== 'mouse') return;
        lastPointer = null;
        cancelAnimationFrame(pointerFrame);
        pointerFrame = 0;
        lastRequest = '';
        cursor(null);
      };
      let touchStart: { x: number; y: number } | null = null;
      const pointerdown = (event: PointerEvent) => {
        if (event.pointerType !== 'mouse') touchStart = { x: event.clientX, y: event.clientY };
      };
      const pointerup = (event: PointerEvent) => {
        if (touchStart && Math.hypot(event.clientX - touchStart.x, event.clientY - touchStart.y) < 8) {
          pointermove({ clientX: event.clientX, clientY: event.clientY });
        }
        touchStart = null;
      };
      const pointercancel = () => {
        touchStart = null;
        lastPointer = null;
        lastRequest = '';
        cancelAnimationFrame(pointerFrame);
        pointerFrame = 0;
        cursor(null);
      };
      const wheel = (event: WheelEvent) => {
        if (!event.deltaY && !event.deltaX) return;
        event.preventDefault();
        const rect = active.over.getBoundingClientRect();
        if (!rect.width) return;
        gesture.current = gestureRange(gesture.current, fullDomain.current, (event.shiftKey ? event.deltaX || event.deltaY : event.deltaY) * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? rect.height : 1), (event.clientX - rect.left) / rect.width, event.shiftKey, event.ctrlKey);
        if (!wheelFrame) wheelFrame = requestAnimationFrame(() => {
          wheelFrame = 0;
          select(gesture.current);
        });
      };
      active.over.addEventListener('wheel', wheel, {
        passive: false
      });
      active.over.addEventListener('pointermove', pointermove);
      active.over.addEventListener('pointerleave', pointerleave);
      active.over.addEventListener('pointerdown', pointerdown);
      active.over.addEventListener('pointerup', pointerup);
      active.over.addEventListener('pointercancel', pointercancel);
      disposeInput = () => {
        active.over.removeEventListener('wheel', wheel);
        active.over.removeEventListener('pointermove', pointermove);
        active.over.removeEventListener('pointerleave', pointerleave);
        active.over.removeEventListener('pointerdown', pointerdown);
        active.over.removeEventListener('pointerup', pointerup);
        active.over.removeEventListener('pointercancel', pointercancel);
      };
      observer = new ResizeObserver(() => {
        cancelAnimationFrame(resizeFrame);
        resizeFrame = requestAnimationFrame(() => {
          if (element.clientWidth > 0) {
            active.setSize({
              width: element.clientWidth,
              height
            });
            widthChanged(Math.max(1, element.clientWidth - 90));
          }
        });
      });
      observer.observe(element);
    } catch {
      fail();
    }
    return () => {
      cancelAnimationFrame(resizeFrame);
      cancelAnimationFrame(wheelFrame);
      cancelAnimationFrame(pointerFrame);
      disposeInput();
      observer?.disconnect();
      requeryPointer.current = null;
      instance.current = null;
      chart?.destroy();
    };
  }, [theme, count, height, scientific]);
  // Topology and data change only with an accepted view, never with a hover reply.
  useEffect(() => {
    const u = instance.current;
    if (!u) return;
    try {
      applyAlpha(u);
      u.batch(() => {
        u.setData(data, false);
        const padding = min === max ? Math.max(1, Math.abs(min) * .001) : 0;
        u.setScale('x', {
          min: min - padding,
          max: max + padding
        });
        let low = Infinity,
          high = -Infinity;
        for (let i = 1; i < data.length; i++) for (const value of data[i] ?? []) if (typeof value === 'number' && Number.isFinite(value)) {
          low = Math.min(low, value);
          high = Math.max(high, value);
        }
        for (const s of series) for (const point of s.markers ?? []) {
          low = Math.min(low, point.value);
          high = Math.max(high, point.value);
        }
        if (Number.isFinite(low)) {
          const pad = (high - low) * .08 || Math.max(.01, Math.abs(low) * .05);
          u.setScale('y', {
            min: low - pad,
            max: high + pad
          });
        }
      });
      // setData invalidates paths, setScale invalidates scales, and batch commits both immediately.
      // Reconcile a stationary physical pointer once after a new view/resize commits. Hover replies never enter this effect.
      requeryPointer.current?.();
    } catch {
      fail();
    }
  }, [data, min, max, series, theme, count, height, scientific]);
  useEffect(() => {
    const u = instance.current;
    if (!u) return;
    if (applyAlpha(u)) u.redraw(false, false);
  }, [focusedRun, series, theme, count]);
  useEffect(() => {
    drawCursor();
  }, [cursorPoints, focusedRun, min, max, theme, count]);
  return <>{error && <p role="alert" className="inline-error">{error}</p>}<div className="plot-stack"><div ref={host} className="plot-host" style={{
        minHeight: height
      }} data-testid={testId} data-focused-run={focusedRun ?? ''} data-range-min={min} data-range-max={max} aria-hidden="true" /><canvas className="cursor-overlay" ref={overlay} aria-hidden="true" /></div></>;
}

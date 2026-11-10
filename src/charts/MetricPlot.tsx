import {performanceMark} from '@/app/performance'
import {cursorForView, type createCursorStore} from '@/worker/cursor-store';
import type {Metric} from '@/data/types';
import type {WorkspaceView} from '@/worker/protocol';
/* oxlint-disable react/set-state-in-effect -- External Canvas exceptions are reported as visible React error state. */
import { useEffect, useLayoutEffect, useEffectEvent, useRef, useState } from 'react';
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
  yBounds?: ViewRange;
  focusedRun?: string | null;
  cursorPoints?: readonly CursorPoint[];
  cursorStore?: ReturnType<typeof createCursorStore>;
  cursorMetric?: Metric;
  cursorVisible?: boolean;
  series?: readonly PlotSeriesConfig[];
  height?: number;
  scientific?: boolean;
  testId?: string;
  viewToken?: object;
  onCursor?: (step: number | null, origin: object | null) => void;
  onCursorGrid?: (steps:number[],origin:object|null)=>void;
  onRange?: (range: ViewRange) => void;
  onWidth?: (width: number) => void;
}
const EMPTY_POINTS: readonly CursorPoint[] = [];
export function MetricPlot({
  data,
  theme,
  range,
  domain,
  yBounds,
  focusedRun,
  cursorPoints = EMPTY_POINTS,
  cursorStore, cursorMetric, cursorVisible = true,
  series = DEFAULT_SERIES,
  height = 300,
  scientific = false,
  testId = 'loss-chart',
  viewToken,
  onCursor,
  onCursorGrid,
  onRange,
  onWidth
}: Props) {
  const host = useRef<HTMLDivElement>(null),
    overlay = useRef<HTMLCanvasElement>(null),
    instance = useRef<uPlot | null>(null),
    appliedView = useRef<object | null>(null),
    latest = useRef(series),
    requeryPointer = useRef<(() => void) | null>(null),
    gesture = useRef(range),
    fullDomain = useRef(domain ?? range);
  const [error, setError] = useState<string | null>(null);
  const cursorInk = useRef<{x:number;y:number;r:number}[]>([]);
  const cursorInViewport = useRef(true);
  const cursorPalette = useRef({foreground:'',colors:new Map<string,string>()});
  const min = range.min,
    max = range.max,
    sourceYMin=yBounds?.min,
    sourceYMax=yBounds?.max,
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
  const cursor = useEffectEvent((step: number | null) => onCursor?.(step, appliedView.current)),
    cursorGrid = useEffectEvent((steps:number[])=>onCursorGrid?.(steps,appliedView.current)),
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
    if(!cursorInViewport.current){
      if(cursorInk.current.length){const ctx=canvas.getContext('2d');if(ctx)for(const p of cursorInk.current)ctx.clearRect(Math.floor(p.x-p.r),Math.floor(p.y-p.r),Math.ceil(p.r*2+2),Math.ceil(p.r*2+2));cursorInk.current=[];}
      if(element.dataset.cursorDeferred!=='true')element.dataset.cursorDeferred='true';
      if(element.dataset.cursorPointCount!=='0')element.dataset.cursorPointCount='0';
      return;
    }
    if (canvas.width !== u.ctx.canvas.width) {canvas.width = u.ctx.canvas.width;cursorInk.current=[];}
    if (canvas.height !== u.ctx.canvas.height) {canvas.height = u.ctx.canvas.height;cursorInk.current=[];}
    if(canvas.style.width!==`${u.width}px`)canvas.style.width = `${u.width}px`;
    if(canvas.style.height!==`${u.height}px`)canvas.style.height = `${u.height}px`;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    for(const p of cursorInk.current)ctx.clearRect(Math.floor(p.x-p.r),Math.floor(p.y-p.r),Math.ceil(p.r*2+2),Math.ceil(p.r*2+2));
    cursorInk.current=[];
    const live = cursorStore ? cursorForView(cursorStore.getSnapshot(), appliedView.current as WorkspaceView | null) : null;
    const points = cursorStore ? cursorStore.getPointerActive() && cursorMetric && live && live.view === viewToken ? latest.current.flatMap(series => {
      const row = live.hover[series.label]?.[0];
      return row && Number.isFinite(row[cursorMetric]) ? [{runId:series.label,step:row.step,value:row[cursorMetric]}] : [];
    }) : [] : cursorPoints;
    if(element.dataset.cursorPointCount!==String(points.length))element.dataset.cursorPointCount = String(points.length);
    if(element.dataset.cursorDeferred!=='false')element.dataset.cursorDeferred='false';
    if (import.meta.env.VITE_RENDER_FAULT === 'suppress') return;
    ctx.save();
    ctx.beginPath();
    ctx.rect(u.bbox.left, u.bbox.top, u.bbox.width, u.bbox.height);
    ctx.clip();
    for (const point of points) {
      const series = latest.current.find(s => s.label === point.runId);
      if (!series || !Number.isFinite(point.value)) continue;
      ctx.globalAlpha = focusedRun && focusedRun !== point.runId ? .2 : 1;
      ctx.fillStyle = cursorPalette.current.colors.get(series.colorToken)??'#fff';
      ctx.strokeStyle = cursorPalette.current.foreground;
      ctx.lineWidth = 1.5 * devicePixelRatio;
      ctx.beginPath();
      const x=u.valToPos(point.step,'x',true),y=u.valToPos(point.value,'y',true);
      ctx.arc(x,y, 5 * devicePixelRatio, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      cursorInk.current.push({x,y,r:8*devicePixelRatio});
    }
    ctx.restore();
    performanceMark('soup:hover-draw');
  });
  useLayoutEffect(() => {
    if (!cursorStore) return;
    const unsubscribe=cursorStore.subscribe(() => drawCursor()),visibility=cursorStore.subscribeVisibility(()=>drawCursor());
    return()=>{unsubscribe();visibility()};
  }, [cursorStore]);
  const count = series.length;
  useEffect(() => {
    const element = host.current;
    if (!element) return;
    const cursorCanvas = overlay.current;
    let chart: uPlot | undefined,
      observer: ResizeObserver | undefined,
      visibilityObserver: IntersectionObserver | undefined,
      resizeFrame = 0,
      wheelFrame = 0,
      disposeInput = () => {};
    const nativeMouseups = new Map<HTMLElement, uPlot.Cursor.MouseListener>();
    const styles = getComputedStyle(document.documentElement),
      token = (name: string) => styles.getPropertyValue(name).trim();
    cursorPalette.current={foreground:token('--foreground'),colors:new Map([...new Set(['--chart-line','--chart-teal','--chart-ochre','--chart-purple',...latest.current.map(s=>s.colorToken)])].map(name=>[name,token(name)]))};
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
          size: 66,
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
          // The hidden uPlot legend/hover dots need no reduced-series scan through foreign alignment slots.
          // Authoritative numeric-step observations and visible markers come from the guarded Worker cursor.
          dataIdx: () => null,
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
            performanceMark('soup-chart-draw');
            drawCursor();
          }]
        }
      }, [[], ...Array.from({
        length: count
      }, () => [])], element);
      instance.current = chart;
      cursorInViewport.current=true;
      const active = chart;
      const bindMouseup = active.cursor.bind?.mouseup;
      if (bindMouseup) active.cursor.bind = {
        ...active.cursor.bind,
        mouseup: (...args: Parameters<uPlot.Cursor.MouseListenerFactory>) => {
          // Forward the library's actual arguments (including its untyped onlyTarget flag).
          const listener: ReturnType<uPlot.Cursor.MouseListenerFactory> = Reflect.apply(bindMouseup, undefined, args);
          if (listener) nativeMouseups.set(args[1], listener);
          return listener;
        }
      };
      let lastPointer: Pick<PointerEvent, 'clientX' | 'clientY'> | null = null;
      let lastRequest = '';
      const pointermove = (event: Pick<PointerEvent, 'clientX' | 'clientY'> & Partial<Pick<PointerEvent, 'pointerType'|'offsetX'|'offsetY'|'target'>>) => {
        if (event.pointerType && event.pointerType !== 'mouse') return;
        lastPointer = {
          clientX: event.clientX,
          clientY: event.clientY
        };
          const native=event.target===active.over&&typeof event.offsetX==='number'&&typeof event.offsetY==='number';
          const rect=native?null:active.over.getBoundingClientRect();
          const left=native?event.offsetX!:event.clientX-rect!.left,top=native?event.offsetY!:event.clientY-rect!.top;
          const width=rect?rect.width:active.bbox.width/devicePixelRatio,height=rect?rect.height:active.bbox.height/devicePixelRatio;
          if (!width || !height || left < 0 || left > width || top < 0 || top > height) return;
          // Cursor resolution follows physical display pixels; source values themselves are never rounded.
          let step = active.posToVal(Math.round(left*devicePixelRatio)/devicePixelRatio, 'x'),
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
          // The controller already bounds/coalesces requests. A second RAF queue adds latency.
          cursor(step);
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
      // On supporting secure origins, raw input arrives before frame-coalesced pointermove.
      // lastRequest deduplicates the later event; the controller still bounds all work.
      const rawInput = 'onpointerrawupdate' in window;
      const rawMove = (event:Event) => { if (event instanceof PointerEvent) pointermove(event); };
      if (rawInput) active.over.addEventListener('pointerrawupdate', rawMove, {passive:true});
      active.over.addEventListener('pointerleave', pointerleave);
      active.over.addEventListener('pointerdown', pointerdown);
      active.over.addEventListener('pointerup', pointerup);
      active.over.addEventListener('pointercancel', pointercancel);
      disposeInput = () => {
        active.over.removeEventListener('wheel', wheel);
        active.over.removeEventListener('pointermove', pointermove);
        if (rawInput) active.over.removeEventListener('pointerrawupdate', rawMove);
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
            requeryPointer.current?.();
          }
        });
      });
      observer.observe(element);
      if(typeof IntersectionObserver!=='undefined'){
        visibilityObserver=new IntersectionObserver(entries=>{
          if(instance.current!==active)return;
          const entry=entries.at(-1);if(!entry)return;
          cursorInViewport.current=entry.isIntersecting;
          // Reveal only after repainting the latest accepted source snapshot; no stale dots flash on scroll.
          drawCursor();
        });
        visibilityObserver.observe(element);
      }
    } catch {
      fail();
    }
    return () => {
      cancelAnimationFrame(resizeFrame);
      cancelAnimationFrame(wheelFrame);
      disposeInput();
      for (const [target, listener] of nativeMouseups) target.removeEventListener('mouseup', listener);
      nativeMouseups.clear();
      observer?.disconnect();
      visibilityObserver?.disconnect();
      requeryPointer.current = null;
      instance.current = null;
      appliedView.current = null;
      const canvases = [...element.querySelectorAll('canvas'), ...(cursorCanvas ? [cursorCanvas] : [])];
      chart?.destroy();
      // Retired DOM may outlive the plot (React alternates, inspectors, consumers).
      // Release its native bitmap storage now rather than waiting for node GC.
      for (const canvas of canvases) { canvas.width = 0; canvas.height = 0; }
      cursorInk.current = [];
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
        let low = sourceYMin??Infinity,
          high = sourceYMax??-Infinity;
        if(!Number.isFinite(low)||!Number.isFinite(high)){
        for (let i = 1; i < data.length; i++) for (const value of data[i] ?? []) if (typeof value === 'number' && Number.isFinite(value)) {
          low = Math.min(low, value);
          high = Math.max(high, value);
        }
        for (const s of series) for (const point of s.markers ?? []) {
          low = Math.min(low, point.value);
          high = Math.max(high, point.value);
        }
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
      appliedView.current = viewToken ?? null;
      const columns=Math.floor(u.over.clientWidth*devicePixelRatio),stride=Math.max(1,Math.ceil((columns+1)/2048)),targets:number[]=[];
      if(columns>0){
        for(let pixel=0;pixel<=columns;pixel+=stride)targets.push(u.posToVal(pixel/devicePixelRatio,'x'));
        for(const s of latest.current)for(const point of (s.markers??[]).slice(0,64))targets.push(point.step);
        cursorGrid([...new Set(targets)].filter(Number.isFinite).slice(0,2304));
      }
      // Reconcile a stationary physical pointer once after a new view/resize commits. Hover replies never enter this effect.
      requeryPointer.current?.();
    } catch {
      fail();
    }
  }, [data, min, max, sourceYMin, sourceYMax, series, theme, count, height, scientific, viewToken]);
  useEffect(() => {
    const u = instance.current;
    if (!u) return;
    if (applyAlpha(u)) u.redraw(false, false);
  }, [focusedRun, series, theme, count]);
  useEffect(() => {
    drawCursor();
  }, [cursorPoints, cursorVisible, focusedRun, min, max, theme, count]);
  return <>{error && <p role="alert" className="inline-error">{error}</p>}<div className="plot-stack"><div ref={host} className="plot-host" style={{
        minHeight: height
      }} data-testid={testId} data-focused-run={focusedRun ?? ''} data-range-min={min} data-range-max={max} aria-hidden="true" /><canvas className="cursor-overlay" ref={overlay} aria-hidden="true" /></div></>;
}

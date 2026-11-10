import {afterEach,expect,it} from 'vitest'
import {performanceMark,performanceMeasure,TIMING_ENTRY_LIMIT} from './performance'
afterEach(()=>{performance.clearMarks();performance.clearMeasures()})
it('bounds repeated timing details and measures while preserving the latest numeric endpoint',()=>{
 performance.mark('outside-monitor')
 for(let i=0;i<10000;i++){
  performanceMark('soup:test-start',{detail:{sourceIndex:i,value:-0}})
  performanceMark('soup:test-end')
  performanceMeasure('soup:test-duration','soup:test-start','soup:test-end')
 }
 expect(performance.getEntriesByName('soup:test-start').length).toBeLessThanOrEqual(TIMING_ENTRY_LIMIT)
 expect(performance.getEntriesByName('soup:test-duration').length).toBeLessThanOrEqual(TIMING_ENTRY_LIMIT)
 const latest=performance.getEntriesByName('soup:test-start').at(-1) as PerformanceMark
 expect(latest.detail.sourceIndex).toBe(9999);expect(Object.is(latest.detail.value,-0)).toBe(true)
 expect(performance.getEntriesByName('soup:test-duration').at(-1)?.startTime).toBe(latest.startTime)
 expect(performance.getEntriesByName('outside-monitor')).toHaveLength(1)
})
it('preserves numeric measurement boundaries rather than timing the bookkeeping',()=>{
 for(let i=0;i<500;i++)performanceMeasure('soup:numeric-test',{start:12,end:23,detail:{sourceIndex:i}})
 const latest=performance.getEntriesByName('soup:numeric-test').at(-1) as PerformanceMeasure
 expect(latest.startTime).toBe(12);expect(latest.duration).toBe(11);expect(latest.detail.sourceIndex).toBe(499)
 expect(performance.getEntriesByName('soup:numeric-test').length).toBeLessThanOrEqual(TIMING_ENTRY_LIMIT)
})

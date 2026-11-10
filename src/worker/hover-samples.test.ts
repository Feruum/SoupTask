import {expect,it} from 'vitest'
import {normalize} from '@/core/engine'
import {generateRun} from '@/data/generator'
import {RUNS} from '@/data/catalog'
import {prepareHoverSamples,MAX_HOVER_ROWS,MAX_HOVER_TARGETS} from './hover-samples'

it('prepares original source identities including zero, signed zero, conflicts, invalid metrics and cadence gaps',()=>{
 const run={...RUNS[0],rowCount:8,expectedCadence:1},raw=generateRun(run)
 raw.step.set([0,1,2,2,4,10,11,12]);raw.loss.set([0,-0,1,Infinity,NaN,3,4,5]);raw.lr.fill(1e-10)
 const before=Object.values(raw).map(column=>column.slice())
 const result=prepareHoverSamples(new Map([['A',normalize(raw,run)]]),[0,1.4,2,3,4,10.6],{min:0,max:12},12)
 expect(result.samples.get(0)?.A[0].sourceIndex).toBe(0)
 expect(Object.is(result.samples.get(1.4)?.A[0].loss,-0)).toBe(true)
 expect(result.samples.get(2)?.A.map(row=>row.sourceIndex)).toEqual([2,3])
 expect(result.samples.get(2)?.A[1].loss).toBe(Infinity)
 expect(result.samples.get(3)?.A).toEqual([])
 expect(result.samples.get(4)?.A[0].loss).toBeNaN()
 expect(result.samples.get(10.6)?.A[0]).toMatchObject({sourceIndex:6,step:11,loss:4,lr:1e-10})
 expect(result.rowCount).toBe(6)
 expect(Object.values(raw)).toEqual(before)
})
it('deduplicates original rows across nearby target coordinates',()=>{
 const run={...RUNS[0],rowCount:8},n=normalize(generateRun(run),run)
 const result=prepareHoverSamples(new Map([['A',n]]),[1,1.1,1.2],{min:0,max:7},8)
 expect(result.rowCount).toBe(1)
 expect(result.samples.get(1)?.A).toBe(result.samples.get(1.2)?.A)
})
it('bounds unique source rows globally and leaves uncached targets for the authoritative fallback',()=>{
 const stores=new Map(['A','B','C','D'].map(id=>{const run={...RUNS[0],id,rowCount:5000};return[id,normalize(generateRun(run),run)]as const}))
 const result=prepareHoverSamples(stores,Array.from({length:5000},(_,i)=>i),{min:0,max:4999},800)
 expect(result.rowCount).toBeLessThanOrEqual(MAX_HOVER_ROWS)
 expect(result.samples.size).toBe(4096)
 expect(result.samples.has(4096)).toBe(false)
 expect(()=>prepareHoverSamples(stores,Array.from({length:MAX_HOVER_TARGETS+1},(_,i)=>i),{min:0,max:4999},800)).toThrow()
})

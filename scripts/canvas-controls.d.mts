import type { Page } from '@playwright/test'
export const CANVAS_SPIKE_TEST_ID: string
export function assertSpikePainted(page: Page): Promise<{painted:number;x:number;y:number;sourceIndex:string|null;step:string|null;value:string|null;rgb:number[]}>

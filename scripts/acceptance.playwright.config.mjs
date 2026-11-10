import {defineConfig} from '@playwright/test'
import {readFileSync,existsSync} from 'node:fs'
import path from 'node:path'
const metadata=JSON.parse(readFileSync('reports/build-metadata.json','utf8'))
const output=path.resolve(process.env.ACCEPTANCE_OUT??'reports/acceptance')
if(existsSync(path.join(output,'results.json')))throw Error('Completed acceptance exists; choose a fresh ACCEPTANCE_OUT')
const port=Number(process.env.ACCEPTANCE_PORT??4188)
export default defineConfig({
 metadata:{sourceCommit:metadata.git?.commit,sourceHash:metadata.sourceHash,buildHash:metadata.buildHash},
 testDir:path.resolve('e2e'),testMatch:'**/*.spec.ts',fullyParallel:true,workers:2,retries:0,timeout:60000,
 forbidOnly:!!process.env.CI,
 reporter:[['list'],['json',{outputFile:path.join(output,'results.json')}]],
 outputDir:path.join(output,'artifacts'),
 use:{baseURL:`http://127.0.0.1:${port}`,locale:'en-US',timezoneId:'Asia/Qyzylorda',trace:'retain-on-failure',screenshot:'only-on-failure'},
 webServer:{cwd:process.cwd(),command:`node node_modules/vite/bin/vite.js preview --host 127.0.0.1 --port ${port} --strictPort`,url:`http://127.0.0.1:${port}`,reuseExistingServer:false}
})

import { readFile, writeFile } from 'node:fs/promises'
const input = process.env.A11Y_INPUT ?? 'reports/e2e-full.json'
const output = process.env.A11Y_OUTPUT ?? 'reports/a11y-summary.json'
const report = JSON.parse(await readFile(input, 'utf8'))
const audits = []
function walk(suites) {
  for (const suite of suites ?? []) {
    walk(suite.suites)
    for (const spec of suite.specs ?? []) for (const test of spec.tests) for (const result of test.results) for (const attachment of result.attachments ?? []) {
      if (attachment.contentType !== 'application/json' || !attachment.body) continue
      const parsed = JSON.parse(Buffer.from(attachment.body, 'base64').toString('utf8'))
      if (!parsed.testEngine?.name || !Array.isArray(parsed.violations)) continue
      audits.push({ test: spec.title, attachment: attachment.name, engine: parsed.testEngine, url: parsed.url, environment: parsed.testEnvironment, violations: parsed.violations, incomplete: parsed.incomplete })
    }
  }
}
walk(report.suites)
const incompleteCounts = {}
for (const audit of audits) for (const finding of audit.incomplete ?? []) incompleteCounts[finding.id] = (incompleteCounts[finding.id] ?? 0) + finding.nodes.length
await writeFile(output, JSON.stringify({ input, scope: 'Full axe reports, including incomplete findings, decoded from the specified production acceptance. Keyboard, Canvas and native screen-reader review are distinct.', audits: audits.length, violations: audits.reduce((sum, audit) => sum + audit.violations.length, 0), incompleteCounts, results: audits }, null, 2))
console.log(JSON.stringify({ audits: audits.length, violations: audits.reduce((sum, audit) => sum + audit.violations.length, 0), incompleteCounts }))

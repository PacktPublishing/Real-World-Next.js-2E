import { danger, warn, fail } from 'danger'

const pr = danger.github.pr
const modified = danger.git.modified_files
const created = danger.git.created_files
const allChanged = [...modified, ...created]

// 1. Keep pull requests reviewable
const changedLines = (pr.additions ?? 0) + (pr.deletions ?? 0)
if (changedLines > 600) {
  warn(
    `This PR changes ${changedLines} lines. Large PRs are hard to review well; consider splitting it.`
  )
}

// 2. Require a meaningful description
if (!pr.body || pr.body.trim().length < 10) {
  fail('Please add a description explaining what this PR does and why.')
}

// 3. Dependencies changed without the lockfile
const packageChanged = modified.includes('package.json')
const lockfileChanged = modified.includes('pnpm-lock.yaml')
if (packageChanged && !lockfileChanged) {
  warn(
    'package.json was modified without pnpm-lock.yaml. Did you forget to commit the lockfile?'
  )
}

// 4. Application code changed, but no tests were run
const appChanges = allChanged.filter(
  (file) => file.startsWith('app/') || file.startsWith('lib/')
)
const testChanges = allChanged.filter(
  (file) => file.includes('__tests__') || file.includes('.test.')
)
if (appChanges.length > 0 && testChanges.length === 0) {
  warn('Application code changed without any test changes. Intentional?')
}

// Commit only the released versions on top of the current branch head, preserving
// spec pushes that arrived while npm publishing was in progress.
const fs = require('fs')
const os = require('os')
const path = require('path')
const { execFileSync } = require('child_process')
const { setTimeout: sleep } = require('node:timers/promises')

const rootDir = path.resolve(__dirname, '..')

function git(args, cwd = rootDir) {
  return execFileSync('git', args, { cwd, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'], timeout: 60_000 }).trim()
}

async function main() {
  const branch = process.argv[2]
  if (!branch) throw new Error('Usage: node scripts/persist-versions.cjs <release-branch>')
  const released = JSON.parse(fs.readFileSync(path.join(rootDir, 'versions.json'), 'utf8'))
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'sdk-release-versions-'))
  const worktree = path.join(tempDir, 'checkout')

  try {
    for (let attempt = 1; attempt <= 3; attempt++) {
      git(['fetch', 'origin', `refs/heads/${branch}`])
      git(['worktree', 'add', '--detach', worktree, 'FETCH_HEAD'])
      try {
        const versionPath = path.join(worktree, 'versions.json')
        const versions = JSON.parse(fs.readFileSync(versionPath, 'utf8'))
        let changed = false
        for (const [key, version] of Object.entries(released)) {
          const current = versions[key] || '0.0.0'
          const a = version.split('.').map(Number)
          const b = current.split('.').map(Number)
          if ((a[0] - b[0] || a[1] - b[1] || a[2] - b[2]) > 0) {
            versions[key] = version
            changed = true
          }
        }
        if (!changed) {
          console.log('Released versions are already recorded on the branch.')
          return
        }

        fs.writeFileSync(versionPath, JSON.stringify(versions, null, 2) + '\n')
        git(['add', 'versions.json'], worktree)
        git(['commit', '-m', 'chore: publish SDK packages [skip ci]'], worktree)
        try {
          git(['push', 'origin', `HEAD:refs/heads/${branch}`], worktree)
          console.log(`Recorded released versions on ${branch}.`)
          return
        } catch (error) {
          if (attempt === 3) throw error
          console.log(`Version push failed (${attempt}/3); retrying on the latest branch head.`)
        }
      } finally {
        // Only this disposable worktree is removed; generated publish artifacts
        // and the triggering commit's spec stay intact in the original checkout.
        git(['worktree', 'remove', '--force', worktree])
      }
      await sleep(2_000)
    }
  } finally {
    fs.rmSync(tempDir, { recursive: true, force: true })
  }
}

main().catch((error) => {
  console.error(error.message)
  process.exitCode = 1
})

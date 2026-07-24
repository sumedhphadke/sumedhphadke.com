// Stop hook: typecheck before handing work back, so a turn never ends on a
// broken tree. The real gate is .githooks/pre-commit — this is the fast
// feedback loop in front of it, and it runs once per turn, not once per edit.
//
// Exit 0 = clean or nothing to do. Exit 2 = blocking, stderr goes back to Claude.
import { spawnSync } from 'node:child_process';

const stdin = await new Promise((res) => {
  let buf = '';
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', (c) => (buf += c));
  process.stdin.on('end', () => res(buf));
});

let payload = {};
try {
  payload = JSON.parse(stdin || '{}');
} catch {
  process.exit(0);
}

// Already blocked once this turn — don't block again, or the turn can't end.
if (payload.stop_hook_active) process.exit(0);

const root = process.env.CLAUDE_PROJECT_DIR ?? process.cwd();
const result = spawnSync('npx astro check', {
  cwd: root,
  shell: true,
  encoding: 'utf8',
});

if (result.status === 0) process.exit(0);

const output = `${result.stdout ?? ''}${result.stderr ?? ''}`.trim();
process.stderr.write(
  `astro check is failing — don't end the turn here. Fix these:\n\n${output}\n`
);
process.exit(2);

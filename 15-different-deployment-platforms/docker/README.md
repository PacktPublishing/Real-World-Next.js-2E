# Chapter 15 — Self-hosting with Docker

The self-hosting material from *Chapter 15, Different Deployment Platforms*:
standalone output, a multi-stage Dockerfile, and the systemd and Caddy
configuration for running it on a server we control.

## Files

| File | From the chapter |
|---|---|
| `next.config.ts` | `output: 'standalone'` and `outputFileTracingRoot` |
| `Dockerfile` | The three-stage build |
| `.dockerignore` | Keeps local state out of the build context |
| `pnpm-workspace.yaml` | `onlyBuiltDependencies: [sharp]`, the non-interactive `pnpm approve-builds` |
| `app/api/health/route.ts` | The shallow health check the proxy polls |
| `deploy/my-app.service` | The systemd unit |
| `deploy/Caddyfile` | Single instance |
| `deploy/Caddyfile.two-instances` | Round-robin across two instances for zero-downtime deploys |

## Building the image from inside this monorepo

The Dockerfile is exactly as the chapter prints it, and the chapter's context
is a single-project repository. Inside this monorepo one thing differs, and it
is the "costs an afternoon" caveat the chapter warns about, made concrete.

Because `outputFileTracingRoot` points at the workspace root, the standalone
output is nested by the path from that root:

```
.next/standalone/15-different-deployment-platforms/docker/server.js
```

rather than `.next/standalone/server.js`. The Dockerfile's `COPY` paths and
`CMD ["node", "server.js"]` assume the un-nested layout, so building this
folder as-is produces an image whose entry point isn't where the `CMD` looks.
To build it, either copy this example out of the monorepo first, or adjust the
paths to include the nested prefix.

Running the standalone server directly works either way:

```bash
pnpm --filter 15-docker build
node .next/standalone/15-different-deployment-platforms/docker/server.js
```

## The details worth not forgetting

- **`sharp`** must be installed in the runtime stage. Under `next start` it is
  picked up automatically as an optional dependency of `next`; under
  `output: 'standalone'` it is not reliably traced, and every `next/image`
  request fails at runtime.
- **`HOSTNAME`** is `0.0.0.0` in the container and `127.0.0.1` in the systemd
  unit. That is deliberate: the container needs to accept connections from
  outside itself, the server behind a local reverse proxy does not.
- **Multiple instances** need a shared ISR cache and a consistent
  `NEXT_SERVER_ACTIONS_ENCRYPTION_KEY` across every instance, or a rolling
  deploy leaves two live instances holding different keys.

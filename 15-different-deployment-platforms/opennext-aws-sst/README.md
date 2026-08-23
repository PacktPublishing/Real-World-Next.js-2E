# Chapter 15 — OpenNext on AWS with SST

The SST configuration from *Chapter 15, Different Deployment Platforms*.

`sst.config.ts` is the whole deployment definition. `sst deploy` builds the
application with OpenNext and provisions the Lambda functions, CloudFront
distribution, S3 buckets and DynamoDB table, then wires them together:

```bash
pnpm dlx sst deploy --stage production
```

## `sst.config.ts` is excluded from typechecking

The file opens with:

```ts
/// <reference path="./.sst/platform/config.d.ts" />
```

That file does not exist until SST generates it, and the `$config` and `sst`
globals come from it. Running `pnpm dlx sst install` in this directory creates
`.sst/platform/` and the reference resolves.

Until then `sst.config.ts` cannot typecheck, so it is listed in the
`exclude` array of `tsconfig.json`. Remove that entry after running
`sst install` if you want it typechecked with the rest of the project.

`pnpm --filter 15-opennext-aws-sst build` runs a normal `next build` and
passes; it does not touch AWS.

## What the single command does not absorb

Lambda is the canonical cold-start case, and a low-traffic route is exactly
where a user waits a second or more for a response that takes 40ms to compute.
Provisioned concurrency fixes it and costs money whether or not anyone visits.
CloudFront, Lambda, S3 and DynamoDB are all ours to monitor and debug, so a
production problem means reading four services' logs rather than one
platform's dashboard.

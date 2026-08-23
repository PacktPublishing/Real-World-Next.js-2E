export default {
  name: 'my-adapter',
  async modifyConfig(config) {
    return config
  },
  async onBuildComplete(build) {
    // Emit platform-specific output from a typed description
    // instead of reverse-engineering .next/
    //
    // Everything below is repository scaffolding rather than a listing from
    // the chapter: it prints what the adapter actually receives, so running
    // `pnpm --filter 15-custom-adapter build` shows the real build
    // description.
    //
    // NOTE ON SHAPE: the chapter sketches the argument as
    // `{ routes, prerenders }` and calls it "lightly simplified". On Next.js
    // 16.3.2 the top-level keys are:
    //   routing, outputs, config, distDir, buildId, nextVersion,
    //   projectDir, repoRoot
    // and the route information lives under `outputs` and `routing`, so
    // destructuring `{ routes, prerenders }` yields undefined for both.
    const { outputs, routing, buildId, nextVersion } = build

    console.log('\n[my-adapter] onBuildComplete received:')
    console.log(
      JSON.stringify(
        {
          nextVersion,
          buildId,
          counts: {
            appPages: outputs.appPages.length,
            appRoutes: outputs.appRoutes.length,
            pages: outputs.pages.length,
            pagesApi: outputs.pagesApi.length,
            prerenders: outputs.prerenders.length,
            staticFiles: outputs.staticFiles.length,
            dynamicRoutes: routing.dynamicRoutes.length,
          },
        },
        null,
        2
      )
    )
  },
}

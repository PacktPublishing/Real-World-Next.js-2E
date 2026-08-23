/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: 'my-nextjs-app',
      removal: input?.stage === 'production' ? 'retain' : 'remove',
      home: 'aws',
    }
  },
  async run() {
    new sst.aws.Nextjs('Web', {
      domain: 'acme.com',
    })
  },
})

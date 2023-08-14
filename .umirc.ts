import { defineConfig } from 'umi';

export default defineConfig({
  history: { type: 'hash' },
  hash: false,
  nodeModulesTransform: {
    type: 'none',
  },
  outputPath: '../kinger906.github.io/static/my-player',
  headScripts: [
    {
      type: 'text/javascript',
      src: 'https://cdn.bootcdn.net/ajax/libs/vConsole/3.15.0/vconsole.min.js',
    },
  ],
  routes: [
    { path: '/', component: '@/pages/login/index' },
    { path: '/main', component: '@/pages/index' },
    { path: '/detail', component: '@/pages/detail/index' },
  ],
  fastRefresh: {},
});

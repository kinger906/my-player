import { defineConfig } from 'umi';

export default defineConfig({
  history: { type: 'hash' },
  hash: false,
  nodeModulesTransform: {
    type: 'none',
  },
  outputPath: '../kinger906.github.io/static/my-player',
  routes: [
    { path: '/', component: '@/pages/login/index' },
    { path: '/main', component: '@/pages/index' },
    { path: '/detail', component: '@/pages/detail/index' },
  ],
  fastRefresh: {},
});

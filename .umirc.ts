import { defineConfig } from 'umi';

export default defineConfig({
  history: { type: 'hash' },
  hash: false,
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/', component: '@/pages/index' },
    { path: '/detail', component: '@/pages/detail/index' },
  ],
  fastRefresh: {},
});

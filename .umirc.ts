import { defineConfig } from 'umi';

export default defineConfig({
  history: { type: 'hash' },
  publicPath:
    'https://mpr.cdn.meijingdata.com/mini-programs/meijing-research-web/assets/pages/work/dist/',
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

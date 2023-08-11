//是否为本地
const isLocal = true;

//api前缀
export const prefixApi = isLocal
  ? 'https://kinger906.github.io/static/my-player/data'
  : './data';

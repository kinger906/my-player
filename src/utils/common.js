//是否为本地app
const isLocal = location.protocol.includes('file');

//api前缀
export const prefixApi = isLocal
  ? 'https://kinger906.github.io/static/my-player/data'
  : './data';

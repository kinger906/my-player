import { get, isEmpty } from 'lodash';
import dbHelper from '@/utils/dbHelper';
import moment from 'moment';
//api前缀
export const prefixApi = 'https://kinger906.github.io/data/my-player';

export const fetchUrl = (url: string) => {
  return fetch(`${url}?time=${new Date().getTime()}`).then((res) => res.json());
};

export const fetchDbList = (
  fetchList: string[],
  relativeUrl: string,
  dbName: string,
) => {
  try {
    const localLoadTimeObj: any = JSON.parse(
      localStorage.getItem('localLoadTimeObj') || '{}',
    );
    fetchList.forEach((fetchItem: any) => {
      //检测缓存时间，如果缓存时间<updateTime，则请求，否则不请求
      const cacheTime: any = get(localLoadTimeObj, dbName, {})[
        fetchItem.dataKey
      ];
      if (!cacheTime || cacheTime < fetchItem.updateTime) {
        fetchUrl(`${relativeUrl}${fetchItem.dataKey}`).then(
          async (res: any) => {
            const newLocalLoadTimeObj: any = JSON.parse(
              localStorage.getItem('localLoadTimeObj') || '{}',
            );
            if (!newLocalLoadTimeObj[dbName]) {
              newLocalLoadTimeObj[dbName] = {};
            }
            newLocalLoadTimeObj[dbName][fetchItem.dataKey] = moment().valueOf();

            const data = res[dbName];
            // 查询已存在的键值
            const existingKeys = await dbHelper[dbName]
              .toCollection()
              .primaryKeys();
            // 筛选出不存在的数据项
            const newDataToAdd = data.filter(
              (item: any) => !existingKeys.includes(item.id),
            );
            // 执行批量添加
            await dbHelper[dbName].bulkPut(newDataToAdd);
            localStorage.setItem(
              'localLoadTimeObj',
              JSON.stringify(newLocalLoadTimeObj),
            );
          },
        );
      }
    });
  } catch (e) {}
};

import { useState, useEffect } from 'react';
import ListItem from '@/components/ListItem';
import SearchBar from '@/components/SearchBar';
import { orderBy } from 'lodash';
const PinyinEngine = require('pinyin-engine');
import styles from './index.less';

export default function IndexPage() {
  const [dataList, setDataList] = useState<any>([]);
  const [searchValue, setSearchValue] = useState<string>('');
  const [currentList, setCurrentList] = useState<any>([]);
  const getData = () => {
    fetch(`./data/movies.json?time=${new Date().getTime()}`)
      .then((res) => res.json())
      .then((res) => {
        setDataList(orderBy(res || [], ['order'], ['asc']));
      });
  };

  const onSearch = (val: string) => {
    setSearchValue(val);
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    const newList = new PinyinEngine(dataList, ['name']).query(searchValue);
    setCurrentList(newList);
  }, [searchValue, dataList]);

  return (
    <div className={styles.home_container}>
      <div className={styles.header}>
        <SearchBar
          placeholder="搜索电视剧名称 支持中文和拼音首字母"
          value={searchValue}
          onSearch={onSearch}
        />
      </div>
      <div className={styles.body}>
        <div className={styles.list_view}>
          {currentList.map((dataItem: any) => (
            <ListItem key={dataItem.id} data={dataItem} />
          ))}
        </div>
      </div>
    </div>
  );
}

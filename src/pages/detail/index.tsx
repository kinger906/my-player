import { useState, useEffect } from 'react';
import { get } from 'lodash';
import cn from 'classnames';
import styles from './index.less';

const CacheName = 'kingtiger';

export default function DetailPage(props: any) {
  const {
    location: { query },
  } = props;
  const [dataList, setDataList] = useState<any>([]);
  const [currentData, setCurrentData] = useState<any>(null);
  const [currentSource, setCurrentSource] = useState<any>(null);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    fetch(`./data/movies.json?time=${new Date().getTime()}`)
      .then((res) => res.json())
      .then((res) => {
        setDataList(res || []);
      });
  };

  useEffect(() => {
    getCurrentData();
  }, [dataList, query.id]);

  const getCurrentData = () => {
    if (dataList.length > 0 && query.id) {
      const videoData = dataList.find(
        (dataItem: any) => dataItem.id == query.id,
      );
      setCurrentData(videoData);
      const cacheObj = JSON.parse(localStorage.getItem(CacheName) || '{}');
      if (cacheObj[query.id]) {
        const findItem = get(videoData, 'sources', []).find(
          (videoItem: any) => videoItem.id === cacheObj[query.id],
        );
        setCurrentSource(findItem || get(videoData, 'sources[0]'));
      } else {
        setCurrentSource(get(videoData, 'sources[0]'));
      }
    }
  };

  const playVideoSource = () => {
    try {
      //@ts-ignore
      window.plusHelper.playVideo({ src: currentSource.source, id: 'video' });
    } catch (err) {
      console.log(err);
    }
  };

  const onSelect = (sourceItem: any) => {
    setCurrentSource(sourceItem);
    const cacheObj = JSON.parse(localStorage.getItem(CacheName) || '{}');
    cacheObj[query.id] = sourceItem.id;
    localStorage.setItem(CacheName, JSON.stringify(cacheObj));
  };

  useEffect(() => {
    currentSource && playVideoSource();
  }, [currentSource]);

  return (
    <div className={styles.detail_container}>
      <div id="video" className={styles.video}></div>
      <div className={styles.info_container}>
        <span className={styles.info_label}>简介</span>
        <div className={styles.info_body}>
          <span className={styles.info_title}>{get(currentData, 'name')}</span>
          <span className={styles.info}>{get(currentData, 'info')}</span>
        </div>
      </div>
      <div className={styles.source_container}>
        <div className={styles.source_top}>
          <span className={styles.label}>选集</span>
          <span className={styles.num}>
            共{get(currentData, 'sources', []).length}集
          </span>
        </div>
        <div className={styles.source_body}>
          {get(currentData, 'sources', []).map((sourceItem: any) => (
            <div
              key={sourceItem.id}
              onClick={() => onSelect(sourceItem)}
              className={cn(styles.source_item, {
                [styles.source_item_active]:
                  get(currentSource, 'id') == sourceItem.id,
              })}
            >
              {sourceItem.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

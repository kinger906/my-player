import { useState, memo } from 'react';
import { history } from 'umi';
import styles from './index.less';

const ListItem = (props: any) => {
  const { data } = props;

  const onDetail = () => {
    try {
      const filePath = location.href.replace('#/main', '#/detail');
      //@ts-ignorey
      window.plusHelper.openWindow(`${filePath}?id=${data.id}`, data.name);
    } catch (err) {
      history.push(`/detail?id=${data.id}`);
    }
  };

  return (
    <div className={styles.list_item} onClick={onDetail}>
      <div className={styles.list_item_top}>
        <img className={styles.logo} src={data.logo} />
        <span className={styles.num}>{data.sources.length}集全</span>
      </div>
      <div className={styles.list_item_bottom}>
        <span className={styles.name}>{data.name}</span>
        <span className={styles.info}>{data.info}</span>
      </div>
    </div>
  );
};

export default memo(ListItem);

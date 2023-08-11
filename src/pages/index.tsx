import { useState, useEffect, Component } from 'react';
import { PullToRefresh, List, InfiniteScroll, Empty } from 'antd-mobile-v5';
import ListItem from '@/components/ListItem';
import dbHelper from '@/utils/dbHelper';
//@ts-ignore
import SearchBar from '@/components/SearchBar';
import { get, isEmpty } from 'lodash';
import styles from './index.less';
import 'antd-mobile/dist/antd-mobile.css';
export default class CommonPage extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      searchValue: '',
      currentList: [],
      hasMore: false,
      offset: 0,
      limit: 20,
      showModal: false,
      total: 0,
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    const { offset, limit, table, searchValue, currentList } = this.state;
    const total = await dbHelper.movies
      .filter((m: any) => m.name.includes(searchValue))
      .count();

    dbHelper.movies
      .filter((m: any) => m.name.includes(searchValue))
      .offset(offset)
      .limit(limit)
      .toArray()
      .then((res: any) => {
        const pageDatas = res || [];
        const allDataList = [...currentList, ...pageDatas];
        const isHasMore = allDataList.length < total;
        this.setState({
          currentList: allDataList,
          hasMore: isHasMore,
          total,
          offset: isHasMore ? offset + limit : offset,
        });
      });
  };

  onSearch = (val: string) => {
    this.setState(
      {
        searchValue: val,
        offset: 0,
        currentList: [],
        total: 0,
      },
      this.getData,
    );
  };

  onRefresh = async () => {
    this.setState(
      {
        hasMore: false,
        offset: 0,
        currentList: [],
        total: 0,
      },
      this.getData,
    );
  };

  render() {
    const { searchValue, total, currentList = [], hasMore } = this.state;
    return (
      <div className={styles.home_container}>
        <div className={styles.header}>
          <SearchBar
            placeholder="搜索影视名称 支持中文关键字"
            value={searchValue}
            onSearch={this.onSearch}
          />
          {total ? (
            <span className={styles.total}>
              当前查询结果：{total}条{JSON.stringify(location)}
            </span>
          ) : (
            <></>
          )}
        </div>
        <div className={styles.body}>
          <PullToRefresh onRefresh={this.onRefresh}>
            <List>
              {!isEmpty(currentList) && (
                <div className={styles.list_view}>
                  {currentList.map((dataItem: any, index: number) => (
                    <ListItem key={dataItem.id} data={dataItem} />
                  ))}
                </div>
              )}
            </List>
            {currentList.length !== 0 || hasMore ? (
              <InfiniteScroll loadMore={this.getData} hasMore={hasMore} />
            ) : (
              <Empty className={styles['Empty']} />
            )}
          </PullToRefresh>
        </div>
      </div>
    );
  }
}

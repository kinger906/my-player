import { Input, Button, Toast } from 'antd-mobile-v5';
import { history } from 'umi';
import { useEffect, useState, useRef } from 'react';
import { get, isEmpty } from 'lodash';
import { prefixApi, fetchUrl, fetchDbList } from '@/utils/common';
import styles from './index.less';

const rootSourceBaseUrl =
  'https://mpr.cdn.meijingdata.com/mini-programs/meijing-applet';

export default function PhoneLoginPage() {
  const [userId, setUserId] = useState<string>('admin');
  const [password, setPassword] = useState<string>('123');
  const configRef = useRef<any>();

  const checkInput = () => {
    let result = true;
    let content = '';
    if (!userId) {
      content = '请输入账号';
      result = false;
    } else if (!password) {
      content = '您输入密码';
      result = false;
    }
    if (!result && content) {
      Toast.show({
        content,
        position: 'bottom',
      });
    }
    return result;
  };

  const onLogin = () => {
    if (checkInput()) {
      history.replace('/main');
    }
  };

  const getConfig = () => {
    fetchUrl(`${prefixApi}/config.json`).then((res) => {
      configRef.current = res;
      loadAllDatas(res);
    });
  };

  // 加载一个数据集
  const loadOneIndexedDB = (dbConfig: any, dbStorage: any) => {
    const dbName = get(dbConfig, 'name');
    const relativeUrl = get(dbConfig, 'relativeUrl');
    const allList = get(dbConfig, 'allList', []);
    const initList = get(dbConfig, 'initList', []);
    const initFetchList = allList.filter((item: any) =>
      initList.includes(item.dataKey),
    );
    const otherFechList = allList.filter(
      (item: any) => !initList.includes(item.dataKey),
    );
    fetchDbList(initFetchList, relativeUrl, dbName);
    setTimeout(() => {
      fetchDbList(otherFechList, relativeUrl, dbName);
    }, 5000);
  };

  useEffect(() => {
    getConfig();
  }, []);

  const loadAllDatas = (config: any) => {
    const localLoadTimeObj = JSON.parse(
      localStorage.getItem('localLoadTimeObj') || '{}',
    );
    if (!isEmpty(config)) {
      const mapIndexedDB = get(config, 'mapIndexedDB', []);
      mapIndexedDB.forEach((dbItem: any) => {
        loadOneIndexedDB(dbItem, localLoadTimeObj);
      });
    }
  };

  const onReload = (e: any) => {
    getConfig();
    e.stopPropagation();
  };

  const onConsole = () => {
    //@ts-ignore
    var vConsole = new VConsole();
  };

  return (
    <div className={styles['phone-container']}>
      <div className={styles['phone-head']} onClick={onConsole}>
        <img
          className={styles['phone-logo']}
          src={`${rootSourceBaseUrl}/assets/login/phone_login/logo.png`}
          onClick={onReload}
        />
      </div>
      <div className={styles['phone-body']}>
        <Input
          className={styles['phone-input']}
          onChange={(val) => setUserId(val)}
          maxLength={11}
          value={userId}
          placeholder="请输入账号"
        />
        <Input
          className={styles['phone-input']}
          onChange={(val) => setPassword(val)}
          placeholder="请输入密码"
          maxLength={30}
          value={password}
          type="password"
        />
        <Button
          className={styles['phone-login']}
          color="primary"
          fill="solid"
          onClick={onLogin}
        >
          登录
        </Button>
      </div>
    </div>
  );
}

import { Input, Button, Toast } from 'antd-mobile-v5';
import { history } from 'umi';
import { useEffect, useState } from 'react';
import { prefixApi } from '@/utils/common';
import dbHelper from '@/utils/dbHelper';
import styles from './index.less';

const rootSourceBaseUrl =
  'https://mpr.cdn.meijingdata.com/mini-programs/meijing-applet';

export default function PhoneLoginPage() {
  const [userId, setUserId] = useState<string>('admin');
  const [password, setPassword] = useState<string>('123');
  const [isLoadData, setIsLoadData] = useState<boolean>(false);

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

  useEffect(() => {
    if (!localStorage.getItem('loadDB')) {
      loadAllDatas();
    }
  }, []);

  const loadAllDatas = () => {
    fetch(`${prefixApi}/movies.json?time=${new Date().getTime()}`)
      .then((res) => res.json())
      .then((res) => {
        dbHelper.movies.bulkAdd(res);
        setIsLoadData(true);
        localStorage.setItem('loadDB', '1');
      });
  };

  const onStatus = () => {
    Toast.show({
      content: `数据库加载${isLoadData ? '成功' : '失败'}`,
      position: 'bottom',
    });
  };

  return (
    <div className={styles['phone-container']}>
      <div className={styles['phone-head']}>
        <img
          className={styles['phone-logo']}
          src={`${rootSourceBaseUrl}/assets/login/phone_login/logo.png`}
          onClick={onStatus}
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

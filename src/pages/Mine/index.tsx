import { useState } from 'react';
import { List, Avatar, Button, Card, Space, Badge, Switch } from 'antd-mobile';
import './index.css';

export default function Mine() {
  const [userInfo] = useState({
    name: '校园用户',
    avatar: 'https://picsum.photos/100/100?random=0',
    phone: '138****1234',
    balance: 128.5,
    orderCount: 5,
  });

  const [notifications, setNotifications] = useState(true);
  const [location, setLocation] = useState(true);

  const logout = () => {
    alert('已退出登录！');
  };

  return (
    <div className="mine-page">
      <Card className="user-card">
        <Card.Body className="user-info">
          <Avatar src={userInfo.avatar} size="large" />
          <div className="user-details">
            <h3 className="user-name">{userInfo.name}</h3>
            <p className="user-phone">{userInfo.phone}</p>
          </div>
          <Button size="small" className="edit-btn">
            编辑资料
          </Button>
        </Card.Body>
      </Card>

      <div className="quick-entries">
        <Card className="entry-card">
          <Card.Body>
            <Space className="entry-items">
              <div className="entry-item">
                <span className="entry-value">¥{userInfo.balance}</span>
                <span className="entry-label">钱包余额</span>
              </div>
              <div className="entry-item">
                <span className="entry-value">{userInfo.orderCount}</span>
                <span className="entry-label">我的订单</span>
              </div>
              <div className="entry-item">
                <span className="entry-value">0</span>
                <span className="entry-label">我的收藏</span>
              </div>
            </Space>
          </Card.Body>
        </Card>
      </div>

      <div className="settings-list">
        <List>
          <List.Item
            prefix="wallet-o"
            suffix={<Badge content={2} />}
            className="setting-item"
          >
            待付款
          </List.Item>
          <List.Item prefix="clock-o" className="setting-item">
            我的跑腿
          </List.Item>
          <List.Item prefix="comment-o" className="setting-item">
            我的评价
          </List.Item>
          <List.Item prefix="setting-o" className="setting-item">
            系统设置
          </List.Item>
          <List.Item 
            prefix="bell-o" 
            suffix={<Switch checked={notifications} onChange={setNotifications} />}
            className="setting-item"
          >
            消息通知
          </List.Item>
          <List.Item 
            prefix="location-o" 
            suffix={<Switch checked={location} onChange={setLocation} />}
            className="setting-item"
          >
            位置权限
          </List.Item>
          <List.Item prefix="help-o" className="setting-item">
            帮助中心
          </List.Item>
        </List>
      </div>

      <div className="logout-section">
        <Button 
          type="default" 
          onClick={logout}
          className="logout-btn"
        >
          退出登录
        </Button>
      </div>
    </div>
  );
}
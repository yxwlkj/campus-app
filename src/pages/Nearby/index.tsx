import { useState, useEffect } from 'react';
import { Avatar, Button, Card, Tag, Space } from 'antd-mobile';
import './index.css';

interface NearbyUser {
  id: number;
  name: string;
  avatar: string;
  distance: string;
  signature: string;
  tags: string[];
  online: boolean;
}

const initialUsers: NearbyUser[] = [
  {
    id: 1,
    name: '小张',
    avatar: 'https://picsum.photos/100/100?random=10',
    distance: '500m',
    signature: '喜欢打球，求队友',
    tags: ['篮球', '大二', '计算机'],
    online: true,
  },
  {
    id: 2,
    name: '小红',
    avatar: 'https://picsum.photos/100/100?random=11',
    distance: '800m',
    signature: '图书馆搭子dd',
    tags: ['学习', '大三', '中文系'],
    online: true,
  },
  {
    id: 3,
    name: '小李',
    avatar: 'https://picsum.photos/100/100?random=12',
    distance: '1.2km',
    signature: '跑腿代买，价格实惠',
    tags: ['跑腿', '大四', '外卖'],
    online: false,
  },
  {
    id: 4,
    name: '小王',
    avatar: 'https://picsum.photos/100/100?random=13',
    distance: '1.5km',
    signature: '找一起打游戏的小伙伴',
    tags: ['游戏', '大一', '电竞'],
    online: true,
  },
];

export default function Nearby() {
  const [users, setUsers] = useState<NearbyUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [myLocation, setMyLocation] = useState('未获取定位');

  useEffect(() => {
    setTimeout(() => {
      setMyLocation('XX大学-图书馆');
      setUsers(initialUsers);
      setLoading(false);
    }, 1000);
  }, []);

  const refreshUsers = () => {
    setLoading(true);
    setTimeout(() => {
      setUsers([...initialUsers].sort(() => Math.random() - 0.5));
      setLoading(false);
    }, 800);
  };

  return (
    <div className="nearby-page">
      <div className="nearby-header">
        <h2>附近的人</h2>
        <div className="location-info">
          <span className="location-text">{myLocation}</span>
          <Button size="small" onClick={refreshUsers} className="refresh-btn">
            刷新
          </Button>
        </div>
      </div>

      <div className="users-list">
        {loading ? (
          <div className="loading-text">正在加载附近的人...</div>
        ) : (
          users.map(user => (
            <Card key={user.id} className="user-card">
              <Card.Header
                title={
                  <div className="user-name">
                    {user.name}
                    {user.online && <Tag color="green" size="small">在线</Tag>}
                  </div>
                }
                extra={<span className="distance">{user.distance}</span>}
                avatar={<Avatar src={user.avatar} size="small" />}
              />
              <Card.Body>
                <div className="user-signature">{user.signature}</div>
                <Space className="user-tags">
                  {user.tags.map((tag, idx) => (
                    <Tag key={idx} size="small">{tag}</Tag>
                  ))}
                </Space>
              </Card.Body>
              <Card.Footer>
                <Button type="primary" size="small" className="chat-btn">
                  发起聊天
                </Button>
              </Card.Footer>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
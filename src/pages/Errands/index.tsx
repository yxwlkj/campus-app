import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// 订单数据
const orders = [
  { id: 1, title: '代取快递', address: '菜鸟驿站3号柜', reward: 5, type: '校园内', status: '待接单' },
  { id: 2, title: '代买早餐', address: '食堂一楼', reward: 3, type: '校园内', status: '待接单' },
  { id: 3, name: '代买奶茶', address: '校门口蜜雪冰城', reward: 8, type: '校园外', status: '进行中' },
  { id: 4, name: '代取外卖', address: '学校西门', reward: 4, type: '校园外', status: '已完成' },
];

export default function Errands() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('all');

  // 筛选订单
  const filteredOrders = tab === 'all'
    ? orders
    : orders.filter(o => o.type === (tab === 'inside' ? '校园内' : '校园外'));

  // TabBar 切换
  const switchTab = (path: string) => {
    navigate(path);
  };

  return (
    <div className="app-container">
      {/* 顶部导航栏 */}
      <div className="nav-bar nav-errands">
        <div className="nav-title">校园跑腿</div>
        <div className="nav-icon">🔍</div>
      </div>

      {/* 内容区域 */}
      <div className="content">
        {/* 功能入口 */}
        <div className="errands-header">
          <div style={{ display: 'flex', gap: '20px' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '24px', marginBottom: '5px' }}>📝</div>
              <div style={{ fontSize: '13px', color: '#333' }}>发布订单</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '24px', marginBottom: '5px' }}>🍱</div>
              <div style={{ fontSize: '13px', color: '#333' }}>我的订单</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '24px', marginBottom: '5px' }}>👥</div>
              <div style={{ fontSize: '13px', color: '#333' }}>跑腿员中心</div>
            </div>
          </div>
        </div>

        {/* 订单筛选 */}
        <div className="errands-tabs">
          <div className={`errands-tab ${tab === 'all' ? 'active' : ''}`} onClick={() => setTab('all')}>
            全部订单
          </div>
          <div className={`errands-tab ${tab === 'inside' ? 'active' : ''}`} onClick={() => setTab('inside')}>
            校园内
          </div>
          <div className={`errands-tab ${tab === 'outside' ? 'active' : ''}`} onClick={() => setTab('outside')}>
            校园外
          </div>
        </div>

        {/* 订单列表 */}
        {filteredOrders.map(order => (
          <div key={order.id} className="order-item">
            <div className="order-title">
              <span>{order.title}</span>
              <span className="order-price">¥{order.reward}</span>
            </div>
            <div className="order-info">地址：{order.address}</div>
            <div className="order-info">类型：{order.type}</div>
            <div style={{ marginTop: '8px' }}>
              <span className={`order-status ${
                order.status === '待接单' ? 'status-pending' : 
                order.status === '进行中' ? 'status-running' : 'status-done'
              }`}>
                {order.status}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* 底部 TabBar */}
      <div className="tab-bar">
        <div className="tab-bar-item" onClick={() => switchTab('/chat')}>
          <span className="tab-bar-icon">💬</span>
          <span>微信</span>
        </div>
        <div className="tab-bar-item" onClick={() => switchTab('/contact')}>
          <span className="tab-bar-icon">👥</span>
          <span>通讯录</span>
        </div>
        <div className="tab-bar-item active" onClick={() => switchTab('/errands')}>
          <span className="tab-bar-icon">🚴</span>
          <span>跑腿</span>
        </div>
        <div className="tab-bar-item" onClick={() => switchTab('/discover')}>
          <span className="tab-bar-icon">🔍</span>
          <span>发现</span>
        </div>
        <div className="tab-bar-item" onClick={() => switchTab('/mine')}>
          <span className="tab-bar-icon">👤</span>
          <span>我</span>
        </div>
      </div>
    </div>
  );
}
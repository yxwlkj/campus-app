import { useState } from 'react';
import { Link } from 'react-router-dom';

// 跑腿员数据
const runnerList = [
  { id: 1, name: '张三', type: '校园内', phone: '138****1234', status: '已认证', orderCount: 23 },
  { id: 2, name: '李四', type: '校园内', phone: '139****5678', status: '已认证', orderCount: 18 },
  { id: 3, name: '王五', type: '校园外', phone: '137****9012', status: '审核中', orderCount: 0 },
  { id: 4, name: '赵六', type: '校园外', phone: '136****3456', status: '已认证', orderCount: 35 },
];

function RunnerList() {
  const [activeType, setActiveType] = useState('all');

  // 筛选跑腿员
  const filteredRunners = activeType === 'all'
    ? runnerList
    : runnerList.filter(runner => runner.type === (activeType === 'inside' ? '校园内' : '校园外'));

  return (
    <>
      <div className="wechat-header">
        <Link to="/errands" style={{ color: '#333', textDecoration: 'none' }}>←</Link>
        <span>跑腿员列表</span>
        <span></span>
      </div>

      {/* 分类标签 */}
      <div className="errands-tab">
        <div 
          className={`errands-tab-item ${activeType === 'all' ? 'active' : ''}`}
          onClick={() => setActiveType('all')}
        >
          全部
        </div>
        <div 
          className={`errands-tab-item ${activeType === 'inside' ? 'active' : ''}`}
          onClick={() => setActiveType('inside')}
        >
          校园内
        </div>
        <div 
          className={`errands-tab-item ${activeType === 'outside' ? 'active' : ''}`}
          onClick={() => setActiveType('outside')}
        >
          校园外
        </div>
      </div>

      {/* 跑腿员列表 */}
      <div style={{ padding: '0 10px' }}>
        {filteredRunners.map(runner => (
          <div key={runner.id} className="wechat-card" style={{ marginBottom: '10px' }}>
            <div className="wechat-list-item">
              <div className="avatar">{runner.name.charAt(0)}</div>
              <div style={{ flex: 1 }}>
                <div className="item-title">{runner.name}</div>
                <div className="item-desc">类型：{runner.type}</div>
                <div className="item-desc">电话：{runner.phone}</div>
                <div className="item-desc">完成订单：{runner.orderCount}单</div>
              </div>
              <div style={{ 
                padding: '4px 8px', 
                borderRadius: '4px',
                backgroundColor: runner.status === '已认证' ? '#07c160' : '#ffcc00',
                color: '#fff',
                fontSize: 12
              }}>
                {runner.status}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default RunnerList;
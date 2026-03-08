import { useNavigate } from 'react-router-dom';
import { List, Button } from 'antd-mobile';
import { useStore } from '../store';

// 仅新增跑腿相关入口，你可合并到现有“我的”页面
const Profile = () => {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useStore();

  // 测试用：快速切换为已审核的校内跑腿员（实际开发可删除）
  const switchToRunner = () => {
    setCurrentUser({
      role: 'runner',
      runnerType: 'in',
      isVerified: true
    });
  };

  return (
    <div style={{ backgroundColor: '#f7f7f7', minHeight: 'calc(100vh - 50px)' }}>
      <div style={{ padding: '20px', backgroundColor: '#fff', marginBottom: '16px' }}>
        <h3 style={{ margin: 0 }}>{currentUser.name}</h3>
        <p style={{ fontSize: '14px', color: '#999', marginTop: '4px' }}>
          {currentUser.role === 'student' ? '学生' : '跑腿员'}
        </p>
      </div>

      <List mode="card">
        {/* 跑腿相关入口 */}
        <List.Item onClick={() => navigate('/order-list')}>我的订单</List.Item>
        <List.Item onClick={() => navigate('/runner/apply')}>申请跑腿员</List.Item>
        {currentUser.role === 'runner' && (
          <List.Item onClick={() => navigate('/runner/center')}>跑腿员中心</List.Item>
        )}
        {/* 你现有“我的”页面的其他功能（如设置、个人信息）可加在这里 */}
      </List>

      {/* 测试按钮（可选删除） */}
      <div style={{ padding: '16px' }}>
        <Button block color="warning" onClick={switchToRunner}>
          测试：切换为校内跑腿员
        </Button>
      </div>
    </div>
  );
};

export default Profile;
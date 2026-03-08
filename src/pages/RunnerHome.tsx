import { useNavigate } from 'react-router-dom';
import { Button } from 'antd-mobile';
import { CarOutlined } from '@ant-design/icons';

const RunnerHome = () => {
  const navigate = useNavigate();

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: 'calc(100vh - 50px)', // 减去底部 Tab 高度
      backgroundColor: '#fff',
      padding: '20px'
    }}>
      <CarOutlined style={{ fontSize: '48px', color: '#ff6b35', marginBottom: '20px' }} />
      <h2 style={{ fontSize: '24px', margin: '10px 0', color: '#333' }}>跑腿服务</h2>
      <p style={{ fontSize: '16px', color: '#666', textAlign: 'center', marginBottom: '30px' }}>
        帮买、帮送、帮取<br />足不出户，轻松办事
      </p>
      <Button
        color="success"
        size="large"
        style={{
          width: '200px',
          height: '50px',
          borderRadius: '25px',
          backgroundColor: '#07c160',
          fontSize: '18px'
        }}
        onClick={() => navigate('/runner/publish')}
      >
        立即下单
      </Button>
    </div>
  );
};

export default RunnerHome;
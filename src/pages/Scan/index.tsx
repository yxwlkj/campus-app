import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Scan() {
  const navigate = useNavigate();
  const [scanned, setScanned] = useState(false);

  const mockScan = () => {
    setScanned(true);
    setTimeout(() => {
      alert('扫码成功，跳转到对应页面');
      navigate('/chatlist');
    }, 1000);
  };

  return (
    <div style={{ maxWidth: 500, margin: '0 auto', height: '100vh', background: '#000', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '12px 16px', display: 'flex', alignItems: 'center' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#fff', fontSize: 18 }}>←</button>
        <div style={{ marginLeft: 12, fontSize: 18, color: '#fff', fontWeight: 'bold' }}>扫一扫</div>
      </div>
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {scanned ? (
          <div style={{ color: '#fff', fontSize: 20 }}>✅ 扫码成功</div>
        ) : (
          <div style={{ width: 250, height: 250, border: '2px solid #07c160', position: 'relative' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: '#07c160', animation: 'scan 2s linear infinite' }} />
            <style>{`@keyframes scan { 0% { top: 0; } 100% { top: 250px; } }`}</style>
          </div>
        )}
      </div>
      <div style={{ padding: 16, textAlign: 'center' }}>
        <button onClick={mockScan} style={{ padding: '8px 20px', background: '#07c160', color: '#fff', border: 'none', borderRadius: 20, fontSize: 14 }}>
          模拟扫码
        </button>
      </div>
    </div>
  );
}
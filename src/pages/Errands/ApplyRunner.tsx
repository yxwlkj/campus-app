import { useState } from 'react';
import { Link } from 'react-router-dom';

function ApplyRunner() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    idCard: '',
    runnerType: 'inside',
    school: '',
    address: '',
    reason: ''
  });

  const handleSubmit = () => {
    if (!formData.name || !formData.phone || !formData.idCard) {
      alert('请填写必填信息！');
      return;
    }
    alert('跑腿员申请提交成功！等待审核');
  };

  return (
    <>
      <div className="wechat-header">
        <Link to="/errands" style={{ color: '#333', textDecoration: 'none' }}>←</Link>
        <span>跑腿员申请</span>
        <span></span>
      </div>

      <div className="apply-form">
        <div className="form-item">
          <label className="form-label">姓名 *</label>
          <input 
            type="text" 
            className="form-input"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            placeholder="请输入姓名"
          />
        </div>

        <div className="form-item">
          <label className="form-label">手机号 *</label>
          <input 
            type="tel" 
            className="form-input"
            value={formData.phone}
            onChange={(e) => setFormData({...formData, phone: e.target.value})}
            placeholder="请输入手机号"
          />
        </div>

        <div className="form-item">
          <label className="form-label">身份证号 *</label>
          <input 
            type="text" 
            className="form-input"
            value={formData.idCard}
            onChange={(e) => setFormData({...formData, idCard: e.target.value})}
            placeholder="请输入身份证号"
          />
        </div>

        <div className="form-item">
          <label className="form-label">跑腿类型 *</label>
          <select 
            className="form-select"
            value={formData.runnerType}
            onChange={(e) => setFormData({...formData, runnerType: e.target.value})}
          >
            <option value="inside">校园内跑腿员</option>
            <option value="outside">校园外跑腿员</option>
          </select>
        </div>

        <div className="form-item">
          <label className="form-label">学校/单位</label>
          <input 
            type="text" 
            className="form-input"
            value={formData.school}
            onChange={(e) => setFormData({...formData, school: e.target.value})}
            placeholder="请输入学校/工作单位"
          />
        </div>

        <div className="form-item">
          <label className="form-label">常驻地址</label>
          <input 
            type="text" 
            className="form-input"
            value={formData.address}
            onChange={(e) => setFormData({...formData, address: e.target.value})}
            placeholder="请输入常驻地址"
          />
        </div>

        <div className="form-item">
          <label className="form-label">申请理由</label>
          <textarea 
            className="form-input"
            rows={4}
            value={formData.reason}
            onChange={(e) => setFormData({...formData, reason: e.target.value})}
            placeholder="请输入申请理由"
          ></textarea>
        </div>

        <button className="submit-btn" onClick={handleSubmit}>
          提交申请
        </button>
      </div>
    </>
  );
}

export default ApplyRunner;
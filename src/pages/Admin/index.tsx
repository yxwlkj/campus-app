import { Link } from 'react-router-dom';

function Admin() {
  return (
    <>
      <div className="wechat-header">
        <Link to="/errands" style={{ color: '#333', textDecoration: 'none' }}>←</Link>
        <span>后台管理系统</span>
        <span></span>
      </div>

      <div className="admin-container">
        <div className="admin-menu">
          <Link to="/admin/goods" style={{ textDecoration: 'none' }}>
            <div className="admin-menu-item">商品管理</div>
          </Link>
          <Link to="/admin/receipt" style={{ textDecoration: 'none' }}>
            <div className="admin-menu-item">收据管理</div>
          </Link>
        </div>

        <div className="wechat-card" style={{ padding: '20px' }}>
          <h3 style={{ marginBottom: '20px' }}>后台管理说明</h3>
          <ul style={{ paddingLeft: '20px', lineHeight: 1.8 }}>
            <li>商品管理：添加/编辑/删除订餐商品</li>
            <li>收据管理：修改订单收据信息</li>
            <li>仅管理员可访问此页面</li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Admin;
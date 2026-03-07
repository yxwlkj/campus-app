import { useState } from 'react';
import { Link } from 'react-router-dom';

function ReceiptManage() {
  // 收据数据
  const [receiptList, setReceiptList] = useState([
    { id: 1, orderId: 'ORD20260307001', amount: 18, status: '已支付', receiptNo: 'REC123456789' },
    { id: 2, orderId: 'ORD20260307002', amount: 12, status: '待支付', receiptNo: 'REC987654321' },
    { id: 3, orderId: 'ORD20260307003', amount: 8, status: '已退款', receiptNo: 'REC456789123' },
  ]);

  // 编辑状态
  const [editReceipt, setEditReceipt] = useState<number | null>(null);

  // 更新状态
  const updateReceiptStatus = (id: number, newStatus: string) => {
    setReceiptList(receiptList.map(item => 
      item.id === id ? {...item, status: newStatus} : item
    ));
    setEditReceipt(null);
    alert('收据状态修改成功！');
  };

  return (
    <>
      <div className="wechat-header">
        <Link to="/admin" style={{ color: '#333', textDecoration: 'none' }}>←</Link>
        <span>收据管理</span>
        <span></span>
      </div>

      <div className="admin-container">
        <div className="wechat-card">
          <table className="goods-table">
            <thead>
              <tr>
                <th>收据ID</th>
                <th>订单编号</th>
                <th>金额</th>
                <th>状态</th>
                <th>收据编号</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              {receiptList.map(receipt => (
                <tr key={receipt.id}>
                  <td>{receipt.id}</td>
                  <td>{receipt.orderId}</td>
                  <td>¥{receipt.amount}</td>
                  <td>
                    {editReceipt === receipt.id ? (
                      <select 
                        value={receipt.status}
                        onChange={(e) => updateReceiptStatus(receipt.id, e.target.value)}
                        style={{ padding: '5px', borderRadius: '4px', border: '1px solid #e5e5e5' }}
                      >
                        <option value="待支付">待支付</option>
                        <option value="已支付">已支付</option>
                        <option value="已退款">已退款</option>
                      </select>
                    ) : (
                      <span style={{ 
                        color: receipt.status === '已支付' ? '#07c160' : receipt.status === '待支付' ? '#ffcc00' : '#f53f3f' 
                      }}>
                        {receipt.status}
                      </span>
                    )}
                  </td>
                  <td>{receipt.receiptNo}</td>
                  <td>
                    {editReceipt === receipt.id ? (
                      <button 
                        className="operate-btn edit-btn"
                        onClick={() => setEditReceipt(null)}
                      >
                        取消
                      </button>
                    ) : (
                      <button 
                        className="operate-btn edit-btn"
                        onClick={() => setEditReceipt(receipt.id)}
                      >
                        修改状态
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default ReceiptManage;
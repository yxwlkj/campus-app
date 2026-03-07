import { useState } from 'react';
import { Link } from 'react-router-dom';

function GoodsManage() {
  // 商品数据
  const [goodsList, setGoodsList] = useState([
    { id: 1, name: '黄焖鸡米饭', category: '快餐', price: 18, stock: 100 },
    { id: 2, name: '番茄炒蛋盖饭', category: '快餐', price: 12, stock: 80 },
    { id: 3, name: '珍珠奶茶', category: '饮品', price: 8, stock: 200 },
  ]);

  // 表单数据
  const [formData, setFormData] = useState({
    id: 0,
    name: '',
    category: '快餐',
    price: '',
    stock: ''
  });
  const [isEdit, setIsEdit] = useState(false);

  // 新增商品
  const addGoods = () => {
    if (!formData.name || !formData.price || !formData.stock) {
      alert('请填写完整信息！');
      return;
    }
    const newGoods = {
      id: goodsList.length + 1,
      name: formData.name,
      category: formData.category,
      price: Number(formData.price),
      stock: Number(formData.stock)
    };
    setGoodsList([...goodsList, newGoods]);
    resetForm();
    alert('商品添加成功！');
  };

  // 编辑商品
  const editGoods = (goods: any) => {
    setIsEdit(true);
    setFormData({
      id: goods.id,
      name: goods.name,
      category: goods.category,
      price: goods.price.toString(),
      stock: goods.stock.toString()
    });
  };

  // 更新商品
  const updateGoods = () => {
    if (!formData.name || !formData.price || !formData.stock) {
      alert('请填写完整信息！');
      return;
    }
    setGoodsList(goodsList.map(item => 
      item.id === formData.id ? {
        ...item,
        name: formData.name,
        category: formData.category,
        price: Number(formData.price),
        stock: Number(formData.stock)
      } : item
    ));
    resetForm();
    alert('商品更新成功！');
  };

  // 删除商品
  const deleteGoods = (id: number) => {
    if (window.confirm('确定删除该商品吗？')) {
      setGoodsList(goodsList.filter(item => item.id !== id));
    }
  };

  // 重置表单
  const resetForm = () => {
    setFormData({ id: 0, name: '', category: '快餐', price: '', stock: '' });
    setIsEdit(false);
  };

  return (
    <>
      <div className="wechat-header">
        <Link to="/admin" style={{ color: '#333', textDecoration: 'none' }}>←</Link>
        <span>商品管理</span>
        <span></span>
      </div>

      <div className="admin-container">
        {/* 表单 */}
        <div className="wechat-card" style={{ padding: '15px', marginBottom: '20px' }}>
          <h3 style={{ marginBottom: '15px' }}>{isEdit ? '编辑商品' : '添加商品'}</h3>
          
          <div className="form-item">
            <label className="form-label">商品名称</label>
            <input 
              type="text" 
              className="form-input"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              placeholder="请输入商品名称"
            />
          </div>

          <div className="form-item">
            <label className="form-label">商品分类</label>
            <select 
              className="form-select"
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
            >
              <option value="快餐">快餐</option>
              <option value="饮品">饮品</option>
              <option value="小吃">小吃</option>
            </select>
          </div>

          <div className="form-item">
            <label className="form-label">商品价格</label>
            <input 
              type="number" 
              className="form-input"
              value={formData.price}
              onChange={(e) => setFormData({...formData, price: e.target.value})}
              placeholder="请输入商品价格"
            />
          </div>

          <div className="form-item">
            <label className="form-label">库存数量</label>
            <input 
              type="number" 
              className="form-input"
              value={formData.stock}
              onChange={(e) => setFormData({...formData, stock: e.target.value})}
              placeholder="请输入库存数量"
            />
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button 
              className="submit-btn"
              onClick={isEdit ? updateGoods : addGoods}
              style={{ flex: 1 }}
            >
              {isEdit ? '更新商品' : '添加商品'}
            </button>
            <button 
              className="submit-btn"
              onClick={resetForm}
              style={{ flex: 1, backgroundColor: '#999' }}
            >
              重置
            </button>
          </div>
        </div>

        {/* 商品列表 */}
        <div className="wechat-card">
          <table className="goods-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>商品名称</th>
                <th>分类</th>
                <th>价格</th>
                <th>库存</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              {goodsList.map(goods => (
                <tr key={goods.id}>
                  <td>{goods.id}</td>
                  <td>{goods.name}</td>
                  <td>{goods.category}</td>
                  <td>¥{goods.price}</td>
                  <td>{goods.stock}</td>
                  <td>
                    <button 
                      className="operate-btn edit-btn"
                      onClick={() => editGoods(goods)}
                    >
                      编辑
                    </button>
                    <button 
                      className="operate-btn delete-btn"
                      onClick={() => deleteGoods(goods.id)}
                    >
                      删除
                    </button>
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

export default GoodsManage;
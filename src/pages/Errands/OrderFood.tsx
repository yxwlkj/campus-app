import { useState } from 'react';
import { Link } from 'react-router-dom';

// 商品数据
const foodList = [
  { id: 1, category: '快餐', name: '黄焖鸡米饭', price: 18, img: 'https://picsum.photos/seed/food1/200/150' },
  { id: 2, category: '快餐', name: '番茄炒蛋盖饭', price: 12, img: 'https://picsum.photos/seed/food2/200/150' },
  { id: 3, category: '饮品', name: '珍珠奶茶', price: 8, img: 'https://picsum.photos/seed/drink1/200/150' },
  { id: 4, category: '小吃', name: '炸鸡排', price: 10, img: 'https://picsum.photos/seed/snack1/200/150' },
];

function OrderFood() {
  const [cart, setCart] = useState<any[]>([]);
  const [activeCategory, setActiveCategory] = useState('all');

  // 添加购物车
  const addToCart = (food: any) => {
    const exists = cart.find(item => item.id === food.id);
    if (exists) {
      setCart(cart.map(item => 
        item.id === food.id ? {...item, quantity: item.quantity + 1} : item
      ));
    } else {
      setCart([...cart, {...food, quantity: 1}]);
    }
    alert(`已添加${food.name}到购物车`);
  };

  // 筛选商品
  const filteredFood = activeCategory === 'all' 
    ? foodList 
    : foodList.filter(item => item.category === activeCategory);

  return (
    <>
      <div className="wechat-header">
        <Link to="/errands" style={{ color: '#333', textDecoration: 'none' }}>←</Link>
        <span>订餐功能</span>
        <span style={{ fontSize: 20 }}>🛒({cart.length})</span>
      </div>

      {/* 分类标签 */}
      <div className="errands-tab">
        <div 
          className={`errands-tab-item ${activeCategory === 'all' ? 'active' : ''}`}
          onClick={() => setActiveCategory('all')}
        >
          全部
        </div>
        <div 
          className={`errands-tab-item ${activeCategory === '快餐' ? 'active' : ''}`}
          onClick={() => setActiveCategory('快餐')}
        >
          快餐
        </div>
        <div 
          className={`errands-tab-item ${activeCategory === '饮品' ? 'active' : ''}`}
          onClick={() => setActiveCategory('饮品')}
        >
          饮品
        </div>
        <div 
          className={`errands-tab-item ${activeCategory === '小吃' ? 'active' : ''}`}
          onClick={() => setActiveCategory('小吃')}
        >
          小吃
        </div>
      </div>

      {/* 商品列表 */}
      <div className="food-list">
        {filteredFood.map(food => (
          <div key={food.id} className="food-item">
            <img src={food.img} alt={food.name} className="food-img" />
            <div className="food-info">
              <div className="food-name">{food.name}</div>
              <div className="food-price">¥{food.price}</div>
              <button 
                className="add-cart-btn"
                onClick={() => addToCart(food)}
              >
                加入购物车
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default OrderFood;
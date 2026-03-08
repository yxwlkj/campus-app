import { useMemo } from 'react';
import { List, Toast } from 'antd-mobile';
import { useStore } from '../store';
import type { Order } from '../types';

// 订单状态映射
const statusMap = {
  pending: '待接单',
  accepted: '已接单',
  delivering: '配送中',
  completed: '已完成',
  cancelled: '已取消',
};

const OrderList = () => {
  const { currentUser, orders } = useStore();

  // 筛选当前用户的订单
  const myOrders = useMemo(() => {
    return orders.filter(order => order.userId === currentUser.id);
  }, [currentUser.id, orders]);

  if (myOrders.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 0', color: '#999' }}>
        <p>暂无订单</p>
        <p style={{ fontSize: '14px', marginTop: '8px' }}>去发布一个跑腿需求吧~</p>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#f7f7f7', minHeight: 'calc(100vh - 50px)' }}>
      <List mode="card" style={{ margin: '16px' }}>
        {myOrders.map((order: Order) => (
          <List.Item
            key={order.id}
            description={
              <div style={{ fontSize: '12px', color: '#999', marginTop: '4px' }}>
                {order.content} | {order.addressType === 'in' ? '校内' : '校外'} | 费用 ¥{order.fee}
              </div>
            }
            extra={
              <span style={{
                color: order.status === 'completed' ? '#07c160' : '#1677ff',
                fontSize: '12px'
              }}>
                {statusMap[order.status]}
              </span>
            }
            onClick={() => Toast.show({ content: '查看订单详情' })}
          >
            {order.title}
          </List.Item>
        ))}
      </List>
    </div>
  );
};

export default OrderList;
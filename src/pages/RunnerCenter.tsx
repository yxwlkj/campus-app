import { useMemo } from 'react';
import { List, Button, Toast } from 'antd-mobile';
import { useStore } from '../store';
import type { Order } from '../types';

const RunnerCenter = () => {
  const { currentUser, orders, updateOrderStatus } = useStore();

  // 权限校验：仅已审核的跑腿员可进入
  if (currentUser.role !== 'runner' || !currentUser.isVerified) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 20px', color: '#999' }}>
        <p>您不是跑腿员或未通过审核</p>
        <Button
          style={{ marginTop: '16px', backgroundColor: '#07c160' }}
          color="success"
          onClick={() => {
            Toast.show({ content: '去申请成为跑腿员' });
          }}
        >
          申请跑腿员
        </Button>
      </div>
    );
  }

  // 筛选可接单订单：仅同类型（校内/校外）+ 待接单的订单
  const availableOrders = useMemo(() => {
    return orders.filter(order => {
      const isPending = order.status === 'pending';
      const isMatchType = order.addressType === currentUser.runnerType;
      return isPending && isMatchType;
    });
  }, [orders, currentUser.runnerType]);

  // 接单逻辑（绑定当前跑腿员ID，避免冲突）
  const handleAcceptOrder = (orderId: string) => {
    updateOrderStatus(orderId, 'accepted', currentUser.id);
    Toast.show({ content: '接单成功' });
  };

  return (
    <div style={{ backgroundColor: '#f7f7f7', minHeight: 'calc(100vh - 50px)' }}>
      <div style={{ padding: '16px', fontSize: '16px', backgroundColor: '#fff', marginBottom: '16px' }}>
        您好，{currentUser.runnerType === 'in' ? '校内' : '校外'}跑腿员！
      </div>

      <List mode="card" style={{ margin: '16px' }}>
        {availableOrders.length === 0 ? (
          <List.Item>暂无可接订单</List.Item>
        ) : (
          availableOrders.map((order: Order) => (
            <List.Item
              key={order.id}
              description={
                <div style={{ fontSize: '12px', color: '#999', marginTop: '4px' }}>
                  {order.content} | 费用 ¥{order.fee}
                </div>
              }
              extra={
                <Button
                  size="small"
                  color="success"
                  onClick={() => {
                    handleAcceptOrder(order.id);
                  }}
                >
                  接单
                </Button>
              }
            >
              {order.title}
            </List.Item>
          ))
        )}
      </List>
    </div>
  );
};

export default RunnerCenter;
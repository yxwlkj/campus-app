import { useState } from 'react';
import { Tabs, Input, Button, List, Card, Tag, TextArea } from 'antd-mobile';
import './index.css';

const initialOrders = [
  {
    id: 1,
    title: '代买奶茶',
    desc: '蜜雪冰城的草莓摇摇奶昔，少糖少冰',
    price: 15,
    reward: 3,
    location: '南区宿舍 → 商业街蜜雪冰城',
    status: '待接单',
    publishTime: '10分钟前',
  },
  {
    id: 2,
    title: '取快递',
    desc: '菜鸟驿站12号柜，取件码123456',
    price: 0,
    reward: 5,
    location: '菜鸟驿站 → 北区宿舍3栋',
    status: '待接单',
    publishTime: '30分钟前',
  },
  {
    id: 3,
    title: '代买食堂饭',
    desc: '一食堂二楼的卤肉饭，加个煎蛋',
    price: 12,
    reward: 2,
    location: '一食堂 → 图书馆',
    status: '已接单',
    publishTime: '1小时前',
  },
];

export default function Errands() {
  const [orders, setOrders] = useState(initialOrders);
  const [orderForm, setOrderForm] = useState({
    title: '',
    desc: '',
    price: '',
    reward: '',
    location: '',
  });

  const handleFormChange = (key: keyof typeof orderForm, value: string) => {
    setOrderForm({ ...orderForm, [key]: value });
  };

  const publishOrder = () => {
    if (!orderForm.title || !orderForm.location) return;

    const newOrder = {
      id: Date.now(),
      title: orderForm.title,
      desc: orderForm.desc || '无备注',
      price: Number(orderForm.price) || 0,
      reward: Number(orderForm.reward) || 0,
      location: orderForm.location,
      status: '待接单',
      publishTime: '刚刚',
    };

    setOrders([newOrder, ...orders]);
    setOrderForm({ title: '', desc: '', price: '', reward: '', location: '' });
  };

  const takeOrder = (orderId: number) => {
    setOrders(
      orders.map(order => 
        order.id === orderId ? { ...order, status: '已接单' } : order
      )
    );
  };

  return (
    <div className="errands-page">
      <Tabs defaultValue="list">
        <Tabs.Tab title="订单列表" key="list">
          <div className="orders-list">
            {orders.map(order => (
              <Card key={order.id} className="order-card">
                <Card.Header
                  title={order.title}
                  extra={
                    <Tag color={order.status === '待接单' ? 'orange' : 'green'}>
                      {order.status}
                    </Tag>
                  }
                />
                <Card.Body>
                  <List>
                    <List.Item description={order.desc}>备注</List.Item>
                    <List.Item description={order.location}>取送位置</List.Item>
                    <List.Item description={`¥${order.price} + 小费¥${order.reward}`}>
                      费用
                    </List.Item>
                    <List.Item description={order.publishTime}>发布时间</List.Item>
                  </List>
                </Card.Body>
                <Card.Footer>
                  {order.status === '待接单' && (
                    <Button 
                      type="primary" 
                      size="small"
                      onClick={() => takeOrder(order.id)}
                      className="take-btn"
                    >
                      我要接单
                    </Button>
                  )}
                </Card.Footer>
              </Card>
            ))}
          </div>
        </Tabs.Tab>

        <Tabs.Tab title="发布订单" key="publish">
          <div className="publish-form">
            <List>
              <List.Item label="订单标题">
                <Input
                  value={orderForm.title}
                  onChange={(v: string) => handleFormChange('title', v)}
                  placeholder="比如：代买奶茶、取快递"
                />
              </List.Item>
              <List.Item label="订单描述">
                <TextArea
                  value={orderForm.desc}
                  onChange={(v: string) => handleFormChange('desc', v)}
                  placeholder="详细说明需求"
                  rows={3}
                />
              </List.Item>
              <List.Item label="商品金额">
                <Input
                  value={orderForm.price}
                  onChange={(v: string) => handleFormChange('price', v)}
                  placeholder="0"
                  type="number"
                  prefix="¥"
                />
              </List.Item>
              <List.Item label="跑腿小费">
                <Input
                  value={orderForm.reward}
                  onChange={(v: string) => handleFormChange('reward', v)}
                  placeholder="0"
                  type="number"
                  prefix="¥"
                />
              </List.Item>
              <List.Item label="取送位置">
                <Input
                  value={orderForm.location}
                  onChange={(v: string) => handleFormChange('location', v)}
                  placeholder="比如：南区宿舍 → 商业街"
                />
              </List.Item>
            </List>

            <Button 
              type="primary" 
              onClick={publishOrder}
              className="publish-btn"
            >
              发布订单
            </Button>
          </div>
        </Tabs.Tab>
      </Tabs>
    </div>
  );
}
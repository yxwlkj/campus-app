import { useNavigate } from 'react-router-dom';
import { Button, Form, Input, Radio, Toast } from 'antd-mobile';
import { useStore } from '../store';

const PublishOrder = () => {
  const navigate = useNavigate();
  const { currentUser, addOrder } = useStore();
  const [form] = Form.useForm();

  // 跑腿费配置（校内/校外区分）
  const FEE_CONFIG = { in: 3, out: 8 };

  const onFinish = (values: any) => {
    if (!currentUser.id) {
      Toast.show({ content: '请先登录' });
      return;
    }

    // 新增订单
    addOrder({
      userId: currentUser.id,
      title: values.title,
      content: values.content,
      addressType: values.addressType as 'in' | 'out', // 类型断言避免any报错
      fee: FEE_CONFIG[values.addressType as 'in' | 'out'],
    });

    Toast.show({ content: '订单发布成功' });
    navigate('/order-list'); // 跳转到我的订单
  };

  return (
    <div style={{ padding: '16px', backgroundColor: '#f7f7f7', minHeight: 'calc(100vh - 50px)' }}>
      <div style={{ marginBottom: '16px', fontSize: '18px', fontWeight: 500 }}>发布跑腿订单</div>
      
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        style={{ backgroundColor: '#fff', borderRadius: '8px', padding: '16px' }}
      >
        <Form.Item
          name="title"
          label="需求标题"
          rules={[{ required: true, message: '请输入需求标题' }]}
        >
          <Input placeholder="例如：帮买奶茶、帮取快递" />
        </Form.Item>

        <Form.Item
          name="content"
          label="需求详情"
          rules={[{ required: true, message: '请输入需求详情' }]}
        >
          <Input.TextArea placeholder="详细描述需求，如地址、要求等" rows={4} />
        </Form.Item>

        <Form.Item
          name="addressType"
          label="配送地址类型"
          rules={[{ required: true, message: '请选择地址类型' }]}
          initialValue="in"
        >
          <Radio.Group>
            <Radio value="in">校内（跑腿费 ¥{FEE_CONFIG.in}）</Radio>
            <Radio value="out">校外（跑腿费 ¥{FEE_CONFIG.out}）</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item>
          <Button
            block
            type="submit"
            color="success"
            size="large"
            style={{ backgroundColor: '#07c160', borderRadius: '8px' }}
          >
            提交订单
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default PublishOrder;
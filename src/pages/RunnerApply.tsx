import { useNavigate } from 'react-router-dom';
import { Button, Form, Input, Radio, Toast } from 'antd-mobile';
import { useStore } from '../store';

const RunnerApply = () => {
  const navigate = useNavigate();
  const { currentUser, addRunnerApply } = useStore();
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    if (!currentUser.id) {
      Toast.show({ content: '请先登录' });
      return;
    }

    // 提交申请
    addRunnerApply({
      userId: currentUser.id,
      name: values.name,
      phone: values.phone,
      runnerType: values.runnerType as 'in' | 'out',
    });

    Toast.show({ content: '申请提交成功，等待管理员审核' });
    navigate('/');
  };

  return (
    <div style={{ padding: '16px', backgroundColor: '#f7f7f7', minHeight: 'calc(100vh - 50px)' }}>
      <div style={{ marginBottom: '16px', fontSize: '18px', fontWeight: 500 }}>申请成为跑腿员</div>
      
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        style={{ backgroundColor: '#fff', borderRadius: '8px', padding: '16px' }}
      >
        <Form.Item
          name="name"
          label="姓名"
          rules={[{ required: true, message: '请输入姓名' }]}
        >
          <Input placeholder="请输入真实姓名" />
        </Form.Item>

        <Form.Item
          name="phone"
          label="手机号"
          rules={[{ required: true, message: '请输入手机号' }]}
        >
          <Input placeholder="请输入手机号" type="tel" />
        </Form.Item>

        <Form.Item
          name="runnerType"
          label="跑腿类型"
          rules={[{ required: true, message: '请选择跑腿类型' }]}
        >
          <Radio.Group>
            <Radio value="in">校内跑腿员</Radio>
            <Radio value="out">校外跑腿员</Radio>
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
            提交申请
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default RunnerApply;
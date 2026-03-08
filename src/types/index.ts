// 仅新增，不修改你现有类型（如果有）
/** 跑腿功能专属类型 **/
export type User = {
  id: string;
  name: string;
  role: 'student' | 'runner'; // 学生（默认）/ 跑腿员
  runnerType?: 'in' | 'out'; // 仅跑腿员：校内/校外
  isVerified?: boolean; // 跑腿员是否通过审核
};

export type Order = {
  id: string;
  userId: string; // 发布订单的用户ID
  runnerId?: string; // 接单跑腿员ID（未接单为空）
  title: string; // 需求标题（如：帮买奶茶）
  content: string; // 需求详情（如：三分糖少冰）
  addressType: 'in' | 'out'; // 配送地址类型（校内/校外）
  fee: number; // 跑腿费（校内3元/校外8元）
  status: 'pending' | 'accepted' | 'delivering' | 'completed' | 'cancelled';
  createdAt: string; // 创建时间
};

export type RunnerApply = {
  id: string;
  userId: string;
  name: string;
  phone: string;
  runnerType: 'in' | 'out';
  status: 'pending' | 'approved' | 'rejected';
  applyAt: string;
};
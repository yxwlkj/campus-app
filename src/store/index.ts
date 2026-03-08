// 独立状态管理，和你现有聊天状态无冲突
import { create } from 'zustand';
import type { User, Order, RunnerApply } from '../types';

type Store = {
  // 用户信息（兼容你现有登录逻辑）
  currentUser: User;
  setCurrentUser: (user: Partial<User>) => void;
  
  // 订单管理
  orders: Order[];
  addOrder: (order: Omit<Order, 'id' | 'createdAt' | 'status'>) => void;
  updateOrderStatus: (orderId: string, status: Order['status'], runnerId?: string) => void;
  
  // 跑腿员申请
  runnerApplies: RunnerApply[];
  addRunnerApply: (apply: Omit<RunnerApply, 'id' | 'status' | 'applyAt'>) => void;
};

export const useStore = create<Store>((set) => ({
  // 默认用户（你可替换为现有登录用户）
  currentUser: { id: '1', name: '当前用户', role: 'student' },
  setCurrentUser: (user) => set((state) => ({
    currentUser: { ...state.currentUser, ...user }
  })),

  orders: [],
  addOrder: (order) => set((state) => ({
    orders: [...state.orders, {
      ...order,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      status: 'pending',
    }],
  })),

  updateOrderStatus: (orderId, status, runnerId) => set((state) => ({
    orders: state.orders.map(order =>
      order.id === orderId ? { ...order, status, runnerId } : order
    ),
  })),

  runnerApplies: [],
  addRunnerApply: (apply) => set((state) => ({
    runnerApplies: [...state.runnerApplies, {
      ...apply,
      id: Date.now().toString(),
      status: 'pending',
      applyAt: new Date().toISOString(),
    }],
  })),
}));
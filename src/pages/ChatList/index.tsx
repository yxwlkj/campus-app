import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// 模拟微信历史聊天记录
const chatHistory = [
  { id: 1, avatar: '👨‍💼', name: '张三', lastMsg: '明天一起吃饭？', time: '18:30', unread: 2 },
  { id: 2, avatar: '👩‍💻', name: '李四', lastMsg: '项目文档发你了', time: '昨天', unread: 0 },
  { id: 3, avatar: '👨‍🎓', name: '王五', lastMsg: '收到，谢谢！', time: '周一', unread: 0 },
  { id: 4, avatar: '👥', name: '前端学习群', lastMsg: '@所有人 周三开会', time: '上周', unread: 5 },
];

export default function ChatList() {
  const navigate = useNavigate();
  const [historyList, setHistoryList] = useState(chatHistory);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [showTopMenu, setShowTopMenu] = useState(false);

  // 进入单聊窗口
  const goToChat = (item: typeof chatHistory[0]) => {
    navigate(`/chat/${item.id}`, { state: { name: item.name, avatar: item.avatar } });
  };

  // 触发删除按钮显示
  const handleSwipe = (id: number) => {
    setDeleteId(deleteId === id ? null : id);
  };

  // 删除聊天
  const deleteChat = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setHistoryList(prev => prev.filter(item => item.id !== id));
    setDeleteId(null);
  };

  // 点击空白处关闭+号弹窗
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.top-menu-container') && showTopMenu) setShowTopMenu(false);
    };
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [showTopMenu]);

  return (
    <div style={{ maxWidth: 500, margin: '0 auto', height: '100vh', background: '#f5f5f5', display: 'flex', flexDirection: 'column' }}>
      {/* 顶部导航栏（微信绿色） */}
      <div style={{ background: '#07c160', color: '#fff', padding: '12px 16px', display: 'flex', alignItems: 'center', position: 'relative', zIndex: 10 }}>
        <div style={{ fontSize: 18, fontWeight: 'bold' }}>微信</div>
        <button
          onClick={(e) => { e.stopPropagation(); setShowTopMenu(!showTopMenu); }}
          style={{ marginLeft: 'auto', background: 'none', border: 'none', color: '#fff', fontSize: 22, cursor: 'pointer' }}
        >
          +
        </button>

        {/* 右上角+号菜单 */}
        {showTopMenu && (
          <div className="top-menu-container" style={{
            position: 'absolute', top: '100%', right: 16, background: '#2f2f2f', borderRadius: 8, width: 200, boxShadow: '0 4px 12px rgba(0,0,0,0.3)', zIndex: 1000
          }}>
            <div onClick={() => { navigate('/group'); setShowTopMenu(false); }} style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', cursor: 'pointer', borderBottom: '1px solid #444' }}>
              <span style={{ fontSize: 20, marginRight: 12 }}>👥</span><span style={{ color: '#fff', fontSize: 14 }}>发起群聊</span>
            </div>
            <div onClick={() => { navigate('/addfriend'); setShowTopMenu(false); }} style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', cursor: 'pointer', borderBottom: '1px solid #444' }}>
              <span style={{ fontSize: 20, marginRight: 12 }}>➕</span><span style={{ color: '#fff', fontSize: 14 }}>添加朋友</span>
            </div>
            <div onClick={() => { navigate('/scan'); setShowTopMenu(false); }} style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', cursor: 'pointer', borderBottom: '1px solid #444' }}>
              <span style={{ fontSize: 20, marginRight: 12 }}>📷</span><span style={{ color: '#fff', fontSize: 14 }}>扫一扫</span>
            </div>
            <div onClick={() => { navigate('/pay'); setShowTopMenu(false); }} style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
              <span style={{ fontSize: 20, marginRight: 12 }}>💳</span><span style={{ color: '#fff', fontSize: 14 }}>收付款</span>
            </div>
          </div>
        )}
      </div>

      {/* 聊天列表（完整微信样式） */}
      <div style={{ flex: 1, overflowY: 'auto' }}>
        {historyList.map(item => (
          <div
            key={item.id}
            onClick={() => goToChat(item)}
            onContextMenu={(e) => { e.preventDefault(); handleSwipe(item.id); }}
            onTouchStart={() => handleSwipe(item.id)}
            style={{ background: '#fff', padding: '12px 16px', borderBottom: '1px solid #eee', display: 'flex', alignItems: 'center', position: 'relative', height: 70 }}
          >
            {/* 头像 */}
            <div style={{ width: 48, height: 48, borderRadius: 4, background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, marginRight: 12 }}>
              {item.avatar}
            </div>
            {/* 名称+最后消息 */}
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontSize: 16, fontWeight: '500' }}>{item.name}</div>
                <div style={{ fontSize: 12, color: '#999' }}>{item.time}</div>
              </div>
              <div style={{ fontSize: 14, color: '#666', marginTop: 4, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {item.lastMsg}
              </div>
            </div>
            {/* 未读红点 */}
            {item.unread > 0 && (
              <div style={{ width: 20, height: 20, borderRadius: '50%', background: '#ff3b30', color: '#fff', fontSize: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', marginLeft: 8 }}>
                {item.unread}
              </div>
            )}
            {/* 删除按钮 */}
            {deleteId === item.id && (
              <div onClick={(e) => deleteChat(item.id, e)} style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 80, background: '#ff3b30', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, cursor: 'pointer' }}>
                删除
              </div>
            )}
          </div>
        ))}
      </div>

      {/* 底部导航栏（含跑腿） */}
      <div style={{ background: '#fff', borderTop: '1px solid #eee', display: 'flex', justifyContent: 'space-around', padding: '8px 0' }}>
        <button onClick={() => navigate('/chatlist')} style={{ background: 'none', border: 'none', fontSize: 12, color: '#07c160' }}>💬 聊天</button>
        <button onClick={() => navigate('/contacts')} style={{ background: 'none', border: 'none', fontSize: 12, color: '#666' }}>👥 通讯录</button>
        <button onClick={() => navigate('/errand')} style={{ background: 'none', border: 'none', fontSize: 12, color: '#666' }}>🚗 跑腿</button>
        <button onClick={() => navigate('/discover')} style={{ background: 'none', border: 'none', fontSize: 12, color: '#666' }}>🔍 发现</button>
        <button onClick={() => navigate('/profile')} style={{ background: 'none', border: 'none', fontSize: 12, color: '#666' }}>👤 我的</button>
      </div>
    </div>
  );
}
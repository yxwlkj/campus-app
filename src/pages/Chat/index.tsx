import { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

export default function Chat() {
  const navigate = useNavigate();
  const { id: _ } = useParams<{ id: string }>();
  const location = useLocation();
  const { name = '未知好友', avatar = '👤' } = location.state || {};

  // 核心状态
  const [messages, setMessages] = useState([
    { id: 1, content: '你好！', sender: 'other', time: '10:00' },
    { id: 2, content: '嗨，最近怎么样？', sender: 'me', time: '10:01' },
  ]);
  const [inputMsg, setInputMsg] = useState('');
  const [showToolBar, setShowToolBar] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const toolBarRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoCallRef = useRef<HTMLVideoElement>(null);

  // 发送消息
  const sendMessage = (content: string, type: 'text' | 'image' | 'location' | 'redpacket' | 'gift' | 'transfer' = 'text') => {
    let displayContent = content;
    if (type === 'image') displayContent = `🖼️ 图片消息`;
    if (type === 'location') displayContent = `📍 ${content}`;
    if (type === 'redpacket') displayContent = `🧧 ${content}`;
    if (type === 'gift') displayContent = `🎁 ${content}`;
    if (type === 'transfer') displayContent = `💴 ${content}`;
    const newMsg = { id: Date.now(), content: displayContent, sender: 'me', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setMessages([...messages, newMsg]);
  };

  // 相册/拍摄处理
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) { sendMessage(file.name, 'image'); e.target.value = ''; setShowToolBar(false); }
  };

  // 视频通话
  const handleVideoCall = async () => {
    setShowToolBar(false);
    if (confirm(`是否发起与${name}的视频通话？`)) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        const videoWindow = window.open('', '_blank', 'width=600,height=400');
        if (videoWindow) {
          videoWindow.document.write(`<div style="width:100%;height:100%;display:flex;flex-direction:column;"><h3 style="text-align:center;">与${name}的视频通话</h3><video autoplay muted style="width:100%;height:80%;background:#000;"></video><button onclick="window.close()" style="margin:10px auto;padding:8px 20px;background:#ff3b30;color:#fff;border:none;border-radius:8px;cursor:pointer;">结束通话</button></div>`);
          const video = videoWindow.document.querySelector('video') as HTMLVideoElement;
          video.srcObject = stream;
        }
      } catch (err) { alert('请允许摄像头/麦克风权限'); }
    }
  };

  // 位置
  const handleLocation = async () => {
    setShowToolBar(false);
    if (!navigator.geolocation) { alert('浏览器不支持定位'); return; }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const locationText = `我的位置：纬度${latitude.toFixed(6)}，经度${longitude.toFixed(6)}`;
        sendMessage(locationText, 'location');
        window.open(`https://map.baidu.com/?lat=${latitude}&lon=${longitude}`, '_blank');
      },
      (err) => { alert(`定位失败：${err.message}`); }
    );
  };

  // 红包/礼物/转账
  const handleRedPacket = () => {
    setShowToolBar(false);
    const amount = prompt('红包金额（元）：');
    if (amount && !isNaN(Number(amount)) && Number(amount) > 0) sendMessage(`🧧 恭喜发财，大吉大利！【${amount}元】`, 'redpacket');
    else alert('请输入有效金额');
  };

  const handleGift = () => {
    setShowToolBar(false);
    const gifts = ['玫瑰花', '跑车', '火箭'];
    const gift = prompt(`选择礼物（${gifts.join('、')}）：`, '玫瑰花');
    if (gift && gifts.includes(gift)) sendMessage(`🎁 赠送${name}【${gift}】礼物`, 'gift');
    else alert('选择有效礼物');
  };

  const handleTransfer = () => {
    setShowToolBar(false);
    const amount = prompt('转账金额（元）：');
    if (amount && !isNaN(Number(amount)) && Number(amount) > 0) {
      sendMessage(`💴 向${name}转账${amount}元`, 'transfer');
      alert(`转账${amount}元成功！`);
    } else alert('输入有效金额');
  };

  // 语音输入
  const handleVoiceInput = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) { alert('仅Chrome/Edge支持语音输入'); return; }
    const recognition = new SpeechRecognition();
    recognition.lang = 'zh-CN';

    if (!isListening) {
      setIsListening(true);
      recognition.start();
      alert('开始语音输入，请说话...');
      recognition.onresult = (event: any) => {
        const text = event.results[0][0].transcript;
        setInputMsg(text);
        setIsListening(false);
      };
      recognition.onerror = (e: any) => { alert(`语音识别失败：${e.error}`); setIsListening(false); };
    } else {
      recognition.stop();
      setIsListening(false);
    }
  };

  // 回车发送
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && inputMsg.trim()) { sendMessage(inputMsg); setInputMsg(''); }
  };

  // 点击空白关闭工具栏
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (toolBarRef.current && showToolBar && !toolBarRef.current.contains(e.target as Node)) {
        setShowToolBar(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [showToolBar]);

  // ========== 核心：和通讯录完全一致的外层容器 ==========
  return (
    <div style={{
      maxWidth: 500,          // 通讯录同款宽度
      margin: '0 auto',       // 居中显示
      height: '100vh',        // 全屏高度
      background: '#f5f5f5',  // 通讯录同款背景
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',     // 防止滚动溢出
      position: 'relative',   // 固定容器位置
      boxSizing: 'border-box' // 避免padding撑大容器
    }}>
      {/* 隐藏的文件输入框 */}
      <input ref={fileInputRef} type="file" style={{ display: 'none' }} onChange={handleFileChange} />
      <video ref={videoCallRef} style={{ display: 'none' }}></video>

      {/* 顶部导航（通讯录同款样式） */}
      <div style={{
        background: '#07c160',
        color: '#fff',
        padding: '12px 16px',
        display: 'flex',
        alignItems: 'center',
        boxSizing: 'border-box'
      }}>
        <button onClick={() => navigate('/chatlist')} style={{
          background: 'none',
          border: 'none',
          color: '#fff',
          fontSize: 18,
          cursor: 'pointer',
          padding: 0,
          margin: 0
        }}>←</button>
        <div style={{ marginLeft: 12, fontSize: 18, fontWeight: 'bold' }}>{name}</div>
        <div style={{ marginLeft: 'auto', fontSize: 18, cursor: 'pointer' }}>⋮</div>
      </div>

      {/* 消息列表（通讯录同款内边距） */}
      <div style={{
        flex: 1,
        padding: '16px',
        overflowY: 'auto',
        boxSizing: 'border-box'
      }}>
        {messages.map(m => (
          <div key={m.id} style={{
            display: 'flex',
            justifyContent: m.sender === 'me' ? 'flex-end' : 'flex-start',
            marginBottom: 12
          }}>
            {m.sender === 'other' && <div style={{ fontSize: 24, marginRight: 8 }}>{avatar}</div>}
            <div style={{
              maxWidth: '70%',
              background: m.sender === 'me' ? '#95ec69' : '#fff',
              padding: '8px 12px',
              borderRadius: 8,
              boxShadow: '0 1px 2px rgba(0,0,0,0.1)'
            }}>
              <div style={{ margin: 0, fontSize: 14 }}>{m.content}</div>
              <div style={{ fontSize: 10, color: '#999', textAlign: 'right', marginTop: '4px' }}>{m.time}</div>
            </div>
            {m.sender === 'me' && <div style={{ fontSize: 24, marginLeft: 8 }}>👤</div>}
          </div>
        ))}
      </div>

      {/* 底部输入区（通讯录同款边框/背景） */}
      <div style={{
        background: '#fff',
        borderTop: '1px solid #eee',
        boxSizing: 'border-box'
      }}>
        {/* 工具栏 */}
        {showToolBar && (
          <div ref={toolBarRef} style={{
            padding: '16px',
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '16px',
            background: '#f7f7f7',
            borderBottom: '1px solid #eee'
          }}>
            <div onClick={() => { if (fileInputRef.current) { fileInputRef.current.accept = 'image/*'; fileInputRef.current.click(); } }} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer' }}>
              <div style={{ fontSize: 28, marginBottom: 4 }}>🖼️</div>
              <div style={{ fontSize: 12, color: '#333' }}>相册</div>
            </div>
            <div onClick={() => { if (fileInputRef.current) { fileInputRef.current.accept = 'image/*'; fileInputRef.current.capture = 'camera'; fileInputRef.current.click(); } }} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer' }}>
              <div style={{ fontSize: 28, marginBottom: 4 }}>📷</div>
              <div style={{ fontSize: 12, color: '#333' }}>拍摄</div>
            </div>
            <div onClick={handleVideoCall} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer' }}>
              <div style={{ fontSize: 28, marginBottom: 4 }}>📹</div>
              <div style={{ fontSize: 12, color: '#333' }}>视频通话</div>
            </div>
            <div onClick={handleLocation} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer' }}>
              <div style={{ fontSize: 28, marginBottom: 4 }}>📍</div>
              <div style={{ fontSize: 12, color: '#333' }}>位置</div>
            </div>
            <div onClick={handleRedPacket} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer' }}>
              <div style={{ fontSize: 28, marginBottom: 4 }}>🧧</div>
              <div style={{ fontSize: 12, color: '#333' }}>红包</div>
            </div>
            <div onClick={handleGift} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer' }}>
              <div style={{ fontSize: 28, marginBottom: 4 }}>🎁</div>
              <div style={{ fontSize: 12, color: '#333' }}>礼物</div>
            </div>
            <div onClick={handleTransfer} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer' }}>
              <div style={{ fontSize: 28, marginBottom: 4 }}>💴</div>
              <div style={{ fontSize: 12, color: '#333' }}>转账</div>
            </div>
            <div onClick={handleVoiceInput} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer' }}>
              <div style={{ fontSize: 28, marginBottom: 4, color: isListening ? '#ff3b30' : '#333' }}>🎙️</div>
              <div style={{ fontSize: 12, color: isListening ? '#ff3b30' : '#333' }}>{isListening ? '停止录音' : '语音输入'}</div>
            </div>
          </div>
        )}

        {/* 输入框区域 */}
        <div style={{
          padding: '8px 16px',
          display: 'flex',
          alignItems: 'center',
          boxSizing: 'border-box'
        }}>
          <button onClick={(e) => { e.stopPropagation(); setShowToolBar(!showToolBar); }} style={{
            background: 'none',
            border: 'none',
            fontSize: 20,
            cursor: 'pointer',
            marginRight: 8,
            padding: 0
          }}>+</button>
          <input value={inputMsg} onChange={(e) => setInputMsg(e.target.value)} onKeyDown={handleKeyDown} placeholder="输入消息..." style={{
            flex: 1,
            padding: '8px 12px',
            border: '1px solid #ddd',
            borderRadius: 20,
            outline: 'none',
            fontSize: 14,
            boxSizing: 'border-box'
          }} />
          <button onClick={handleVoiceInput} style={{
            background: 'none',
            border: 'none',
            fontSize: 18,
            cursor: 'pointer',
            marginLeft: 8,
            color: isListening ? '#ff3b30' : '#333',
            padding: 0
          }}>🎙️</button>
          <button style={{
            background: 'none',
            border: 'none',
            fontSize: 18,
            cursor: 'pointer',
            marginLeft: 8,
            padding: 0
          }}>😊</button>
          <button onClick={() => { if (inputMsg.trim()) sendMessage(inputMsg); setInputMsg(''); }} disabled={!inputMsg.trim()} style={{
            marginLeft: 8,
            padding: '8px 16px',
            background: inputMsg.trim() ? '#07c160' : '#ccc',
            color: '#fff',
            border: 'none',
            borderRadius: 20,
            fontSize: 14,
            cursor: inputMsg.trim() ? 'pointer' : 'not-allowed'
          }}>发送</button>
        </div>
      </div>

      {/* 底部导航（通讯录同款样式） */}
      <div style={{
        background: '#fff',
        borderTop: '1px solid #eee',
        display: 'flex',
        justifyContent: 'space-around',
        padding: '8px 0',
        boxSizing: 'border-box'
      }}>
        <button onClick={() => navigate('/chatlist')} style={{
          background: 'none',
          border: 'none',
          fontSize: 12,
          color: '#666',
          cursor: 'pointer',
          padding: 0
        }}>💬 聊天</button>
        <button onClick={() => navigate('/contacts')} style={{
          background: 'none',
          border: 'none',
          fontSize: 12,
          color: '#666',
          cursor: 'pointer',
          padding: 0
        }}>👥 通讯录</button>
        <button onClick={() => navigate('/errand')} style={{
          background: 'none',
          border: 'none',
          fontSize: 12,
          color: '#666',
          cursor: 'pointer',
          padding: 0
        }}>🚗 跑腿</button>
        <button onClick={() => navigate('/discover')} style={{
          background: 'none',
          border: 'none',
          fontSize: 12,
          color: '#666',
          cursor: 'pointer',
          padding: 0
        }}>🔍 发现</button>
        <button onClick={() => navigate('/profile')} style={{
          background: 'none',
          border: 'none',
          fontSize: 12,
          color: '#666',
          cursor: 'pointer',
          padding: 0
        }}>👤 我的</button>
      </div>
    </div>
  );
}
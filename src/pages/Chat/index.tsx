import { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

export default function Chat() {
  const navigate = useNavigate();
  const { id: _ } = useParams<{ id: string }>();
  const location = useLocation();
  const { name = '未知好友', avatar = '👤' } = location.state || {};

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) { sendMessage(file.name, 'image'); e.target.value = ''; setShowToolBar(false); }
  };

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
      } catch (err) { alert('请允许摄像头/麦克风权限，或检查设备是否可用'); }
    }
  };

  const handleLocation = async () => {
    setShowToolBar(false);
    if (!navigator.geolocation) { alert('您的浏览器不支持定位功能'); return; }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const locationText = `我的位置：纬度${latitude.toFixed(6)}，经度${longitude.toFixed(6)}`;
        sendMessage(locationText, 'location');
        window.open(`https://map.baidu.com/?lat=${latitude}&lon=${longitude}`, '_blank');
      },
      (err) => { alert(`定位失败：${err.message}，请开启定位权限`); }
    );
  };

  const handleRedPacket = () => {
    setShowToolBar(false);
    const amount = prompt('请输入红包金额（元）：');
    if (amount && !isNaN(Number(amount)) && Number(amount) > 0) { sendMessage(`恭喜发财，大吉大利！【${amount}元红包】`, 'redpacket'); }
    else { alert('请输入有效的金额'); }
  };

  const handleGift = () => {
    setShowToolBar(false);
    const gifts = ['玫瑰花', '跑车', '火箭', '爱心', '啤酒'];
    const selectedGift = prompt(`请选择礼物（可选：${gifts.join('、')}）：`, '玫瑰花');
    if (selectedGift && gifts.includes(selectedGift)) { sendMessage(`赠送${name}一份【${selectedGift}】礼物`, 'gift'); }
    else { alert('请选择有效的礼物'); }
  };

  const handleTransfer = () => {
    setShowToolBar(false);
    const amount = prompt('请输入转账金额（元）：');
    if (amount && !isNaN(Number(amount)) && Number(amount) > 0) { sendMessage(`向${name}转账${amount}元`, 'transfer'); alert(`转账${amount}元成功！`); }
    else { alert('请输入有效的金额'); }
  };

  const handleVoiceInput = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) { alert('您的浏览器不支持语音输入功能（推荐使用Chrome）'); return; }
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'zh-CN';

    if (!isListening) {
      setIsListening(true);
      recognition.start();
      alert('开始语音输入，请说话...');
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputMsg(transcript);
        setIsListening(false);
      };
      recognition.onerror = (event: any) => { alert(`语音识别失败：${event.error}`); setIsListening(false); };
      recognition.onend = () => { setIsListening(false); alert('语音输入结束'); };
    } else {
      recognition.stop();
      setIsListening(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && inputMsg.trim()) { sendMessage(inputMsg); setInputMsg(''); }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (toolBarRef.current && !toolBarRef.current.contains(e.target as Node) && showToolBar) setShowToolBar(false);
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [showToolBar]);

  return (
    <div style={{ maxWidth: 500, margin: '0 auto', height: '100vh', background: '#f5f5f5', display: 'flex', flexDirection: 'column' }}>
      <input ref={fileInputRef} type="file" style={{ display: 'none' }} onChange={handleFileChange} />
      <video ref={videoCallRef} style={{ display: 'none' }}></video>

      <div style={{ background: '#07c160', color: '#fff', padding: '12px 16px', display: 'flex', alignItems: 'center' }}>
        <button onClick={() => navigate('/chatlist')} style={{ background: 'none', border: 'none', color: '#fff', fontSize: 18, cursor: 'pointer' }}>←</button>
        <div style={{ marginLeft: 12, fontSize: 18, fontWeight: 'bold' }}>{name}</div>
        <div style={{ marginLeft: 'auto', fontSize: 18, cursor: 'pointer' }}>⋮</div>
      </div>

      <div style={{ flex: 1, padding: 16, overflowY: 'auto' }}>
        {messages.map(m => (
          <div key={m.id} style={{ display: 'flex', justifyContent: m.sender === 'me' ? 'flex-end' : 'flex-start', marginBottom: 12 }}>
            {m.sender === 'other' && <div style={{ fontSize: 24, marginRight: 8 }}>{avatar}</div>}
            <div style={{ maxWidth: '70%', background: m.sender === 'me' ? '#95ec69' : '#fff', padding: '8px 12px', borderRadius: 8, boxShadow: '0 1px 2px rgba(0,0,0,0.1)' }}>
              <div style={{ margin: 0, fontSize: 14 }}>{m.content}</div>
              <div style={{ fontSize: 10, color: '#999', textAlign: 'right', marginTop: '4px' }}>{m.time}</div>
            </div>
            {m.sender === 'me' && <div style={{ fontSize: 24, marginLeft: 8 }}>👤</div>}
          </div>
        ))}
      </div>

      <div style={{ background: '#fff', borderTop: '1px solid #eee' }}>
        {showToolBar && (
          <div ref={toolBarRef} style={{ padding: '16px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', background: '#f7f7f7', borderBottom: '1px solid #eee' }}>
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

        <div style={{ padding: '8px 16px', display: 'flex', alignItems: 'center' }}>
          <button onClick={(e) => { e.stopPropagation(); setShowToolBar(!showToolBar); }} style={{ background: 'none', border: 'none', fontSize: 20, cursor: 'pointer', marginRight: 8 }}>+</button>
          <input value={inputMsg} onChange={(e) => setInputMsg(e.target.value)} onKeyDown={handleKeyDown} placeholder="输入消息..." style={{ flex: 1, padding: '8px 12px', border: '1px solid #ddd', borderRadius: 20, outline: 'none', fontSize: 14 }} />
          <button onClick={handleVoiceInput} style={{ background: 'none', border: 'none', fontSize: 18, cursor: 'pointer', marginLeft: 8, color: isListening ? '#ff3b30' : '#333' }}>🎙️</button>
          <button style={{ background: 'none', border: 'none', fontSize: 18, cursor: 'pointer', marginLeft: 8 }}>😊</button>
          <button onClick={() => { if (inputMsg.trim()) sendMessage(inputMsg); setInputMsg(''); }} disabled={!inputMsg.trim()} style={{ marginLeft: 8, padding: '8px 16px', background: inputMsg.trim() ? '#07c160' : '#ccc', color: '#fff', border: 'none', borderRadius: 20, fontSize: 14, cursor: inputMsg.trim() ? 'pointer' : 'not-allowed' }}>发送</button>
        </div>
      </div>

      <div style={{ background: '#fff', borderTop: '1px solid #eee', display: 'flex', justifyContent: 'space-around', padding: '8px 0' }}>
        <button onClick={() => navigate('/chatlist')} style={{ background: 'none', border: 'none', fontSize: 12, color: '#666' }}>💬 聊天</button>
        <button onClick={() => navigate('/contacts')} style={{ background: 'none', border: 'none', fontSize: 12, color: '#666' }}>👥 通讯录</button>
        <button onClick={() => navigate('/errand')} style={{ background: 'none', border: 'none', fontSize: 12, color: '#666' }}>🚗 跑腿</button>
        <button onClick={() => navigate('/discover')} style={{ background: 'none', border: 'none', fontSize: 12, color: '#666' }}>🔍 发现</button>
        <button onClick={() => navigate('/profile')} style={{ background: 'none', border: 'none', fontSize: 12, color: '#666' }}>👤 我的</button>
      </div>
    </div>
  );
}
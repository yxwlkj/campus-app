import { useState } from 'react'

// 模拟动态数据
const mockMoments = [
  {
    id: 1,
    user: '张三',
    avatar: '👦',
    content: '今天的晚霞好美！🌇',
    image: 'https://picsum.photos/seed/sunset/400/300',
    time: '2小时前',
    likes: 23,
    comments: 5,
  },
  {
    id: 2,
    user: '李四',
    avatar: '👧',
    content: '图书馆学习打卡📚',
    image: 'https://picsum.photos/seed/library/400/300',
    time: '5小时前',
    likes: 15,
    comments: 3,
  },
]

function Moments() {
  const [moments, setMoments] = useState(mockMoments)
  const [newContent, setNewContent] = useState('')

  // 发布动态
  const handlePublish = () => {
    if (!newContent.trim()) return
    const moment = {
      id: moments.length + 1,
      user: '我',
      avatar: '👨',
      content: newContent,
      image: 'https://picsum.photos/seed/new/400/300',
      time: '刚刚',
      likes: 0,
      comments: 0,
    }
    setMoments([moment, ...moments])
    setNewContent('')
  }

  return (
    <div className="moments-page">
      <h2>校园动态</h2>

      {/* 发布动态 */}
      <div style={{ border: '1px solid #eee', borderRadius: '8px', padding: '20px', marginBottom: '20px' }}>
        <textarea
          placeholder="分享你的校园生活..."
          value={newContent}
          onChange={(e) => setNewContent(e.target.value)}
          style={{
            width: '100%',
            minHeight: '100px',
            padding: '10px',
            border: '1px solid #ddd',
            borderRadius: '6px',
            outline: 'none',
            resize: 'none',
          }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
          <span style={{ fontSize: '12px', color: '#999' }}>可添加图片/话题</span>
          <button
            onClick={handlePublish}
            style={{
              padding: '10px 20px',
              border: 'none',
              borderRadius: '20px',
              backgroundColor: '#0071e3',
              color: '#fff',
              cursor: 'pointer',
            }}
          >
            发布
          </button>
        </div>
      </div>

      {/* 动态列表 */}
      <div>
        {moments.map(moment => (
          <div
            key={moment.id}
            style={{
              border: '1px solid #eee',
              borderRadius: '8px',
              padding: '20px',
              marginBottom: '15px',
              backgroundColor: '#fff',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
              <span style={{ fontSize: '28px' }}>{moment.avatar}</span>
              <div>
                <div style={{ fontWeight: '500' }}>{moment.user}</div>
                <div style={{ fontSize: '12px', color: '#999' }}>{moment.time}</div>
              </div>
            </div>
            <p style={{ marginBottom: '10px' }}>{moment.content}</p>
            <img
              src={moment.image}
              alt="动态图片"
              style={{ width: '100%', borderRadius: '8px', marginBottom: '10px' }}
            />
            <div style={{ display: 'flex', gap: '20px', fontSize: '14px', color: '#666' }}>
              <span>👍 {moment.likes}</span>
              <span>💬 {moment.comments}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Moments
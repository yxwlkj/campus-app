import { useState } from 'react';
import { Avatar, Input, Button, LikeButton, Space, Tag } from 'antd-mobile';
import './index.css';

const initialFeeds = [
  {
    id: 1,
    author: '小李',
    avatar: 'https://picsum.photos/100/100?random=1',
    content: '今天图书馆学习打卡～',
    image: 'https://picsum.photos/400/300?random=10',
    time: '1小时前',
    likes: 12,
    comments: [
      { id: 101, user: '小张', content: '卷王！' },
      { id: 102, user: '小王', content: '求带～' },
    ],
    isLiked: false,
  },
  {
    id: 2,
    author: '辅导员',
    avatar: 'https://picsum.photos/100/100?random=2',
    content: '下周开始实习答辩，大家提前准备',
    time: '3小时前',
    likes: 28,
    comments: [],
    isLiked: true,
  },
  {
    id: 3,
    author: '校园跑腿',
    avatar: 'https://picsum.photos/100/100?random=3',
    content: '今日特价：奶茶代买8折！',
    image: 'https://picsum.photos/400/300?random=11',
    time: '5小时前',
    likes: 45,
    comments: [
      { id: 103, user: '小明', content: '能代买食堂吗？' },
    ],
    isLiked: false,
  },
];

export default function Moments() {
  const [feeds, setFeeds] = useState(initialFeeds);
  const [postContent, setPostContent] = useState('');

  const toggleLike = (feedId: number) => {
    setFeeds(
      feeds.map(feed => {
        if (feed.id === feedId) {
          const newLikes = feed.isLiked ? feed.likes - 1 : feed.likes + 1;
          return { ...feed, isLiked: !feed.isLiked, likes: newLikes };
        }
        return feed;
      })
    );
  };

  const postFeed = () => {
    if (!postContent.trim()) return;
    
    const newFeed = {
      id: Date.now(),
      author: '我',
      avatar: 'https://picsum.photos/100/100?random=0',
      content: postContent.trim(),
      time: '刚刚',
      likes: 0,
      comments: [],
      isLiked: false,
    };

    setFeeds([newFeed, ...feeds]);
    setPostContent('');
  };

  return (
    <div className="moments-page">
      <div className="moments-header">
        <h2>朋友圈</h2>
      </div>

      <div className="post-box">
        <Avatar src="https://picsum.photos/100/100?random=0" size="small" />
        <Input
          value={postContent}
          onChange={setPostContent}
          placeholder="分享新鲜事..."
          className="post-input"
        />
        <Button type="primary" onClick={postFeed} size="small">
          发布
        </Button>
      </div>

      <div className="feeds-list">
        {feeds.map(feed => (
          <div key={feed.id} className="feed-item">
            <div className="feed-header">
              <Avatar src={feed.avatar} size="small" />
              <div className="feed-info">
                <span className="feed-author">{feed.author}</span>
                <span className="feed-time">{feed.time}</span>
              </div>
            </div>

            <div className="feed-content">{feed.content}</div>
            
            {feed.image && (
              <img src={feed.image} alt="feed-img" className="feed-image" />
            )}

            <div className="feed-actions">
              <Space>
                <LikeButton
                  liked={feed.isLiked}
                  onClick={() => toggleLike(feed.id)}
                />
                <span className="likes-count">{feed.likes} 赞</span>
              </Space>

              {feed.comments.length > 0 && (
                <div className="comments-list">
                  {feed.comments.map(comment => (
                    <div key={comment.id} className="comment-item">
                      <span className="comment-user">{comment.user}：</span>
                      <span className="comment-content">{comment.content}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import type { PostInfo } from './PostsPage/types';
import PostHeader from './PostHeader';
import Avatar from './Avatar';
import Divider from './Divider';

const PostDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [post, setPost] = useState<PostInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState('');

  const fetchPost = useCallback(async () => {
    if (!id) return;

    try {
      setLoading(true);
      const response = await fetch(`http://localhost:7070/posts/${id}`);

      if (!response.ok) throw new Error('Пост не найден');

      const data = await response.json();
      const postData = data.post;

      setPost(postData);
      setEditContent(postData.content);
    } catch (err) {
      console.error(err);
      setError('Пост не найден');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchPost();
  }, [id, fetchPost]);

  const handleDelete = async () => {
    if (!id || !window.confirm('Вы уверены, что хотите удалить этот пост?'))
      return;

    try {
      const response = await fetch(`http://localhost:7070/posts/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Ошибка удаления');

      navigate('/posts');
    } catch (err) {
      console.error(err);
      alert('Не удалось удалить пост');
    }
  };

  const handleSave = async () => {
    if (!id || !post) return;

    try {
      const response = await fetch(`http://localhost:7070/posts/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: post.id,
          content: editContent,
        }),
      });

      if (!response.ok) throw new Error('Ошибка сохранения');
      setIsEditing(false);
      await fetchPost();
    } catch (err) {
      console.error(err);
      alert('Не удалось сохранить изменения');
    }
  };

  const startEditing = () => {
    setEditContent(post?.content || '');
    setIsEditing(true);
  };

  const cancelEditing = () => {
    setIsEditing(false);
  };

  if (loading) return <div>Загрузка...</div>;
  if (error || !post)
    return (
      <div className="error-message">
        {error || 'Пост не найден'}
        <Link to="/posts">Вернуться на главную</Link>
      </div>
    );

  return (
    <div className="post-detail-page">
      <div className="post">
        {isEditing ? (
          <div className="editing-header">
            <span className="editing-title">Редактировать публикацию</span>
            <button
              type="button"
              className="btn-close"
              onClick={cancelEditing}
              aria-label="Закрыть"
            >
              ✕
            </button>
          </div>
        ) : (
          <PostHeader
            {...post}
            handleCancelButtonClick={() => navigate('/posts')}
          />
        )}

        <div className="post-content">
          {isEditing ? (
            <div className="editing-mode">
              <div className="editor-wrapper">
                <Avatar />
                <textarea
                  className="post-textarea"
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  rows={6}
                  autoFocus
                />
              </div>

              <Divider />
              <div className="attachments">
                <span>Фото/видео</span>
                <span>Отметить друзей</span>
                <span>Чувства/действия</span>
                <span>Отметить посещение</span>
                <span>GIF</span>
              </div>
              <div className="edit-actions">
                <button
                  className="btn-primary"
                  onClick={handleSave}
                  disabled={!editContent.trim()}
                >
                  Сохранить
                </button>
              </div>
            </div>
          ) : (
            <p>{post.content}</p>
          )}
        </div>
        {!isEditing && (
          <div className="edit-actions">
            <button className="btn-primary" onClick={startEditing}>
              Изменить
            </button>
            <button className="btn-delete" onClick={handleDelete}>
              Удалить
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostDetailPage;

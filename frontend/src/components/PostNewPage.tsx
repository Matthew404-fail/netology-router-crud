import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Avatar from './Avatar';

const PostNewPage = () => {
  const [postContent, setPostContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPostContent(e.currentTarget.value);
  };

  const handleClose = () => {
    navigate('/posts/');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!postContent.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:7070/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: 0,
          content: postContent,
        }),
      });

      if (!response.ok) {
        throw new Error('Ошибка при создании поста');
      }

      navigate('/posts');
    } catch (err) {
      console.error(err);
      setError('Не удалось опубликовать пост. Попробуйте позже.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="post-new-page">
      <div className="post-new-card">
        <div className="post-new-header">
          <div className="post-new-tabs">
            <span>Публикация</span>
            <span>Фото/Видео</span>
            <span>Прямой эфир</span>
            <span>Ещё</span>
          </div>
          <button
            type="button"
            className="btn-close"
            onClick={handleClose}
            aria-label="Закрыть"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="new-post-form">
          {error && <div className="error-message">{error}</div>}

          <div className="new-post-content">
            <Avatar />

            <textarea
              className="post-textarea"
              value={postContent}
              onChange={handleInputChange}
              rows={6}
              autoFocus
            />
          </div>

          <div className="edit-actions">
            <button
              className="btn-primary"
              type="submit"
              disabled={isLoading || !postContent.trim()}
            >
              {isLoading ? 'Публикация...' : 'Опубликовать'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostNewPage;

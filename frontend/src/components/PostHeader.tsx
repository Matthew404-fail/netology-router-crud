import Avatar from './Avatar';
import CreatedTime from './CreatedTime';

type PostHeaderProps = {
  username?: string;
  status?: string;
  created: string | number | Date;
  avatarUrl?: string;
  handleCancelButtonClick?: () => void;
};

const PostHeader = ({
  username,
  status,
  created,
  handleCancelButtonClick,
}: PostHeaderProps) => {
  return (
    <div className="post-header-wrapper">
      <div className="post-header">
        <Avatar />
        <div className="post-info">
          <span className="post-username">{username ?? 'Ilnaz Gylazov'}</span>
          <div className="post-meta">
            <span className="post-user-status">
              {status ?? 'Основатель группы'}
            </span>
            <span className="post-created">
              <CreatedTime date={created} />
            </span>
          </div>
        </div>
      </div>
      {handleCancelButtonClick && (
        <button
          type="button"
          className="btn-close"
          onClick={handleCancelButtonClick}
          aria-label="Закрыть"
        >
          ✕
        </button>
      )}
    </div>
  );
};

export default PostHeader;

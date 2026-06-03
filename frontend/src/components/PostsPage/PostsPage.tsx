import { Link, useNavigate } from 'react-router-dom';
import Post from '../Post';
import { usePosts } from './usePosts';

const PostsPage = () => {
  const { posts } = usePosts();
  const navigate = useNavigate();

  const handleCreateButtonClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/posts/new');
  };

  return (
    <div className="posts-page">
      <div className="posts-header">
        <button
          type="button"
          className="btn-primary"
          onClick={handleCreateButtonClick}
        >
          Создать пост
        </button>
      </div>
      <div className="posts">
        {posts.map((post) => (
          <Link to={`/posts/${post.id}`} key={post.id}>
            <Post {...post} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PostsPage;

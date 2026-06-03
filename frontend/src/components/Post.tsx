import Divider from './Divider';
import PostHeader from './PostHeader';
import type { PostInfo } from './PostsPage/types';

type PostProps = PostInfo;

const Post = ({ created, content }: PostProps) => {
  return (
    <div className="post">
      <PostHeader created={created} />
      <Divider />
      <div className="post-content">{content}</div>
      <Divider />
      <div className="post-actions">
        <span> 👍 Нравится</span>
        <span> 💬 Комментировать</span>
      </div>
    </div>
  );
};

export default Post;

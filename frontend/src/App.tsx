import './App.css';
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';
import PostsPage from './components/PostsPage/PostsPage';
import PostNewPage from './components/PostNewPage';
import PostDetailPage from './components/PostDetailPage';
import NotFoundPage from './components/NotFoundPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to={'/posts'} />,
    errorElement: <NotFoundPage />,
  },
  {
    path: '/posts',
    element: <PostsPage />,
  },
  {
    path: '/posts/new',
    element: <PostNewPage />,
  },
  {
    path: '/posts/:id',
    element: <PostDetailPage />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;

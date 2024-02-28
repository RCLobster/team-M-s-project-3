import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App.jsx';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import CreateStory from './pages/CreateStory';
import StorySelector from './pages/StorySelector';
import Story from './pages/Story';
import NotFound from './pages/NotFound';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />
      }, {
        path: '/login',
        element: <Login />
      }, {
        path: '/signup',
        element: <Signup />
      }, {
        path: '/create-story',
        element: <CreateStory />
      }, {
        path: '/story-selector',
        element: <StorySelector />
      }, {
        path: '/story/:id',
        element: <Story />
      }, {
        path: '/profile',
        element: <Profile />
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);

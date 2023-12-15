import { useEffect } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import RootLayout from './components/layouts/RootLayout';
import ChatPage from './components/pages/ChatPage/ChatPage';
import SignInPage from './components/pages/SignInPage/SignInPage';
import SignUpPage from './components/pages/SignUpPage.tsx/SignUpPage';
import FirebaseService from './services/FirebaseService';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        path: '/signup',
        element: <SignUpPage />,
      },
      {
        path: '/signin',
        element: <SignInPage />,
      },
      {
        path: '/chat',
        element: <ChatPage />,
      },
    ],
  },
]);

function App() {
  useEffect(() => {
    FirebaseService.init();
  }, []);

  return <RouterProvider router={router} />;
}

export default App;

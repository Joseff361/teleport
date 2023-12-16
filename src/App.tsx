import { useEffect } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import RootLayout from './components/layouts/RootLayout';
import ChatPage from './components/pages/ChatPage/ChatPage';
import ErrorPage from './components/pages/ErrorPage/ErrorPage';
import SignInPage from './components/pages/SignInPage/SignInPage';
import SignUpPage from './components/pages/SignUpPage.tsx/SignUpPage';
import FirebaseService from './services/FirebaseService';

const router = createBrowserRouter([
  {
    path: '/', // Absoulte path due it starts with "/"
    element: <RootLayout />,
    // For this implementation, all the errors will bubble up to the root route definition
    errorElement: <ErrorPage />,
    children: [
      {
        index: true, // Default page if the parent is active
        element: <SignInPage />,
      },
      {
        path: 'signup', // Relative path due it starts without "/"
        element: <SignUpPage />,
      },
      {
        path: 'chat', // Relative path
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

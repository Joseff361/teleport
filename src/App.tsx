import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import RootLayout from './components/layouts/RootLayout';
import ChatPage from './components/pages/ChatPage/ChatPage';
import ErrorPage from './components/pages/ErrorPage/ErrorPage';
import SignInPage from './components/pages/SignInPage/SignInPage';
import SignUpPage from './components/pages/SignUpPage.tsx/SignUpPage';
import FirebaseService from './services/FirebaseService';
import { store } from './store';
import { checkAuthLoader, fetchCredentials } from './utils/autht';

const router = createBrowserRouter([
  {
    path: '/', // Absoulte path due it starts with "/"
    element: <RootLayout />,
    // Any kind of navigation will trigger this loader
    loader: fetchCredentials,
    // For this implementation, all the errors will bubble up to the root route definition
    errorElement: <ErrorPage />, // If there is an error in some of the children paths (or the current path), this screen will be shown
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
        loader: checkAuthLoader,
      },
      {
        path: '*',
        element: <ChatPage />,
        loader: checkAuthLoader,
      },
    ],
  },
]);

function App() {
  useEffect(() => {
    FirebaseService.init();
  }, []);

  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;

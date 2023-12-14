import { useEffect } from 'react';
import './App.css';

import Chat from './Components/organisms/Chat/Chat';
import LoginForm from './Components/organisms/LoginForm/LoginForm';
import FirebaseService from './services/FirebaseService';

function App() {
  useEffect(() => {
    FirebaseService.init();
  }, []);

  return (
    <>
      <LoginForm />
      <Chat />
    </>
  );
}

export default App;

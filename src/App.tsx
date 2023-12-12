import { useEffect } from 'react';
import './App.css';
import LoginForm from './Components/organisms/LoginForm/LoginForm';
import FirebaseService from './services/FirebaseService';

function App() {
  useEffect(() => {
    FirebaseService.init();
  }, []);

  return (
    <>
      <LoginForm />
    </>
  );
}

export default App;

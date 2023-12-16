import { useNavigate } from 'react-router-dom';

import LoginForm from '../../organisms/LoginForm/LoginForm';

function SignUpPage() {
  const navigate = useNavigate();

  const navigationHandler = () => {
    navigate('/chat');
  };

  return (
    <div>
      SignUpPage
      <LoginForm />
      <button type="button" onClick={navigationHandler}>
        go to chat
      </button>
    </div>
  );
}

export default SignUpPage;

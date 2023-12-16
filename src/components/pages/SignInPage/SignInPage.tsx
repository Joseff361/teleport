import { useNavigate } from 'react-router-dom';

function SignInPage() {
  const navigate = useNavigate();

  const signInHandler = () => {
    navigate('/chat');
  };

  const signUpHandler = () => {
    navigate('/signup');
  };

  return (
    <div>
      SignInPage
      <button type="button" onClick={signInHandler}>
        go to chat
      </button>
      <button type="button" onClick={signUpHandler}>
        go to signup
      </button>
    </div>
  );
}

export default SignInPage;

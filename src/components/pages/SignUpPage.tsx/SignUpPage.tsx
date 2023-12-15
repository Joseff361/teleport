import { Link } from 'react-router-dom';

import LoginForm from '../../organisms/LoginForm/LoginForm';

function SignUpPage() {
  return (
    <div>
      SignUpPage
      <LoginForm />
      <Link to="/chat">Go to chat</Link>
    </div>
  );
}

export default SignUpPage;

import { useNavigate } from 'react-router-dom';

import { logout } from '../../../utils/auth';
import Chat from '../../organisms/Chat/Chat';
import SendMessageForm from '../../organisms/SendMessageForm/SendMessageForm';

function ChatPage() {
  const navigate = useNavigate();

  const signOutHandler = () => {
    logout();
    navigate('/');
  };

  return (
    <div>
      ChatPage
      <Chat />
      <SendMessageForm />
      <button type="button" onClick={signOutHandler}>
        sign out
      </button>
    </div>
  );
}

export default ChatPage;

import { useNavigate } from 'react-router-dom';

import { logout } from '../../../utils/autht';
import Chat from '../../organisms/Chat/Chat';

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
      <button type="button" onClick={signOutHandler}>
        sign out
      </button>
    </div>
  );
}

export default ChatPage;

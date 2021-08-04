import ChatWindow from './ChatWindow';
import ChatInput from './ChatInput';

const Chat = (props) => {
  return (
    <div>
      {props.chat && <ChatWindow chat={props.chat} />}
      <ChatInput sendMessage={props.onSendMessage} />
    </div>
  );
};

export default Chat;

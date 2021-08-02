import ChatWindow from './ChatWindow';
import ChatInput from './ChatInput';

const Chat = (props) => {
  return (
    <div>
      <ChatInput sendMessage={props.onSendMessage} />
      <hr />
      {props.chat && <ChatWindow chat={props.chat} />}
    </div>
  );
};

export default Chat;

import ChatWindow from './ChatWindow';
import ChatInput from './ChatInput';
import { makeStyles, List } from '@material-ui/core';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  chatSection: {
    width: '100%',
    height: '80vh',
  },
  headBG: {
    backgroundColor: '#e0e0e0',
  },
  borderRight500: {
    borderRight: '1px solid #e0e0e0',
  },
  messageArea: {
    height: '70vh',
    overflowY: 'auto',
  },
});

const Chat = (props) => {
  const classes = useStyles();
  return (
    <List className={classes.messageArea}>
      {props.chat && <ChatWindow chat={props.chat} />}
      <ChatInput sendMessage={props.onSendMessage} />
    </List>
  );
};

export default Chat;

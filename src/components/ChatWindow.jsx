import React from 'react';
import Message from './Message';

// const useStyles = makeStyles({
//   table: {
//     minWidth: 650,
//   },
//   chatSection: {
//     width: '100%',
//     height: '80vh',
//   },
//   headBG: {
//     backgroundColor: '#e0e0e0',
//   },
//   borderRight500: {
//     borderRight: '1px solid #e0e0e0',
//   },
//   messageArea: {
//     height: '70vh',
//     overflowY: 'auto',
//   },
// });

const ChatWindow = (props) => {
  //const classes = useStyles();
  const chat = props.chat.map((m) => (
    <Message
      key={Date.now() * Math.random()}
      user={m.user}
      message={m.message}
    />
  ));

  return <div>{chat}</div>;
};

export default ChatWindow;

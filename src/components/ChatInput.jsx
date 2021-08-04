import React, { useState } from 'react';

import { Grid, Divider, TextField, Fab } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';

const ChatInput = (props) => {
  const [message, setMessage] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    const isMessageProvided = message && message !== '';

    if (isMessageProvided) {
      const chatMessage = {
        message: message,
      };
      props.sendMessage(chatMessage);
      setMessage('');
    } else {
      alert('Please insert an user and a message.');
    }
  };

  const onMessageUpdate = (e) => {
    setMessage(e.target.value);
  };

  return (
    <div>
      <Divider />
      <form>
        <Grid container style={{ padding: '20px' }}>
          <Grid item xs={11}>
            <TextField
              id="message"
              name="message"
              value={message}
              onChange={onMessageUpdate}
              label="Type Something"
              fullWidth
            />
          </Grid>
          <Grid xs={1} align="right">
            <Fab color="primary" aria-label="add">
              <SendIcon onClick={onSubmit} />
            </Fab>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default ChatInput;

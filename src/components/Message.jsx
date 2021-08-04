import React from 'react';

import { Grid, ListItem, ListItemText } from '@material-ui/core';

const Message = (props) => {
  // <div style={{ background: "#eee", borderRadius: '5px', padding: '0 10px' }}>
  //     <p><strong>{props.user}</strong> says:</p>
  //     <p>{props.message}</p>
  // </div>
  return (
    <ListItem key={props.id}>
      <Grid container>
        <Grid item xs={12}>
          <ListItemText
            align="left"
            primary={props.user + ' says : '}
          ></ListItemText>
        </Grid>
        <Grid item xs={12}>
          <ListItemText align="left" secondary={props.message}></ListItemText>
        </Grid>
      </Grid>
    </ListItem>
  );
};

export default Message;

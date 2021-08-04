import {
  Grid,
  ListItem,
  ListItemText,
  makeStyles,
  List,
  Divider,
} from '@material-ui/core';
import React from 'react';

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

const GroupList = (props) => {
  const classes = useStyles();

  return (
    <div>
      <Grid item xs={3} className={classes.borderRight500}>
        <List>
          {props.groupList.map((item) => (
            <React.Fragment>
              <ListItem
                selected
                onClick={() => props.onGroupClick(item)}
                button
                key={item.id}
              >
                {/* <ListItemIcon>
                  <GroupIcon />
                </ListItemIcon> */}
                <ListItemText primary={item.title}>{item.title}</ListItemText>
                {/* <ListItemText secondary="online" align="right"></ListItemText> */}
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </List>
      </Grid>
      {/* {props.groupList.map((item) => (
    <li onClick={() => props.onGroupClick(item)} key={item.id}>
      {item.title}
    </li>)} */}
    </div>
  );
};

export default GroupList;

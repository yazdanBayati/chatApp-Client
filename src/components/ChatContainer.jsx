import React, { createRef } from 'react';
import {
  Grid,
  Button,
  Typography,
  Paper,
  AppBar,
  Toolbar,
} from '@material-ui/core';
import GroupList from './Group/GroupList';
import Chat from './Chat';
import { buildConention } from '../Utilites/SignalRUtitlity';
import { ChatApi } from '../apis/chatApi';
import CreateGroup from './Group/CreateGroup';
import './ChatContainer.css';
class ChatContainer extends React.Component {
  constructor() {
    super();

    var json = localStorage.getItem('login');
    if (!json) {
      console.error('token not exist');
    }
    const auth = JSON.parse(json);

    this.state = {
      groupList: [],
      currentUserGroups: [],
      selectedGroup: null,
      anyGroupSelected: false,
      connection: null,
      isUserHasSelectedGroup: false,
      auth: auth,
    };
    this.api = new ChatApi();
  }

  componentDidMount() {
    this.callApis();
    this.connection = buildConention(this.state.auth);
    // this.setState((prevState) => {
    //   return { ...prevState, connection: newConnection };
    // });

    if (this.connection) {
      this.connection
        .start()
        .then((result) => {
          console.log('Connected!');

          this.connection.on('ReceiveMessage', (message) => {
            this.buildAndsetChat(message);
          });

          this.connection.on('AddGroup', (group) => {
            this.setGroup(group);
          });
        })
        .catch((e) => console.log('Connection failed: ', e));
    } else {
      console.error('can not build a conneciton');
    }
  }

  callApis = async () => {
    const groups = await this.api.getAllGroups();
    const userGroups = await this.api.getUserGroups(this.state.auth.userId * 1);
    const user = await this.api.getUserById(this.state.auth.userId * 1);
    var groupsWithChats = groups.map((group) => {
      var chat = createRef();
      chat.current = [];
      return { ...group, chat: chat };
    });
    this.setState((prevState) => {
      return {
        ...prevState,
        groupList: groupsWithChats,
        currentUserGroups: userGroups,
        currentUser: user,
      };
    });
  };

  handlGroupClick = async (item) => {
    const isUserHasSelectedGroup = this.state.currentUserGroups.some(
      (x) => x.groupId === item.id
    ); // if user doesn't have this group show the join button

    if (isUserHasSelectedGroup) {
      item.seen = true;

      var groups = this.state.groupList;

      var group = groups.filter((x) => x.id === item.id);

      group.chat.current = [];

      item.chat.current = [];

      this.setState((prevSate) => {
        return {
          ...prevSate,
          selectedGroup: item,
          groupList: groups,
          // selectedGroup: {
          //   ...prevSate.selectedGroup,
          //   chat: { ...prevSate.selectedGroup.chat, current: [] },
          // },
          anyGroupSelected: true,
          isUserHasSelectedGroup: isUserHasSelectedGroup,
        };
      });

      const messages = await this.api.getMessages(item.id);
      if (messages) {
        var res = messages.map((message) => {
          return this.buildAndsetChat(message);
        });
        console.log(res);
      }
    } else {
      this.setState((prevSate) => {
        return {
          ...prevSate,
          selectedGroup: item,
          anyGroupSelected: true,
          isUserHasSelectedGroup: isUserHasSelectedGroup,
        };
      });
    }
  };

  setGroup(group) {
    group.chat = createRef();
    group.chat.current = [];
    this.setState((prevState) => {
      return {
        ...prevState,
        groupList: [...prevState.groupList, group],
      };
    });
  }

  buildAndsetChat(message) {
    const groups = this.state.groupList;
    const group = groups.filter((x) => x.id === message.groupId)[0];
    group.chat.current.push(message);

    // if (group.id === this.state.selectedGroup.id) {
    //   this.setState((prevState) => {
    //     return {
    //       ...prevState,
    //       groupList: groups,
    //       selectedGroup: {
    //         ...prevState.selectedGroup,
    //         chat: {
    //           ...prevState.selectedGroup.chat,
    //           current: [...prevState.selectedGroup.chat.current, message],
    //         },
    //       },
    //     };
    //   });
    // } else {
    this.setState((prevState) => {
      return {
        ...prevState,
        groupList: groups,
        // selectedGroup: {
        //   ...prevState.selectedGroup,
        //   chat: {
        //     ...prevState.selectedGroup.chat,
        //     current: [...prevState.selectedGroup.chat.current, message],
        //   },
        // },
      };
    });
    // }
    return message;
  }

  handleJoinGroup = async () => {
    const currentGroup = this.state.currentUserGroups.filter(
      (x) => x.groupId === this.state.selectedGroup.id
    )[0];
    if (!currentGroup) {
      if (this.connection.connectionStarted) {
        try {
          const mesg = {
            userId: this.state.auth.userId * 1,
            groupId: this.state.selectedGroup.id,
          };
          await this.connection.invoke('JoinGroup', mesg);
          const newuserGroupItem = {
            userId: this.state.auth.userId,
            groupId: this.state.selectedGroup.id,
          };
          this.setState((prevSate) => {
            return {
              ...prevSate,
              currentUserGroups: [
                ...prevSate.currentUserGroups,
                newuserGroupItem,
              ],
              isUserHasSelectedGroup: true,
            };
          });
        } catch (e) {
          console.error(e);
        }
      } else {
        alert('No connection to server yet.');
      }
    }
  };

  handleLeftGroup = async () => {
    const currentGroup = this.state.currentUserGroups.filter(
      (x) => x.groupId === this.state.selectedGroup.id
    )[0];
    if (currentGroup) {
      if (this.connection.connectionStarted) {
        try {
          const mesg = {
            userId: this.state.auth.userId * 1,
            groupId: this.state.selectedGroup.id,
          };
          await this.connection.invoke('LeftGroup', mesg);
          window.location.reload();
          // var currentUserGroup = this.state.currentUserGroups;
          // var index = currentUserGroup.findIndex(
          //   (x) => x.groupId === this.state.selectedGroup.id
          // );
          // currentUserGroup.splice(index, 1);

          // var groups = this.state.groupList;
          // var group = groups.filter(
          //   (x) => x.id === this.state.selectedGroup.id
          // )[0];
          // group.chat.current = [];

          // this.setState((prevSate) => {
          //   return {
          //     ...prevSate,
          //     currentUserGroups: currentUserGroup,
          //     groupList: groups,
          //     isUserHasSelectedGroup: false,
          //     selectedGroup: {
          //       ...prevSate.selectedGroup,
          //       chat: { ...prevSate.selectedGroup.chat, current: [] },
          //     },
          //   };
          // });
        } catch (e) {
          console.error(e);
        }
      } else {
        alert('No connection to server yet.');
      }
    }
  };

  handleCreateGroup = async (group) => {
    try {
      const response = await this.connection.invoke('CreateGroup', group);
      debugger;
      if (!response.success) {
        alert(response.error);
      }
    } catch (e) {
      alert('some thing wrong happend');
      console.error(e);
    }
  };

  sendMessage = async (message) => {
    if (this.connection.connectionStarted) {
      message.groupName = this.state.selectedGroup.name;
      message.groupId = this.state.selectedGroup.id;
      message.user = this.state.currentUser.userName;
      try {
        await this.connection.invoke('SendMessageToGroup', message);
      } catch (e) {
        console.log(e);
      }
    } else {
      alert('No connection to server yet.');
    }
  };

  render() {
    return (
      <div>
        <AppBar position="static" alignitems="center" color="primary">
          <Toolbar>
            <Grid container justify="center" wrap="wrap">
              <Grid item>
                <Typography variant="h6">Chat App</Typography>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        <div style={{ padding: '36px' }}>
          <CreateGroup onCreateGroup={this.handleCreateGroup} />
          <Grid container component={Paper} className="chatSection">
            <Grid item xs={4}>
              {this.state.groupList && (
                <GroupList
                  onGroupClick={this.handlGroupClick}
                  groupList={this.state.groupList}
                />
              )}
            </Grid>
            <Grid item xs={8}>
              {this.state.selectedGroup && (
                <div>
                  <Typography variant="h5">
                    Group Name: {this.state.selectedGroup.title}
                  </Typography>
                </div>
              )}
              {this.state.anyGroupSelected && (
                <div>
                  {!this.state.isUserHasSelectedGroup ? (
                    <Button
                      style={{ margin: '25px' }}
                      onClick={this.handleJoinGroup}
                      variant="contained"
                      color="primary"
                    >
                      Join to Group
                    </Button>
                  ) : (
                    <div>
                      <Button
                        style={{ margin: '14px' }}
                        onClick={this.handleLeftGroup}
                        variant="contained"
                        color="primary"
                      >
                        Left the Group
                      </Button>
                      <Chat
                        onSendMessage={this.sendMessage}
                        chat={this.state.selectedGroup.chat.current}
                      ></Chat>
                    </div>
                  )}
                </div>
              )}
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

export default ChatContainer;

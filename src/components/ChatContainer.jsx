import React, { createRef, useRef } from 'react';
import { Grid, Button } from '@material-ui/core';
import GroupList from './Group/GroupList';
import Chat from './Chat';
import { buildConention } from '../Utilites/SignalRUtitlity';
import { ChatApi } from '../apis/chatApi';
import CreateGroup from './Group/CreateGroup';
class ChatContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      groupList: [{ id: 1, title: 'group1', chat: [], seen: false }],
      currentUserGroups: [],
      selectedGroup: null,
      anyGroupSelected: false,
      connection: null,
      isUserHasSelectedGroup: false,
    };
    this.latestChat = createRef();
    this.latestChat.current = [];
    this.api = new ChatApi();
  }

  componentDidMount() {
    this.callApis();
    this.connection = buildConention();
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
    const userGroups = await this.api.getUserGroups(1); //todo : need to get from athnitcate user

    this.setState((prevState) => {
      return { ...prevState, groupList: groups, currentUserGroups: userGroups };
    });
  };

  handlGroupClick = (item) => {
    const isUserHasSelectedGroup = this.state.currentUserGroups.some(
      (x) => x.id === item.id
    ); // if user doesn't have this group show the join button

    if (isUserHasSelectedGroup && !this.state.selectedGroup.seen) {
      const messages = this.api.getMessages(item.id);
      messages.map((message) => {
        this.buildAndsetChat(message);
      });
    }

    this.setState((prevSate) => {
      return {
        ...prevSate,
        selectedGroup: item,
        anyGroupSelected: true,
        isUserHasSelectedGroup: isUserHasSelectedGroup,
      };
    });
  };

  setGroup(group) {
    this.setState((prevState) => {
      return {
        ...prevState,
        groupList: [...prevState.groupList, group],
      };
    });
  }

  buildAndsetChat(message) {
    const updatedChat = [...this.latestChat.current];
    updatedChat.push(message);
    var groupList = this.state.groupList;
    var group = groupList.filter((x) => x.title === message.groupName)[0];
    group.chat = updatedChat;
    this.latestChat.current = group.chat;

    this.setState((prevState) => {
      return {
        ...prevState,
        groupList: groupList,
      };
    });
  }

  handleJoinGroup = async () => {
    const currentGroup = this.state.currentUserGroups.filter(
      (x) => x.id === this.state.selectedGroup.id
    )[0];
    if (!currentGroup) {
      if (this.connection.connectionStarted) {
        try {
          const mesg = {
            userId: 1, //todo
            groupId: this.state.selectedGroup.groupId,
          };
          await this.connection.invoke('JoinGroup', mesg);
          this.setState((prevSate) => {
            return {
              ...prevSate,
              currentUserGroups: [
                ...prevSate.currentUserGroups,
                this.state.selectedGroup,
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
        <Grid>
          <CreateGroup onCreateGroup={this.handleCreateGroup} />
        </Grid>
        <Grid container>
          <Grid xs={4}>
            {this.state.groupList && (
              <GroupList
                onGroupClick={this.handlGroupClick}
                groupList={this.state.groupList}
              />
            )}
          </Grid>
          <Grid xs={8}>
            {this.state.anyGroupSelected && (
              <div>
                {!this.state.isUserHasSelectedGroup ? (
                  <Button
                    onClick={this.handleJoinGroup}
                    variant="contained"
                    color="primary"
                  >
                    Join to Group
                  </Button>
                ) : (
                  <Chat
                    onSendMessage={this.sendMessage}
                    chat={this.state.selectedGroup.chat}
                  ></Chat>
                )}
              </div>
            )}
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default ChatContainer;

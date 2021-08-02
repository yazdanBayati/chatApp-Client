import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
export class ChatApi {
  constructor() {
    this.instance = axios.create({
      baseURL: 'http://localhost:34908', //todo
      timeout: 30000,
      headers: {},
    });
    this.groupUrl = `/groups`;
    this.userUrl = `/users`;
    this.messageUrl = `/messages`;
    this.groupUserUrl = `usergroups`;
  }

  addGroup = async (data) => {
    let config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    return this.instance.post(this.groupUrl, data, config);
  };

  getAllGroups = async () => {
    try {
      const response = await this.instance.get(`${this.groupUrl}`);

      if (!response.data.success) {
        throw new Error('calling group list failed ...');
      }
      return response.data.data;
    } catch (e) {
      console.error(e);
    }
  };

  getUserGroups = async (userId) => {
    try {
      const response = await this.instance.get(
        `${this.groupUserUrl}/${userId}/getlistbyuserid`
      );

      if (!response.data.success) {
        throw new Error('calling usergroup list failed ...');
      }
      return response.data.data;
    } catch (e) {
      console.error(e);
    }
  };
  getMessages = async (groupId) => {
    try {
      const response = await this.instance.get(
        `${this.groupUserUrl}/${groupId}/getgroupmessages`
      );

      if (!response.data.success) {
        throw new Error('calling usergroup list failed ...');
      }
      return response.data.data;
    } catch (e) {
      console.error(e);
    }
  };
}

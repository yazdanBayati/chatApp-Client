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
    this.configureInterceptors();
  }

  addGroup = async (data) => {
    let config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    return this.instance.post(this.groupUrl, data, config);
  };

  registerUser = async (data) => {
    let config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    return this.instance.post(`${this.userUrl}/register`, data, config);
  };
  login = async (data) => {
    let config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    return this.instance.post(`${this.userUrl}/login`, data, config);
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
  getUserById = async (userId) => {
    try {
      const response = await this.instance.get(
        `${this.userUrl}/${userId}/getuserbyid`
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
        `${this.messageUrl}/${groupId}/getgroupmessages`
      );

      if (!response.data.success) {
        throw new Error('calling usergroup list failed ...');
      }
      return response.data.data;
    } catch (e) {
      console.error(e);
    }
  };

  configureInterceptors() {
    this.instance.interceptors.request.use(
      (config) => {
        var json = localStorage.getItem('login');
        if (json) {
          const auth = JSON.parse(json);
          if (auth) {
            config.headers = {
              ...config.headers,
              Authorization: 'Bearer ' + auth.token,
            };
          }
        }
        return config;
      },
      (error) => {
        console.error('Request error ==============');
      }
    );

    this.instance.interceptors.response.use(
      (resp) => {
        return resp;
      },
      (error) => {
        console.error('Response error ==============');
      }
    );
  }
}

import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';

export const buildConention = (auth) => {
  const newConnection = new HubConnectionBuilder()
    //.withUrl('http://localhost:34908/hubs/chat', {
    .withUrl('https://chat-api-yazdan.azurewebsites.net/hubs/chat', {
      accessTokenFactory: () => {
        return auth.token;
      },
    })
    .configureLogging(LogLevel.None)
    .withAutomaticReconnect()
    // .withHubProtocol(new MessagePackHubProtocol())
    .build();

  return newConnection;
};

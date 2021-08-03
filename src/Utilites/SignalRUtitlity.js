import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';

import { MessagePackHubProtocol } from '@microsoft/signalr-protocol-msgpack';

export const buildConention = (auth) => {
  const newConnection = new HubConnectionBuilder()
    .withUrl('http://localhost:34908/hubs/chat', {
      accessTokenFactory: () => {
        return auth.token;
      },
    })
    .configureLogging(LogLevel.Trace)
    .withAutomaticReconnect()
    //.withHubProtocol(new MessagePackHubProtocol())
    .build();

  return newConnection;
};

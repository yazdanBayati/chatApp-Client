import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';

export const buildConention = () => {
  const newConnection = new HubConnectionBuilder()
    .withUrl('http://localhost:34908/hubs/chat')
    .configureLogging(LogLevel.Trace)
    .withAutomaticReconnect()
    .build();

  return newConnection;
};

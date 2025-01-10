// TODO: import from 'react-together'
export interface ChatMessage {
  id: number;
  senderId: string;
  message: string;
  sentAt: number;
}

export interface MessageGroup {
  id: number;
  senderId: string;
  messages: ChatMessage[];
}

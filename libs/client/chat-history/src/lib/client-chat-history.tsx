import styles from './client-chat-history.module.css';

/* eslint-disable-next-line */
export interface ClientChatHistoryProps {}

export function ClientChatHistory(props: ClientChatHistoryProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to ClientChatHistory!</h1>
    </div>
  );
}

export default ClientChatHistory;

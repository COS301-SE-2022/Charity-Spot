import styles from './client-notification.module.css';

/* eslint-disable-next-line */
export interface ClientNotificationProps {}

export function ClientNotification(props: ClientNotificationProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to ClientNotification!</h1>
    </div>
  );
}

export default ClientNotification;

import styles from './client-item-request.module.css';

/* eslint-disable-next-line */
export interface ClientItemRequestProps {}

export function ClientItemRequest(props: ClientItemRequestProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to ClientItemRequest!</h1>
    </div>
  );
}

export default ClientItemRequest;

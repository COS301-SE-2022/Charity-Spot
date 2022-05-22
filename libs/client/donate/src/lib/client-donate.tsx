import styles from './client-donate.module.css';

/* eslint-disable-next-line */
export interface ClientDonateProps {}

export function ClientDonate(props: ClientDonateProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to ClientDonate!</h1>
    </div>
  );
}

export default ClientDonate;

import styles from './client-registration.module.css';

/* eslint-disable-next-line */
export interface ClientRegistrationProps {}

export function ClientRegistration(props: ClientRegistrationProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to ClientRegistration!</h1>
    </div>
  );
}

export default ClientRegistration;

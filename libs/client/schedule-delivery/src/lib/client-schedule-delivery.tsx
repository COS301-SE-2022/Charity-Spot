import styles from './client-schedule-delivery.module.css';

/* eslint-disable-next-line */
export interface ClientScheduleDeliveryProps {}

export function ClientScheduleDelivery(props: ClientScheduleDeliveryProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to ClientScheduleDelivery!</h1>
    </div>
  );
}

export default ClientScheduleDelivery;

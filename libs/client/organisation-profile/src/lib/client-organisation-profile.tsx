import styles from './client-organisation-profile.module.css';

/* eslint-disable-next-line */
export interface ClientOrganisationProfileProps {}

export function ClientOrganisationProfile(
  props: ClientOrganisationProfileProps
) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to ClientOrganisationProfile!</h1>
    </div>
  );
}

export default ClientOrganisationProfile;

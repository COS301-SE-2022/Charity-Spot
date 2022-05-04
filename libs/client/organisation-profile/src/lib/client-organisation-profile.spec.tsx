import { render } from '@testing-library/react';

import ClientOrganisationProfile from './client-organisation-profile';

describe('ClientOrganisationProfile', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ClientOrganisationProfile />);
    expect(baseElement).toBeTruthy();
  });
});

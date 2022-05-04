import { render } from '@testing-library/react';

import ClientRegistration from './client-registration';

describe('ClientRegistration', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ClientRegistration />);
    expect(baseElement).toBeTruthy();
  });
});

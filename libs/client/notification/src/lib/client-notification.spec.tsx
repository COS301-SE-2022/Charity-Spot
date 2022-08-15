import { render } from '@testing-library/react';

import ClientNotification from './client-notification';

describe('ClientNotification', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ClientNotification />);
    expect(baseElement).toBeTruthy();
  });
});

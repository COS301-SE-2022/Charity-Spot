import { render } from '@testing-library/react';

import ClientLogin from './client-login';

describe('ClientLogin', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ClientLogin />);
    expect(baseElement).toBeTruthy();
  });
});

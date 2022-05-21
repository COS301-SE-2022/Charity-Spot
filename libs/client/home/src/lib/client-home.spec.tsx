import { render } from '@testing-library/react';

import ClientHome from './client-home';

describe('ClientHome', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ClientHome />);
    expect(baseElement).toBeTruthy();
  });
});

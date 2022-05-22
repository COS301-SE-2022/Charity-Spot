import { render } from '@testing-library/react';

import ClientDonate from './client-donate';

describe('ClientDonate', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ClientDonate />);
    expect(baseElement).toBeTruthy();
  });
});

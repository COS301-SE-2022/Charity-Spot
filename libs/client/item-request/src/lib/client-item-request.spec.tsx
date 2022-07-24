import { render } from '@testing-library/react';

import ClientItemRequest from './client-item-request';

describe('ClientItemRequest', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ClientItemRequest />);
    expect(baseElement).toBeTruthy();
  });
});

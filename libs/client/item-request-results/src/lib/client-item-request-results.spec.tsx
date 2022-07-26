import { render } from '@testing-library/react';

import ClientItemRequestResults from './client-item-request-results';

describe('ClientItemRequestResults', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ClientItemRequestResults />);
    expect(baseElement).toBeTruthy();
  });
});

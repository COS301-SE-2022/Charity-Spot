import { render } from '@testing-library/react';

import ClientChat from './client-chat';

describe('ClientChat', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ClientChat />);
    expect(baseElement).toBeTruthy();
  });
});

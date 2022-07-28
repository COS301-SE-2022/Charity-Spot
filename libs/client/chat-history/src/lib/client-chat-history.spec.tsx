import { render } from '@testing-library/react';

import ClientChatHistory from './client-chat-history';

describe('ClientChatHistory', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ClientChatHistory />);
    expect(baseElement).toBeTruthy();
  });
});

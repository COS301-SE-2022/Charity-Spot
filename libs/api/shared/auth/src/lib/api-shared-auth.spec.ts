import { apiSharedAuth } from './api-shared-auth';

describe('apiSharedAuth', () => {
  it('should work', () => {
    expect(apiSharedAuth()).toEqual('api-shared-auth');
  });
});

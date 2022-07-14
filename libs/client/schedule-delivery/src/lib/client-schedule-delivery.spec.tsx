import { render } from '@testing-library/react';

import ClientScheduleDelivery from './client-schedule-delivery';

describe('ClientScheduleDelivery', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ClientScheduleDelivery />);
    expect(baseElement).toBeTruthy();
  });
});

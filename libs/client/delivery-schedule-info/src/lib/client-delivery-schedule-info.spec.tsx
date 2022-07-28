import { render } from '@testing-library/react';

import ClientDeliveryScheduleInfo from './client-delivery-schedule-info';

describe('ClientDeliveryScheduleInfo', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ClientDeliveryScheduleInfo />);
    expect(baseElement).toBeTruthy();
  });
});

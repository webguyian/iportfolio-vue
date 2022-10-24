import { describe, it, expect } from 'vitest';

import { mount } from '@vue/test-utils';
import DeviceFrame from '../DeviceFrame.vue';

describe('DeviceFrame', () => {
  it('renders properly', () => {
    const wrapper = mount(DeviceFrame);
    expect(wrapper.classes()).toContain('device-iphone-x');
  });
});

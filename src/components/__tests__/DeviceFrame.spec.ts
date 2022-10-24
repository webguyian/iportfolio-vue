import { describe, it, expect, vi } from 'vitest';

import { mount } from '@vue/test-utils';
import DeviceFrame from '../DeviceFrame.vue';

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: true,
    media: query,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn()
  }))
});

describe('DeviceFrame', () => {
  it('renders properly', () => {
    const wrapper = mount(DeviceFrame);
    expect(wrapper.classes()).toContain('iportfolio-app-device');
  });
});

import { describe, it, expect } from 'vitest';

import { mount } from '@vue/test-utils';
import ToggleSwitch from '../ToggleSwitch.vue';

describe('ToggleSwitch', () => {
  it('renders properly', () => {
    const wrapper = mount(ToggleSwitch);
    expect(wrapper.text()).toEqual('slide to unlock');
  });
});

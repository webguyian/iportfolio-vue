import { describe, it, expect } from 'vitest';

import { mount } from '@vue/test-utils';
import UIButton from '../UIButton.vue';

describe('UIButton', () => {
  it('renders properly', () => {
    const wrapper = mount(UIButton, { slots: { default: 'Hello' } });
    expect(wrapper.text()).toEqual('Hello');
  });
});

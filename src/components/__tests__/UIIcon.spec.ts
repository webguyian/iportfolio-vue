import { describe, it, expect } from 'vitest';

import { mount } from '@vue/test-utils';
import UIIcon from '../UIIcon.vue';

describe('UIIcon', () => {
  it('renders properly', () => {
    const wrapper = mount(UIIcon, { props: { name: 'signal' } });
    expect(wrapper.classes()).toContain('fa-signal');
  });
});

import { describe, it, expect } from 'vitest';

import { mount } from '@vue/test-utils';
import UIText from '../UIText.vue';

describe('UIText', () => {
  it('renders properly', () => {
    const wrapper = mount(UIText, {
      props: { type: 'body' },
      slots: { default: 'Hello' }
    });
    expect(wrapper.classes()).toContain('ui-text--body');
    expect(wrapper.element.nodeName).toEqual('SPAN');
    expect(wrapper.text()).toEqual('Hello');
  });
});

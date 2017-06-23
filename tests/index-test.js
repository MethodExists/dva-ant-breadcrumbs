import expect from 'expect';
import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import configureStore from 'redux-mock-store';
import Component from 'src/';

const mockStore = configureStore();
const store = mockStore();
const Br = props => <Component store={store} {...props} />;

describe('Component', () => {
  let node;

  beforeEach(() => {
    node = document.createElement('div');
  });

  afterEach(() => {
    unmountComponentAtNode(node);
  });

  it('should render the component', () => {
    render(<Br routes={[]} params={{}} />, node, () => {
      expect(node.innerHTML).toContain('ant-breadcrumb');
    });
  });

  it('should use custom classname', () => {
    render(<Br routes={[]} params={{}} className="customClass" />, node, () => {
      expect(node.innerHTML).toContain('customClass');
    });
  });
});

import React, {Component} from 'react';
import { Card, Layout, Button } from 'antd';
import 'antd/dist/antd.css';
import Breadcrumbs from '../../src';

class Demo extends Component {
  render() {
    return (
      <Layout.Content>
        <Card title="Demo" style={{ margin: 32 }}>
          <Breadcrumbs />
        </Card>
      </Layout.Content>
    );
  }
}

export default Demo;

import _ from 'lodash';
import React, { Component } from 'react';
import { render } from 'react-dom';
import PropTypes from 'prop-types';
import dva from 'dva';
import { Link, Router, browserHistory } from 'dva/router';
import { Table, Card, Layout } from 'antd';
import Breadcrumbs from '../../src';

const links = {
  '/': 'root',
  '/foo': 'zero-conf title (guess from path)',
  '/foo/1': 'dynamic title getter',
  '/foo/Alpha': 'dynamic title getter',
  '/bar': 'static title',
  '/bar/2': 'zero-conf title (guess from param name)',
  '/bar/Joe': 'zero-conf title (guess from param name)',
};

class Demo extends Component {
  render() {
    const { routes, params } = this.props;
    const dataSource = _.map(links, (description, key) => ({ key, description }));
    const columns = [{
      title: 'Link',
      dataIndex: 'key',
      render: link => <Link to={link}>{link}</Link>,
    }, {
      title: 'Description',
      dataIndex: 'description',
    }];


    return (
      <Layout>
        <Layout.Header>
          <h1 style={{ color: '#ccc' }}>Breadcrumbs Demo</h1>
        </Layout.Header>
        <Layout.Content style={{ padding: 32 }}>
          <Card style={{ padding: 30, marginBottom: 32 }}>
            <Breadcrumbs routes={routes} params={params} />
          </Card>
          <Table
            dataSource={dataSource}
            columns={columns}
            pagination={false}
            style={{ background: 'white' }}
          />
        </Layout.Content>
      </Layout>
    );
  }
}

Demo.propTypes = {
  routes: PropTypes.array.isRequired,
  params: PropTypes.object.isRequired,
};

function router({ history }) { // eslint-disable-line react/prop-types
  const routes = [{
    path: '/',
    component: Demo,
    childRoutes: [{
      path: 'foo',
      component: Demo,
      childRoutes: [{
        path: ':foo',
        getTitle: ({ foo }) => `${foo} × ${foo}`,
        component: Demo,
      }],
    }, {
      path: 'bar',
      title: 'The Bar (static title)',
      component: Demo,
      childRoutes: [{
        path: ':bar',
        component: Demo,
      }],
    }],
  }];

  return <Router history={history} routes={routes} />;
}

const app = dva({ history: browserHistory });
app.router(router);

const App = app.start();

render(<App />, document.querySelector('#demo'));

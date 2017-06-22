import React from 'react';
import {render} from 'react-dom';
import dva from 'dva';
import { Router, browserHistory } from 'dva/router';
import Demo from './Demo';

function router({ history, app }) {
  const routes = [{
    path: '/',
    component: Demo,
  }];

  return <Router history={history} routes={routes} />;
}

const app = dva({ history: browserHistory });
app.router(router);

const App = app.start();

render(<App/>, document.querySelector('#demo'));

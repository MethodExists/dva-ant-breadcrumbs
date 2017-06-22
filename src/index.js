import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { Breadcrumb, Icon } from 'antd';
import { connect } from 'dva';
import { Link } from 'dva/router';
import './styles.css';

function Breadcrumbs({ breadcrumbs }) {
  const rootBreadcrumb = {
    path: '/',
    title: <Icon type="home" />,
  };
  return (
    <Breadcrumb className="dva-ant-breadcrumbs">
      {
        [rootBreadcrumb].concat(breadcrumbs).map(({ path, title }) => (
          <Breadcrumb.Item key={path} >
            <Link to={path}>{ title }</Link>
          </Breadcrumb.Item>
        ))
      }
    </Breadcrumb>
  );
}

Breadcrumbs.propTypes = {
  breadcrumbs: PropTypes.arrayOf(PropTypes.shape({
    path: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  })).isRequired,
};


const mapStateToProps = (state, { params, routes: [/* skip root route */, ...routes] = [] }) => {
  // skip routes without path to avoid trailing `/` at the end of bread crumbs
  const routesWithPath = routes.filter(route => route.path);

  const absolutePaths = routesWithPath
    .map(route => route.path)
    // substitue param names with param values: ':username' → 'ilya'
    .map(path => (path.startsWith(':') ? params[path.substr(1)] : path))
    // prefix each path with all parents path: 'ilya' → 'users/ilya'
    .map((path, index, paths) => _.take(paths, index + 1).join('/'))
    // add `/` before each path to make it absolute
    .map(path => `/${path}`);

  const extractRouteTitle = route =>
    // first, try `getTitle` function to get a dynamic title
    (_.isFunction(route.getTitle) && route.getTitle(params, state)) ||
    // then fallback to static title
    route.title ||
    // then try to make a title from the path
    _.startCase(route.path);

  const breadcrumbs = routesWithPath.map((route, index) => ({
    path: absolutePaths[index],
    title: extractRouteTitle(route),
  }));

  return {
    breadcrumbs,
  };
};

export default connect(mapStateToProps)(Breadcrumbs);


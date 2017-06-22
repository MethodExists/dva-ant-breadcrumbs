import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { Breadcrumb, Icon } from 'antd';
import { connect } from 'dva';
import { Link } from 'dva/router';

// props exposed by antd Breadcrumb component
// https://github.com/ant-design/ant-design/blob/master/components/breadcrumb/Breadcrumb.tsx#L9-L15
const antProps = ['prefixCls', 'separator', 'itemRender', 'style', 'className'];

function Breadcrumbs({ breadcrumbs, ...restProps }) {
  const rootBreadcrumb = {
    path: '/',
    title: <Icon type="home" />,
  };
  return (
    <Breadcrumb {..._.pick(restProps, antProps)}>
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
  ...Breadcrumb.propTypes,
  breadcrumbs: PropTypes.arrayOf(PropTypes.shape({
    path: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  })).isRequired,

  // check props required for `mapStateToProps`
  //
  /* eslint-disable react/no-unused-prop-types */
  routes: PropTypes.arrayOf(PropTypes.shape({
    path: PropTypes.string,
  })).isRequired,
  params: PropTypes.object.isRequired,
  /* eslint-enable react/no-unused-prop-types */
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
    // then try to make a title from the parameter value
    _.startCase(route.path.startsWith(':') ? params[route.path.substr(1)] : route.path);

  const breadcrumbs = routesWithPath.map((route, index) => ({
    path: absolutePaths[index],
    title: extractRouteTitle(route),
  }));

  return {
    breadcrumbs,
  };
};

export default connect(mapStateToProps)(Breadcrumbs);


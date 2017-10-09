# dva-ant-breadcrumbs

Antd’s Breadcrumb component connected to dva router.

## Installation

```
npm i @methodexists/dva-ant-breadcrumbs
```

## Usage

Put `<Breadcrumbs />` component inside render method of your route component:

```
const UsersPage = ({ routes, params }) => (
  <div>
    <Breadcrumbs routes={routes} params={params} />
  </div>
);
```
### Zero configuraton

The component will analyze route’s `path` and will try to guess the best title for each bread crumb.  

| URL            | Path              | Guessed titles
|----------------|-------------------|---------------
| `/userProfile` | `userProfile`     | "User Profile"
| `/users`       | `users`           | "Users"
| `/users/ilya`  | `users/:username` | "Users" / "Ilya"
|`/users/9jerb`  | `users/:id`       | "Users" / "9jerb" (here you’ll need customization)

### Custom static title
Add `title` prop to a route and it will be used for bread crumb’s title.

```
<Route path="userProfile" title="My Profile" ... />
```

### Custom dynamic title
Add `getTitle` prop to calculate bread crumb’s title basing on `params` from the router and `state`.

```
<Route path=":id" getTitle={(params, state) => state.users[params.id].name} />
```

### Fallbacks
If `getTitle()` prop is undefined or returns `undefined` then use `title`.  
If `title` is undefined then guess title from `path`.


## API

### Routes API

| Prop       |  Type | Description
|------------|----------|---
| `*` `path`  | `string` | Route’s path. If `undefined`, the route will be skipped. Could be param name like `:username`
| `getTitle` | `(params, state) => string` | Function to generate route’s title basing on `params` prop from router and current `state`
| `title`    | `string` | Text to use for route’s title

### `<Breadcrumbs />` API

| Prop     | Description 
|----------|------------
|`*` `routes`| `routes` prop provided by router into root route component
|`*` `params` | `params` prop provided by router into root route component

> `*` required

Also supports Ant Design [Breadcrumb](https://ant.design/components/breadcrumb) component props: `prefixCls`, `separator`, `itemRender`, `style`, `className`.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for how to develop a component.

import React from 'react'
import {Route, IndexRoute} from 'react-router'

import Container from './Container'
import IndexPage from './indexPage/IndexPage'

export const makeMainRoutes = () => {
  return (
    <Route path="/" component={Container}>
      {/* Lazy-loading */}
      <Route path="about" getComponent={(location, cb) => {
          require.ensure([], (require) => {
            const mod = require('./about/About');
            cb(null, mod.default);
          });
        }} />
      {/* inline loading */}
      <IndexRoute component={IndexPage} />
    </Route>
  )
}

export default makeMainRoutes

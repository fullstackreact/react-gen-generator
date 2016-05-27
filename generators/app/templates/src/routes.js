import React from 'react'
import {browserHistory, Router, Route, Redirect} from 'react-router'

import makeMainRoutes from 'views/main/routes';

export const makeRoutes = () => {
  const mainRoutes = makeMainRoutes();

  return (
    <Route path=''>
      {mainRoutes}
    </Route>
  )
}

export default makeRoutes

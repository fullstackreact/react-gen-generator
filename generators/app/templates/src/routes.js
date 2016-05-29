import React from 'react'
import {Route} from 'react-router'

import makeMainRoutes from 'views/main/routes';

export const makeRoutes = (store) => {
  const mainRoutes = makeMainRoutes(store);

  return (
    <Route path=''>
      {mainRoutes}
    </Route>
  )
}

export default makeRoutes

import React from 'react'
import {Route, IndexRoute} from 'react-router'
import Container from './Container'

export const makeMainRoutes = () => {
  return (
    <Route path="/" component={Container}>
    </Route>
  )
}

export default makeMainRoutes

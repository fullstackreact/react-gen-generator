import React from 'react'
import {browserHistory, Router, Route, Redirect} from 'react-router'

export const makeRoutes = () => {
  return (
    <Route path=''>
      <h1>Hello <%= title %></h1>
    </Route>
  )
}

export default makeRoutes

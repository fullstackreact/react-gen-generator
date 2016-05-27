import React, { PropTypes as T } from 'react'

import Header from 'components/Header/Header'

import styles from './styles.module.css'

export class Container extends React.Component {
  render() {
    console.log('hi');
    return (
      <div>
        <Header />
        <h1>Hello world</h1>
      </div>
    )
  }
}

Container.contextTypes = {
  router: T.object
}

export default Container

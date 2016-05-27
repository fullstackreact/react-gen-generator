import React, { PropTypes as T } from 'react'

import Header from 'components/Header/Header'

import styles from './styles.module.css'

export class Container extends React.Component {
  render() {
    return (
      <div className={styles.wrapper}>
        <Header />
        <div className={styles.content}>
          <h1>Hello <%= title %></h1>
        </div>
      </div>
    )
  }
}

Container.contextTypes = {
  router: T.object
}

export default Container

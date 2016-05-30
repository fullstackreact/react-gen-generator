import React, { PropTypes as T } from 'react';
import {Link} from 'react-router';

import styles from './styles.module.css';

export class IndexPage extends React.Component {
  render() {
    return (
      <div className={styles.content}>
        <h1>Hello from generated content</h1>
        <p className={styles.padding}>
          For more information about the `react-gen` package and set up, check out the <a href="https://www.fullstackreact.com/articles/react-tutorial-cloning-yelp/">Blog post on building a yelp clone with React</a>.
        </p>
        <p>
          <Link to="about">About</Link>
        </p>
      </div>
    )
  }
}

export default IndexPage;

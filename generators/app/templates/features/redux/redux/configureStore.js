import { browserHistory } from 'react-router';
import { bindActionCreatorsToStore } from 'redux-module-builder';
import { createApiMiddleware } from 'redux-module-builder/api';
import { routerMiddleware, syncHistoryWithStore } from 'react-router-redux';
import thunkMiddleware from 'redux-thunk';
import { createStore, compose, applyMiddleware } from 'redux';
import { rootReducer, actions } from './rootReducer';

export const configureStore = ({
  historyType = browserHistory,
  initialState = {}}) => {

    let middleware = [
      createApiMiddleware({
        baseUrl: __ROOT_URL__,
        headers: {
          'X-Requested-By': '<%= title %> client'
        }
      }),
      thunkMiddleware,
      routerMiddleware(historyType)
    ]

    let tools = [];
    if (__DEBUG__) {
      const DevTools = require('containers/DevTools/DevTools').default;
      let devTools = window.devToolsExtension ? window.devToolsExtension : DevTools.instrument;
      if (typeof devTools === 'function') {
        tools.push(devTools())
      }
    }

    let finalCreateStore;
    finalCreateStore = compose(
      applyMiddleware(...middleware),
      ...tools
    )(createStore);

    const store = finalCreateStore(
      rootReducer,
      initialState
    );

    const history = syncHistoryWithStore(historyType, store, {
      adjustUrlOnReplay: true
    })

    if (module.hot) {
      module.hot.accept('./rootReducer', () => {
        const {rootReducer} = require('./rootReducer');
        store.replaceReducer(rootReducer);
      });
    }

    const boundActions = bindActionCreatorsToStore(actions, store);
    return {store, actions: boundActions, history}
}

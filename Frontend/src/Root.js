import React from 'react';
import PropTypes from 'prop-types';
import {
    Provider
} from 'react-redux';
import {
    applyMiddleware,
    createStore
} from 'redux';
import {
    createLogger
} from 'redux-logger';
import thunk from 'redux-thunk';
import reducers from './redux/reducers';
import { composeWithDevTools } from 'redux-devtools-extension';

const Root = ({
    children,
    shouldLog,
    initialState,
    middlewares = []
}) => {
    const logger = createLogger();

    let middleware = [];
    if (process.env.NODE_ENV === 'development') {
        middleware = [...middleware, thunk, logger];
    } else {
        middleware = [...middleware, thunk];
    }

    const enhancer = composeWithDevTools(applyMiddleware(...middleware));
    const store = createStore(reducers, initialState, enhancer);

    return <Provider
        store={store}>
        {
            children
        }
    </Provider>;
};

Root.propTypes = {
    children: PropTypes.any,
    shouldLog: PropTypes.bool,
    initialState: PropTypes.object,
    middlewares: PropTypes.array
};

export default Root;
// @flow

import React from 'react'
import ReactDOM from 'react-dom'
import App from 'components/App'
import { AppContainer } from 'react-hot-loader'
import VError from 'verror'

// declare var module: {
//     hot: {
//         accept: (string, () => any) => void,
//     }
// };

const fullRender = Component => {
    const index: ?HTMLElement = document.querySelector('#index')
    if(!index) {
        throw new VError('cannot find index element')
    }
    ReactDOM.render(
        <AppContainer>
            <Component />
        </AppContainer>,
        index
    )
}

fullRender(App)

/* hot reloading */
// if (+GLOBALS.HOTRELOAD_FRONTEND && module.hot) {
//     module.hot.accept('./components/App', () => {
//         fullRender(require('./components/App').default)
//     })
// }

// @flow

import React from 'react'
import ReactDOM from 'react-dom'
import App from 'components/App'
import { Provider } from 'react-redux'
import store from 'store'

const index: ?HTMLElement = document.querySelector('#index')
if(!index) {
    throw new Error('cannot find index element')
}

ReactDOM.render(
    <Provider store = { store }>
        <App/>
    </Provider>,
    index
)

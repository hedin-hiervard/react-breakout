// @flow

import React from 'react'
import { render, cleanup } from 'react-testing-library'
import App from 'components/App'

afterEach(cleanup)

test('app renders single div', async () => {
    const { getByText } = render(
        <App/>,
    )

    expect(getByText('Hello, world!')).toBeTruthy()
})

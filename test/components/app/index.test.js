// @flow

import React from 'react'
import { render, cleanup } from 'react-testing-library'
import { App, Paddle, Field } from 'components/App'

afterEach(cleanup)

test('field is a div with fixed size', async () => {
    const field = render(
        <Field width={ 500 } height ={ 500 }/>,
    )

    const div = field.baseElement.firstChild.firstChild
    expect(div.style.getPropertyValue('width')).toEqual('500px')
    expect(div.style.getPropertyValue('height')).toEqual('500px')
    expect(div.style.getPropertyValue('left')).toEqual('0px')
    expect(div.style.getPropertyValue('top')).toEqual('0px')
})


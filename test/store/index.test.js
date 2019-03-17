// @flow

import store from 'store/index'

test('creates proper store', async () => {
    expect(store).toHaveProperty('dispatch')
    expect(store).toHaveProperty('getState')
    expect(store).toHaveProperty('subscribe')

    const state = store.getState()
    expect(state).toHaveProperty('field')
    expect(state).toHaveProperty('bricks')
    expect(state).toHaveProperty('paddle')
    expect(state).toHaveProperty('ball')
})

import * as actionType from 'unit/actionType'

const initState = {
    paused: false,
}

const pause = (state = initState, action) => {
    switch (action.type) {
    case actionType.PAUSE:
        return {
            ...state,
            paused: !state.paused,
        }
    default:
        return state
    }
}

export default pause

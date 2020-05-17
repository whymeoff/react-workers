const workersReducer = (state = {
    workers: [],
    pickedWorker: {},
    pages: 1,
    currentPage: 1
}, action) => {
    switch (action.type) {
        case 'FETCH_WORKERS': {
            return { ...action.payload }
        }
        case 'PICK_WORKER': {
            return { ...state, pickedWorker: action.payload }
        }
        default: {
            return state
        }
    }
}

export default workersReducer
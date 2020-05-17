export const signIn = () => {
    return {
        type: 'SIGN_IN',
        payload: true
    }
}

export const signOut = () => {
    return {
        type: 'SIGN_OUT',
        payload: false
    }
}

export const fetchWorkers = (term, page) => async dispatch => {
    let res = await fetch(`http://localhost:4000/employees?search=${term}&page=${page}`, { credentials: 'include' })
    res = await res.json()

    if (page > res.pages) {
        page-=1
    }

    dispatch({
        type: 'FETCH_WORKERS',
        payload: {
            workers: res.employees,
            pages: res.pages,
            currentPage: page
        }
    })
}

export const pickWorker = (worker) => {
    return {
        type: 'PICK_WORKER',
        payload: worker
    }
}


export const omit = (key, obj) => {
    const { [key]: omitted, ...rest } = obj;
    return rest;
}

export const rename = (from, to, obj) => {
    const x = { ...obj, [to]: obj[from]}
    return omit(from, x)
}

export const runReducers = (reducers) => (state, action) =>
    reducers.reduce((res, r) =>  res === state ? r(state, action) : res, state)
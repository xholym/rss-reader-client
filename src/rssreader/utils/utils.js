export const omit = (key, obj) => {
    const { [key]: omitted, ...rest } = obj;
    return rest;
}

export const rename = (from, to, obj) => {
    const x = { ...obj, [to]: obj[from] }
    return omit(from, x)
}

export const runReducers = (reducers) => (state, action) =>
    reducers.reduce((res, r) => res === state ? r(state, action) : res, state)

export const safeGet = (obj, key, key2) => {
    if (key2 == null)
        return obj && obj[key]
    else
        return obj && (obj[key] || obj[key2])
}

export const xmlEncodedToStr = xml => xml
    && xml.replace(
        /&#\d+;/g,
        match => String.fromCharCode(Number(
            match.replace('&#', '')
                .replace(';', '')
        ))
    )
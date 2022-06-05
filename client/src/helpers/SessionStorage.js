/**
 *
 * @param {string} name
 * @returns Array of all objects in that name category
 */
const getFromSessionStorage = (name) => JSON.parse(sessionStorage.getItem(name))

/**
 *
 * @param {string} name
 * @param {Obj} obj Product object to add
 */
const setToSessionStorage = (name, obj) => {
    const prev = JSON.parse(sessionStorage.getItem(name)) ?? []
    prev.some((o) => o.id === obj.id)
        ? sessionStorage.setItem(name, JSON.stringify(prev.filter((el) => el.id !== obj.id)))
        : sessionStorage.setItem(name, JSON.stringify([...prev, obj]))
}

const regularSetToSessionStorage = (name, obj) => sessionStorage.setItem(name, JSON.stringify(obj))

/**
 *
 * @param {string} name
 * @param {Obj} obj Product object to check
 * @returns true or false. Whether obj in storage or not
 */
const checkProductInSessionStorage = (name, obj) =>
    getFromSessionStorage(name)?.some((o) => o.id === obj.id) ?? false

/**
 *
 * @param {string} name to check on session storage
 * @returns true or false. Whether obj in storage or not
 */
const checkInSessionStorage = (name) => (getFromSessionStorage(name) ? true : false)

export {
    getFromSessionStorage,
    setToSessionStorage,
    checkProductInSessionStorage,
    checkInSessionStorage,
    regularSetToSessionStorage,
}

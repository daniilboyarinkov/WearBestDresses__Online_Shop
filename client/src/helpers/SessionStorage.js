/**
 *
 * @param {string} name Should be either 'cartObjects' or 'favouriteObjects'
 * @returns Array of all objects in that name category
 */
const getFromSessionStorage = (name) => JSON.parse(sessionStorage.getItem(name))

/**
 *
 * @param {string} name Should be either 'cartObjects' or 'favouriteObjects'
 * @param {Obj} obj Product object to add
 */
const setToSessionStorage = (name, obj) => {
    const prev = JSON.parse(sessionStorage.getItem(name)) ?? []
    prev.some((o) => o.id === obj.id)
        ? sessionStorage.setItem(name, JSON.stringify(prev.filter((el) => el.id !== obj.id)))
        : sessionStorage.setItem(name, JSON.stringify([...prev, obj]))
}

/**
 * 
 * @param {string} name Should be either 'cartObjects' or 'favouriteObjects'
 * @param {Obj} obj Product object to check
 * @returns true or false. Whether obj in storage or not
 */
const checkProductInSessionStorage = (name, obj) =>
    getFromSessionStorage(name)?.some((o) => o.id === obj.id) ?? false

export { getFromSessionStorage, setToSessionStorage, checkProductInSessionStorage }

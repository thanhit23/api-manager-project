export const filterByKeys = (obj, keys = []) => {
  const filtered = {}
  keys.forEach(key => {
    if (obj.hasOwnProperty(key)) {
      filtered[key] = obj[key]
    }
  })
  return filtered
}

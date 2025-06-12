const getObjectWithoutKeys = <T extends Record<string, any>, K extends readonly (keyof T)[]>(
  object: T,
  keys: K,
): Omit<T, K[number]> => {
  const entries = Object.entries(object)
  const filteredEntries = entries.filter(
    ([key]) => !keys.includes(key as keyof T),
  )
  
  return Object.fromEntries(filteredEntries) as Omit<T, K[number]>
}

export default getObjectWithoutKeys
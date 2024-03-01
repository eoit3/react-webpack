const tryCatch = (tryer: Function) => {
  try {
    const result = tryer()
    return [result, null]
  } catch (error) {
    return [null, error]
  }
}

export default tryCatch

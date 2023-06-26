const queryUrlToObject = (queryString: string): { [key: string]: string } => {
  const queryParams = new URLSearchParams(queryString)
  const result: { [key: string]: string } = {}

  for (const [key, value] of queryParams.entries()) {
    result[key] = value
  }

  return result
}

export { queryUrlToObject }

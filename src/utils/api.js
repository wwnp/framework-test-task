export const mainUrl = 'https://test-front.framework.team/'

export const apiFetch = async (str) => {
  const response = await fetch(`${mainUrl}${str}`)
  let json = await response.json()
  return json
};
export const delay = (ms) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, ms);
  })
}
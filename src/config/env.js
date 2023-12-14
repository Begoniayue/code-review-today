let baseUrl = import.meta.env.VITE_BASE_URL;
const codeUrl = `${window.location.origin}/code`
const actUrl = `${window.location.origin}/act/modeler.html?modelId=`

export { baseUrl, codeUrl, actUrl }

if (import.meta.env.VITE_BASE_URL === undefined) {
  throw new Error('VITE_BASE_URL is not defined')
}

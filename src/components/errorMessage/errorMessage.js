export const printErrorMessage = (parentElement, message) => {
  const pError = document.createElement('p')
  pError.classList.add('error')
  pError.textContent = message
  pError.style.color = '#960303'
  pError.style.webkitTextStroke = '1px #960303'
  pError.style.fontWeight = 'bold'
  pError.style.fontSize = '20px'
  pError.style.padding = '10px'
  parentElement.append(pError)
}

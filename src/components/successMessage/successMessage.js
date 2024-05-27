export const printSuccessMessage = (message) => {
  const main = document.querySelector('main')
  main.innerHTML = ''
  const mensaje = document.createElement('p')
  mensaje.innerText = message
  mensaje.style.width = '300px'
  mensaje.style.fontSize = '18px'
  mensaje.style.alignSelf = 'center'
  mensaje.style.textAlign = 'center'
  main.append(mensaje)
}

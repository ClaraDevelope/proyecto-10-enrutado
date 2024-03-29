import './header.css'
export const Header = () => {
  const header = document.querySelector('header')
  const title = document.createElement('h1')
  title.innerText = 'FandomFiesta'
  const listHeader = document.createElement('ul')
  listHeader.innerHTML = `
  <li><a href='#'>Inicio</a></li>
  <li><button class= 'login-button'>Entrar ⁄ Registrarse</button></li>
  `
  header.append(title, listHeader)
}

export const HeaderUsuario = () => {
  const header = document.querySelector('header')
  header.innerHTML = ''
  const title = document.createElement('h1')
  title.innerText = 'FandomFiesta'
  const listHeaderUsuario = document.createElement('ul')
  listHeader.innerHTML = `
  <li><a>Inicio</a></li>
  <li><a>Mis eventos</a></li>
  <li><a>Mi perfil</a></li>
  <li><a>Cerrar sesión</a></li>
  `
  header.append(title, listHeaderUsuario)
}

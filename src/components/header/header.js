import { Home } from '../../pages/home/main/home'
import { Login } from '../../pages/login-register/loginRegister'
import './header.css'
export const Header = () => {
  const header = document.querySelector('header')
  const divtitle = document.createElement('div')
  divtitle.className = 'title-container'
  const title = document.createElement('h1')
  title.innerText = 'FandomFiesta'
  divtitle.append(title)
  const listHeader = document.createElement('ul')
  listHeader.innerHTML = `
  <li><a href='#Home' id="inicio-link">Inicio</a></li>
  <li><button id='login-button'>Entrar ⁄ Registrarse</button></li>
  `
  document.addEventListener('DOMContentLoaded', function () {
    const inicioLink = document.getElementById('inicio-link')
    inicioLink.addEventListener('click', Home)
  })
  const loginButton = listHeader.querySelector('#login-button')
  loginButton.addEventListener('click', Login)
  header.append(divtitle, listHeader)
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

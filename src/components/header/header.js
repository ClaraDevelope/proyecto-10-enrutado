import { printEventos } from '../../pages/eventos/eventos'
import { Home } from '../../pages/home/main/home'
import { Login } from '../../pages/login/login'
import { renderPerfil } from '../../pages/usuario/usuario'
import { navigateTo } from '../../utils/router'
import './header.css'
export const HeaderRender = (User) => {
  if (User) {
    const header = document.querySelector('header')
    header.innerHTML = ''
    HeaderUsuario()
  } else {
    const header = document.querySelector('header')
    header.innerHTML = ''
    Header()
  }
}

export const Header = () => {
  const header = document.querySelector('header')
  const divtitle = document.createElement('div')
  divtitle.className = 'title-container'
  const title = document.createElement('h1')
  title.innerText = 'FandomFiesta'
  divtitle.append(title)
  const listHeader = document.createElement('ul')
  listHeader.className = 'header'
  listHeader.innerHTML = `
  <li><a href='#Home' id="inicio-link">Inicio</a></li>
  <li><button id='login-button'>Entrar ⁄ Registrarse</button></li>
  `
  document.addEventListener('DOMContentLoaded', function () {
    const inicioLink = document.getElementById('inicio-link')
    inicioLink.addEventListener('click', () => navigateTo('/inicio'))
  })
  const loginButton = listHeader.querySelector('#login-button')
  loginButton.addEventListener('click', () => navigateTo('/login'))
  header.append(divtitle, listHeader)
}

export const HeaderUsuario = () => {
  const header = document.querySelector('header')
  header.innerHTML = ''
  const title = document.createElement('h1')
  title.innerText = 'FandomFiesta'
  const listHeaderUsuario = document.createElement('ul')
  listHeaderUsuario.className = 'header-usuario'
  listHeaderUsuario.innerHTML = `
  <li><a href='#Home' id='inicio-link'>Inicio</a></li>
  <li><a href="#misEventos" id='mis-eventos'>Mis eventos</a></li>
  <li><a href="#perfil" id= 'mi-perfil'>Mi perfil</a></li>
  <li><a class="bye" href="#bye">Cerrar sesión</a></li>
  `
  const inicioLink = listHeaderUsuario.querySelector('#inicio-link')
  inicioLink.addEventListener('click', () => navigateTo('/inicio'))

  const perfilLink = listHeaderUsuario.querySelector('#mi-perfil')
  perfilLink.addEventListener('click', () => navigateTo('/usuario/perfil'))

  const eventosLink = listHeaderUsuario.querySelector('#mis-eventos')
  eventosLink.addEventListener('click', () => navigateTo('/mis-eventos'))

  const logoutButton = listHeaderUsuario.querySelector('.bye')
  logoutButton.addEventListener('click', () => {
    const token = localStorage.getItem('token')
    if (!token) {
      console.log('El usuario ya está desconectado.')
      return
    }
    localStorage.removeItem('token')
    window.location.href = '/'
  })

  header.append(title, listHeaderUsuario)
}

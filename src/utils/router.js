import { printEventos } from '../pages/eventos/eventos'
import { registroAsistente } from '../pages/home/asistentes/registroAsistente'
import { Home } from '../pages/home/main/home'
import { Login } from '../pages/login/login'
import { printRegister } from '../pages/register/register'
import { renderPerfil } from '../pages/usuario/usuario'

const routes = {
  404: '/pages/404.html',
  '/inicio': Home,
  '/asistentes': registroAsistente,
  '/login': Login,
  '/registro': printRegister,
  '/usuario/perfil': renderPerfil,
  '/mis-eventos': printEventos
}

const handleRouteChange = () => {
  const path = window.location.pathname
  const route = routes[path] || NotFound
  route()
}

window.addEventListener('popstate', handleRouteChange)

window.addEventListener('load', handleRouteChange)

export const navigateTo = (path) => {
  window.history.pushState({}, '', path)
  handleRouteChange()
}

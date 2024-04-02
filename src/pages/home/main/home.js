import { API_URL, User } from '../../../utils/variables'
import { Login } from '../../login/login'
import { registroAsistente } from '../asistentes/registroAsistente'
import './home.css'
export const Home = async () => {
  const main = document.querySelector('main')
  main.innerHTML = ''

  const loader = document.createElement('div')
  loader.className = 'loader'
  const loaderImg = document.createElement('img')
  loaderImg.src =
    'https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExbXE1N3FldGM1dG9pODVweDY5cm1uM2Y0ZmQyc2I3b2t6aWU5MnVyOSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/YDC5HjHcfFk8lgxXQm/giphy.gif'
  loaderImg.alt = 'Cargando...'
  loader.appendChild(loaderImg)
  main.appendChild(loader)

  const res = await fetch(API_URL + '/eventos/')
  const eventos = await res.json()

  main.removeChild(loader)
  pintarEventos(eventos, main)
}
export const pintarEventos = (eventos, elementoPadre) => {
  const divEventos = document.createElement('div')
  divEventos.className = 'eventos-container'
  for (const evento of eventos) {
    const divEvento = document.createElement('div')
    divEvento.className = 'evento'
    const titulo = document.createElement('h3')
    const divCartel = document.createElement('div')
    divCartel.className = 'img-container'
    const cartel = document.createElement('img')
    cartel.alt = 'cartel-evento'
    divCartel.append(cartel)
    const info = document.createElement('div')
    info.className = 'info'
    titulo.textContent = evento.titulo
    cartel.src = evento.cartel
    const fecha = new Date(evento.fecha)
    const dia = fecha.getDate()
    const mes = fecha.getMonth() + 1
    const año = fecha.getFullYear()

    const fechaFormateada = `${dia}/${mes}/${año}`

    info.innerHTML = `
        <p class="fecha">${fechaFormateada}</p>
        <p class="ubicacion">${evento.ubicacion}</p>
        <button class="info-boton"> ▶ Información </button>
    `

    const infoBoton = info.querySelector('.info-boton')
    infoBoton.addEventListener('click', (e) => infoEvento(evento._id))

    divEvento.append(titulo, divCartel, info)
    divEventos.append(divEvento)
  }

  elementoPadre.append(divEventos)
}
const infoEvento = async (e) => {
  const main = document.querySelector('main')
  main.innerHTML = ''
  const res = await fetch(
    `https://proyecto-10-backend.vercel.app/api/v1/eventos/${e}`
  )
  const evento = await res.json()

  printEvento(evento)
}

const printEvento = (evento) => {
  const main = document.querySelector('main')
  const divEvento = document.createElement('div')
  divEvento.className = 'evento'
  const titulo = document.createElement('h3')
  const divCartel = document.createElement('div')
  divCartel.className = 'img-container'
  const cartel = document.createElement('img')
  cartel.alt = 'cartel-evento'
  divCartel.append(cartel)
  const info = document.createElement('div')
  info.className = 'info'
  titulo.textContent = evento.titulo
  cartel.src = evento.cartel
  const fecha = new Date(evento.fecha)
  const dia = fecha.getDate()
  const mes = fecha.getMonth() + 1
  const año = fecha.getFullYear()

  const fechaFormateada = `${dia}/${mes}/${año}`
  const precio = evento.precio
  const cincoPorCiento = precio * 0.05
  const precioUsuarios = precio - cincoPorCiento
  info.innerHTML = `
        <p class="fecha">${fechaFormateada}</p>
        <p class="ubicacion">${evento.ubicacion}</p>
        <p class="descripcion">${evento.descripcion}</p>
        <p class="publi">Regístrate en nuestra web para obtener beneficios exclusivos: participa en sorteos, organiza tus eventos y obtén un 5% de descuento en todas tus reservas.</p>
        <p class="precio">Precio sin registro: ${precio}€</p>
        <p class="precio">Precio para usuarios registrados: ${precioUsuarios}€</p>
        <div class= "button-container">
         <button class="asistencia">▶ Asistir sin registro</button>
         <button class="registro-boton">▶ Asistir como usuario registrado</button>
       </div>
    `
  const buttonAsistenciaSinRegistro = info.querySelector('.asistencia')
  buttonAsistenciaSinRegistro.addEventListener('click', () =>
    registroAsistente(evento)
  )
  const buttonAsistenciaUsuario = info.querySelector('.registro-boton')
  buttonAsistenciaUsuario.addEventListener('click', Login)
  divEvento.append(titulo, divCartel, info)
  main.append(divEvento)
  divEvento.append(titulo, divCartel, info)
  main.append(divEvento)
  if (User) {
    console.log(User)
    const buttonContainer = document.querySelector('.button-container')
    buttonContainer.removeChild(buttonAsistenciaSinRegistro)
    buttonContainer.removeChild(buttonAsistenciaUsuario)
    const buttonAsistirUsuarioLogueado = document.createElement('button')
    buttonAsistirUsuarioLogueado.textContent = '▶ Asistir'
    buttonAsistirUsuarioLogueado.className = 'asistencia'
    buttonContainer.appendChild(buttonAsistirUsuarioLogueado)
  }
}

// const printUsuarioLogueado = (usuarioLogueado) => {
//   const info = document.querySelector('.info')
//   const buttonContainer = info.querySelector('.button-container')
//   const buttonAsistenciaSinRegistro =
//     buttonContainer.querySelector('.asistencia')
//   const buttonAsistenciaUsuario =
//     buttonContainer.querySelector('.registro-boton')
//   buttonContainer.removeChild(buttonAsistenciaSinRegistro)
//   buttonContainer.removeChild(buttonAsistenciaUsuario)
// }

// if (usuarioLogueado) {
//   printUsuarioLogueado(usuarioLogueado)
// }

// if (usuarioLogueado) {
//   console.log(data)
//   const buttonContainer = info.querySelector('.button-container')
//   const buttonAsistencia = buttonContainer.querySelector('.asistencia')
//   const buttonAsistenciaUsuario =
//     buttonContainer.querySelector('.registro-boton')
//   buttonContainer.removeChild(buttonAsistencia)
//   buttonContainer.removeChild(buttonAsistenciaUsuario)

//   const buttonAsistirUsuarioLogueado = document.createElement('button')
//   buttonAsistirUsuarioLogueado.textContent = '▶ Asistir'
//   buttonAsistirUsuarioLogueado.className = 'asistenciaUsuario'
//   buttonAsistirUsuarioLogueado.addEventListener('click', () =>
//     tuFuncionPersonalizada()
//   )
//   buttonContainer.appendChild(buttonAsistirUsuarioLogueado)
// }

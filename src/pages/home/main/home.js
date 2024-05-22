import router from '../../../utils/navigo'
import { API_URL, User, datosUsuario } from '../../../utils/variables'
import { showLoader } from '../../../utils/showLoader'
import './home.css'
export const Home = async () => {
  const main = document.querySelector('main')
  main.innerHTML = ''
  showLoader(main)

  try {
    const res = await fetch(API_URL + '/eventos/')
    const eventos = await res.json()
    main.innerHTML = ''
    pintarEventos(eventos, main)
  } catch (error) {
    console.error('Error al cargar eventos:', error)
    main.innerHTML = '<p>Ocurrió un error al cargar los eventos.</p>'
  }
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
    cartel.loading = 'lazy'
    cartel.src = evento.cartel
      ? evento.cartel
      : 'https://i.pinimg.com/564x/56/72/b1/5672b13718380e6eaea917bfadc49de7.jpg'
    divCartel.append(cartel)
    const info = document.createElement('div')
    info.className = 'info'
    titulo.textContent = evento.titulo
    const fecha = new Date(evento.fecha)
    const fechaFormateada = `${fecha.getDate()}/${
      fecha.getMonth() + 1
    }/${fecha.getFullYear()}`
    info.innerHTML = `
        <p class="fecha">${fechaFormateada}</p>
        <p class="ubicacion">${evento.ubicacion}</p>
        <button class="info-boton" data-event-id="${evento._id}"> ▶ Información </button>
    `

    const infoBoton = info.querySelector('.info-boton')
    infoBoton.addEventListener('click', (e) => {
      const eventoId = e.target.dataset.eventId
      const ruta = `/evento/${eventoId}`
      router.navigate(ruta)
    })

    divEvento.append(titulo, divCartel, info)
    divEventos.append(divEvento)
  }

  elementoPadre.append(divEventos)
}

export const infoEvento = async (e) => {
  const main = document.querySelector('main')
  main.innerHTML = ''
  const res = await fetch(API_URL + `/eventos/${e._id}`)
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
  cartel.loading = 'lazy'
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
       </div>
    `

  const buttonContainer = info.querySelector('.button-container')

  if (localStorage.getItem('token')) {
    const user = JSON.parse(localStorage.getItem('user'))
    console.log(user)
    console.log(evento._id)
    if (user && user.eventosAsistencia.includes(evento._id)) {
      const asistenciaYaConfirmada = document.createElement('button')
      asistenciaYaConfirmada.className = 'disabled'
      asistenciaYaConfirmada.innerText = '✅ Ya asistes a este evento'
      buttonContainer.append(asistenciaYaConfirmada)
    } else {
      const buttonAsistirUsuarioLogueado = document.createElement('button')
      buttonAsistirUsuarioLogueado.textContent = '▶ Asistir'
      buttonAsistirUsuarioLogueado.className = 'asistencia'
      buttonContainer.appendChild(buttonAsistirUsuarioLogueado)
      buttonAsistirUsuarioLogueado.addEventListener('click', () => {
        const ruta = `/${evento._id}/confirmar-asistencia`
        router.navigate(ruta)
      })
    }
  } else {
    const buttonAsistenciaSinRegistro = document.createElement('button')
    buttonAsistenciaSinRegistro.textContent = '▶ Asistir sin registro'
    buttonAsistenciaSinRegistro.className = 'asistencia'
    buttonContainer.appendChild(buttonAsistenciaSinRegistro)
    buttonAsistenciaSinRegistro.addEventListener('click', () => {
      const ruta = `/${evento._id}/confirmar-asistencia-sin-registro`
      router.navigate(ruta)
    })

    const buttonAsistenciaUsuario = document.createElement('button')
    buttonAsistenciaUsuario.textContent = '▶ Asistir como usuario registrado'
    buttonAsistenciaUsuario.className = 'registro-boton'
    buttonContainer.appendChild(buttonAsistenciaUsuario)
    buttonAsistenciaUsuario.addEventListener('click', (e) => {
      e.preventDefault()
      router.navigate('/login')
    })
  }

  divEvento.append(titulo, divCartel, info)
  main.append(divEvento)
}

export const registroAsistenteUsuario = (evento) => {
  const eventoId = evento.id
  const nombreUsuario = datosUsuario.nombreUsuario
  const email = datosUsuario.email
  console.log(eventoId)
  console.log(nombreUsuario)
  console.log(email)
  llamadaAsistenteUsuario(eventoId, nombreUsuario, email)
}
const llamadaAsistenteUsuario = async (eventoId, nombreUsuario, email) => {
  const datos = JSON.stringify({ nombre: nombreUsuario, email: email })
  const main = document.querySelector('main')
  main.innerHTML = ''
  showLoader(main)
  const opciones = {
    method: 'POST',
    body: datos,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  }

  try {
    const response = await fetch(
      API_URL + `/auth/eventos/${eventoId}/confirmar`,
      opciones
    )

    main.innerHTML = ''
    if (response.status === 200) {
      const data = await response.json()
      console.log(data)
      mensajeExito()
      const user = JSON.parse(localStorage.getItem('user'))
      user.eventosAsistencia.push(eventoId)
      localStorage.setItem('user', JSON.stringify(user))

      actualizarInterfazUsuario()
    } else if (response.status === 400) {
      console.log('El usuario ya está inscrito en el evento')

      mostrarMensajeError()
    } else {
      console.error('Error en la solicitud:', response.status)
      const errorMessage = await response.text()
      console.error('Mensaje de error:', errorMessage)
      mostrarMensajeError(
        'Error en la solicitud. Inténtalo de nuevo más tarde.'
      )
    }
  } catch (error) {
    console.error('Error en la solicitud:', error)
    mostrarMensajeError()
  }
}

const actualizarInterfazUsuario = () => {
  const buttonAsistirUsuarioLogueado = document.querySelector('.asistencia')
  if (buttonAsistirUsuarioLogueado) {
    buttonAsistirUsuarioLogueado.textContent = 'Ya estás inscrito'
    buttonAsistirUsuarioLogueado.disabled = true
  }
}

const mostrarMensajeError = (mensaje) => {
  const divEvento = document.querySelector('.evento')
  const pError = document.createElement('p')
  pError.classList.add('error')
  pError.textContent = mensaje
  pError.style.color = '#960303'
  pError.style.webkitTextStroke = '1px #960303'
  pError.style.fontWeight = 'bold'
  pError.style.fontSize = '20px'
  pError.style.padding = '10px'
  divEvento.appendChild(pError)
}

const mensajeExito = () => {
  const main = document.querySelector('main')
  main.innerHTML = ''
  const mensaje = document.createElement('p')
  mensaje.innerText = '¡Enhorabuena! te has inscrito correctamente en el evento'
  mensaje.style.width = '300px'
  mensaje.style.fontSize = '18px'
  mensaje.style.alignSelf = 'center'
  mensaje.style.textAlign = 'center'
  main.append(mensaje)
}

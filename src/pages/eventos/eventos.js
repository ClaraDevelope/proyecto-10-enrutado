import router from '../../utils/navigo'
import {
  API_URL,
  datosActualizadosUsuario,
  datosUsuario,
  showLoader,
  usuarioData,
  usuarioId,
  verificarYEliminarEventosInexistentes
} from '../../utils/variables'
import { infoEvento } from '../home/main/home'
import './eventos.css'
export const printEventos = async () => {
  const main = document.querySelector('main')
  main.innerHTML = ''

  const eventosContainer = document.createElement('div')
  eventosContainer.className = 'tus-eventos'
  const divContainer = document.createElement('div')
  divContainer.className = 'flex-container'
  const createButton = document.createElement('button')
  createButton.className = 'create-button'
  createButton.innerText = 'Crear nuevo evento'

  createButton.addEventListener('click', formCrearEvento)

  divContainer.append(eventosContainer, createButton)
  main.append(divContainer)

  pintarEvento(eventosContainer)
}

const pintarEvento = async (elementoPadre) => {
  const usuarioData = JSON.parse(localStorage.getItem('user'))
  if (
    usuarioData &&
    usuarioData.eventosOrganizados &&
    usuarioData.eventosOrganizados.length > 0
  ) {
    for (const eventoId of usuarioData.eventosOrganizados) {
      try {
        const response = await fetch(API_URL + `/eventos/${eventoId}`)
        if (response.ok) {
          const evento = await response.json()
          const eventoContainer = document.createElement('div')
          eventoContainer.className = 'evento'
          elementoPadre.append(eventoContainer)
          mostrarEvento(eventoId, eventoContainer)
        } else {
          const index = usuarioData.eventosOrganizados.indexOf(eventoId)
          if (index !== -1) {
            usuarioData.eventosOrganizados.splice(index, 1)
            localStorage.setItem('user', JSON.stringify(usuarioData))
            elementoPadre.remove()
          }
        }
      } catch (error) {
        console.error('Error al obtener evento:', error)
      }
    }
  } else {
    const mensaje = document.createElement('p')
    mensaje.textContent = 'No tienes eventos organizados.'
    mensaje.style.fontSize = '20px'
    mensaje.style.fontWeight = 'bold'
    elementoPadre.appendChild(mensaje)
  }
}
const mostrarEvento = async (eventoId, elementoPadre) => {
  try {
    const response = await fetch(API_URL + `/eventos/${eventoId}`)
    if (response.ok) {
      const evento = await response.json()
      if (evento) {
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

        info.innerHTML = `
          <p class="fecha">${fechaFormateada}</p>
          <p class="ubicacion">${evento.ubicacion}</p>
          <div class='button-container'>
              <button class='asistencia' id='ver-asistentes'>Ver asistentes</button>
              <button class='info-boton' id='editar-evento'>Editar evento</button>
              <button class='eliminar' id='eliminar-evento'>Eliminar</button>
          </div>
        `
        const buttonAsistentes = info.querySelector('#ver-asistentes')
        buttonAsistentes.addEventListener('click', () => {
          eventoId = evento._id
          router.navigate(`/${eventoId}/asistentes`)
        })
        const editarButton = info.querySelector('#editar-evento')
        editarButton.addEventListener('click', () => {
          eventoId = evento._id
          router.navigate(`/${eventoId}/editar`)
        })

        const eliminarButton = info.querySelector('#eliminar-evento')
        eliminarButton.addEventListener('click', () => {
          eliminarEvento(eventoId)
        })
        elementoPadre.append(titulo, divCartel, info)
      } else {
        const usuarioData = JSON.parse(localStorage.getItem('user'))
        const index = usuarioData.eventosOrganizados.indexOf(eventoId)
        if (index !== -1) {
          usuarioData.eventosOrganizados.splice(index, 1)
          localStorage.setItem('user', JSON.stringify(usuarioData))
        }
      }
    } else {
      const usuarioData = JSON.parse(localStorage.getItem('user'))
      const index = usuarioData.eventosOrganizados.indexOf(eventoId)
      if (index !== -1) {
        usuarioData.eventosOrganizados.splice(index, 1)
        localStorage.setItem('user', JSON.stringify(usuarioData))
      }
    }
  } catch (error) {
    console.error('Error al mostrar evento:', error)
  }
}

// const mostrarEvento = async (eventoId, elementoPadre) => {
//   try {
//     const response = await fetch(API_URL + `/eventos/${eventoId}`)
//     const evento = await response.json()
//     const titulo = document.createElement('h3')
//     const divCartel = document.createElement('div')
//     divCartel.className = 'img-container'
//     const cartel = document.createElement('img')
//     cartel.alt = 'cartel-evento'
//     cartel.loading = 'lazy'
//     divCartel.append(cartel)
//     const info = document.createElement('div')
//     info.className = 'info'
//     titulo.textContent = evento.titulo
//     cartel.src = evento.cartel
//     const fecha = new Date(evento.fecha)
//     const dia = fecha.getDate()
//     const mes = fecha.getMonth() + 1
//     const año = fecha.getFullYear()

//     const fechaFormateada = `${dia}/${mes}/${año}`

//     info.innerHTML = `
//     <p class="fecha">${fechaFormateada}</p>
//     <p class="ubicacion">${evento.ubicacion}</p>
//     <div class='button-container'>
//         <button class='asistencia' id='ver-asistentes'>Ver asistentes</button>
//         <button class='info-boton' id='editar-evento'>Editar evento</button>
//         <button class='eliminar' id='eliminar-evento'>Eliminar</button>
//     </div>
// `
//     const buttonAsistentes = info.querySelector('#ver-asistentes')
//     buttonAsistentes.addEventListener('click', () => {
//       eventoId = evento._id
//       router.navigate(`/${eventoId}/asistentes`)
//     })
//     const editarButton = info.querySelector('#editar-evento')
//     editarButton.addEventListener('click', () => {
//       eventoId = evento._id
//       router.navigate(`/${eventoId}/editar`)
//     })

//     const eliminarButton = info.querySelector('#eliminar-evento')
//     eliminarButton.addEventListener('click', () => {
//       eliminarEvento(eventoId)
//     })
//     elementoPadre.append(titulo, divCartel, info)
//   } catch (error) {
//     console.error('Error al mostrar evento:', error)
//   }
// }
const eliminarEvento = async (eventoId) => {
  const opciones = {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  }
  try {
    const response = await fetch(API_URL + `/eventos/${eventoId}`, opciones)
    if (response.ok) {
      console.log('Evento eliminado correctamente')

      const eventoContainer = document.getElementById(
        `evento-container-${eventoId}`
      )
      if (eventoContainer) {
        eventoContainer.remove()
      }
      alert('Evento eliminado')
    } else {
      console.log('No se pudo eliminar el evento')
    }
  } catch (error) {
    console.error('Error al eliminar el evento:', error)
  }
}

export const verAsistentes = async (evento) => {
  const main = document.querySelector('main')
  main.innerHTML = ''
  console.log(evento)
  let count = 0

  const asistentesContainer = document.createElement('ul')
  asistentesContainer.className = 'asistentes-container'

  for (const asistente of evento.asistentes) {
    try {
      const datos = await fetch(API_URL + `/asistentes/${asistente}`)
      const datosAsistente = await datos.json()
      if (datosAsistente && datosAsistente.nombre) {
        const asistenteP = document.createElement('li')
        asistenteP.innerText = datosAsistente.nombre
        asistentesContainer.append(asistenteP)
        count++
      }
    } catch (error) {
      console.error('Error al procesar datos del asistente:', error)
    }
  }

  const numeroAsistentes = document.createElement('span')
  numeroAsistentes.className = 'span'
  numeroAsistentes.innerText = `Total de asistentes: ${count}`
  asistentesContainer.append(numeroAsistentes)

  main.append(asistentesContainer)
}

export const formEditarEventos = (eventoId) => {
  const main = document.querySelector('main')
  main.innerHTML = ''

  const formulario = document.createElement('form')
  formulario.id = 'form-evento'
  formulario.innerHTML = ` 
  <h2 class='title-edit'>Edita tu evento</h2>
  <label class='start' for="titulo">Título del evento:</label>
  <input id='titulo' type="text" name="titulo">
  <label class='start' for="fecha">Fecha:</label>
  <input id='fecha' type="date" class="date" name="fecha">
  <label class='start' for="ubicacion" >Ubicación:</label>
  <input id= 'ubicacion' type="text" class="ubicacion" name="ubicacion">
  <label class='start' for="descripcion">Descripción:</label>
  <input id='descripcion' type="text" name="descripcion">
  <label class='start' for="precio">Precio:</label>
  <input id='precio' type="number" name="precio">
  <label class='start' for="cartel">Cartel:</label>
  <input id='cartel' type="file" name="cartel" accept="image/*">
  <button class='submit' id='editar-button'>Editar</button>
`
  formulario.addEventListener('submit', async (event) => {
    event.preventDefault()
    const form = document.querySelector('#form-evento')
    const formData = new FormData(form)
    const userId = usuarioId
    console.log(userId)

    try {
      await editarEvento(eventoId, userId, formData)
    } catch (error) {
      console.error('error al editar datos del evento')
    }
  })

  main.append(formulario)
}

const editarEvento = async (eventoId, userId, formData) => {
  const opciones = {
    method: 'PATCH',
    body: formData,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  }

  for (const [key, value] of formData.entries()) {
    console.log(key + ': ' + value)
  }
  try {
    const response = await fetch(
      API_URL + `/eventos/${eventoId}/auth/${userId}`,
      opciones
    )
    console.log(response)
    if (response.status === 200) {
      console.log('Evento editado exitosamente')
      alert('¡Editado con éxito!')
    } else {
      console.error('Error al editar el evento:', error.message)
    }
  } catch (error) {
    console.error('Error al editar el evento:', error.message)
  }
}

const formCrearEvento = () => {
  const main = document.querySelector('main')
  main.innerHTML = ''

  const form = document.createElement('form')
  form.id = 'eventoForm'

  form.innerHTML = `
      <h2 class='title-edit'>Crea un nuevo evento</h2>
      <label for="titulo">Título:</label>
      <input type="text" id="titulo" name="titulo" required><br>
      
      <label for="fecha">Fecha:</label>
      <input type="date" id="fecha" name="fecha" required><br>
      
      <label for="ubicacion">Ubicación:</label>
      <input type="text" id="ubicacion" name="ubicacion" required><br>
      
      <label for="descripcion">Descripción:</label><br>
      <textarea id="descripcion" name="descripcion" required></textarea><br>
      
      <label for="precio">Precio:</label>
      <input type="number" id="precio" name="precio" required><br>
      
      <label for="cartel">Cartel:</label>
      <input type="file" id="cartel" name="cartel" accept="image/*" required><br>
      
      <button class='submit' type="submit">Enviar</button>
  `

  form.addEventListener('submit', async (e) => {
    e.preventDefault()
    const userId = datosUsuario._id
    console.log(userId)
    const formData = new FormData(form)
    await enviarFormulario(userId, formData, form)
  })

  main.appendChild(form)
}

const enviarFormulario = async (userId, formData, form) => {
  const opciones = {
    method: 'POST',
    body: formData,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  }

  for (const [key, value] of formData.entries()) {
    console.log(key + ': ' + value)
  }

  try {
    const response = await fetch(API_URL + `/auth/${userId}/create`, opciones)
    if (response.status === 201) {
      const data = await response.json()
      console.log('Datos de la respuesta:', data)
      alert('Evento creado con éxito')
      const res = await fetch(API_URL + `/eventos/${data.evento._id}`)
      const evento = await res.json()
      console.log(evento)
      if (evento) {
        const usuarioData = JSON.parse(localStorage.getItem('user'))
        usuarioData.eventosOrganizados.push(evento._id)
        localStorage.setItem('user', JSON.stringify(usuarioData))
        printEventos()
      }
    } else {
      console.error('Error en la solicitud:', response.status)
      const errorMessage = await response.text()
      console.error('Mensaje de error:', errorMessage)
    }
  } catch (error) {
    console.error('Error en la solicitud:', error)
    const pError = document.createElement('p')
    pError.classList.add('error')
    pError.textContent = error.message || 'Error al registrar el evento'
    pError.style.color = '#E86C7E'
    pError.style.fontWeight = 'bold'
    pError.style.fontSize = '20px'
    form.append(pError)
  }
}

import { API_URL, datosUsuario } from '../../utils/variables'
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
  divContainer.append(eventosContainer, createButton)
  main.append(divContainer)
  pintarEvento(eventosContainer)
}

const pintarEvento = (elementoPadre) => {
  const eventos = datosUsuario.eventosOrganizados

  for (const evento of eventos) {
    const eventoContainer = document.createElement('div')
    eventoContainer.className = 'evento'
    elementoPadre.append(eventoContainer)
    mostrarEvento(evento, eventoContainer)
  }
}

const mostrarEvento = async (eventoId, elementoPadre) => {
  try {
    const response = await fetch(API_URL + `/eventos/${eventoId}`)
    const evento = await response.json()
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
    <div class='button-container'>
        <button class='asistencia' id='ver-asistentes'>Ver asistentes</button>
        <button class='info-boton' id='editar-evento'>Editar evento</button>
    </div>
`
    const buttonAsistentes = info.querySelector('#ver-asistentes')
    buttonAsistentes.addEventListener('click', () => {
      verAsistentes(evento)
    })
    const editarButton = info.querySelector('#editar-evento')
    editarButton.addEventListener('click', () => {
      formEditarEventos(eventoId)
    })

    elementoPadre.append(titulo, divCartel, info)
  } catch (error) {
    console.error('Error al mostrar evento:', error)
  }
}

const verAsistentes = async (evento) => {
  const main = document.querySelector('main')
  main.innerHTML = ''

  let count = 0

  const asistentesContainer = document.createElement('ul')
  asistentesContainer.className = 'asistentes-container'

  for (const asistente of evento.asistentes) {
    const datos = await fetch(API_URL + `/asistentes/${asistente}`)
    const datosAsistente = await datos.json()

    const asistenteP = document.createElement('li')
    asistenteP.innerText = datosAsistente.nombre
    asistentesContainer.append(asistenteP)

    count++
  }

  const numeroAsistentes = document.createElement('span')
  numeroAsistentes.className = 'span'
  numeroAsistentes.innerText = `Total de asistentes: ${count}`
  asistentesContainer.append(numeroAsistentes)

  main.append(asistentesContainer)
}

const formEditarEventos = (eventoId) => {
  const main = document.querySelector('main')
  main.innerHTML = ''

  const userId = datosUsuario._id

  const formulario = document.createElement('form')
  formulario.id = 'form-evento'
  formulario.innerHTML = ` 
  <h2 class='title-edit'>Edita tu evento</h2>
<label class='start' for="titulo">Título del evento:</label>
<input type="text" name="titulo">
<label class='start' for="fecha">Fecha:</label>
<input type="date" class="date" name="fecha">
<label class='start'>Ubicación:</label>
<input type="string" class="ubicacion" name="ubicación">
<label class='start' for="descripcion">Descripción:</label>
<input type="string"  name="descripcion">
<label class='start' for="precio">Precio:</label>
<input type="number"  name="precio">
<label class='start' for="cartel">Cartel:</label>
<input id='transparent' type="file" name="cartel" accept="image/*">
<button class='submit' id='editar-button'>Editar</button>
`
  formulario.addEventListener('submit', (event) => {
    event.preventDefault()
    editarEvento(eventoId, userId)
  })

  main.append(formulario)
}

const editarEvento = async (eventoId, userId) => {
  try {
    const form = document.getElementById('form-evento')
    const formData = new FormData(form)
    const titulo = formData.get('titulo')
    const fecha = formData.get('fecha')
    const ubicacion = formData.get('ubicación')
    const descripcion = formData.get('descripcion')
    const precio = formData.get('precio')
    const cartel = formData.get('cartel')

    const formDataToSend = new FormData()
    formDataToSend.append('titulo', titulo)
    formDataToSend.append('fecha', fecha)
    formDataToSend.append('ubicacion', ubicacion)
    formDataToSend.append('descripcion', descripcion)
    formDataToSend.append('precio', precio)

    if (cartel instanceof File) {
      formDataToSend.append('cartel', cartel)
    }

    const response = await fetch(
      `${API_URL}/eventos/${eventoId}/auth/${userId}`,
      {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: formDataToSend
      }
    )

    if (!response.ok) {
      throw new Error('Error al editar el evento')
    }

    console.log('Evento editado exitosamente')
  } catch (error) {
    console.error('Error al editar el evento:', error)
  }
}

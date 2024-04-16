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

  createButton.addEventListener('click', formCrearEvento)

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
<input id='titulo' type="text" name="titulo">
<label class='start' for="fecha">Fecha:</label>
<input id='fecha' type="date" class="date" name="fecha">
<label class='start'>Ubicación:</label>
<input id= 'ubicacion' type="text" class="ubicacion" name="ubicación">
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
    const formData = new FormData()
    formData.append('titulo', document.getElementById('titulo').value)
    formData.append('fecha', document.getElementById('fecha').value)
    formData.append('ubicacion', document.getElementById('ubicacion').value)
    formData.append('descripcion', document.getElementById('descripcion').value)
    formData.append('precio', document.getElementById('precio').value)
    const cartelInput = document.getElementById('cartel')
    if (cartelInput.files.length > 0) {
      formData.append('cartel', cartelInput.files[0])
    }
    try {
      await editarEvento(eventoId, userId, formData)
    } catch (error) {
      console.error('Error al editar el evento:', error)
    }
  })

  main.append(formulario)
}

const editarEvento = async (eventoId, userId, formData) => {
  const opciones = {
    method: 'PATCH',
    body: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  }
  console.log(formData)
  for (const [key, value] of formData.entries()) {
    console.log(key + ': ' + value)
  }
  try {
    const response = await fetch(
      API_URL + `/eventos/${eventoId}/auth/${userId}`,
      opciones
    )

    const respuestaFinal = await response.json()

    console.log(response)
    if (!response.ok) {
      console.log('error al editar el evento', response.status)
    } else {
      console.log('Evento editado exitosamente:', respuestaFinal)
    }
  } catch (error) {
    console.error('Error al editar el evento:', error)
  }
}

const formCrearEvento = () => {
  const main = document.querySelector('main')

  const form = document.createElement('form')
  form.id = 'eventoForm'

  form.innerHTML = `
      <h2>Crea un nuevo evento</h2>
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
      
      <button type="submit">Enviar</button>
  `

  // form.addEventListener('submit', enviarFormulario);

  main.appendChild(form)
}

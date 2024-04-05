import { API_URL, datosUsuario } from '../../utils/variables'
import './eventos.css'

export const printEventos = async () => {
  const main = document.querySelector('main')
  main.innerHTML = ''

  const eventosContainer = document.createElement('div')
  eventosContainer.className = 'tus-eventos'
  main.append(eventosContainer)
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

const formModificarEventos = () => {}

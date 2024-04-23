import { API_URL } from '../../../utils/variables'
import { Home } from '../main/home'
import './registroAsistente.css'

const form = (elementoPadre, eventoId) => {
  const form = document.createElement('form')
  form.className = 'form-asistente'
  const nameInput = document.createElement('input')
  nameInput.type = 'text'
  nameInput.name = 'nombre'
  nameInput.placeholder = 'Nombre'
  const mailInput = document.createElement('input')
  mailInput.type = 'mail'
  mailInput.name = 'email'
  mailInput.placeholder = 'email'
  const submitButton = document.createElement('button')
  submitButton.className = 'submit'
  submitButton.innerText = 'Enviar'
  form.append(nameInput, mailInput, submitButton)
  elementoPadre.append(form)

  form.addEventListener('submit', async (e) => {
    e.preventDefault()

    const formData = new FormData(form)
    const nombre = formData.get('nombre')
    const email = formData.get('email')

    if (nombre.trim() === '' || !isValidEmail(email)) {
      alert('Por favor, complete todos los campos correctamente.')
      return
    }

    submit(nombre, email, eventoId, form)
  })
}
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

const submit = async (nombre, email, eventoId, form) => {
  const datos = JSON.stringify({ nombre, email })

  const opciones = {
    method: 'POST',
    body: datos,
    headers: {
      'Content-Type': 'application/json'
    }
  }

  try {
    const response = await fetch(
      API_URL + `/asistentes/eventos/${eventoId}/confirmar`,
      opciones
    )

    if (response.ok) {
      console.log('¡Registro realizado con éxito!')
      const main = document.querySelector('main')
      main.innerHTML = ''
      const mensajeRegistro = document.createElement('p')
      mensajeRegistro.className = 'registro-hecho'
      mensajeRegistro.innerText =
        '¡Enhorabuena! Te has registrado con éxito para nuestro emocionante evento. En breve, recibirás todos los detalles del evento en tu correo electrónico. ¡Mantente atento a tu bandeja de entrada y prepárate para disfrutar de una experiencia inolvidable!'
      const volverBoton = document.createElement('button')
      volverBoton.className = 'volver'
      volverBoton.innerText = 'Volver a los eventos'
      volverBoton.addEventListener('click', Home)
      mensajeRegistro.append(volverBoton)
      main.append(mensajeRegistro)
    } else {
      const pError = form.querySelector('.error')
      if (!pError) {
        const pError = document.createElement('p')
        pError.classList.add('error')
        pError.textContent = 'Ya estás registrado en este evento'
        pError.style.color = 'blue'
        pError.style.fontSize = '20px'
        form.append(pError)
      } else {
        pError.textContent = 'Ya estás registrado en este evento'
      }
    }
  } catch (error) {
    console.error('Error en la solicitud:', error)
  }
}

export const registroAsistente = (eventoId) => {
  const main = document.querySelector('main')
  main.innerHTML = ''
  const registroAsistenteContainer = document.createElement('div')
  registroAsistenteContainer.className = 'registro-asistencia-container'
  const p = document.createElement('p')
  p.innerText =
    '¡Apuntarse a este emocionante evento es muy sencillo! Todo lo que necesitas hacer es proporcionar tu nombre y tu correo electrónico en el formulario de registro que encontrarás más abajo. ¡Es así de fácil! Una vez completado, simplemente sigue las indicaciones que te enviaremos por correo electrónico y estarás listo para disfrutar de una experiencia inolvidable. ¡No te pierdas la oportunidad de ser parte de este evento increíble!'
  registroAsistenteContainer.append(p)
  form(registroAsistenteContainer, eventoId)
  main.append(registroAsistenteContainer)
}

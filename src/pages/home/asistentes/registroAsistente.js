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

    submit(nombre, email, eventoId, form)
  })
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
      `https://proyecto-10-backend.vercel.app/api/v1/asistentes/eventos/${eventoId}/confirmar`,
      opciones
    )

    if (response.status === 400) {
      const pError = document.createElement('p')
      pError.classList.add('error')
      pError.textContent = 'Ha ocurrido un error al registrar al asistente'
      pError.style = 'color: red'
      form.append(pError)
      return
    }

    const pError = document.querySelector('.error')
    if (pError) {
      pError.remove()
    }

    const respuestaFinal = await response.json()

    console.log('¡Registro realizado!')
    const main = document.querySelector('main')
    main.innerHTML = ''
    const mensajeRegistro = document.createElement('p')
    mensajeRegistro.className = 'registro-hecho'
    mensajeRegistro.innerText =
      '¡Enhorabuena! Te has registrado con éxito para nuestro emocionante evento. En breve, recibirás todos los detalles del evento en tu correo electrónico. ¡Mantente atento a tu bandeja de entrada y prepárate para disfrutar de una experiencia inolvidable!'
    main.append(mensajeRegistro)
  } catch (error) {
    console.error('Error en la solicitud:', error)
  }
}

export const registroAsistente = (evento) => {
  const main = document.querySelector('main')
  main.innerHTML = ''
  const registroAsistenteContainer = document.createElement('div')
  registroAsistenteContainer.className = 'registro-asistencia-container'
  const p = document.createElement('p')
  p.innerText =
    '¡Apuntarse a este emocionante evento es muy sencillo! Todo lo que necesitas hacer es proporcionar tu nombre y tu correo electrónico en el formulario de registro que encontrarás más abajo. ¡Es así de fácil! Una vez completado, simplemente sigue las indicaciones que te enviaremos por correo electrónico y estarás listo para disfrutar de una experiencia inolvidable. ¡No te pierdas la oportunidad de ser parte de este evento increíble!'
  registroAsistenteContainer.append(p)
  form(registroAsistenteContainer, evento._id)
  main.append(registroAsistenteContainer)
}

import { submitFormEvent } from '../../pages/eventos/eventos'
import { submitAttendee } from '../../pages/home/asistentes/registroAsistente'
import { isValidEmail } from '../../utils/isValidEmail'
import { datosUsuario } from '../../utils/variables'

export const loginForm = (elementoPadre) => {
  const formLogin = document.createElement('form')
  formLogin.className = 'form-login'
  const userNameInput = document.createElement('input')
  userNameInput.type = 'text'
  userNameInput.name = 'userName'
  userNameInput.placeholder = 'Nombre de usuario'
  const passwordInput = document.createElement('input')
  passwordInput.type = 'password'
  passwordInput.name = 'password'
  passwordInput.placeholder = 'Contraseña'
  const submitButton = document.createElement('button')
  submitButton.className = 'submit'
  submitButton.innerText = 'Iniciar sesión'
  formLogin.append(userNameInput, passwordInput, submitButton)
  elementoPadre.append(formLogin)
}

export const registerForm = (elementoPadre) => {
  const form = document.createElement('form')
  form.className = 'form-register'
  const inputNombreUsuario = document.createElement('input')
  inputNombreUsuario.type = 'text'
  inputNombreUsuario.name = 'userName'
  inputNombreUsuario.placeholder = 'Nombre de Usuario'
  const inputMail = document.createElement('input')
  inputMail.type = 'email'
  inputMail.name = 'email'
  inputMail.placeholder = 'Email'
  const inputContraseña = document.createElement('input')
  inputContraseña.type = 'password'
  inputContraseña.name = 'password'
  inputContraseña.className = 'password'
  inputContraseña.placeholder = 'Contraseña'
  const inputConfirmContraseña = document.createElement('input')
  inputConfirmContraseña.type = 'password'
  inputConfirmContraseña.className = 'confirm-password'
  inputConfirmContraseña.placeholder = 'Repite la contraseña'
  const pImage = document.createElement('p')
  pImage.className = 'paragraph'
  pImage.innerText = 'Elige tu imagen de perfil:'
  const inputImage = document.createElement('input')
  inputImage.type = 'file'
  inputImage.name = 'img'
  inputImage.accept = 'image/*'
  const submitButton = document.createElement('button')
  submitButton.type = 'submit'
  submitButton.className = 'submit'
  submitButton.innerText = 'Registrarme'
  form.append(
    inputNombreUsuario,
    inputMail,
    inputContraseña,
    inputConfirmContraseña,
    pImage,
    inputImage,
    submitButton
  )

  inputConfirmContraseña.addEventListener('input', () => {
    const password = inputContraseña.value
    const confirmPassword = inputConfirmContraseña.value

    if (password !== confirmPassword) {
      inputConfirmContraseña.setCustomValidity('Las contraseñas no coinciden')
    } else {
      inputConfirmContraseña.setCustomValidity('')
    }
  })
  elementoPadre.append(form)
}

export const formCreateEvent = () => {
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
    await submitFormEvent(userId, formData, form)
  })

  main.appendChild(form)
}

export const formAttendee = (elementoPadre, eventoId, submit) => {
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

    submitAttendee(nombre, email, eventoId, form)
  })
}

export const formEditHTML = ` 
<h2 class='title-edit'>Edita tus datos</h2>
<label class='start' for="nombreUsuario">Nombre de usuario:</label>
<input type="text" name="nombreUsuario">
<label class='start' for="password">Nueva contraseña:</label>
<input type="password" class="password" name="password">
<label class='start'>Repite contraseña:</label>
<input type="password" class="confirm-password" name="confirmPassword">
<label class='start' for="email">Correo electrónico:</label>
<input type="email"  name="email">
<label class='start' for="img">Imagen:</label>
<input id='transparent' type="file" name="img" accept="image/*">
<button class='submit' id='editar-button'>Editar</button>
`

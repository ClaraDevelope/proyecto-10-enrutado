import { API_URL } from '../../../main'
import { Login } from '../login/login'
import './register.css'

const submitRegister = async (nombreUsuario, email, password, img, form) => {
  const datos = JSON.stringify({ nombreUsuario, email, password, img })

  const opciones = {
    method: 'POST',
    body: datos,
    headers: {
      'Content-Type': 'application/json'
    }
  }

  try {
    const response = await fetch(API_URL + '/auth/register', opciones)

    if (response.status === 201) {
      const data = await response.json()
      console.log('Datos de la respuesta:', data)
      bienvenida(data)
    } else {
      console.error('Error en la solicitud:', response.status)
      const errorMessage = await response.text()
      console.error('Mensaje de error:', errorMessage)
      throw new Error('Error al registrarte')
    }
  } catch (error) {
    console.error('Error en la solicitud:', error)
    const pError = document.createElement('p')
    pError.classList.add('error')
    pError.textContent = error.message || 'Error al registrarte'
    pError.style.color = 'blue'
    pError.style.fontSize = '20px'
    form.append(pError)
  }
}

const createForm = (elementoPadre) => {
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
  inputContraseña.placeholder = 'Contraseña'
  const inputConfirmContraseña = document.createElement('input')
  inputConfirmContraseña.type = 'password'
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
  elementoPadre.append(form)
}

export const printRegister = () => {
  const main = document.querySelector('main')
  main.innerHTML = ''
  const registroContainer = document.createElement('div')
  registroContainer.className = 'registro-container'
  const bienvenida = document.createElement('p')
  bienvenida.innerText =
    '¡Bienvenido a FandomFiesta, donde la diversión nunca termina! Esperamos que disfrutes siendo parte de nuestra vibrante comunidad. ¡Únete y comienza a explorar todo lo que tenemos para ofrecerte! 🎉'
  registroContainer.append(bienvenida)
  createForm(registroContainer)
  main.append(registroContainer)

  const formElement = document.querySelector('.form-register')
  formElement.addEventListener('submit', async (e) => {
    e.preventDefault()

    const formData = new FormData(formElement)
    const nombreUsuario = formData.get('userName')
    const password = formData.get('password')
    const email = formData.get('email')
    const img = formData.get('img')

    await submitRegister(nombreUsuario, email, password, img, formElement)
  })
}

const bienvenida = (data) => {
  const registroContainer = document.querySelector('.registro-container')
  registroContainer.innerHTML = ''
  const bienvenidaContainer = document.querySelector('div')
  bienvenidaContainer.className = 'container-bienvenida'
  const pBienvenida = document.createElement('p')
  pBienvenida.className = 'bienvenida'
  pBienvenida.innerText = `¡Se ha registrado ${data.nombreUsuario}con éxito! 
  Inicia sesión para empezar a disfrutar de todo lo que te ofrece la comunidad.`
  const loginButton = document.createElement('button')
  loginButton.className = 'login-button'
  loginButton.innerText = 'Iniciar sesión'
  loginButton.addEventListener('click', Login)
  bienvenidaContainer.append(pBienvenida, loginButton)
  registroContainer.append(bienvenidaContainer)
}

// submit:
// if(!inputConfirmContraseña.value === inputContraseña.value){}else{}

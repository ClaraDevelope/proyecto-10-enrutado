import { API_URL } from '../../../main'
import { HeaderUsuario } from '../../components/header/header'
import { Home } from '../home/main/home'
import { printRegister } from '../register/register'
import './login.css'

export const submitLogin = async (nombreUsuario, password, form) => {
  const datos = JSON.stringify({ nombreUsuario, password })

  const opciones = {
    method: 'POST',
    body: datos,
    headers: {
      'Content-Type': 'application/json'
    }
  }

  try {
    const response = await fetch(API_URL + '/auth/login', opciones)

    if (response.status === 200) {
      const data = await response.json()
      console.log('Datos de la respuesta:', data)
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))
      HeaderUsuario()
      Home()
      usuarioLogueado(data)
    } else {
      console.error('Error en la solicitud:', response.status)
      const errorMessage = await response.text()
      console.error('Mensaje de error:', errorMessage)
      throw new Error('Error al iniciar sesión')
    }
  } catch (error) {
    console.error('Error en la solicitud:', error)
    const pError = document.createElement('p')
    pError.classList.add('error')
    pError.textContent = error.message || 'Error al iniciar sesión'
    pError.style.color = 'blue'
    pError.style.fontSize = '20px'
    form.append(pError)
  }
}

const formLogin = (elementoPadre) => {
  const formLoginContainer = document.createElement('div')
  formLoginContainer.className = 'form-container'
  const title = document.createElement('h2')
  title.innerText = 'Iniciar sesión'
  formLoginContainer.append(title)
  form(formLoginContainer)
  const pRegistro = document.createElement('p')
  pRegistro.className = 'parrafo-registro'
  pRegistro.innerHTML = `Si aún no tienes cuenta, <a class="anchor-registro" href="#Registro">haz click aquí para registrarte</a>`

  const anchorRegistro = pRegistro.querySelector('.anchor-registro')
  anchorRegistro.addEventListener('click', printRegister)
  formLoginContainer.append(pRegistro)
  elementoPadre.append(formLoginContainer)

  const formLogin = formLoginContainer.querySelector('.form-login')
  formLogin.addEventListener('submit', async (e) => {
    e.preventDefault()

    const formData = new FormData(formLogin)
    const nombreUsuario = formData.get('userName')
    const password = formData.get('password')

    await submitLogin(nombreUsuario, password, formLogin)
  })
}

const form = (elementoPadre) => {
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

export const usuarioLogueado = (data) => {
  if (data && data.token) {
    console.log(data.token)
    return true
  } else {
    return false
  }
}

export const Login = () => {
  const main = document.querySelector('main')
  main.innerHTML = ''
  formLogin(main)
}

import { Landing } from '../../../main'
import {
  Header,
  HeaderRender,
  HeaderUsuario
} from '../../components/header/header'
import router from '../../utils/navigo'
import {
  API_URL,
  User,
  actualizarDatosUsuario,
  showLoader
} from '../../utils/variables'
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
  const main = document.querySelector('main')
  main.innerHTML = ''
  showLoader(main)
  try {
    const response = await fetch(API_URL + '/auth/login', opciones)
    if (response.ok) {
      const data = await response.json()
      console.log('Datos de la respuesta:', data)
      localStorage.setItem('token', data.token)
      console.log('Objeto de usuario almacenado:', data.usuario)
      localStorage.setItem('user', JSON.stringify(data.usuario))

      if (data) {
        HeaderUsuario()
        actualizarDatosUsuario()
        router.navigate('/inicio')
      }
    } else {
      console.error('Error en la solicitud:', response.status)
      const errorMessage = await response.text()
      console.error('Mensaje de error:', errorMessage)

      // Verificar si ya existe un mensaje de error con el mismo contenido
      const existingError = [...form.querySelectorAll('.error')].find(
        (errorElement) => {
          return errorElement.getAttribute('data-message') === errorMessage
        }
      )

      if (!existingError) {
        const pError = document.createElement('p')
        pError.classList.add('error')
        pError.textContent = errorMessage
        pError.setAttribute('data-message', errorMessage)
        pError.style.color = '#49E6E9'
        pError.style.fontWeight = 'bold'
        pError.style.fontSize = '20px'
        form.append(pError)
      }
    }
  } catch (error) {
    console.error('Error en la solicitud:', error)
    const errorMessage = 'Error al iniciar sesión'

    const existingError = [...form.querySelectorAll('.error')].find(
      (errorElement) => {
        return errorElement.getAttribute('data-message') === errorMessage
      }
    )

    if (!existingError) {
      const pError = document.createElement('p')
      pError.classList.add('error')
      pError.textContent = errorMessage
      pError.setAttribute('data-message', errorMessage)
      pError.style.color = '#49E6E9'
      pError.style.fontWeight = 'bold'
      pError.style.fontSize = '20px'
      form.append(pError)
    }
  }
}

const formLogin = (elementoPadre) => {
  const renderForm = () => {
    const formLoginContainer = document.createElement('div')
    formLoginContainer.className = 'form-container'
    const title = document.createElement('h2')
    title.innerText = 'Iniciar sesión'
    formLoginContainer.append(title)
    form(formLoginContainer)
    const pRegistro = document.createElement('p')
    pRegistro.className = 'parrafo-registro'
    pRegistro.innerHTML = `Si aún no tienes cuenta, <a class="anchor-registro" href="/login/registro">haz click aquí para registrarte</a>`
    formLoginContainer.append(pRegistro)
    elementoPadre.append(formLoginContainer)
    const formLogin = formLoginContainer.querySelector('.form-login')
    formLogin.addEventListener('submit', (e) => {
      e.preventDefault()
      const formData = new FormData(formLogin)
      const nombreUsuario = formData.get('userName')
      const password = formData.get('password')
      submitLogin(nombreUsuario, password, formLogin)
    })

    const anchorRegistro = pRegistro.querySelector('.anchor-registro')
    anchorRegistro.addEventListener('click', (e) => {
      e.preventDefault()
      router.navigate('/login/registro')
    })
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderForm)
  } else {
    renderForm()
  }
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

export const Login = () => {
  const main = document.querySelector('main')
  if (main) {
    main.innerHTML = ''
    formLogin(main)
  }
}

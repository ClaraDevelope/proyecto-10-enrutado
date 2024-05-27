import { HeaderUsuario } from '../../components/header/header'
import router from '../../utils/navigo'
import { API_URL, actualizarDatosUsuario } from '../../utils/variables'
import { showLoader } from '../../utils/showLoader'
import './login.css'
import { loginForm } from '../../components/forms/forms'
import { printErrorMessage } from '../../components/errorMessage/errorMessage'
import { hideLoader } from '../../utils/hideLoader'

const formLogin = (elementoPadre, mostrarError = false, errorMessage = '') => {
  const renderForm = () => {
    const formLoginContainer = document.createElement('div')
    formLoginContainer.className = 'form-container'
    const title = document.createElement('h2')
    title.innerText = 'Iniciar sesión'
    formLoginContainer.append(title)
    loginForm(formLoginContainer)
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

    if (mostrarError && errorMessage) {
      printErrorMessage(formLogin, errorMessage)
    }
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderForm)
  } else {
    renderForm()
  }
}

export const Login = () => {
  const main = document.querySelector('main')
  if (main) {
    main.innerHTML = ''
    formLogin(main, false, '')
  }
}

export const submitLogin = async (nombreUsuario, password, form) => {
  const datos = JSON.stringify({ nombreUsuario, password })
  const main = document.querySelector('main')

  showLoader(main)

  const opciones = {
    method: 'POST',
    body: datos,
    headers: {
      'Content-Type': 'application/json'
    }
  }

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

      const existingErrors = form.querySelectorAll('.error')
      existingErrors.forEach((error) => error.remove())

      let errorType = ''
      if (errorMessage.toLowerCase().includes('usuario')) {
        errorType = 'Usuario'
      } else if (errorMessage.toLowerCase().includes('contraseña')) {
        errorType = 'Contraseña'
      }

      printErrorMessage(form, `${errorType} incorrecto/a`)
    }
  } catch (error) {
    console.error('Error en la solicitud:', error)
    s
    const existingErrors = form.querySelectorAll('.error')
    existingErrors.forEach((error) => error.remove())

    printErrorMessage(form, 'Error al iniciar sesión')
  } finally {
    hideLoader(main)
  }
}

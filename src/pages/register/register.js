import { printErrorMessage } from '../../components/errorMessage/errorMessage'
import { registerForm } from '../../components/forms/forms'
import { showLoader } from '../../utils/showLoader'
import { API_URL } from '../../utils/variables'
import { submitLogin } from '../login/login'
import './register.css'

const submitRegister = async (nombreUsuario, email, password, img, form) => {
  const formData = new FormData()
  formData.append('nombreUsuario', nombreUsuario)
  formData.append('email', email)
  formData.append('password', password)
  formData.append('img', img)

  const opciones = {
    method: 'POST',
    body: formData
  }
  const main = document.querySelector('main')

  main.innerHTML = ''
  showLoader(main)
  try {
    const response = await fetch(API_URL + '/auth/register', opciones)

    if (response.status === 201) {
      const data = await response.json()
      console.log('Datos de la respuesta:', data)
      form = document.querySelector('.form-register')
      bienvenida(data)
    } else {
      console.error('Error en la solicitud:', response.status)
      const errorMessage = await response.text()
      console.error('Mensaje de error:', errorMessage)
      throw new Error('Error al registrarte')
    }
  } catch (error) {
    console.error('Error en la solicitud:', error)
    if (!form.querySelector('.error')) {
      printErrorMessage(form)
    }
  }
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
  registerForm(registroContainer)
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
    await submitLogin(nombreUsuario, password, formElement)
  })
}

const bienvenida = (data) => {
  alert(`¡Se ha registrado ${data.nombreUsuario} con éxito!`)
}

import { printErrorMessage } from '../../components/errorMessage/errorMessage'
import { formEditHTML } from '../../components/forms/forms'
import router from '../../utils/navigo'
import { showLoader } from '../../utils/showLoader'
import { API_URL, datosUsuario } from '../../utils/variables'
import './usuario.css'
export const renderPerfil = () => {
  const main = document.querySelector('main')
  main.innerHTML = ''
  perfilUsuario(main)
}
const perfilUsuario = (elementoPadre) => {
  const usuarioData = JSON.parse(localStorage.getItem('user'))
  console.log(usuarioData)

  const perfilContainer = document.createElement('div')
  perfilContainer.className = 'perfil-container'

  const principalData = document.createElement('div')
  principalData.className = 'img-name'
  principalData.innerHTML = `<div class='imgPerfil-container'><img loading='lazy' src=${
    usuarioData.img ? usuarioData.img : './assets/usuario.png'
  } alt="perfil-img"></img></div>
  <h2>${usuarioData.nombreUsuario}</h2>`

  const secondaryData = document.createElement('div')
  secondaryData.className = 'secondary-data'
  secondaryData.innerHTML = `<div>
    <label class='info-label'>Nombre de usuario:</label><p>${usuarioData.nombreUsuario}</p>
    </div>
    <div>
      <label class='info-label'>Contraseña:</label><p>*******</p>
    </div>
    <div>
      <label class='info-label'>Email:</label><p>${usuarioData.email}</p>
    </div>
    <button class='submit' id='edit-button'>Editar</button>`

  const editButton = secondaryData.querySelector('#edit-button')
  editButton.addEventListener('click', () => {
    router.navigate('/editar-perfil')
  })

  perfilContainer.append(principalData, secondaryData)
  elementoPadre.append(perfilContainer)
}

export const formEdit = () => {
  const main = document.querySelector('main')
  main.innerHTML = ''
  const formulario = document.createElement('form')
  formulario.id = 'miFormulario'
  formulario.innerHTML = formEditHTML
  const passwordInput = formulario.querySelector('.password')
  const confirmPasswordInput = formulario.querySelector('.confirm-password')

  confirmPasswordInput.addEventListener('input', () => {
    const password = passwordInput.value
    const confirmPassword = confirmPasswordInput.value

    if (password !== confirmPassword) {
      confirmPasswordInput.setCustomValidity('Las contraseñas no coinciden')
    } else {
      confirmPasswordInput.setCustomValidity('')
    }
  })

  formulario.addEventListener('submit', datosEdicion)
  main.append(formulario)
}

const datosEdicion = async (event) => {
  event.preventDefault()

  const form = document.getElementById('miFormulario')
  const formData = new FormData(form)
  const userId = datosUsuario._id

  try {
    await editarDatosPerfil(userId, formData)
  } catch (error) {
    console.error('Error al editar datos del perfil:', error)
  }
}
const editarDatosPerfil = async (usuarioId, formData) => {
  const main = document.querySelector('main')
  main.innerHTML = ''
  showLoader(main)
  const opciones = {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    },
    body: formData
  }

  try {
    main.innerHTML = ''
    const response = await fetch(`${API_URL}/auth/${usuarioId}`, opciones)

    if (response.ok) {
      const data = await response.json()
      console.log('Usuario editado exitosamente', data)
      alert('¡Editado con éxito!')
      if (data) {
        router.navigate('/inicio')
      }
    } else {
      const errorMessage = await response.text()
      console.error('Error al editar el usuario:', errorMessage)
      const main = document.querySelector('main')
      printErrorMessage(main)
    }
  } catch (error) {
    console.error('Error al editar el usuario:', error)
    const main = document.querySelector('main')
    printErrorMessage(main)
  }
}

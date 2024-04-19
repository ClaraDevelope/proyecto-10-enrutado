import {
  API_URL,
  datosActualizadosUsuario,
  datosUsuario
} from '../../utils/variables'
import './usuario.css'
export const renderPerfil = () => {
  const main = document.querySelector('main')
  main.innerHTML = ''
  perfilUsuario(main)
}
const perfilUsuario = (elementoPadre) => {
  const perfilContainer = document.createElement('div')
  perfilContainer.className = 'perfil-container'
  const principalData = document.createElement('div')
  principalData.className = 'img-name'
  principalData.innerHTML = `<div class='imgPerfil-container'><img loading= 'lazy' src=${
    datosActualizadosUsuario.img
      ? datosActualizadosUsuario.img
      : './usuario.png'
  } alt="perfil-img"></img></div>
  <h2>${datosActualizadosUsuario.nombreUsuario}</h2>
  `
  const secondaryData = document.createElement('div')
  secondaryData.className = 'secondary-data'
  secondaryData.innerHTML = `<div>
  <label class='info-label'>Nombre de usuario:</label><p>${datosActualizadosUsuario.nombreUsuario}</p>
  </div>
 <div> <label class='info-label'>Contraseña:</label><p>*******</p></div>
 <div>
 <label class='info-label'>Email:</label><p>${datosActualizadosUsuario.email}</p>
 </div>
 <button class='submit' id='edit-button'>Editar</button>
  `
  const editButton = secondaryData.querySelector('#edit-button')
  editButton.addEventListener('click', () => {
    formEdit()
  })

  perfilContainer.append(principalData, secondaryData)
  elementoPadre.append(perfilContainer)
}

const formEdit = () => {
  const main = document.querySelector('main')
  main.innerHTML = ''
  const formulario = document.createElement('form')
  formulario.id = 'miFormulario'
  formulario.innerHTML = ` 
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
  const opciones = {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    },
    body: formData
  }
  for (const [key, value] of formData.entries()) {
    console.log(key + ': ' + value)
  }
  try {
    const response = await fetch(`${API_URL}/auth/${usuarioId}`, opciones)

    console.log(response)

    if (response.ok) {
      console.log('Usuario editado exitosamente')
      alert('¡Editado con éxito!')
      window.location.reload()
    } else {
      console.error('Error al editar el usuario:', error.message)
    }
  } catch (error) {
    console.error('Error al editar el usuario:', error)
  }
}

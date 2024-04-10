import { API_URL, datosUsuario } from '../../utils/variables'
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
  principalData.innerHTML = `<div class='imgPerfil-container'><img src=${
    datosUsuario.img ? datosUsuario.img : './usuario.png'
  } alt="perfil-img"></img></div>
  <h2>${datosUsuario.nombreUsuario}</h2>
  `
  const secondaryData = document.createElement('div')
  secondaryData.className = 'secondary-data'
  secondaryData.innerHTML = `<div>
  <label class='info-label'>Nombre de usuario:</label><p>${datosUsuario.nombreUsuario}</p>
  </div>
 <div> <label class='info-label'>Contraseña:</label><p>*******</p></div>
 <div>
 <label class='info-label'>Email:</label><p>${datosUsuario.email}</p>
 </div>
 <button class='submit' id='edit-button'>Editar</button>
  `
  const editButton = secondaryData.querySelector('#edit-button')
  editButton.addEventListener('click', (datosUsuario) => {
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
  formulario.addEventListener('submit', datosEdicion)
  main.append(formulario)
}

const datosEdicion = async (event) => {
  event.preventDefault()

  const form = document.getElementById('miFormulario')
  const userId = datosUsuario._id

  try {
    await editarDatosPerfil(userId, form)
  } catch (error) {
    console.error('Error al editar datos del perfil:', error)
  }
}

const editarDatosPerfil = async (usuarioId) => {
  try {
    const form = document.getElementById('miFormulario')
    const formData = new FormData(form)
    const nombreUsuario = formData.get('nombreUsuario')
    const password = formData.get('password')
    const email = formData.get('email')
    const img = formData.get('img')

    const formDataToSend = new FormData()
    formDataToSend.append('nombreUsuario', nombreUsuario)
    formDataToSend.append('password', password)
    formDataToSend.append('email', email)

    if (img instanceof File) {
      formDataToSend.append('img', img)
    }

    const response = await fetch(`${API_URL}/auth/${usuarioId}`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: formDataToSend
    })

    if (!response.ok) {
      throw new Error('Error al editar el usuario')
    }

    console.log('Usuario editado exitosamente')
  } catch (error) {
    console.error('Error al editar el usuario:', error)
  }
}

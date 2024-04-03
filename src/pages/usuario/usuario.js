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
  <h2 id='title-edit'>Edita tus datos</h2>
<label class='start' for="nombreUsuario">Nombre de usuario:</label>
<input type="text" name="nombreUsuario">
<label class='start' for="password">Nueva contraseña:</label>
<input type="password" class="password" name="password">
<label class='start'>Repite contraseña:</label>
<input type="password" class="confirm-password" name="password">
<label class='start' for="email">Correo electrónico:</label>
<input type="email"  name="email">
<label class='start' for="img">Imagen:</label>
<input id='transparent' type="file" name="img" accept="image/*">
<button class='submit' id='editar-button'>Editar</button>
`
  main.append(formulario)
  const editButton = formulario.querySelector('#editar-button')
  editButton.addEventListener('click', () => {
    datosEdicion()
  })
}

const datosEdicion = () => {
  const userId = datosUsuario._id
  const nombreUsuario = datosUsuario.nombreUsuario
  const password = datosUsuario.password
  const email = datosUsuario.email
  const img = datosUsuario.img
  editarDatos(userId, nombreUsuario, password, email, img)
}
// NO FUNCIONA LA EDICIÓN DE DATOS
const editarDatos = async (
  userId,
  nombreUsuario,
  password,
  email,
  img,
  form
) => {
  const datos = JSON.stringify({ nombreUsuario, email, password, img })

  const opciones = {
    method: 'PUT',
    body: datos,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  }

  try {
    const response = await fetch(API_URL + `/auth/${userId}`, opciones)

    if (response.status === 200) {
      const data = await response.json()
      console.log('Datos de la respuesta:', data)
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

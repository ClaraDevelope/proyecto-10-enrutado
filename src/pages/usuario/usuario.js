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
  formulario.addEventListener('submit', datosEdicion)
  main.append(formulario)
}

const datosEdicion = async (event) => {
  event.preventDefault()

  const form = document.getElementById('miFormulario')
  const userId = datosUsuario._id

  const nombreUsuario = form.querySelector('input[name="nombreUsuario"]').value
  const password = form.querySelector('input[name="password"]').value
  const email = form.querySelector('input[name="email"]').value
  const img = form.querySelector('input[name="img"]').value

  try {
    await editarDatos(userId, nombreUsuario, password, email, img, form)
  } catch (error) {
    console.error('Error al editar datos:', error)
  }
}

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
    method: 'PATCH',
    body: datos,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  }

  try {
    const response = await fetch(API_URL + `/auth/${userId}`, opciones)
    const data = await response.json()
    console.log(data)
    // console.log('Datos de la respuesta:', data)
    // if (response.status === 200) {
    //   const data = await response.json()
    //   console.log('Datos de la respuesta:', data)
    // } else {
    //   console.error('Error en la solicitud:', response.status)
    //   console.log(Error)
    // }
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

import './loginRegister.css'

const submitLogin = async (nombreUsuario, password, form) => {
  const datos = JSON.stringify({ nombreUsuario, password })

  const opciones = {
    method: 'POST',
    body: datos,
    headers: {
      'Content-Type': 'application/json'
    }
  }

  try {
    const response = await fetch(
      'https://proyecto-10-backend.vercel.app/api/v1/auth/login',
      opciones
    )

    if (response.status === 200) {
      const data = await response.json()
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))
      // Redirigir a la página de inicio o realizar otra acción
    } else if (response.status === 400) {
      const pError = document.createElement('p')
      pError.classList.add('error')
      pError.textContent = 'Nombre de usuario o contraseña incorrectos'
      pError.style.color = 'red'
      form.append(pError)
    } else {
      console.error('Error al iniciar sesión')
      // Manejar otros posibles errores
    }
  } catch (error) {
    console.error('Error en la solicitud:', error)
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
  pRegistro.innerHTML = `Si aún no tienes cuenta, <a class="anchor" href="#Registro">haz click aquí para registrarte</a>`
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

export const Login = async () => {
  const main = document.querySelector('main')
  main.innerHTML = ''
  formLogin(main)
}

// https://proyecto-10-backend.vercel.app/api/v1/auth/login

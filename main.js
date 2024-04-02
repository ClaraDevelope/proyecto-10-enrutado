import { Header } from './src/components/header/header'
import { Home } from './src/pages/home/main/home'
import './style.css'
const Main = () => {
  const app = document.querySelector('#app')
  app.innerHTML = `
      <header></header>
      <main></main>
      <footer></footer>
    `
}

Main()
Header()
Home()

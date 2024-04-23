import { Footer } from './src/components/footer/footer'
import { HeaderRender } from './src/components/header/header'
import { Home } from './src/pages/home/main/home'
import { User } from './src/utils/variables'
import './style.css'
const Landing = () => {
  const app = document.querySelector('#app')
  app.innerHTML = `
    <header></header>
    <main></main>
    <footer></footer>
  `
  HeaderRender(User)
  Home()
  Footer()
}

Landing()
